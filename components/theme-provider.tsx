"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  if (!mounted) return null

  return <>{children}</>
}
