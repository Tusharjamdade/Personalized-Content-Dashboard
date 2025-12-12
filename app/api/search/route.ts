import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""
  const type = searchParams.get("type") || "all"

  await new Promise((resolve) => setTimeout(resolve, 300))

  const results = {
    news: [
      {
        id: "search-news-1",
        title: `Breaking: ${query} Developments Announced`,
        description: `Latest updates on ${query} show significant progress in the industry`,
        url: "https://example.com/news/search-1",
        image: `/placeholder.svg?height=400&width=600&query=${query} news`,
        source: "Search News",
        publishedAt: new Date().toISOString(),
        category: "technology",
      },
      {
        id: "search-news-2",
        title: `${query} Market Analysis and Trends`,
        description: `Comprehensive analysis of current ${query} market conditions`,
        url: "https://example.com/news/search-2",
        image: `/placeholder.svg?height=400&width=600&query=${query} analysis`,
        source: "Tech Journal",
        publishedAt: new Date().toISOString(),
        category: "business",
      },
    ],
    recommendations: [
      {
        id: "search-rec-1",
        title: `${query}: The Documentary`,
        description: `An in-depth look at ${query} and its impact on society`,
        image: `/placeholder.svg?height=450&width=300&query=${query} movie`,
        type: "movie" as const,
        rating: 8.7,
        year: 2024,
      },
    ],
    social: [
      {
        id: "search-social-1",
        username: "search_user",
        avatar: "/placeholder.svg?height=40&width=40",
        content: `Just discovered something amazing about ${query}! This is a game changer.`,
        likes: 456,
        comments: 23,
        timestamp: new Date().toISOString(),
        hashtags: [query.toLowerCase().replace(/\s+/g, ""), "trending"],
      },
    ],
  }

  if (type === "all") {
    return Response.json({
      news: results.news,
      recommendations: results.recommendations,
      social: results.social,
    })
  }

  return Response.json(results[type as keyof typeof results] || [])
}
