export function generateMetadata() {
  return {
    title: "About Us | PhotoPromptsHub",
    description: "Learn about PhotoPromptsHub, our mission, and how we curate AI image prompts for creators.",
  };
}

export default function AboutPage() {
  return (
    <div className="prose prose-invert max-w-3xl text-slate-100">
      <h1>About PhotoPromptsHub</h1>
      <p>
        PhotoPromptsHub is the resource for photographers, designers, and AI artists who want better image generation outcomes without guesswork. We organize and maintain a fast, searchable library of prompts for Midjourney, DALL·E, Flux, Stable Diffusion, and more. Every prompt is selected for clarity, creative impact, and ease of use.
      </p>
      <p>
        Our site exists because prompt engineering should feel simple, not overwhelming. We provide structured prompt examples so you can copy, paste, and refine outputs quickly. Whether you are creating editorial photography, cinematic scenes, digital illustrations, or product visuals, our library is designed to help you get there faster.
      </p>
      <h2>Our Mission</h2>
      <p>
        We believe that the best AI image prompts are clear, dependable, and adaptable. Our mission is to make prompt discovery effortless for creators at every skill level. We update prompts regularly so the library stays relevant with the latest model improvements and visual trends.
      </p>
      <p>
        At PhotoPromptsHub, we care about quality, accessibility, and practical creativity. This means organizing prompts by category, model, theme, and use case so you can find the right setup for any project.
      </p>
      <h2>How This Site Works</h2>
      <p>
        We curate prompts in categories like portrait, landscape, product, sci-fi, and more. Each prompt includes helpful tags, an AI model recommendation, and copy-ready text. If you want to explore new styles, our filters help you narrow down prompts by model, mood, palette, and subject.
      </p>
      <p>
        PhotoPromptsHub is built for creative flow. The interface is designed to be lightweight and fast, with search, categories, and saved prompts available instantly so you can stay in the creative zone.
      </p>
      <h2>Why We Exist</h2>
      <p>
        AI image platforms are powerful, but the difference between an average result and a great one often comes down to the prompt. We exist to bridge that gap by giving you the best starting point for visual storytelling.
      </p>
      <p>
        If you want a prompt library that is grounded in real use and built for speed, this is the place to begin.
      </p>
      <h2>Get In Touch</h2>
      <p>
        If you have ideas, feature requests, or prompt suggestions, please visit our <a href="/contact">contact page</a>. We love hearing from creators and improving the library based on real feedback.
      </p>
    </div>
  );
}
