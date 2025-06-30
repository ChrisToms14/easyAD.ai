import { trackApiCall } from '../analytics';
import { AdGenerationParams, generateImagePrompt } from './openai';

export interface ReplicateResponse {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  output?: string[];
  error?: string;
}

/**
 * Generate ad image using Replicate SDXL (fallback method)
 */
export async function generateAdImageReplicate(params: AdGenerationParams): Promise<string> {
  try {
    trackApiCall('replicate_image_generation', {
      platform: params.platform,
      tone: params.tone
    });

    const apiKey = import.meta.env.VITE_REPLICATE_API_KEY;
    if (!apiKey) {
      throw new Error('Replicate API key not configured');
    }

    const prompt = generateImagePrompt(params);

    // Create prediction
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'db21e45b23baa09cfa0b90e29dcce353df49dbb37cd30cd23767aa53d0f3f80e',
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          scheduler: 'K_EULER',
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          seed: Math.floor(Math.random() * 1000000)
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.status}`);
    }

    const prediction = await response.json() as ReplicateResponse;

    // Poll for completion
    const imageUrl = await pollForCompletion(prediction.id, apiKey);
    return imageUrl;

  } catch (error) {
    console.error('Replicate API Error:', error);
    
    // Return placeholder image as final fallback
    return generatePlaceholderImage(params);
  }
}

/**
 * Poll Replicate API for prediction completion
 */
async function pollForCompletion(predictionId: string, apiKey: string): Promise<string> {
  const maxAttempts = 30; // 5 minutes max
  const pollInterval = 10000; // 10 seconds

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Polling error: ${response.status}`);
      }

      const prediction = await response.json() as ReplicateResponse;

      if (prediction.status === 'succeeded' && prediction.output?.[0]) {
        return prediction.output[0];
      }

      if (prediction.status === 'failed') {
        throw new Error(`Prediction failed: ${prediction.error}`);
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, pollInterval));

    } catch (error) {
      console.error(`Polling attempt ${attempt + 1} failed:`, error);
      
      if (attempt === maxAttempts - 1) {
        throw error;
      }
    }
  }

  throw new Error('Prediction timed out');
}

/**
 * Generate placeholder image URL with dynamic content
 */
function generatePlaceholderImage(params: AdGenerationParams): string {
  const encodedText = encodeURIComponent(`${params.productName}\nby ${params.businessName}`);
  const colorMap: Record<string, string> = {
    'Professional': '4F46E5',
    'Friendly': '10B981',
    'Exciting': 'F59E0B',
    'Luxury': 'D97706',
    'Playful': 'EC4899',
    'Urgent': 'EF4444'
  };
  
  const bgColor = colorMap[params.tone] || '6366F1';
  
  return `https://via.placeholder.com/1024x1024/${bgColor}/FFFFFF?text=${encodedText}`;
}

/**
 * Combined image generation with fallback chain
 */
export async function generateAdImage(params: AdGenerationParams): Promise<string> {
  try {
    // Try DALL-E first
    const { generateAdImageDALLE } = await import('./openai');
    return await generateAdImageDALLE(params);
  } catch (dalleError) {
    console.warn('DALL-E failed, trying Replicate:', dalleError);
    
    try {
      // Fallback to Replicate
      return await generateAdImageReplicate(params);
    } catch (replicateError) {
      console.warn('Replicate failed, using placeholder:', replicateError);
      
      // Final fallback to placeholder
      return generatePlaceholderImage(params);
    }
  }
}