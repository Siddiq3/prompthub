import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageHeader from "../components/PageHeader";
import { useAppContext } from "../context/AppContext";
import { getCollections } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "../seo/schema";

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
          buildWebPageSchema({
            title: "Prompt Collections",
            description:
              "Browse curated prompt collections grouped by model, style, and creative theme, including Flux, Midjourney, romantic, candid, cinematic, and fashion prompts.",
            path: "/collections"
          }),
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
                className="group ui-card ui-card-hover flex h-full flex-col p-5 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="ui-meta text-brand-accent">Collection</p>
                    <h2 className="mt-3 font-heading text-[1.55rem] font-semibold tracking-tight text-brand-ink">
                      {collection.title}
                    </h2>
                  </div>
                  <span className="ui-pill">
                    {collection.count} prompts
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{collection.description}</p>
                <div className="soft-divider mt-5" />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm leading-6 text-slate-500">{collection.intro}</p>
                  <span className="text-sm font-semibold text-brand-accent transition-colors duration-180 ease-smooth group-hover:text-primary-dark">
                    Open
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}

export default Collections;
