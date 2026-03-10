import { getCollections, getLatestPrompts, getCategories } from "./content.js";

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

export const getIndexableEntries = (prompts) => {
  const latestPrompt = getLatestPrompts(prompts, 1)[0];
  const baseLastMod = latestPrompt?.createdAt || new Date().toISOString().slice(0, 10);

  return [
    ...STATIC_INDEXABLE_ROUTES.map((route) => ({
      ...route,
      lastmod: baseLastMod
    })),
    ...getCategories(prompts).map((category) => ({
      path: category.href,
      priority: "0.8",
      changefreq: "weekly",
      lastmod: category.latestPrompt?.createdAt || baseLastMod
    })),
    ...getCollections(prompts).map((collection) => ({
      path: collection.href,
      priority: "0.75",
      changefreq: "weekly",
      lastmod: collection.prompts[0]?.createdAt || baseLastMod
    })),
    ...prompts.map((prompt) => ({
      path: prompt.url,
      priority: "0.7",
      changefreq: "weekly",
      lastmod: prompt.createdAt || baseLastMod
    }))
  ];
};

export const getPrerenderRoutes = (prompts) => getIndexableEntries(prompts).map((entry) => entry.path);
