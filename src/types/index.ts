/**
 * COMPLETE TYPE SYSTEM FOR PHOTOPROMPTSHUB
 * Designed for new JSON structure with slug, badges, tags, seo
 */

// ============================================
// BADGE TYPE
// ============================================
export type BadgeType = 
  | 'trending'
  | 'new'
  | 'popular'
  | 'featured'
  | 'creator-pick'
  | 'viral'
  | 'premium';

export interface Badge {
  type: BadgeType;
  label: string;
  icon?: string;
}

// ============================================
// FAQ TYPE
// ============================================
export interface FaqItem {
  question: string;
  answer: string;
}

// ============================================
// SEO TYPE
// ============================================
export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// ============================================
// PROMPT TYPE (Main)
// ============================================
export interface Prompt {
  type?: 'image';
  id: string;
  title: string;
  slug: string;
  prompt: string;
  negativePrompt: string;
  tags: string[];
  displayTags?: string[];
  category: PromptCategory;
  occasion?: string;
  audience?: string;
  model: AIModel | string;
  modelLabel?: string;
  aspectRatio: AspectRatio;
  createdAt: string;
  updatedAt?: string;
  previewImage: string;
  badges?: Badge[];
  seo: SEO;
  seoIntro?: string;
  intro?: string;
  about_paragraphs?: string[];
  how_it_works?: string;
  who_is_it_for?: string;
  prompt_tips?: string[];
  what_is_paragraph?: string;
  what_is_closing_paragraph?: string;
  faq?: FaqItem[];
  author?: string;
  compatibleModels?: string[];
  howToSteps?: string[];
  tips?: string[];
  faqItems?: FaqItem[];
  relatedSlugs?: string[];
  wordCount?: number;
  copies?: number;
  isTrending?: boolean;
  
  // Optional fields for enrichment
  saves?: number;
  views?: number;
  isNew?: boolean;
}

// ============================================
// CATEGORY TYPE
// ============================================
export type PromptCategory = 
  | 'Portrait'
  | 'Landscape'
  | 'Product'
  | 'Abstract'
  | 'Architecture'
  | 'Nature'
  | 'Fashion'
  | 'Still Life'
  | 'Animals'
  | 'Fantasy'
  | 'Sci-Fi'
  | 'Illustration'
  | 'Photography'
  | 'Cinematic'
  | 'Other'
  | string;

// ============================================
// AI MODEL TYPE
// ============================================
export type AIModel = 
  | 'ChatGPT'
  | 'Gemini';

// ============================================
// ASPECT RATIO TYPE
// ============================================
export type AspectRatio = 
  | '1:1'
  | '4:3'
  | '4:5'
  | '16:9'
  | '9:16'
  | '3:2'
  | '2:3'
  | '3:4'
  | '21:9'
  | string;

// ============================================
// RELATED PROMPTS TYPE
// ============================================
export interface RelatedPrompts {
  byCategory: Prompt[];
  byTags: Prompt[];
  byModel: Prompt[];
}

// ============================================
// SEARCH FILTER TYPE
// ============================================
export interface SearchFilters {
  query?: string;
  category?: PromptCategory[];
  model?: AIModel[];
  tags?: string[];
  aspectRatio?: AspectRatio[];
  sortBy?: 'newest' | 'trending' | 'popular' | 'random';
}

// ============================================
// PAGINATED RESPONSE TYPE
// ============================================
export interface PaginatedPrompts {
  prompts: Prompt[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================
// COLLECTION TYPE
// ============================================
export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  prompts: Prompt[];
  thumbnail?: string;
  createdAt: string;
  saves: number;
}

// ============================================
// USER INTERACTION TYPE
// ============================================
export interface UserInteraction {
  promptId: string;
  copied: boolean;
  saved: boolean;
  shared: boolean;
  copiedAt?: string;
  savedAt?: string;
  sharedAt?: string;
}

// ============================================
// BREADCRUMB TYPE
// ============================================
export interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

// ============================================
// ANALYTICS EVENT TYPE
// ============================================
export interface AnalyticsEvent {
  type: 'view' | 'copy' | 'save' | 'share' | 'click';
  promptId: string;
  promptTitle: string;
  timestamp: string;
  source: 'homepage' | 'category' | 'search' | 'detail' | 'trending';
}

// ============================================
// SEO METADATA TYPE
// ============================================
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary_large_image' | 'summary';
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
}

// ============================================
// JSON-LD SCHEMA TYPES
// ============================================
export interface CreativeWorkSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image: string;
  author: {
    '@type': string;
    name: string;
  };
  datePublished: string;
  keywords: string[];
}

// ============================================
// UTILITY TYPES
// ============================================
export type PromptWithInteraction = Prompt & {
  userInteraction?: UserInteraction;
};

// ============================================
// VIDEO WORKFLOW TYPES
// ============================================
export interface VideoWorkflowStep {
  stepNumber: number;
  step?: number;
  title: string;
  platform: string;
  model: string;
  prompt: string;
  tips?: string[];
}

export interface VideoWorkflow {
  type: 'video-workflow';
  id: string;
  title: string;
  slug: string;
  description: string;
  workflowTitle?: string;
  category?: string;
  tags?: string[];
  displayTags?: string[];
  duration: string;
  aspectRatio: AspectRatio;
  resolution?: string;
  toolsUsed: string[];
  thumbnail: string;
  previewImage?: string;
  previewVideo?: string;
  badges?: Badge[];
  trendingBadges?: Badge[];
  steps: VideoWorkflowStep[];
  workflowSteps?: VideoWorkflowStep[];
  createdAt: string;
  updatedAt?: string;
  seo: SEO;
  modelLabel?: string;
  copies?: number;
  isTrending?: boolean;
  seoIntro?: string;
  author?: string;
  compatibleModels?: string[];
  howToSteps?: string[];
  tips?: string[];
  faqItems?: FaqItem[];
  relatedWorkflowSlugs?: string[];
  relatedSlugs?: string[];
  wordCount?: number;
}

export type HomepageContentItem = (Prompt & { type: 'image' }) | VideoWorkflow;

export type PromptCardProps = {
  prompt: Prompt;
  variant?: 'grid' | 'list' | 'carousel';
  onCopy?: (prompt: Prompt) => void;
  onSave?: (prompt: Prompt) => void;
  onShare?: (prompt: Prompt) => void;
};

export type PromptDetailPageProps = {
  prompt: Prompt;
  relatedPrompts: RelatedPrompts;
};

export type CategoryPageProps = {
  category: PromptCategory;
  prompts: PaginatedPrompts;
};

// ============================================
// COMPONENT PROP TYPES
// ============================================
export interface HeroSectionProps {
  totalPrompts: number;
  totalModels: number;
}

export interface TrendingSectionProps {
  prompts: Prompt[];
}

export interface CategorySectionProps {
  category: PromptCategory;
  prompts: Prompt[];
}

export interface SearchSectionProps {
  onSearch?: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export interface InfiniteScrollProps {
  initialPrompts: Prompt[];
  totalCount: number;
  onLoadMore?: (page: number) => Promise<Prompt[]>;
}

export interface PromptGridProps {
  prompts: Prompt[];
  isLoading?: boolean;
  variant?: 'grid' | 'masonry' | 'list';
}

// ============================================
// API RESPONSE TYPES
// ============================================
export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
