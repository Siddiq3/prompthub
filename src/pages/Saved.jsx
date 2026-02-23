import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaImages } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import MasonryGrid from "../components/MasonryGrid";
import PromptCard from "../components/PromptCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";
import Pagination from "../components/Pagination";

function Saved() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const savedRef = useRef(null);
  const {
    prompts,
    loading,
    error,
    retryFetch,
    copyCounts,
    savedPrompts,
    toggleSaved,
    copyPrompt
  } = useAppContext();

  const savedItems = useMemo(
    () => prompts.filter((prompt) => savedPrompts.includes(prompt.id)),
    [prompts, savedPrompts]
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(savedItems.length / itemsPerPage)),
    [savedItems.length, itemsPerPage]
  );

  const paginatedSavedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return savedItems.slice(start, start + itemsPerPage);
  }, [savedItems, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(next);
    savedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  return (
    <section ref={savedRef} className="space-y-6">
      <header className="rounded-xl border border-primary/12 bg-white/90 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
        <h1 className="flex items-center gap-2 font-heading text-4xl font-bold tracking-tight text-primary-dark">
          <FaBookmark className="text-primary" />
          Saved Prompts
        </h1>
        <p className="mt-2 text-sm text-slate-600">Your bookmarked prompts are stored in localStorage on this device.</p>
        {savedItems.length > 0 && (
          <p className="mt-2 text-sm text-slate-500">
            {savedItems.length} saved prompts • Page {currentPage} of {totalPages}
          </p>
        )}
      </header>

      {loading && <LoadingSkeleton count={itemsPerPage} />}

      {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

      {!loading && !error && savedItems.length === 0 && (
        <div className="rounded-xl border border-primary/12 bg-white/90 p-10 text-center shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FaImages className="text-xl" />
          </div>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-primary-dark">No saved prompts yet</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
            Browse the gallery and click save on any card to keep it here for quick access.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/60"
          >
            Explore prompts
          </Link>
        </div>
      )}

      {!loading && !error && savedItems.length > 0 && (
        <>
          <MasonryGrid
            items={paginatedSavedItems}
            renderItem={(item) => (
              <PromptCard
                prompt={item}
                copyCount={copyCounts[item.id] || 0}
                isSaved={savedPrompts.includes(item.id)}
                onCopy={() => copyPrompt(item)}
                onToggleSave={toggleSaved}
              />
            )}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={savedItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
            pageSizeOptions={[8, 16, 24]}
            itemLabel="saved prompts"
          />
        </>
      )}
    </section>
  );
}

export default Saved;
