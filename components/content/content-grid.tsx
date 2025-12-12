"use client"

import { ContentCard } from "./content-card"
import type { NewsArticle } from "@/lib/store/slices/newsSlice"
import type { Recommendation } from "@/lib/store/slices/recommendationsSlice"
import type { SocialPost } from "@/lib/store/slices/socialSlice"

interface ContentGridProps {
  items: (NewsArticle | Recommendation | SocialPost)[]
  type: "news" | "recommendation" | "social"
}

export function ContentGrid({ items, type }: ContentGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <ContentCard key={item.id} item={item} type={type} index={index} />
      ))}
    </div>
  )
}
