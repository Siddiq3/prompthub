import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllVideoWorkflowSlugs,
  getRelatedVideoWorkflows,
  getVideoWorkflowBySlug,
} from "@/src/lib/videoWorkflows";
import {
  VideoWorkflowHero,
  WorkflowCard,
  WorkflowStepCard,
  WorkflowTimeline,
} from "@/src/components/video-workflows";
import FaqAccordion from "@/src/components/FaqAccordion";
import { isHumanApprovedContent } from "@/src/lib/contentApproval";

export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in";

export async function generateMetadata({ params }) {
  const workflow = await getVideoWorkflowBySlug(params.slug);

  if (!workflow) {
    return {
      title: "Video Workflow Not Found | PhotoPromptsHub",
    };
  }

  const hasApprovedEditorial = isHumanApprovedContent(workflow);
  const description = hasApprovedEditorial
    ? workflow.seo?.metaDescription || workflow.description || workflow.title
    : workflow.title;

  return {
    title: workflow.seo?.metaTitle || `${workflow.title} | PhotoPromptsHub`,
    description,
    keywords: workflow.seo?.keywords || [],
    alternates: {
      canonical: `${baseUrl}/video-prompts/${workflow.slug}`,
    },
    openGraph: {
      title: workflow.seo?.metaTitle || workflow.title,
      description,
      url: `${baseUrl}/video-prompts/${workflow.slug}`,
      images: workflow.thumbnail ? [{ url: workflow.thumbnail, alt: workflow.title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: workflow.seo?.metaTitle || workflow.title,
      description,
      images: workflow.thumbnail ? [workflow.thumbnail] : [],
    },
  };
}

export default async function VideoWorkflowPage({ params }) {
  const workflow = await getVideoWorkflowBySlug(params.slug);

  if (!workflow) notFound();

  const relatedWorkflows = await getRelatedVideoWorkflows(workflow, 3);
  const hasApprovedEditorial = isHumanApprovedContent(workflow);
  const howToSteps = hasApprovedEditorial && workflow.howToSteps?.length ? workflow.howToSteps : [];
  const tips = hasApprovedEditorial && workflow.tips?.length ? workflow.tips : [];
  const faqItems = hasApprovedEditorial && workflow.faqItems?.length ? workflow.faqItems : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: workflow.title,
    description: workflow.seo?.metaDescription || workflow.description,
    image: workflow.thumbnail,
    totalTime: workflow.duration,
    tool: workflow.toolsUsed.map((tool) => ({ "@type": "HowToTool", name: tool })),
    step: workflow.steps.map((step) => ({
      "@type": "HowToStep",
      position: step.stepNumber,
      name: step.title,
      text: step.prompt,
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span>Video Prompts</span>
          <span>/</span>
          <span className="text-slate-700">{workflow.title}</span>
        </nav>

        <VideoWorkflowHero workflow={workflow} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <WorkflowTimeline steps={workflow.steps} />

            <section className="space-y-5">
              <h2 className="text-3xl font-bold text-slate-900">Workflow Step Prompts</h2>
              <div className="space-y-6">
                {workflow.steps.map((step) => (
                  <WorkflowStepCard key={step.stepNumber} step={step} />
                ))}
              </div>
            </section>

            {hasApprovedEditorial ? (
            <article className="space-y-10 text-slate-700">
              <section className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900">About This Video Workflow</h2>
                <p className="text-base leading-8">
                  {workflow.seoIntro || workflow.description}
                </p>
                <p className="text-base leading-8">
                  Use this workflow when you want a repeatable process instead of a single one-off prompt. The structure separates image creation from video generation, which gives you more control over the subject, lighting, camera movement, and final export quality.
                </p>
              </section>

              {howToSteps.length ? (
                <section className="space-y-5">
                  <h2 className="text-3xl font-bold text-slate-900">How to Use This Workflow</h2>
                  <ol className="space-y-4">
                    {howToSteps.map((step, index) => (
                      <li key={step} className="flex gap-4">
                        <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-7">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {tips.length ? (
                <section className="space-y-5">
                  <h2 className="text-3xl font-bold text-slate-900">Tips for Better Video Results</h2>
                  <ul className="space-y-3">
                    {tips.map((tip) => (
                      <li key={tip} className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-7">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {faqItems.length ? (
                <section className="space-y-5">
                  <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
                  <FaqAccordion faqItems={faqItems} />
                </section>
              ) : null}
            </article>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Workflow Details</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                  <dt className="text-slate-500">Duration</dt>
                  <dd className="font-semibold text-slate-900">{workflow.duration}</dd>
                </div>
                {workflow.category ? (
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                    <dt className="text-slate-500">Category</dt>
                    <dd className="text-right font-semibold text-slate-900">{workflow.category}</dd>
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                  <dt className="text-slate-500">Aspect ratio</dt>
                  <dd className="font-semibold text-slate-900">{workflow.aspectRatio}</dd>
                </div>
                {workflow.resolution ? (
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                    <dt className="text-slate-500">Resolution</dt>
                    <dd className="font-semibold text-slate-900">{workflow.resolution}</dd>
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                  <dt className="text-slate-500">Steps</dt>
                  <dd className="font-semibold text-slate-900">{workflow.steps.length}</dd>
                </div>
                {workflow.modelLabel ? (
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                    <dt className="text-slate-500">Model label</dt>
                    <dd className="text-right font-semibold text-slate-900">{workflow.modelLabel}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-slate-500">Tools used</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {workflow.toolsUsed.map((tool) => (
                      <span key={tool} className="rounded-full bg-white px-3 py-1 font-semibold text-slate-800">
                        {tool}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </section>
          </aside>
        </div>

        <section className="mt-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Related Workflows</h2>
              <p className="mt-2 text-sm text-slate-600">
                More step-by-step AI video prompt workflows for creators and social content teams.
              </p>
            </div>
          </div>

          {relatedWorkflows.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedWorkflows.map((relatedWorkflow) => (
                <WorkflowCard key={relatedWorkflow.id} workflow={relatedWorkflow} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              More video workflows are coming soon.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllVideoWorkflowSlugs();
  return slugs.map((slug) => ({ slug }));
}
