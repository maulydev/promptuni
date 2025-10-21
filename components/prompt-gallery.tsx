"use client"

import { useMemo } from "react"
import PromptCard from "./prompt-card"

interface Prompt {
  id: string
  title: string
  category: string
  image: string
  prompt: string
}

const prompts: Prompt[] = [
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
    prompt: "Epic fantasy warrior with intricate armor, magical aura, and mystical background. High fantasy art style.",
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
    prompt: "Colorful cartoon adventure scene with playful characters, vibrant backgrounds, and whimsical style.",
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
    prompt: "Majestic dragon in fantasy landscape with magical effects, detailed scales, and epic composition.",
  },
  {
    id: "10",
    title: "Luxury Watch",
    category: "Product",
    image: "/luxury-watch-product.jpg",
    prompt: "Luxury watch product shot with premium lighting, reflective surfaces, and elegant styling.",
  },
  {
    id: "11",
    title: "Fashion Portrait",
    category: "Portrait",
    image: "/fashion-portrait-model.jpg",
    prompt: "High fashion portrait with editorial styling, professional makeup, and sophisticated lighting.",
  },
  {
    id: "12",
    title: "Pixel Art Character",
    category: "Cartoon",
    image: "/pixel-art-character.png",
    prompt: "Retro pixel art character with vibrant colors, 8-bit style, and nostalgic gaming aesthetic.",
  },
]

interface PromptGalleryProps {
  searchQuery: string
  selectedCategory: string
  onPromptSelect: (prompt: Prompt) => void
}

export default function PromptGallery({ searchQuery, selectedCategory, onPromptSelect }: PromptGalleryProps) {
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <section id="prompt-gallery" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-12">Trending Prompts</h2>

        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No prompts found. Try adjusting your search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} onSelect={onPromptSelect} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
