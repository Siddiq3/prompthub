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
    <section className="section-shell surface-subtle editorial-grid relative p-6 sm:p-10 lg:p-14">
      <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-brand-secondary/10 blur-3xl" />
      <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] xl:items-end">
        <div className="max-w-3xl">
          <span className="section-kicker inline-flex rounded-full border border-brand-accent/15 bg-white/88 px-4 py-2 text-brand-accent">
            Latest AI Photo Prompts
          </span>
          <h1 className="hero-fluid-title text-balance mt-6 font-heading text-brand-ink">
            Discover the latest AI photo prompts for realistic portraits, cinematic scenes, fashion editorials, weddings, products, and viral image ideas
          </h1>
          <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-slate-600 sm:text-[1.08rem]">
            Browse curated prompt ideas for Midjourney, ChatGPT image generation, DALL·E, Flux, and Stable Diffusion. Start with the latest feed, open trending prompt picks, browse categories, and move into detail pages with copy-ready prompts, tags, and related suggestions.
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
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Popular starting points
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {popularCategories.slice(0, 5).map((category) => (
                  <Link
                    key={category.slug}
                    to={category.href}
                    className="rounded-full border border-slate-200/90 bg-white/82 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-accent"
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
              className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-brand-ink/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
            >
              Browse all prompts
              <FaArrowRight className="text-xs" />
            </Link>
            <Link
              to="/latest"
              className="inline-flex items-center rounded-full border border-brand-ink/20 bg-white/80 px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
            >
              See latest prompts
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Free to browse", "Copy-ready prompts", "Latest updates", "No signup required"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200/90 bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-white/70 bg-white/86 p-5 shadow-soft backdrop-blur sm:p-6">
          <div className="rounded-[1.5rem] border border-slate-200/90 bg-white/85 p-5">
            <p className="section-kicker text-brand-accent">Start Here</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              First-time visitors usually start with the latest feed, trending prompts, or category pages to narrow the library quickly and open the most relevant prompt pages first.
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-brand-ink transition hover:border-brand-accent hover:text-brand-accent" to="/latest">
                Latest prompts
              </Link>
              <Link className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-brand-ink transition hover:border-brand-accent hover:text-brand-accent" to="/trending">
                Trending prompts
              </Link>
              <Link className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-brand-ink transition hover:border-brand-accent hover:text-brand-accent" to="/categories">
                Browse categories
              </Link>
              <Link className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-brand-ink transition hover:border-brand-accent hover:text-brand-accent" to="/collections">
                Explore collections
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[1.5rem] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.84))] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total prompts</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{totalPrompts}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">Curated and crawlable</p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.84))] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Categories</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{categoriesCount}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">From portrait to street</p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.84))] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Models covered</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink">{modelsCount}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">Production-ready references</p>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200/90 bg-white/85 p-5">
            <p className="section-kicker text-brand-accent">Trust Signal</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Support contact: <span className="font-semibold text-brand-ink">{SUPPORT_EMAIL}</span>
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Clear legal and policy pages are visible in the footer, and ad placement is intentionally limited so the homepage stays content-first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
