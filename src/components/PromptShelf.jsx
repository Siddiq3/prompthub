import { Link } from "react-router-dom";
import MasonryGrid from "./MasonryGrid";
import PromptCard from "./PromptCard";

function PromptShelf({
  title,
  description,
  prompts,
  linkTo,
  linkLabel = "View all",
  eyebrow = "Prompt Shelf"
}) {
  if (!prompts?.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="section-kicker text-brand-accent">{eyebrow}</span>
          <h2 className="mt-3 font-heading text-[2.35rem] font-semibold tracking-tight text-brand-ink sm:text-[2.6rem]">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-[1.02rem]">{description}</p>
        </div>
        {linkTo ? (
          <Link
            to={linkTo}
            className="inline-flex items-center justify-center rounded-full border border-brand-ink/20 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
          >
            {linkLabel}
          </Link>
        ) : null}
      </div>
      <MasonryGrid
        items={prompts}
        renderItem={(prompt, index) => <PromptCard prompt={prompt} priority={index < 2} />}
      />
    </section>
  );
}

export default PromptShelf;
