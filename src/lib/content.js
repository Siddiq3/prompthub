import { FEATURED_PROMPT_IDS } from "../config.js";
import { COLLECTION_DEFINITIONS } from "./collections.js";
import { encodePathSegment, slugify } from "./slug.js";

const MODEL_LABELS = {
  Dalle: "DALL·E",
  Flux: "Flux",
  Midjourney: "Midjourney",
  StableDiffusion: "Stable Diffusion"
};

const CATEGORY_COPY = {
  Beauty:
    "Beauty prompts center on polished close-ups, skin detail, makeup styling, and premium editorial image generation references.",
  Cinematic:
    "Cinematic prompts focus on mood, narrative framing, dramatic lighting, and film-inspired visual storytelling.",
  Fashion:
    "Fashion prompts help creators explore editorial styling, premium wardrobe direction, beauty details, and modern campaign aesthetics.",
  Kids:
    "Kids prompts highlight authentic family moments, playful storytelling, and emotional image ideas for lifestyle and portrait work.",
  Portrait:
    "Portrait prompts help you generate realistic headshots, studio portraits, expressive close-ups, and premium character-driven imagery.",
  Sports:
    "Sports prompts bring motion, action, sweat, impact, and peak-moment storytelling into AI photo generation workflows.",
  Street:
    "Street prompts emphasize urban atmosphere, documentary-style scenes, candid framing, and location-driven visual character.",
  Wedding:
    "Wedding prompts collect emotional couple portraits, ceremony details, candid celebrations, and romantic storytelling setups."
};

const getTimestamp = (value) => {
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

const formatDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
};

const clampText = (value, length = 160) => {
  const text = String(value || "").trim();

  if (!text) return "";
  if (text.length <= length) return text;

  return `${text.slice(0, Math.max(0, length - 1)).trimEnd()}…`;
};

const dedupe = (items) =>
  items.filter((item, index) => items.findIndex((entry) => entry.id === item.id) === index);

export const getModelLabel = (value) => MODEL_LABELS[value] || value || "AI image model";

export const buildPromptPath = (prompt) => `/prompt/${encodePathSegment(prompt.slug)}`;

export const buildCategoryPath = (value) => `/category/${encodePathSegment(slugify(value))}`;

export const buildCollectionPath = (value) => `/collection/${encodePathSegment(value)}`;

export const buildPromptsPathWithTag = (value) => `/prompts?tag=${encodeURIComponent(value)}`;

const hasTag = (prompt, tag) =>
  prompt.tags.some((item) => String(item).trim().toLowerCase() === String(tag).trim().toLowerCase());

export const enrichPrompts = (prompts) => {
  const baseSlugs = prompts.map((prompt) => slugify(prompt.title || prompt.id || "prompt"));
  const counts = baseSlugs.reduce((acc, slug) => {
    acc[slug] = (acc[slug] || 0) + 1;
    return acc;
  }, {});

  return prompts.map((prompt, index) => {
    const baseSlug = baseSlugs[index] || `prompt-${index + 1}`;
    const slug = counts[baseSlug] > 1 ? `${baseSlug}-${slugify(prompt.id)}` : baseSlug;
    const createdTimestamp = getTimestamp(prompt.createdAt);
    const modelLabel = getModelLabel(prompt.model);
    const shortDescription =
      clampText(prompt.prompt, 130) ||
      `${prompt.title} is a ${prompt.category.toLowerCase()} AI photo prompt designed for ${modelLabel}.`;

    return {
      ...prompt,
      slug,
      url: `/prompt/${encodePathSegment(slug)}`,
      modelLabel,
      createdTimestamp,
      formattedDate: formatDate(prompt.createdAt),
      tagSlugs: prompt.tags.map((tag) => slugify(tag)),
      shortDescription,
      seoIntro: `${prompt.title} is a ${prompt.category.toLowerCase()} AI photo prompt built for ${modelLabel}. It is a strong fit for creators exploring ${prompt.tags.slice(0, 3).join(", ") || "high-quality image generation"} with a ${prompt.aspectRatio} composition.`,
      bestFor: dedupe(
        [
          { id: `${prompt.id}-category`, label: prompt.category },
          { id: `${prompt.id}-model`, label: modelLabel },
          ...prompt.tags.slice(0, 3).map((tag) => ({ id: `${prompt.id}-${tag}`, label: tag }))
        ]
      )
    };
  });
};

