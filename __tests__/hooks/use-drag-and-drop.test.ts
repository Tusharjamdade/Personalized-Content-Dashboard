import { renderHook, act } from "@testing-library/react"
import { useDragAndDrop } from "@/hooks/use-drag-and-drop"

describe("useDragAndDrop", () => {
  const mockItems = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
  ]

  it("initializes with provided items", () => {
    const { result } = renderHook(() => useDragAndDrop(mockItems))
    expect(result.current.items).toEqual(mockItems)
  })

  it("handles drag start", () => {
    const { result } = renderHook(() => useDragAndDrop(mockItems))

    act(() => {
      result.current.handleDragStart(mockItems[0])
    })

    expect(result.current.draggedItem).toEqual(mockItems[0])
  })

  it("reorders items on drop", () => {
    const { result } = renderHook(() => useDragAndDrop(mockItems))

    act(() => {
      result.current.handleDragStart(mockItems[0])
    })

    act(() => {
      result.current.handleDrop(mockItems[2])
    })

    // Item 1 should now be at index 2
    expect(result.current.items[2].id).toBe("1")
    expect(result.current.items[0].id).toBe("2")
  })

  it("clears dragged item on drag end", () => {
    const { result } = renderHook(() => useDragAndDrop(mockItems))

    act(() => {
      result.current.handleDragStart(mockItems[0])
    })

    act(() => {
      result.current.handleDragEnd()
    })

    expect(result.current.draggedItem).toBeNull()
  })
})
