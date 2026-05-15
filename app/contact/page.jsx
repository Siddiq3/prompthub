export const metadata = {
  title: "Contact - PhotoPromptsHub",
  description: "Get in touch with PhotoPromptsHub for questions, suggestions, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-8 text-4xl font-bold">Contact Us</h1>
      
      <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
        Have a question or suggestion? We'd love to hear from you!
      </p>

      <div className="rounded-lg border border-slate-200 p-8 dark:border-slate-700">
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">Email</h3>
          <p>
            <a
              href="mailto:hello@photopromptshub.in"
              className="text-brand-primary hover:underline"
            >
              hello@photopromptshub.in
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 font-semibold">What to write about</h3>
          <ul className="list-inside list-disc space-y-1 text-slate-600 dark:text-slate-400">
            <li>Suggest new prompts or collections</li>
            <li>Report broken or outdated content</li>
            <li>Ask about our API or data</li>
            <li>Partnership opportunities</li>
            <li>General feedback or ideas</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          We try to respond to all emails within 48 hours. Thank you for reaching out!
        </p>
      </div>
    </div>
  );
}
