import { SITE_URL } from "../src/config.js";
import { enrichPrompts } from "../src/lib/content.js";
import { getIndexableEntries, getPrerenderRoutes, STATIC_INDEXABLE_ROUTES } from "../src/lib/routes.js";
import {
  fetchPromptData as fetchRemotePromptData,
  fetchPromptVersion
} from "../src/utils/promptData.js";
import { normalizePrompts } from "../src/utils/normalizePrompts.js";

export const fetchPromptData = async () => {
  let payload;

  try {
    const version = await fetchPromptVersion();
    payload = await fetchRemotePromptData(version);
  } catch {
    payload = await fetchRemotePromptData("");
  }

  return enrichPrompts(normalizePrompts(payload));
};

export const getSeoEntries = async () => {
  const prompts = await fetchPromptData();
  return getIndexableEntries(prompts);
};

export const getSeoRoutes = async () => {
  try {
    const prompts = await fetchPromptData();
    return getPrerenderRoutes(prompts);
  } catch (error) {
    console.warn("[seo-data] Falling back to static prerender routes:", error.message);
    return STATIC_INDEXABLE_ROUTES.map((route) => route.path);
  }
};

export const buildAbsoluteUrl = (path) => new URL(path, SITE_URL).toString();
