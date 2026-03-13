import { GITHUB_RAW_URL, GITHUB_VERSION_URL, buildPromptDataUrl } from "../config.js";
import { getJson, setJson } from "./storage.js";

const PROMPT_DATA_CACHE_KEY = "promptDataCache";

const hasPromptArray = (payload) => Array.isArray(payload) || Array.isArray(payload?.prompts);

export const fetchPromptVersion = async (signal) => {
  const response = await fetch(GITHUB_VERSION_URL, {
    signal,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch prompt version: ${response.status}`);
  }

  const payload = await response.json();
  const version = typeof payload?.version === "string" ? payload.version.trim() : "";

  if (!version) {
    throw new Error("Invalid version.json format. Expected { version: \"...\" }.");
  }

  return version;
};

export const fetchPromptData = async (version = "", signal) => {
  const response = await fetch(version ? buildPromptDataUrl(version) : GITHUB_RAW_URL, {
    signal,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch prompt data: ${response.status}`);
  }

  return response.json();
};

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
