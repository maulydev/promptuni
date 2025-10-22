"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types/prompt";
import { debounce } from "lodash";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo } from "react";

interface PromptFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoriesLoading: boolean;
  categoriesError: any;
}

export default function PromptFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  categoriesLoading,
  categoriesError,
}: PromptFiltersProps) {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="md:w-80 w-full">
          <button className="flex justify-between items-center gap-2 px-4 py-2 md:py-3 bg-background text-foreground rounded-xl border border-border hover:bg-muted transition-colors md:w-80 w-full">
            {categories.find((c) => c.id === selectedCategory)?.name || "All"}
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64">
          {categoriesLoading ? (
            <p className="p-4 text-center text-muted-foreground">Loading...</p>
          ) : categoriesError ? (
            <p className="p-4 text-center text-red-500">{categoriesError.message}</p>
          ) : (
            categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                className={`cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
