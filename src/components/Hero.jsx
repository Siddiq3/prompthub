import { FaArrowRight, FaWandMagicSparkles } from "react-icons/fa6";

function StatItem({ label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 h-8 w-1 rounded-full bg-gradient-to-b from-brand-secondary to-brand-accent" />
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100 sm:text-base">
          {value}
        </p>
      </div>
    </div>
  );
}

function Hero({ onExplore, onCreate, totalPrompts, categoriesCount, mostCopiedTitle }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-blue-50 p-6 dark:from-slate-950 dark:to-slate-900 sm:p-8">
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-3 py-1 text-xs font-medium text-brand-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-brand-accent">
          <FaWandMagicSparkles />
          Premium prompt library
        </span>

        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
          Craft standout visuals with curated photo prompts
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Discover, copy, and save prompts across styles, models, and aspect ratios. Built for creators who need production-ready ideas fast.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            Explore Prompts
            <FaArrowRight className="text-xs" />
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="rounded-xl border border-blue-900 bg-white px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 dark:border-blue-700 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-slate-800"
          >
            Create Prompt
          </button>
        </div>

        <div className="mt-7 grid gap-5 border-t border-brand-border pt-5 dark:border-slate-700 sm:grid-cols-3">
          <StatItem label="Total Prompts" value={totalPrompts} />
          <StatItem label="Categories" value={categoriesCount} />
          <StatItem label="Most Copied" value={mostCopiedTitle || "No copies yet"} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
