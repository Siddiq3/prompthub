export const metadata = {
  title: "About - PhotoPromptsHub",
  description: "Learn about PhotoPromptsHub and our mission to make AI image prompting accessible to everyone.",
};

export default function AboutPage() {
  return (
    <div className="prose dark:prose-invert max-w-3xl">
      <h1>About PhotoPromptsHub</h1>
      
      <p>
        PhotoPromptsHub is a curated library of AI image prompts designed for creative professionals and enthusiasts using tools like Midjourney, DALL·E, Flux, and Stable Diffusion.
      </p>

      <h2>Our Mission</h2>
      <p>
        We believe AI image generation should be accessible to everyone. Our mission is to provide high-quality, tested prompts that help you create stunning images without needing to be a prompt engineering expert.
      </p>

      <h2>What We Do</h2>
      <ul>
        <li>Curate thousands of tested AI image prompts</li>
        <li>Organize prompts by category, style, and use case</li>
        <li>Provide tips and guides for better image generation</li>
        <li>Keep our library updated with new and trending prompts</li>
      </ul>

      <h2>Supported AI Tools</h2>
      <p>Our prompts work with:</p>
      <ul>
        <li>Midjourney</li>
        <li>DALL·E (OpenAI)</li>
        <li>Flux (Black Forest Labs)</li>
        <li>Stable Diffusion</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        Have questions or suggestions? Feel free to <a href="/contact">contact us</a>.
      </p>
    </div>
  );
}
