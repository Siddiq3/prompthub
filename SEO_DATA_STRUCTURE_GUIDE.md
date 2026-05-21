# Data Structure Examples for Maximum SEO Impact

## Complete Prompt JSON Structure (With SEO Fields)

```json
{
  "id": "p0204",
  "title": "NTR Dragon Mass Action Hero AI Prompt",
  "slug": "ntr-dragon-movie-ai-prompt",
  "category": "Movie Style",
  "model": "Flux",
  "modelLabel": "Flux AI",
  "prompt": "A cinematic promotional poster of a muscular mass hero in full mass hero avatar, inspired by jr ntr in the movie dragon with industrial-style settings...",
  "previewImage": "https://cdn-images.huggingface.co/...",
  "copies": 1243,
  "isTrending": true,
  "createdAt": "2026-05-19",
  "tags": [
    "ntr",
    "jr-ntr",
    "dragon",
    "dragon-movie",
    "prashanth-neel",
    "mass-hero",
    "telugu-movie",
    "action",
    "cinematic",
    "south-indian",
    "movie-poster"
  ],
  "displayTags": [
    "ntr",
    "mass-hero",
    "movie-style"
  ],
  "seoIntro": "Create stunning NTR Dragon movie-style AI images with this professional Flux prompt.",
  "seo": {
    "metaTitle": "NTR Dragon Movie AI Prompt – Prashanth Neel Mass Hero Style | PhotoPromptsHub",
    "metaDescription": "Create cinematic Telugu mass hero AI photos inspired by Jr NTR's Dragon movie. Professional Flux prompt for movie-style action shots with industrial settings.",
    "keywords": [
      "ntr dragon ai prompt",
      "jr ntr dragon movie ai prompt",
      "prashanth neel movie style ai",
      "dragon movie ai image prompt",
      "telugu movie ai prompt",
      "mass hero ai prompt",
      "flux ai movie prompt"
    ]
  }
}
```

---

## How Each Field Helps SEO

| Field | Purpose | SEO Impact |
|-------|---------|-----------|
| `title` | Display name on site | High - visible in UI |
| `slug` | URL path | ⭐⭐⭐ Critical - in URL /prompt/[slug] |
| `tags` | Keyword signals | ⭐⭐⭐ High - all included in metadata |
| `category` | Content organization | Medium - helps Google understand type |
| `seo.metaTitle` | Search result title | ⭐⭐⭐⭐⭐ CRITICAL - what users see |
| `seo.metaDescription` | Search result snippet | ⭐⭐⭐⭐ High - clickability |
| `seo.keywords` | Primary keywords | ⭐⭐⭐ High - ranking signals |
| `prompt` | Full content | ⭐ Low - not visible but indexed |

---

## Real Examples: Before vs After

### Example 1: Generic vs Optimized

**BEFORE (Generic):**
```json
{
  "title": "Dragon Movie Prompt",
  "tags": ["movie"],
  "seo": {
    "metaTitle": "Dragon Movie Prompt",
    "metaDescription": "A movie style prompt"
  }
}
```

**Problem**: 
- Zero keyword targeting
- Generic title won't rank
- Description too short
- Users won't click

**AFTER (Optimized):**
```json
{
  "title": "NTR Dragon Mass Action Hero AI Prompt",
  "tags": [
    "ntr",
    "jr-ntr", 
    "dragon",
    "dragon-movie",
    "prashanth-neel",
    "mass-hero",
    "telugu-movie",
    "action",
    "movie-poster",
    "cinematic"
  ],
  "seo": {
    "metaTitle": "NTR Dragon Movie AI Prompt – Prashanth Neel Mass Hero Style",
    "metaDescription": "Create cinematic Telugu mass hero AI photos inspired by Jr NTR's Dragon movie with Flux. Professional prompt for action shots.",
    "keywords": [
      "ntr dragon ai prompt",
      "jr ntr dragon movie ai prompt",
      "prashanth neel ai prompt",
      "dragon movie ai prompt"
    ]
  }
}
```

**Benefit**:
- ✅ Ranks for "ntr dragon ai prompt" search
- ✅ Ranks for "jr ntr" search
- ✅ Ranks for "dragon movie ai" search
- ✅ 10 tags provide keyword signals
- ✅ Higher click-through rate from results

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Keyword Stuffing
```json
{
  "seo": {
    "metaTitle": "ntr prompt jr ntr prompt dragon prompt ai prompt flux prompt midjourney",
    "metaDescription": "ntr ntr ntr dragon dragon movie ai prompt ai ai ai"
  }
}
```
**Problem**: Google will penalize this as spammy. Max title 60 chars, description 160 chars.

### ✅ Correct Version:
```json
{
  "seo": {
    "metaTitle": "NTR Dragon Movie AI Prompt – Prashanth Neel Style",
    "metaDescription": "Create cinematic Telugu mass hero AI photos inspired by Jr NTR's Dragon movie. Professional Flux AI prompt."
  }
}
```

---

### ❌ Mistake 2: Generic Keywords
```json
{
  "tags": [
    "prompt",
    "ai",
    "image",
    "photo",
    "style"
  ]
}
```
**Problem**: Too generic. Every prompt has these. Not specific enough to rank.

### ✅ Correct Version:
```json
{
  "tags": [
    "ntr",
    "jr-ntr",
    "dragon",
    "dragon-movie",
    "prashanth-neel",
    "mass-hero",
    "telugu-movie",
    "action",
    "cinematic"
  ]
}
```

---

### ❌ Mistake 3: Same Title for Similar Prompts
```json
[
  {
    "title": "Action Movie Prompt 1",
    "slug": "action-movie-prompt-1",
    "seo": { "metaTitle": "Action Movie Prompt" }
  },
  {
    "title": "Action Movie Prompt 2",
    "slug": "action-movie-prompt-2", 
    "seo": { "metaTitle": "Action Movie Prompt" }  // DUPLICATE!
  }
]
```
**Problem**: Duplicate titles confuse Google. Each page needs unique title.

