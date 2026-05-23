"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { enrichPrompts, sortPromptsByDate } from "../lib/content";
import { normalizePrompts } from "../utils/normalizePrompts";
import { getCachedPromptData, setCachedPromptData } from "../utils/promptData";
import {
  getCopyCounts,
  getSavedPrompts,
  incrementCopyCount,
  toggleSavedPrompt
} from "../utils/storage";

export const AppContext = createContext(null);

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
        const cached = getCachedPromptData();
        let data;

        try {
          const response = await fetch("/api/prompts", {
            signal: controller.signal,
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error(`Failed to load prompts from server: ${response.status} ${response.statusText}`);
          }

          data = await response.json();
          setCachedPromptData(data, "");
        } catch (fetchError) {
          if (fetchError?.name === "AbortError") {
            return;
          }

          if (cached?.data) {
            data = cached.data;
          } else {
            throw fetchError;
          }
        }

        const normalized = normalizePrompts(data);

        if (!Array.isArray(normalized)) {
          throw new Error("Invalid prompt payload format. Expected array or { prompts: [] }.");
        }

        if (!cancelled) {
          setPrompts(sortPromptsByDate(enrichPrompts(normalized)));
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
