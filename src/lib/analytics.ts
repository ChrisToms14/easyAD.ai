import posthog from 'posthog-js';

// Initialize PostHog
const initializePostHog = () => {
  const apiKey = import.meta.env.VITE_POSTHOG_API_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST;

  if (!apiKey) {
    console.warn('PostHog API key not found. Analytics will be disabled.');
    return false;
  }

  try {
    posthog.init(apiKey, {
      api_host: host || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (import.meta.env.VITE_NODE_ENV === 'development') {
          posthog.debug();
        }
      },
      capture_pageview: true,
      capture_pageleave: true,
      persistence: 'localStorage',
      autocapture: true
    });
    
    return true;
  } catch (error) {
    console.error('Failed to initialize PostHog:', error);
    return false;
  }
};

// Initialize on module load
const isPostHogEnabled = initializePostHog();

/**
 * Track ad generation events
 */
export function trackAdGenerated(data: {
  businessName: string;
  businessType: string;
  platform: string;
  tone: string;
  hasImage: boolean;
  generationTime: number;
}) {
  if (!isPostHogEnabled) return;

  try {
    posthog.capture('ad_generated', {
      business_name: data.businessName,
      business_type: data.businessType,
      platform: data.platform,
      tone: data.tone,
      has_image: data.hasImage,
      generation_time_ms: data.generationTime,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`
    });
  } catch (error) {
    console.error('Failed to track ad generation:', error);
  }
}

/**
 * Track API calls for monitoring
 */
export function trackApiCall(apiType: 'openai_text_generation' | 'openai_image_generation' | 'replicate_image_generation' | 'groq_text_generation', metadata: Record<string, any> = {}) {
  if (!isPostHogEnabled) return;

  try {
    posthog.capture('api_call', {
      api_type: apiType,
      ...metadata,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to track API call:', error);
  }
}

/**
 * Track user interactions
 */
export function trackUserAction(action: string, properties: Record<string, any> = {}) {
  if (!isPostHogEnabled) return;

  try {
    posthog.capture(action, {
      ...properties,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title
    });
  } catch (error) {
    console.error('Failed to track user action:', error);
  }
}

/**
 * Track page views manually (if needed)
 */
export function trackPageView(pageName: string, properties: Record<string, any> = {}) {
  if (!isPostHogEnabled) return;

  try {
    posthog.capture('$pageview', {
      page_name: pageName,
      ...properties
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

/**
 * Track template usage
 */
export function trackTemplateUsed(templateId: string, templateName: string, platform: string) {
  if (!isPostHogEnabled) return;

  try {
    posthog.capture('template_used', {
      template_id: templateId,
      template_name: templateName,
      platform: platform,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to track template usage:', error);
  }
}

/**
 * Track regeneration events
 */
export function trackRegeneration(type: 'text' | 'image' | 'both', reason?: string) {
  if (!isPostHogEnabled) return;

  try {
    posthog.capture('ad_regenerated', {
      regeneration_type: type,
      reason: reason || 'user_initiated',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to track regeneration:', error);
  }
}

/**
 * Track downloads and exports
 */
export function trackDownload(contentType: 'image' | 'text' | 'full_ad', format?: string) {
  if (!isPostHogEnabled) return;

  try {
    posthog.capture('content_downloaded', {
      content_type: contentType,
      format: format || 'unknown',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to track download:', error);
  }
}

/**
 * Track errors for debugging
 */
export function trackError(errorType: string, errorMessage: string, context?: Record<string, any>) {
  if (!isPostHogEnabled) return;

  try {
    posthog.capture('error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      context: context || {},
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      page_url: window.location.href
    });
  } catch (error) {
    console.error('Failed to track error:', error);
  }
}

/**
 * Identify user (for authenticated users)
 */
export function identifyUser(userId: string, properties: Record<string, any> = {}) {
  if (!isPostHogEnabled) return;

  try {
    posthog.identify(userId, properties);
  } catch (error) {
    console.error('Failed to identify user:', error);
  }
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, any>) {
  if (!isPostHogEnabled) return;

  try {
    posthog.people.set(properties);
  } catch (error) {
    console.error('Failed to set user properties:', error);
  }
}

/**
 * Get trending keywords and insights (mock implementation)
 */
export async function getTrendingInsights(businessType: string, platform: string): Promise<{
  trendingKeywords: string[];
  engagementPrediction: string;
  clickRatePrediction: string;
  recommendations: string[];
}> {
  // In a real implementation, this would query PostHog's API for trend data
  // For now, we'll return mock data based on business type and platform
  
  const keywordMap: Record<string, string[]> = {
    'E-commerce': ['shop now', 'limited time', 'free shipping', 'bestseller', 'exclusive'],
    'SaaS': ['productivity', 'automation', 'efficiency', 'growth', 'innovation'],
    'Restaurant': ['fresh', 'delicious', 'local', 'authentic', 'seasonal'],
    'Fitness': ['transform', 'strength', 'wellness', 'results', 'community'],
    'Education': ['learn', 'skills', 'career', 'certified', 'expert'],
    'Healthcare': ['wellness', 'care', 'trusted', 'professional', 'health'],
    'Real Estate': ['dream home', 'investment', 'location', 'luxury', 'opportunity'],
    'Finance': ['secure', 'growth', 'investment', 'trusted', 'financial'],
    'Travel': ['adventure', 'explore', 'experience', 'destination', 'memories'],
    'Other': ['quality', 'reliable', 'innovative', 'trusted', 'professional']
  };

  const platformMultipliers: Record<string, { engagement: number; ctr: number }> = {
    'Instagram': { engagement: 1.2, ctr: 0.9 },
    'Facebook': { engagement: 1.0, ctr: 1.0 },
    'LinkedIn': { engagement: 0.8, ctr: 1.3 },
    'Twitter': { engagement: 1.1, ctr: 0.8 },
    'Google Ads': { engagement: 0.7, ctr: 1.5 },
    'TikTok': { engagement: 1.5, ctr: 0.7 }
  };

  const baseEngagement = 75;
  const baseCTR = 2.5;
  
  const multiplier = platformMultipliers[platform] || { engagement: 1.0, ctr: 1.0 };
  
  return {
    trendingKeywords: keywordMap[businessType] || keywordMap['Other'],
    engagementPrediction: `${Math.round(baseEngagement * multiplier.engagement)}%`,
    clickRatePrediction: `${(baseCTR * multiplier.ctr).toFixed(1)}%`,
    recommendations: [
      `Optimize for ${platform} best practices`,
      `Use trending keywords in your copy`,
      `Include strong visual elements`,
      `Test different call-to-action phrases`
    ]
  };
}

export default posthog;