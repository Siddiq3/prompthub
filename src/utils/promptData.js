import { fetchPromptData, fetchPromptVersion } from "../lib/getPrompts.js";
import { getJson, setJson } from "./storage.js";

const PROMPT_DATA_CACHE_KEY = "promptDataCache";

const hasPromptArray = (payload) => Array.isArray(payload) || Array.isArray(payload?.prompts);

export { fetchPromptData, fetchPromptVersion };

export const getCachedPromptData = () => {
  const cached = getJson(PROMPT_DATA_CACHE_KEY, null);

  if (!cached || typeof cached !== "object" || !hasPromptArray(cached.data)) {
    return null;
  }

  return {
    data: cached.data,
    version: typeof cached.version === "string" ? cached.version : ""
  };
};

export const setCachedPromptData = (data, version = "") => {
  if (!hasPromptArray(data)) {
    return;
  }

  setJson(PROMPT_DATA_CACHE_KEY, {
    version: String(version || ""),
    data
  });
};
