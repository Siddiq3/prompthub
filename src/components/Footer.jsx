import { Link } from "react-router-dom";
import { OWNER_NAME, SITE_DOMAIN, SITE_NAME, SUPPORT_EMAIL } from "../config";
import { useAppContext } from "../context/AppContext";
import { getCategories, getCollections } from "../lib/content";

function Footer() {
  const { prompts } = useAppContext();
  const categoryOrder = ["Kids", "Wedding", "Fashion", "Portrait", "Sports", "Cinematic"];
  const collectionOrder = [
    "midjourney-photo-prompts",
    "dalle-photo-prompts",
    "flux-photo-prompts",
    "stable-diffusion-photo-prompts"
  ];
  const allCategories = getCategories(prompts);
  const allCollections = getCollections(prompts);
  const categories = categoryOrder
    .map((name) => allCategories.find((category) => category.name === name))
    .filter(Boolean);
  const collections = collectionOrder
    .map((slug) => allCollections.find((collection) => collection.slug === slug))
    .filter(Boolean);
  const exploreLinks = [
    { label: "All Prompts", to: "/prompts" },
    { label: "Latest Prompts", to: "/latest" },
    { label: "Trending Prompts", to: "/trending" },
    { label: "Categories", to: "/categories" },
    { label: "Collections", to: "/collections" }
  ];
  const trustLinks = [
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Disclaimer", to: "/disclaimer" },
    { label: "DMCA / Content Removal", to: "/dmca" }
  ];

  return (
    <footer className="mt-24 border-t border-white/10 bg-[#033754] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 sm:py-14 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,0.85fr))] xl:gap-10">
          <div className="max-w-md">
            <p className="section-kicker text-white/80">PhotoPromptsHub</p>
            <p className="mt-3 font-heading text-[1.9rem] font-semibold tracking-tight text-white">
              {SITE_NAME}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              A straightforward prompt library for creators who want clear browsing, useful prompt pages, and simple ways to keep exploring.
            </p>
            <a
              className="mt-5 inline-flex w-fit items-center rounded-[1rem] border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors duration-180 ease-smooth hover:bg-white/[0.14]"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.08] p-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/75">
                Trust signals
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Questions, corrections, privacy requests, and DMCA matters can all be sent directly to support. The site also keeps its contact and policy pages easy to find.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                {SITE_DOMAIN}
              </p>
            </div>
            <div className="mt-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/75">
                Quick collections
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {collections.map((collection) => (
                  <Link
                    key={collection.slug}
                    className="rounded-pill border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/85 transition-colors duration-180 ease-smooth hover:bg-white/[0.14] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    to={collection.href}
                  >
                    {collection.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-white">Explore</p>
            <nav className="mt-4 grid gap-3">
              {exploreLinks.map((link) => (
                <Link
                  key={link.to}
                  className="text-sm text-slate-200 transition-colors duration-180 ease-smooth hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  to={link.to}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-white">Top Categories</p>
            <nav className="mt-4 grid gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  className="text-sm text-slate-200 transition-colors duration-180 ease-smooth hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  to={category.href}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-white">Trust & Legal</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              If you need policy details or a direct way to get in touch, the important pages are linked here without making the rest of the site harder to browse.
            </p>
            <nav className="mt-4 grid gap-3">
              {trustLinks.map((link) => (
                <Link
                  key={link.to}
                  className="text-sm text-slate-200 transition-colors duration-180 ease-smooth hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  to={link.to}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="bg-[#db2b39] px-4 py-3.5 text-center text-sm font-medium text-white sm:px-6 lg:px-8">
        <span>Copyrights © {new Date().getFullYear()} {SITE_NAME}. </span>
        <span>Developed by </span>
        <a
          className="signature-script text-white underline-offset-4 transition hover:text-white/90 hover:underline"
          href="https://www.instagram.com/siddiqkolimi/"
          target="_blank"
          rel="noreferrer"
        >
          {OWNER_NAME}
        </a>
        <span>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
