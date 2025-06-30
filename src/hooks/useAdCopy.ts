import { useState } from 'react';
import { AdGenerationParams, generateAdContentWithFallback } from '../lib/api';
import { GeneratedAdContent } from '../lib/api/openai';

interface UseAdCopyParams extends AdGenerationParams {
  preferGroq?: boolean;
}

export function useAdCopy() {
  const [adContent, setAdContent] = useState<GeneratedAdContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAd = async (params: UseAdCopyParams) => {
    const { preferGroq = true, ...adParams } = params;
    
    setLoading(true);
    setError(null);

    try {
      // Generate ad content using Groq with fallback to OpenAI
      const content = await generateAdContentWithFallback(adParams, preferGroq);
      setAdContent(content);
      return content;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to generate ad content';
      setError(errorMessage);
      console.error('Ad generation error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    adContent,
    loading,
    error,
    generateAd
  };
}