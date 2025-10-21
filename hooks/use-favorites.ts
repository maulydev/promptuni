"use client"

import { useEffect, useState } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("favorites")
    setFavorites(saved ? JSON.parse(saved) : [])
  }, [])

  const toggleFavorite = (promptId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(promptId) ? prev.filter((id) => id !== promptId) : [...prev, promptId]
      localStorage.setItem("favorites", JSON.stringify(updated))
      return updated
    })
  }

  const isFavorite = (promptId: string) => favorites.includes(promptId)

  return { favorites, toggleFavorite, isFavorite, mounted }
}
