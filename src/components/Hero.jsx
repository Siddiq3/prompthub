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
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-indigo-50/80 to-white p-6 shadow-soft dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0b0e14] dark:via-[#111827] dark:to-[#020617] sm:p-8">
      <div className="pointer-events-none absolute -left-20 -top-14 h-56 w-56 rounded-full bg-gradient-to-br from-primary-light/20 to-transparent blur-3xl dark:from-primary-light/30" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-secondary/15 to-transparent blur-3xl dark:from-secondary/25" />
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-3 py-1 text-xs font-medium text-brand-secondary dark:border-white/15 dark:bg-white/5 dark:text-brand-accent">
          <FaWandMagicSparkles />
          Premium prompt library
        </span>

        <h1 className="hero-fluid-title mt-4 font-heading font-bold text-slate-900 dark:text-slate-100">
          Craft standout visuals with curated photo prompts
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Discover, copy, and save prompts across styles, models, and aspect ratios. Built for creators who need production-ready ideas fast.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onExplore}
            className="btn-shimmer inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-light active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/60"
          >
            Explore Prompts
            <FaArrowRight className="text-xs" />
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="rounded-lg border border-primary/25 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-indigo-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/60 dark:border-white/20 dark:bg-white/5 dark:text-indigo-200 dark:hover:bg-white/10"
          >
            Create Prompt
          </button>
        </div>

        <div className="mt-7 grid gap-5 border-t border-brand-border pt-5 dark:border-white/10 sm:grid-cols-3">
          <StatItem label="Total Prompts" value={totalPrompts} />
          <StatItem label="Categories" value={categoriesCount} />
          <StatItem label="Most Copied" value={mostCopiedTitle || "No copies yet"} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