export const sortPromptsByDate = (prompts, direction = "desc") =>
  [...prompts].sort((a, b) =>
    direction === "asc" ? a.createdTimestamp - b.createdTimestamp : b.createdTimestamp - a.createdTimestamp
  );

export const getFeaturedPrompts = (prompts) =>
  FEATURED_PROMPT_IDS.map((id) => prompts.find((prompt) => prompt.id === id)).filter(Boolean);

export const getLatestPrompts = (prompts, limit) => {
  const sorted = sortPromptsByDate(prompts);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
};

export const getLatestPromptsByTag = (prompts, tag, limit) =>
  getLatestPrompts(prompts.filter((prompt) => hasTag(prompt, tag)), limit);

export const getTrendingPrompts = (prompts, limit = 12) => {
  const featured = getFeaturedPrompts(prompts);
  const latest = getLatestPrompts(prompts).filter(
    (prompt) => !featured.some((item) => item.id === prompt.id)
  );

  return [...featured, ...latest].slice(0, limit);
};

export const getTopTags = (prompts, limit = 10) => {
  const counts = new Map();

  for (const prompt of prompts) {
    for (const tag of prompt.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([name, count]) => ({
      name,
      slug: slugify(name),
      count,
      href: buildPromptsPathWithTag(name)
    }));
};

export const getCategories = (prompts) =>
  [...new Set(prompts.map((prompt) => prompt.category).filter(Boolean))]
    .map((name) => {
      const items = getLatestPrompts(prompts.filter((prompt) => prompt.category === name));
      return {
        name,
        slug: slugify(name),
        href: buildCategoryPath(name),
        description: CATEGORY_COPY[name] || `${name} AI photo prompts and creative image generation ideas.`,
        count: items.length,
        prompts: items,
        latestPrompt: items[0] || null
      };
    })
    .sort(
      (a, b) =>
        (b.latestPrompt?.createdTimestamp || 0) - (a.latestPrompt?.createdTimestamp || 0) ||
        b.count - a.count ||
        a.name.localeCompare(b.name)
    );

export const getCategoryBySlug = (prompts, slug) =>
  getCategories(prompts).find((category) => category.slug === slug);

export const getCollections = (prompts) =>
  COLLECTION_DEFINITIONS.map((definition) => {
    const items = getLatestPrompts(prompts.filter((prompt) => definition.matcher(prompt)));
    return {
      ...definition,
      href: buildCollectionPath(definition.slug),
      count: items.length,
      prompts: items
    };
  }).filter((collection) => collection.count > 0);

export const getCollectionBySlug = (prompts, slug) =>
  getCollections(prompts).find((collection) => collection.slug === slug);

export const getPromptByParam = (prompts, param) =>
  prompts.find((prompt) => prompt.slug === param) ||
  prompts.find((prompt) => String(prompt.id) === String(param));

export const getRelatedPrompts = (prompts, currentPrompt, limit = 6) => {
  if (!currentPrompt) return [];

  return prompts
    .filter((prompt) => prompt.id !== currentPrompt.id)
    .map((prompt) => {
      const tagOverlap = prompt.tags.filter((tag) => currentPrompt.tags.includes(tag)).length;
      const score =
        (prompt.category === currentPrompt.category ? 4 : 0) +
        (prompt.model === currentPrompt.model ? 2 : 0) +
        (prompt.aspectRatio === currentPrompt.aspectRatio ? 1 : 0) +
        tagOverlap * 2;

      return { ...prompt, score };
    })
    .filter((prompt) => prompt.score > 0)
    .sort((a, b) => b.score - a.score || b.createdTimestamp - a.createdTimestamp)
    .slice(0, limit);
};

export const getSimilarPrompts = (prompts, currentPrompt, limit = 6) => {
  if (!currentPrompt) return [];

  return getLatestPrompts(
    prompts.filter(
      (prompt) => prompt.id !== currentPrompt.id && prompt.category === currentPrompt.category
    ),
    limit
  );
};

export const getCollectionHighlights = (prompts, limit = 4) => getCollections(prompts).slice(0, limit);

export const getPopularCategories = (prompts, limit = 6) => getCategories(prompts).slice(0, limit);
