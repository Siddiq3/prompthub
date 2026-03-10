import { Link } from "react-router-dom";
import { COUNTRY, OWNER_NAME, SITE_NAME, STATE, SUPPORT_EMAIL } from "../config";
import { useAppContext } from "../context/AppContext";
import { getCollectionHighlights, getPopularCategories } from "../lib/content";

function Footer() {
  const { prompts } = useAppContext();
  const categories = getPopularCategories(prompts, 6);
  const collections = getCollectionHighlights(prompts, 4);

  return (
    <footer className="mt-24 rounded-t-[2.75rem] border-t border-slate-200 bg-[#132238] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] lg:px-8">
        <div className="max-w-md">
          <p className="section-kicker text-brand-gold">PhotoPromptsHub</p>
          <h4 className="mt-4 font-heading text-4xl font-semibold text-white">{SITE_NAME}</h4>
          <p className="mt-5 text-sm leading-8 text-slate-200">
            PhotoPromptsHub curates AI photo prompts, example images, and content-focused landing pages so creators can discover prompts faster and explore related categories and collections with confidence.
          </p>
          <p className="mt-5 text-sm text-slate-300">
            Support:{" "}
            <a className="font-medium text-white transition hover:text-brand-gold" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Independent project by {OWNER_NAME} in {STATE}, {COUNTRY}
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-300">
            Browse realistic AI prompts, latest photo prompts, cinematic concepts, fashion editorials, wedding inspiration, and free prompt ideas for modern image generation tools.
          </p>
          <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
            Clear About, Contact, Privacy, Terms, Disclaimer, and DMCA pages are published for transparency and manual review quality.
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { label: "Prompts", to: "/prompts" },
              { label: "Latest", to: "/latest" },
              { label: "Trending", to: "/trending" },
              { label: "Collections", to: "/collections" }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full border border-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:border-brand-gold/40 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="section-kicker text-brand-gold">Start Here</p>
          <div className="mt-5 grid gap-3 text-sm">
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40" to="/">
              Homepage
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40" to="/prompts">
              All Prompts
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40" to="/latest">
              Latest Prompts
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40" to="/trending">
              Trending Prompts
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40" to="/categories">
              Browse Categories
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40" to="/collections">
              Browse Collections
            </Link>
          </div>
        </div>

        <div>
          <p className="section-kicker text-brand-gold">Top Categories</p>
          <div className="mt-5 grid gap-3 text-sm">
            {categories.map((category) => (
              <Link
                key={category.slug}
                className="text-slate-200 transition hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40"
                to={category.href}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="section-kicker text-brand-gold">Top Collections</p>
          <div className="mt-5 grid gap-3 text-sm">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                className="text-slate-200 transition hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40"
                to={collection.href}
              >
                {collection.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="section-kicker text-brand-gold">Trust & Legal</p>
          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
            Support, legal, privacy, and content-removal routes are linked here for users and review teams.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Questions or removal requests can be sent to{" "}
            <a className="font-medium text-white transition hover:text-brand-gold" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <div className="mt-5 grid gap-3 text-sm">
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white" to="/about">
              About Us
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white" to="/contact">
              Contact Us
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white" to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white" to="/terms">
              Terms & Conditions
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white" to="/disclaimer">
              Disclaimer
            </Link>
            <Link className="text-slate-200 transition hover:translate-x-1 hover:text-white" to="/dmca">
              DMCA / Content Removal
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-300">
        {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Clear contact, policy, and content-removal links are available above.
      </div>
    </footer>
  );
}

export default Footer;
