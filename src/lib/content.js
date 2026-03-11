import { FALLBACK_OG_IMAGE } from "../config.js";
import { COLLECTION_DEFINITIONS } from "./collections.js";
import {
  derivePrimaryCategory,
  formatTagLabel,
  getCategoryMeta,
  getDiscoveryTags,
  getSubjectTags,
  getStyleTags,
  sortCategoriesByPriority
} from "./taxonomy.js";
import { encodePathSegment, slugify } from "./slug.js";

const MODEL_LABELS = {
  Dalle: "DALL·E",
  Flux: "Flux",
  Midjourney: "Midjourney",
  StableDiffusion: "Stable Diffusion"
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

const getSourceIndex = (prompt) =>
  Number.isFinite(prompt?.sourceIndex) ? prompt.sourceIndex : -1;

const DEFAULT_FEATURED_LIMIT = 6;

export const comparePromptsByDate = (left, right, direction = "desc") => {
  const timeDiff =
    direction === "asc"
      ? left.createdTimestamp - right.createdTimestamp
      : right.createdTimestamp - left.createdTimestamp;

  if (timeDiff !== 0) {
    return timeDiff;
  }

  return direction === "asc"
    ? getSourceIndex(left) - getSourceIndex(right)
    : getSourceIndex(right) - getSourceIndex(left);
};

const dedupeById = (items = []) =>
  items.filter((item, index) => items.findIndex((entry) => entry.id === item.id) === index);

const formatHumanList = (items = []) => {
  const values = items.filter(Boolean);

  if (!values.length) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
};

const buildTagEntries = (counts = new Map(), limit) => {
  const items = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({
      name,
      label: formatTagLabel(name),
      slug: slugify(name),
      count,
      href: buildPromptsPathWithTag(name)
    }));

  return typeof limit === "number" ? items.slice(0, limit) : items;
};

const countTags = (prompts, selector) => {
  const counts = new Map();

  for (const prompt of prompts) {
    for (const tag of selector(prompt)) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return counts;
};

export const getModelLabel = (value) => MODEL_LABELS[value] || value || "AI image model";

export const buildPromptPath = (prompt) => `/prompt/${encodePathSegment(prompt.slug)}`;

export const buildCategoryPath = (value) => `/category/${encodePathSegment(slugify(value))}`;

export const buildCollectionPath = (value) => `/collection/${encodePathSegment(value)}`;

export const buildPromptsPathWithTag = (value) => `/prompts?tag=${encodeURIComponent(value)}`;

const hasTag = (prompt, tag) => {
  const normalized = String(tag).trim().toLowerCase();

  return (
    prompt.rawTags.some((item) => String(item).trim().toLowerCase() === normalized) ||
    prompt.displayTags.some((item) => String(item).trim().toLowerCase() === normalized)
  );
};

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
    const rawTags = [...new Set(prompt.tags.map((tag) => String(tag).trim()).filter(Boolean))];
    const discoveryTags = getDiscoveryTags(rawTags);
    const styleTags = getStyleTags(rawTags);
    const displayTags = styleTags.length ? styleTags : discoveryTags;
    const category = derivePrimaryCategory({ category: prompt.category, tags: rawTags });
    const subjectTags = getSubjectTags(rawTags, category);
    const categoryMeta = getCategoryMeta(category);
    const shortDescription =
      clampText(prompt.prompt, 124) ||
      `${prompt.title} is a ${category.toLowerCase()} AI photo prompt designed for ${modelLabel}.`;

    return {
      ...prompt,
      sourceIndex: Number.isFinite(prompt.sourceIndex) ? prompt.sourceIndex : index,
      rawCategory: prompt.category,
      category,
      categoryDescription: categoryMeta.description,
      categoryIntro: categoryMeta.intro,
      rawTags,
      discoveryTags,
      subjectTags,
      styleTags,
      displayTags,
      slug,
      url: buildPromptPath({ slug }),
      modelLabel,
      createdTimestamp,
      formattedDate: formatDate(prompt.createdAt),
      tagSlugs: rawTags.map((tag) => slugify(tag)),
      shortDescription,
      seoIntro: `${prompt.title} is a ${category.toLowerCase()} AI photo prompt built for ${modelLabel}. It works especially well for ${formatHumanList(
        displayTags.slice(0, 3).map((tag) => formatTagLabel(tag))
      ) || `${category.toLowerCase()} image generation`} with a ${prompt.aspectRatio} composition.`,
      bestFor: dedupeById(
        [
          { id: `${prompt.id}-category`, label: category },
          { id: `${prompt.id}-model`, label: modelLabel },
          ...displayTags.slice(0, 3).map((tag) => ({
            id: `${prompt.id}-${slugify(tag)}`,
            label: formatTagLabel(tag)
          }))
        ].filter(Boolean)
      )
    };
  });
};

