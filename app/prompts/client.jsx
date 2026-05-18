"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AdSlot from "@/src/components/AdSlot";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import FilterBar from "@/src/components/FilterBar";
import SearchAndFilter from "@/src/components/SearchAndFilter";
import MasonryGrid from "@/src/components/MasonryGrid";
import Pagination from "@/src/components/Pagination";
import PromptCard from "@/src/components/PromptCard";
import PageHeader from "@/src/components/PageHeader";
import {
  comparePromptsByDate,
  getCategories,
  getFeaturedPrompts,
  getFilterTags,
  getTopTags,
  getTrendingPrompts,
  sortPromptsByDate,
} from "@/src/lib/content";

const STYLE_TAGS = [
  "photorealistic",
  "cinematic",
  "abstract",
  "illustration",
  "portrait",
  "landscape",
  "concept-art",
  "conceptual",
  "3d",
  "digital-art",
];

const MOOD_TAGS = [
  "dark",
  "bright",
  "moody",
  "minimal",
  "vibrant",
  "peaceful",
  "energetic",
  "somber",
  "joyful",
  "dreamy",
];

const PALETTE_TAGS = [
  "monochrome",
  "warm",
  "cool",
  "pastel",
  "vibrant",
  "neutral",
  "colorful",
  "desaturated",
];

const normalizeSort = (value) =>
  ["latest", "popular", "featured", "newest", "trending"].includes(value) ? value : "latest";

