"use client";

import { supabase } from "@/api/client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PromptCard from "@/components/prompt-card";
import PromptModal from "@/components/prompt-modal";
import { Prompt } from "@/types/prompt";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 8;

export default function AllPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch prompts from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Base query
        let query = supabase
          .from<"Prompts", Prompt>("Prompts")
          .select("*, Category(*)", { count: "exact" });

        if (searchQuery) {
          query = query.ilike("title", `%${searchQuery}%`);
        }

        // Apply category filter
        // if (selectedCategory && selectedCategory !== "All") {
        //   query = query.eq("category", selectedCategory);
        // }

        // Calculate pagination
        const from = (currentPage - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        // Execute query with range
        const { data, count, error } = await query
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        setPrompts(data || []);
        setTotalCount(count || 0);
        setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
      } catch (err) {
        console.error("❌ Error fetching prompts:", err);
        setError("Failed to load prompts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchQuery, selectedCategory, currentPage]);

  // Handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-secondary/20">
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
          <p className="text-lg text-muted-foreground text-balance">
            Explore our complete collection of AI image generation prompts from
            the community. Use the search and filters to find inspiration.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-32 text-muted-foreground">
              Loading prompts...
            </div>
          ) : error ? (
            <div className="text-center py-32 text-red-500">{error}</div>
          ) : prompts?.length === 0 ? (
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
            <>
              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {prompts?.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onSelect={setSelectedPrompt}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-foreground/10 text-foreground rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg border transition-colors ${
                            currentPage === page
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-foreground/10 text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-foreground/10 text-foreground rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="text-center mt-8 text-muted-foreground text-sm">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of{" "}
                {totalCount} prompts
              </div>
            </>
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
