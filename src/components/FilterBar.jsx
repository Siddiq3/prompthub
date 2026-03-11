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
    <section className="space-y-4">
      <div className="section-shell surface-subtle p-5 sm:p-6">
        <div>
          <p className="section-kicker text-brand-accent">Refine Results</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            Search prompt text, narrow the archive by model or format, and sort the gallery for the cleanest browsing flow.
          </p>
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
      </div>

      <div className="lg:sticky lg:top-20 lg:z-30">
        <div className="rounded-[1.5rem] border border-slate-200/95 bg-[rgba(248,250,252,0.96)] p-3 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(248,250,252,0.88)] sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.65fr)_repeat(4,minmax(0,1fr))_auto]">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              showButton={false}
              placeholder="Search AI photo prompts, tags, models, or categories"
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
            <button
              type="button"
              onClick={onClear}
              disabled={!hasActiveControls}
              className="ui-button-secondary h-12 whitespace-nowrap px-4 py-2.5 text-sm disabled:pointer-events-none disabled:opacity-50"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      <div className="section-shell p-5 sm:p-6">
        <div>
          <p className="ui-meta">Popular tags</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {topTags.map((item) => {
              const active = activeTag === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onTagChange(active ? "" : item.name)}
                  className={`${active ? "ui-pill-accent" : "ui-tag"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25`}
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
