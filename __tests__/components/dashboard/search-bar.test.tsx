import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { SearchBar } from "@/components/dashboard/search-bar"
import { useRouter, useSearchParams } from "next/navigation"
import jest from "jest" // Declare the jest variable

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe("SearchBar", () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    })
  })

  it("renders search input", () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText("Search news, movies, music...")).toBeInTheDocument()
  })

  it("debounces search input", async () => {
    jest.useFakeTimers()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText("Search news, movies, music...")
    fireEvent.change(input, { target: { value: "test query" } })

    // Should not navigate immediately
    expect(mockPush).not.toHaveBeenCalled()

    // Fast-forward time
    jest.advanceTimersByTime(500)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/explore?q=test%20query")
    })

    jest.useRealTimers()
  })

  it("does not navigate on empty search", async () => {
    jest.useFakeTimers()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText("Search news, movies, music...")
    fireEvent.change(input, { target: { value: "" } })

    jest.advanceTimersByTime(500)

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled()
    })

    jest.useRealTimers()
  })
})
