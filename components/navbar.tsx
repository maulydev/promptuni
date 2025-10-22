"use client";

import { APP_NAME } from "@/data";
import { useTheme } from "@/hooks/use-theme";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Heart, HeartIcon, Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileDrawer from "./mobile-drawer";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  const { favorites, mounted: favoritesMounted } = useFavoritesStore();

  const hasFavorites = favorites.length > 0;

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

            <span className="flex flex-row gap-x-4">
              {/* Desktop Saved Prompts Link */}
              {favoritesMounted && (
                <Link
                  href="/saved-prompts"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 bg-background text-foreground rounded-lg border border-border hover:bg-muted transition-colors"
                  title="View saved prompts"
                >
                  {hasFavorites ? (
                    <HeartIcon className="w-4 h-4 text-red-500 fill-red-500" />
                  ) : (
                    <Heart className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{favorites.length}</span>
                </Link>
              )}

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-background rounded-lg transition-colors"
                  title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                  {theme === "light" ? (
                    <Moon className="w-5 h-5 text-foreground" />
                  ) : (
                    <Sun className="w-5 h-5 text-foreground" />
                  )}
                </button>
              )}

              {/* Mobile Menu */}
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
      />
    </>
  );
}
