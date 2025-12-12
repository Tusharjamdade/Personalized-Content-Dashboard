import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface FavoriteItem {
  id: string
  type: "news" | "recommendation" | "social"
  data: any
}

interface FavoritesState {
  items: FavoriteItem[]
}

const loadFavorites = (): FavoriteItem[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("favorites")
    if (saved) {
      return JSON.parse(saved)
    }
  }
  return []
}

const initialState: FavoritesState = {
  items: loadFavorites(),
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        if (typeof window !== "undefined") {
          localStorage.setItem("favorites", JSON.stringify(state.items))
        }
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.items))
      }
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
