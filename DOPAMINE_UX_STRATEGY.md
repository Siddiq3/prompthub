# 🧠 PhotoPromptsHub: High-Dopamine UX Strategy
## A Behavioral Psychology & Growth Design System

---

## 📋 TABLE OF CONTENTS
1. [Homepage Experience](#1-homepage-experience)
2. [Prompt Card Design](#2-prompt-card-design)
3. [Retention System](#3-retention-system)
4. [Mobile UX](#4-mobile-ux)
5. [Microinteractions](#5-microinteractions)
6. [Visual Design Language](#6-visual-design-language)
7. [Gamification](#7-gamification)
8. [Psychology Principles](#8-psychology-principles)
9. [AdSense Optimization](#9-adsense-optimization)
10. [Implementation Guide](#10-implementation-guide)

---

## 1. HOMEPAGE EXPERIENCE

### 🎯 First 3-Second Hook Strategy

**Goal:** Capture attention before Instagram Reels users bounce.

#### A. Hero Section - Instant Gratification Design

```
PSYCHOLOGICAL PRINCIPLE: Immediate value visualization
```

**Design:**
```jsx
// Hero shows THREE instant-reward elements:

1. HEADLINE IMPACT (0-0.5s)
   "201+ AI-Powered Prompts Ready to Copy"
   - Scarcity + social proof + action verb
   - Use pulsing number animation (201+ → grows)
   - Creates FOMO: "others are using these"

2. SEARCH BAR (0.5-1s)
   - Oversized, glowing search input
   - Placeholder: "Try: 'cinematic portrait'..."
   - Micro-animation: input grows on scroll
   - Suggests: search creates instant results

3. TRENDING BADGES (1-1.5s)
   - 3-4 trending tags floating/pulsing
   - "#ViralPhotography", "#CinematicPortrait"
   - Auto-rotate every 3 seconds
   - Each shows: "↑ 340% this week"
   - Trigger: FOMO + novelty + social proof
```

**Framer Motion Implementation:**
```javascript
// Pulsing number animation - triggers dopamine hit
<motion.div
  animate={{ scale: [1, 1.15, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
>
  201+
</motion.div>

// Staggered badge rotation - novelty every 3s
const badges = ["#ViralPhotography", "#Cinematic", "#TrendingNow"];
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
  key={currentBadge}
  initial={{ opacity: 0, y: 10 }}
  exit={{ opacity: 0, y: -10 }}
>
  {badges[currentBadge]} ↑ {trendPercent}%
</motion.div>
```

**Psychology Triggers:**
- **Scarcity**: "201 prompts" = limited resource perception
- **Social Proof**: Number + "trending" = others approve
- **FOMO**: "↑ 340% this week" = missing out feeling
- **Novelty**: Rotating badges = new content every view

---

#### B. "Copy This Prompt" Micro-Engagement (Hero CTA)

**Design:**
- Hero features ONE featured "prompt of the moment"
- Large card with mosaic image preview
- Big copy button: **"Copy This Prompt"**
- Micro-interaction: Button glows when hovering, creates haptic-like feedback via animation
- **Psychology**: First action should be friction-free copying

```jsx
<motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.8)" }}
  whileTap={{ scale: 0.95 }}
  className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600"
>
  <span className="relative z-10">Copy This Prompt</span>
  
  {/* Glow effect */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
    animate={{ x: ['-100%', '100%'] }}
    transition={{ duration: 2, repeat: Infinity }}
    style={{ opacity: 0.3 }}
  />
</motion.button>
```

---

#### C. Visual Hierarchy - The "Hook Chain"

**Psychology**: Progressive disclosure of value keeps scrolling momentum

```
ABOVE FOLD (Immediate):
├─ Headline: "201+ AI Photo Prompts Ready to Use"
├─ Search bar (largest interactive element)
├─ Featured prompt card with COPY button
└─ 3 trending tags rotating

SCROLL #1 (1-2 second scroll):
├─ Stats section: "Used by 50K+ Creators" + daily active users
├─ Quick category pills: "Portraits", "Landscapes", "Abstract"
└─ Call-to-action: "Explore Trending Now →"

SCROLL #2 (2-4 seconds):
├─ "Trending This Week" section
├─ Infinite scroll grid begins
└─ First 3 cards fully visible for maximum engagement
```

**Metrics to Optimize:**
- Time to first click: < 3 seconds
- Time to first copy: < 5 seconds  
- Scroll depth: 60% of users scroll 2+ screens

---

### 🔄 Trending Section - Curiosity Loop Design

**Psychology**: Artificial scarcity + rotation = constant novelty

```jsx
// Trending Section Component

SECTION STRUCTURE:
├─ Header: "🔥 Trending This Week"
│  └─ Subtext: "Updated hourly • 340% more saves today"
│
├─ Carousel (2-3 cards visible on desktop, 1 on mobile)
│  ├─ Auto-rotation every 4 seconds
│  ├─ Manual swipe capability
│  └─ Progress dots (each dot is clickable)
│
└─ Meta-social proof
   ├─ "👤 15.2K people saved this"
   ├─ "💚 Used by trending creators"
   └─ "⚡ Trending last 6 hours"

// Framer Motion Carousel
<motion.div
  animate={{ x: -100 * currentSlide }}
  transition={{ type: 'spring', damping: 25, stiffness: 120 }}
  className="flex gap-4"
>
  {trendingPrompts.map((prompt) => (
    <PromptCard key={prompt.id} prompt={prompt} />
  ))}
</motion.div>

// Auto-advance with pause on hover
useEffect(() => {
  const timer = setTimeout(() => {
    setCurrentSlide((s) => (s + 1) % trendingPrompts.length);
  }, 4000);
  
  return () => clearTimeout(timer);
}, [currentSlide, isPaused]);
```

**Dopamine Triggers:**
- **Anticipation**: Auto-rotation creates "what's next?" curiosity
- **Rotation**: Every 4s = new stimulus = dopamine reset
- **Micro-progress**: Dots show you're exploring (progress = reward)
- **Social validation**: Meta counts ("15.2K saved") = social proof

---

## 2. PROMPT CARD DESIGN

### 💳 Card Anatomy - Viral Engagement Architecture

```
┌─────────────────────────────────────┐
│   PREVIEW IMAGE (70% of card)       │  ← Largest element
│   - Cinematic gradient overlay      │
│   - Difficulty badge (Easy/Pro)     │
│   - Category tag                    │
└─────────────────────────────────────┘
│ TITLE: "Cinematic Portrait Studio"  │  ← Emotion trigger
│ Description: "Golden hour, bokeh..." │  ← Context
├─────────────────────────────────────┤
│ 👤 4.2K  💚 1.8K  ⚡ 340% trending  │  ← Social proof
├─────────────────────────────────────┤
│ [COPY] [SAVE] [SHARE]               │  ← CTAs
└─────────────────────────────────────┘
```

### ✨ Card Hover States - Microinteraction Paradise

**Desktop Interaction:**

```javascript
// Card reveal animation on hover
<motion.div
  initial={{ y: 0 }}
  whileHover={{ y: -12, boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
  transition={{ duration: 0.3 }}
  className="relative overflow-hidden rounded-2xl group cursor-pointer"
>
  {/* Image with zoom + overlay */}
  <motion.img
    whileHover={{ scale: 1.15 }}
    transition={{ duration: 0.4 }}
    src={prompt.image}
    className="w-full aspect-square object-cover"
  />
  
  {/* Gradient overlay appears on hover */}
  <motion.div
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
    transition={{ duration: 0.2 }}
  >
    {/* Quick action buttons appear */}
    <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2">
      <QuickCopyButton prompt={prompt} />
      <QuickSaveButton prompt={prompt} />
    </div>
  </motion.div>

  {/* Difficulty badge - animated entrance */}
  <motion.div
    initial={{ scale: 0, rotate: -45 }}
    whileHover={{ scale: 1, rotate: 0 }}
    className="absolute top-3 left-3 px-3 py-1 bg-blue-600/90 rounded-full text-xs font-bold"
    transition={{ type: 'spring', damping: 15 }}
  >
    Easy to Use
  </motion.div>
</motion.div>
```

**Mobile Interaction (Tap-based):**

```javascript
// Mobile: tap to reveal, swipe for quick actions
const [isRevealed, setIsRevealed] = useState(false);

<motion.div
  onTap={() => setIsRevealed(!isRevealed)}
  className="relative"
>
  {/* Baseline card */}
  <PromptCardImage />
  
  {/* Swipe-reveal action panel */}
  {isRevealed && (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4"
    >
      <div className="flex gap-3">
        <CopyButton />
        <SaveButton />
        <ShareButton />
      </div>
    </motion.div>
  )}
</motion.div>
```

---

### 🎬 Copy Button - Peak Dopamine Moment

**Psychology**: Copying = completion of desire cycle = dopamine spike

```javascript
// COPY BUTTON INTERACTION DESIGN
const [copied, setCopied] = useState(false);

<motion.button
  onClick={() => {
    // Copy to clipboard
    navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    
    // Haptic feedback (mobile)
    navigator.vibrate?.([10, 20, 10]);
    
    // Trigger celebration animation
    triggerConfetti();
    
    // Reset after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  }}
  className={`relative overflow-hidden px-4 py-2 rounded-lg font-semibold transition-all ${
    copied 
      ? 'bg-green-600 text-white' 
      : 'bg-blue-600 hover:bg-blue-700 text-white'
  }`}
>
  <motion.div
    animate={copied ? { scale: [0, 1, 0.9] } : { scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex items-center gap-2"
  >
    <span>{copied ? '✓ Copied!' : '📋 Copy'}</span>
  </motion.div>

  {/* Ripple effect on click */}
  {copied && (
    <motion.div
      className="absolute inset-0 bg-green-400/30"
      initial={{ scale: 0 }}
      animate={{ scale: 2 }}
      transition={{ duration: 0.5 }}
      style={{ borderRadius: '50%' }}
    />
  )}
</motion.button>

// Confetti celebration
const triggerConfetti = () => {
  const confetti = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * Math.PI * 2,
    velocity: 4 + Math.random() * 4
  }));

  confetti.forEach(({ id, angle, velocity }) => (
    <motion.div
      key={id}
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: Math.cos(angle) * 100,
        y: Math.sin(angle) * 100 - 50,
        opacity: 0
      }}
      transition={{ duration: 0.8 }}
      className="absolute pointer-events-none text-2xl"
    >
      ✨
    </motion.div>
  ));
};
```

**Dopamine Cascade:**
1. **Visual feedback**: Color changes immediately (blue → green)
2. **Tactile feedback**: Haptic vibration on mobile (if supported)
3. **Sound**: Soft "ding" sound plays (optional but powerful)
4. **Celebration**: Confetti burst creates joy spike
5. **Confirmation**: "✓ Copied!" text confirms completion
6. **Progress**: Toast notification: "Prompt ready in clipboard!"

---

### 💚 Save Button - Investment Psychology

**Design**: Saving = I value this = I'll return for it

```javascript
// SAVE BUTTON - Creates attachment to platform
<motion.button
  onClick={() => toggleSave(prompt.id)}
  className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
>
  <motion.div
    animate={isSaved ? { scale: [0.8, 1.3, 1], rotate: [0, -20, 0] } : {}}
    transition={{ type: 'spring', damping: 10 }}
  >
    {isSaved ? (
      <span className="text-2xl text-red-500">❤️</span>
    ) : (
      <span className="text-2xl text-slate-400 hover:text-red-500 transition-colors">🤍</span>
    )}
  </motion.div>
  
  <span className="ml-1 text-sm">{saveCount}</span>
</motion.button>

// Floating heart animation
{isSaved && (
  <motion.div
    initial={{ y: 0, opacity: 1 }}
    animate={{ y: -40, opacity: 0 }}
    transition={{ duration: 1 }}
    className="absolute pointer-events-none text-red-500 text-2xl"
  >
    ❤️
  </motion.div>
)}
```

**Retention Mechanism:**
- Saving creates emotional investment
- Users return to "Saved" tab
- Creates habit loop: save → return → share

---

### 📊 Social Proof Display

```javascript
// Trending indicators create FOMO
<div className="flex items-center justify-between text-sm text-slate-400">
  <motion.div 
    animate={{ opacity: [0.6, 1, 0.6] }} 
    transition={{ duration: 2, repeat: Infinity }}
    className="flex items-center gap-2"
  >
    <span className="text-blue-400">👤</span>
    <span>{saveCount.toLocaleString()} saved</span>
  </motion.div>

  {isTrending && (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="flex items-center gap-1 px-2 py-1 bg-orange-600/30 rounded-full"
    >
      <span className="text-orange-400">🔥</span>
      <span className="text-orange-300 font-semibold">Trending</span>
    </motion.div>
  )}
</div>
```

---

## 3. RETENTION SYSTEM

### 🔄 Infinite Scroll Architecture

**Psychology**: Endless feed = no natural stopping point = addiction

**Design:**

```javascript
// Infinite scroll with intelligent pagination
const LOAD_MORE_THRESHOLD = 0.75; // Load when 75% through

useInfiniteScroll({
  onLoadMore: fetchMorePrompts,
  threshold: LOAD_MORE_THRESHOLD,
  rootMargin: '200px' // Start loading before user reaches bottom
});

// Pagination strategy:
// Page 1: 12 cards (initial load)
// Page 2: 12 cards (first scroll)
// Page 3+: 15 cards (psychological pattern break - refresh stimulation)
```

**Intersection Observer Implementation:**

```javascript
// Lazy load cards as they enter viewport
const observerOptions = {
  root: null,
  rootMargin: '100px', // Load 100px before card enters viewport
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.dataset.loaded = 'true';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
```

---

### 🎯 "You May Also Like" - Recommendation Loop

**Psychology**: Related content creates "one more" momentum

```javascript
// After scrolling past 5 cards, show recommendation card
<RecommendationCard
  title="You might love these too"
  prompts={getRelatedPrompts(currentPrompt)}
  trigger="scroll_depth_5"
  animation="slide_in_from_right"
/>

// Recommendation shows:
// 1. 3 thumbnail previews
// 2. "Explore similar" button
// 3. Animated entrance at 5-card interval
```

**Psychology Triggers:**
- **Pattern interruption**: Different card type breaks monotony
- **Personalization**: Feels curated just for user
- **Low friction**: "Explore" button loads lightbox, no navigation needed

---

### 🎁 "Recently Viewed" - Boomerang Psychology

**Design**: Users return to familiar prompts = comfort + convenience

```javascript
// Show "Recently Viewed" in 3 places:
1. Sidebar widget (sticky on desktop)
2. After 10 scrolls in feed
3. In /saved page as "Quick Access"

// Maximum 3-5 recently viewed cards
// Auto-update on each card view
// Include timestamp: "Viewed 2 hours ago"
```

**Retention Logic:**
- User bookmarks a prompt mentally
- Sees it in "Recently Viewed"
- Returns to it = platform engagement
- Creates session extension

---

### 🌙 Daily Engagement Loop

**Design**: Scheduled dopamine hits

```javascript
// Daily features that trigger return visits
interface DailyEngagement {
  // Time-based scarcity
  dailyFeaturedPrompt: {
    name: "Prompt of the Day",
    frequency: "24 hours",
    notification: "10:00 AM",
    uniqueness: "Different every day"
  },

  // Streak psychology
  viewingStreak: {
    message: "5 days viewing streak! 🔥",
    showAt: "header",
    trigger: "daily_visit"
  },

  // Time-limited offers
  limitedPromptPacks: {
    "Cinematic 30-Pack": "Available 24 hours only",
    "Trending This Hour": "Rotates hourly"
  }
}
```

---

## 4. MOBILE UX

### 📱 Thumb-Friendly Architecture

**Design Principle**: 50-60% of users on mobile = optimize for thumb reach

```
MOBILE LAYOUT ZONES:

Top (Red zone - hard to reach):
├─ Header navigation: minimal
├─ Search bar: float if needed
└─ But DON'T require interaction here

Middle (Green zone - thumb zone):
├─ PRIMARY: Featured prompt card
├─ PRIMARY: Copy/Save buttons
├─ IDEAL: Swipe gestures
└─ IDEAL: Main content

Bottom (Thumb zone):
├─ Sticky CTA: "Copy This" (primary action)
├─ Secondary actions: Save/Share
├─ Navigation: 3-4 key buttons
└─ Floating buttons that follow scroll
```

---

### 🎯 Sticky CTA - Persistent Action Button

**Psychology**: Always-available copy button = friction reduction

```javascript
// Sticky button that stays visible while scrolling
<motion.div
  className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4"
  style={{
    pointerEvents: viewingCard ? 'auto' : 'none',
    opacity: viewingCard ? 1 : 0.5
  }}
>
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={copyCurrentPrompt}
    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white shadow-lg"
  >
    📋 Copy "{currentPrompt.title}"
  </motion.button>
  
  {/* Quick secondary actions */}
  <div className="flex gap-3 mt-2 opacity-70">
    <button className="flex-1 py-2 bg-white/10 rounded-lg">❤️ Save</button>
    <button className="flex-1 py-2 bg-white/10 rounded-lg">📤 Share</button>
  </div>
</motion.div>
```

---

### 🎬 Swipe Gestures - Reels-Inspired Navigation

**Design**: Users expect vertical swipe behavior (Instagram Reels muscle memory)

```javascript
// Swipe gesture detection
import { useGesture } from '@use-gesture/react';
import { useSpring } from '@react-three/fiber';

const PromptFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'up') {
      // Next prompt
      setCurrentIndex(i => i + 1);
      trackEvent('swipe_up_next');
    } else if (direction === 'down') {
      // Previous prompt
      setCurrentIndex(i => Math.max(0, i - 1));
      trackEvent('swipe_down_prev');
    }
  };

  const bind = useGesture({
    onSwipe: ({ direction: [dx, dy] }) => {
      if (Math.abs(dy) > Math.abs(dx)) { // Vertical swipe
        handleSwipe(dy > 0 ? 'down' : 'up');
      }
    }
  });

  return (
    <motion.div
      {...bind()}
      animate={{ y: currentIndex * -100 + '%' }}
      transition={{ type: 'spring', damping: 20 }}
      className="overflow-hidden"
    >
      {prompts.map(prompt => (
        <FullScreenPromptCard key={prompt.id} prompt={prompt} />
      ))}
    </motion.div>
  );
};
```

**Psychology:**
- **Muscle memory**: Users already know vertical swipe = next
- **Reduced friction**: No clicking needed
- **Speed**: Faster browsing = more engagement = more time on site

---

### 📲 Mobile Gesture Actions

```javascript
// Tap = reveal actions
// Double tap = save (TikTok behavior)
// Long press = share options
// Swipe left = next
// Swipe right = previous
// Swipe down = close card

<motion.div
  onTap={() => setShowActions(!showActions)}
  onDoubleClick={() => savePrompt(prompt.id)}
  onContextMenu={(e) => e.preventDefault() || showShareMenu()}
>
  <PromptCardImage />
</motion.div>
```

---

## 5. MICROINTERACTIONS

### ✨ Interaction Cascade - Every Action Has Feedback

**Design Principle**: 4-layer feedback system

```
Layer 1: VISUAL (animation)
Layer 2: HAPTIC (vibration)
Layer 3: AUDIO (sound)
Layer 4: CONFIRMATION (toast/message)
```

---

### 📋 Copy Prompt - Complete Feedback System

```javascript
const CopyButton = ({ promptText, promptTitle }) => {
  const [copyState, setCopyState] = useState('idle'); // idle, copying, success

  const handleCopy = async () => {
    try {
      setCopyState('copying');
      
      // Layer 1: Visual feedback
      await navigator.clipboard.writeText(promptText);
      setCopyState('success');
      
      // Layer 2: Haptic feedback
      navigator.vibrate?.([10, 20, 10, 20, 20]);
      
      // Layer 3: Sound feedback
      playSound('copy-success.mp3', { volume: 0.3 });
      
      // Layer 4: Toast notification
      showToast({
        icon: '✓',
        message: `Copied: "${promptTitle}"`,
        action: 'Open in Midjourney',
        actionLink: '#'
      });
      
      // Analytics
      trackEvent('prompt_copied', {
        promptId: prompt.id,
        promptTitle: promptTitle,
        fromLocation: 'card_hover'
      });
      
      // Reset after 2 seconds
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (err) {
      showToast({ type: 'error', message: 'Copy failed' });
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-4 py-2 rounded-lg font-semibold
        transition-all duration-200
        ${copyState === 'success' 
          ? 'bg-green-600 text-white' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'}
      `}
    >
      <motion.div
        animate={copyState === 'copying' ? { rotate: 360 } : {}}
        transition={{ duration: 0.6, repeat: Infinity }}
      >
        {copyState === 'idle' && '📋 Copy'}
        {copyState === 'copying' && '⏳ Copying...'}
        {copyState === 'success' && '✓ Copied!'}
      </motion.div>

      {/* Particles burst on success */}
      {copyState === 'success' && (
        <ParticleBurst count={8} />
      )}

      {/* Ripple effect */}
      {copyState === 'success' && (
        <motion.span
          className="absolute inset-0 bg-white/20 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 2 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {}}
        />
      )}
    </motion.button>
  );
};

// Particle burst animation
const ParticleBurst = ({ count = 8 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-green-400 rounded-full pointer-events-none"
        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        animate={{
          x: Math.cos((i / count) * Math.PI * 2) * 40,
          y: Math.sin((i / count) * Math.PI * 2) * 40,
          opacity: 0,
          scale: 0
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ left: '50%', top: '50%' }}
      />
    ))}
  </>
);
```

---

### 💚 Save/Like - Heart Feedback

```javascript
const SaveButton = ({ promptId, initialSaves = 0 }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(initialSaves);

  const handleSave = () => {
    setIsSaved(!isSaved);
    setSaveCount(c => isSaved ? c - 1 : c + 1);
    
    // Haptic + animation
    navigator.vibrate?.(50);
    playSound('heart.mp3', { volume: 0.2 });
    
    // Floating heart animation
    showFloatingHeart();
    
    // API call
    api.savePrompt(promptId);
  };

  return (
    <motion.button
      onClick={handleSave}
      className="relative p-2 rounded-lg hover:bg-white/10"
    >
      <motion.div
        animate={isSaved ? { scale: [0.8, 1.3, 1], rotate: [0, -15, 0] } : {}}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
      >
        {isSaved ? (
          <span className="text-2xl text-red-500">❤️</span>
        ) : (
          <span className="text-2xl text-slate-400">🤍</span>
        )}
      </motion.div>
      <span className="ml-1 text-sm text-slate-400">{saveCount}</span>
    </motion.button>
  );
};
```

---

### 🎯 Page Transitions - Smooth Momentum

```javascript
// Fade + scale transition between pages
const pageTransition = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

// Stagger children for cascading reveal
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

---

### ⚡ Loading States - Skeleton Screens

```javascript
// Never show blank screens - show skeleton instead
<motion.div
  animate={{ opacity: [0.6, 1, 0.6] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-xl"
  style={{ backgroundSize: '200% 100%' }}
/>

// Skeleton card grid while loading
const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden bg-slate-800/50">
    <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-slate-700 rounded w-full animate-pulse" />
      <div className="h-8 bg-slate-700 rounded animate-pulse" />
    </div>
  </div>
);
```

---

## 6. VISUAL DESIGN LANGUAGE

### 🎨 Color Psychology for Dopamine

```
DOPAMINE-TRIGGERING COLORS:

Primary: Deep Purple (#6D28D9)
- Association: Creativity, premium, AI/tech
- Use: Primary buttons, highlights, accents

Secondary: Electric Blue (#0EA5E9)
- Association: Energy, trust, action
- Use: CTAs, hover states, focus indicators

Accent: Hot Pink/Magenta (#EC4899)
- Association: Urgency, excitement, trends
- Use: Trending badges, limited-time offers, notifications

Success: Vibrant Green (#10B981)
- Association: Completion, progress, confirmation
- Use: Copy success, checkmarks, achievements

Background: Deep Slate (#0F172A / #1E293B)
- Association: Premium, focused, comfort
- Use: Reduce eye strain on mobile scrolling

Accent Gradients:
- "Trending": Orange → Red (#FF6B35 → #EE5A32)
- "New": Purple → Pink (#8B5CF6 → #EC4899)
- "Hot": Red → Orange (#DC2626 → #FF9500)
```

---

### ✨ Glassmorphism Design System

```javascript
// Premium glass effect for cards
const glassStyle = `
  bg-white/10
  backdrop-blur-xl
  border border-white/20
  shadow-2xl
  hover:bg-white/15
  transition-all duration-300
`;

// Implemented
<div className={`
  relative rounded-2xl overflow-hidden
  ${glassStyle}
  before:absolute before:inset-0 before:bg-gradient-to-br 
  before:from-white/10 before:to-transparent before:pointer-events-none
`}>
  {/* Content */}
</div>

// With depth effect
<motion.div
  className="relative"
  whileHover={{
    boxShadow: '0 20px 60px rgba(79, 70, 229, 0.3)'
  }}
>
  <div className={glassStyle}>
    {/* Content */}
  </div>
</motion.div>
```

---

### 🌟 Gradient System

```javascript
// Dynamic gradients create visual interest
const gradients = {
  // Trending
  trending: 'from-orange-600/80 via-red-600/80 to-pink-600/80',
  
  // Premium/AI
  premium: 'from-purple-600/80 via-indigo-600/80 to-blue-600/80',
  
  // Success
  success: 'from-green-600/80 to-emerald-600/80',
  
  // Button gradients
  button: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
  
  // Text gradient
  text: 'from-blue-400 via-purple-400 to-pink-400'
};

// Usage
<div className={`bg-gradient-to-r ${gradients.trending}`}>
  Trending now!
</div>
```

---

### 📐 Typography Hierarchy

```javascript
// Dopamine is triggered by clear hierarchy
const typography = {
  h1: 'text-6xl font-black tracking-tight', // Hero
  h2: 'text-4xl font-bold tracking-tight',  // Section
  h3: 'text-2xl font-bold',                 // Card title
  h4: 'text-lg font-semibold',              // Subheading
  body: 'text-base font-normal',            // Body text
  caption: 'text-sm font-normal opacity-70' // Meta info
};

// Semantic usage
// h1: Homepage headline
// h2: Section titles (Trending, New, etc)
// h3: Prompt title on card
// h4: Category, difficulty level
// body: Prompt description
// caption: Save count, engagement metrics
```

---

### 🎬 Motion Design Principles

```javascript
// Every animation should have PURPOSE
const motionPrinciples = {
  // 1. Draw attention
  attention: 'scale, glow, pulse, bounce',
  
  // 2. Guide navigation
  guidance: 'fade, slide, swipe, rotate',
  
  // 3. Provide feedback
  feedback: 'spin, pulse, ripple, confetti',
  
  // 4. Create delight
  delight: 'bounce, flip, wiggle, floating'
};

// Timing rules
const timing = {
  fast: 0.2,      // Feedback (< 200ms)
  normal: 0.3,    // Transitions (200-300ms)
  slow: 0.5,      // Entrance (300-500ms)
  explore: 1,     // Animations (1000ms+)
  notification: 3 // Toast duration
};

// Easing functions
const easing = {
  quick: 'easeInOut',
  smooth: [0.25, 0.46, 0.45, 0.94], // cubic-bezier
  bounce: 'circOut',
  snappy: 'spring' // type: 'spring', damping: 15, stiffness: 200
};
```

---

## 7. GAMIFICATION

### 🎮 Point System - Creator Identity

```javascript
interface UserEngagement {
  dailyViewingStreak: {
    day1: 1,
    day7: '🔥 7-day streak!',
    day30: '👑 Monthly champion',
    day365: '🌟 Annual legend'
  },

  actions: {
    viewPrompt: 1,
    copyPrompt: 5,
    savePrompt: 3,
    sharePrompt: 10,
    createCollection: 50
  },

  totalEngagementScore: 0
};
```

---

### 🏆 Achievement Unlocks

```javascript
// Milestone rewards that feel earned
const achievements = {
  'First Copy': {
    icon: '📋',
    unlock: 'Copy your first prompt',
    reward: 'Access to beginner guides'
  },
  'Saving Streak': {
    icon: '❤️',
    unlock: 'Save 5 prompts',
    reward: 'Create custom collections'
  },
  'Trending Finder': {
    icon: '🔥',
    unlock: 'Copy 3 trending prompts in 1 day',
    reward: 'Early access to new features'
  },
  'Creator Influencer': {
    icon: '👑',
    unlock: 'Copy 100+ prompts',
    reward: 'Featured creator badge'
  },
  'Master Collection': {
    icon: '📚',
    unlock: 'Create 5 collections',
    reward: 'Share collections publicly'
  }
};

// Display achievement pop-up
<motion.div
  initial={{ scale: 0, y: -100 }}
  animate={{ scale: 1, y: 0 }}
  exit={{ scale: 0, y: -100 }}
  className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
>
  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl text-center">
    <div className="text-6xl mb-3">{achievement.icon}</div>
    <h3 className="text-2xl font-bold text-white mb-1">{achievement.name}</h3>
    <p className="text-white/80">{achievement.reward}</p>
  </div>
</motion.div>
```

---

### 📈 Trending Score Display

```javascript
// Create perception of competition & achievement
const TrendingScoreCard = () => {
  const [myScore, setMyScore] = useState(340);
  const [leaderboardRank, setLeaderboardRank] = useState(2_840);

  return (
    <motion.div
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-400">Your Trending Score</p>
          <motion.p
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2 }}
          >
            {myScore}
          </motion.p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Rank</p>
          <p className="text-3xl font-bold text-slate-200">#{leaderboardRank}</p>
        </div>
      </div>

      {/* Micro progression bar */}
      <motion.div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: '40%' }}
          animate={{ width: '65%' }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      <p className="text-xs text-slate-400 mt-2">+45 points from trending prompts</p>
    </motion.div>
  );
};
```

---

### 🎁 Daily Bonus System

```javascript
// Scarcity + time-limited rewards = daily return visits
<DailyBonusCard>
  <div className="text-center py-6">
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-6xl mb-3"
    >
      🎁
    </motion.div>

    <h3 className="text-2xl font-bold text-white mb-2">Daily Bonus!</h3>

    <motion.p
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-lg text-green-400 font-semibold mb-4"
    >
      +50 points • Available in 8:30
    </motion.p>

    <div className="text-sm text-slate-400">
      <p>Return tomorrow for more bonuses</p>
      <p className="text-xs mt-1">Come back in {timeUntilBonus}</p>
    </div>
  </div>
</DailyBonusCard>
```

---

## 8. PSYCHOLOGY PRINCIPLES

### 🧠 Variable Rewards - The Secret Sauce

**Principle**: Unpredictability creates dopamine spikes more than predictable rewards

```javascript
// Every scroll could reveal:
// - A trending prompt (unexpected)
// - A related collection (related content)
// - A creator spotlight (social validation)
// - A daily bonus (time-limited)
// - An achievement unlock (progression)

// Randomized order keeps dopamine flowing
const variableRewardSequence = () => {
  const rewards = [
    'trendingPrompt',
    'relatedCollection',
    'creatorSpotlight',
    'dailyBonus',
    'achievementUnlock'
  ];

  // Shuffle and insert at unpredictable positions
  const shuffled = shuffle(rewards);
  const insertPositions = shuffled.map(() => 
    Math.floor(Math.random() * 20) + 2 // Every 2-22 scrolls
  );

  return { shuffled, insertPositions };
};
```

---

### ⏰ Anticipation - The Dopamine Build-Up

**Principle**: The wait for reward creates more dopamine than the reward itself

```javascript
// Example: Countdown to featured prompt refresh
<CountdownTimer
  endTime={nextFeaturedPromptTime}
  onComplete={() => refreshFeaturedPrompt()}
>
  {({ hours, minutes, seconds }) => (
    <div className="text-center">
      <p className="text-sm text-slate-400">Next featured prompt in:</p>
      <motion.p
        animate={{ scale: [1, 1.05, 1] }}
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
      >
        {hours}:{minutes}:{seconds}
      </motion.p>
      <p className="text-xs text-slate-400 mt-2">Check back for a new exclusive!</p>
    </div>
  )}
</CountdownTimer>
```

---

### 🆕 Novelty - The Dopamine Reset

**Principle**: New stimuli reset dopamine baseline, keeping engagement fresh

```javascript
// Strategies for novelty:
1. Auto-rotating featured prompts (every 4s homepage, every 24h featured)
2. Randomized card order (shuffle algorithm prevents repetition)
3. New trending tags (hourly refresh)
4. Variable achievements (surprise unlocks)
5. Content personalization (different users see different feeds)
6. Limited-time collections ("This week's best", "Last 6 hours")

// Implement algorithmic shuffle
const generateShuffledFeed = (prompts, userId) => {
  // Deterministic shuffle based on user + time
  // Ensures: everyone sees same content in same hour
  //         but different from yesterday
  //         prevents algorithm repetition fatigue

  const seed = generateSeed(userId, getCurrentHour());
  return shuffleWithSeed(prompts, seed);
};
```

---

### 🤝 Social Validation - FOMO Engine

**Principle**: Seeing others engage triggers fear of missing out

```javascript
// Display real-time engagement signals
<SocialProofDisplay>
  <motion.div
    animate={{ opacity: [0.6, 1] }}
    transition={{ duration: 0.5 }}
    className="text-sm text-blue-400 flex items-center gap-2"
  >
    <div className="relative w-6 h-6">
      {/* Animated avatars of recent savers */}
      {recentSavers.map((user, i) => (
        <motion.img
          key={user.id}
          src={user.avatar}
          alt={user.name}
          className="absolute w-6 h-6 rounded-full border-2 border-slate-950"
          style={{ left: i * -8 }}
          animate={{ scale: [0.9, 1, 0.9] }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </div>
    <span>
      <strong>{saveCount.toLocaleString()}</strong> people saved this
    </span>
  </motion.div>
</SocialProofDisplay>

// With live update notification
{isNewSave && (
  <motion.p
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    className="text-xs text-green-400 flex items-center gap-1"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
    </span>
    Someone just saved this!
  </motion.p>
)}
```

---

### ♾️ Infinite Feed Addiction Architecture

**Principle**: No natural stopping point = continued scrolling

```javascript
// Psychology stack:
1. VISUAL CONTINUATION: Cards continue below fold
2. AUTO-LOAD: Content loads before reaching bottom
3. PROGRESSIVE VARIATION: Card types vary (recommendation at card 5, related at 10)
4. MOMENTUM LOOP: Each card creates desire to see next
5. VARIABLE REWARDS: Randomized engagement signals

// Implementation
const InfiniteScrollContainer = () => {
  const [items, setItems] = useState(initialItems);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Load more at 75% scroll depth
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    
    // Fetch new batch
    fetchNextBatch().then(newItems => {
      // Add micro delay to avoid jarring load
      setTimeout(() => {
        setItems(prev => [...prev, ...newItems]);
        setIsLoadingMore(false);
      }, 300);
    });
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={handleLoadMore}
      hasMore={hasMoreItems}
      loader={<LoadingSkeleton />}
      threshold={500} // Load when 500px from bottom
    >
      {items.map((item, i) => (
        <PromptCard
          key={item.id}
          prompt={item}
          position={i}
          showRecommendation={i === 4 || i === 9 || i === 19}
        />
      ))}
    </InfiniteScroll>
  );
};
```

---

### 🔮 Curiosity Gaps - "What's Next?"

**Principle**: Unsatisfied curiosity drives forward scrolling

```javascript
// Card preview strategy - show just enough to intrigue
<PromptCardPreview>
  {/* Show ONLY: first line of prompt + image */}
  {/* Hide: full prompt text (visible only after click/copy) */}
  
  <div className="relative overflow-hidden h-32 bg-gradient-to-b from-transparent to-slate-950">
    <p className="text-white font-semibold line-clamp-2">
      {truncatePrompt(prompt.text, 60)}
      <span className="text-slate-400">...</span>
    </p>
    
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950 to-transparent flex items-end justify-center pb-2">
      <p className="text-xs text-slate-400">Tap to see full prompt</p>
    </div>
  </div>
</PromptCardPreview>

// Creates loop: Curiosity → Click → Reveal → Satisfaction → Next card → New curiosity
```

---

### ⚡ Instant Gratification - Reduced Friction

**Principle**: Faster reward cycle = higher engagement

```javascript
// Copy prompt = immediate feedback (2-3s cycle)
// Search = instant results (< 500ms)
// Save = immediate response (no loader)
// Share = pre-filled, ready to send

// Every action should complete in under 1 second
const actionFeedbackTiming = {
  copy: 0.3,      // Button animation
  feedback: 0.5,  // Toast appears
  total: 2.0      // Human perceives completion
};

// Never show loading spinners > 1s
// Always provide: skeleton, placeholder, or optimistic UI
```

---

### 🚨 FOMO - Fear of Missing Out

**Principle**: Time-limited + unique = must have now

```javascript
// Limited-time offers create urgency
<TimelyOffer>
  <motion.div
    animate={{ scale: [0.95, 1.05, 0.95] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="border-2 border-orange-500/50 rounded-xl p-4 bg-orange-600/10"
  >
    <div className="flex items-start gap-3">
      <span className="text-2xl">🔥</span>
      <div>
        <p className="text-sm text-orange-300 font-semibold">Limited Time</p>
        <p className="text-white font-bold">50 Cinematic Portrait Prompts</p>
        <p className="text-xs text-orange-300 mt-1">
          Available for next 2 hours only
        </p>
        
        {/* Countdown with pulsing effect */}
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-orange-400 font-bold text-lg mt-2"
        >
          ⏳ {timeRemaining}
        </motion.p>
      </div>
    </div>
  </motion.div>
</TimelyOffer>

// Urgency signals:
// - Countdown timer
// - Pulsing glow effect
// - "Limited seats" counters
// - "Only N people have this"
```

---

### 👤 Creator Identity - "I'm a Creator"

**Principle**: Make users feel part of creative community

```javascript
// Strategies:
1. "Creator Tools" section
2. Share-to-Midjourney integration
3. Creator badges on saves
4. "Used by [famous creator]" labels
5. "Trending among creators" filters
6. "Your creative style" personalization

// Example: Creator identity messaging
<CreatorIdentity>
  <p className="text-sm text-slate-400">
    You've copied <strong>23 AI prompts</strong> this week
  </p>
  <p className="text-xs text-slate-500 mt-1">
    That makes you a <strong className="text-blue-400">Trending Creator!</strong>
  </p>
  
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    className="mt-3 flex items-center gap-2 bg-blue-600/20 px-3 py-2 rounded-lg"
  >
    <span>👑</span>
    <span className="text-sm font-semibold">Creator Badge Unlocked</span>
  </motion.div>
</CreatorIdentity>
```

---

## 9. ADSENSE OPTIMIZATION UX

### 📍 Ad Placement Strategy - Non-Intrusive

**Principle**: Ads shouldn't disrupt dopamine flow

```
PLACEMENT ZONES:

Zone 1 (Header): Sidebar ads (non-intrusive)
- 300x250, 160x600
- High visibility, low disruption
- Sticky on desktop

Zone 2 (Between cards): Native ads every 8-10 cards
- Match card design
- Clearly labeled "Sponsored"
- 728x90 or 336x280

Zone 3 (After copy action): Relevant ads
- "Tools that work with prompts"
- Triggered after user copies
- Dismissible after 5s

Zone 4 (Mobile - sticky footer): Bottom banner ads
- 320x50 or 300x250
- Doesn't cover key buttons
- Dismiss option

Zone 5 (Related content): Recommended links
- Non-obtrusive suggestion cards
- Matches UI design
```

---

### 🎯 Ad Integration Design

```javascript
// Native ad card - matches prompt card design
const NativeAdCard = ({ ad, position }) => {
  // Only show after every 8-10 cards
  if (position % 9 !== 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/30 p-4"
    >
      {/* "Sponsored" label */}
      <p className="text-xs font-semibold text-slate-400 mb-3">💼 Sponsored</p>

      {/* Ad content matches card design */}
      <img
        src={ad.image}
        alt={ad.title}
        className="w-full rounded-lg mb-3 object-cover"
      />

      <h3 className="font-bold text-white mb-2">{ad.title}</h3>
      <p className="text-sm text-slate-300 mb-3">{ad.description}</p>

      <motion.a
        href={ad.link}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-4 py-2 bg-blue-600 rounded-lg font-semibold text-white text-sm"
      >
        Learn More →
      </motion.a>

      {/* Close button - respect user choice */}
      <button
        onClick={() => dismissAd(ad.id)}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-full"
      >
        ✕
      </button>
    </motion.div>
  );
};

// Sticky sidebar ads (non-intrusive)
<StickyAdContainer
  className="hidden lg:block fixed right-4 top-24 w-300 z-30"
>
  <motion.div
    className="rounded-xl overflow-hidden shadow-2xl"
    style={{
      position: 'sticky',
      top: '24px'
    }}
  >
    <GoogleAdSense
      format="vertical"
      layout="in-article"
    />
  </motion.div>
</StickyAdContainer>
```

---

### 📊 Session Duration Optimization

```javascript
// Metrics to track for AdSense revenue
interface AdSenseMetrics {
  sessionDuration: number,           // ↑ = higher revenue
  pageViewsPerSession: number,       // ↑ = more ad impressions
  scrollDepth: number,               // ↑ = more ads seen
  adVisibilityTime: number,          // ↑ = better quality
  adEngagementRate: number           // ↑ = higher CPM
}

// Strategies to increase all metrics:
1. ENDLESS SCROLL: Keep users on page longer
2. ENGAGEMENT: More interactions = longer sessions
3. MULTIPLE ADS: Strategic placement increases impressions
4. QUALITY: Premium design attracts better ad networks
5. TRUST: Design builds trust = users stay longer
```

---

### 🎯 Scroll Depth Optimization

```javascript
// Track exactly where users stop scrolling
const trackScrollDepth = () => {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

  // Log milestones
  if (scrollPercentage > 25 && !tracked.p25) {
    trackEvent('scroll_depth_25', { cards_seen: cardsInView });
    tracked.p25 = true;
  }
  if (scrollPercentage > 50 && !tracked.p50) {
    trackEvent('scroll_depth_50', { cards_seen: cardsInView });
    // Show recommendation here
    showRecommendationCard();
  }
  if (scrollPercentage > 75 && !tracked.p75) {
    trackEvent('scroll_depth_75', { cards_seen: cardsInView });
    // Show third-party ad here
    showNativeAd();
  }
  if (scrollPercentage > 90 && !tracked.p90) {
    trackEvent('scroll_depth_90', { cards_seen: cardsInView });
    // Load more content
    loadMorePrompts();
  }
};

// Call on scroll
useEffect(() => {
  const handleScroll = throttle(trackScrollDepth, 500);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## 10. IMPLEMENTATION GUIDE

### 📋 Section-by-Section UX Breakdown

#### A. HOMEPAGE ARCHITECTURE

```
Homepage = Hero + Momentum + Addiction Loop

SECTION 1: HERO (0-3 seconds)
├─ Headline: "$title" + animated stat
├─ Search bar (oversized, glowing)
├─ Featured prompt card
├─ Quick copy button
└─ Psychology: Immediate value capture

SECTION 2: TRENDING (3-10 seconds)
├─ Auto-rotating carousel (4s interval)
├─ Manual swipe capability
├─ Social proof badges
├─ "See all trending" link
└─ Psychology: FOMO + novelty

SECTION 3: INFINITE FEED (10+ seconds)
├─ Grid layout (3-4 columns desktop, 1-2 mobile)
├─ Auto-load at 75% scroll depth
├─ Variable card types (recommendation at 5, 10, 15...)
├─ Engagement counters (pulsing animations)
└─ Psychology: Endless scroll addiction
```

#### B. CARD COMPONENT ARCHITECTURE

```
PromptCard Component:

Props:
- prompt: Prompt data
- position: Position in feed (for variable rewards)
- showRecommendation: Boolean (show rec every 8-10)
- isTrending: Boolean
- isNew: Boolean

States:
- hover: Desktop interaction state
- tapped: Mobile interaction state
- copied: Copy feedback state
- saved: Save feedback state

Events:
- onCopy: Copy to clipboard + feedback
- onSave: Save to collection + feedback
- onShare: Share prompt
- onView: Track view event

Animations:
- Entry: fade + scale in from 0.95
- Hover: lift + zoom
- Copy: button color change + particle burst
- Save: heart scale + float
```

#### C. MOBILE-FIRST IMPLEMENTATION

```javascript
// Mobile viewport strategy
const mobileBreakpoints = {
  'sm': '640px',   // 1 card width
  'md': '768px',   // 2 card columns
  'lg': '1024px',  // 3 card columns
  'xl': '1280px'   // 4 card columns
};

// Responsive grid
<div className="
  grid
  grid-cols-1 sm:grid-cols-2
  lg:grid-cols-3 xl:grid-cols-4
  gap-4
  auto-rows-max
">
  {/* Cards */}
</div>

// Thumb-friendly sizing
const thumbFriendly = {
  buttonHeight: '44px',        // Min 44px for fat fingers
  buttonPadding: '12px 16px',
  touchTargetSize: '48px',     // Ideal: 48x48px
  spacingBetween: '16px'       // Comfortable gap
};

// Sticky header on scroll (mobile only)
<motion.header
  animate={{
    height: isScrolling ? '56px' : '80px',
    boxShadow: isScrolling ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
  }}
  transition={{ duration: 0.2 }}
  className="lg:static sticky top-0 z-40"
>
  {/* Header content */}
</motion.header>
```

---

### 🎬 Framer Motion Animation Library

#### Common Dopamine Animations

```javascript
// 1. ENTRANCE ANIMATION - Cards slide in
const cardEnter = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.4
    }
  }
};

// 2. HOVER ANIMATION - Cards lift
const cardHover = {
  hover: {
    y: -12,
    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
    transition: { duration: 0.3 }
  }
};

// 3. CLICK ANIMATION - Button press
const buttonClick = {
  tap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 20 }
};

// 4. SUCCESS ANIMATION - Copy feedback
const successPulse = {
  animate: { scale: [0.8, 1.2, 1] },
  transition: { type: 'spring', damping: 15, stiffness: 200 }
};

// 5. INFINITE ANIMATION - Pulsing glow
const pulseGlow = {
  animate: {
    opacity: [0.6, 1, 0.6],
    boxShadow: [
      '0 0 0px rgba(59, 130, 246, 0)',
      '0 0 20px rgba(59, 130, 246, 0.6)',
      '0 0 0px rgba(59, 130, 246, 0)'
    ]
  },
  transition: { duration: 2, repeat: Infinity }
};

// 6. STAGGER ANIMATION - Cards load in sequence
const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemStagger = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};
```

---

### 🎨 Tailwind Design Recommendations

#### Typography Classes

```html
<!-- Hero headline -->
<h1 class="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter">
  201+ AI Photo Prompts
