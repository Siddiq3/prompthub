import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GITHUB_RAW_URL } from "./config";
import { AppContext } from "./context/AppContext";
import { normalizePrompts } from "./utils/normalizePrompts";
import {
  getCopyCounts,
  getSavedPrompts,
  incrementCopyCount,
  toggleSavedPrompt
} from "./utils/storage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import WhatsAppFloat from "./components/WhatsAppFloat";
import RouteFallback from "./components/RouteFallback";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const PromptDetails = lazy(() => import("./pages/PromptDetails"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Saved = lazy(() => import("./pages/Saved"));

const initialFilters = {
  category: "all",
  model: "all",
  aspectRatio: "all"
};

const copyToClipboard = async (text) => {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  }
};

function App() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetchVersion, setFetchVersion] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState("newest");

  const [copyCounts, setCopyCounts] = useState(() => getCopyCounts());
  const [savedPrompts, setSavedPrompts] = useState(() => getSavedPrompts());
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({
      id: Date.now() + Math.random(),
      message,
      type
    });
  }, []);

  const retryFetch = useCallback(() => {
    setFetchVersion((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchPrompts = async () => {
      setLoading(true);
      setError("");

      try {
        if (!GITHUB_RAW_URL || GITHUB_RAW_URL.includes("PASTE_YOUR_GITHUB_RAW_JSON_URL")) {
          throw new Error(
            "Configure src/config.js with your GitHub RAW JSON URL before loading prompts."
          );
        }

        const response = await fetch(GITHUB_RAW_URL, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const normalized = normalizePrompts(data);

        if (!Array.isArray(normalized)) {
          throw new Error("Invalid JSON format. Expected array or { prompts: [] }.");
        }

        if (!cancelled) {
          setPrompts(normalized);
        }
      } catch (err) {
        if (!cancelled) {
          setPrompts([]);
          setError(err?.message || "Could not fetch prompts. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPrompts();

    return () => {
      cancelled = true;
    };
  }, [fetchVersion]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setFilters(initialFilters);
    setSortBy("newest");
  }, []);

  const toggleSaved = useCallback(
    (id) => {
      const next = toggleSavedPrompt(id);
      setSavedPrompts(next);
      showToast(next.includes(id) ? "Prompt saved" : "Prompt removed from saved");
    },
    [showToast]
  );

  const runTrackedCopy = useCallback(
    async ({ text, promptId, message, trackCopy }) => {
      const success = await copyToClipboard(text);

      if (!success) {
        showToast("Copy failed. Please try again.", "error");
        return false;
      }

      if (trackCopy && promptId) {
        const next = incrementCopyCount(promptId);
        setCopyCounts(next);
      }

      showToast(message || "Copied to clipboard");
      return true;
    },
    [showToast]
  );

  const copyPrompt = useCallback(
    async (prompt) =>
      runTrackedCopy({
        text: prompt.prompt || prompt.title,
        promptId: prompt.id,
        message: "Prompt copied",
        trackCopy: true
      }),
    [runTrackedCopy]
  );

  const copyNegativePrompt = useCallback(
    async (prompt) =>
      runTrackedCopy({
        text: prompt.negativePrompt || "",
        promptId: prompt.id,
        message: "Negative prompt copied",
        trackCopy: false
      }),
    [runTrackedCopy]
  );

  const copyFullPrompt = useCallback(
    async (prompt) => {
      const full = `Prompt:\n${prompt.prompt || ""}\n\nNegative Prompt:\n${prompt.negativePrompt || ""}`;
      return runTrackedCopy({
        text: full,
        promptId: prompt.id,
        message: "Full prompt copied",
        trackCopy: true
      });
    },
    [runTrackedCopy]
  );

  const contextValue = useMemo(
    () => ({
      prompts,
      loading,
      error,
      retryFetch,
      searchQuery,
      setSearchQuery,
      filters,
      sortBy,
      setSortBy,
      updateFilter,
      clearFilters,
      copyCounts,
      savedPrompts,
      toggleSaved,
      copyPrompt,
      copyNegativePrompt,
      copyFullPrompt
    }),
    [
      prompts,
      loading,
      error,
      retryFetch,
      searchQuery,
      filters,
      sortBy,
      updateFilter,
      clearFilters,
      copyCounts,
      savedPrompts,
      toggleSaved,
      copyPrompt,
      copyNegativePrompt,
      copyFullPrompt
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative min-h-screen bg-white font-sans text-slate-900 antialiased transition-colors duration-300 dark:bg-[#020617] dark:text-slate-100">
          <div className="pointer-events-none fixed inset-0 -z-10 hidden dark:block">
            <div className="absolute -left-28 top-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,rgba(99,102,241,0)_70%)] blur-3xl" />
            <div className="absolute right-[-9rem] top-[24%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.18)_0%,rgba(129,140,248,0)_70%)] blur-3xl" />
            <div className="absolute bottom-[-9rem] left-[25%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.13)_0%,rgba(16,185,129,0)_70%)] blur-3xl" />
          </div>

          <Navbar />

          <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prompt/:id" element={<PromptDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <WhatsAppFloat />
          <Toast toast={toast} onClose={() => setToast(null)} />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
