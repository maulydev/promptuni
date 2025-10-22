// /stores/useFavoritesStore.ts
import { Prompt } from "@/types/prompt";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: Prompt[];
  mounted: boolean;
  toggleFavorite: (prompt: Prompt) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      mounted: false,

      toggleFavorite: (prompt: Prompt) => {
        const { favorites } = get();
        const exists = favorites.find((f) => f.id === prompt.id);

        const updated: Prompt[] = exists
          ? favorites.filter((f) => f.id !== prompt.id)
          : [...favorites, prompt];

        set({ favorites: updated });
      },

      isFavorite: (id: string) => {
        return get().favorites.some((f) => f.id === id);
      },
    }),
    {
      name: "favorites-storage", // localStorage key
      // Called after loading persisted state
      onRehydrateStorage: () => (state) => {
        if (state) {
          // mark mounted as true after hydration
          state.mounted = true;
        }
      },
    }
  )
);
