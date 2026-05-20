"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaBars, FaCameraRetro, FaTimes } from "react-icons/fa";
import { SITE_NAME } from "../config";
import { lockBodyScroll } from "../utils/scrollLock";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Prompts", href: "/prompts" },
  { label: "Categories", href: "/categories" },
  { label: "Collections", href: "/collections" },
  { label: "Latest", href: "/latest" },
  { label: "Trending", href: "/trending" },
  { label: "Saved", href: "/saved" },
  { label: "About", href: "/about" }
];

const secondaryLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "DMCA", href: "/dmca" }
];

const MOBILE_MENU_ID = "mobile-navigation";
const MOBILE_MENU_SCROLL_LOCK = "mobile-menu";

const isActive = (href, pathname) => pathname === href || pathname.startsWith(href);

const linkClass = (href, pathname) =>
  isActive(href, pathname)
    ? "inline-flex items-center rounded-full bg-white/15 text-white px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    : "inline-flex items-center rounded-full text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

const mobileLinkClass = (href, pathname) =>
  `flex items-center justify-between rounded-[1rem] border px-4 py-3 text-sm font-semibold transition-all duration-200 ease-out ${
    pathname === href
      ? "border-indigo-200 bg-indigo-50 text-brand-accent shadow-[0_10px_24px_-22px_rgba(79,70,229,0.7)] dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-200"
      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900"
  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25`; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

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
    router.push(next ? `/prompts?q=${encodeURIComponent(next)}` : "/prompts");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const mobileMenuPortal = mounted
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

          {/* Full-screen slide-down menu */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={`fixed inset-x-0 top-0 z-50 transform-gpu overflow-hidden bg-white shadow-2xl dark:bg-slate-950 transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 pt-6 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 text-brand-ink transition hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25"
                  onClick={closeMenu}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#033f63] text-[0.95rem] text-white">
                    <FaCameraRetro />
                  </span>
                  <span className="truncate font-heading text-[1rem] font-semibold tracking-tight">
                    {SITE_NAME}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  aria-label="Close mobile menu"
                >
                  <FaTimes />
                </button>
              </div>

              {showSearch ? (
                <div className="mt-4">
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

            <div className="px-4 pb-8 pt-6">
              <nav className="grid gap-3">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={mobileLinkClass(link.href, pathname)}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="my-6 h-px bg-slate-200 dark:bg-slate-800" />

              <section>
                <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Legal
                </p>
                <nav className="mt-3 grid gap-2">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={mobileLinkClass(link.href, pathname)}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </section>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header className="relative sticky top-0 z-30 border-b border-slate-800/30 bg-gradient-to-b from-slate-950 via-violet-950 to-slate-950 shadow-[0_14px_32px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/95">
        <div className="mx-auto flex h-14 sm:h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
          <Link
            href="/"
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
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href, pathname)}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/10" />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <ThemeToggle className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/10" />
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
      {mobileMenuPortal}
    </>
  );
}

export default Navbar;
