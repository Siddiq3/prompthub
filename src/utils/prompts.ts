/**
 * UTILITY FUNCTIONS FOR PHOTOPROMPTSHUB
 * Helpers for data transformation, SEO, formatting, etc.
 */

import { Prompt, SEOMetadata, BadgeType, PromptCategory, AIModel } from '@/src/types';

// ============================================
// URL & SLUG UTILITIES
// ============================================

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove multiple hyphens
};

export const getPromptUrl = (slug: string): string => {
  return `/prompt/${slug}`;
};

export const getCategoryUrl = (category: PromptCategory): string => {
  const slug = createSlug(category);
  return `/category/${slug}`;
};

export const getModelUrl = (model: AIModel): string => {
  const slug = createSlug(model);
  return `/model/${slug}`;
};

export const getTagUrl = (tag: string): string => {
  const slug = createSlug(tag);
  return `/tag/${slug}`;
};

// ============================================
// SEO UTILITIES
// ============================================

export const generatePromptSEO = (prompt: Prompt): SEOMetadata => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://photopromptshub.in';
  const canonicalUrl = `${baseUrl}${getPromptUrl(prompt.slug)}`;

    const seo = (prompt.seo ?? {}) as any;
    return {
      title: seo.metaTitle || `${prompt.title} - AI Prompt for ${prompt.model}`,
      description: seo.metaDescription || `Get this stunning ${prompt.category.toLowerCase()} prompt for ${prompt.model}. Perfect for creating cinematic AI images.`,
      keywords: seo.keywords || prompt.tags,
      canonicalUrl,
      ogImage: prompt.previewImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      author: 'PhotoPromptsHub',
      publishedAt: prompt.createdAt,
    };
};

export const generateCategorySEO = (category: PromptCategory, count: number): SEOMetadata => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://photopromptshub.in';
  const canonicalUrl = `${baseUrl}${getCategoryUrl(category)}`;

  return {
    title: `${category} AI Prompts | ${count} Prompts | PhotoPromptsHub`,
    description: `Discover ${count} premium ${category.toLowerCase()} prompts for Midjourney, DALL-E, Flux & Stable Diffusion. Get cinematic results instantly.`,
    keywords: [category, 'AI prompts', 'Midjourney', 'DALL-E', 'Flux', 'image generation'],
    canonicalUrl,
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };
};

export const generateModelSEO = (model: AIModel, count: number): SEOMetadata => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://photopromptshub.in';
  const canonicalUrl = `${baseUrl}${getModelUrl(model)}`;

  return {
    title: `${model} Prompts | ${count} Prompts | PhotoPromptsHub`,
    description: `Explore ${count} expertly crafted prompts for ${model}. Get professional results with our AI image generation prompts.`,
    keywords: [model, 'AI prompts', 'image generation', 'prompt engineering'],
    canonicalUrl,
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };
};

// ============================================
// JSON-LD SCHEMA
// ============================================

