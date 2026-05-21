"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaSearch,
  FaBookmark,
  FaThLarge,
  FaEllipsis,
} from "react-icons/fa";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: FaHome },
  { label: "Search", href: "/prompts", icon: FaSearch },
  { label: "Saved", href: "/saved", icon: FaBookmark },
  { label: "Categories", href: "/categories", icon: FaThLarge },
];

function MobileBottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on mobile, and only after mounting to avoid hydration mismatch
  if (!mounted) return null;

  // Hide on certain pages like prompt detail page
  const shouldHide = pathname?.startsWith("/prompt/");

  return null;
  /*
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/98 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/98 lg:hidden ${
        shouldHide ? "hidden" : ""
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-2xl items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === "/prompts" && pathname?.startsWith("/prompts"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-all duration-200 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
  */
}

export default MobileBottomNav;
