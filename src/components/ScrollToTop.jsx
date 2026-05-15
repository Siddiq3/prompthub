"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const getScrollBehavior = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "auto";
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
};

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const behavior = getScrollBehavior();
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
