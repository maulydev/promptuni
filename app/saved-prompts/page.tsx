"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PromptCard from "@/components/prompt-card";
import PromptModal from "@/components/prompt-modal";
import { useFavorites } from "@/hooks/use-favorites";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface Prompt {
  id: string;
  title: string;
  category: string;
  image: string;
  prompt: string;
}

const allPrompts: Prompt[] = [
  {
    id: "1",
    title: "Vintage Studio Portrait",
    category: "Portrait",
    image: "/vintage-studio-portrait.jpg",
    prompt:
      "A vintage studio portrait with warm sepia tones, professional lighting, and classic composition. Shot on film with soft focus background.",
  },
  {
    id: "2",
    title: "Anime Character",
    category: "Cartoon",
    image: "/anime-character-art.jpg",
    prompt:
      "Beautiful anime character with expressive eyes, vibrant colors, and detailed hair. Studio Ghibli style illustration.",
  },
  {
    id: "3",
    title: "Cinematic Hero Shot",
    category: "Cinematic",
    image: "/cinematic-hero-shot.jpg",
    prompt:
      "Epic cinematic hero shot with dramatic lighting, volumetric fog, and cinematic color grading. Movie poster quality.",
  },
  {
    id: "4",
    title: "Fantasy Warrior",
    category: "Fantasy",
    image: "/fantasy-warrior.png",
    prompt:
      "Epic fantasy warrior with intricate armor, magical aura, and mystical background. High fantasy art style.",
  },
  {
    id: "5",
    title: "Product Photography",
    category: "Product",
    image: "/professional-product-photography.png",
    prompt:
      "Professional product photography with clean white background, perfect lighting, and sharp focus. Commercial quality.",
  },
  {
    id: "6",
    title: "Oil Painting Portrait",
    category: "Portrait",
    image: "/oil-painting-portrait.png",
    prompt:
      "Classical oil painting portrait with rich textures, warm color palette, and masterful brushwork. Renaissance style.",
  },
  {
    id: "7",
    title: "Cartoon Adventure",
    category: "Cartoon",
    image: "/cartoon-adventure-scene.jpg",
    prompt:
      "Colorful cartoon adventure scene with playful characters, vibrant backgrounds, and whimsical style.",
  },
  {
    id: "8",
    title: "Sci-Fi Landscape",
    category: "Cinematic",
    image: "/sci-fi-landscape-futuristic.jpg",
    prompt:
      "Futuristic sci-fi landscape with neon lights, flying vehicles, and cyberpunk atmosphere. Blade Runner inspired.",
  },
  {
    id: "9",
    title: "Dragon Fantasy",
    category: "Fantasy",
    image: "/dragon-fantasy-art.jpg",
    prompt:
      "Majestic dragon in fantasy landscape with magical effects, detailed scales, and epic composition.",
  },
  {
    id: "10",
    title: "Luxury Watch",
    category: "Product",
    image: "/luxury-watch-product.jpg",
    prompt:
      "Luxury watch product shot with premium lighting, reflective surfaces, and elegant styling.",
  },
  {
    id: "11",
    title: "Fashion Portrait",
    category: "Portrait",
    image: "/fashion-portrait-model.jpg",
    prompt:
      "High fashion portrait with editorial styling, professional makeup, and sophisticated lighting.",
  },
  {
    id: "12",
    title: "Pixel Art Character",
    category: "Cartoon",
    image: "/pixel-art-character.png",
    prompt:
      "Retro pixel art character with vibrant colors, 8-bit style, and nostalgic gaming aesthetic.",
  },
];

export default function SavedPromptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const { favorites, mounted } = useFavorites();

  const savedPrompts = useMemo(() => {
    return allPrompts.filter((prompt) => favorites.includes(prompt.id));
  }, [favorites]);

  const filteredPrompts = useMemo(() => {
    return savedPrompts.filter((prompt) => {
      const matchesSearch = prompt.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || prompt.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [savedPrompts, searchQuery, selectedCategory]);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

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
            {savedPrompts.length}{" "}
            {savedPrompts.length === 1 ? "prompt" : "prompts"} saved
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {savedPrompts.length === 0 ? (
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
          ) : filteredPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-foreground/5 rounded-3xl">
              <div className="bg-foreground/5 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-2xl">😕</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                No prompts found
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Try adjusting your search or selecting a different category.
              </p>
              <button
                className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/80 transition-colors shadow-sm"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPrompts.map((prompt) => (
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

      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
      <Footer />
    </main>
  );
}
