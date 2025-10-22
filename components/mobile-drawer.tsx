"use client";

import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { Heart, X } from "lucide-react";
import Link from "next/link";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { favorites, mounted } = useFavoritesStore();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-lg z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

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
          {/* Saved Prompts Link */}
          {mounted && (
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
  );
}
