import { Link } from "react-router-dom";
import ContentPageLayout from "../components/ContentPageLayout";
import {
  COMPANY_NAME,
  COUNTRY,
  OWNER_NAME,
  SITE_NAME,
  STATE,
  SUPPORT_EMAIL
} from "../config";
import { buildBreadcrumbSchema, buildWebPageSchema } from "../seo/schema";

function About() {
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" }
  ];

  return (
    <ContentPageLayout
      title="About PhotoPromptsHub"
      description="PhotoPromptsHub is an independent prompt library built to help creators browse photo prompts, example images, and related ideas without the clutter of a generic feed."
      path="/about"
      seoTitle="About PhotoPromptsHub AI Prompt Discovery Website"
      seoDescription="Learn what PhotoPromptsHub is, how the prompt library is organized, and who runs the site."
      breadcrumbs={breadcrumbs}
      eyebrow="About Us"
      meta={[OWNER_NAME, "Independent project", `${STATE}, ${COUNTRY}`]}
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
            to="/contact"
          >
            Contact page
          </Link>
        </>
      }
      schema={[
        buildBreadcrumbSchema(breadcrumbs),
        buildWebPageSchema({
          title: `About ${SITE_NAME}`,
          description:
            "Learn what PhotoPromptsHub is, how its prompt library is organized, and who runs the project.",
          path: "/about",
          type: "AboutPage"
        })
      ]}
    >
      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Why this website exists</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {SITE_NAME} was created to make prompt browsing simpler and more useful. A lot of prompt websites feel like fast-moving feeds with very little structure. This project takes a quieter approach by organizing prompts into categories, collections, latest additions, trending picks, and detail pages that are easier to browse.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          The goal is not to overwhelm visitors with volume. The goal is to help someone find a strong starting point quickly, understand what they are looking at, and keep exploring without losing their place.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">What you will find here</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The library focuses on prompt pages, example images, category pages, collection pages, and useful metadata such as model, aspect ratio, tags, and related prompts. The structure is meant to be clear for visitors first.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Who the site is for</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {SITE_NAME} is built for creators, designers, marketers, students, researchers, and anyone who wants practical prompt ideas instead of vague inspiration.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">How prompts are presented</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Prompt pages are meant to be practical. Where available, they include the full prompt, negative prompt, model context, tags, related prompts, and paths back into the rest of the library. That structure helps first-time visitors understand what they are looking at instead of just copying blind text.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">What this website is not</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {SITE_NAME} is an independent project. It is not an official product of Midjourney, OpenAI, Stability AI, or any other model provider, and it does not promise that the same prompt will give identical results across different tools or future versions.
          </p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Ownership and transparency</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {SITE_NAME} is operated by {OWNER_NAME} under {COMPANY_NAME}. The project is based in {STATE}, {COUNTRY}. Support, privacy, terms, disclaimer, and content-removal pages are published so visitors can understand how the website is run and how to get in touch when needed.
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
            to="/disclaimer"
          >
            Disclaimer
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

export default About;
