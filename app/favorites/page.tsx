"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useAppSelector } from "@/lib/store/hooks"
import { DraggableContentGrid } from "@/components/content/draggable-content-grid"
import { SectionHeader } from "@/components/content/section-header"
import { Star } from "lucide-react"
import { useState } from "react"

export const dynamic = "force-dynamic"

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items)
  const [newsItems, setNewsItems] = useState(favorites.filter((f) => f.type === "news").map((f) => f.data))
  const [recommendationItems, setRecommendationItems] = useState(
    favorites.filter((f) => f.type === "recommendation").map((f) => f.data),
  )
  const [socialItems, setSocialItems] = useState(favorites.filter((f) => f.type === "social").map((f) => f.data))

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <SectionHeader
            title="Your Favorites"
            description="All your saved content in one place"
            icon={<Star className="h-8 w-8 text-yellow-500" />}
          />
          <p className="mt-2 text-sm text-muted-foreground">Drag and drop cards to reorder them</p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <Star className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium">No favorites yet</p>
              <p className="text-sm text-muted-foreground">Start adding content to your favorites!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {newsItems.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold">News Articles</h2>
                <DraggableContentGrid items={newsItems} type="news" onReorder={setNewsItems} />
              </section>
            )}

            {recommendationItems.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold">Recommendations</h2>
                <DraggableContentGrid
                  items={recommendationItems}
                  type="recommendation"
                  onReorder={setRecommendationItems}
                />
              </section>
            )}

            {socialItems.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold">Social Posts</h2>
                <DraggableContentGrid items={socialItems} type="social" onReorder={setSocialItems} />
              </section>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
