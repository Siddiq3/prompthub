import ContentPageLayout from "../components/ContentPageLayout";
import { SITE_NAME, SUPPORT_EMAIL } from "../config";
import { buildBreadcrumbSchema, buildWebPageSchema } from "../seo/schema";

function PrivacyPolicy() {
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Privacy Policy", to: "/privacy-policy" }
  ];

  return (
    <ContentPageLayout
      title="Privacy Policy"
      description="This Privacy Policy explains what limited information PhotoPromptsHub may receive when you browse the website, how browser storage works, and how future advertising services such as Google AdSense may use cookies."
      path="/privacy-policy"
      seoTitle="Privacy Policy for PhotoPromptsHub"
      seoDescription="Read the PhotoPromptsHub Privacy Policy covering browser storage, cookies, future Google AdSense use, external links, and your privacy choices."
      breadcrumbs={breadcrumbs}
      eyebrow="Privacy Policy"
      meta={["Last updated March 10, 2026", "No account registration required"]}
      schema={[
        buildBreadcrumbSchema(breadcrumbs),
        buildWebPageSchema({
          title: `Privacy Policy | ${SITE_NAME}`,
          description:
            "Privacy Policy for PhotoPromptsHub covering limited browsing data, cookies, local storage, future advertising services, and contact information.",
          path: "/privacy-policy"
        })
      ]}
    >
      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Introduction</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          This Privacy Policy explains how information may be collected, used, and stored when you visit {SITE_NAME}. The website is designed as a prompt discovery platform for AI photo prompts, example images, and creative inspiration. You can browse the site without creating an account.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Information We Collect</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          PhotoPromptsHub does not require account registration, and it does not ask visitors to create a login before browsing prompts. When you visit the site, limited information may still be received through normal website operation, such as basic website usage data, browser or device information, and standard technical request data used to load pages and keep the site working.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          The site also uses browser-based storage for certain user preferences and on-site features. That can include saved prompts, local copy-count tracking, and theme preference settings stored on your device. If analytics tools are added in the future, they may collect aggregated usage data such as page visits, traffic sources, and general interaction patterns.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Cookies and Tracking Technologies</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Cookies are small text files that websites may place on a visitor’s device to remember preferences, understand site usage, improve performance, or support advertising features. Similar technologies may also be used through browser storage.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          PhotoPromptsHub may use cookies or similar technologies to support core site behavior, improve the browsing experience, and remember local settings. Third-party services used by the site may also use cookies or similar tracking technologies under their own policies.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Google AdSense and Advertising</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          This website may use third-party advertising services such as Google AdSense in the future. If enabled, third-party vendors, including Google, may use cookies to serve ads based on a user’s previous visits to this website or other websites.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Advertising cookies may be used to show more relevant ads and to measure ad performance. Users may opt out of personalized advertising by visiting Google Ads Settings. If advertising is enabled later, this policy may be updated to reflect the services being used at that time.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Third-Party Services</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          PhotoPromptsHub may rely on third-party services for website hosting, content delivery, prompt data delivery, analytics tools if added in the future, and advertising services if enabled later. These services may process technical information according to their own privacy practices.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">User Privacy Choices</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          You can control cookies and similar technologies through your browser settings. You may also clear local browser storage at any time, which can remove saved prompts, theme preferences, or other locally stored site settings from your device.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Children&apos;s Information</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            PhotoPromptsHub is not directed to children under the age of 13. The website does not intentionally collect personal information from children.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Data Security</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Reasonable measures are taken to keep the website and related information secure. However, no method of transmission or storage is completely secure, so absolute security cannot be guaranteed.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">External Links</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The website may link to third-party platforms or services. PhotoPromptsHub does not control those external websites and is not responsible for their privacy practices or content.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
          <h2 className="font-heading text-2xl font-semibold text-brand-ink">Changes to This Policy</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This Privacy Policy may be updated from time to time to reflect changes in the website, legal requirements, or future services. The latest version will always be published on this page.
          </p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-soft sm:p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-ink">Contact</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          If you have any privacy-related questions about PhotoPromptsHub, you can contact us at{" "}
          <a className="font-semibold text-brand-accent" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </ContentPageLayout>
  );
}

export default PrivacyPolicy;
