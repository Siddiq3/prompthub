import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GITHUB_RAW_URL } from "../config";
import { enrichPrompts } from "../lib/content";
import { normalizePrompts } from "../utils/normalizePrompts";
import {
  getCopyCounts,
  getSavedPrompts,
  incrementCopyCount,
  toggleSavedPrompt
} from "../utils/storage";

export const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppContext.Provider");
  }

  return context;
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

export function AppProvider({ children }) {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetchVersion, setFetchVersion] = useState(0);
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
    const controller = new AbortController();

    const fetchPrompts = async () => {
      setLoading(true);
      setError("");

      try {
        if (!GITHUB_RAW_URL || GITHUB_RAW_URL.includes("PASTE_YOUR_GITHUB_RAW_JSON_URL")) {
          throw new Error(
            "Configure src/config.js with your GitHub RAW JSON URL before loading prompts."
          );
        }

        const response = await fetch(GITHUB_RAW_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const normalized = normalizePrompts(data);

        if (!Array.isArray(normalized)) {
          throw new Error("Invalid JSON format. Expected array or { prompts: [] }.");
        }

        if (!cancelled) {
          setPrompts(enrichPrompts(normalized));
        }
      } catch (err) {
        if (err?.name === "AbortError") {
          return;
        }

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
      controller.abort();
    };
  }, [fetchVersion]);

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

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  const value = useMemo(
    () => ({
      prompts,
      loading,
      error,
      retryFetch,
      copyCounts,
      savedPrompts,
      toggleSaved,
      copyPrompt,
      copyNegativePrompt,
      copyFullPrompt,
      notify: showToast,
      toast,
      dismissToast
    }),
    [
      prompts,
      loading,
      error,
      retryFetch,
      copyCounts,
      savedPrompts,
      toggleSaved,
      copyPrompt,
      copyNegativePrompt,
      copyFullPrompt,
      showToast,
      toast,
      dismissToast
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
