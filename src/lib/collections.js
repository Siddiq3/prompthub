const hasTag = (prompt, tag) => prompt.tagSlugs.includes(tag);

export const COLLECTION_DEFINITIONS = [
  {
    slug: "midjourney-photo-prompts",
    title: "Midjourney Photo Prompts",
    description:
      "Browse Midjourney prompts for portraits, cinematic scenes, weddings, sports, and story-driven images.",
    intro:
      "This collection brings together prompts labeled for Midjourney, making it easier to find portraits, editorial scenes, and stronger visual starting points in one place.",
    matcher: (prompt) => prompt.model === "Midjourney"
  },
  {
    slug: "dalle-photo-prompts",
    title: "DALL·E Photo Prompts",
    description:
      "Explore DALL·E prompts for polished portraits, beauty work, romantic scenes, and commercial-style images.",
    intro:
      "Use this collection when you want DALL·E prompts with clear structure and enough detail to start working quickly.",
    matcher: (prompt) => prompt.model === "Dalle"
  },
  {
    slug: "flux-photo-prompts",
    title: "Flux Photo Prompts",
    description:
      "Discover Flux prompts for fashion editorials, cinematic portraits, wedding moments, and polished photo work.",
    intro:
      "Flux shows up heavily across the library, so this collection is one of the easiest places to browse portraits, fashion work, and story-led images.",
    matcher: (prompt) => prompt.model === "Flux"
  },
  {
    slug: "stable-diffusion-photo-prompts",
    title: "Stable Diffusion Photo Prompts",
    description:
      "Find Stable Diffusion prompts for street, portrait, sports, and wedding ideas with clear creative direction.",
    intro:
      "These prompts give Stable Diffusion users a more useful starting point when they want clear framing, mood, and styling cues.",
    matcher: (prompt) => prompt.model === "StableDiffusion"
  },
  {
    slug: "cinematic-photo-prompts",
    title: "Cinematic Photo Prompts",
    description:
      "A collection of cinematic prompts built around moody light, film-inspired scenes, and story-driven compositions.",
    intro:
      "This collection is for images where atmosphere matters as much as the subject and the frame needs to feel like part of a larger story.",
    matcher: (prompt) => prompt.category === "Cinematic" || prompt.rawCategory === "Cinematic" || hasTag(prompt, "cinematic")
  },
  {
    slug: "fashion-editorial-photo-prompts",
    title: "Fashion Editorial Photo Prompts",
    description:
      "Browse fashion and editorial prompts centered on styling direction, beauty cues, and polished visual references.",
    intro:
      "This collection keeps editorial fashion work together for creators building lookbooks, campaigns, and polished stylized portraits.",
    matcher: (prompt) => prompt.category === "Fashion" || prompt.rawCategory === "Fashion" || hasTag(prompt, "editorial")
  },
  {
    slug: "candid-photo-prompts",
    title: "Candid Photo Prompts",
    description:
      "Explore candid prompts for natural expressions, documentary-style framing, and scenes that feel unstaged.",
    intro:
      "These prompts lean toward moments that feel observed rather than posed, which makes them useful for portraits, family scenes, and weddings.",
    matcher: (prompt) => hasTag(prompt, "candid") || hasTag(prompt, "documentary")
  },
  {
    slug: "romantic-photo-prompts",
    title: "Romantic Photo Prompts",
    description:
      "A focused collection of romantic prompts for wedding scenes, couple portraits, and softer cinematic storytelling.",
    intro:
      "Use these prompts when you want warmth, closeness, or celebratory couple imagery for weddings and story-led scenes.",
    matcher: (prompt) => prompt.category === "Wedding" || prompt.rawCategory === "Wedding" || hasTag(prompt, "romantic")
  }
];
