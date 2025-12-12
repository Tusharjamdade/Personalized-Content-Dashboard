export async function GET() {
  const articles = [
    {
      id: "trending-1",
      title: "Major Tech Breakthrough Announced",
      description: "Industry leaders unveil revolutionary new technology",
      url: "https://example.com/trending/1",
      image: "/tech-breakthrough.jpg",
      source: "Tech Daily",
      publishedAt: new Date().toISOString(),
      category: "technology",
    },
    {
      id: "trending-2",
      title: "Global Markets Reach New Heights",
      description: "Stock markets see unprecedented growth",
      url: "https://example.com/trending/2",
      image: "/stock-market-analysis.png",
      source: "Finance News",
      publishedAt: new Date().toISOString(),
      category: "business",
    },
    {
      id: "trending-3",
      title: "Championship Finals Draw Record Viewers",
      description: "Historic sports event captivates millions",
      url: "https://example.com/trending/3",
      image: "/sports-championship-celebration.png",
      source: "Sports Network",
      publishedAt: new Date().toISOString(),
      category: "sports",
    },
  ]

  return Response.json({ articles })
}