</h1>

<!-- Section headline -->
<h2 class="text-3xl md:text-4xl font-bold tracking-tight">
  Trending This Week
</h2>

<!-- Card title -->
<h3 class="text-lg md:text-xl font-bold text-white">
  Cinematic Portrait Studio
</h3>

<!-- Body text -->
<p class="text-base text-slate-300 leading-relaxed">
  Description of the prompt...
</p>

<!-- Caption text -->
<p class="text-xs md:text-sm text-slate-400 uppercase tracking-wide">
  Metadata, tags, stats
</p>
```

---

#### Button Styles

```html
<!-- Primary CTA -->
<button class="
  px-6 py-3
  bg-gradient-to-r from-blue-600 to-purple-600
  hover:from-blue-700 hover:to-purple-700
  text-white font-semibold
  rounded-lg
  transition-all duration-300
  shadow-lg hover:shadow-xl
">
  Copy This Prompt
</button>

<!-- Secondary action -->
<button class="
  px-4 py-2
  bg-white/10 hover:bg-white/20
  border border-white/20
  text-slate-200
  rounded-lg
  transition-all duration-300
  font-medium
">
  Save
</button>

<!-- Tertiary -->
<button class="
  px-4 py-2
  hover:bg-white/5
  text-slate-400 hover:text-white
  rounded-lg
  transition-all duration-300
  font-medium
