import ContentPageLayout from "../components/ContentPageLayout";
import { SITE_NAME, SUPPORT_EMAIL } from "../config";
import { buildBreadcrumbSchema, buildWebPageSchema } from "../seo/schema";

function Disclaimer() {
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Disclaimer", to: "/disclaimer" }
  ];

  return (
    <ContentPageLayout
      title="Disclaimer"
      description="Read the PhotoPromptsHub disclaimer covering editorial intent, AI output variability, user responsibility, and third-party references."
      path="/disclaimer"
      seoTitle="Disclaimer for PhotoPromptsHub"
      seoDescription="Read the PhotoPromptsHub disclaimer about AI prompt results, creative use, third-party tools, and your responsibility when using prompts."
      breadcrumbs={breadcrumbs}
      eyebrow="Disclaimer"
      meta={["Last updated March 10, 2026"]}
      schema={[
        buildBreadcrumbSchema(breadcrumbs),
        buildWebPageSchema({
          title: `Disclaimer | ${SITE_NAME}`,
          description:
            "Disclaimer for using PhotoPromptsHub prompts and understanding the limits of AI-generated image outcomes.",
          path: "/disclaimer"
        })
      ]}
    >
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">1. Editorial and creative reference only</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Prompts, images, and descriptions on {SITE_NAME} are published as creative and editorial reference material. They are meant to help with discovery and inspiration, not to serve as legal, financial, or professional advice.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">2. AI output variability</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Generated results can differ based on prompt edits, model versions, rendering settings, moderation layers, seed behavior, and product changes made by external AI tools. A prompt that works one way today may behave differently tomorrow.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">3. Your responsibility when using prompts</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            You are responsible for how you use prompts and any resulting images, including checking copyright, licensing, trademark, privacy, editorial, and platform-specific rules before commercial or public use.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">4. Third-party tools and references</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {SITE_NAME} may mention or link to third-party AI tools, asset services, or external platforms. Those services have their own rules, policies, and product behavior, and they are not controlled by this website.
          </p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">5. Questions about this page</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          If something on the site raises a policy concern or seems inaccurate, contact{" "}
          <a className="font-semibold text-brand-accent" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </ContentPageLayout>
  );
}

export default Disclaimer;
