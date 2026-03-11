import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
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