">
  Share
</button>
```

---

### ⏱️ Animation Timing Recommendations

```javascript
// Micro-interactions (human perception)
const timing = {
  // Feedback (immediate)
  INSTANT: 0,
  
  // Quick feedback (< 200ms - feels instant)
  QUICK: 150,
  
  // Standard feedback (200-300ms - responsive)
  NORMAL: 250,
  
  // Deliberate transition (300-500ms - smooth)
  SMOOTH: 400,
  
  // Entrance animation (500-800ms - noticeable)
  ENTRANCE: 600,
  
  // Attention grabber (800ms-1.2s - draws eye)
  ATTENTION: 1000,
  
  // Looping animation (1-3s - continuous)
  LOOP: 2000,
  
  // Notification duration (3-5s - read time)
  NOTIFICATION: 3000
};

// Best practices:
// Copy button: 250ms color change + 600ms particle effect
// Card hover: 300ms lift animation
// Page transition: 400ms fade + scale
// Toast notification: 3000ms display time
// Infinite loops: 2000-3000ms cycle
```

---

### 📱 Mobile Optimization Strategy

```javascript
// Touch-first interaction model
const mobileOptimization = {
  // 1. REDUCE COGNITIVE LOAD
  navigation: {
    max_items: 4,
    always_visible: ['Home', 'Search', 'Saved', 'Profile'],
    secondary: 'side_menu'
  },

  // 2. OPTIMIZE LAYOUTS
  card_display: {
    desktop: '3-4 columns',
    tablet: '2 columns',
    mobile: '1 column'
  },

  // 3. TOUCH TARGETS
  min_button_size: '48px', // Apple guidelines
  min_spacing: '12px',     // Between interactive elements

  // 4. GESTURE SUPPORT
  gestures: {
    swipe_up: 'next_card',
    swipe_down: 'previous_card',
    swipe_left: 'quick_share',
    swipe_right: 'quick_save',
    double_tap: 'save_heart',
    long_press: 'more_options'
  },

  // 5. AVOID
  avoid: [
    'hover_states',          // Doesn't work on touch
    'right_click_menus',     // Long press instead
    'micro_text',            // < 12px is hard to read
    'narrow_buttons',        // < 44px is hard to tap
    'auto_playing_videos'    // Can drain battery
  ]
};
```

---

### 🎯 Performance Optimization

```javascript
// Dopamine UX requires SPEED

