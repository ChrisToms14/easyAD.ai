import OpenAI from 'openai';
import { trackApiCall } from '../analytics';

// Initialize OpenAI client with API key from environment
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use server-side proxy
});

export interface AdGenerationParams {
  businessName: string;
  businessType: string;
  productName: string;
  productDescription: string;
  targetAudience: string;
  platform: string;
  tone: string;
  additionalInfo?: string;
}

export interface GeneratedAdContent {
  headline: string;
  copy: string;
  cta: string;
  strategy: string;
  keywords: string[];
}

/**
 * Generate comprehensive ad content using OpenAI GPT-4
 */
export async function generateAdContent(params: AdGenerationParams): Promise<GeneratedAdContent> {
  try {
    // Track API call
    trackApiCall('openai_text_generation', {
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.85,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated from OpenAI');
    }

    const parsedContent = JSON.parse(content) as GeneratedAdContent;
    
    // Validate required fields
    if (!parsedContent.headline || !parsedContent.copy || !parsedContent.cta) {
      throw new Error('Incomplete ad content generated');
    }

    return parsedContent;

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback content
    return {
      headline: `Transform Your Business with ${params.productName}`,
      copy: `Discover how ${params.businessName} is revolutionizing ${params.businessType.toLowerCase()} with our innovative ${params.productName}. Perfect for ${params.targetAudience}, our solution delivers exceptional results that exceed expectations.`,
      cta: 'Get Started Today',
      strategy: 'This ad focuses on transformation and innovation to appeal to forward-thinking customers.',
      keywords: ['innovation', 'transform', 'business', 'solution', 'results']
    };
  }
}

/**
 * Generate image prompt for DALL-E or Replicate
 */
export function generateImagePrompt(params: AdGenerationParams): string {
  const styleMap: Record<string, string> = {
    'Instagram': 'vibrant, modern, mobile-optimized square format',
    'Facebook': 'engaging, social-friendly, eye-catching design',
    'LinkedIn': 'professional, clean, business-oriented aesthetic',
    'Twitter': 'bold, concise, attention-grabbing visual',
    'Google Ads': 'clean, conversion-focused, trustworthy design',
    'TikTok': 'dynamic, trendy, youth-oriented creative'
  };

  const toneMap: Record<string, string> = {
    'Professional': 'clean, sophisticated, minimalist design with corporate colors',
    'Friendly': 'warm, approachable, inviting with soft colors and friendly imagery',
    'Exciting': 'dynamic, energetic, bold with vibrant colors and action elements',
    'Luxury': 'premium, elegant, sophisticated with gold accents and high-end aesthetics',
    'Playful': 'fun, creative, colorful with playful elements and bright palette',
    'Urgent': 'attention-grabbing, bold, high-contrast with urgency indicators'
  };

  return `Create a ${styleMap[params.platform] || 'modern, professional'} advertisement poster for "${params.productName}" by ${params.businessName}. 
  
Style: ${toneMap[params.tone] || 'modern and clean'}
Target audience: ${params.targetAudience}
Business type: ${params.businessType}

The design should be ${params.tone.toLowerCase()}, visually appealing, and optimized for ${params.platform}. Include space for text overlay, use appropriate typography hierarchy, and ensure the design aligns with ${params.businessType} industry standards. High quality, professional advertising design, 4K resolution.`;
}

/**
 * Generate DALL-E image (primary method)
 */
export async function generateAdImageDALLE(params: AdGenerationParams): Promise<string> {
  try {
    trackApiCall('openai_image_generation', {
      platform: params.platform,
      tone: params.tone
    });

    const prompt = generateImagePrompt(params);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      size: '1024x1024',
      quality: 'hd',
      n: 1
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error('No image URL returned from DALL-E');
    }

    return imageUrl;

  } catch (error) {
    console.error('DALL-E API Error:', error);
    throw error; // Re-throw to allow fallback to Replicate
  }
}