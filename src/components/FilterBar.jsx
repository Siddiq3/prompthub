import SearchBar from "./SearchBar";

const selectClass = "ui-select w-full";

function FilterBar({
  searchQuery,
  onSearchChange,
  categories,
  models,
  aspectRatios,
  filterTags,
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
  const resolvedFilterTags =
    activeTag && !filterTags.some((item) => item.name === activeTag)
      ? [{ name: activeTag, label: activeTag.replace(/-/g, " "), count: 0, slug: activeTag }, ...filterTags]
      : filterTags;
  const activeTagLabel = resolvedFilterTags.find((item) => item.name === activeTag)?.label || activeTag;
  const pills = [
    searchQuery ? `Search: ${searchQuery}` : null,
    activeCategory !== "all" ? `Category: ${activeCategory}` : null,
    activeModel !== "all" ? `Model: ${activeModel}` : null,
    activeRatio !== "all" ? `Ratio: ${activeRatio}` : null,
    activeTag ? `Tag: ${activeTagLabel}` : null
  ].filter(Boolean);
  const hasActiveControls = pills.length > 0 || sortBy !== "latest";

  return (
    <section>
      <div className="section-shell surface-subtle p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker text-brand-accent">Guided Filters</p>
            <h2 className="mt-3 font-heading text-[1.55rem] font-semibold tracking-tight text-brand-ink sm:text-[1.8rem]">
              Start with category, then refine the look
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Categories define the main theme. Tags are secondary modifiers such as editorial, candid, rain, or studio.
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

        <div className="mt-5">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            showButton={false}
            placeholder="Search prompts, themes, styles, or models"
            className="!bg-white"
          />
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

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="ui-card p-4">
            <p className="ui-meta">Category</p>
            <p className="mt-2 text-xs leading-6 text-slate-600">Choose the primary subject or theme.</p>
            <select
              className={`${selectClass} mt-3`}
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
          </label>

          <label className="ui-card p-4">
            <p className="ui-meta">Model</p>
            <p className="mt-2 text-xs leading-6 text-slate-600">Limit the prompt list by model label.</p>
            <select
              className={`${selectClass} mt-3`}
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
          </label>

          <label className="ui-card p-4">
            <p className="ui-meta">Aspect ratio</p>
            <p className="mt-2 text-xs leading-6 text-slate-600">Refine the composition format.</p>
            <select
              className={`${selectClass} mt-3`}
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
          </label>

          <label className="ui-card p-4">
            <p className="ui-meta">Tag</p>
            <p className="mt-2 text-xs leading-6 text-slate-600">Use a secondary style or mood tag.</p>
            <select
              className={`${selectClass} mt-3`}
              value={activeTag}
              onChange={(event) => onTagChange(event.target.value)}
              aria-label="Filter prompts by tag"
            >
              <option value="">All tags</option>
              {resolvedFilterTags.map((item) => (
                <option key={item.slug} value={item.name}>
                  {item.label} ({item.count})
                </option>
              ))}
            </select>
          </label>

          <label className="ui-card p-4">
            <p className="ui-meta">Sort</p>
            <p className="mt-2 text-xs leading-6 text-slate-600">Switch between fresh, popular, and featured results.</p>
            <select
              className={`${selectClass} mt-3`}
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              aria-label="Sort prompts"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="featured">Featured</option>
            </select>
          </label>
        </div>

        <div className="soft-divider mt-5" />

        <div className="mt-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="ui-meta">Suggested style tags</p>
              <p className="text-xs font-medium text-slate-600">Quick secondary refinements that work across multiple categories.</p>
            </div>
          </div>
          <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
            {topTags.map((item) => {
              const active = activeTag === item.name;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => onTagChange(active ? "" : item.name)}
                  className={`${active ? "ui-pill-accent" : "ui-tag"} shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25`}
                >
                  {item.label}
                  <span className="text-slate-600">({item.count})</span>
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
