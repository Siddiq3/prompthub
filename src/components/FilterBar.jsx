import SearchBar from "./SearchBar";

const selectClass =
  "h-11 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus-visible:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/30";

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

  return (
    <section className="sticky top-16 z-30 rounded-[2rem] border border-slate-200 bg-white/92 p-4 shadow-soft backdrop-blur">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
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
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {topTags.map((item) => {
          const active = activeTag === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onTagChange(active ? "" : item.name)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 ${
                active
                  ? "bg-brand-ink text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-accent hover:text-brand-ink"
              }`}
            >
              {item.name} <span className="opacity-70">({item.count})</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={onClear}
          className="ml-auto rounded-full border border-brand-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-ink transition hover:bg-brand-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
        >
          Clear all
        </button>
      </div>

      {pills.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {pills.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-500"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default FilterBar;
