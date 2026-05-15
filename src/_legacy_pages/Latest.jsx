import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MasonryGrid from "../components/MasonryGrid";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import PromptCard from "../components/PromptCard";
import { useAppContext } from "../context/AppContext";
import { getLatestPrompts } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "../seo/schema";

function Latest() {
  const { prompts, loading, error, retryFetch } = useAppContext();
  const items = getLatestPrompts(prompts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Latest", to: "/latest" }
  ];

  return (
    <>
      <Seo
        title="Latest AI Photo Prompts"
        description="Browse the newest prompts added to PhotoPromptsHub, sorted by date so the latest work appears first."
        path="/latest"
        image={items[0]?.previewImage}
        schema={[
          buildWebPageSchema({
            title: "Latest AI Photo Prompts",
            description:
              "Browse the newest prompts added to PhotoPromptsHub, sorted by date so the latest work appears first.",
            path: "/latest"
          }),
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(items.slice(0, 12))
        ]}
      />

      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Latest Prompts"
          title="Recently added photo prompts"
          description="Browse the newest prompt pages in the library to see what was added most recently across portrait, fashion, wedding, cinematic, sports, and more."
          meta={[`${items.length} prompts`, "Sorted by newest dataset date"]}
        />

        {loading && <LoadingSkeleton count={8} />}
        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}
        {!loading && !error ? (
          <>
            <MasonryGrid items={paginatedItems} renderItem={(prompt) => <PromptCard prompt={prompt} />} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={items.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="latest prompts"
            />
          </>
        ) : null}
      </section>
    </>
  );
}

export default Latest;
