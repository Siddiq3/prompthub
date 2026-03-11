import SearchBar from "./SearchBar";

const selectClass = "ui-select w-full";

function FilterBar({
  searchQuery,
  onSearchChange,
  categories,
  models,
  aspectRatios,
  activeCategory,
  activeModel,
  activeRatio,
  activeTag,
  topTags,
  sortBy,
  onFilterChange,
  onTagChange,
  onSortChange,
  onClear
}) {
  const pills = [
    searchQuery ? `Search: ${searchQuery}` : null,
    activeCategory !== "all" ? `Category: ${activeCategory}` : null,
    activeModel !== "all" ? `Model: ${activeModel}` : null,
    activeRatio !== "all" ? `Ratio: ${activeRatio}` : null,
    activeTag ? `Tag: ${activeTag}` : null
  ].filter(Boolean);
  const hasActiveControls = pills.length > 0 || sortBy !== "latest";

  return (
    <section className="lg:sticky lg:top-20 lg:z-30">
      <div className="section-shell surface-subtle p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker text-brand-accent">Refine Results</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Search, narrow, and sort the archive without leaving the page.
            </p>
          </div>
          <button
            type="button"
            onClick={onClear}
            disabled={!hasActiveControls}
            className="ui-button-secondary h-10 shrink-0 whitespace-nowrap px-4 text-sm disabled:pointer-events-none disabled:opacity-50"
          >
            Clear all
          </button>
        </div>

        {pills.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {pills.map((item) => (
              <span key={item} className="ui-pill-accent">
                {item}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.65fr)_repeat(4,minmax(0,1fr))]">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            showButton={false}
            placeholder="Search AI photo prompts, tags, models, or categories"
            className="!bg-white"
          />
          <select
            className={selectClass}
            value={activeCategory}
            onChange={(event) => onFilterChange("category", event.target.value)}
            aria-label="Filter prompts by category"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className={selectClass}
            value={activeModel}
            onChange={(event) => onFilterChange("model", event.target.value)}
            aria-label="Filter prompts by model"
          >
            <option value="all">All models</option>
            {models.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className={selectClass}
            value={activeRatio}
            onChange={(event) => onFilterChange("ratio", event.target.value)}
            aria-label="Filter prompts by aspect ratio"
          >
            <option value="all">All ratios</option>
            {aspectRatios.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className={selectClass}
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Sort prompts"
          >
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
            <option value="featured">Featured</option>
          </select>
        </div>

        <div className="soft-divider mt-4" />

        <div className="mt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="ui-meta">Popular tags</p>
            <p className="text-xs font-medium text-slate-500">Tap a tag for a faster filter</p>
          </div>
          <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
            {topTags.map((item) => {
              const active = activeTag === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onTagChange(active ? "" : item.name)}
                  className={`${active ? "ui-pill-accent" : "ui-tag"} shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25`}
                >
                  {item.name}
                  <span className="opacity-70">({item.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
