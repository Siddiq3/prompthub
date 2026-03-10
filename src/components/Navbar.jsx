import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaBars, FaCameraRetro, FaTimes } from "react-icons/fa";
import { SITE_NAME } from "../config";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "Prompts", to: "/prompts" },
  { label: "Categories", to: "/categories" },
  { label: "Collections", to: "/collections" },
  { label: "Latest", to: "/latest" },
  { label: "Trending", to: "/trending" },
  { label: "Saved", to: "/saved" },
  { label: "About", to: "/about" }
];

const policyLinks = [
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "DMCA", to: "/dmca" }
];

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-brand-ink text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-brand-ink"
  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams, pathname]);

  const showSearch = useMemo(() => !pathname.startsWith("/prompt/"), [pathname]);
  const submitSearch = (value) => {
    const next = value.trim();
    navigate(next ? `/prompts?q=${encodeURIComponent(next)}` : "/prompts");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f7f4ee]/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-2 py-1.5 text-brand-ink transition hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30"
          onClick={closeMenu}
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-ink text-white shadow-[0_14px_24px_-18px_rgba(19,34,56,0.65)]">
            <FaCameraRetro />
          </span>
          <span className="font-heading text-[1.35rem] font-semibold tracking-tight text-brand-ink sm:text-[1.5rem]">
            {SITE_NAME}
          </span>
        </Link>

        {showSearch && (
          <div className="hidden flex-1 lg:block">
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={submitSearch}
              buttonLabel="Go"
              placeholder="Search AI photo prompts"
              className="mx-auto max-w-2xl"
            />
          </div>
        )}

        <div className="ml-auto hidden items-center gap-1 xl:flex">
          {primaryLinks.slice(0, 6).map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <div className="xl:hidden">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-ink transition hover:border-brand-accent hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30 xl:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-[#f7f4ee] px-4 pb-5 pt-4 xl:hidden">
          {showSearch && (
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={submitSearch}
              placeholder="Search prompts"
              className="mb-3"
            />
          )}

          <nav className="grid gap-1">
            {primaryLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} onClick={closeMenu}>
                {link.label}
              </NavLink>
            ))}
            {policyLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} onClick={closeMenu}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <p className="mt-4 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            Browse SEO-ready prompt collections, latest additions, and legal/trust pages from the navigation above.
          </p>
        </div>
      )}
    </header>
  );
}

export default Navbar;
