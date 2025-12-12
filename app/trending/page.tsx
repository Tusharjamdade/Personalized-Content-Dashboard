"use client"

export const dynamic = "force-dynamic"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useAppSelector } from "@/lib/store/hooks"
import { ContentGrid } from "@/components/content/content-grid"
import { SectionHeader } from "@/components/content/section-header"
import { TrendingUp } from "lucide-react"

export default function TrendingPage() {
  const trending = useAppSelector((state) => state.news.trending)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Trending Now"
          description="Discover what's hot across all categories"
          icon={<TrendingUp className="h-8 w-8 text-primary" />}
        />

        {trending.length > 0 ? (
          <ContentGrid items={trending} type="news" />
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">No trending content available</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
