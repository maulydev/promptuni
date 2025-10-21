"use client";

import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import PromptGallery from "@/components/prompt-gallery";
import PromptModal from "@/components/prompt-modal";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <HeroSection />
      <PromptGallery
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onPromptSelect={setSelectedPrompt}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
      />
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
