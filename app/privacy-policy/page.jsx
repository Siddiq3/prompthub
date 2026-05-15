export const metadata = {
  title: "Privacy Policy - PhotoPromptsHub",
  description: "Our privacy policy - learn how we handle your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-slate-500">Last updated: January 2024</p>

      <h2>Introduction</h2>
      <p>
        PhotoPromptsHub ("we", "our", or "us") operates the photopromptshub.in website. This page informs you of our policies regarding the collection, use, and disclosure of personal data.
      </p>

      <h2>Information Collection and Use</h2>
      <p>We collect information in the following ways:</p>
      <ul>
        <li><strong>Usage Data:</strong> We collect information about how you interact with our site</li>
        <li><strong>Cookies:</strong> We use cookies to store your preferences</li>
        <li><strong>Analytics:</strong> We use Google Analytics to understand user behavior</li>
      </ul>

      <h2>Saved Prompts</h2>
      <p>
        When you save prompts, this information is stored locally on your device in your browser's storage. We do not collect this data on our servers.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@photopromptshub.in">hello@photopromptshub.in</a>
      </p>
    </div>
  );
}
