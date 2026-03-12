import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const THEME_SYNC_EVENT = "themechange";

function readThemePreference() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "light";
  }

  try {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }
  } catch {
    // Fall back to the current root class if storage is unavailable.
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(readThemePreference);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const syncTheme = () => setTheme(readThemePreference());
    window.addEventListener(THEME_SYNC_EVENT, syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener(THEME_SYNC_EVENT, syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");

    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage failures and keep the UI state in sync.
    }

    window.dispatchEvent(new Event(THEME_SYNC_EVENT));
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      onPointerUp={(event) => event.currentTarget.blur()}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-ink transition duration-300 hover:border-brand-accent hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-100 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className={`transition duration-300 ${isDark ? "rotate-0" : "rotate-12"}`}>
        {isDark ? <FaSun /> : <FaMoon />}
      </span>
    </button>
  );
}

export default ThemeToggle;
