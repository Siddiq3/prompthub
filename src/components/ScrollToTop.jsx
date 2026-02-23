import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const getScrollBehavior = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "auto";
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
};

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const behavior = getScrollBehavior();

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
