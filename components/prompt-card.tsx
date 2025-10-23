import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Prompt } from "@/types/prompt";
import { Heart } from "lucide-react";
import ImageWithFallback from "./image-with-fallback";

interface PromptCardProps {
  prompt: Prompt;
  onSelect: (prompt: Prompt) => void;
}

export default function PromptCard({ prompt, onSelect }: PromptCardProps) {
  const { toggleFavorite, isFavorite, mounted } = useFavoritesStore();

  const favoriteStatus = isFavorite(prompt.id);

  return (
    <div className="group cursor-pointer" onClick={() => onSelect(prompt)}>
      <div className="relative overflow-hidden rounded-lg bg-accent/20 mb-4 aspect-square">
        <ImageWithFallback
          src={prompt.image_url}
          alt={prompt.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {mounted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(prompt);
            }}
            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
            title={favoriteStatus ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                favoriteStatus ? "fill-red-500 text-red-500" : "text-white"
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
          <p className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full line-clamp-1 max-w-48">
            {prompt.Category.name}
          </p>

          <p className="text-xs px-2 py-1 bg-foreground/10 text-foreground rounded-full line-clamp-1 max-w-48">
            # {String(prompt.copies).padStart(3, "0")}
          </p>

          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(prompt.prompt);
            }}
            className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
            title="Copy prompt"
          >
            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
