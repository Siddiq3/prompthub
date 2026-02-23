function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-soft dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          About Photo Prompt Hub
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Photo Prompt Hub is a focused AI photo prompt library designed to help creators discover ideas
          faster, reduce trial-and-error, and build better visual outputs.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-brand-border bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Our Mission</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              To make prompt discovery simple, practical, and reliable for photographers, designers,
              marketers, and content creators.
            </p>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">What You Can Do</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Browse categorized prompts, search by tags and styles, copy prompt text instantly, and save
              favorites for later use.
            </p>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Why It Matters</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Better prompt structure leads to clearer outputs and faster iteration. Our library is built to
              support real creative workflows with practical prompt references.
            </p>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
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
