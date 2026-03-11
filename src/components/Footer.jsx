import { Link } from "react-router-dom";
import { OWNER_NAME, SITE_NAME, SUPPORT_EMAIL } from "../config";
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
    <footer className="mt-24 border-t border-white/10 bg-[#033f63] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,1.25fr)_repeat(4,minmax(0,0.82fr))] xl:gap-12">
          <div className="max-w-sm">
            <p className="section-kicker text-white/70">PhotoPromptsHub</p>
            <h4 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-white">
              {SITE_NAME}
            </h4>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Curated AI photo prompts, preview images, and collections for faster creative discovery.
            </p>
            <a
              className="mt-5 inline-flex w-fit items-center rounded-[1rem] border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors duration-180 ease-smooth hover:bg-white/15"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
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
            <p className="text-sm font-semibold tracking-tight text-white">Top Collections</p>
            <nav className="mt-4 grid gap-3">
              {collections.map((collection) => (
                <Link
                  key={collection.slug}
                  className="text-sm text-slate-200 transition-colors duration-180 ease-smooth hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  to={collection.href}
                >
                  {collection.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-white">Trust & Legal</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Clear support and policy links help visitors understand how the platform operates.
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

      <div className="bg-[#db2b39] px-4 py-4 text-center text-sm font-medium text-white sm:px-6 lg:px-8">
        <span>Copyrights © {new Date().getFullYear()} {SITE_NAME}. </span>
        <span>Developed by </span>
        <a
          className="signature-script text-[#033f63] underline-offset-4 transition hover:text-[#022c45] hover:underline"
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
