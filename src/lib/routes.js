import {
  buildPromptsPathWithTag,
  getCategories,
  getCollections,
  getLatestPrompts,
  getLatestPromptsByTag,
  getTopTags
} from "./content.js";

export const STATIC_INDEXABLE_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/prompts", priority: "0.95", changefreq: "daily" },
  { path: "/categories", priority: "0.9", changefreq: "weekly" },
  { path: "/collections", priority: "0.9", changefreq: "weekly" },
  { path: "/latest", priority: "0.9", changefreq: "daily" },
  { path: "/trending", priority: "0.85", changefreq: "daily" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.4", changefreq: "monthly" },
  { path: "/terms", priority: "0.4", changefreq: "monthly" },
  { path: "/disclaimer", priority: "0.4", changefreq: "monthly" },
  { path: "/dmca", priority: "0.4", changefreq: "monthly" }
];

const todayIsoDate = () => new Date().toISOString().slice(0, 10);

const clampLastmod = (value, fallback = todayIsoDate()) => {
  const next = String(value || fallback).slice(0, 10);
  const parsed = new Date(next);

  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }

  return next > fallback ? fallback : next;
};

export const getIndexableEntries = (prompts) => {
  const latestPrompt = getLatestPrompts(prompts, 1)[0];
  const baseLastMod = clampLastmod(latestPrompt?.createdAt);
  const tagEntries = getTopTags(prompts, 18)
    .filter((tag) => tag.count >= 3)
    .map((tag) => {
      const latestTagPrompt = getLatestPromptsByTag(prompts, tag.name, 1)[0];

      return {
        path: buildPromptsPathWithTag(tag.name),
        priority: "0.68",
        changefreq: "weekly",
        lastmod: clampLastmod(latestTagPrompt?.createdAt, baseLastMod)
      };
    });

  return [
    ...STATIC_INDEXABLE_ROUTES.map((route) => ({
      ...route,
      lastmod: baseLastMod
    })),
    ...getCategories(prompts).map((category) => ({
      path: category.href,
      priority: "0.8",
      changefreq: "weekly",
      lastmod: clampLastmod(category.latestPrompt?.createdAt, baseLastMod)
    })),
    ...getCollections(prompts).map((collection) => ({
      path: collection.href,
      priority: "0.75",
      changefreq: "weekly",
      lastmod: clampLastmod(collection.prompts[0]?.createdAt, baseLastMod)
    })),
    ...tagEntries,
    ...prompts.map((prompt) => ({
      path: prompt.url,
      priority: "0.7",
      changefreq: "weekly",
      lastmod: clampLastmod(prompt.createdAt, baseLastMod)
    }))
  ];
};

export const getPrerenderRoutes = (prompts) =>
  getIndexableEntries(prompts)
    .filter((entry) => !entry.path.includes("?"))
    .map((entry) => entry.path);
