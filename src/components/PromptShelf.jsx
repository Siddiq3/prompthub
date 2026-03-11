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
      <div className="max-w-2xl">
        <span className="section-kicker text-brand-accent">{eyebrow}</span>
        <h2 className="mt-3 text-balance font-heading text-[1.85rem] font-semibold tracking-tight text-brand-ink sm:text-[2.2rem]">
          {title}
        </h2>
        <p className="mt-3 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">{description}</p>
      </div>

      <MasonryGrid
        items={prompts}
        renderItem={(prompt, index) => <PromptCard prompt={prompt} priority={index < 2} />}
      />
      {linkTo ? (
        <div className="flex justify-center pt-1 sm:justify-start">
          <Link to={linkTo} className="ui-button-secondary">
            {linkLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export default PromptShelf;
