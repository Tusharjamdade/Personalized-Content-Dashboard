"use client"

export const dynamic = "force-dynamic"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchNews, fetchTrending } from "@/lib/store/slices/newsSlice"
import { fetchRecommendations } from "@/lib/store/slices/recommendationsSlice"
import { fetchSocialPosts } from "@/lib/store/slices/socialSlice"
import { ContentGrid } from "@/components/content/content-grid"
import { InfiniteScroll } from "@/components/content/infinite-scroll"
import { SectionHeader } from "@/components/content/section-header"
import { TrendingUp, Film, Newspaper } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { SkeletonCard } from "@/components/ui/skeleton-card"

export default function HomePage() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.preferences.categories)
  const { articles, loading, page, hasMore } = useAppSelector((state) => state.news)
  const recommendations = useAppSelector((state) => state.recommendations.items)
  const socialPosts = useAppSelector((state) => state.social.posts)
  const trending = useAppSelector((state) => state.news.trending)

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchNews({ categories, page: 1 }))
    dispatch(fetchTrending())
    dispatch(fetchRecommendations("movie"))
    dispatch(fetchSocialPosts("trending"))
  }, [dispatch, categories])

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchNews({ categories, page: page + 1 }))
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <FadeIn>
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight">Your Personalized Feed</h1>
            <p className="text-pretty text-muted-foreground">
              Stay updated with the latest news, recommendations, and trending content
            </p>
          </div>
        </FadeIn>

        <SlideIn direction="up">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* Trending Section */}
              {trending.length > 0 && (
                <FadeIn delay={0.1}>
                  <section>
                    <SectionHeader
                      title="Trending Now"
                      description="What's hot right now"
                      icon={<TrendingUp className="h-6 w-6 text-primary" />}
                    />
                    <div className="mt-4">
                      <ContentGrid items={trending} type="news" />
                    </div>
                  </section>
                </FadeIn>
              )}

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <FadeIn delay={0.2}>
                  <section>
                    <SectionHeader
                      title="Recommended for You"
                      description="Based on your interests"
                      icon={<Film className="h-6 w-6 text-accent" />}
                    />
                    <div className="mt-4">
                      <ContentGrid items={recommendations} type="recommendation" />
                    </div>
                  </section>
                </FadeIn>
              )}

              {/* News Feed */}
              <FadeIn delay={0.3}>
                <section>
                  <SectionHeader
                    title="Latest News"
                    description="Fresh stories from your favorite categories"
                    icon={<Newspaper className="h-6 w-6 text-primary" />}
                  />
                  <div className="mt-4">
                    {articles.length === 0 && loading ? (
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <SkeletonCard key={i} />
                        ))}
                      </div>
                    ) : (
                      <InfiniteScroll onLoadMore={handleLoadMore} hasMore={hasMore} loading={loading}>
                        <ContentGrid items={articles} type="news" />
                      </InfiniteScroll>
                    )}
                  </div>
                </section>
              </FadeIn>
            </TabsContent>

            <TabsContent value="news" className="space-y-4">
              <InfiniteScroll onLoadMore={handleLoadMore} hasMore={hasMore} loading={loading}>
                <ContentGrid items={articles} type="news" />
              </InfiniteScroll>
            </TabsContent>

            <TabsContent value="movies" className="space-y-4">
              <ContentGrid items={recommendations} type="recommendation" />
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <ContentGrid items={socialPosts} type="social" />
            </TabsContent>
          </Tabs>
        </SlideIn>
      </div>
    </DashboardLayout>
  )
}
