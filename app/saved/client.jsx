"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import MasonryGrid from "@/src/components/MasonryGrid";
import PageHeader from "@/src/components/PageHeader";
import PromptCard from "@/src/components/PromptCard";
import { PromptsSkeleton } from "@/src/components/PromptsSkeleton";
import { sortPromptsByDate } from "@/src/lib/content";

export default function SavedPromptsClient({ initialPrompts }) {
  const [mounted, setMounted] = useState(false);
  const [savedPromptIds, setSavedPromptIds] = useState([]);

  // Load saved prompts from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_prompts");
      const ids = stored ? JSON.parse(stored) : [];
      setSavedPromptIds(Array.isArray(ids) ? ids : []);
    } catch (error) {
      console.error("Error reading saved prompts from localStorage:", error);
      setSavedPromptIds([]);
    }
    setMounted(true);
  }, []);

  // Filter prompts that are saved
  const savedPrompts = useMemo(() => {
    if (!mounted) return [];
    return sortPromptsByDate(
      initialPrompts.filter((p) => savedPromptIds.includes(p.id))
    );
  }, [initialPrompts, savedPromptIds, mounted]);

  // Handle save/unsave
  const handleSave = (promptId) => {
    setSavedPromptIds((prev) => {
      const updated = prev.includes(promptId)
        ? prev.filter((id) => id !== promptId)
        : [...prev, promptId];
      
      try {
        localStorage.setItem("saved_prompts", JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      
      return updated;
    });
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Saved", href: "/saved" },
  ];

  // Show skeleton while loading from localStorage
  if (!mounted) {
    return <PromptsSkeleton />;
  }

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader
        title="Saved Prompts"
        description="Your locally saved prompt list on PhotoPromptsHub. Saved items are stored in your browser's local storage."
      />

      {savedPrompts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No saved prompts yet. Browse the gallery and save prompts to build your personal collection.
          </p>
          <a
            href="/prompts"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-accent text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Prompts
          </a>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            {savedPrompts.length} saved prompt{savedPrompts.length !== 1 ? "s" : ""}
          </p>
          <MasonryGrid>
            {savedPrompts.map((prompt) => (
              <Link key={prompt.id} href={`/prompt/${prompt.slug}`} className="group">
                <PromptCard
                  prompt={prompt}
                  onSave={handleSave}
                  savedPrompts={savedPromptIds}
                />
              </Link>
            ))}
          </MasonryGrid>
        </>
      )}
    </>
  );
}
