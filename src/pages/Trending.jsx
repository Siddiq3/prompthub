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
import { buildBreadcrumbSchema, buildItemListSchema } from "../seo/schema";

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
        description="Browse trending AI photo prompts featured by PhotoPromptsHub for high-interest categories, standout visuals, and curated image generation ideas."
        path="/trending"
        schema={[buildBreadcrumbSchema(breadcrumbs), buildItemListSchema(items.slice(0, 12))]}
      />

      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Trending Prompts"
          title="Trending prompt ideas and featured discoveries"
          description="Trending prompts combine curated featured entries with fresh additions to surface high-interest content for creators and SEO landing pages."
          meta={[`${items.length} prompts`, "Featured + recent mix"]}
        />

        {loading && <LoadingSkeleton count={8} />}
        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}
        {!loading && !error ? (
          <>
            <MasonryGrid items={paginatedItems} renderItem={(prompt, index) => <PromptCard prompt={prompt} priority={index < 2} />} />
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
