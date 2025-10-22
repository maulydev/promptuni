"use client";

import { supabase } from "@/api/client";
import { Prompt } from "@/types/prompt";
import { useEffect, useState } from "react";
import ErrorState from "./error-state";
import LoadingState from "./loading-state";
import NotFound from "./not-found";
import PromptCard from "./prompt-card";

interface PromptGalleryProps {
  onPromptSelect: (prompt: Prompt) => void;
}

const LOCAL_STORAGE_KEY = "cached-prompts";

export default function PromptGallery({ onPromptSelect }: PromptGalleryProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to compare arrays (by id)
  const isDifferent = (a: Prompt[], b: Prompt[]) => {
    if (a.length !== b.length) return true;
    const aIds = a.map((p) => p.id).sort();
    const bIds = b.map((p) => p.id).sort();
    return !aIds.every((id, i) => id === bIds[i]);
  };

  useEffect(() => {
    const loadCachedPrompts = () => {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          const parsed: Prompt[] = JSON.parse(cached);
          setPrompts(parsed);
        } catch (err) {
          console.warn("Failed to parse cached prompts:", err);
        }
      }
    };

    const fetchPrompts = async () => {
      try {
        const { data, error } = await supabase
          .from<"Prompts", Prompt>("Prompts")
          .select(`*, Category(*)`)
          .order("created_at", { ascending: false })
          .range(0, 7);

        if (error) throw error;

        if (!data) return;

        // Update state and localStorage only if data is different
        if (isDifferent(prompts, data)) {
          setPrompts(data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        }
      } catch (err) {
        console.error("Error fetching prompts:", err);
        setError("Failed to load prompts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCachedPrompts();
    fetchPrompts();
  }, []);

  const renderPrompts = () => {
    if (loading && prompts.length === 0) return <LoadingState />;
    if (error && prompts.length === 0) return <ErrorState error={error} />;
    if (!loading && prompts.length === 0) return <NotFound />;
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onSelect={onPromptSelect}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="prompt-gallery" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12">
          Trending Prompts
        </h2>
        {renderPrompts()}
      </div>
    </section>
  );
}