const parsePage = (value) => {
  const page = Number.parseInt(value || "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

const mapModelToTool = (model) => {
  if (!model) return null;
  const lowerModel = model.toLowerCase();
  if (lowerModel.includes("midjourney")) return "midjourney";
  if (lowerModel.includes("dall-e") || lowerModel.includes("dall-e")) return "dall-e";
  if (lowerModel.includes("flux")) return "flux";
  if (lowerModel.includes("stable")) return "stable-diffusion";
  if (lowerModel.includes("adobe") || lowerModel.includes("firefly")) return "adobe-firefly";
  return null;
};

const detectFilterType = (tag) => {
  const lower = tag.toLowerCase();
  if (STYLE_TAGS.some((s) => lower.includes(s) || s.includes(lower))) return "style";
  if (MOOD_TAGS.some((m) => lower.includes(m) || m.includes(lower))) return "mood";
  if (PALETTE_TAGS.some((p) => lower.includes(p) || p.includes(lower))) return "palette";
  return null;
};

export default function PromptsClientPage({ initialPrompts }) {
  const searchParams = useSearchParams();
  const [prompts] = useState(initialPrompts);

  // Parse new filter params
  const searchQuery = searchParams.get("q") || "";
  const tools = (searchParams.get("tools") || "").split(",").filter(Boolean);
  const styles = (searchParams.get("styles") || "").split(",").filter(Boolean);
  const moods = (searchParams.get("moods") || "").split(",").filter(Boolean);
  const palettes = (searchParams.get("palettes") || "").split(",").filter(Boolean);
  
  // Legacy filters
  const category = searchParams.get("category") || "all";
  const model = searchParams.get("model") || "all";
  const ratio = searchParams.get("ratio") || "all";
  const tag = searchParams.get("tag") || "";
  
  // Sort
  const sortBy = normalizeSort(searchParams.get("sort") || "latest");
  const currentPage = parsePage(searchParams.get("page"));
  const itemsPerPage = 12;

  const categories = useMemo(() => getCategories(prompts).map((cat) => cat.name), [prompts]);
  const models = useMemo(
    () => [...new Set(prompts.map((p) => p.model).filter(Boolean))].sort(),
    [prompts]
  );
  const aspectRatios = useMemo(
    () => [...new Set(prompts.map((p) => p.aspectRatio).filter(Boolean))].sort(),
    [prompts]
  );
  const filterTags = useMemo(() => getFilterTags(prompts), [prompts]);
  const topTags = useMemo(() => getTopTags(prompts, 12), [prompts]);

  const trendingOrder = useMemo(() => {
    const map = new Map();
    getTrendingPrompts(prompts, prompts.length).forEach((p, index) => {
      map.set(p.id, index);
    });
    return map;
  }, [prompts]);

  const featuredOrder = useMemo(() => {
    const map = new Map();
    getFeaturedPrompts(prompts, prompts.length).forEach((p, index) => {
      map.set(p.id, index);
    });
    return map;
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const results = prompts.filter((prompt) => {
      // Legacy filters
      if (category !== "all" && prompt.category !== category) return false;
      if (model !== "all" && prompt.model !== model) return false;
      if (ratio !== "all" && prompt.aspectRatio !== ratio) return false;
      if (tag && !prompt.displayTags.includes(tag) && !prompt.rawTags.includes(tag))
        return false;

      // AI Tool filter
      if (tools.length > 0) {
        const promptTool = mapModelToTool(prompt.model);
        if (!promptTool || !tools.includes(promptTool)) return false;
      }

      // Style filter - check tags
      if (styles.length > 0) {
        const hasMatchingStyle = prompt.displayTags.some((tag) =>
          styles.some((s) => tag.toLowerCase().includes(s) || s.includes(tag.toLowerCase()))
        );
        if (!hasMatchingStyle) return false;
      }

      // Mood filter - check tags
      if (moods.length > 0) {
        const hasMatchingMood = prompt.displayTags.some((tag) =>
          moods.some((m) => tag.toLowerCase().includes(m) || m.includes(tag.toLowerCase()))
        );
        if (!hasMatchingMood) return false;
      }

      // Palette filter - check tags
      if (palettes.length > 0) {
        const hasMatchingPalette = prompt.displayTags.some((tag) =>
          palettes.some((p) => tag.toLowerCase().includes(p) || p.includes(tag.toLowerCase()))
        );
        if (!hasMatchingPalette) return false;
      }

      // Text search
      if (!q) return true;

      const haystack = [
        prompt.title,
        prompt.category,
        prompt.rawCategory,
        prompt.model,
        prompt.prompt,
        prompt.negativePrompt,
        ...prompt.displayTags,
        ...prompt.rawTags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    // Sort results
    if (sortBy === "featured") {
      return [...results].sort((a, b) => {
        const left = featuredOrder.has(a.id)
          ? featuredOrder.get(a.id)
          : Number.MAX_SAFE_INTEGER;
        const right = featuredOrder.has(b.id)
          ? featuredOrder.get(b.id)
          : Number.MAX_SAFE_INTEGER;
        return left - right || comparePromptsByDate(a, b);
      });
    }

    if (sortBy === "popular" || sortBy === "trending") {
      return [...results].sort((a, b) => {
        const trendDiff =
          (trendingOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
          (trendingOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER);
        return trendDiff;
      });
    }

    // Default to newest/latest
    return sortPromptsByDate(results);
  }, [prompts, category, model, ratio, tag, searchQuery, tools, styles, moods, palettes, sortBy, trendingOrder, featuredOrder]);

  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const validPage = Math.min(currentPage, Math.max(1, totalPages));
  const paginatedPrompts = filteredPrompts.slice(
    (validPage - 1) * itemsPerPage,
    validPage * itemsPerPage
  );

  const hasActiveFilters =
    category !== "all" ||
    model !== "all" ||
    ratio !== "all" ||
    tag ||
    searchQuery ||
    tools.length > 0 ||
    styles.length > 0 ||
    moods.length > 0 ||
    palettes.length > 0;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Prompts", href: "/prompts" },
  ];

  const pageTitle = tag ? `${tag} Prompts` : "Browse Prompts";
  const pageDescription = tag
    ? `AI image prompts tagged with ${tag}`
    : "Search and filter AI image prompts by AI tool, style, mood, color palette, and more.";

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title={pageTitle} description={pageDescription} />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar - Enhanced Search & Filter */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <SearchAndFilter
              initialPrompts={prompts}
              resultCount={filteredPrompts.length}
              totalCount={prompts.length}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {/* Results Info */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {filteredPrompts.length === 0
                ? "No prompts found"
                : `Showing ${paginatedPrompts.length} of ${filteredPrompts.length} prompts`}
            </p>
          </div>

          <AdSlot slot="prompts_top" />

          {/* Prompts Grid */}
          {paginatedPrompts.length > 0 ? (
            <>
              <MasonryGrid>
                {paginatedPrompts.map((prompt) => (
                  <Link key={prompt.id} href={`/prompt/${prompt.slug}`} className="group">
                    <PromptCard prompt={prompt} />
                  </Link>
                ))}
              </MasonryGrid>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={validPage}
                    totalPages={totalPages}
                    totalItems={filteredPrompts.length}
                    itemsPerPage={itemsPerPage}
                    baseUrl="/prompts"
                    queryParams={{
                      ...(searchQuery && { q: searchQuery }),
                      ...(tools.length > 0 && { tools: tools.join(",") }),
                      ...(styles.length > 0 && { styles: styles.join(",") }),
                      ...(moods.length > 0 && { moods: moods.join(",") }),
                      ...(palettes.length > 0 && { palettes: palettes.join(",") }),
                      ...(category !== "all" && { category }),
                      ...(model !== "all" && { model }),
                      ...(ratio !== "all" && { ratio }),
                      ...(tag && { tag }),
                      ...(sortBy !== "latest" && { sort: sortBy }),
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                No prompts match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
