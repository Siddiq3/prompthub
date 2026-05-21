export function generateMetadata() {
  return {
    title: "Contact | PhotoPromptsHub",
    description: "Reach out to PhotoPromptsHub for support, feedback, prompt ideas, or partnership inquiries.",
  };
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div className="rounded-3xl border border-white/10 bg-[#0B0E1A] p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        <p className="mt-4 text-slate-300 leading-8">
          Have a question about prompts, need help with the site, or want to suggest a new category or feature? PhotoPromptsHub is here to help. We welcome feedback from creators, designers, photographers, and AI artists who want better results from their image generation workflows.
        </p>
        <p className="text-slate-300 leading-8">
          Send us a message about anything from prompt recommendations to broken links, model compatibility, or the kinds of prompts you want to see next. We want this library to be useful, fast, and full of prompts that spark creative work.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Email</h2>
          <p className="text-slate-300 leading-8 mb-4">
            For general inquiries, support, or prompt submissions, email us at:
          </p>
          <a href="mailto:hello@photopromptshub.in" className="text-[#7C3AED] hover:underline">
            hello@photopromptshub.in
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Contact form</h2>
          <p className="text-slate-300 leading-8 mb-4">
            Use the form below to contact us directly. We will follow up on feedback, bug reports, prompt ideas, and partnership requests as quickly as possible.
          </p>
          <form
            action="https://formspree.io/f/your-form-id"
            method="POST"
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-slate-200">
              Your email
              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
              />
            </label>
            <label className="block text-sm font-medium text-slate-200">
              Message
              <textarea
                name="message"
                rows="5"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9]"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
