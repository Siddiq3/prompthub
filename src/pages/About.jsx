function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-soft transition-colors duration-300 dark:from-[#020617] dark:to-[#0b0e14]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
          About Photo Prompt Hub
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Photo Prompt Hub is a focused AI photo prompt library designed to help creators discover ideas
          faster, reduce trial-and-error, and build better visual outputs.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-xl border border-brand-border bg-white/95 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Our Mission</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              To make prompt discovery simple, practical, and reliable for photographers, designers,
              marketers, and content creators.
            </p>
          </section>

          <section className="rounded-xl border border-brand-border bg-white/95 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">What You Can Do</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Browse categorized prompts, search by tags and styles, copy prompt text instantly, and save
              favorites for later use.
            </p>
          </section>

          <section className="rounded-xl border border-brand-border bg-white/95 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Why It Matters</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Better prompt structure leads to clearer outputs and faster iteration. Our library is built to
              support real creative workflows with practical prompt references.
            </p>
          </section>

          <section className="rounded-xl border border-brand-border bg-white/95 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Platform Values</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Clarity, usability, and trust. We keep the experience clean, transparent, and continuously
              improved for long-term creator value.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
