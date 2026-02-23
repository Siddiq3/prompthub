import { useMemo, useRef, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import PromptCard from "../components/PromptCard";
import MasonryGrid from "../components/MasonryGrid";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";
import AdsensePlaceholder from "../components/AdsensePlaceholder";

const getTimestamp = (value) => {
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
};

function Home() {
  const [showModal, setShowModal] = useState(false);
  const promptsRef = useRef(null);

  const {
    prompts,
    loading,
    error,
    retryFetch,
    searchQuery,
    filters,
    sortBy,
    setSortBy,
    updateFilter,
    clearFilters,
    copyCounts,
    savedPrompts,
    toggleSaved,
    copyPrompt
  } = useAppContext();

  const categories = useMemo(
    () => [...new Set(prompts.map((prompt) => prompt.category).filter(Boolean))].sort(),
    [prompts]
  );

  const models = useMemo(
    () => [...new Set(prompts.map((prompt) => prompt.model).filter(Boolean))].sort(),
    [prompts]
  );

  const aspectRatios = useMemo(
    () => [...new Set(prompts.map((prompt) => prompt.aspectRatio).filter(Boolean))].sort(),
    [prompts]
  );

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const base = prompts.filter((prompt) => {
      if (filters.category !== "all" && prompt.category !== filters.category) return false;
      if (filters.model !== "all" && prompt.model !== filters.model) return false;
      if (filters.aspectRatio !== "all" && prompt.aspectRatio !== filters.aspectRatio) return false;

      if (!q) return true;

      const haystack = [
        prompt.title,
        prompt.category,
        prompt.model,
        prompt.prompt,
        ...(prompt.tags || [])
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    const sorted = [...base].sort((a, b) => {
      if (sortBy === "oldest") return getTimestamp(a.createdAt) - getTimestamp(b.createdAt);
      if (sortBy === "mostCopied") return (copyCounts[b.id] || 0) - (copyCounts[a.id] || 0);
      return getTimestamp(b.createdAt) - getTimestamp(a.createdAt);
    });

    return sorted;
  }, [prompts, filters, searchQuery, sortBy, copyCounts]);

  const mostCopiedTitle = useMemo(() => {
    if (!prompts.length) return "";

    const [bestId] = Object.entries(copyCounts).sort((a, b) => b[1] - a[1])[0] || [];
    if (!bestId) return "No copies yet";

    const found = prompts.find((prompt) => String(prompt.id) === String(bestId));
    return found?.title || "No copies yet";
  }, [copyCounts, prompts]);

  const handleExplore = () => {
    promptsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCreatePrompt = () => setShowModal(true);

  return (
    <>
      <Hero
        onExplore={handleExplore}
        onCreate={handleCreatePrompt}
        totalPrompts={prompts.length}
        categoriesCount={categories.length}
        mostCopiedTitle={mostCopiedTitle}
      />

      <FilterBar
        categories={categories}
        models={models}
        aspectRatios={aspectRatios}
        filters={filters}
        onFilterChange={updateFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClear={clearFilters}
        searchQuery={searchQuery}
      />

      <section ref={promptsRef} className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary-dark sm:text-3xl">
            Prompt Gallery
          </h2>
          <p className="text-sm text-slate-500">{filteredPrompts.length} prompts shown</p>
        </div>

        <AdsensePlaceholder label="Responsive Banner Placeholder (Top of Gallery)" />

        {loading && <LoadingSkeleton count={12} />}

        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

        {!loading && !error && filteredPrompts.length === 0 && (
          <div className="rounded-3xl border border-primary/10 bg-white/84 p-10 text-center shadow-soft">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FaRegFolderOpen className="text-xl" />
            </div>
            <h3 className="mt-4 font-heading text-2xl font-semibold text-primary-dark">No prompts found</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
              Try a different keyword or clear your filters to view more prompt ideas.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && !error && filteredPrompts.length > 0 && (
          <MasonryGrid
            items={filteredPrompts}
            renderItem={(prompt) => (
              <PromptCard
                prompt={prompt}
                copyCount={copyCounts[prompt.id] || 0}
                isSaved={savedPrompts.includes(prompt.id)}
                onCopy={() => copyPrompt(prompt)}
                onToggleSave={toggleSaved}
              />
            )}
          />
        )}
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-primary/12 bg-white p-6 text-primary-dark shadow-lift">
            <h3 className="font-heading text-2xl font-semibold">Create Prompt</h3>
            <p className="mt-2 text-sm text-slate-600">
              Submission flow is coming soon. For now, use the WhatsApp button to request custom prompts.
            </p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
