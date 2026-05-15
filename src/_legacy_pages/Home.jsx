import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import FaqSection from "../components/FaqSection";
import Hero from "../components/Hero";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PromptShelf from "../components/PromptShelf";
import { HOME_FAQS, SUPPORT_EMAIL } from "../config";
import { useAppContext } from "../context/AppContext";
import {
  buildPromptsPathWithTag,
  getCategories,
  getCollectionHighlights,
  getDefaultOgImage,
  getLatestPrompts,
  getPopularCategories,
  getTopTags,
  getTrendingPrompts
} from "../lib/content";
import Seo from "../seo/Seo";
import {
  buildFaqSchema,
  buildItemListSchema,
  buildWebPageSchema,
  buildWebSiteSchema
} from "../seo/schema";

function Home() {
  const navigate = useNavigate();
  const { prompts, loading, error, retryFetch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const categories = useMemo(() => getCategories(prompts), [prompts]);
  const defaultOgImage = useMemo(() => getDefaultOgImage(prompts), [prompts]);
  const popularCategories = useMemo(() => getPopularCategories(prompts, 6), [prompts]);
  const trendingPrompts = useMemo(() => getTrendingPrompts(prompts, 6), [prompts]);
  const latestPrompts = useMemo(() => {
    const trendingIds = new Set(trendingPrompts.map((prompt) => prompt.id));
    return getLatestPrompts(prompts)
      .filter((prompt) => !trendingIds.has(prompt.id))
      .slice(0, 6);
  }, [prompts, trendingPrompts]);
  const collections = useMemo(() => getCollectionHighlights(prompts, 4), [prompts]);
  const styleTags = useMemo(() => getTopTags(prompts, 14), [prompts]);

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
        title="AI Photo Prompts for Midjourney, DALL·E, Flux & Stable Diffusion"
        description="Browse AI photo prompts through clear categories, helpful tags, and prompt pages that are easy to understand."
        path="/"
        image={defaultOgImage}
        schema={[
          buildWebPageSchema({
            title: "AI Photo Prompts for Midjourney, DALL·E, Flux & Stable Diffusion",
            description:
              "Browse AI photo prompts by category first, then refine with search, filters, and collections.",
            path: "/"
          }),
          buildWebSiteSchema(),
          buildFaqSchema(HOME_FAQS),
          buildItemListSchema(trendingPrompts)
        ]}
      />

      <section className="space-y-12 sm:space-y-16 lg:space-y-20">
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          totalPrompts={prompts.length}
          categoriesCount={categories.length}
          modelsCount={[...new Set(prompts.map((prompt) => prompt.model))].filter(Boolean).length}
          popularCategories={popularCategories}
        />

        {loading && <LoadingSkeleton count={6} />}
        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

        {!loading && !error ? (
          <>
            <section className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <span className="section-kicker text-brand-accent">Browse By Category</span>
                  <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.35rem]">
                    Start with the kind of image you want to make
                  </h2>
                  <p className="mt-3 text-[0.98rem] leading-7 text-slate-700 sm:text-[1.02rem]">
                    Categories are the easiest way to get oriented. Pick the main subject or theme first, then use filters only when you want something more specific.
                  </p>
                </div>
                <Link to="/categories" className="ui-button-secondary">
                  View all categories
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {categories.map((category) => (
                  <Link key={category.slug} to={category.href} className="ui-card ui-card-hover p-5 sm:p-6">
                    <p className="ui-meta text-brand-accent">{category.count} prompts</p>
                    <h3 className="mt-3 font-heading text-[1.5rem] font-semibold tracking-tight text-brand-ink">
                      {category.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{category.description}</p>
                    {(category.topSubjects.length || category.topTags.length) ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(category.topSubjects.length ? category.topSubjects : category.topTags)
                          .slice(0, 3)
                          .map((tag) => (
                          <span key={tag.slug} className="ui-tag">
                            {tag.label}
                          </span>
                          ))}
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>

            <PromptShelf
              eyebrow="Trending Prompts"
              title="A simple place to start if you just want good picks"
              description="These are the prompts we surface first when someone wants strong recent work without opening the full archive right away."
              prompts={trendingPrompts}
              linkTo="/trending"
              linkLabel="Browse trending prompts"
            />

            <PromptShelf
              eyebrow="Latest Prompts"
              title="The newest prompts added to the library"
              description="This list follows the latest dataset dates, so you can quickly see what was added most recently."
              prompts={latestPrompts}
              linkTo="/latest"
              linkLabel="Browse latest prompts"
            />

            <section className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <span className="section-kicker text-brand-accent">Collections</span>
                  <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.35rem]">
                    Browse collections when you want a broader angle
                  </h2>
                  <p className="mt-3 text-[0.98rem] leading-7 text-slate-700 sm:text-[1.02rem]">
                    Collections group prompts by model or creative angle. They are useful once you know the direction you want, but they do not replace categories as the main starting point.
                  </p>
                </div>
                <Link to="/collections" className="ui-button-secondary">
                  All collections
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {collections.map((collection) => (
                  <Link key={collection.slug} to={collection.href} className="ui-card ui-card-hover p-5 sm:p-6">
                    <p className="ui-meta text-brand-accent">{collection.count} prompts</p>
                    <h3 className="mt-3 font-heading text-[1.5rem] font-semibold tracking-tight text-brand-ink">
                      {collection.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{collection.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <span className="section-kicker text-brand-accent">Browse By Style</span>
                  <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.35rem]">
                    Use tags when you want to narrow the look
                  </h2>
                  <p className="mt-3 text-[0.98rem] leading-7 text-slate-700 sm:text-[1.02rem]">
                    Tags work best after category. They help you narrow the mood, lighting, season, location, or styling without sending you into a separate browsing system.
                  </p>
                </div>
                <Link to="/prompts" className="ui-button-secondary">
                  Open all tags
                </Link>
              </div>

              <div className="section-shell surface-subtle p-5 sm:p-6">
                <div className="flex flex-wrap gap-2.5">
                  {styleTags.map((tag) => (
                    <Link key={tag.slug} to={buildPromptsPathWithTag(tag.name)} className="ui-tag text-sm">
                      {tag.label}
                      <span className="text-slate-600">({tag.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)]">
                <div>
                  <span className="section-kicker text-brand-accent">How Discovery Works</span>
                  <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.35rem]">
                    A simpler way to move through the library
                  </h2>
                  <div className="mt-4 space-y-4 text-[0.98rem] leading-7 text-slate-700 sm:text-[1.02rem]">
                    <p>
                      On PhotoPromptsHub, categories are the main path. Tags are there to refine the style, mood, lighting, season, or location after you have already chosen the kind of image you want.
                    </p>
                    <p>
                      Collections are still available, but they now sit in a more supportive role. The result is a homepage that feels calmer and a library that is easier to understand at a glance.
                    </p>
                  </div>
                </div>

                <div className="ui-card p-5 sm:p-6">
                  <p className="ui-meta">Discovery rules</p>
                  <div className="mt-4 grid gap-3">
                    <div className="ui-panel p-4">
                      <p className="text-sm font-semibold text-brand-ink">Category</p>
                      <p className="mt-1 text-sm leading-7 text-slate-700">The main subject or theme</p>
                    </div>
                    <div className="ui-panel p-4">
                      <p className="text-sm font-semibold text-brand-ink">Tag</p>
                      <p className="mt-1 text-sm leading-7 text-slate-700">A style, mood, lighting cue, location, or other refinement</p>
                    </div>
                    <div className="ui-panel p-4">
                      <p className="text-sm font-semibold text-brand-ink">Collection</p>
                      <p className="mt-1 text-sm leading-7 text-slate-700">A broader grouping across models or creative angles</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FaqSection items={HOME_FAQS} supportEmail={SUPPORT_EMAIL} trustLinks={trustLinks} />
          </>
        ) : null}
      </section>
    </>
  );
}

export default Home;
