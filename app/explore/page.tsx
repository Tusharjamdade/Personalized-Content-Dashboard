"use client"

export const dynamic = "force-dynamic"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ContentGrid } from "@/components/content/content-grid"
import { SectionHeader } from "@/components/content/section-header"
import { Search, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { NewsArticle } from "@/lib/store/slices/newsSlice"
import type { Recommendation } from "@/lib/store/slices/recommendationsSlice"
import type { SocialPost } from "@/lib/store/slices/socialSlice"
import { Suspense } from "react"

function ExploreContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{
    news: NewsArticle[]
    recommendations: Recommendation[]
    social: SocialPost[]
  }>({
    news: [],
    recommendations: [],
    social: [],
  })

  useEffect(() => {
    if (query) {
      setLoading(true)
      fetch(`/api/search?q=${encodeURIComponent(query)}&type=all`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [query])

  const totalResults = results.news.length + results.recommendations.length + results.social.length

  return (
    <>
      <SectionHeader
        title="Explore & Search"
        description={query ? `Search results for "${query}"` : "Search and discover new content"}
        icon={<Search className="h-8 w-8 text-primary" />}
      />

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Searching...</p>
          </div>
        </div>
      ) : query ? (
        <div className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{totalResults}</span> results for{" "}
              <span className="font-semibold text-foreground">"{query}"</span>
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Results ({totalResults})</TabsTrigger>
              <TabsTrigger value="news">News ({results.news.length})</TabsTrigger>
              <TabsTrigger value="movies">Movies ({results.recommendations.length})</TabsTrigger>
              <TabsTrigger value="social">Social ({results.social.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {results.news.length > 0 && (
                <section>
                  <h3 className="mb-4 text-xl font-semibold">News Articles</h3>
                  <ContentGrid items={results.news} type="news" />
                </section>
              )}

              {results.recommendations.length > 0 && (
                <section>
                  <h3 className="mb-4 text-xl font-semibold">Recommendations</h3>
                  <ContentGrid items={results.recommendations} type="recommendation" />
                </section>
              )}

              {results.social.length > 0 && (
                <section>
                  <h3 className="mb-4 text-xl font-semibold">Social Posts</h3>
                  <ContentGrid items={results.social} type="social" />
                </section>
              )}
            </TabsContent>

            <TabsContent value="news">
              {results.news.length > 0 ? (
                <ContentGrid items={results.news} type="news" />
              ) : (
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">No news articles found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="movies">
              {results.recommendations.length > 0 ? (
                <ContentGrid items={results.recommendations} type="recommendation" />
              ) : (
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">No recommendations found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="social">
              {results.social.length > 0 ? (
                <ContentGrid items={results.social} type="social" />
              ) : (
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">No social posts found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg font-medium">Start exploring</p>
            <p className="text-sm text-muted-foreground">Use the search bar to discover content</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function ExplorePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <ExploreContent />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
