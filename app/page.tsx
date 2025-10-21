"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import PromptGallery from "@/components/prompt-gallery"
import PromptModal from "@/components/prompt-modal"
import Footer from "@/components/footer"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <HeroSection />
      <PromptGallery searchQuery={searchQuery} selectedCategory={selectedCategory} onPromptSelect={setSelectedPrompt} />
      {selectedPrompt && <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />}
      <Footer />
    </main>
  )
}
