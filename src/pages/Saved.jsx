import { Link } from "react-router-dom";
import { FaBookmark, FaImages } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import MasonryGrid from "../components/MasonryGrid";
import PromptCard from "../components/PromptCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";

function Saved() {
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

  const savedItems = prompts.filter((prompt) => savedPrompts.includes(prompt.id));

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-primary/10 bg-white/84 p-6 shadow-soft backdrop-blur">
        <h1 className="flex items-center gap-2 font-heading text-4xl font-bold tracking-tight text-primary-dark">
          <FaBookmark className="text-primary" />
          Saved Prompts
        </h1>
        <p className="mt-2 text-sm text-slate-600">Your bookmarked prompts are stored in localStorage on this device.</p>
      </header>

      {loading && <LoadingSkeleton count={8} />}

      {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

      {!loading && !error && savedItems.length === 0 && (
        <div className="rounded-3xl border border-primary/10 bg-white/84 p-10 text-center shadow-soft">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FaImages className="text-xl" />
          </div>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-primary-dark">No saved prompts yet</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
            Browse the gallery and click save on any card to keep it here for quick access.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            Explore prompts
          </Link>
        </div>
      )}

      {!loading && !error && savedItems.length > 0 && (
        <MasonryGrid
          items={savedItems}
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
      )}
    </section>
  );
}

export default Saved;
