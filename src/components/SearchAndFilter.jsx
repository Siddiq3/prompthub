"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const FILTER_OPTIONS = {
  tool: [
    { value: "midjourney", label: "Midjourney" },
    { value: "dall-e", label: "DALL·E" },
    { value: "flux", label: "Flux" },
    { value: "stable-diffusion", label: "Stable Diffusion" },
    { value: "adobe-firefly", label: "Adobe Firefly" },
  ],
  style: [
    { value: "photorealistic", label: "Photorealistic" },
    { value: "cinematic", label: "Cinematic" },
    { value: "abstract", label: "Abstract" },
    { value: "illustration", label: "Illustration" },
    { value: "portrait", label: "Portrait" },
    { value: "landscape", label: "Landscape" },
    { value: "concept-art", label: "Concept Art" },
  ],
  mood: [
    { value: "dark", label: "Dark" },
    { value: "bright", label: "Bright" },
    { value: "moody", label: "Moody" },
    { value: "minimal", label: "Minimal" },
    { value: "vibrant", label: "Vibrant" },
    { value: "peaceful", label: "Peaceful" },
    { value: "energetic", label: "Energetic" },
  ],
  palette: [
    { value: "monochrome", label: "Monochrome" },
    { value: "warm", label: "Warm" },
    { value: "cool", label: "Cool" },
    { value: "pastel", label: "Pastel" },
    { value: "vibrant", label: "Vibrant" },
    { value: "neutral", label: "Neutral" },
  ],
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "trending", label: "Trending" },
];

