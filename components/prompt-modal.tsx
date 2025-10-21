"use client";

import { Copy, X } from "lucide-react";
import { useEffect } from "react";

interface Prompt {
  id: string;
  title: string;
  category: string;
  image: string;
  prompt: string;
}

interface PromptModalProps {
  prompt: Prompt;
  onClose: () => void;
}

export default function PromptModal({ prompt, onClose }: PromptModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // ✅ Prevent background scrolling when drawer is open
  useEffect(() => {
    if (prompt) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [prompt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${prompt.prompt}\nUse the face from the image attached.`
    );
  };

  return (
    <div
      className="fixed inset-0 bg-accent/10 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-accent/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-bold text-foreground">{prompt.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={prompt.image || "/placeholder.svg"}
              alt={prompt.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Category */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Category</p>
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
              {prompt.category}
            </span>
          </div>

          {/* Prompt Text */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Prompt</p>
            <p className="text-foreground bg-foreground/5 p-4 rounded-lg leading-relaxed">
              {prompt.prompt}
            </p>
          </div>

          {/* Instructions */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">How to use:</p>
            <ol className="space-y-2 text-sm text-foreground">
              <li className="flex gap-3">
                <span className="font-semibold text-accent">1️⃣</span>
                <span>Go to Gemini</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-accent">2️⃣</span>
                <span>Upload your photo</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-accent">3️⃣</span>
                <span>Paste this prompt</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-accent">4️⃣</span>
                <span>Generate your magic ✨</span>
              </li>
            </ol>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Copy className="w-5 h-5" />
            Copy Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
