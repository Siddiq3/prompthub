import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageHeader from "../components/PageHeader";
import { useAppContext } from "../context/AppContext";
import { getCategories } from "../lib/content";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema } from "../seo/schema";

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
          buildWebPageSchema({
            title: "AI Prompt Categories",
            description:
              "Browse AI photo prompt categories including portrait, fashion, cinematic, wedding, kids, sports, street, and beauty image ideas.",
            path: "/categories"
          }),
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(categories.map((category) => ({ title: category.name, url: category.href })))
        ]}
      />

      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow="Categories"
          title="Browse prompts by category"
          description="Categories represent the primary subject or theme. Start here when you want the clearest browsing path before applying secondary filters."
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
                className="group ui-card ui-card-hover flex h-full flex-col p-5 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="ui-meta text-brand-accent">Category</p>
                    <h2 className="mt-3 font-heading text-[1.55rem] font-semibold tracking-tight text-brand-ink">
                      {category.name}
                    </h2>
                  </div>
                  <span className="ui-pill">
                    {category.count} prompts
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
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
                <div className="soft-divider mt-5" />
                {category.latestPrompt ? (
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm leading-6 text-slate-500">
                      Latest: <span className="font-medium text-slate-700">{category.latestPrompt.title}</span>
                    </p>
                    <span className="text-sm font-semibold text-brand-accent transition-colors duration-180 ease-smooth group-hover:text-primary-dark">
                      Browse
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end">
                    <span className="text-sm font-semibold text-brand-accent transition-colors duration-180 ease-smooth group-hover:text-primary-dark">
                      Browse
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}

export default Categories;
