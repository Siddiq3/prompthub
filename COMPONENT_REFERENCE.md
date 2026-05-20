# 📚 COMPONENT REFERENCE GUIDE

Quick reference for all components, props, and usage patterns.

---

## ✅ PromptCard

**File**: `src/components/PromptCard.tsx`
**Type**: Client Component
**Status**: Complete & Production Ready

### Props
```typescript
interface PromptCardProps {
  prompt: Prompt;
  variant?: 'grid' | 'list' | 'carousel';
}
```

### Usage
```typescript
import PromptCard from '@/src/components/PromptCard';

// Grid variant (default)
<PromptCard prompt={prompt} variant="grid" />

// List variant (horizontal)
<PromptCard prompt={prompt} variant="list" />

// Carousel variant (full-width)
<PromptCard prompt={prompt} variant="carousel" />
```

### Features
- ✅ Image zoom on hover
- ✅ Badge display with animations
- ✅ Copy/Save/Share buttons
- ✅ 4-layer copy feedback
- ✅ Haptic feedback on mobile
- ✅ LocalStorage sync for saves
- ✅ Analytics tracking

### Styling
- Grid: aspect-square, rounded-2xl
- List: horizontal layout, thumbnail
- All: glassmorphism, spring animations

---

## ✅ PromptDetail

**File**: `src/components/PromptDetail.tsx`
**Type**: Client Component
**Status**: Complete & Production Ready

### Props
```typescript
interface PromptDetailProps {
  prompt: Prompt;
  relatedPrompts: RelatedPrompts;
}
```

### Usage
```typescript
import PromptDetail from '@/src/components/PromptDetail';

<PromptDetail 
  prompt={singlePrompt} 
  relatedPrompts={getRelatedPrompts(singlePrompt, allPrompts)}
/>
```

### Features
- ✅ Large hero image
- ✅ Sticky breadcrumb navigation
- ✅ Stats display (copies, saves)
- ✅ Prompt section with copy
- ✅ Negative prompt section
- ✅ Tags section with links
- ✅ Sidebar with details card
- ✅ Related prompts (3 categories)
- ✅ Sticky mobile CTA
- ✅ Copy state management

### Sections
- Hero image with badges
- Title + Meta info
- Copy/Share buttons
- Prompt section
- Negative prompt section
- Tags section
- Sidebar details
- Related prompts grid

---

## ✅ PromptGrid

**File**: `src/components/PromptGrid.tsx`
**Type**: Client Component
**Status**: Complete & Production Ready

### Props
```typescript
interface PromptGridProps {
  prompts: Prompt[];
  variant?: 'grid' | 'masonry' | 'list';
  isLoading?: boolean;
}
```

### Usage
```typescript
import PromptGrid from '@/src/components/PromptGrid';

// Grid layout (3 columns on desktop)
<PromptGrid prompts={prompts} variant="grid" />

// Masonry layout (Pinterest-style)
<PromptGrid prompts={prompts} variant="masonry" />

// List layout (horizontal)
<PromptGrid prompts={prompts} variant="list" />

// With loading state
<PromptGrid prompts={prompts} isLoading={isLoading} />
```

### Features
- ✅ 3 layout variants
- ✅ Staggered animations
- ✅ Loading skeleton state
- ✅ Empty state handling
- ✅ Responsive (1-4 columns)
- ✅ Smooth transitions

### Breakpoints
```
xs: 1 column
sm: 2 columns
lg: 3 columns
xl: 4 columns
```

---

## ✅ HomeHeroClient

**File**: `src/components/HomeHeroClient.tsx`
**Type**: Client Component
**Status**: Complete & Production Ready

### Props
```typescript
interface HomeHeroClientProps {
  totalPrompts: number;
  totalModels: number;
}
```

### Usage
```typescript
import HomeHeroClient from '@/src/components/HomeHeroClient';

<HomeHeroClient totalPrompts={1500} totalModels={8} />
```

### Features
- ✅ Dynamic stats display
- ✅ Search bar integration
- ✅ Animated counters
- ✅ CTA button
- ✅ Responsive design
- ✅ Gradient backgrounds

---

## ✅ TrendingCarousel

**File**: `src/components/TrendingCarousel.tsx`
**Type**: Client Component
**Status**: Complete & Production Ready

### Props
```typescript
interface TrendingCarouselProps {
  prompts: Prompt[];
}
```

### Usage
```typescript
import TrendingCarousel from '@/src/components/TrendingCarousel';

<TrendingCarousel prompts={trendingPrompts} />
```

