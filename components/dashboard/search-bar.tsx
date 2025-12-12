"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        router.push(`/explore?q=${encodeURIComponent(query)}`)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query, router])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search news, movies, music..."
        className="pl-9"
        value={query}
        onChange={handleSearch}
      />
    </div>
  )
}
