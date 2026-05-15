"use client";

import { useState, useEffect } from "react";
import { getRelatedPrompts, getSimilarPrompts } from "@/src/lib/content";

export function usePromptData(slug) {
  const [prompt, setPrompt] = useState(null);
  const [relatedPrompts, setRelatedPrompts] = useState([]);
  const [similarPrompts, setSimilarPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch all prompts from the API route
        const res = await fetch("/api/prompts");
        if (!res.ok) throw new Error("Failed to fetch prompts");
        
        const allPrompts = await res.json();
        const foundPrompt = allPrompts.find((p) => p.slug === slug);

        if (foundPrompt) {
          setPrompt(foundPrompt);
          setRelatedPrompts(getRelatedPrompts(allPrompts, foundPrompt, 6));
          setSimilarPrompts(getSimilarPrompts(allPrompts, foundPrompt, 4));
        }
      } catch (error) {
        console.error("Error loading prompt:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  return { prompt, relatedPrompts, similarPrompts, loading };
}
