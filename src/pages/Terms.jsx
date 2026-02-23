function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-soft transition-colors duration-300 dark:from-[#020617] dark:to-[#0b0e14]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Effective date: February 22, 2026
        </p>

        <div className="mt-8 space-y-6 rounded-xl border border-brand-border bg-white/95 p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">1. Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-400">
              By using Photo Prompt Hub, you agree to these Terms & Conditions and applicable laws. If you
              do not agree, please stop using the website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">2. Proper Use of Prompts</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Prompts are provided for creative and educational support. You are responsible for reviewing,
              adapting, and validating prompts before commercial or sensitive use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">3. Intellectual Property</h2>
            <p className="text-slate-600 dark:text-slate-400">
              The website design, branding, and original text content are owned by or licensed to the site
              operator. Third-party names, models, and trademarks belong to their respective owners.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">4. No Guarantee of Results</h2>
            <p className="text-slate-600 dark:text-slate-400">
              AI outputs can vary based on model versions, settings, platform behavior, and user input. We
              do not guarantee that any prompt will produce a specific outcome.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">5. Acceptable Use</h2>
            <p className="text-slate-600 dark:text-slate-400">
              You agree not to misuse the website, attempt unauthorized access, distribute malicious code, or
              use content for unlawful, abusive, or rights-violating activities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">6. Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-400">
              To the maximum extent allowed by law, Photo Prompt Hub is not liable for direct or indirect
              losses resulting from use of the website, prompts, or third-party services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;
