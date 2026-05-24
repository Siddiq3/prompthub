export function generateMetadata() {
  return {
    title: "About Us | PhotoPromptsHub - AI Photography Prompts",
    description: "Learn about PhotoPromptsHub, a curated library of photography prompts for ChatGPT and Gemini AI image generation.",
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
              PhotoPromptsHub is a curated library of photography prompts for ChatGPT and Gemini AI image generation. We focus on creating practical, creative prompts designed for photographers, designers, and visual creators who want professional results without guesswork. Every prompt is tested and selected for clarity, visual impact, and effectiveness.
            </p>
            <p className="text-slate-700 leading-8 text-lg mt-4">
              Our site exists because great AI image results come from great prompts. We provide structured, copy-ready examples so you can generate stunning images quickly—whether you're creating portraits, fashion editorials, cinematic scenes, or lifestyle photography.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-700 leading-8 text-lg">
              Our mission is to make photography prompt discovery effortless for creators using ChatGPT and Gemini. We believe the best prompts are clear, reliable, and immediately usable. We organize photography ideas by category, mood, style, and creative direction so you can find exactly what you need.
            </p>
            <p className="text-slate-700 leading-8 text-lg mt-4">
              At PhotoPromptsHub, we care about quality, accessibility, and practical creativity. This means curating every prompt with a photographer's eye and organizing them in ways that make sense for visual creators.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-clash font-bold text-slate-900 mb-4">How This Site Works</h2>
            <p className="text-slate-700 leading-8 text-lg">
              We curate photography prompts in categories like portraits, fashion, cinematic, lifestyle, and more. Each prompt is ready to copy and includes helpful tags, photography direction, and mood guidance. Search or filter by style, subject, or creative intent.
            </p>
            <p className="text-slate-700 leading-8 text-lg mt-4">
              PhotoPromptsHub is built for creative flow. The interface is lightweight and fast, with instant access to search, categories, trending ideas, and saved prompts—so you stay in the creative zone.
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
