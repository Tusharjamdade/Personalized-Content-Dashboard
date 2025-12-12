import { test, expect } from "@playwright/test"

test.describe("Search Functionality", () => {
  test("should search and display results", async ({ page }) => {
    await page.goto("/")

    // Type in search bar
    const searchInput = page.getByPlaceholder("Search news, movies, music...")
    await searchInput.fill("technology")

    // Wait for debounce and navigation
    await page.waitForURL("**/explore?q=technology", { timeout: 1000 })

    // Check results page
    await expect(page.getByText('Search results for "technology"')).toBeVisible()
    await expect(page.getByText(/Found.*results/)).toBeVisible()
  })

  test("should filter search results by category", async ({ page }) => {
    await page.goto("/explore?q=test")

    // Wait for results to load
    await page.waitForTimeout(500)

    // Check tabs are present
    await expect(page.getByRole("tab", { name: /All Results/ })).toBeVisible()
    await expect(page.getByRole("tab", { name: /News/ })).toBeVisible()
    await expect(page.getByRole("tab", { name: /Movies/ })).toBeVisible()

    // Click on News tab
    await page.getByRole("tab", { name: /News/ }).click()

    // Should show news results
    await expect(page.getByText("Breaking:")).toBeVisible()
  })
})
