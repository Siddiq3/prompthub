/**
 * Build-time data fetching for Next.js App Router
 * Uses Next.js built-in caching and a single JSON source from GitHub.
 */

import { enrichPrompts, sortPromptsByDate } from "./content";
import { normalizePrompts } from "../utils/normalizePrompts";
import { fetchPromptData } from "./getPrompts";

/**
 * Get all prompts with Next.js ISR caching
 * Returns an empty array on failure and never crashes.
 */
export async function getPrompts() {
  try {
    console.log("[getPrompts] Fetching prompts from GitHub raw JSON...");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.error("[getPrompts] Fetch timeout after 30 seconds");
    }, 30000);

    let data = await fetchPromptData(controller.signal);
    clearTimeout(timeoutId);

    console.log(`[getPrompts] Raw data received, type: ${Array.isArray(data) ? "array" : "object"}`);

    if (Array.isArray(data)) {
      console.log(`[getPrompts] Data is array with ${data.length} items`);
    } else if (data?.prompts && Array.isArray(data.prompts)) {
      console.log(`[getPrompts] Data is object with prompts array: ${data.prompts.length} items`);
      data = data.prompts;
    } else {
      console.error("[getPrompts] Invalid data format. Expected array or { prompts: [] }");
      return [];
    }

    const normalized = normalizePrompts(data);
    console.log(`[getPrompts] Normalized: ${normalized.length} items`);

    const enriched = enrichPrompts(normalized);
    console.log(`[getPrompts] Enriched: ${enriched.length} items`);

    const sorted = sortPromptsByDate(enriched);
    console.log(`[getPrompts] Sorted: ${sorted.length} items - SUCCESS`);

    return sorted;
  } catch (error) {
    console.error("[getPrompts] Fatal error:", error instanceof Error ? error.message : String(error));
    return [];
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
    return undefined;
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
    return undefined;
  }
}

export async function getPromptByIdentifier(identifier) {
  try {
    const prompts = await getPrompts();
    const promptById = prompts.find((p) => p.id === identifier);
    if (promptById) return promptById;

    const promptBySlug = prompts.find((p) => p.slug === identifier);
    if (promptBySlug) return promptBySlug;

    console.warn(`[getPromptByIdentifier] Prompt not found: ${identifier}`);
    return undefined;
  } catch (error) {
    console.error(`[getPromptByIdentifier] Error fetching prompt by identifier "${identifier}":`, error);
    return undefined;
  }
}

export async function getAllPromptIdentifiers() {
  try {
    const prompts = await getPrompts();
    const identifiers = Array.from(
      new Set([
        ...prompts.map((p) => p.id).filter(Boolean),
        ...prompts.map((p) => p.slug).filter(Boolean),
      ]),
    );
    console.log(`[getAllPromptIdentifiers] Generated ${identifiers.length} identifiers`);
    return identifiers;
  } catch (error) {
    console.error("[getAllPromptIdentifiers] Error generating prompt identifiers:", error);
    return [];
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
    return [];
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
    return [];
  }
}