### Features
- ✅ Auto-rotation (4 seconds)
- ✅ Manual navigation (prev/next)
- ✅ Thumbnail strip
- ✅ Dot indicators
- ✅ Pause on hover
- ✅ Full-width hero layout
- ✅ Badge display
- ✅ View prompt link

### Interactions
- Click thumbnail to jump
- Click dot to jump
- Click arrow to navigate
- Auto-advances every 4s
- Pauses on hover

---

## ✅ CategoryShowcase

**File**: `src/components/CategoryShowcase.tsx`
**Type**: Client Component
**Status**: Complete & Production Ready

### Props
```typescript
interface CategoryShowcaseProps {
  category: PromptCategory;
  count: number;
  image?: string;
}
```

### Usage
```typescript
import CategoryShowcase from '@/src/components/CategoryShowcase';

<CategoryShowcase 
  category="Portrait" 
  count={250}
/>
```

### Features
- ✅ Emoji icon per category
- ✅ Count display
- ✅ Hover animations
- ✅ Links to category page
- ✅ Responsive cards
- ✅ Touch-friendly

### Categories with Emojis
```
Portrait → 👤
Landscape → 🏔️
Product → 📦
Abstract → 🎨
Architecture → 🏛️
Nature → 🌿
Fashion → 👗
Still Life → 🍎
Animals → 🦁
Fantasy → ✨
Sci-Fi → 🛸
Illustration → 🖼️
Photography → 📷
Cinematic → 🎬
Other → 🎯
```

---

## ✅ NewsletterCTA

**File**: `src/components/NewsletterCTA.tsx`
**Type**: Client Component
**Status**: Complete & Production Ready

### Props
```typescript
// No props required - self-contained
```

### Usage
```typescript
import NewsletterCTA from '@/src/components/NewsletterCTA';

<NewsletterCTA />
```

### Features
- ✅ Email input validation
- ✅ Submit button with loading state
- ✅ Success/error messages
- ✅ Auto-dismiss notifications
- ✅ Social proof text
- ✅ Animated gradient background
- ✅ Responsive design

### Form States
- Idle - Ready for input
- Loading - Sending email
- Success - ✓ Subscribed
- Error - Try again message

### API Integration
TODO: Replace fetch to `/api/subscribe` endpoint:
```typescript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
```

---

## 🎨 PAGE ROUTES

### Homepage
**File**: `app/page.tsx`
**Type**: Server Component
**Status**: Complete & Production Ready

**Sections**:
- HomeHeroClient (hero + search)
- TrendingCarousel (trending prompts)
- PromptGrid (latest 16 prompts)
- CategoryShowcase (8 categories)
- NewsletterCTA
- Features section

**Data**:
```typescript
const prompts = await getPrompts();
const stats = getPromptStats(prompts);
const trendingPrompts = sortPrompts(prompts, 'trending').slice(0, 6);
const latestPrompts = sortPrompts(prompts, 'newest').slice(0, 16);
```

---

### Prompt Detail Page
**File**: `app/prompt/[slug]/page.tsx`
**Type**: Server + Client Component
**Status**: Complete & Production Ready

**Features**:
- Dynamic slug-based routing
- Server-side data fetching
- Metadata generation
- JSON-LD schema injection
- Related prompts calculation
- generateStaticParams() for SSG

**Data**:
```typescript
const prompts = await getPrompts();
const prompt = prompts.find(p => p.slug === params.slug);
const relatedPrompts = getRelatedPrompts(prompt, prompts);
```

---

### Category Page
**File**: `app/category/[name]/page.tsx`
**Type**: Server + Client Component
**Status**: Complete & Production Ready

**Features**:
- Dynamic category routing (14 categories)
- Sort options (newest, trending, popular, random)
- Breadcrumb navigation
- generateStaticParams() for SSG
- Filtered PromptGrid display

**Data**:
```typescript
const categoryPrompts = prompts.filter(p => p.category === category);
const sortedPrompts = sortPrompts(categoryPrompts, sort);
```

---

## 🔧 UTILITY FUNCTIONS

### URL/Slug Utilities
```typescript
createSlug(title: string): string
// "Hello World" → "hello-world"

getPromptUrl(slug: string): string
// "my-prompt" → "/prompt/my-prompt"

getCategoryUrl(category: PromptCategory): string
// "Portrait" → "/category/portrait"

getModelUrl(model: AIModel): string
// "Midjourney" → "/model/midjourney"

getTagUrl(tag: string): string
// "cinematic" → "/tag/cinematic"
```

