import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageHeader from "../components/PageHeader";
import { useAppContext } from "../context/AppContext";
import { getCollections } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema } from "../seo/schema";

function Collections() {
  const { prompts, loading, error, retryFetch } = useAppContext();
  const collections = getCollections(prompts);
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Collections", to: "/collections" }
  ];

  return (
    <>
      <Seo
        title="Prompt Collections"
        description="Browse curated prompt collections grouped by model, style, and creative theme, including Flux, Midjourney, romantic, candid, cinematic, and fashion prompts."
        path="/collections"
        schema={[
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(collections.map((item) => ({ title: item.title, url: item.href })))
        ]}
      />

      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Collections"
          title="Explore prompt collections"
          description="Collections group prompts into stronger discovery paths for users and search engines. Browse by model, editorial angle, or recurring creative theme."
          meta={[`${collections.length} collections`, `${prompts.length} prompts`]}
        />

        {loading && <LoadingSkeleton count={8} />}
        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

        {!loading && !error ? (
          <div className="grid gap-5 md:grid-cols-2">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                to={collection.href}
                className="rounded-[1.9rem] border border-slate-200 bg-white/95 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-heading text-2xl font-semibold text-brand-ink">{collection.title}</h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {collection.count} prompts
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{collection.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
                  {collection.intro}
                </p>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}

export default Collections;
