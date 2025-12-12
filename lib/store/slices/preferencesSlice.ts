import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface PreferencesState {
  categories: string[]
  darkMode: boolean
  language: string
}

const loadPreferences = (): PreferencesState => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("userPreferences")
    if (saved) {
      return JSON.parse(saved)
    }
  }
  return {
    categories: ["technology", "business", "sports"],
    darkMode: false,
    language: "en",
  }
}

const initialState: PreferencesState = loadPreferences()

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
        document.documentElement.classList.toggle("dark", state.darkMode)
      }
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
  },
})

export const { setCategories, toggleDarkMode, setLanguage } = preferencesSlice.actions
export default preferencesSlice.reducer