### SEO Utilities
```typescript
generatePromptSEO(prompt: Prompt): SEO
// Generate complete SEO metadata

generateCategorySEO(category: PromptCategory, count: number): SEO
// Generate category-specific SEO

generatePromptSchema(prompt: Prompt): object
// Generate JSON-LD schema

generateBreadcrumbSchema(breadcrumbs: Array): object
// Generate breadcrumb schema
```

### Formatting
```typescript
formatDate(dateString: string): string
// "2026-05-19" → "May 19, 2026"

formatCount(number: number): string
// 1500 → "1.5K"

truncate(text: string, length: number): string
// Truncate with "..."

getBadgeColor(type: BadgeType): string
// Return Tailwind classes for badge

getBadgeIcon(type: BadgeType): string
// Return emoji for badge type
```

### Search & Filter
```typescript
filterPrompts(prompts: Prompt[], filters: SearchFilters): Prompt[]
// Filter by query, category, model, tags

sortPrompts(prompts: Prompt[], sortBy: string): Prompt[]
// Sort by newest, trending, popular, random

getRelatedPrompts(prompt: Prompt, allPrompts: Prompt[]): RelatedPrompts
// Get related by category, tags, model
```

### Interactions
```typescript
copyToClipboard(text: string): Promise<boolean>
// Copy to clipboard with fallback

sharePrompt(prompt: Prompt): Promise<boolean>
// Native share or copy link

isPromptSaved(promptId: string): boolean
// Check localStorage

savePrompt(promptId: string): void
// Save to localStorage

unsavePrompt(promptId: string): void
// Remove from localStorage
```

### Analytics
```typescript
trackEvent(name: string, data: object): void
// Track custom analytics event

trackPromptCopy(prompt: Prompt): void
// Track copy event

trackPromptSave(prompt: Prompt): void
// Track save event

trackPromptShare(prompt: Prompt): void
// Track share event
```

---

## 🎯 IMPORT PATTERNS

### Importing Components
```typescript
import PromptCard from '@/src/components/PromptCard';
import PromptDetail from '@/src/components/PromptDetail';
import PromptGrid from '@/src/components/PromptGrid';
import HomeHeroClient from '@/src/components/HomeHeroClient';
import TrendingCarousel from '@/src/components/TrendingCarousel';
import CategoryShowcase from '@/src/components/CategoryShowcase';
import NewsletterCTA from '@/src/components/NewsletterCTA';
```

### Importing Types
```typescript
import type {
  Prompt,
  PromptCategory,
  AIModel,
  AspectRatio,
  Badge,
  SEO,
  RelatedPrompts,
  SearchFilters,
} from '@/src/types';
```

### Importing Utilities
```typescript
import {
  createSlug,
  getPromptUrl,
  getCategoryUrl,
  filterPrompts,
  sortPrompts,
  getRelatedPrompts,
  generatePromptSEO,
  generatePromptSchema,
  copyToClipboard,
  trackPromptCopy,
} from '@/src/utils/prompts';
```

### Importing Data
```typescript
import { getPrompts } from '@/src/lib/data';

const prompts = await getPrompts();
```

---

## 📊 COMMON PATTERNS

### Fetching Prompts (Server Component)
```typescript
import { getPrompts } from '@/src/lib/data';

const allPrompts = await getPrompts();
const singlePrompt = allPrompts.find(p => p.slug === slug);
```

### Calculating Related (Server or Utility)
```typescript
import { getRelatedPrompts } from '@/src/utils/prompts';

const relatedPrompts = getRelatedPrompts(prompt, allPrompts);
// Returns { byCategory: [], byTags: [], byModel: [] }
```

### Generating Metadata (Server Component)
```typescript
import { generatePromptSEO } from '@/src/utils/prompts';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = generatePromptSEO(prompt);
  return {
    title: seo.title,
    description: seo.description,
    // ... etc
  };
}
```

### Using Copy Button (Client Component)
```typescript
const [copyState, setCopyState] = useState('idle');

const handleCopy = async () => {
  setCopyState('copying');
  const success = await copyToClipboard(prompt.prompt);
  if (success) {
    setCopyState('success');
    trackPromptCopy(prompt);
    setTimeout(() => setCopyState('idle'), 2000);
  }
};
```

---

**Last Updated**: May 19, 2026
**Version**: 2.0 Complete
**Status**: Ready to Use ✅