### ✅ Correct Version:
```json
[
  {
    "title": "NTR Dragon Mass Hero AI Prompt",
    "slug": "ntr-dragon-movie-ai-prompt",
    "seo": { "metaTitle": "NTR Dragon Movie AI Prompt – Prashanth Neel Mass Hero Style" }
  },
  {
    "title": "Yash KGF Rocky AI Prompt",
    "slug": "yash-kgf-rocky-ai-prompt",
    "seo": { "metaTitle": "Yash KGF Rocky AI Prompt – Rocking Star Action Hero Style" }
  }
]
```

---

## SEO Score Calculator

Use this to rate your prompts:

```
SEO Score = (Title Quality × 30%) + (Description Quality × 25%) + (Tags Quality × 25%) + (Slug Quality × 20%)

Title Quality Score:
  ✅ Includes main keyword: +20%
  ✅ Under 60 characters: +5%
  ✅ Includes location/specific: +5%

Description Quality Score:
  ✅ 150-160 characters: +10%
  ✅ Includes 3+ keywords naturally: +10%
  ✅ Clear call-to-action: +5%

Tags Quality Score:
  ✅ 8+ specific tags: +15%
  ✅ Tags match description: +10%
  ✅ No duplicate tags: +0%

Slug Quality Score:
  ✅ Matches title: +10%
  ✅ 3+ words separated by dash: +5%
  ✅ No special characters: +5%

TOTAL SCORE:
80-100: Excellent (will rank)
60-79: Good (might rank)
40-59: Fair (unlikely to rank)
Below 40: Poor (won't rank)
```

---

## Quick Template to Copy-Paste

Use this template for new prompts:

```json
{
  "id": "pXXXX",
  "title": "[Celebrity/Director] [Movie] [Style] AI Prompt",
  "slug": "[celebrity-movie-style-ai-prompt]",
  "category": "[Category Name]",
  "model": "[Flux/Midjourney/DALLE/Stable Diffusion]",
  "prompt": "[Your detailed prompt here...]",
  "previewImage": "[Image URL]",
  "tags": [
    "[celebrity-first-name]",
    "[celebrity-full-name]",
    "[movie-name]",
    "[movie-year]",
    "[director-name]",
    "[style-adjective-1]",
    "[style-adjective-2]",
    "[genre]",
    "[mood]"
  ],
  "displayTags": [
    "[tag-1]",
    "[tag-2]",
    "[tag-3]"
  ],
  "seo": {
    "metaTitle": "[Celebrity] [Movie] AI Prompt – [Director/Style] Name",
    "metaDescription": "Create [descriptive style] AI images inspired by [Celebrity]'s [Movie]. Professional [Model] prompt for [use case].",
    "keywords": [
      "[celebrity] [movie] ai prompt",
      "[celebrity] [movie] ai image",
      "[director] movie style ai prompt",
      "[celebrity] style ai prompt"
    ]
  }
}
```

---

## How to Bulk Update JSON

If you have 100 prompts without SEO fields:

### Option 1: Manual (Slow - 3-5 minutes per prompt)
1. Open prompt JSON
2. Add `seo` object with `metaTitle`, `metaDescription`, `keywords`
3. Save

### Option 2: Script (Fast - 100 in 5 minutes)
```javascript
// For each prompt, run:
prompt.seo = {
  metaTitle: `${prompt.title} | AI Prompt for ${prompt.model}`,
  metaDescription: `Create ${prompt.category} style AI images with this ${prompt.model} prompt. ${prompt.tags.slice(0,3).join(', ')}`,
  keywords: prompt.tags.slice(0, 5)
}
```

### Option 3: AI Generation (Fastest - ask me to create script)
I can write a Node.js script to auto-generate SEO fields for all prompts from existing data.

---

## Testing Your SEO Data

### Test 1: Check URL Slug
```
✅ GOOD: /prompt/ntr-dragon-movie-ai-prompt
❌ BAD:  /prompt/p0204
❌ BAD:  /prompt/NTR%20Dragon%20Movie
```

### Test 2: Check Title Length
```
✅ GOOD: "NTR Dragon Movie AI Prompt – Prashanth Neel Mass Hero Style" (60 chars)
❌ BAD:  "Dragon" (too short)
❌ BAD:  "NTR Dragon Movie AI Prompt for Flux and Midjourney and DALLE and Stable Diffusion" (too long - 80+ chars)
```

### Test 3: Check Description Length
```
✅ GOOD: "Create cinematic Telugu mass hero AI photos inspired by Jr NTR's Dragon movie." (80 chars)
❌ BAD:  "Dragon movie prompt" (too short - 19 chars)
❌ BAD:  [whole paragraph] (too long - 300+ chars)
```

### Test 4: Check Tags
```
✅ GOOD: ["ntr", "jr-ntr", "dragon", "mass-hero", "action"]
❌ BAD:  ["ai", "prompt", "image"]
❌ BAD:  ["ntr", "ntr", "ntr"] (duplicates)
```

---

## Final Checklist Before Uploading

For each prompt, verify:
- ✅ `title` is descriptive (3+ words)
- ✅ `slug` is URL-friendly (no spaces, lowercase, dashes)
- ✅ `seo.metaTitle` is 55-60 characters
- ✅ `seo.metaDescription` is 155-160 characters
- ✅ `seo.keywords` is 4-6 phrases
- ✅ `tags` has 8-10 specific terms
- ✅ `tags` match description keywords
- ✅ No duplicate tags
- ✅ Category matches content type

When done: Submit to Google Search Console again for re-crawl.
