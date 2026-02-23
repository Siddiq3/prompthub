import { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaCameraRetro, FaTimes } from "react-icons/fa";
import { SITE_NAME } from "../config";
import { useAppContext } from "../context/AppContext";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "Saved", to: "/saved" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

const policyLinks = [
  { label: "Privacy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" }
];

const linkClass = ({ isActive }) =>
  `rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-white/15 text-white"
      : "text-white/90 hover:text-blue-200 hover:bg-white/10"
  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { searchQuery, setSearchQuery } = useAppContext();

  const showSearch = useMemo(() => pathname === "/" || pathname === "/saved", [pathname]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-800 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-2xl px-2 py-1 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          onClick={closeMenu}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white">
            <FaCameraRetro />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white sm:text-base">{SITE_NAME}</span>
        </Link>

        {showSearch && (
          <div className="hidden flex-1 md:block">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by title, tags, or category"
              className="mx-auto max-w-xl border-white/30 bg-white/95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        )}

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          {policyLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <button
            type="button"
            disabled
            className="ml-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white/65"
            title="Submit Prompt coming soon"
          >
            Submit Prompt
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-blue-800 bg-blue-900 px-4 pb-4 pt-3 lg:hidden">
          {showSearch && (
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search prompts"
              className="mb-3 border-white/30 bg-white/95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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

          <button
            type="button"
            disabled
            className="mt-3 w-full rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white/65"
            title="Submit Prompt coming soon"
          >
            Submit Prompt (Coming Soon)
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
