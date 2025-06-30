import axios from 'axios';
import { trackApiCall } from '../analytics';
import { AdGenerationParams, GeneratedAdContent } from './openai';

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

/**
 * Generate comprehensive ad content using Groq's LLama3-70b model
 */
export async function generateAdContentGroq(params: AdGenerationParams): Promise<GeneratedAdContent> {
  try {
    // Track API call
    trackApiCall('groq_text_generation', {
      platform: params.platform,
      tone: params.tone,
      businessType: params.businessType
    });

    const systemPrompt = `You are an expert advertising copywriter and marketing strategist with 15+ years of experience creating high-converting ads across all digital platforms. You understand consumer psychology, platform-specific best practices, and current marketing trends.`;

    const userPrompt = `Create a compelling advertisement for the following:

BUSINESS DETAILS:
- Business Name: ${params.businessName}
- Business Type: ${params.businessType}
- Product/Service: ${params.productName}
- Description: ${params.productDescription}

TARGET & PLATFORM:
- Target Audience: ${params.targetAudience}
- Platform: ${params.platform}
- Desired Tone: ${params.tone}
${params.additionalInfo ? `- Additional Requirements: ${params.additionalInfo}` : ''}

Please provide a JSON response with the following structure:
{
  "headline": "Attention-grabbing headline (max 60 characters for ${params.platform})",
  "copy": "Compelling ad copy that speaks to the target audience (2-3 sentences, platform-optimized)",
  "cta": "Strong call-to-action button text (2-4 words)",
  "strategy": "Brief explanation of the marketing strategy behind this ad (1-2 sentences)",
  "keywords": ["relevant", "trending", "keywords", "for", "targeting"]
}

Make it ${params.tone.toLowerCase()}, engaging, and optimized for ${params.platform}. Focus on benefits over features and create emotional connection with ${params.targetAudience}.`;

    const response = await axios.post(
      API_URL,
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 800,
        temperature: 0.85,
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated from Groq');
    }

    const parsedContent = JSON.parse(content) as GeneratedAdContent;
    
    // Validate required fields
    if (!parsedContent.headline || !parsedContent.copy || !parsedContent.cta) {
      throw new Error('Incomplete ad content generated');
    }

    return parsedContent;

  } catch (error) {
    console.error('Groq API Error:', error);
    
    // Throw the error to allow fallback to OpenAI
    throw error;
  }
}

/**
 * Combined ad content generation with fallback chain
 * Tries Groq first, falls back to OpenAI if Groq fails
 */
export async function generateAdContentWithFallback(params: AdGenerationParams, preferGroq: boolean = true): Promise<GeneratedAdContent> {
  try {
    if (preferGroq) {
      // Try Groq first
      return await generateAdContentGroq(params);
    } else {
      // Use OpenAI directly if preferred
      const { generateAdContent } = await import('./openai');
      return await generateAdContent(params);
    }
  } catch (groqError) {
    console.warn('Groq generation failed, falling back to OpenAI:', groqError);
    
    try {
      // Fallback to OpenAI
      const { generateAdContent } = await import('./openai');
      return await generateAdContent(params);
    } catch (openaiError) {
      console.error('Both Groq and OpenAI failed:', openaiError);
      
      // Final fallback - return basic content
      return {
        headline: `Transform Your Business with ${params.productName}`,
        copy: `Discover how ${params.businessName} is revolutionizing ${params.businessType.toLowerCase()} with our innovative ${params.productName}. Perfect for ${params.targetAudience}, our solution delivers exceptional results that exceed expectations.`,
        cta: 'Get Started Today',
        strategy: 'This ad focuses on transformation and innovation to appeal to forward-thinking customers.',
        keywords: ['innovation', 'transform', 'business', 'solution', 'results']
      };
    }
  }
}