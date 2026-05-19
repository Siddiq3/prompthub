/**
 * Build-time data fetching for Next.js App Router
 * Uses Next.js built-in caching instead of module-level cache
 * This is more reliable and works correctly on Vercel
 */

import { GITHUB_RAW_URL } from "../config";
import { enrichPrompts, sortPromptsByDate } from "./content";
import { normalizePrompts } from "../utils/normalizePrompts";

/**
 * Get all prompts with Next.js ISR caching
 * Uses next: { revalidate } instead of module-level cache
 * Safe for Vercel production builds
 */
export async function getPrompts() {
  try {
    console.log("[getPrompts] Fetching prompts from GitHub...");
    console.log(`[getPrompts] URL: ${GITHUB_RAW_URL}`);

    // Add 30-second timeout to prevent indefinite loading
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.error("[getPrompts] Fetch timeout after 30 seconds");
    }, 30000);

    const response = await fetch(GITHUB_RAW_URL, {
      next: { revalidate: 3600 }, // Revalidate every hour
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[getPrompts] GitHub fetch failed: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch prompts: ${response.status}`);
    }

    let data = await response.json();
    console.log(`[getPrompts] Raw data received, type: ${Array.isArray(data) ? "array" : "object"}`);

    // Handle both array and { prompts: [] } formats
    if (Array.isArray(data)) {
      console.log(`[getPrompts] Data is array with ${data.length} items`);
    } else if (data?.prompts && Array.isArray(data.prompts)) {
      console.log(`[getPrompts] Data is object with prompts array: ${data.prompts.length} items`);
      data = data.prompts;
    } else {
      console.error("[getPrompts] Invalid data format. Expected array or { prompts: [] }");
      throw new Error("Invalid data format. Expected array or { prompts: [] }");
    }

    // Process the data
    const normalized = normalizePrompts(data);
    console.log(`[getPrompts] Normalized: ${normalized.length} items`);

    const enriched = enrichPrompts(normalized);
    console.log(`[getPrompts] Enriched: ${enriched.length} items`);

    const sorted = sortPromptsByDate(enriched);
    console.log(`[getPrompts] Sorted: ${sorted.length} items - SUCCESS`);

    return sorted;
  } catch (error) {
    console.error("[getPrompts] Fatal error:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Get a single prompt by slug
 */
export async function getPromptBySlug(slug) {
  try {
    const prompts = await getPrompts();
    const prompt = prompts.find((p) => p.slug === slug);
    if (!prompt) {
      console.warn(`[getPromptBySlug] Prompt not found: ${slug}`);
    }
    return prompt;
  } catch (error) {
    console.error(`[getPromptBySlug] Error fetching prompt by slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Get a single prompt by ID
 */
export async function getPromptById(id) {
  try {
    const prompts = await getPrompts();
    const prompt = prompts.find((p) => p.id === id);
    if (!prompt) {
      console.warn(`[getPromptById] Prompt not found: ${id}`);
    }
    return prompt;
  } catch (error) {
    console.error(`[getPromptById] Error fetching prompt by ID "${id}":`, error);
    throw error;
  }
}

/**
 * Get all prompt slugs for generateStaticParams
 */
export async function getAllPromptSlugs() {
  try {
    const prompts = await getPrompts();
    const slugs = prompts.map((p) => p.slug).filter(Boolean);
    console.log(`[getAllPromptSlugs] Generated ${slugs.length} slugs`);
    return slugs;
  } catch (error) {
    console.error("[getAllPromptSlugs] Error generating slugs:", error);
    throw error;
  }
}

/**
 * Get all prompt IDs for generateStaticParams
 */
export async function getAllPromptIds() {
  try {
    const prompts = await getPrompts();
    const ids = prompts.map((p) => p.id).filter(Boolean);
    console.log(`[getAllPromptIds] Generated ${ids.length} IDs`);
    return ids;
  } catch (error) {
    console.error("[getAllPromptIds] Error generating IDs:", error);
    throw error;
  }
}
