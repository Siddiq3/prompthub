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
  `inline-flex items-center rounded-[0.95rem] border px-3 py-2 text-[0.9rem] font-medium transition-all duration-180 ease-smooth ${
    isActive
      ? "border-white/18 bg-white/16 text-white"
      : "border-transparent text-white/82 hover:border-white/10 hover:bg-white/[0.08] hover:text-white"
  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
    <header className="sticky top-0 z-50 border-b border-[#b3202c]/35 bg-[linear-gradient(180deg,rgba(219,43,57,0.96),rgba(198,39,54,0.96))] shadow-[0_14px_32px_-24px_rgba(127,29,29,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#db2b39]/92">
      <div className="mx-auto flex min-h-[4.15rem] w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-3 px-1 py-1 text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          onClick={closeMenu}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#033f63] text-[0.95rem] text-white shadow-[0_12px_22px_-18px_rgba(15,23,42,0.6)]">
            <FaCameraRetro />
          </span>
          <span className="font-heading text-[1rem] font-semibold tracking-tight text-white sm:text-[1.14rem]">
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
              className="mx-auto max-w-[21rem] !gap-2 !rounded-[1rem] !border-white/14 !bg-white/95 !px-2.5 !py-1.5 !shadow-[0_12px_28px_-24px_rgba(127,29,29,0.75)]"
              buttonClassName="!h-9 !rounded-full !bg-[#db2b39] !px-3.5 !text-sm hover:!bg-[#b3202c] focus-visible:!ring-white/20"
              inputClassName="placeholder:text-slate-400 sm:!text-[0.92rem]"
              iconClassName="!h-8 !w-8 !bg-red-50/90 !text-[0.88rem] !text-[#db2b39]"
            />
          </div>
        )}

        <div className="ml-auto hidden items-center gap-1 xl:flex">
          {primaryLinks.slice(0, 6).map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle className="!ml-1 !h-9 !w-9 !border-white/14 !bg-white/10 !text-white hover:!border-white/28 hover:!bg-white/14 hover:!text-white focus-visible:!ring-white/30" />
        </div>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <div className="xl:hidden">
            <ThemeToggle className="!h-9 !w-9 !border-white/14 !bg-white/10 !text-white hover:!border-white/28 hover:!bg-white/14 hover:!text-white focus-visible:!ring-white/30" />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white transition duration-300 hover:border-white/28 hover:bg-white/14 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 xl:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[rgba(173,28,41,0.35)] px-4 pb-5 pt-4 backdrop-blur-xl xl:hidden">
          {showSearch && (
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={submitSearch}
              placeholder="Search prompts"
              className="mb-3 !border-white/12 !bg-white/95"
              buttonClassName="!bg-[#db2b39] hover:!bg-[#b3202c] focus-visible:!ring-white/20"
              inputClassName="placeholder:text-slate-400"
            />
          )}

          <div className="space-y-3">
            <section className="rounded-[1.35rem] border border-white/10 bg-white/[0.08] p-3">
              <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/68">
                Browse
              </p>
              <nav className="mt-2 grid gap-1.5">
                {primaryLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} className={linkClass} onClick={closeMenu}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </section>

            <section className="rounded-[1.35rem] border border-white/10 bg-white/[0.08] p-3">
              <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/68">
                Legal
              </p>
              <nav className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {policyLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} className={linkClass} onClick={closeMenu}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </section>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
