"use client";

import { supabase } from "@/api/client";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import NotFound from "@/components/not-found";
import PromptCard from "@/components/prompt-card";
import PromptFilters from "@/components/prompt-filter";
import PromptModal from "@/components/prompt-modal";
import { Category, Prompt } from "@/types/prompt";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AllPromptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageSize = 20;

  /** Fetch categories */
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from<"Category", Category>("Category")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return [{ id: "all", name: "All", slug: "all", created_at: "" }, ...data];
    },
  });

  const {
    data: prompts = [],
    isLoading: promptsLoading,
    error: promptsError,
  } = useQuery<Prompt[]>({
    queryKey: ["prompts", searchQuery, selectedCategory, currentPage],
    queryFn: async () => {
      // Count total prompts
      let countQuery = supabase
        .from<"Prompts", Prompt>("Prompts")
        .select("id", { count: "exact", head: true });

      if (searchQuery)
        countQuery = countQuery.ilike("title", `%${searchQuery}%`);
      if (selectedCategory !== "all")
        countQuery = countQuery.filter("category_id", "eq", selectedCategory);

      const { count, error: countError } = await countQuery;
      if (countError) throw countError;
      setTotalPages(Math.ceil((count || 0) / pageSize) || 1);

      // Fetch current page
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize - 1;

      let query = supabase
        .from<"Prompts", Prompt>("Prompts")
        .select("*, Category(*)")
        .order("created_at", { ascending: false })
        .range(start, end);

      if (searchQuery) query = query.ilike("title", `%${searchQuery}%`);
      if (selectedCategory !== "all")
        query = query.filter("category_id", "eq", selectedCategory);

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    staleTime: 1000 * 60 * 10, // cache for 10 mins
  });

  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-linear-to-b from-background via-background to-secondary/20">
        <div className="md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            All Prompts
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Explore our complete collection of AI image generation prompts. Use
            search and filters below.
          </p>

          <PromptFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoriesLoading={categoriesLoading}
            categoriesError={categoriesError}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {promptsLoading ? (
            <LoadingState />
          ) : promptsError ? (
            <ErrorState error={promptsError.message} />
          ) : prompts.length === 0 ? (
            <NotFound
              setSearchQuery={setSearchQuery}
              setSelectedCategory={setSelectedCategory}
            />
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {prompts.map((prompt: Prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onSelect={setSelectedPrompt}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination>
                <PaginationContent>
                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                    />
                  </PaginationItem>

                  {/* First page */}
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                          }}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage > 4 && <PaginationEllipsis />}
                    </>
                  )}

                  {/* Pages around current */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page >= currentPage - 2 && page <= currentPage + 2
                    )
                    .map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                  {/* Last page */}
                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && <PaginationEllipsis />}
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                          }}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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
    </main>
  );
}
