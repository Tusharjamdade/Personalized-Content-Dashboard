"use client"

import type React from "react"

import { useState } from "react"

export function useDragAndDrop<T extends { id: string }>(initialItems: T[]) {
  const [items, setItems] = useState(initialItems)
  const [draggedItem, setDraggedItem] = useState<T | null>(null)

  const handleDragStart = (item: T) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetItem: T) => {
    if (!draggedItem) return

    const draggedIndex = items.findIndex((item) => item.id === draggedItem.id)
    const targetIndex = items.findIndex((item) => item.id === targetItem.id)

    if (draggedIndex === targetIndex) return

    const newItems = [...items]
    newItems.splice(draggedIndex, 1)
    newItems.splice(targetIndex, 0, draggedItem)

    setItems(newItems)
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return {
    items,
    setItems,
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  }
}
