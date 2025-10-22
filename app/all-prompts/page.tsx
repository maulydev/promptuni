"use client";

import { supabase } from "@/api/client";
import PromptCard from "@/components/prompt-card";
import PromptFilters from "@/components/prompt-filter";
import PromptModal from "@/components/prompt-modal";
import { Category, Prompt } from "@/types/prompt";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from<"Category", Category>("Category")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) console.error(error);
      else
        setCategories([
          { id: "all", name: "All", slug: "all", created_at: "" },
          ...data,
        ]);
    };
    fetchCategories();
  }, []);

  // Fetch prompts
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from<"Prompts", Prompt>("Prompts")
          .select("*, Category(*)");

        if (searchQuery) query = query.ilike("title", `%${searchQuery}%`);
        if (selectedCategory !== "all")
          query = query.filter("category_id", "eq", selectedCategory);

        const { data, error } = await query.order("created_at", {
          ascending: false,
        });

        if (error) throw error;
        setPrompts(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load prompts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadPrompts();
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-linear-to-b from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            All Prompts
          </h1>
          <p className="text-lg text-muted-foreground text-balance mb-6">
            Explore our complete collection of AI image generation prompts. Use
            search and filters below.
          </p>

          {/* Extracted Search & Category Filters */}
          <PromptFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-32 text-muted-foreground">
              Loading prompts...
            </div>
          ) : error ? (
            <div className="text-center py-32 text-red-500">{error}</div>
          ) : prompts.length === 0 ? (
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
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {prompts.map((prompt) => (
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
    </main>
  );
}
