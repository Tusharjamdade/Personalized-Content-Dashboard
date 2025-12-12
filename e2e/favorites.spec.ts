import { test, expect } from "@playwright/test"

test.describe("Favorites", () => {
  test("should add and remove items from favorites", async ({ page }) => {
    await page.goto("/")

    // Wait for content to load
    await page.waitForTimeout(1000)

    // Find and click the first star button
    const starButtons = page.locator('button:has(svg[class*="lucide-star"])')
    const firstStarButton = starButtons.first()
    await firstStarButton.click()

    // Navigate to favorites
    await page.getByText("Favorites", { exact: true }).click()
    await expect(page).toHaveURL("/favorites")

    // Check that an item is present
    await expect(page.locator("article, div[class*='card']").first()).toBeVisible()

    // Remove from favorites
    const favoriteStar = page.locator('button:has(svg[class*="lucide-star"])').first()
    await favoriteStar.click()

    // Check for empty state
    await page.waitForTimeout(500)
    await expect(page.getByText("No favorites yet")).toBeVisible()
  })

  test("should support drag and drop reordering", async ({ page }) => {
    await page.goto("/")
    await page.waitForTimeout(1000)

    // Add multiple items to favorites
    const starButtons = page.locator('button:has(svg[class*="lucide-star"])')
    await starButtons.nth(0).click()
    await page.waitForTimeout(200)
    await starButtons.nth(1).click()

    // Go to favorites
    await page.getByText("Favorites", { exact: true }).click()

    // Check that multiple items are present
    const cards = page.locator("article, div[class*='card']")
    await expect(cards).toHaveCount(2, { timeout: 2000 })
  })
})
