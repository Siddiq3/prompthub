import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MasonryGrid from "../components/MasonryGrid";
import PageHeader from "../components/PageHeader";
import PromptCard from "../components/PromptCard";
import { useAppContext } from "../context/AppContext";
import { sortPromptsByDate } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema } from "../seo/schema";

function Saved() {
  const { prompts, loading, error, retryFetch, savedPrompts } = useAppContext();
  const items = sortPromptsByDate(prompts.filter((prompt) => savedPrompts.includes(prompt.id)));
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Saved", to: "/saved" }
  ];

  return (
    <>
      <Seo
        title="Saved Prompts"
        description="Your locally saved prompt list on PhotoPromptsHub."
        path="/saved"
        noindex
        schema={[buildBreadcrumbSchema(breadcrumbs)]}
      />
      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Saved Prompts"
          title="Your saved prompts"
          description="Saved prompts are stored locally in your browser. This page is intentionally noindex because it reflects personal state on the current device."
          meta={[`${items.length} saved prompts`, "Stored in local browser storage"]}
        />

        {loading && <LoadingSkeleton count={6} />}
        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}
        {!loading && !error && items.length === 0 ? (
          <ErrorState
            title="No saved prompts yet"
            message="Browse the gallery and save prompts to keep a personal shortlist on this device."
          />
        ) : null}
        {!loading && !error && items.length > 0 ? (
          <MasonryGrid items={items} renderItem={(prompt) => <PromptCard prompt={prompt} />} />
        ) : null}
      </section>
    </>
  );
}

export default Saved;
