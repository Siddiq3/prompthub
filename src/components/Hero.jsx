import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import SearchBar from "./SearchBar";

function Hero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalPrompts,
  categoriesCount,
  modelsCount,
  popularCategories = []
}) {
  return (
    <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10 xl:p-12">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] xl:items-start">
        <div className="max-w-3xl">
          <span className="section-kicker text-brand-accent">AI Prompt Discovery</span>
          <h1 className="hero-fluid-title text-balance mt-4 font-heading text-brand-ink">
            Browse AI photo prompts without a cluttered feed
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-700 sm:text-[1.08rem]">
            Start with a clear category, refine with search or tags only when you need them, and move into copy-ready prompt pages with less guesswork.
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
              buttonLabel="Search prompts"
              placeholder="Search portrait, wedding, editorial, studio, Flux..."
            />
          </div>

          {popularCategories.length ? (
            <div className="mt-5">
              <p className="ui-meta">Popular categories</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {popularCategories.slice(0, 5).map((category) => (
                  <Link key={category.slug} to={category.href} className="ui-tag text-sm">
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/categories" className="ui-button-primary">
              Browse categories
              <FaArrowRight className="text-xs" />
            </Link>
            <Link to="/prompts" className="ui-button-secondary">
              Open prompt archive
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="ui-card p-5 sm:p-6">
            <p className="section-kicker text-brand-accent">How To Browse</p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li>1. Choose a category for the main subject or theme.</li>
              <li>2. Use search, model, aspect ratio, or tag filters to refine the look.</li>
              <li>3. Open a prompt page when you want the full prompt, copy actions, and related ideas.</li>
            </ol>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="ui-panel p-4">
              <p className="ui-meta">Prompts</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{totalPrompts}</p>
              <p className="mt-2 text-sm text-slate-600">Indexed prompt pages</p>
            </div>
            <div className="ui-panel p-4">
              <p className="ui-meta">Categories</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{categoriesCount}</p>
              <p className="mt-2 text-sm text-slate-600">Primary browse paths</p>
            </div>
            <div className="ui-panel p-4">
              <p className="ui-meta">Models</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{modelsCount}</p>
              <p className="mt-2 text-sm text-slate-600">Current tool coverage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
