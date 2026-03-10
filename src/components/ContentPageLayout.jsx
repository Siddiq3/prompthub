import Breadcrumbs from "./Breadcrumbs";
import PageHeader from "./PageHeader";
import Seo from "../seo/Seo";

function ContentPageLayout({
  title,
  description,
  path,
  seoTitle,
  seoDescription,
  breadcrumbs = [],
  eyebrow = "PhotoPromptsHub",
  meta = [],
  actions,
  schema = [],
  noindex = false,
  children
}) {
  return (
    <>
      <Seo
        title={seoTitle || title}
        description={seoDescription || description}
        path={path}
        schema={schema}
        noindex={noindex}
      />
      <section className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          meta={meta}
          actions={actions}
        />
        <div className="grid gap-4 sm:gap-5 lg:gap-6">{children}</div>
      </section>
    </>
  );
}

export default ContentPageLayout;