// 1. Image lazy loading
const OptimizedImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className="w-full object-cover"
    srcSet={`
      ${src}?w=400 400w,
      ${src}?w=600 600w,
      ${src}?w=800 800w
    `}
  />
);

// 2. Code splitting - only load visible cards
const PromptCard = dynamic(
  () => import('@/components/PromptCard'),
  { ssr: false, loading: () => <CardSkeleton /> }
);

// 3. Intersection observer for lazy animation
const animateOnScroll = (element) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.dataset.inView = 'true';
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.2 }
  );
  
  observer.observe(element);
};

// 4. Debounce scroll events
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// 5. Cache API responses
const cachePrompts = async () => {
  const cached = await caches.open('prompts-v1');
  const response = await fetch('/api/prompts');
  cached.put('/api/prompts', response.clone());
  return response;
};
```

---

## 🚀 COMPLETE DOPAMINE FLOW DIAGRAM

```
USER JOURNEY WITH DOPAMINE TRIGGERS:

SECOND 0-1: HERO SECTION
└─ Trigger: Scarcity ("201+ Prompts")
   ├─ Dopamine hit: Value recognition
   └─ Action: User focuses on page

SECOND 1-3: FEATURED PROMPT + COPY CTA
└─ Trigger: Featured card visibility
   ├─ Dopamine hit: Immediate action opportunity
   └─ Action: User reads/contemplates copy

