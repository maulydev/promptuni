"use client";

import { APP_NAME } from "@/data";
import { useFavorites } from "@/hooks/use-favorites";
import { useTheme } from "@/hooks/use-theme";
import { ChevronDown, Heart, HeartIcon, Menu, Moon, Search, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileDrawer from "./mobile-drawer";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All",
  "Portrait",
  "Cartoon",
  "Cinematic",
  "Fantasy",
  "Product",
];

export default function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const { favorites, mounted: favoritesMounted } = useFavorites();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4 sm:gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-row items-center shrink-0 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={892}
                height={205}
                className="w-8"
              />
              <h1 className="text-2xl font-bold text-foreground">
                {APP_NAME.slice(1)}
              </h1>
            </Link>

            {/* Desktop Search Bar */}
            <div className="flex-1 max-w-md hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search prompts…"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <span className="flex flex-row gap-x-4">
              {/* Desktop Category Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-background text-foreground rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  {selectedCategory}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <>
                    <button
                      className="fixed bg-black/5 inset-0 z-0"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg z-50 overflow-hidden">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            onCategoryChange(category);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2  transition-colors cursor-pointer ${
                            selectedCategory === category
                              ? "bg-accent text-accent-foreground hover:bg-accent/80"
                              : "text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Desktop Saved Prompts Link */}
              {favoritesMounted && (
                <Link
                  href="/saved-prompts"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 bg-background text-foreground rounded-lg border border-border hover:bg-muted transition-colors"
                  title="View saved prompts"
                >
                  {favorites.length > 0 ? (
                    <HeartIcon className="w-4 h-4 text-red-500 fill-red-500" />
                  ) : (
                    <Heart className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {favorites.length}
                  </span>
                </Link>
              )}

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-background rounded-lg transition-colors"
                  title={`Switch to ${
                    theme === "light" ? "dark" : "light"
                  } mode`}
                >
                  {theme === "light" ? (
                    <Moon className="w-5 h-5 text-foreground" />
                  ) : (
                    <Sun className="w-5 h-5 text-foreground" />
                  )}
                </button>
              )}

              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="md:hidden p-2 hover:bg-background rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </span>
          </div>
        </div>
      </nav>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </>
  );
}
