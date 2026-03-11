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
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "../seo/schema";

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
  const schema = [
    buildWebPageSchema({
      title: "AI Photo Prompts Gallery",
      description:
        "Browse the main AI photo prompt archive by category, model, aspect ratio, and tag on PhotoPromptsHub.",
      path: "/prompts"
    }),
    buildBreadcrumbSchema(breadcrumbs),
    ...(hasActiveFilters ? [] : [buildItemListSchema(filteredPrompts.slice(0, 12))])
  ];

  return (
    <>
      <Seo
        title="AI Photo Prompts Gallery"
        description="Browse AI photo prompts by category, model, aspect ratio, and tag. Discover the latest photo prompts for Midjourney, DALL·E, Flux, and Stable Diffusion."
        path="/prompts"
        noindex={hasActiveFilters}
        schema={schema}
      />

      <section className="space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Prompt Gallery"
          title="Search and filter AI photo prompts"
          description="Use the main discovery page to search prompt text, refine by category or model, browse style tags, and sort by latest, popular, or featured results."
          meta={[`${prompts.length} total prompts`, `${filteredPrompts.length} matching prompts`]}
          actions={[
            <Link key="latest" to="/latest" className="ui-button-secondary">
              Latest prompts
            </Link>,
            <Link key="categories" to="/categories" className="ui-button-secondary">
              Browse categories
            </Link>
          ]}
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

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)]">
          <div className="ui-panel p-5 sm:p-6">
            <p className="section-kicker text-brand-accent">Archive View</p>
            <h2 className="mt-3 font-heading text-[1.7rem] font-semibold tracking-tight text-brand-ink sm:text-[2rem]">
              {filteredPrompts.length} prompts ready to browse
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The archive is built for direct search, quick filtering, and crawlable discovery. Open any card for full prompt text, copy actions, metadata, and related prompts.
            </p>
          </div>
          <AdSlot label="Responsive banner placeholder below discovery filters" variant="banner" className="h-full" />
        </section>

        {loading && <LoadingSkeleton count={itemsPerPage} />}

        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

        {!loading && !error && filteredPrompts.length === 0 ? (
          <section className="section-shell p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-ink">No prompts found</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Try broader keywords, remove one or more filters, or return to the full prompt gallery to continue browsing.
            </p>
            <button type="button" onClick={clearFilters} className="ui-button-primary mt-5">
              Clear filters
            </button>
          </section>
        ) : null}

        {!loading && !error && paginatedPrompts.length > 0 ? (
          <>
            <MasonryGrid
              items={paginatedPrompts}
              renderItem={(prompt, index) => <PromptCard prompt={prompt} priority={index < 2} />}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredPrompts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setPage}
              itemLabel="prompts"
            />
            <div className="section-shell surface-subtle p-6 sm:p-8">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-ink">
                Explore categories and collections
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                For more crawlable prompt discovery paths, browse the category directory or jump into curated collections grouped by style and model.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/categories" className="ui-button-primary">
                  View categories
                </Link>
                <Link to="/collections" className="ui-button-secondary">
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
