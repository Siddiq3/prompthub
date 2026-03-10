import { Link } from "react-router-dom";
import AdSlot from "../components/AdSlot";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import FilterBar from "../components/FilterBar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MasonryGrid from "../components/MasonryGrid";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import PromptCard from "../components/PromptCard";
import { useAppContext } from "../context/AppContext";
import { usePromptListing } from "../hooks/usePromptListing";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema } from "../seo/schema";

function Prompts() {
  const { prompts, loading, error, retryFetch, copyCounts } = useAppContext();
  const {
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
    currentPage,
    itemsPerPage,
    totalPages,
    filteredPrompts,
    paginatedPrompts,
    hasActiveFilters,
    setSearchQuery,
    updateFilter,
    setSortBy,
    setPage,
    clearFilters
  } = usePromptListing(prompts, copyCounts);

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Prompts", to: "/prompts" }
  ];

  return (
    <>
      <Seo
        title="AI Photo Prompts Gallery"
        description="Browse AI photo prompts by category, model, aspect ratio, and tag. Discover the latest photo prompts for Midjourney, DALL·E, Flux, and Stable Diffusion."
        path="/prompts"
        noindex={hasActiveFilters}
        schema={[
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(filteredPrompts.slice(0, 12))
        ]}
      />

      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Prompt Gallery"
          title="Search and filter AI photo prompts"
          description="Use the main discovery page to search prompt text, refine by category or model, browse style tags, and sort by latest, popular, or featured results."
          meta={[`${prompts.length} total prompts`, `${filteredPrompts.length} matching prompts`]}
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          models={models}
          aspectRatios={aspectRatios}
          activeCategory={category}
          activeModel={model}
          activeRatio={ratio}
          activeTag={tag}
          topTags={topTags}
          sortBy={sortBy}
          onFilterChange={updateFilter}
          onTagChange={(value) => updateFilter("tag", value)}
          onSortChange={setSortBy}
          onClear={clearFilters}
        />

        <AdSlot label="Responsive banner placeholder below discovery filters" variant="banner" />

        {loading && <LoadingSkeleton count={itemsPerPage} />}

        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

        {!loading && !error && filteredPrompts.length === 0 ? (
          <section className="rounded-[2rem] border border-slate-200 bg-white/92 p-8 shadow-soft">
            <h2 className="font-heading text-2xl font-semibold text-brand-ink">No prompts found</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Try broader keywords, remove one or more filters, or return to the full prompt gallery to continue browsing.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
            >
              Clear filters
            </button>
          </section>
        ) : null}

        {!loading && !error && paginatedPrompts.length > 0 ? (
          <>
            <MasonryGrid items={paginatedPrompts} renderItem={(prompt, index) => <PromptCard prompt={prompt} priority={index < 2} />} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredPrompts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setPage}
              itemLabel="prompts"
            />
            <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-brand-ink">
                Explore categories and collections
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                For more crawlable prompt discovery paths, browse the category directory or jump into curated collections grouped by style and model.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/categories"
                  className="rounded-full border border-brand-ink px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-ink hover:text-white"
                >
                  View categories
                </Link>
                <Link
                  to="/collections"
                  className="rounded-full border border-brand-ink px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-ink hover:text-white"
                >
                  View collections
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}

export default Prompts;
