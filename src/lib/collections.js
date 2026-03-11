const hasTag = (prompt, tag) => prompt.tagSlugs.includes(tag);

export const COLLECTION_DEFINITIONS = [
  {
    slug: "midjourney-photo-prompts",
    title: "Midjourney Photo Prompts",
    description:
      "Browse Midjourney-ready AI photo prompts for portraits, cinematic scenes, weddings, sports, and visual storytelling.",
    intro:
      "This collection gathers prompts labeled for Midjourney so creators can find practical starting points for realistic portraits, editorial scenes, and dynamic compositions.",
    matcher: (prompt) => prompt.model === "Midjourney"
  },
  {
    slug: "dalle-photo-prompts",
    title: "DALL·E Photo Prompts",
    description:
      "Explore DALL·E-friendly prompts for polished portraits, beauty work, romantic scenes, and commercial image generation ideas.",
    intro:
      "Use this collection to browse DALL·E-oriented prompt ideas with clean structure, visual specificity, and quick copy-ready text.",
    matcher: (prompt) => prompt.model === "Dalle"
  },
  {
    slug: "flux-photo-prompts",
    title: "Flux Photo Prompts",
    description:
      "Discover Flux prompts for fashion editorials, cinematic portraits, wedding moments, and high-quality AI photo generation.",
    intro:
      "Flux is heavily represented in the library, making this one of the broadest collections for premium portrait, fashion, and storytelling references.",
    matcher: (prompt) => prompt.model === "Flux"
  },
  {
    slug: "stable-diffusion-photo-prompts",
    title: "Stable Diffusion Photo Prompts",
    description:
      "Find Stable Diffusion prompts for street, portrait, sports, and wedding concepts with structured creative direction.",
    intro:
      "These prompts help Stable Diffusion users start with consistent framing, mood, and styling cues instead of writing from scratch.",
    matcher: (prompt) => prompt.model === "StableDiffusion"
  },
  {
    slug: "cinematic-photo-prompts",
    title: "Cinematic Photo Prompts",
    description:
      "A curated set of cinematic AI photo prompts spanning moody lighting, film-inspired scenes, and story-driven compositions.",
    intro:
      "This collection prioritizes atmosphere, narrative framing, and image prompts with strong emotional or filmic direction.",
    matcher: (prompt) => prompt.category === "Cinematic" || prompt.rawCategory === "Cinematic" || hasTag(prompt, "cinematic")
  },
  {
    slug: "fashion-editorial-photo-prompts",
    title: "Fashion Editorial Photo Prompts",
    description:
      "Browse premium fashion and editorial prompt ideas featuring styling direction, beauty cues, and polished visual references.",
    intro:
      "Editorial fashion prompts are grouped here for creators working on brand campaigns, stylized portraits, and premium lookbooks.",
    matcher: (prompt) => prompt.category === "Fashion" || prompt.rawCategory === "Fashion" || hasTag(prompt, "editorial")
  },
  {
    slug: "candid-photo-prompts",
    title: "Candid Photo Prompts",
    description:
      "Explore candid AI photo prompts for natural expressions, documentary-style framing, and unstaged-looking scenes.",
    intro:
      "This collection surfaces prompt ideas that feel observational and lived-in, which is especially useful for portraits, family scenes, and weddings.",
    matcher: (prompt) => hasTag(prompt, "candid") || hasTag(prompt, "documentary")
  },
  {
    slug: "romantic-photo-prompts",
    title: "Romantic Photo Prompts",
    description:
      "A focused collection of romantic and emotional AI prompts for wedding scenes, couple portraits, and soft cinematic storytelling.",
    intro:
      "Use these prompts when you need emotional warmth, romantic tension, or celebratory couple imagery for weddings and storytelling work.",
    matcher: (prompt) => prompt.category === "Wedding" || prompt.rawCategory === "Wedding" || hasTag(prompt, "romantic")
  }
];
