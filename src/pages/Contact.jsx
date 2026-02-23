import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_CHANNEL_URL } from "../config";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-soft dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Contact Us
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          We are here to help. If you have questions about prompts, policies, ads, or technical issues,
          feel free to reach out and we will do our best to respond quickly.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-brand-border bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Direct Contact</h2>
            <div className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-brand-secondary dark:text-brand-accent" />
                hello@photoprompthub.com
              </p>
              <p className="flex items-center gap-2">
                <FaWhatsapp className="text-brand-secondary dark:text-brand-accent" />
                <a
                  href={WHATSAPP_CHANNEL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-900 underline decoration-blue-300 underline-offset-2 transition hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
                >
                  Join our WhatsApp Channel
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-brand-secondary dark:text-brand-accent" />
                Business support available online
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Before You Message</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              For faster support, include a clear subject such as "Policy Question", "Ad Issue", "Prompt
              Error", or "Feature Request". We appreciate concise details and screenshots when relevant.
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              We usually respond within 1-2 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Contact;
