import { Link } from "react-router-dom";
import Seo from "../seo/Seo";

function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you requested could not be found on PhotoPromptsHub."
        path="/"
        noindex
      />
      <section className="rounded-[2rem] border border-slate-200 bg-white/92 p-8 text-center shadow-soft">
        <h1 className="font-heading text-4xl font-semibold text-brand-ink">Page not found</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          The URL you requested does not match an available page. Return to the homepage or browse the main prompt gallery to continue.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-ink/90"
          >
            Home
          </Link>
          <Link
            to="/prompts"
            className="rounded-full border border-brand-ink px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-ink hover:text-white"
          >
            Browse prompts
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;
