import ContentPageLayout from "../components/ContentPageLayout";
import { SITE_NAME, SUPPORT_EMAIL } from "../config";
import { buildBreadcrumbSchema, buildWebPageSchema } from "../seo/schema";

function Dmca() {
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "DMCA / Content Removal", to: "/dmca" }
  ];

  return (
    <ContentPageLayout
      title="DMCA / Content Removal Policy"
      description="Submit copyright or content removal requests to PhotoPromptsHub using the email address and review guidelines listed on this page."
      path="/dmca"
      seoTitle="DMCA and Content Removal Policy for PhotoPromptsHub"
      seoDescription="Find out how to submit a copyright or content removal request to PhotoPromptsHub and what information to include."
      breadcrumbs={breadcrumbs}
      eyebrow="DMCA / Content Removal"
      meta={[SUPPORT_EMAIL, "Manual review process"]}
      schema={[
        buildBreadcrumbSchema(breadcrumbs),
        buildWebPageSchema({
          title: `DMCA and Content Removal Policy | ${SITE_NAME}`,
          description:
            "How to submit a copyright or content removal request to PhotoPromptsHub and what details are needed for review.",
          path: "/dmca"
        })
      ]}
    >
      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">How to submit a request</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          If you believe content on {SITE_NAME} infringes your rights or should be removed for a valid legal reason, email{" "}
          <a className="font-semibold text-brand-accent" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          with a detailed notice. This page is intended to make that process clear and human-readable.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">What to include</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>Your full name and a working contact email.</li>
            <li>The exact page URL or URLs involved.</li>
            <li>A short explanation of what should be removed and why.</li>
            <li>Your relationship to the rights involved, if relevant.</li>
            <li>A good-faith statement that the information you are providing is accurate.</li>
          </ul>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">How review works</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Requests are reviewed manually. If the notice is unclear or incomplete, we may ask for clarification before taking action. Where appropriate, content may be updated, restricted, or removed after review.
          </p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Important note</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Incomplete, misleading, or abusive notices can delay review. The same email address may also be used for broader content concerns, but rights-based requests should include enough detail to be evaluated responsibly.
        </p>
      </section>
    </ContentPageLayout>
  );
}

export default Dmca;
