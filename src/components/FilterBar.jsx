import { FaBroom, FaSort } from "react-icons/fa6";

const selectBaseClass =
  "rounded-lg border border-brand-border bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition duration-300 focus-visible:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/40 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200";

function FilterBar({
  categories,
  models,
  aspectRatios,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  onClear,
  searchQuery
}) {
  const activePills = [
    filters.category !== "all" ? `Category: ${filters.category}` : null,
    filters.model !== "all" ? `Model: ${filters.model}` : null,
    filters.aspectRatio !== "all" ? `Ratio: ${filters.aspectRatio}` : null,
    searchQuery ? `Search: ${searchQuery}` : null
  ].filter(Boolean);

  return (
    <section className="sticky top-16 z-40 mt-4 rounded-xl border border-slate-200/80 bg-white/90 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
      <div className="overflow-x-auto px-3 py-3 sm:px-4">
        <div className="flex min-w-max items-center gap-2">
          <select
            className={selectBaseClass}
            value={filters.category}
            onChange={(event) => onFilterChange("category", event.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className={selectBaseClass}
            value={filters.model}
            onChange={(event) => onFilterChange("model", event.target.value)}
            aria-label="Filter by model"
          >
            <option value="all">All Models</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>

          <select
            className={selectBaseClass}
            value={filters.aspectRatio}
            onChange={(event) => onFilterChange("aspectRatio", event.target.value)}
            aria-label="Filter by aspect ratio"
          >
            <option value="all">All Aspect Ratios</option>
            {aspectRatios.map((ratio) => (
              <option key={ratio} value={ratio}>
                {ratio}
              </option>
            ))}
          </select>

          <label className="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-white px-4 py-2 text-sm font-medium text-slate-700 transition duration-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200">
            <FaSort className="text-brand-secondary dark:text-brand-accent" />
            <span className="sr-only">Sort prompts</span>
            <select
              className="bg-transparent outline-none"
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              aria-label="Sort prompts"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="mostCopied">Most Copied</option>
            </select>
          </label>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-indigo-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/50 dark:border-white/15 dark:bg-white/[0.03] dark:text-indigo-200 dark:hover:bg-white/[0.08]"
          >
            <FaBroom />
            Clear filters
          </button>
        </div>
      </div>

      {activePills.length > 0 && (
        <div className="flex flex-wrap gap-2 px-3 pb-3 pt-2 sm:px-4">
          {activePills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-brand-accent/35 bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-secondary dark:border-brand-accent/50 dark:bg-brand-accent/20 dark:text-brand-accent"
            >
              {pill}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

export default FilterBar;
