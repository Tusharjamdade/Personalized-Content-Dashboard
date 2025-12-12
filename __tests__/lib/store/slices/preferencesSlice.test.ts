import preferencesReducer, {
  setCategories,
  toggleDarkMode,
  setLanguage,
  type PreferencesState,
} from "@/lib/store/slices/preferencesSlice"

describe("preferencesSlice", () => {
  const initialState: PreferencesState = {
    categories: ["technology", "business", "sports"],
    darkMode: false,
    language: "en",
  }

  it("should return the initial state", () => {
    expect(preferencesReducer(undefined, { type: "unknown" })).toEqual({
      categories: ["technology", "business", "sports"],
      darkMode: false,
      language: "en",
    })
  })

  it("should handle setCategories", () => {
    const newCategories = ["science", "health"]
    const actual = preferencesReducer(initialState, setCategories(newCategories))
    expect(actual.categories).toEqual(newCategories)
  })

  it("should handle toggleDarkMode", () => {
    const actual = preferencesReducer(initialState, toggleDarkMode())
    expect(actual.darkMode).toBe(true)

    const actualAgain = preferencesReducer(actual, toggleDarkMode())
    expect(actualAgain.darkMode).toBe(false)
  })

  it("should handle setLanguage", () => {
    const actual = preferencesReducer(initialState, setLanguage("es"))
    expect(actual.language).toBe("es")
  })
})
