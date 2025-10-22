"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { Prompt } from "@/types/prompt";
import { Copy, Heart } from "lucide-react";
import ImageWithFallback from "./image-with-fallback";


interface PromptCardProps {
  prompt: Prompt;
  onSelect: (prompt: Prompt) => void;
}

export default function PromptCard({ prompt, onSelect }: PromptCardProps) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites();

  return (
    <div className="group cursor-pointer" onClick={() => onSelect(prompt)}>
      <div className="relative overflow-hidden rounded-lg bg-accent/20 mb-4 aspect-square">
        <ImageWithFallback
          src={prompt.image}
          alt={prompt.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {mounted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(prompt.id);
            }}
            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
            title={
              isFavorite(prompt.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite(prompt.id)
                  ? "fill-red-500 text-red-500"
                  : "text-white"
              }`}
            />
          </button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground text-sm line-clamp-2">
          {prompt.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full">
            {prompt.Category.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(prompt.prompt);
            }}
            className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
            title="Copy prompt"
          >
            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
