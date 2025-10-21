"use client";

import { APP_NAME } from "@/data";
import Link from "next/link";

export default function HeroSection() {
  const handleScroll = () => {
    const gallery = document.getElementById("prompt-gallery");
    gallery?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-secondary/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
          Discover, Copy & Create with{" "}
          <span className="text-primary">{APP_NAME}</span>.
        </h2>
        <p className="text-xl text-muted-foreground mb-8 text-balance">
          Explore a universe of trending AI image prompts. Copy your favorites
          and bring your imagination to life on Gemini, Midjourney, or anywhere
          you create.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleScroll}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Browse Trending
          </button>
          <Link
            href="/all-prompts"
            className="px-8 py-3 bg-background border border-accent text-accent rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            View All Prompts
          </Link>
        </div>

        {/* Floating Example Images */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-linear-to-br from-purple-200 to-blue-200 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center text-sm text-muted-foreground"
            >
              <img
                src={`/ai-portrait-example-.jpg?height=200&width=200&query=AI%20portrait%20example%20${i}`}
                alt={`Example ${i}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
