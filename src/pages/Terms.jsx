import ContentPageLayout from "../components/ContentPageLayout";
import { SITE_NAME, SUPPORT_EMAIL } from "../config";
import { buildBreadcrumbSchema, buildWebPageSchema } from "../seo/schema";

function Terms() {
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Terms & Conditions", to: "/terms" }
  ];

  return (
    <ContentPageLayout
      title="Terms & Conditions"
      description="These Terms & Conditions explain how PhotoPromptsHub may be used, how prompts and example content should be treated, and why AI image results cannot be guaranteed."
      path="/terms"
      seoTitle="Terms & Conditions for PhotoPromptsHub"
      seoDescription="Read the PhotoPromptsHub Terms & Conditions for using AI prompts, example images, third-party platforms, and site content responsibly."
      breadcrumbs={breadcrumbs}
      eyebrow="Terms & Conditions"
      meta={["Effective March 10, 2026", "Applies to global visitors"]}
      schema={[
        buildBreadcrumbSchema(breadcrumbs),
        buildWebPageSchema({
          title: `Terms & Conditions | ${SITE_NAME}`,
          description:
            "Terms & Conditions for PhotoPromptsHub covering prompt use, no guarantee of AI results, third-party platforms, and limitation of liability.",
          path: "/terms"
        })
      ]}
    >
      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Acceptance of Terms</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          By using {SITE_NAME}, you agree to these Terms & Conditions. If you do not agree with them, you should stop using the website.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Website Purpose</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          PhotoPromptsHub is a discovery platform that curates AI photo prompts, example images, and creative inspiration for AI image generation tools such as Midjourney, DALL·E, Stable Diffusion, Flux, and related systems.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Use of Content</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          You may read, copy, and adapt prompts from the website for personal, educational, editorial, or creative use. You are responsible for making sure your use follows applicable laws and the terms of any AI platform or service you choose to use.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">No Guarantee of Results</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          AI image outputs vary depending on the model, settings, platform, prompt wording, and user input. Because of that, PhotoPromptsHub cannot guarantee that a prompt will produce identical or predictable results across different tools or future versions of those tools.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Intellectual Property</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The PhotoPromptsHub name, branding, website design, and original site presentation belong to the website owner unless stated otherwise. Prompts are provided as creative inspiration and practical starting points for users.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Third-Party Platforms</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            AI tools referenced on the website, including Midjourney, DALL·E, Stable Diffusion, Flux, and similar services, are independent third-party platforms. Their features, terms, moderation systems, and output rules are separate from PhotoPromptsHub.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">User Responsibility</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            You are responsible for how you use prompts from the website and how you use any generated output. That includes checking whether your use is lawful, appropriate, and allowed under the rules of the AI tool, marketplace, or platform involved.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Limitation of Liability</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            PhotoPromptsHub is provided on an &quot;as is&quot; basis without warranties of any kind. The website does not guarantee uninterrupted availability, error-free content, or any specific outcome from using a listed prompt.
          </p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Changes to Terms</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          These Terms & Conditions may be updated in the future as the website changes. The latest version will always be published on this page.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Contact Information</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          If you have questions about these Terms & Conditions, you can contact PhotoPromptsHub at{" "}
          <a className="font-semibold text-brand-accent" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </ContentPageLayout>
  );
}

export default Terms;
