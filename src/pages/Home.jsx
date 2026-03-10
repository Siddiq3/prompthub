import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdSlot from "../components/AdSlot";
import ErrorState from "../components/ErrorState";
import FaqSection from "../components/FaqSection";
import Hero from "../components/Hero";
import LoadingSkeleton from "../components/LoadingSkeleton";
import NewsletterCard from "../components/NewsletterCard";
import PromptShelf from "../components/PromptShelf";
import { HOME_FAQS, OWNER_NAME, SUPPORT_EMAIL } from "../config";
import { useAppContext } from "../context/AppContext";
import {
  getCategories,
  getCollectionHighlights,
  getLatestPrompts,
  getPopularCategories,
  getTopTags,
  getTrendingPrompts
} from "../lib/content";
import Seo from "../seo/Seo";
import { buildFaqSchema, buildItemListSchema, buildWebSiteSchema } from "../seo/schema";

function Home() {
  const navigate = useNavigate();
  const { prompts, loading, error, retryFetch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const categories = useMemo(() => getCategories(prompts), [prompts]);
  const popularCategories = useMemo(() => getPopularCategories(prompts, 6), [prompts]);
  const trendingPrompts = useMemo(() => getTrendingPrompts(prompts, 6), [prompts]);
  const latestPrompts = useMemo(() => getLatestPrompts(prompts, 6), [prompts]);
  const collections = useMemo(() => getCollectionHighlights(prompts, 4), [prompts]);
  const styleTags = useMemo(() => getTopTags(prompts, 10), [prompts]);
  const quickStartLinks = [
    {
      title: "See the latest prompts",
      description: "Start with the newest additions if you want fresh ideas first.",
      to: "/latest"
    },
    {
      title: "Browse trending prompts",
      description: "Open curated standouts and featured prompt ideas across the site.",
      to: "/trending"
    },
    {
      title: "Browse by category",
      description: "Jump directly into portrait, fashion, wedding, kids, sports, and more.",
      to: "/categories"
    },
    {
      title: "Explore collections",
      description: "Use collection pages to browse prompts grouped by model and theme.",
      to: "/collections"
    }
  ];
  const trustLinks = [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms", to: "/terms" },
    { label: "Disclaimer", to: "/disclaimer" },
    { label: "DMCA", to: "/dmca" }
  ];

  const handleSearchSubmit = (value) => {
    const next = value.trim();
    navigate(next ? `/prompts?q=${encodeURIComponent(next)}` : "/prompts");
  };

  return (
    <>
      <Seo
        title="Latest AI Photo Prompts"
        description="Discover AI photo prompts for realistic portraits, cinematic scenes, fashion editorials, weddings, and more. Browse latest prompts, trending ideas, categories, and collections on PhotoPromptsHub."
        path="/"
        schema={[
          buildWebSiteSchema(),
          buildFaqSchema(HOME_FAQS),
          buildItemListSchema(trendingPrompts)
        ]}
      />

      <section className="space-y-10 sm:space-y-14 lg:space-y-16">
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          totalPrompts={prompts.length}
          categoriesCount={categories.length}
          modelsCount={[...new Set(prompts.map((prompt) => prompt.model))].filter(Boolean).length}
          popularCategories={popularCategories}
        />

        <AdSlot
          label="Reserved for a balanced homepage display ad below the hero"
          note="This position is intentionally kept below the main value proposition so first-time visitors see the core content before any monetization."
          variant="banner"
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
            <span className="section-kicker text-brand-accent">First Visit Guide</span>
            <h2 className="mt-4 font-heading text-[2.45rem] font-semibold tracking-tight text-brand-ink sm:text-[3rem]">
              Know where to start in under a minute
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-600 sm:text-[1.02rem]">
              PhotoPromptsHub is structured to help first-time visitors find useful prompts quickly. Use the latest feed for freshness, trending for standout picks, categories for focused browsing, and collections for deeper model- or theme-based discovery.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {quickStartLinks.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-[1.6rem] border border-slate-200/90 bg-white/86 p-5 transition hover:-translate-y-0.5 hover:border-brand-accent/35 hover:shadow-soft"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-accent">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="section-shell p-6 sm:p-8">
            <span className="section-kicker text-brand-accent">Trust Signals</span>
            <h2 className="mt-4 font-heading text-[2.1rem] font-semibold tracking-tight text-brand-ink">
              Visible signals that the platform is maintained professionally
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-[1.5rem] border border-slate-200/90 bg-white/86 p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Support</p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{SUPPORT_EMAIL}</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/90 bg-white/86 p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Operator</p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{OWNER_NAME}</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/90 bg-white/86 p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">AdSense Readiness</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Contact, privacy, terms, disclaimer, and DMCA pages are visible, and ads are reserved for balanced placements rather than stacked above the fold.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {trustLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-brand-accent hover:text-brand-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {loading && <LoadingSkeleton count={8} />}
        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

        {!loading && !error ? (
          <>
            <section className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <span className="section-kicker text-brand-accent">Category Discovery</span>
                  <h2 className="mt-3 font-heading text-[2.35rem] font-semibold tracking-tight text-brand-ink sm:text-[2.8rem]">
                    Browse categories before you search
                  </h2>
                  <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-[1.02rem]">
                    Category pages give new visitors a faster overview of what the library covers, while also creating stronger internal linking and clearer crawl paths for search engines.
                  </p>
                </div>
                <Link
                  to="/categories"
                  className="rounded-full border border-brand-ink/20 bg-white/72 px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white"
                >
                  View all categories
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularCategories.map((category) => (
                  <Link
                    key={category.slug}
                    to={category.href}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-accent hover:text-brand-accent"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.slug}
                    to={category.href}
                    className="section-shell p-5 sm:p-6 transition hover:-translate-y-1 hover:border-brand-accent/25 hover:shadow-lift"
                  >
                    <h3 className="font-heading text-[1.9rem] font-semibold text-brand-ink">{category.name}</h3>
                    <p className="mt-3 text-sm leading-8 text-slate-600">{category.description}</p>
                    {category.latestPrompt ? (
                      <p className="mt-4 text-sm leading-7 text-slate-500">
                        Latest example: <span className="font-medium text-slate-700">{category.latestPrompt.title}</span>
                      </p>
                    ) : null}
                    <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                      {category.count} prompts
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <AdSlot
              label="Reserved for a balanced homepage display ad after category discovery"
              note="A secondary homepage placement can live here after approval without interrupting the hero, search, or early discovery flow."
              variant="banner"
            />

            <PromptShelf
              eyebrow="Trending Now"
              title="Trending prompts"
              description="These are the strongest homepage starting points for first-time visitors who want high-interest prompt ideas without browsing the entire archive."
              prompts={trendingPrompts}
              linkTo="/trending"
              linkLabel="View trending"
            />

            <PromptShelf
              eyebrow="Latest Additions"
              title="Latest prompts"
              description="Fresh prompt additions across portrait, wedding, cinematic, kids, fashion, sports, and other categories."
              prompts={latestPrompts}
              linkTo="/latest"
              linkLabel="View latest"
            />

            <AdSlot
              label="Reserved for an in-content homepage ad between latest prompts and collection browsing"
              note="Use this slot sparingly to keep a strong content-to-ad ratio across the homepage."
              variant="inline"
            />

            <section className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <span className="section-kicker text-brand-accent">Collections</span>
                  <h2 className="mt-3 font-heading text-[2.35rem] font-semibold tracking-tight text-brand-ink sm:text-[2.8rem]">
                    Featured collections
                  </h2>
                  <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-[1.02rem]">
                    Collections create editorial landing pages from the existing dataset without changing the underlying prompt structure.
                  </p>
                </div>
                <Link
                  to="/collections"
                  className="rounded-full border border-brand-ink/20 bg-white/72 px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white"
                >
                  All collections
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {collections.map((collection) => (
                  <Link
                    key={collection.slug}
                    to={collection.href}
                    className="section-shell p-5 sm:p-6 transition hover:-translate-y-1 hover:border-brand-accent/25 hover:shadow-lift"
                  >
                    <h3 className="font-heading text-[1.9rem] font-semibold text-brand-ink">{collection.title}</h3>
                    <p className="mt-3 text-sm leading-8 text-slate-600">{collection.description}</p>
                    <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                      {collection.count} prompts
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
              <div className="max-w-2xl">
                <span className="section-kicker text-brand-accent">Browse By Style</span>
                <h2 className="mt-4 font-heading text-[2.35rem] font-semibold tracking-tight text-brand-ink sm:text-[2.8rem]">
                  Style tags for fast prompt discovery
                </h2>
                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-[1.02rem]">
                  Use style and subject tags to jump directly into prompt variations that match your creative brief.
                </p>
              </div>
              <div className="hide-scrollbar mt-7 flex gap-3 overflow-x-auto pb-1">
                {styleTags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to={tag.href}
                    className="shrink-0 rounded-full border border-slate-200 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-accent"
                  >
                    {tag.name} <span className="opacity-60">({tag.count})</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-200 bg-[linear-gradient(135deg,#132238,#1b3147)] p-6 text-white shadow-lift sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl" />
              <span className="section-kicker text-brand-gold">
                Explore Collections
              </span>
              <h2 className="mt-4 font-heading text-[2.45rem] font-semibold tracking-tight sm:text-[3rem]">
                Move from single prompts to deeper prompt clusters
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-200 sm:text-[1.02rem]">
                Use PhotoPromptsHub collections to compare prompts across models, explore romantic or candid creative directions, and keep discovery paths scalable as the library grows to thousands of prompts.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/collections"
                  className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-gold-soft"
                >
                  Browse collections
                </Link>
                <Link
                  to="/prompts"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Open prompt gallery
                </Link>
              </div>
            </section>

            <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                <div>
                  <span className="section-kicker text-brand-accent">Trust And Transparency</span>
                  <h2 className="mt-4 font-heading text-[2.35rem] font-semibold tracking-tight text-brand-ink sm:text-[2.8rem]">
                    Built to be useful before it is monetized
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-[1.02rem]">
                    PhotoPromptsHub is designed as a clean content platform rather than a cluttered feed. The homepage puts curated prompt discovery, clear contact information, legal transparency, and balanced ad positions ahead of aggressive monetization.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {trustLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-brand-accent hover:text-brand-accent"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[1.6rem] border border-slate-200 bg-white/88 p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Support Email</p>
                    <p className="mt-2 text-lg font-semibold text-brand-ink">{SUPPORT_EMAIL}</p>
                  </div>
                  <div className="rounded-[1.6rem] border border-slate-200 bg-white/88 p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Homepage Standard</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Clear contact, policy, and content-removal routes help first-time visitors understand that the platform is maintained professionally and reviewed with transparency in mind.
                    </p>
                  </div>
                  <div className="rounded-[1.6rem] border border-slate-200 bg-white/88 p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">Ad Placement</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Only a few reserved ad positions are shown, separated by substantial content sections to preserve readability and approval readiness.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <FaqSection items={HOME_FAQS} supportEmail={SUPPORT_EMAIL} trustLinks={trustLinks} />
            <NewsletterCard />
          </>
        ) : null}
      </section>
    </>
  );
}

export default Home;
