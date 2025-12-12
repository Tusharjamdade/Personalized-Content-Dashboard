"use client"

import { DraggableContentCard } from "./draggable-content-card"
import type { NewsArticle } from "@/lib/store/slices/newsSlice"
import type { Recommendation } from "@/lib/store/slices/recommendationsSlice"
import type { SocialPost } from "@/lib/store/slices/socialSlice"
import { useDragAndDrop } from "@/hooks/use-drag-and-drop"
import { useEffect } from "react"

interface DraggableContentGridProps {
  items: (NewsArticle | Recommendation | SocialPost)[]
  type: "news" | "recommendation" | "social"
  onReorder?: (items: (NewsArticle | Recommendation | SocialPost)[]) => void
}

export function DraggableContentGrid({ items, type, onReorder }: DraggableContentGridProps) {
  const {
    items: orderedItems,
    setItems,
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop(items)

  useEffect(() => {
    setItems(items)
  }, [items, setItems])

  useEffect(() => {
    if (onReorder) {
      onReorder(orderedItems)
    }
  }, [orderedItems, onReorder])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {orderedItems.map((item, index) => (
        <DraggableContentCard
          key={item.id}
          item={item}
          type={type}
          index={index}
          onDragStart={() => handleDragStart(item)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(item)}
          onDragEnd={handleDragEnd}
          isDragging={draggedItem?.id === item.id}
        />
      ))}
    </div>
  )
}
