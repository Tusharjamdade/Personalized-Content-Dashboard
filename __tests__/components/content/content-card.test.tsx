import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { ContentCard } from "@/components/content/content-card"
import favoritesReducer from "@/lib/store/slices/favoritesSlice"
import type { NewsArticle } from "@/lib/store/slices/newsSlice"

const mockStore = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
})

const mockNewsArticle: NewsArticle = {
  id: "test-1",
  title: "Test Article",
  description: "Test Description",
  url: "https://example.com",
  image: "/test-image.jpg",
  source: "Test Source",
  publishedAt: new Date().toISOString(),
  category: "technology",
}

describe("ContentCard", () => {
  it("renders news article correctly", () => {
    render(
      <Provider store={mockStore}>
        <ContentCard item={mockNewsArticle} type="news" index={0} />
      </Provider>,
    )

    expect(screen.getByText("Test Article")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
    expect(screen.getByText("technology")).toBeInTheDocument()
    expect(screen.getByText("Test Source")).toBeInTheDocument()
  })

  it("toggles favorite when star button is clicked", () => {
    render(
      <Provider store={mockStore}>
        <ContentCard item={mockNewsArticle} type="news" index={0} />
      </Provider>,
    )

    const favoriteButtons = screen.getAllByRole("button")
    const starButton = favoriteButtons.find((btn) => btn.querySelector("svg"))

    if (starButton) {
      fireEvent.click(starButton)
      // After clicking, the item should be added to favorites
      const state = mockStore.getState()
      expect(state.favorites.items).toHaveLength(1)
    }
  })

  it("displays read more link", () => {
    render(
      <Provider store={mockStore}>
        <ContentCard item={mockNewsArticle} type="news" index={0} />
      </Provider>,
    )

    const readMoreLink = screen.getByText("Read More").closest("a")
    expect(readMoreLink).toHaveAttribute("href", "https://example.com")
    expect(readMoreLink).toHaveAttribute("target", "_blank")
  })
})
