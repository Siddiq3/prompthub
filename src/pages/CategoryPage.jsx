import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import PromptCard from "../components/PromptCard";
import MasonryGrid from "../components/MasonryGrid";
import { useAppContext } from "../context/AppContext";
import { getCategories, getCategoryBySlug, getCollections } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "../seo/schema";

function CategoryPage() {
  const { slug } = useParams();
  const { prompts, loading, error, retryFetch } = useAppContext();
  const category = getCategoryBySlug(prompts, slug);
  const relatedCollections = useMemo(
    () =>
      getCollections(prompts)
        .filter((collection) => collection.prompts.some((prompt) => prompt.category === category?.name))
        .slice(0, 4),
    [prompts, category]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const items = category?.prompts || [];
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const breadcrumbs = category
    ? [
        { label: "Home", to: "/" },
        { label: "Categories", to: "/categories" },
        { label: category.name, to: category.href }
      ]
    : [];

  useEffect(() => {
    setCurrentPage(1);
  }, [slug]);

  if (loading) {
    return <LoadingSkeleton count={8} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={retryFetch} />;
  }

  if (!category) {
    return (
      <ErrorState
        title="Category not found"
        message="The category page you requested does not exist in the current prompt dataset."
      />
    );
  }

  return (
    <>
      <Seo
        title={`${category.name} AI Photo Prompts`}
        description={category.description}
        path={category.href}
        image={category.latestPrompt?.previewImage}
        schema={[
          buildWebPageSchema({
            title: `${category.name} AI Photo Prompts`,
            description: category.description,
            path: category.href
          }),
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(category.prompts.slice(0, 12))
        ]}
      />
      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Category Page"
          title={`${category.name} AI photo prompts`}
          description={category.description}
          meta={[`${category.count} prompts`, `Latest: ${category.latestPrompt?.formattedDate || "Available"}`]}
        />

        {relatedCollections.length ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-soft">
            <h2 className="font-heading text-2xl font-semibold text-brand-ink">Related collections</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedCollections.map((collection) => (
                <Link
                  key={collection.slug}
                  to={collection.href}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-accent hover:text-brand-accent"
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <MasonryGrid items={paginatedItems} renderItem={(prompt, index) => <PromptCard prompt={prompt} priority={index < 2} />} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={items.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          itemLabel="prompts"
        />
      </section>
    </>
  );
}

export default CategoryPage;
