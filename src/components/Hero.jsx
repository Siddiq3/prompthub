import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { SUPPORT_EMAIL } from "../config";
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
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:items-start">
        <div className="max-w-3xl">
          <span className="section-kicker text-brand-accent">
            AI Prompt Discovery
          </span>
          <h1 className="hero-fluid-title text-balance mt-4 font-heading text-brand-ink">
            Discover AI Photo Prompts That Create Stunning Images
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-600 sm:text-[1.08rem]">
            Explore curated prompts for Midjourney, DALL·E, Stable Diffusion, Flux, and more. Search the archive, browse categories, and open copy-ready prompt pages with preview images, tags, and related ideas.
          </p>
          <div className="mt-8 max-w-2xl">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
              buttonLabel="Search prompts"
              placeholder="Search portrait, cinematic, wedding, product, Flux, Midjourney..."
            />
          </div>
          {popularCategories.length ? (
            <div className="mt-5">
              <p className="ui-meta">
                Popular starting points
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {popularCategories.slice(0, 5).map((category) => (
                  <Link
                    key={category.slug}
                    to={category.href}
                    className="ui-tag text-sm"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/prompts"
              className="ui-button-primary"
            >
              Browse all prompts
              <FaArrowRight className="text-xs" />
            </Link>
            <Link
              to="/trending"
              className="ui-button-secondary"
            >
              Explore trending prompts
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["Free to browse", "Copy-ready prompts", "Latest updates", "No signup required"].map((item) => (
              <span key={item} className="ui-pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="ui-card p-5 sm:p-6">
            <p className="section-kicker text-brand-accent">Start Here</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              First-time visitors usually get the fastest results by starting with the main archive, then moving into latest, trending, or category pages for narrower discovery.
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link
                className="ui-list-link"
                to="/prompts"
              >
                Prompt archive
              </Link>
              <Link
                className="ui-list-link"
                to="/latest"
              >
                Latest prompts
              </Link>
              <Link
                className="ui-list-link"
                to="/trending"
              >
                Trending prompts
              </Link>
              <Link
                className="ui-list-link"
                to="/categories"
              >
                Browse categories
              </Link>
              <Link
                className="ui-list-link"
                to="/collections"
              >
                Explore collections
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-3">
            <div className="ui-panel p-4">
              <p className="ui-meta">Total prompts</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{totalPrompts}</p>
              <p className="mt-2 text-sm text-slate-500">Curated and crawlable</p>
            </div>
            <div className="ui-panel p-4">
              <p className="ui-meta">Categories</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{categoriesCount}</p>
              <p className="mt-2 text-sm text-slate-500">Portrait to street</p>
            </div>
            <div className="ui-panel p-4">
              <p className="ui-meta">Models covered</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{modelsCount}</p>
              <p className="mt-2 text-sm text-slate-500">Current tool coverage</p>
            </div>
          </div>

          <div className="ui-card p-5">
            <p className="section-kicker text-brand-accent">Clear Trust Signals</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Support contact: <span className="font-semibold text-brand-ink">{SUPPORT_EMAIL}</span>
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Contact and policy pages are visible, and ad placements are intentionally limited so discovery stays content-first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
