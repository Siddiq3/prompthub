export function generateMetadata() {
  return {
    title: "Terms of Service | PhotoPromptsHub",
    description: "Review the terms of use for PhotoPromptsHub and how our services are provided.",
  };
}

export default function TermsPage() {
  return (
    <div className="prose prose-invert max-w-4xl text-slate-100">
      <h1>Terms of Service</h1>
      <p className="text-sm text-slate-500">Last updated: May 2026</p>

      <h2>Agreement</h2>
      <p>
        By using PhotoPromptsHub, you agree to these terms of service. PhotoPromptsHub provides access to a library of AI image prompts and related content for creative use. Please read these terms carefully before using the site.
      </p>

      <h2>Permitted Use</h2>
      <p>
        You may browse, save, and use prompts for personal or commercial projects in accordance with the terms of the underlying AI tools you choose. The prompts on this site are provided for inspiration and creative workflows only.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on PhotoPromptsHub is owned or licensed by PhotoPromptsHub. You may use prompts as a starting point, but you may not republish the site content or prompt library as your own service without permission.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        The site and all materials are provided "as is" without warranties of any kind. PhotoPromptsHub does not guarantee results, accuracy, or suitability for any particular use. You are responsible for verifying prompt outputs and compliance with platform terms.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        PhotoPromptsHub is not liable for any direct, indirect, incidental, special, or consequential damages arising from use of the site or generated content. Use the prompts at your own discretion.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about these terms, please contact us at <a href="mailto:hello@photopromptshub.in">hello@photopromptshub.in</a>.
      </p>
    </div>
  );
}
