import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageHeader from "../components/PageHeader";
import { useAppContext } from "../context/AppContext";
import { getCategories } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema } from "../seo/schema";

function Categories() {
  const { prompts, loading, error, retryFetch } = useAppContext();
  const categories = getCategories(prompts);
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Categories", to: "/categories" }
  ];

  return (
    <>
      <Seo
        title="AI Prompt Categories"
        description="Browse AI photo prompt categories including portrait, fashion, cinematic, wedding, kids, sports, street, and beauty image ideas."
        path="/categories"
        schema={[
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(categories.map((category) => ({ title: category.name, url: category.href })))
        ]}
      />

      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Categories"
          title="Browse prompts by category"
          description="Category pages are designed for SEO-friendly browsing and easier internal linking. Use them to narrow prompt discovery by subject matter and creative intent."
          meta={[`${categories.length} categories`, `${prompts.length} prompts`]}
        />

        {loading && <LoadingSkeleton count={8} />}
        {!loading && error && <ErrorState message={error} onRetry={retryFetch} />}

        {!loading && !error ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={category.href}
                className="rounded-[1.9rem] border border-slate-200 bg-white/95 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-heading text-2xl font-semibold text-brand-ink">{category.name}</h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {category.count} prompts
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
                {category.latestPrompt ? (
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
                    Latest: {category.latestPrompt.title}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}

export default Categories;