export const sortPromptsByDate = (prompts, direction = "desc") =>
  [...prompts].sort((a, b) => comparePromptsByDate(a, b, direction));

export const getLatestPrompts = (prompts, limit) => {
  const sorted = sortPromptsByDate(prompts);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
};

export const getFeaturedPrompts = (prompts, limit = DEFAULT_FEATURED_LIMIT) => {
  const explicitFeatured = getLatestPrompts(prompts.filter((prompt) => prompt.featured), prompts.length);
  const source = explicitFeatured.length ? explicitFeatured : getLatestPrompts(prompts, prompts.length);

  return typeof limit === "number" ? source.slice(0, limit) : source;
};

export const getDefaultOgImage = (prompts, fallback = FALLBACK_OG_IMAGE) =>
  getLatestPrompts(prompts, prompts.length).find((prompt) => prompt.previewImage)?.previewImage || fallback;

export const getLatestPromptsByTag = (prompts, tag, limit) =>
  getLatestPrompts(prompts.filter((prompt) => hasTag(prompt, tag)), limit);

export const getTrendingPrompts = (prompts, limit = 12) => {
  const featured = getFeaturedPrompts(prompts, limit);
  const latest = getLatestPrompts(prompts).filter(
    (prompt) => !featured.some((item) => item.id === prompt.id)
  );

  return sortPromptsByDate(dedupeById([...featured, ...latest])).slice(0, limit);
};

export const getTopTags = (prompts, limit = 10) =>
  buildTagEntries(
    countTags(prompts, (prompt) => (prompt.styleTags.length ? prompt.styleTags : prompt.displayTags)),
    limit
  );

export const getFilterTags = (prompts) =>
  buildTagEntries(countTags(prompts, (prompt) => (prompt.styleTags.length ? prompt.styleTags : prompt.displayTags)));

export const getTagLanding = (prompts, value) => {
  const name = String(value || "").trim();

  if (!name) return null;

  const items = getLatestPrompts(prompts.filter((prompt) => hasTag(prompt, name)));

  if (!items.length) {
    return null;
  }

  const label = formatTagLabel(name);
  const relatedCategories = [...countTags(items, (prompt) => [prompt.category]).entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([categoryName, count]) => ({
      name: categoryName,
      count,
      href: buildCategoryPath(categoryName)
    }))
    .slice(0, 4);
  const categorySummary = formatHumanList(relatedCategories.map((category) => category.name));

  return {
    name,
    label,
    slug: slugify(name),
    href: buildPromptsPathWithTag(name),
    count: items.length,
    prompts: items,
    latestPrompt: items[0] || null,
    relatedCategories,
    intro: `${label} prompts use ${label.toLowerCase()} as a secondary style, festival, mood, location, or visual modifier across ${categorySummary || "multiple categories"}.`,
    description: `Browse ${label.toLowerCase()} AI photo prompts across ${categorySummary || "multiple categories"} on PhotoPromptsHub.`
  };
};

export const getCategories = (prompts) =>
  sortCategoriesByPriority(
    [...new Set(prompts.map((prompt) => prompt.category).filter(Boolean))].map((name) => {
      const categoryMeta = getCategoryMeta(name);
      const items = getLatestPrompts(prompts.filter((prompt) => prompt.category === name));
      const categorySlug = slugify(name);

      return {
        ...categoryMeta,
        href: buildCategoryPath(name),
        count: items.length,
        prompts: items,
        topSubjects: buildTagEntries(
          countTags(items, (prompt) =>
            prompt.subjectTags.filter((tag) => slugify(tag) !== categorySlug)
          ),
          4
        ),
        topTags: buildTagEntries(
          countTags(items, (prompt) => (prompt.styleTags.length ? prompt.styleTags : prompt.displayTags)),
          5
        ),
        latestPrompt: items[0] || null
      };
    })
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
      const tagOverlap = prompt.rawTags.filter((tag) => currentPrompt.rawTags.includes(tag)).length;
      const score =
        (prompt.category === currentPrompt.category ? 4 : 0) +
        (prompt.model === currentPrompt.model ? 2 : 0) +
        (prompt.aspectRatio === currentPrompt.aspectRatio ? 1 : 0) +
        tagOverlap * 2;

      return { ...prompt, score };
    })
    .filter((prompt) => prompt.score > 0)
    .sort((a, b) => b.score - a.score || comparePromptsByDate(a, b))
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

export const getPopularCategories = (prompts, limit = 6) =>
  [...getCategories(prompts)]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
