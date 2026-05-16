# Homepage Structure & Component Layout

## Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    HERO SECTION                             │
│                                                              │
│            AI Photo Prompts Made Simple                      │
│          (gradient text accent on "Made Simple")             │
│                                                              │
│      [Search bar with ⌘K hint and FiSearch icon]            │
│                                                              │
│    [Browse Prompts CTA]  [Explore Categories CTA]           │
│                                                              │
│    100+ Prompts | 5 AI Tools | Free Forever                 │
│         (animated counter with gradient text)               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                FILTER PILLS SECTION                         │
│                                                              │
│  Filter by AI Platform:                                     │
│  [Midjourney] [DALL-E] [Stable Diffusion] [Flux] [Firefly]  │
│                                                              │
│  Filter by Style:                                           │
│  [Portrait] [Landscape] [Abstract] [Product] [3D] [Photo]   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│          TRENDING THIS WEEK SECTION                         │
│                                                              │
│  Trending This Week                                         │
│  The most popular prompts right now                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  [CATEGORY]  │  │  [CATEGORY]  │  │  [CATEGORY]  │      │
│  │  [PLATFORM]  │  │  [PLATFORM]  │  │  [PLATFORM]  │      │
│  │              │  │              │  │              │      │
│  │   IMAGE      │  │   IMAGE      │  │   IMAGE      │      │
│  │   (16:9)     │  │   (16:9)     │  │   (16:9)     │      │
│  │              │  │              │  │              │      │
│  │              │  │  [COPY BTN]  │  │              │      │
│  │ Title        │  │ Title        │  │ Title        │      │
│  │ Description  │  │ Description  │  │ Description  │      │
│  │ View →       │  │ View →       │  │ View →       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│              [View All Trending Prompts →]                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│           NEWSLETTER SIGNUP SECTION                         │
│          (Dark gradient background)                         │
│                                                              │
│         Never miss new prompts                              │
│    Get the latest AI prompts weekly                         │
│                                                              │
│  [email input] [Subscribe button]                           │
│                                                              │
│                  ✓ Thanks for subscribing!                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            NEW ARRIVALS SECTION                             │
│                                                              │
│  New Arrivals                                               │
│  Recently added prompts                                     │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────┐
│  │ NEW [IMG]  │  │ NEW [IMG]  │  │ NEW [IMG]  │  │ NEW... │
│  │ 3:2 ratio  │  │ 3:2 ratio  │  │ 3:2 ratio  │  │        │
│  │ CATEGORY   │  │ CATEGORY   │  │ CATEGORY   │  │        │
│  │ Title      │  │ Title      │  │ Title      │  │        │
│  │ Platform→  │  │ Platform→  │  │ Platform→  │  │        │
│  └────────────┘  └────────────┘  └────────────┘  └────────┘
│  └────────────┘  └────────────┘  └────────────┘  └────────┘
│
│  Mobile: 1 column
│  Tablet (sm): 2 columns
│  Desktop (lg): 4 columns
│
│              [View All New Arrivals →]
└─────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. HomeHeroClient.jsx
**Location:** `src/components/HomeHeroClient.jsx`

```jsx
<section>
  {/* Gradient blur elements */}
  <div className="absolute ... blur-3xl opacity-20 animate-pulse" />
  
  {/* Main content */}
  <h1>AI Photo Prompts <span className="animate-gradient">Made Simple</span></h1>
  <p>Discovery copy...</p>
  
  {/* Search */}
  <div className="flex items-center gap-3">
    <FiSearch />
    <input placeholder="Search..." />
    <kbd>⌘K</kbd>
  </div>
  
  {/* CTAs */}
  <button className="gradient">Browse All Prompts</button>
  <Link className="bordered">Explore Categories</Link>
  
  {/* Stats */}
  <StatsCounter />
</section>
```

### 2. StatsCounter.jsx
**Location:** `src/components/StatsCounter.jsx`

```jsx
<div className="grid grid-cols-3">
  <div className="text-gradient">100+</div>
  <div className="text-gradient">5</div>
  <div className="text-gradient">Free</div>
</div>
```

Animates from 0 to final values on mount with `useEffect` + `setInterval` (60fps).

### 3. TrendingGrid.jsx
**Location:** `src/components/TrendingGrid.jsx`

```jsx
<section>
  <h2>Trending This Week</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {prompts.map(prompt => (
      <TrendingCard prompt={prompt} />
    ))}
  </div>
  <Link>View All Trending →</Link>
</section>
```

**TrendingCard Features:**
- Image 16:9 aspect ratio
- Category badge (blue, top-left)
- Platform badge (purple, top-right)
- Copy button (appears on hover)
- Title with gradient text on hover
- Border and shadow effects

### 4. NewArrivalsGrid.jsx
**Location:** `src/components/NewArrivalsGrid.jsx`

```jsx
<section>
  <h2>New Arrivals</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {prompts.map(prompt => (
      <NewArrivalCard prompt={prompt} />
    ))}
  </div>
  <Link>View All New Arrivals →</Link>
</section>
```

**NewArrivalCard Features:**
- Image 3:2 aspect ratio  
- NEW badge (red, top-right)
- Category tag (purple)
- Title with hover color
- Platform with arrow
- Hover scale-105

### 5. NewsletterCTA.jsx
**Location:** `src/components/NewsletterCTA.jsx`

```jsx
<section className="bg-gradient-to-r from-slate-900 to-slate-800">
  <h2>Never miss new prompts</h2>
  <p>Get the latest AI prompts weekly</p>
  
  <form>
    <input type="email" placeholder="Enter your email" />
    <button type="submit">Subscribe</button>
  </form>
  
  {submitted && <p className="text-green-400">✓ Thanks!</p>}
</section>
```

