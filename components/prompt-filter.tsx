"use client";

import { Category } from "@/types/prompt";
import { debounce } from "lodash";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface PromptFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function PromptFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: PromptFiltersProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((query: string) => onSearchChange(query), 500),
    [onSearchChange]
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full mt-16">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search prompts..."
          defaultValue={searchQuery}
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 md:py-3 bg-background text-foreground placeholder-muted-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative w-full md:w-64">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex justify-between items-center gap-2 px-4 py-2 md:py-3 bg-background text-foreground rounded-xl border border-border hover:bg-muted transition-colors md:min-w-64 w-full"
        >
          <p>
            {categories.find((c) => c.id === selectedCategory)?.name || "All"}
          </p>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isDropdownOpen && (
          <>
            <button
              className="fixed inset-0 bg-black/5 z-0"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute mt-2 w-64 bg-card rounded-lg shadow-lg z-50 overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 md:py-3 transition-colors cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-accent text-accent-foreground hover:bg-accent/80"
                      : "text-foreground hover:bg-accent/50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
