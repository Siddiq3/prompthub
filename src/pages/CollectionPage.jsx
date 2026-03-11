import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import PromptCard from "../components/PromptCard";
import MasonryGrid from "../components/MasonryGrid";
import { useAppContext } from "../context/AppContext";
import { getCollectionBySlug } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "../seo/schema";

function CollectionPage() {
  const { slug } = useParams();
  const { prompts, loading, error, retryFetch } = useAppContext();
  const collection = getCollectionBySlug(prompts, slug);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const items = collection?.prompts || [];
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const breadcrumbs = collection
    ? [
        { label: "Home", to: "/" },
        { label: "Collections", to: "/collections" },
        { label: collection.title, to: collection.href }
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

  if (!collection) {
    return (
      <ErrorState
        title="Collection not found"
        message="The collection you requested is not available in the current prompt library."
      />
    );
  }

  return (
    <>
      <Seo
        title={collection.title}
        description={collection.description}
        path={collection.href}
        image={collection.prompts[0]?.previewImage}
        schema={[
          buildWebPageSchema({
            title: collection.title,
            description: collection.description,
            path: collection.href
          }),
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(collection.prompts.slice(0, 12))
        ]}
      />
      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Collection Page"
          title={collection.title}
          description={collection.intro}
          meta={[`${collection.count} prompts`, "Curated landing page"]}
          actions={
            <Link
              to="/collections"
              className="rounded-full border border-brand-ink px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-ink hover:text-white"
            >
              All collections
            </Link>
          }
        />

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

export default CollectionPage;
