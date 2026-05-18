/**
 * Build-time data fetching for Next.js SSG
 * This module fetches all prompt data during build time for static generation
 */

import { GITHUB_RAW_URL, GITHUB_VERSION_URL } from "../config";
import { enrichPrompts, sortPromptsByDate } from "./content";
import { normalizePrompts } from "../utils/normalizePrompts";

/**
 * Fetch the latest version of the prompt data
 */
export async function fetchLatestVersion() {
  try {
    const response = await fetch(GITHUB_VERSION_URL, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch version: ${response.status}`);
    }

    const data = await response.json();
    const version = typeof data?.version === "string" ? data.version.trim() : "";

    if (!version) {
      throw new Error("Invalid version.json format");
    }

    return version;
  } catch (error) {
    console.error("Error fetching version:", error);
    return "";
  }
}

/**
 * Fetch all prompt data from GitHub with timeout
 */
export async function fetchAllPrompts(version) {
  if (!GITHUB_RAW_URL || GITHUB_RAW_URL.includes("PASTE_YOUR_GITHUB_RAW_JSON_URL")) {
    throw new Error(
      "Configure src/config.js with your GitHub RAW JSON URL before building."
    );
  }

  try {
    const url = version
      ? GITHUB_RAW_URL.replace("main", version)
      : GITHUB_RAW_URL;

    // Add 30-second timeout to prevent indefinite loading
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(url, {
      cache: "force-cache",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch prompts: ${response.status}`);
    }

    let data = await response.json();

    // Handle both array and { prompts: [] } formats
    if (Array.isArray(data)) {
      data = data;
    } else if (data?.prompts && Array.isArray(data.prompts)) {
      data = data.prompts;
    } else {
      throw new Error("Invalid data format. Expected array or { prompts: [] }");
    }

    const normalized = normalizePrompts(data);
    const enriched = enrichPrompts(normalized);
    const sorted = sortPromptsByDate(enriched);

    return {
      data: sorted,
      version: version || "",
    };
  } catch (error) {
    console.error("Error fetching prompts:", error);
    throw error;
  }
}

/**
 * Get all prompts with caching at build time
 */
let cachedPrompts = null;

export async function getPrompts() {
  if (cachedPrompts) {
    return cachedPrompts;
  }

  try {
    let version = "";
    try {
      version = await fetchLatestVersion();
    } catch {
      console.warn("Could not fetch latest version, using default");
    }

    const { data } = await fetchAllPrompts(version);
    cachedPrompts = data;
    return data;
  } catch (error) {
    console.error("Fatal error fetching prompts:", error);
    throw error;
  }
}

/**
 * Get a single prompt by slug
 */
export async function getPromptBySlug(slug) {
  const prompts = await getPrompts();
  return prompts.find((p) => p.slug === slug);
}

/**
 * Get a single prompt by ID
 */
export async function getPromptById(id) {
  const prompts = await getPrompts();
  return prompts.find((p) => p.id === id);
}

/**
 * Get all prompt slugs for generateStaticParams
 */
export async function getAllPromptSlugs() {
  const prompts = await getPrompts();
  return prompts.map((p) => p.slug).filter(Boolean);
}

/**
 * Get all prompt IDs for generateStaticParams
 */
export async function getAllPromptIds() {
  const prompts = await getPrompts();
  return prompts.map((p) => p.id).filter(Boolean);
}