function FilterSection({ title, options, selectedValues, onChange, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
        <FaChevronDown
          className={`text-slate-600 dark:text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer hover:bg-white dark:hover:bg-slate-800 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...selectedValues, option.value]);
                  } else {
                    onChange(selectedValues.filter((v) => v !== option.value));
                  }
                }}
                className="w-4 h-4 rounded border-slate-300 accent-blue-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function ActiveFilters({ filters, onRemove, onClear, resultCount, totalCount }) {
  const hasFilters =
    filters.search ||
    filters.tools.length > 0 ||
    filters.styles.length > 0 ||
    filters.moods.length > 0 ||
    filters.palettes.length > 0;

  if (!hasFilters && filters.sort === "newest") {
    return null;
  }

  const renderFilterPills = () => {
    const pills = [];

    if (filters.search) {
      pills.push(
        <div
          key="search"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm"
        >
          <span>Search: {filters.search}</span>
          <button
            onClick={() => onRemove("search", filters.search)}
            className="hover:text-blue-900 dark:hover:text-blue-100"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      );
    }

    filters.tools.forEach((tool) => {
      const label = FILTER_OPTIONS.tool.find((t) => t.value === tool)?.label || tool;
      pills.push(
        <div
          key={`tool-${tool}`}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm"
        >
          <span>{label}</span>
          <button
            onClick={() => onRemove("tool", tool)}
            className="hover:text-purple-900 dark:hover:text-purple-100"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      );
    });

    filters.styles.forEach((style) => {
      const label = FILTER_OPTIONS.style.find((s) => s.value === style)?.label || style;
      pills.push(
        <div
          key={`style-${style}`}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 text-sm"
        >
          <span>{label}</span>
          <button
            onClick={() => onRemove("style", style)}
            className="hover:text-indigo-900 dark:hover:text-indigo-100"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      );
    });

    filters.moods.forEach((mood) => {
      const label = FILTER_OPTIONS.mood.find((m) => m.value === mood)?.label || mood;
      pills.push(
        <div
          key={`mood-${mood}`}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200 text-sm"
        >
          <span>{label}</span>
          <button
            onClick={() => onRemove("mood", mood)}
            className="hover:text-pink-900 dark:hover:text-pink-100"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      );
    });

    filters.palettes.forEach((palette) => {
      const label = FILTER_OPTIONS.palette.find((p) => p.value === palette)?.label || palette;
      pills.push(
        <div
          key={`palette-${palette}`}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 text-sm"
        >
          <span>{label}</span>
          <button
            onClick={() => onRemove("palette", palette)}
            className="hover:text-amber-900 dark:hover:text-amber-100"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      );
    });

    return pills;
  };

  return (
    <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Showing {resultCount} of {totalCount} prompts
        </p>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {renderFilterPills().length > 0 && (
        <div className="flex flex-wrap gap-2">
          {renderFilterPills()}
        </div>
      )}
    </div>
  );
}

export default function SearchAndFilter({
  initialPrompts,
  onFilteredPromptsChange,
  resultCount,
  totalCount,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse URL params
  const [filters, setFilters] = useState({
    search: searchParams.get("q") || "",
    tools: (searchParams.get("tools") || "").split(",").filter(Boolean),
    styles: (searchParams.get("styles") || "").split(",").filter(Boolean),
    moods: (searchParams.get("moods") || "").split(",").filter(Boolean),
    palettes: (searchParams.get("palettes") || "").split(",").filter(Boolean),
    sort: searchParams.get("sort") || "newest",
  });

  const [expandedSections, setExpandedSections] = useState({
    tool: true,
    style: false,
    mood: false,
    palette: false,
  });

  const updateURL = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();

      if (newFilters.search) params.set("q", newFilters.search);
      if (newFilters.tools.length > 0) params.set("tools", newFilters.tools.join(","));
      if (newFilters.styles.length > 0) params.set("styles", newFilters.styles.join(","));
      if (newFilters.moods.length > 0) params.set("moods", newFilters.moods.join(","));
      if (newFilters.palettes.length > 0) params.set("palettes", newFilters.palettes.join(","));
      if (newFilters.sort !== "newest") params.set("sort", newFilters.sort);

      router.push(`?${params.toString()}`);
      setFilters(newFilters);
    },
    [router]
  );

  const handleFilterChange = useCallback(
    (filterType, values) => {
      const newFilters = { ...filters, [filterType]: values };
      updateURL(newFilters);
    },
    [filters, updateURL]
  );

  const handleRemoveFilter = useCallback(
    (type, value) => {
      const newFilters = { ...filters };

      if (type === "search") {
        newFilters.search = "";
      } else if (type === "tool") {
        newFilters.tools = newFilters.tools.filter((t) => t !== value);
      } else if (type === "style") {
        newFilters.styles = newFilters.styles.filter((s) => s !== value);
      } else if (type === "mood") {
        newFilters.moods = newFilters.moods.filter((m) => m !== value);
      } else if (type === "palette") {
        newFilters.palettes = newFilters.palettes.filter((p) => p !== value);
      }

      updateURL(newFilters);
    },
    [filters, updateURL]
  );

  const handleClearAll = useCallback(() => {
    updateURL({
      search: "",
      tools: [],
      styles: [],
      moods: [],
      palettes: [],
      sort: "newest",
    });
  }, [updateURL]);

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div>
        <SearchBar
          value={filters.search}
          onChange={(value) => handleFilterChange("search", value)}
          placeholder="Search prompts by name, style, mood..."
          showButton={false}
        />
      </div>

      {/* Active Filters Summary */}
      <ActiveFilters
        filters={filters}
        onRemove={handleRemoveFilter}
        onClear={handleClearAll}
        resultCount={resultCount}
        totalCount={totalCount}
      />

      {/* Sort Options */}
      <div className="space-y-2">
        <label className="block font-semibold text-slate-900 dark:text-white text-sm">
          Sort by
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange("sort", option.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.sort === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Accordion */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <FilterSection
          title="AI Tool"
          options={FILTER_OPTIONS.tool}
          selectedValues={filters.tools}
          onChange={(values) => handleFilterChange("tools", values)}
          isOpen={expandedSections.tool}
          onToggle={() =>
            setExpandedSections((prev) => ({ ...prev, tool: !prev.tool }))
          }
        />
        <FilterSection
          title="Style"
          options={FILTER_OPTIONS.style}
          selectedValues={filters.styles}
          onChange={(values) => handleFilterChange("styles", values)}
          isOpen={expandedSections.style}
          onToggle={() =>
            setExpandedSections((prev) => ({ ...prev, style: !prev.style }))
          }
        />
        <FilterSection
          title="Mood"
          options={FILTER_OPTIONS.mood}
          selectedValues={filters.moods}
          onChange={(values) => handleFilterChange("moods", values)}
          isOpen={expandedSections.mood}
          onToggle={() =>
            setExpandedSections((prev) => ({ ...prev, mood: !prev.mood }))
          }
        />
        <FilterSection
          title="Color Palette"
          options={FILTER_OPTIONS.palette}
          selectedValues={filters.palettes}
          onChange={(values) => handleFilterChange("palettes", values)}
          isOpen={expandedSections.palette}
          onToggle={() =>
            setExpandedSections((prev) => ({ ...prev, palette: !prev.palette }))
          }
        />
      </div>
    </div>
  );
}
