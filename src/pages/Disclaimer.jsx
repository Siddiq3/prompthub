function Disclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-soft dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Disclaimer
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Last updated: February 22, 2026
        </p>

        <div className="mt-8 space-y-6 rounded-2xl border border-brand-border bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              1. Creative and Educational Use
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Prompt content on Photo Prompt Hub is provided for creative exploration and educational support.
              It should not be treated as legal, financial, or professional advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              2. No Guarantee of AI Output
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              AI-generated results can differ by model, settings, platform updates, and prompt variations.
              We do not guarantee output quality, consistency, or suitability for any specific use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              3. User Responsibility
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              You are fully responsible for how you use prompts and generated content, including compliance
              with copyright, licensing, brand policies, platform rules, and local regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              4. Third-Party Ads and Links
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              This website may display third-party ads, including Google AdSense, and may contain links to
              external websites. We are not responsible for third-party content, offers, or policies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
