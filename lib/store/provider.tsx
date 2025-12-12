"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "./store"
import { useEffect } from "react"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize dark mode from preferences
    const preferences = localStorage.getItem("userPreferences")
    if (preferences) {
      const { darkMode } = JSON.parse(preferences)
      document.documentElement.classList.toggle("dark", darkMode)
    }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
