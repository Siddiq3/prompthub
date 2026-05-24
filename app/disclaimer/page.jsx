export function generateMetadata() {
  return {
    title: "Disclaimer | PhotoPromptsHub",
    description: "Understand the disclaimer for PhotoPromptsHub and what the site does and does not guarantee.",
  };
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-clash font-bold mb-4">Disclaimer</h1>
          <p className="text-slate-300 text-lg">Last updated: May 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-10">
          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">Informational Use Only</h2>
            <p className="text-slate-700 leading-8 text-lg">
              The content on PhotoPromptsHub is provided for informational and creative use only. We share prompt examples and guidance, but the results you get from AI platforms may vary. The site is not a substitute for professional advice or tool-specific documentation.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">No Guarantees</h2>
            <p className="text-slate-700 leading-8 text-lg">
              All prompts and recommendations are provided "as is". PhotoPromptsHub does not guarantee that any prompt will produce a specific result, and we are not responsible for how third-party AI services interpret or render prompts.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">Third-Party Services</h2>
            <p className="text-slate-700 leading-8 text-lg">
              PhotoPromptsHub is not affiliated with any third-party AI platform. References to external AI services are provided for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">User Responsibility</h2>
            <p className="text-slate-700 leading-8 text-lg">
              You are responsible for using prompts in accordance with the terms of the AI platform you choose. If you reuse generated content or prompts for commercial or public purposes, review the licensing and usage terms of the tool.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">Contact</h2>
            <p className="text-slate-700 leading-8 text-lg">
              If you have questions about this disclaimer, please contact us at <a href="mailto:hello@photopromptshub.in" className="text-[#7C3AED] hover:underline">hello@photopromptshub.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
