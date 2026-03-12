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
          <h1 className="hero-fluid-title mt-4 font-heading text-brand-ink sm:text-balance">
            Find photo prompts without digging through a cluttered feed
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-700 sm:text-[1.08rem]">
            Start with a category, narrow things down only when you need to, and open full prompt pages when you are ready to copy, save, or keep browsing.
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
              <li>1. Pick the category that best matches the subject or mood you want.</li>
              <li>2. Use search, model, aspect ratio, or tags to narrow the results if needed.</li>
              <li>3. Open any prompt page for the full text, copy tools, and more ideas in the same direction.</li>
            </ol>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="ui-panel p-4">
              <p className="ui-meta">Prompts</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{totalPrompts}</p>
              <p className="mt-2 text-sm text-slate-600">Prompt pages ready to browse</p>
            </div>
            <div className="ui-panel p-4">
              <p className="ui-meta">Categories</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{categoriesCount}</p>
              <p className="mt-2 text-sm text-slate-600">Clear starting points</p>
            </div>
            <div className="ui-panel p-4">
              <p className="ui-meta">Models</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{modelsCount}</p>
              <p className="mt-2 text-sm text-slate-600">Model collections available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
