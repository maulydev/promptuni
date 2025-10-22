"use client";

import HeroSection from "@/components/hero-section";
import PromptGallery from "@/components/prompt-gallery";
import PromptModal from "@/components/prompt-modal";
import { useState } from "react";

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PromptGallery
        onPromptSelect={setSelectedPrompt}
      />
      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </main>
  );
}
