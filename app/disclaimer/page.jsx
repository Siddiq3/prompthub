export const metadata = {
  title: "Disclaimer - PhotoPromptsHub",
  description: "Our disclaimer - important information about using PhotoPromptsHub.",
};

export default function DisclaimerPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl">
      <h1>Disclaimer</h1>
      <p className="text-sm text-slate-500">Last updated: January 2024</p>

      <h2>No Professional Advice</h2>
      <p>
        The content on PhotoPromptsHub is provided for informational and educational purposes only.
      </p>

      <h2>Prompts "As Is"</h2>
      <p>
        All prompts on PhotoPromptsHub are provided "as is" without any warranty or guarantee.
      </p>

      <h2>AI Tool Compatibility</h2>
      <p>
        PhotoPromptsHub is not affiliated with Midjourney, OpenAI, Black Forest Labs, or StabilityAI.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Disclaimer, please contact us at <a href="mailto:hello@photopromptshub.in">hello@photopromptshub.in</a>
      </p>
    </div>
  );
}
