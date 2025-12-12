import type { NextRequest } from "next/server"

// Mock data generator for news
function generateMockNews(category: string, page: number) {
  const categories = category.split(",")
  const articles = []
  const itemsPerPage = 12

  for (let i = 0; i < itemsPerPage; i++) {
    const cat = categories[i % categories.length]
    articles.push({
      id: `${cat}-${page}-${i}`,
      title: `${cat.charAt(0).toUpperCase() + cat.slice(1)}: Breaking News Story ${page * itemsPerPage + i}`,
      description: `This is a detailed description of the latest ${cat} news. Stay informed with real-time updates from around the world.`,
      url: `https://example.com/news/${cat}/${page}-${i}`,
      image: `/placeholder.svg?height=400&width=600&query=${cat} news`,
      source: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Times`,
      publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      category: cat,
    })
  }

  return { articles, hasMore: page < 5 }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category") || "technology"
  const page = Number.parseInt(searchParams.get("page") || "1")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const data = generateMockNews(category, page)
  return Response.json(data)
}
