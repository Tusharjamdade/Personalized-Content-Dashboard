import { test, expect } from "@playwright/test"

test.describe("Dashboard", () => {
  test("should display main dashboard layout", async ({ page }) => {
    await page.goto("/")

    // Check for sidebar
    await expect(page.getByText("Dashboard")).toBeVisible()
    await expect(page.getByText("Feed")).toBeVisible()
    await expect(page.getByText("Trending")).toBeVisible()
    await expect(page.getByText("Favorites")).toBeVisible()

    // Check for header
    await expect(page.getByPlaceholder("Search news, movies, music...")).toBeVisible()

    // Check for main content
    await expect(page.getByText("Your Personalized Feed")).toBeVisible()
  })

  test("should navigate to different pages", async ({ page }) => {
    await page.goto("/")

    // Navigate to Trending
    await page.getByText("Trending", { exact: true }).click()
    await expect(page).toHaveURL("/trending")
    await expect(page.getByText("Trending Now")).toBeVisible()

    // Navigate to Favorites
    await page.getByText("Favorites", { exact: true }).click()
    await expect(page).toHaveURL("/favorites")
    await expect(page.getByText("Your Favorites")).toBeVisible()

    // Navigate to Settings
    await page.getByText("Settings", { exact: true }).click()
    await expect(page).toHaveURL("/settings")
    await expect(page.getByText("Content Preferences")).toBeVisible()
  })

  test("should toggle dark mode", async ({ page }) => {
    await page.goto("/")

    // Get initial theme
    const htmlElement = page.locator("html")
    const initialHasClass = await htmlElement.evaluate((el) => el.classList.contains("dark"))

    // Click dark mode toggle
    await page.getByRole("button", { name: "Toggle theme" }).click()

    // Wait for theme to change
    await page.waitForTimeout(300)

    // Check that theme toggled
    const finalHasClass = await htmlElement.evaluate((el) => el.classList.contains("dark"))
    expect(finalHasClass).toBe(!initialHasClass)
  })
})
