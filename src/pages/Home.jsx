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
import {
  buildFaqSchema,
  buildItemListSchema,
  buildWebPageSchema,
  buildWebSiteSchema
} from "../seo/schema";

const aiPhotoPromptExplainer = [
  "AI photo prompts are text instructions used in image generation tools to create realistic or artistic images. A prompt can describe the subject, location, lighting, camera angle, lens style, wardrobe, mood, and visual finish. Platforms like Midjourney, Stable Diffusion, DALL·E, and Flux rely on these details to understand what kind of image you want to generate.",
  "A strong prompt usually combines creative direction with practical production cues. Instead of using only a short phrase, creators often include references such as cinematic lighting, shallow depth of field, rainy reflections, editorial styling, natural skin texture, and a target aspect ratio like 4:5 or 16:9. Those additions help AI image models produce more consistent, more usable outputs.",
  "PhotoPromptsHub helps creators discover curated prompts for cinematic portraits, fashion photography, wedding scenes, sports action, travel-style visuals, and other image concepts without digging through unstructured feeds. The library is organized into categories, collections, trending picks, latest additions, and prompt detail pages so users can browse, copy, and refine prompts with less friction."
];

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
        title="AI Photo Prompts for Midjourney, DALL·E, Flux & Stable Diffusion"
        description="Discover curated AI photo prompts for Midjourney, DALL·E, Flux, and Stable Diffusion. Browse realistic portraits, cinematic scenes, fashion editorials, wedding prompts, categories, collections, and prompt detail pages on PhotoPromptsHub."
        path="/"
        schema={[
          buildWebPageSchema({
            title: "AI Photo Prompts for Midjourney, DALL·E, Flux & Stable Diffusion",
            description:
              "Discover curated AI photo prompts for portraits, cinematic scenes, fashion editorials, weddings, and other creative categories.",
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

        <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
            <div>
              <span className="section-kicker text-brand-accent">AI Prompt Basics</span>
              <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.45rem]">
                What are AI photo prompts?
              </h2>
              <div className="mt-4 space-y-4 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
                {aiPhotoPromptExplainer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="ui-card p-6 sm:p-7">
              <p className="ui-meta">How creators use prompts better</p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Start with a strong base prompt, then refine the subject, environment, lighting, styling, and framing one layer at a time instead of rewriting everything.
                </p>
                <p>
                  Lens references, aspect ratio, and negative prompts can improve consistency when you want cleaner outputs and fewer unwanted details from the model.
                </p>
                <p>
                  PhotoPromptsHub is built to help you move from discovery to usable prompt drafting quickly, with clear legal pages and visible contact details for added trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdSlot
          label="Reserved for a balanced homepage display ad below the hero"
          note="This position is intentionally kept below the main value proposition so first-time visitors see the core content before any monetization."
          variant="banner"
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
          <div className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
            <span className="section-kicker text-brand-accent">First Visit Guide</span>
            <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.45rem]">
              Know where to start in under a minute
            </h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
              PhotoPromptsHub is structured to help first-time visitors find useful prompts quickly. Use the latest feed for freshness, trending for standout picks, categories for focused browsing, and collections for deeper model- or theme-based discovery.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {quickStartLinks.map((item, index) => (
                <Link key={item.to} to={item.to} className="ui-card ui-card-hover p-5">
                  <p className="ui-meta text-brand-accent">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="section-shell p-6 sm:p-8">
            <span className="section-kicker text-brand-accent">Trust Signals</span>
            <h2 className="mt-3 text-balance font-heading text-[1.85rem] font-semibold tracking-tight text-brand-ink sm:text-[2.1rem]">
              Visible signals that the platform is maintained professionally
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="ui-card p-5">
                <p className="ui-meta">Support</p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{SUPPORT_EMAIL}</p>
              </div>
              <div className="ui-card p-5">
                <p className="ui-meta">Operator</p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{OWNER_NAME}</p>
              </div>
              <div className="ui-card p-5">
                <p className="ui-meta">AdSense Readiness</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Contact, privacy, terms, disclaimer, and DMCA pages are visible, and ads are reserved for balanced placements rather than stacked above the fold.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {trustLinks.map((link) => (
                <Link key={link.to} to={link.to} className="ui-tag">
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
                  <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.4rem]">
                    Browse categories before you search
                  </h2>
                  <p className="mt-3 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
                    Category pages give new visitors a faster overview of what the library covers, while also creating stronger internal linking and clearer crawl paths for search engines.
                  </p>
                </div>
                <Link to="/categories" className="ui-button-secondary">
                  View all categories
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularCategories.map((category) => (
                  <Link key={category.slug} to={category.href} className="ui-tag text-sm">
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {categories.slice(0, 8).map((category) => (
                  <Link key={category.slug} to={category.href} className="ui-card ui-card-hover p-5 sm:p-6">
                    <p className="ui-meta text-brand-accent">{category.count} prompts</p>
                    <h3 className="mt-3 font-heading text-[1.55rem] font-semibold tracking-tight text-brand-ink">
                      {category.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
                    {category.latestPrompt ? (
                      <p className="mt-4 text-sm leading-7 text-slate-500">
                        Latest example: <span className="font-medium text-slate-700">{category.latestPrompt.title}</span>
                      </p>
                    ) : null}
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
                  <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.4rem]">
                    Featured collections
                  </h2>
                  <p className="mt-3 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
                    Collections create editorial landing pages from the existing dataset without changing the underlying prompt structure.
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
                    <h3 className="mt-3 font-heading text-[1.55rem] font-semibold tracking-tight text-brand-ink">
                      {collection.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{collection.description}</p>
                    <p className="mt-5 text-sm font-medium text-slate-500">{collection.count} prompts</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
                <div>
                  <span className="section-kicker text-brand-accent">Browse By Style</span>
                  <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.4rem]">
                    Style tags for fast prompt discovery
                  </h2>
                  <p className="mt-4 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
                    Use style and subject tags to jump directly into prompt variations that match your creative brief.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {styleTags.map((tag) => (
                      <Link key={tag.slug} to={tag.href} className="ui-tag text-sm">
                        {tag.name} <span className="opacity-60">({tag.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="ui-card p-6">
                  <p className="section-kicker text-brand-accent">Editorial Overview</p>
                  <h3 className="mt-3 font-heading text-[1.6rem] font-semibold tracking-tight text-brand-ink">
                    A cleaner way to discover prompts
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    PhotoPromptsHub groups prompts into categories, collections, latest, and trending paths so first-time visitors can browse the library without guessing where to start.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The structure stays content-first, with clear trust pages and restrained ad positions so the site feels useful before it feels monetized.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {trustLinks.map((link) => (
                      <Link key={link.to} to={link.to} className="ui-tag">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="section-kicker text-brand-accent">Explore Collections</span>
                  <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.45rem]">
                    Move from single prompts to deeper prompt clusters
                  </h2>
                  <p className="mt-4 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
                    Use PhotoPromptsHub collections to compare prompts across models, explore romantic or candid creative directions, and keep discovery paths scalable as the library grows.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/collections" className="ui-button-primary">
                    Browse collections
                  </Link>
                  <Link to="/prompts" className="ui-button-secondary">
                    Open prompt gallery
                  </Link>
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
