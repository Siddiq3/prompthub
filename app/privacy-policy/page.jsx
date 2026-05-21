export function generateMetadata() {
  return {
    title: "Privacy Policy | PhotoPromptsHub",
    description: "Read how PhotoPromptsHub collects, uses, and protects your data on photopromptshub.in.",
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="prose prose-invert max-w-4xl text-slate-100">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-slate-500">Last updated: May 2026</p>

      <h2>Introduction</h2>
      <p>
        PhotoPromptsHub respects your privacy and is committed to protecting your personal information. This policy explains what data we collect, why we collect it, and how it is used when you visit photopromptshub.in.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect the following types of information to improve the site and personalize your experience:
      </p>
      <ul>
        <li>
          <strong>Usage data:</strong> anonymous information about how you browse the site, pages visited, and search activity.
        </li>
        <li>
          <strong>Cookies:</strong> small files stored in your browser to remember your preferences and site settings.
        </li>
        <li>
          <strong>Browser data:</strong> details about your device, browser type, and location derived from standard web requests.
        </li>
      </ul>

      <h2>Saved Prompts and Local Storage</h2>
      <p>
        When you save a prompt on PhotoPromptsHub, that data is stored locally in your browser's storage. We do not collect or transmit saved prompt data to our servers unless you explicitly share it through a supported feature.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use analytics and other third-party services to monitor performance and improve the site. These services may use cookies or similar tracking technologies. We do not sell your personal data.
      </p>

      <h2>Cookies and Tracking</h2>
      <p>
        Cookies are used to save preferences, manage the cookie consent banner, and support analytics. You can disable cookies in your browser settings, but some site features may not function as intended.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions or requests about your data, please contact us at <a href="mailto:hello@photopromptshub.in">hello@photopromptshub.in</a>.
      </p>
    </div>
  );
}
