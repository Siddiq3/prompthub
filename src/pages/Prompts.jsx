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
import { getTagLanding } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "../seo/schema";

function Prompts() {
  const { prompts, loading, error, retryFetch, copyCounts } = useAppContext();
  const {
    categories,
    models,
    aspectRatios,
    filterTags,
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

  const isTagLanding =
    Boolean(tag) &&
    !searchQuery.trim() &&
    category === "all" &&
    model === "all" &&
    ratio === "all" &&
    sortBy === "latest";
  const tagLanding = isTagLanding ? getTagLanding(prompts, tag) : null;
  const isIndexableTagLanding = Boolean(tagLanding) && currentPage === 1;
  const breadcrumbs = tagLanding
    ? [
        { label: "Home", to: "/" },
        { label: "Prompts", to: "/prompts" },
        { label: tagLanding.label, to: tagLanding.href }
      ]
    : [
        { label: "Home", to: "/" },
        { label: "Prompts", to: "/prompts" }
      ];
  const pageTitle = tagLanding ? `${tagLanding.label} AI Photo Prompts` : "AI Photo Prompts Gallery";
  const pageDescription = tagLanding
    ? `${tagLanding.description} Browse the latest matching prompts, then jump to related categories for wider discovery.`
    : "Browse AI photo prompts by category, model, aspect ratio, and tag. Discover the latest photo prompts for Midjourney, DALL·E, Flux, and Stable Diffusion.";
  const pagePath = tagLanding ? tagLanding.href : "/prompts";
  const schema = [
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: pagePath
    }),
    buildBreadcrumbSchema(breadcrumbs),
    ...(!hasActiveFilters || isIndexableTagLanding ? [buildItemListSchema(filteredPrompts.slice(0, 12))] : [])
  ];

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        path={pagePath}
        noindex={hasActiveFilters && !isIndexableTagLanding}
        schema={schema}
      />

      <section className="space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow={tagLanding ? "Tag Page" : "Prompt Gallery"}
          title={tagLanding ? `${tagLanding.label} AI photo prompts` : "Browse prompts with guided filters"}
          description={
            tagLanding
              ? tagLanding.intro
              : "Pick a primary category first, then narrow the archive by model, aspect ratio, and secondary style tags."
          }
          meta={
            tagLanding
              ? [`${tagLanding.count} prompts`, `${tagLanding.relatedCategories.length} related categories`]
              : [`${prompts.length} total prompts`, `${filteredPrompts.length} matching prompts`]
          }
          actions={[
            <Link key="latest" to={tagLanding ? "/prompts" : "/latest"} className="ui-button-secondary">
              {tagLanding ? "Full archive" : "Latest prompts"}
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
          filterTags={filterTags}
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

        {tagLanding ? (
          <section className="section-shell surface-subtle p-5 sm:p-6">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
              <div>
                <p className="section-kicker text-brand-accent">Tag Intro</p>
                <h2 className="mt-3 font-heading text-[1.7rem] font-semibold tracking-tight text-brand-ink sm:text-[2rem]">
                  How to browse the {tagLanding.label.toLowerCase()} tag
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Start here when {tagLanding.label.toLowerCase()} is the secondary look, festival, mood, or styling cue you care about. If you need a broader path, jump into one of the related categories below and keep the tag as a refinement.
                </p>
              </div>

              <div className="ui-card p-5">
                <p className="ui-meta">Related categories</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tagLanding.relatedCategories.map((relatedCategory) => (
                    <Link
                      key={relatedCategory.name}
                      to={relatedCategory.href}
                      className="ui-tag"
                    >
                      {relatedCategory.name}
                      <span className="opacity-70">({relatedCategory.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)]">
          <div className="ui-panel p-5 sm:p-6">
            <p className="section-kicker text-brand-accent">Archive View</p>
            <h2 className="mt-3 font-heading text-[1.7rem] font-semibold tracking-tight text-brand-ink sm:text-[2rem]">
              {filteredPrompts.length} prompts ready to browse
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The archive keeps category as the main browse path while tags work as secondary refinements. Open any card for the full prompt, copy actions, and related prompts.
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
              renderItem={(prompt) => <PromptCard prompt={prompt} />}
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
