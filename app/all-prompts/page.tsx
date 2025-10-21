"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import PromptCard from "@/components/prompt-card"
import PromptModal from "@/components/prompt-modal"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  {
    id: "13",
    title: "Watercolor Landscape",
    category: "Portrait",
    image: "/watercolor-landscape.jpg",
    prompt: "Beautiful watercolor landscape with soft colors, flowing brushstrokes, and artistic composition.",
  },
  {
    id: "14",
    title: "Steampunk Airship",
    category: "Fantasy",
    image: "/steampunk-airship.jpg",
    prompt: "Steampunk airship with intricate mechanical details, brass and copper tones, and Victorian aesthetics.",
  },
  {
    id: "15",
    title: "Neon City Night",
    category: "Cinematic",
    image: "/neon-city-night.jpg",
    prompt: "Neon-lit cyberpunk city at night with glowing signs, rain-slicked streets, and futuristic architecture.",
  },
  {
    id: "16",
    title: "Luxury Handbag",
    category: "Product",
    image: "/luxury-handbag.jpg",
    prompt: "Luxury designer handbag product shot with premium styling, soft lighting, and elegant presentation.",
  },
]

const ITEMS_PER_PAGE = 8

export default function AllPromptsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedPrompts = filteredPrompts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Hero Section for All Prompts Page */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-secondary/20">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">All Prompts</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Explore our complete collection of AI image generation prompts. Use the search and filters to find the
            perfect prompt for your next creation.
          </p>
        </div>
      </section>

      {/* Gallery with pagination */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {paginatedPrompts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No prompts found. Try adjusting your search or category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {paginatedPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} onSelect={setSelectedPrompt} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg border transition-colors ${
                          currentPage === page
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-secondary text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="text-center mt-8 text-muted-foreground text-sm">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredPrompts.length)} of{" "}
                {filteredPrompts.length} prompts
              </div>
            </>
          )}
        </div>
      </section>

      {selectedPrompt && <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />}
      <Footer />
    </main>
  )
}
