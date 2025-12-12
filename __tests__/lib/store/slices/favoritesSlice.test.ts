import favoritesReducer, { addFavorite, removeFavorite } from "@/lib/store/slices/favoritesSlice"

describe("favoritesSlice", () => {
  const initialState = {
    items: [],
  }

  it("should return the initial state", () => {
    expect(favoritesReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
    })
  })

  it("should handle addFavorite", () => {
    const favoriteItem = {
      id: "test-1",
      type: "news" as const,
      data: { title: "Test News", id: "test-1" },
    }

    const actual = favoritesReducer(initialState, addFavorite(favoriteItem))
    expect(actual.items).toHaveLength(1)
    expect(actual.items[0]).toEqual(favoriteItem)
  })

  it("should not add duplicate favorites", () => {
    const favoriteItem = {
      id: "test-1",
      type: "news" as const,
      data: { title: "Test News", id: "test-1" },
    }

    let state = favoritesReducer(initialState, addFavorite(favoriteItem))
    state = favoritesReducer(state, addFavorite(favoriteItem))

    expect(state.items).toHaveLength(1)
  })

  it("should handle removeFavorite", () => {
    const favoriteItem = {
      id: "test-1",
      type: "news" as const,
      data: { title: "Test News", id: "test-1" },
    }

    let state = favoritesReducer(initialState, addFavorite(favoriteItem))
    state = favoritesReducer(state, removeFavorite("test-1"))

    expect(state.items).toHaveLength(0)
  })
})
