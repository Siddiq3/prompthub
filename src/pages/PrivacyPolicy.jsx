function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-soft transition-colors duration-300 dark:from-[#020617] dark:to-[#0b0e14]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Last updated: February 22, 2026
        </p>

        <div className="mt-8 space-y-6 rounded-xl border border-brand-border bg-white/95 p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              1. Information We Collect
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Photo Prompt Hub mainly provides prompt browsing and discovery features. We may collect limited
              non-personal data such as browser type, device details, pages visited, and general usage events
              to improve site performance and content quality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              2. Cookies and Analytics
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Our website may use cookies and similar technologies for analytics, session stability, and
              personalization. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              3. Google AdSense
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We use Google AdSense to display ads. Google and its partners may use cookies to serve and
              measure ads based on your visit to this and other websites. You can manage ad personalization
              in your Google Ads settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              4. Third-Party Services
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We may link to third-party platforms such as WhatsApp or external resources. These services
              have their own privacy policies, and we recommend reviewing them before sharing information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              5. Data Protection
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We apply reasonable technical and organizational measures to protect website integrity and user
              experience. No online system is fully risk-free, but we work to keep the platform secure and
              reliable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              6. Your Rights and Choices
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              You may clear local browser storage, disable cookies, and restrict tracking through your
              browser or device settings. If you have privacy concerns, you may contact us using the details
              below.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              7. Contact
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Privacy inquiries: <span className="font-medium">hello@photoprompthub.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
