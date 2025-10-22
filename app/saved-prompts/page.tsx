"use client";

import PromptCard from "@/components/prompt-card";
import PromptModal from "@/components/prompt-modal";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Prompt } from "@/types/prompt";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SavedPromptsPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const { favorites, mounted } = useFavoritesStore();

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Saved Prompts
          </h1>
          <p className="text-muted-foreground">
            {favorites.length} {favorites.length === 1 ? "prompt" : "prompts"} saved
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-foreground/5 rounded-3xl">
              <p className="text-muted-foreground text-lg mb-4">
                No saved prompts yet.
              </p>
              <p className="text-muted-foreground mb-8">
                Start favoriting prompts to see them here!
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
              >
                Browse Prompts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((prompt: Prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onSelect={setSelectedPrompt}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </main>
  );
}
