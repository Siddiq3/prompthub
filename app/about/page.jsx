export function generateMetadata() {
  return {
    title: "About Us | PhotoPromptsHub",
    description: "Learn about PhotoPromptsHub, our mission, and how we curate AI image prompts for creators.",
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-clash font-bold mb-4">About PhotoPromptsHub</h1>
          <p className="text-slate-300 text-lg leading-relaxed">Learn about our mission to empower creators with high-quality AI image prompts.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">What We Do</h2>
            <p className="text-slate-700 leading-8 text-lg">
              PhotoPromptsHub is the comprehensive resource for photographers, designers, and AI artists who want better image generation outcomes without guesswork. We organize and maintain a fast, searchable library of prompts for Midjourney, DALL·E, Flux, Stable Diffusion, and more. Every prompt is selected for clarity, creative impact, and ease of use.
            </p>
            <p className="text-slate-700 leading-8 text-lg mt-4">
              Our site exists because prompt engineering should feel simple, not overwhelming. We provide structured prompt examples so you can copy, paste, and refine outputs quickly. Whether you are creating editorial photography, cinematic scenes, digital illustrations, or product visuals, our library is designed to help you get there faster.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-700 leading-8 text-lg">
              We believe that the best AI image prompts are clear, dependable, and adaptable. Our mission is to make prompt discovery effortless for creators at every skill level. We update prompts regularly so the library stays relevant with the latest model improvements and visual trends.
            </p>
            <p className="text-slate-700 leading-8 text-lg mt-4">
              At PhotoPromptsHub, we care about quality, accessibility, and practical creativity. This means organizing prompts by category, model, theme, and use case so you can find the right setup for any project.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">How This Site Works</h2>
            <p className="text-slate-700 leading-8 text-lg">
              We curate prompts in categories like portrait, landscape, product, sci-fi, and more. Each prompt includes helpful tags, an AI model recommendation, and copy-ready text. Our advanced filtering system helps you narrow down prompts by model, mood, palette, and subject matter.
            </p>
            <p className="text-slate-700 leading-8 text-lg mt-4">
              PhotoPromptsHub is built for creative flow. The interface is designed to be lightweight and fast, with search, categories, and saved prompts available instantly so you can stay in the creative zone.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">Why We Exist</h2>
            <p className="text-slate-700 leading-8 text-lg">
              AI image platforms are powerful, but the difference between an average result and a great one often comes down to the prompt. We exist to bridge that gap by giving you the best starting point for visual storytelling.
            </p>
            <p className="text-slate-700 leading-8 text-lg mt-4">
              If you want a prompt library that is grounded in real use and built for speed, this is the place to begin.
            </p>
          </section>

          <section className="bg-slate-50 rounded-2xl p-8">
            <h2 className="text-2xl font-clash font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-slate-700 leading-8">
              If you have ideas, feature requests, or prompt suggestions, please visit our <a href="/contact" className="font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition">contact page</a>. We love hearing from creators and improving the library based on real feedback.
            </p>
            <a href="/contact" className="inline-block mt-6 px-6 py-3 bg-[#7C3AED] text-white font-semibold rounded-full hover:bg-[#6D28D9] transition">
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
