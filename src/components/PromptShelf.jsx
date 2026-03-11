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
    <section className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="section-kicker text-brand-accent">{eyebrow}</span>
          <h2 className="mt-3 text-balance font-heading text-[1.95rem] font-semibold tracking-tight text-brand-ink sm:text-[2.35rem]">
            {title}
          </h2>
          <p className="mt-3 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">{description}</p>
        </div>
        {linkTo ? (
          <Link
            to={linkTo}
            className="ui-button-secondary"
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