SECOND 3-5: TRENDING CAROUSEL
└─ Trigger: Auto-rotating novelty
   ├─ Dopamine hit: Curiosity ("what's next?")
   └─ Action: User watches carousel

SECOND 5-10: FIRST SCROLL + SOCIAL PROOF
└─ Trigger: Social validation signals
   ├─ Dopamine hit: Community participation feeling
   └─ Action: User continues scrolling

SECOND 10-30: FIRST ENGAGEMENT
└─ Trigger: Copy button interaction
   ├─ Dopamine hit: MASSIVE (multi-layer feedback)
   │  ├─ Visual: Color change + animation
   │  ├─ Haptic: Phone vibration
   │  ├─ Audio: Success sound
   │  └─ Confirmation: "✓ Copied!" + toast
   └─ Action: User feels satisfied but wants more

SECOND 30-60: SAVE/HEART INTERACTION
└─ Trigger: Save button click
   ├─ Dopamine hit: Investment in content
   └─ Action: User feels ownership

SECOND 60+: INFINITE SCROLL ADDICTION LOOP
└─ Trigger: Endless feed + variable rewards
   ├─ Dopamine hit: Sustained low-level excitement
   │  ├─ Novel cards every scroll
   │  ├─ Occasional recommendation cards
   │  ├─ Spontaneous achievement unlocks
   │  └─ Real-time engagement signals
   └─ Action: User keeps scrolling (retention)

