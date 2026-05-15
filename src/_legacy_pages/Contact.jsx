import { Link } from "react-router-dom";
import ContentPageLayout from "../components/ContentPageLayout";
import {
  CONTACT_EMAIL,
  COUNTRY,
  OWNER_NAME,
  SITE_NAME,
  STATE,
  SUPPORT_EMAIL,
  WHATSAPP_CHANNEL_URL
} from "../config";
import { buildBreadcrumbSchema, buildWebPageSchema } from "../seo/schema";

function Contact() {
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Contact Us", to: "/contact" }
  ];

  return (
    <ContentPageLayout
      title="Contact PhotoPromptsHub"
      description="Get in touch with PhotoPromptsHub for support questions, prompt corrections, privacy concerns, content removal requests, or general feedback about the AI prompt library."
      path="/contact"
      seoTitle="Contact PhotoPromptsHub Support"
      seoDescription="Contact PhotoPromptsHub by email for support, corrections, policy questions, or DMCA and content removal requests."
      breadcrumbs={breadcrumbs}
      eyebrow="Contact Us"
      meta={[SUPPORT_EMAIL, "Email support", `${STATE}, ${COUNTRY}`]}
      actions={
        <>
          <a
            className="inline-flex items-center justify-center rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-brand-ink/92"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            Email support
          </a>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-brand-ink/20 bg-white/80 px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white"
            to="/dmca"
          >
            Content removal page
          </Link>
        </>
      }
      schema={[
        buildBreadcrumbSchema(breadcrumbs),
        buildWebPageSchema({
          title: `Contact ${SITE_NAME}`,
          description:
            "Contact PhotoPromptsHub for support, corrections, policy questions, or content removal requests.",
          path: "/contact",
          type: "ContactPage"
        })
      ]}
    >
      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Email is the best way to reach us</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {SITE_NAME} is operated as an independent project, so email is the primary support channel. If you have a question about a prompt page, want to report an issue, need help with a content-removal request, or want to flag incorrect information, please contact us at{" "}
          <a className="font-semibold text-brand-accent" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Messages are easier to review when they include the exact page URL, a short description of the issue, and any relevant screenshots or supporting context.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Contact details</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Support email:{" "}
            <a className="font-semibold text-brand-accent" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">Owner / operator: {OWNER_NAME}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Location: {STATE}, {COUNTRY}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            General contact email:{" "}
            <a className="font-semibold text-brand-accent" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Common reasons people contact us</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>Prompt page corrections or content feedback.</li>
            <li>Privacy or policy questions.</li>
            <li>Copyright, DMCA, or other removal requests.</li>
            <li>Broken images, missing content, or technical issues.</li>
            <li>General partnership or editorial inquiries.</li>
          </ul>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">What to include in your message</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            A clear subject line such as “Prompt issue”, “DMCA request”, “Policy question”, or “Partnership inquiry” helps a lot. If your message is about a specific page, include the direct URL and explain what needs attention.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Community link:{" "}
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-accent"
            >
              Join the WhatsApp channel
            </a>
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Response expectations</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {SITE_NAME} is managed as an independent project, so response times can vary. Most email inquiries are reviewed within 1 to 3 business days, and rights-related requests are checked manually.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            If your request is urgent or legal in nature, include that clearly in the subject line so it can be prioritized appropriately.
          </p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Policy and removal routes</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          For privacy details, terms, disclaimers, or removal procedures, you can also use the dedicated pages linked below instead of writing a general support email first.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            className="rounded-full border border-brand-ink/20 bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white"
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="rounded-full border border-brand-ink/20 bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white"
            to="/terms"
          >
            Terms & Conditions
          </Link>
          <Link
            className="rounded-full border border-brand-ink/20 bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white"
            to="/dmca"
          >
            DMCA / Content Removal
          </Link>
        </div>
      </section>
    </ContentPageLayout>
  );
}

export default Contact;
