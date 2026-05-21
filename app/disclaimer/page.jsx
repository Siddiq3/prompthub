export function generateMetadata() {
  return {
    title: "Disclaimer | PhotoPromptsHub",
    description: "Understand the disclaimer for PhotoPromptsHub and what the site does and does not guarantee.",
  };
}

export default function DisclaimerPage() {
  return (
    <div className="prose prose-invert max-w-4xl text-slate-100">
      <h1>Disclaimer</h1>
      <p className="text-sm text-slate-500">Last updated: May 2026</p>

      <h2>Informational Use Only</h2>
      <p>
        The content on PhotoPromptsHub is provided for informational and creative use only. We share prompt examples and guidance, but the results you get from AI platforms may vary. The site is not a substitute for professional advice or tool-specific documentation.
      </p>

      <h2>No Guarantees</h2>
      <p>
        All prompts and recommendations are provided "as is". PhotoPromptsHub does not guarantee that any prompt will produce a specific result, and we are not responsible for how third-party AI services interpret or render prompts.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        PhotoPromptsHub is not affiliated with Midjourney, OpenAI, Flux, Stable Diffusion, or any other AI vendor. References to these services are for informational purposes only.
      </p>

      <h2>User Responsibility</h2>
      <p>
        You are responsible for using prompts in accordance with the terms of the AI platform you choose. If you reuse generated content or prompts for commercial or public purposes, review the licensing and usage terms of the tool.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this disclaimer, please contact us at <a href="mailto:hello@photopromptshub.in">hello@photopromptshub.in</a>.
      </p>
    </div>
  );
}
