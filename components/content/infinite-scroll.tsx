"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface InfiniteScrollProps {
  onLoadMore: () => void
  hasMore: boolean
  loading: boolean
  children: React.ReactNode
}

export function InfiniteScroll({ onLoadMore, hasMore, loading, children }: InfiniteScrollProps) {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore()
        }
      },
      { threshold: 0.5 },
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore, loading, onLoadMore])

  return (
    <div>
      {children}
      <div ref={observerTarget} className="mt-8 flex justify-center">
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Loading more content...
          </div>
        )}
        {!hasMore && !loading && <p className="text-sm text-muted-foreground">You've reached the end!</p>}
      </div>
    </div>
  )
}
