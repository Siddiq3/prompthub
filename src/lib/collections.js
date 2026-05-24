const hasTag = (prompt, tag) => prompt.tagSlugs.includes(tag);

export const COLLECTION_DEFINITIONS = [
  {
    slug: "chatgpt-photo-prompts",
    title: "ChatGPT Photography Prompts",
    description:
      "Curated photography prompts optimized for ChatGPT image generation. Portraits, fashion, cinematic scenes, and lifestyle photography.",
    intro:
      "These prompts are specifically written for ChatGPT's image generation capabilities. Include clear visual direction, mood, and photographic references for best results.",
    matcher: (prompt) => prompt.model === "ChatGPT" || !prompt.model
  },
  {
    slug: "gemini-photo-prompts",
    title: "Gemini AI Photography Prompts",
    description:
      "Photography prompts tailored for Gemini AI image generation. Explore cinematic portraits, fashion editorials, and creative visual storytelling.",
    intro:
      "These prompts are optimized for Gemini's image generation. Each includes specific photographic direction, mood, and visual reference points.",
    matcher: (prompt) => prompt.model === "Gemini"
  },
  {
    slug: "cinematic-photo-prompts",
    title: "Cinematic Photography Prompts",
    description:
      "A collection of cinematic prompts built around moody light, film-inspired scenes, and story-driven compositions.",
    intro:
      "This collection is for images where atmosphere matters as much as the subject and the frame needs to feel like part of a larger story.",
    matcher: (prompt) => prompt.category === "Cinematic" || prompt.rawCategory === "Cinematic" || hasTag(prompt, "cinematic")
  },
  {
    slug: "portrait-photography-prompts",
    title: "Portrait Photography Prompts",
    description:
      "Professional portrait prompts for headshots, editorial portraits, character studies, and expressive face photography.",
    intro:
      "These prompts focus on capturing compelling human faces and expressions. Includes direction for lighting, mood, and visual style.",
    matcher: (prompt) => prompt.category === "Portrait" || prompt.rawCategory === "Portrait" || hasTag(prompt, "portrait")
  },
  {
    slug: "fashion-editorial-photo-prompts",
    title: "Fashion Editorial Photography Prompts",
    description:
      "Browse fashion and editorial prompts centered on styling direction, beauty cues, and polished visual references.",
    intro:
      "This collection keeps editorial fashion work together for creators building lookbooks, campaigns, and polished stylized portraits.",
    matcher: (prompt) => prompt.category === "Fashion" || prompt.rawCategory === "Fashion" || hasTag(prompt, "editorial")
  },
  {
    slug: "lifestyle-photo-prompts",
    title: "Lifestyle Photography Prompts",
    description:
      "Lifestyle and everyday photography prompts for natural moments, cultural scenes, and human-centered storytelling.",
    intro:
      "Use these prompts to capture moments that feel lived-in and real—everyday scenes with photographic depth and narrative.",
    matcher: (prompt) => prompt.category === "Lifestyle" || hasTag(prompt, "lifestyle") || hasTag(prompt, "everyday")
  },
  {
    slug: "candid-photo-prompts",
    title: "Candid Photography Prompts",
    description:
      "Explore candid prompts for natural expressions, documentary-style framing, and scenes that feel unstaged.",
    intro:
      "These prompts lean toward moments that feel observed rather than posed, which makes them useful for portraits, family scenes, and weddings.",
    matcher: (prompt) => hasTag(prompt, "candid") || hasTag(prompt, "documentary")
  },
  {
    slug: "romantic-wedding-photo-prompts",
    title: "Wedding & Romantic Photography Prompts",
    description:
      "A focused collection of romantic and wedding prompts for couple portraits, celebration scenes, and softer cinematic storytelling.",
    intro:
      "Use these prompts when you want warmth, closeness, or celebratory couple imagery for weddings and story-led romantic scenes.",
    matcher: (prompt) => prompt.category === "Wedding" || prompt.rawCategory === "Wedding" || hasTag(prompt, "romantic")
  }
];
