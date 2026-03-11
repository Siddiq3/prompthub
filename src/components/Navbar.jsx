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
  `rounded-pill px-2.5 py-1 text-[0.9rem] font-medium transition-all duration-180 ease-smooth ${
    isActive
      ? "bg-white text-[#db2b39] shadow-[0_10px_24px_-18px_rgba(219,43,57,0.65)]"
      : "text-white/92 hover:bg-white/12 hover:text-white"
  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35`;

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
    <header className="sticky top-0 z-50 border-b border-[#b3202c] bg-[#db2b39] shadow-[0_16px_36px_-28px_rgba(219,43,57,0.75)]">
      <div className="h-[3px] w-full bg-[#b3202c]" />
      <div className="mx-auto flex min-h-[3.85rem] w-full max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-2.5 rounded-pill px-1 py-1 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
          onClick={closeMenu}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white text-[0.95rem] text-[#db2b39] shadow-soft">
            <FaCameraRetro />
          </span>
          <span className="font-heading text-[1.02rem] font-semibold tracking-tight text-white sm:text-[1.16rem]">
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
              className="mx-auto max-w-[22rem] !gap-2 !rounded-[1rem] !border-white/20 !bg-white/96 !px-2.5 !py-1.5 shadow-[0_12px_30px_-24px_rgba(127,29,29,0.85)]"
              buttonClassName="!h-9 !rounded-full !bg-[#db2b39] !px-3.5 !text-sm hover:!bg-[#b3202c] focus-visible:!ring-white/25"
              inputClassName="placeholder:text-slate-400 sm:!text-[0.93rem]"
              iconClassName="!h-8 !w-8 !bg-red-50 !text-[0.9rem] !text-[#db2b39]"
            />
          </div>
        )}

        <div className="ml-auto hidden items-center gap-0.5 xl:flex">
          {primaryLinks.slice(0, 6).map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle className="!ml-1 !h-9 !w-9 !border-white/20 !bg-white/10 !text-white hover:!border-white/35 hover:!bg-white/15 hover:!text-white focus-visible:!ring-white/35" />
        </div>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <div className="xl:hidden">
            <ThemeToggle className="!h-9 !w-9 !border-white/20 !bg-white/10 !text-white hover:!border-white/35 hover:!bg-white/15 hover:!text-white focus-visible:!ring-white/35" />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-300 hover:border-white/35 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 xl:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#db2b39] px-4 pb-5 pt-4 xl:hidden">
          {showSearch && (
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={submitSearch}
              placeholder="Search prompts"
              className="mb-3 !border-white/20 !bg-white/96"
              buttonClassName="!bg-[#db2b39] hover:!bg-[#b3202c] focus-visible:!ring-white/25"
              inputClassName="placeholder:text-slate-400"
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

          <p className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4 text-sm leading-7 text-white/88">
            Browse SEO-ready prompt collections, latest additions, and legal/trust pages from the navigation above.
          </p>
        </div>
      )}
    </header>
  );
}

export default Navbar;
