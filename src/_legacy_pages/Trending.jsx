import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MasonryGrid from "../components/MasonryGrid";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import PromptCard from "../components/PromptCard";
import { useAppContext } from "../context/AppContext";
import { getTrendingPrompts } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "../seo/schema";

function Trending() {
  const { prompts, loading, error, retryFetch } = useAppContext();
  const items = getTrendingPrompts(prompts, prompts.length);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Trending", to: "/trending" }
  ];

  return (
    <>
      <Seo
        title="Trending AI Photo Prompts"
        description="Browse the prompt pages currently surfaced as standout picks on PhotoPromptsHub."
        path="/trending"
        image={items[0]?.previewImage}
        schema={[
          buildWebPageSchema({
            title: "Trending AI Photo Prompts",
            description:
              "Browse the prompt pages currently surfaced as standout picks on PhotoPromptsHub.",
            path: "/trending"
          }),
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(items.slice(0, 12))
        ]}
      />

      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Trending Prompts"
          title="Trending prompts and standout picks"
          description="This page brings together the prompts currently surfaced as stronger recent picks, so you can start with a shorter, more selective list."
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
              itemLabel="trending prompts"
            />
          </>
        ) : null}
      </section>
    </>
  );
}

export default Trending;
