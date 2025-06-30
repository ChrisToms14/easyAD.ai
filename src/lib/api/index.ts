// Main API orchestrator
import { AdGenerationParams } from './openai';
import { generateAdContentWithFallback } from './groq';
import { generateAdImage } from './replicate';
import { trackAdGenerated, trackError, getTrendingInsights } from '../analytics';
import toast from 'react-hot-toast';

export interface GeneratedAd {
  headline: string;
  copy: string;
  cta: string;
  strategy: string;
  keywords: string[];
  imageUrl: string;
  insights: {
    engagement: string;
    clickRate: string;
    trending: string[];
    recommendations: string[];
  };
  generationTime: number;
}

/**
 * Main function to generate complete ad with text, image, and insights
 */
export async function generateCompleteAd(params: AdGenerationParams): Promise<GeneratedAd> {
  const startTime = Date.now();
  
  try {
    // Show loading toast
    const loadingToast = toast.loading('Generating your perfect ad...');

    // Generate content and image in parallel for better performance
    const [adContent, imageUrl, insights] = await Promise.allSettled([
      generateAdContentWithFallback(params),
      generateAdImage(params),
      getTrendingInsights(params.businessType, params.platform)
    ]);

    // Handle text generation result
    const textResult = adContent.status === 'fulfilled' 
      ? adContent.value 
      : {
          headline: `Transform Your Business with ${params.productName}`,
          copy: `Discover how ${params.businessName} is revolutionizing ${params.businessType.toLowerCase()}.`,
          cta: 'Get Started Today',
          strategy: 'Focus on transformation and innovation.',
          keywords: ['innovation', 'transform', 'business']
        };

    // Handle image generation result
    const imageResult = imageUrl.status === 'fulfilled' 
      ? imageUrl.value 
      : 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800';

    // Handle insights result
    const insightsResult = insights.status === 'fulfilled' 
      ? insights.value 
      : {
          trendingKeywords: ['trending', 'popular', 'effective'],
          engagementPrediction: '75%',
          clickRatePrediction: '2.5%',
          recommendations: ['Use strong visuals', 'Include clear CTA']
        };

    const generationTime = Date.now() - startTime;

    // Track successful generation
    trackAdGenerated({
      businessName: params.businessName,
      businessType: params.businessType,
      platform: params.platform,
      tone: params.tone,
      hasImage: imageUrl.status === 'fulfilled',
      generationTime
    });

    // Dismiss loading toast
    toast.dismiss(loadingToast);
    toast.success('Ad generated successfully!');

    return {
      ...textResult,
      imageUrl: imageResult,
      insights: {
        engagement: insightsResult.engagementPrediction,
        clickRate: insightsResult.clickRatePrediction,
        trending: insightsResult.trendingKeywords,
        recommendations: insightsResult.recommendations
      },
      generationTime
    };

  } catch (error) {
    const generationTime = Date.now() - startTime;
    
    // Track error
    trackError('ad_generation_failed', error instanceof Error ? error.message : 'Unknown error', {
      params,
      generationTime
    });

    toast.error('Failed to generate ad. Please try again.');
    
    // Return fallback ad
    return {
      headline: `Discover ${params.productName}`,
      copy: `${params.businessName} brings you innovative solutions for ${params.targetAudience}.`,
      cta: 'Learn More',
      strategy: 'Simple and direct approach to highlight key benefits.',
      keywords: ['discover', 'innovative', 'solutions'],
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      insights: {
        engagement: '70%',
        clickRate: '2.0%',
        trending: ['discover', 'innovative', 'solutions'],
        recommendations: ['Try different tone', 'Add more specific details']
      },
      generationTime
    };
  }
}

// Re-export types and functions for easy importing
export type { AdGenerationParams };
export { generateAdContentWithFallback, generateAdImage };
export * from '../analytics';