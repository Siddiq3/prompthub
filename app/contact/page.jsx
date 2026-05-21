export function generateMetadata() {
  return {
    title: "Contact | PhotoPromptsHub",
    description: "Reach out to PhotoPromptsHub for support, feedback, prompt ideas, or partnership inquiries.",
  };
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-clash font-bold mb-4">Contact Us</h1>
          <p className="text-slate-300 text-lg leading-relaxed">Have questions? We'd love to hear from you. Reach out with feedback, support requests, or partnership inquiries.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-clash font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-slate-700 leading-8 text-lg mb-6">
              PhotoPromptsHub welcomes feedback from creators, designers, photographers, and AI artists. Send us a message about anything from prompt recommendations to broken links, feature suggestions, model compatibility questions, or partnership opportunities.
            </p>
            <p className="text-slate-700 leading-8 text-lg">
              We aim to respond to all inquiries within 1-3 business days. For urgent matters or legal concerns, please mention that in your subject line so we can prioritize accordingly.
            </p>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-xl font-clash font-bold text-slate-900 mb-3">Email Support</h3>
              <p className="text-slate-700 leading-7 mb-4">
                Reach us directly by email for any questions or feedback:
              </p>
              <a href="mailto:hello@photopromptshub.in" className="inline-block px-6 py-3 bg-[#7C3AED] text-white font-semibold rounded-full hover:bg-[#6D28D9] transition">
                hello@photopromptshub.in
              </a>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-xl font-clash font-bold text-slate-900 mb-3">Common Requests</h3>
              <ul className="text-slate-700 leading-7 space-y-2 text-sm">
                <li>✓ Prompt suggestions and feedback</li>
                <li>✓ Technical support and bug reports</li>
                <li>✓ Content corrections</li>
                <li>✓ Partnership inquiries</li>
                <li>✓ Privacy or policy questions</li>
                <li>✓ Content removal requests</li>
              </ul>
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl font-clash font-bold mb-6">What To Include In Your Message</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-[#7C3AED] font-bold text-xl">1.</div>
                <div>
                  <p className="font-semibold text-white">Your Contact Information</p>
                  <p className="text-slate-300 text-sm mt-1">Provide a working email address so we can respond to you</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-[#7C3AED] font-bold text-xl">2.</div>
                <div>
                  <p className="font-semibold text-white">Clear Subject</p>
                  <p className="text-slate-300 text-sm mt-1">Tell us what your message is about (feedback, bug report, etc.)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-[#7C3AED] font-bold text-xl">3.</div>
                <div>
                  <p className="font-semibold text-white">Specific Details</p>
                  <p className="text-slate-300 text-sm mt-1">Include URLs, prompt IDs, or specific descriptions to help us assist you faster</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 rounded-2xl p-8">
            <h2 className="text-2xl font-clash font-bold text-slate-900 mb-4">Legal & Policy Inquiries</h2>
            <p className="text-slate-700 leading-8 mb-6">
              For privacy concerns, policy questions, or content removal requests, please refer to our dedicated pages:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/privacy-policy" className="inline-block px-4 py-2 border-2 border-[#7C3AED] text-[#7C3AED] font-semibold rounded-full hover:bg-[#7C3AED] hover:text-white transition text-center">
                Privacy Policy
              </a>
              <a href="/terms" className="inline-block px-4 py-2 border-2 border-[#7C3AED] text-[#7C3AED] font-semibold rounded-full hover:bg-[#7C3AED] hover:text-white transition text-center">
                Terms & Conditions
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