SESSION END: RETENTION MECHANICS
└─ Trigger: Daily bonus system + streaks
   ├─ Dopamine hit: Future reward anticipation
   └─ Action: User bookmarks for tomorrow visit
```

---

## ✨ SUMMARY: THE DOPAMINE STACK

### The 5 Core Mechanisms

1. **INSTANT GRATIFICATION** (< 3 seconds)
   - Featured prompt + copy button
   - Immediate multi-layer feedback
   - Results in dopamine spike

2. **CURIOSITY LOOPS** (3-10 seconds)
   - Trending carousel rotates
   - Unseen content preview
   - Creates "one more look" momentum

3. **VARIABLE REWARDS** (10-60 seconds)
   - Randomized engagement signals
   - Unpredictable achievement unlocks
   - Keeps dopamine flowing unpredictably

4. **SOCIAL VALIDATION** (ongoing)
   - Real-time engagement counts
   - Live update notifications
   - FOMO triggers

5. **INFINITE LOOP** (60+ seconds)
   - Endless scroll architecture
   - Auto-loading content
   - No natural stopping point

### The Result

PhotoPromptsHub becomes:
- ✅ **Addictive**: Dopamine cycle keeps users engaged
- ✅ **Viral**: Social proof drives sharing
- ✅ **Premium**: Visual design feels high-value
- ✅ **Profitable**: Extended sessions = more ad impressions
- ✅ **Ethical**: Engagement through quality UX, not dark patterns

---

## 🎓 RESOURCES & REFERENCES

**Books:**
- "Hooked: How to Build Habit-Forming Products" - Nir Eyal
- "The Design of Everyday Things" - Don Norman
- "Thinking, Fast and Slow" - Daniel Kahneman

**Platforms to Study:**
- TikTok (infinite scroll mastery)
- Pinterest (feed design)
- Instagram Reels (gesture interaction)
- Midjourney (premium aesthetics)
- Figma (collaboration dopamine)

**Behavioral Psychology:**
- Variable reward schedule (Skinner)
- Loss aversion (Kahneman)
- Social proof (Cialdini)
- Curiosity gap (Loewenstein)

---

**Created for: PhotoPromptsHub**
**Design Philosophy: Addiction through Excellence**
**Mission: Make creativity feel instantly rewarding**

🚀 Ready to implement? Start with the Homepage Hero + Card interactions. That's 80% of the dopamine impact!