---

## Responsive Grid System

### Hero Section
```
┌─────────────────────────────────────┐
│    py-16 sm:py-24 lg:py-32         │
│                                     │
│       HEADLINE + SEARCH              │
│            BUTTONS                   │
│             STATS                    │
│                                     │
└─────────────────────────────────────┘
```

### Trending Grid
```
MOBILE (1 col):          TABLET (2 cols):       DESKTOP (3 cols):
┌────────────┐          ┌────────────┐        ┌────────────┐
│    Card    │          │    Card    │        │    Card    │
└────────────┘          └────────────┘        └────────────┘
┌────────────┐          ┌────────────┐        ┌────────────┐
│    Card    │          │    Card    │        │    Card    │
└────────────┘          └────────────┘        └────────────┘
┌────────────┐          ┌────────────┐        
│    Card    │          │    Card    │        
└────────────┘          └────────────┘        
```

### New Arrivals Grid
```
MOBILE (1 col):       TABLET (2 cols):        DESKTOP (4 cols):
┌────────┐           ┌────────┐              ┌────┐ ┌────┐
│ Card   │           │ Card   │              │Crd1│ │Crd2│
└────────┘           └────────┘              └────┘ └────┘
┌────────┐           ┌────────┐              ┌────┐ ┌────┐
│ Card   │           │ Card   │              │Crd3│ │Crd4│
└────────┘           └────────┘              └────┘ └────┘
┌────────┐           ┌────────┐              ...and more
│ Card   │           │ Card   │              
└────────┘           └────────┘              
```

---

## Breakpoints Reference

```
xs (mobile):  < 640px    [default]
sm (tablet):  ≥ 640px    [sm:]
md (tablet):  ≥ 768px    [md:]
lg (desktop): ≥ 1024px   [lg:]
xl (desktop): ≥ 1280px   [xl:]
2xl (large):  ≥ 1536px   [2xl:]
```

---

## Color Scheme

### Light Mode
```
Background:    white (#ffffff)
Text Primary:  slate-900 (#111827)
Text Secondary: slate-600 (#475569)
Accent:        blue-600 (#2563eb)
Borders:       slate-200 (#e2e8f0)
Hover:         slate-100 (#f1f5f9)
```

### Dark Mode
```
Background:    slate-950 (#030712)
Text Primary:  white (#ffffff)
Text Secondary: slate-300 (#cbd5e1)
Accent:        blue-400 (#60a5fa)
Borders:       slate-700 (#374151)
Hover:         slate-800 (#1e293b)
```

---

## Spacing & Sizing

```
Section Padding:  py-16 sm:py-20 lg:py-28
Container Width:  max-w-7xl
Container Padding: px-4 sm:px-6 lg:px-8
Gap Between Cards: gap-6 (24px)
Card Border Radius: rounded-xl, rounded-2xl
Button Padding:   px-6 py-3, px-8 py-4
Badge Padding:    px-3 py-1
```

---

## Animation Timings

```
Hover Effects:    duration-300, duration-500
Transition Type:  transition-all, transition-transform
Animation Easing: ease, ease-smooth
Pulse Animation:  animate-pulse (opacity oscillation)
Gradient Shift:   animate-gradient (8s, infinite)
```

---

## Hover Effects Summary

| Component | Hover Effect |
|-----------|--------------|
| Hero CTA (Primary) | scale-105, shadow-lg shadow-purple-500/50, gradient intensity |
| Hero CTA (Secondary) | border color change, bg-slate-100 dark:bg-slate-700 |
| Filter Pills | bg-blue-600 or purple-600, text-white |
| Trending Card | border-blue-500, scale-105, image zoom, copy button |
| New Arrival Card | border-purple-500, scale-105, image zoom |
| Search Input | ring-2 focus-visible |
| Newsletter Input | focus:outline focus:ring-2 |

---

## Dark Mode Implementation

Using `next-themes` with class strategy:

```jsx
// In app/providers.jsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>

// In components
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-white">Content</p>
</div>

// In globals.css - custom CSS
.dark body {
  background: #0f172a;
  color: #e5e7eb;
}
```

---

## SEO & Metadata

```jsx
export const metadata = {
  title: "PhotoPromptsHub - AI Image Prompts for Midjourney, DALL·E, Flux & Stable Diffusion",
  description: "Discover thousands of curated AI image prompts...",
  openGraph: {
    title: "PhotoPromptsHub - AI Image Prompts",
    description: "...",
    url: "https://photopromptshub.in",
    type: "website",
  },
};
```

---

## Performance Notes

✅ **Optimizations:**
- Image lazy loading via SmartImage
- CSS animations (GPU accelerated)
- Semantic HTML structure
- Proper heading hierarchy
- Alt text on images
- Keyboard navigation support

✅ **Lighthouse Targets:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## Accessibility Features

✅ **Keyboard Navigation:**
- Search bar: Enter submits
- ⌘K hint visible (desktop)
- Tab navigation through all elements
- Focus states visible

✅ **Screen Readers:**
- Proper heading structure (h1 → h2)
- Alt text on all images
- Semantic HTML (section, nav, article)
- aria-labels on icon buttons

✅ **Color Contrast:**
- Text on light: ≥ 4.5:1 ratio
- Text on dark: ≥ 4.5:1 ratio
- Gradient text readable with sufficient contrast

✅ **Motion:**
- Respects `prefers-reduced-motion`
- All animations can be disabled
- No auto-playing content

---

This structure provides a solid foundation for a modern, responsive, accessible homepage that performs well across all devices and screen sizes.