export const generatePromptSchema = (prompt: Prompt) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://photopromptshub.in';
  
  const seo = (prompt.seo ?? {}) as any;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: prompt.title,
    description: seo.metaDescription || `AI prompt for ${prompt.title}`,
    image: prompt.previewImage,
    author: {
      '@type': 'Organization',
      name: 'PhotoPromptsHub',
      url: baseUrl,
    },
    datePublished: prompt.createdAt,
    keywords: Array.isArray(seo.keywords) ? seo.keywords.join(', ') : (prompt.tags?.join(', ') || ''),
    mainEntity: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${getPromptUrl(prompt.slug)}`,
    },
  };
};

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ label: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: crumb.url,
    })),
  };
};

// ============================================
// FORMAT UTILITIES
// ============================================

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

export const truncate = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
};

// ============================================
// BADGE UTILITIES
// ============================================

export const getBadgeColor = (badgeType: BadgeType): string => {
  const colors: Record<BadgeType, string> = {
    trending: 'bg-red-600 text-white',
    new: 'bg-blue-600 text-white',
    popular: 'bg-purple-600 text-white',
    featured: 'bg-yellow-600 text-white',
    'creator-pick': 'bg-pink-600 text-white',
    viral: 'bg-orange-600 text-white',
    premium: 'bg-amber-600 text-white',
  };
  return colors[badgeType] || 'bg-gray-600 text-white';
};

export const getBadgeIcon = (badgeType: BadgeType): string => {
  const icons: Record<BadgeType, string> = {
    trending: '🔥',
    new: '✨',
    popular: '⭐',
    featured: '👑',
    'creator-pick': '💎',
    viral: '🚀',
    premium: '💰',
  };
  return icons[badgeType] || '•';
};

// ============================================
// IMAGE UTILITIES
// ============================================

export const getOptimizedImageUrl = (
  imageUrl: string,
  width: number = 400,
  height: number = 400,
): string => {
  // For external images, return as is
  // For internal images, you can add optimization logic
  return imageUrl;
};

export const getImageDimensions = (aspectRatio: string): { width: number; height: number } => {
  const [w, h] = aspectRatio.split(':').map(Number);
  const baseWidth = 400;
  return {
    width: baseWidth,
    height: Math.round((baseWidth * h) / w),
  };
};

// ============================================
// SEARCH & FILTER UTILITIES
// ============================================

export const filterPrompts = (
  prompts: Prompt[],
  query?: string,
  category?: string,
  model?: string,
  tags?: string[],
): Prompt[] => {
  return prompts.filter((prompt) => {
    if (query) {
      const q = query.toLowerCase();
      const matchesQuery =
        prompt.title.toLowerCase().includes(q) ||
        prompt.prompt.toLowerCase().includes(q) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!matchesQuery) return false;
    }

    if (category && prompt.category !== category) return false;
    if (model && prompt.model !== model) return false;

    if (tags && tags.length > 0) {
      const hasAllTags = tags.every((tag) => prompt.tags.includes(tag));
      if (!hasAllTags) return false;
    }

    return true;
  });
};

export const sortPrompts = (
  prompts: Prompt[],
  sortBy: 'newest' | 'trending' | 'popular' | 'random' = 'newest',
): Prompt[] => {
  const sorted = [...prompts];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    case 'trending':
      return sorted.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));

    case 'popular':
      return sorted.sort((a, b) => (b.copies || 0) - (a.copies || 0));

    case 'random':
      return sorted.sort(() => Math.random() - 0.5);

    default:
      return sorted;
  }
};

// ============================================
// RELATED PROMPTS UTILITIES
// ============================================

export const getRelatedPrompts = (
  currentPrompt: Prompt,
  allPrompts: Prompt[],
  limit: number = 3,
) => {
  const byCategory = allPrompts
    .filter((p) => p.category === currentPrompt.category && p.id !== currentPrompt.id)
    .slice(0, limit);

  const byTags = allPrompts
    .filter(
      (p) =>
        p.tags.some((tag) => currentPrompt.tags.includes(tag)) &&
        p.id !== currentPrompt.id &&
        !byCategory.some((bp) => bp.id === p.id),
    )
    .slice(0, limit);

  const byModel = allPrompts
    .filter(
      (p) =>
        p.model === currentPrompt.model &&
        p.id !== currentPrompt.id &&
        !byCategory.some((bp) => bp.id === p.id) &&
        !byTags.some((bt) => bt.id === p.id),
    )
    .slice(0, limit);

  return { byCategory, byTags, byModel };
};

// ============================================
// STATS UTILITIES
// ============================================

export const getPromptStats = (prompts: Prompt[]) => {
  return {
    total: prompts.length,
    totalCopies: prompts.reduce((acc, p) => acc + (p.copies || 0), 0),
    totalSaves: prompts.reduce((acc, p) => acc + (p.saves || 0), 0),
    categories: [...new Set(prompts.map((p) => p.category))].length,
    models: [...new Set(prompts.map((p) => p.model))].length,
    tags: [...new Set(prompts.flatMap((p) => p.tags))].length,
  };
};

// ============================================
// VALIDATION UTILITIES
// ============================================

export const isValidPrompt = (prompt: unknown): prompt is Prompt => {
  if (!prompt || typeof prompt !== 'object') return false;
  const p = prompt as Record<string, unknown>;
  
  return (
    typeof p.id === 'string' &&
    typeof p.title === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.prompt === 'string' &&
    typeof p.category === 'string' &&
    typeof p.model === 'string' &&
    typeof p.createdAt === 'string' &&
    typeof p.previewImage === 'string'
  );
};

// ============================================
// CLIPBOARD UTILITIES
// ============================================

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const sharePrompt = async (prompt: Prompt): Promise<boolean> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://photopromptshub.in';
  const url = `${baseUrl}${getPromptUrl(prompt.slug)}`;
  const text = `Check out this amazing ${prompt.category} prompt for ${prompt.model}:\n\n"${truncate(prompt.prompt, 150)}"\n\n${url}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: prompt.title,
        text,
        url,
      });
      return true;
    } catch (err) {
      console.error('Share failed:', err);
      return false;
    }
  } else {
    return copyToClipboard(url);
  }
};

// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

export const getSavedPrompts = (): string[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('savedPrompts');
  return saved ? JSON.parse(saved) : [];
};

export const savePrompt = (promptId: string): void => {
  if (typeof window === 'undefined') return;
  const saved = getSavedPrompts();
  if (!saved.includes(promptId)) {
    saved.push(promptId);
    localStorage.setItem('savedPrompts', JSON.stringify(saved));
  }
};

export const unsavePrompt = (promptId: string): void => {
  if (typeof window === 'undefined') return;
  const saved = getSavedPrompts();
  const filtered = saved.filter((id) => id !== promptId);
  localStorage.setItem('savedPrompts', JSON.stringify(filtered));
};

export const isPromptSaved = (promptId: string): boolean => {
  if (typeof window === 'undefined') return false;
  return getSavedPrompts().includes(promptId);
};

// ============================================
// ANALYTICS UTILITIES
// ============================================

export const trackEvent = (eventName: string, eventData: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  
  try {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, eventData);
    }
  } catch (err) {
    console.debug('Analytics tracking failed:', err);
  }
};

export const trackPromptCopy = (prompt: Prompt) => {
  trackEvent('prompt_copy', {
    prompt_id: prompt.id,
    prompt_title: prompt.title,
    model: prompt.model,
    category: prompt.category,
  });
};

export const trackPromptSave = (prompt: Prompt) => {
  trackEvent('prompt_save', {
    prompt_id: prompt.id,
    prompt_title: prompt.title,
    model: prompt.model,
    category: prompt.category,
  });
};

export const trackPromptShare = (prompt: Prompt) => {
  trackEvent('prompt_share', {
    prompt_id: prompt.id,
    prompt_title: prompt.title,
    model: prompt.model,
    category: prompt.category,
  });
};
