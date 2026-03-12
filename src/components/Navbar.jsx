import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaBars, FaCameraRetro, FaTimes } from "react-icons/fa";
import { SITE_NAME } from "../config";
import { lockBodyScroll } from "../utils/scrollLock";
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

const secondaryLinks = [
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "DMCA", to: "/dmca" }
];

const MOBILE_MENU_ID = "mobile-navigation";
const MOBILE_MENU_SCROLL_LOCK = "mobile-menu";

const linkClass = ({ isActive }) =>
  `inline-flex items-center rounded-[0.95rem] border px-3 py-2 text-[0.9rem] font-medium transition-all duration-180 ease-smooth ${
    isActive
      ? "border-white/18 bg-white/16 text-white"
      : "border-transparent text-white/82 hover:border-white/10 hover:bg-white/[0.08] hover:text-white"
  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30`;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center justify-between rounded-[1rem] border px-4 py-3 text-sm font-semibold transition-all duration-200 ease-out ${
    isActive
      ? "border-indigo-200 bg-indigo-50 text-brand-accent shadow-[0_10px_24px_-22px_rgba(79,70,229,0.7)] dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-200"
      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900"
  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams, pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    return lockBodyScroll(MOBILE_MENU_SCROLL_LOCK);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const showSearch = useMemo(() => !pathname.startsWith("/prompt/"), [pathname]);
  const submitSearch = (value) => {
    const next = value.trim();
    navigate(next ? `/prompts?q=${encodeURIComponent(next)}` : "/prompts");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);
  const mobileDrawer =
    typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 z-40 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            aria-hidden={!isOpen}
          >
            <div
              className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeMenu}
            />
            <aside
              id={MOBILE_MENU_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={`fixed inset-y-0 left-0 z-50 flex h-full w-[min(86vw,320px)] transform-gpu flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-950 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-slate-200 px-5 pb-5 pt-6 dark:border-slate-800">
                <div className="relative flex items-center gap-3 pr-12">
                  <Link
                    to="/"
                    className="inline-flex min-w-0 items-center gap-3 text-brand-ink transition hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25"
                    onClick={closeMenu}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#033f63] text-[0.95rem] text-white shadow-[0_12px_22px_-18px_rgba(15,23,42,0.6)] dark:border-slate-700">
                      <FaCameraRetro />
                    </span>
                    <span className="truncate font-heading text-[1rem] font-semibold tracking-tight">{SITE_NAME}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="absolute right-0 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white"
                    aria-label="Close mobile menu"
                  >
                    <FaTimes />
                  </button>
                </div>

                {showSearch ? (
                  <div className="mt-5">
                    <SearchBar
                      value={searchValue}
                      onChange={setSearchValue}
                      onSubmit={submitSearch}
                      buttonLabel="Go"
                      placeholder="Search prompts"
                      className="!w-full !gap-2 !overflow-hidden !rounded-[1rem] !border-slate-200 !bg-slate-50 !px-3 !py-2 !shadow-none dark:!border-slate-800 dark:!bg-slate-900"
                      buttonClassName="!h-9 !shrink-0 !px-3.5"
                      inputClassName="placeholder:text-slate-400"
                    />
                  </div>
                ) : null}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-5">
                <nav className="grid gap-2">
                  {primaryLinks.map((link) => (
                    <NavLink key={link.to} to={link.to} className={mobileLinkClass} onClick={closeMenu}>
                      {link.label}
                    </NavLink>
                  ))}
                </nav>

                <div className="my-6 h-px bg-slate-200 dark:bg-slate-800" />

                <section>
                  <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Legal
                  </p>
                  <nav className="mt-3 grid gap-2">
                    {secondaryLinks.map((link) => (
                      <NavLink key={link.to} to={link.to} className={mobileLinkClass} onClick={closeMenu}>
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>
                </section>
              </div>
            </aside>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <header className="relative sticky top-0 z-30 border-b border-[#b3202c]/35 bg-[linear-gradient(180deg,rgba(219,43,57,0.96),rgba(198,39,54,0.96))] shadow-[0_14px_32px_-24px_rgba(127,29,29,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#db2b39]/92">
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
          <div className="hidden flex-1 xl:block">
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

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {primaryLinks.slice(0, 6).map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle className="!ml-1 !h-9 !w-9 !border-white/14 !bg-white/10 !text-white hover:!border-white/28 hover:!bg-white/14 hover:!text-white focus-visible:!ring-white/30" />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle className="!h-9 !w-9 !border-white/14 !bg-white/10 !text-white hover:!border-white/28 hover:!bg-white/14 hover:!text-white focus-visible:!ring-white/30" />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white transition duration-300 hover:border-white/28 hover:bg-white/14 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      </header>
      {mobileDrawer}
    </>
  );
}

export default Navbar;
