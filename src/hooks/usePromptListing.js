import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FEATURED_PROMPT_IDS } from "../config";
import { getTopTags, getTrendingPrompts, sortPromptsByDate } from "../lib/content";

const normalizeSort = (value) =>
  ["latest", "popular", "featured"].includes(value) ? value : "latest";

const parsePage = (value) => {
  const page = Number.parseInt(value || "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

export const usePromptListing = (prompts, copyCounts) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useMemo(
    () => [...new Set(prompts.map((prompt) => prompt.category).filter(Boolean))].sort(),
    [prompts]
  );
  const models = useMemo(
    () => [...new Set(prompts.map((prompt) => prompt.model).filter(Boolean))].sort(),
    [prompts]
  );
  const aspectRatios = useMemo(
    () => [...new Set(prompts.map((prompt) => prompt.aspectRatio).filter(Boolean))].sort(),
    [prompts]
  );
  const topTags = useMemo(() => getTopTags(prompts, 12), [prompts]);

  const searchQuery = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const model = searchParams.get("model") || "all";
  const ratio = searchParams.get("ratio") || "all";
  const tag = searchParams.get("tag") || "";
  const sortBy = normalizeSort(searchParams.get("sort") || "latest");
  const currentPage = parsePage(searchParams.get("page"));
  const itemsPerPage = 12;

  const trendingOrder = useMemo(() => {
    const map = new Map();
    getTrendingPrompts(prompts, prompts.length).forEach((prompt, index) => {
      map.set(prompt.id, index);
    });
    return map;
  }, [prompts]);

  const featuredOrder = useMemo(() => {
    const map = new Map();
    FEATURED_PROMPT_IDS.forEach((id, index) => {
      map.set(id, index);
    });
    return map;
  }, []);

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const results = prompts.filter((prompt) => {
      if (category !== "all" && prompt.category !== category) return false;
      if (model !== "all" && prompt.model !== model) return false;
      if (ratio !== "all" && prompt.aspectRatio !== ratio) return false;
      if (tag && !prompt.tags.includes(tag)) return false;

      if (!q) return true;

      const haystack = [
        prompt.title,
        prompt.category,
        prompt.model,
        prompt.prompt,
        prompt.negativePrompt,
        ...prompt.tags
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    if (sortBy === "featured") {
      return [...results].sort((a, b) => {
        const left = featuredOrder.has(a.id) ? featuredOrder.get(a.id) : Number.MAX_SAFE_INTEGER;
        const right = featuredOrder.has(b.id) ? featuredOrder.get(b.id) : Number.MAX_SAFE_INTEGER;
        return left - right || b.createdTimestamp - a.createdTimestamp;
      });
    }

    if (sortBy === "popular") {
      return [...results].sort((a, b) => {
        const copyDiff = (copyCounts[b.id] || 0) - (copyCounts[a.id] || 0);
        const trendDiff =
          (trendingOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
          (trendingOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER);
        return copyDiff || trendDiff || b.createdTimestamp - a.createdTimestamp;
      });
    }

    return sortPromptsByDate(results);
  }, [
    prompts,
    searchQuery,
    category,
    model,
    ratio,
    tag,
    sortBy,
    copyCounts,
    trendingOrder,
    featuredOrder
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredPrompts.length / itemsPerPage));
  const normalizedPage = Math.min(currentPage, totalPages);
  const paginatedPrompts = filteredPrompts.slice(
    (normalizedPage - 1) * itemsPerPage,
    normalizedPage * itemsPerPage
  );
  const hasActiveFilters = [...searchParams.keys()].length > 0;

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (!value || value === "all" || value === "latest" || (key === "page" && Number(value) <= 1)) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    if (Object.keys(changes).some((key) => key !== "page")) {
      next.delete("page");
    }

    setSearchParams(next);
  };

  return {
    categories,
    models,
    aspectRatios,
    topTags,
    searchQuery,
    category,
    model,
    ratio,
    tag,
    sortBy,
    currentPage: normalizedPage,
    itemsPerPage,
    totalPages,
    filteredPrompts,
    paginatedPrompts,
    hasActiveFilters,
    setSearchQuery: (value) => updateParams({ q: value }),
    updateFilter: (key, value) => updateParams({ [key]: value }),
    setSortBy: (value) => updateParams({ sort: value }),
    setPage: (value) => updateParams({ page: value }),
    clearFilters: () => setSearchParams(new URLSearchParams())
  };
};
