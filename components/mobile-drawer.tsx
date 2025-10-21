"use client"

import { useFavorites } from "@/hooks/use-favorites"
import { ChevronDown, Heart, Search, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = ["All", "Portrait", "Cartoon", "Cinematic", "Fantasy", "Product"]

export default function MobileDrawer({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: MobileDrawerProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const { favorites, mounted: favoritesMounted } = useFavorites()

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category)
    setIsCategoryOpen(false)
  }

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-40 md:hidden" onClick={onClose} aria-hidden="true" />}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="overflow-y-auto h-[calc(100vh-60px)] p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search prompts…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-foreground/5 text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-foreground/5 text-foreground rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>

            {isCategoryOpen && (
              <div className="mt-2 space-y-1 bg-card border border-border rounded-lg p-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved Prompts Link */}
          {favoritesMounted && (
            <Link
              href="/saved-prompts"
              onClick={handleLinkClick}
              className="flex items-center gap-2 px-4 py-2 bg-foreground/5 text-foreground rounded-lg border border-border hover:bg-muted transition-colors w-full"
            >
              <Heart className="w-4 h-4" />
              <span className="font-medium">Saved Prompts</span>
              <span className="ml-auto text-sm bg-accent text-accent-foreground px-2 py-1 rounded">
                {favorites.length}
              </span>
            </Link>
          )}

          {/* All Prompts Link */}
          <Link
            href="/all-prompts"
            onClick={handleLinkClick}
            className="flex items-center px-4 py-2 bg-foreground/5 text-foreground rounded-lg border border-border hover:bg-muted transition-colors w-full"
          >
            <span className="font-medium">All Prompts</span>
          </Link>
        </div>
      </div>
    </>
  )
}
