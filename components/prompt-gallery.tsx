"use client";

import { supabase } from "@/api/client";
import { Prompt } from "@/types/prompt";
import { useEffect, useState } from "react";
import PromptCard from "./prompt-card";

interface PromptGalleryProps {
  onPromptSelect: (prompt: Prompt) => void;
}

export default function PromptGallery({
  onPromptSelect,
}: PromptGalleryProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch prompts from Supabase
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);

        let query = supabase
          .from<"Prompts", Prompt>("Prompts")
          .select(`*, Category(*)`).order("created_at").range(0, 7);

        const { data, error } = await query.order("created_at", {
          ascending: false,
        });

        if (error) throw error;

        setPrompts(data || []);
      } catch (err) {
        console.error("Error fetching prompts:", err);
        setError("Failed to load prompts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <section id="prompt-gallery" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12">
          Trending Prompts
        </h2>

        {loading ? (
          <div className="text-center py-32 text-muted-foreground">
            Loading prompts...
          </div>
        ) : error ? (
          <div className="text-center py-32 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onSelect={onPromptSelect}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
