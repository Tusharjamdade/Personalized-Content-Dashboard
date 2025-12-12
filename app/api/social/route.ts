import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const hashtag = request.nextUrl.searchParams.get("hashtag") || "trending"

  await new Promise((resolve) => setTimeout(resolve, 500))

  const posts = [
    {
      id: "post-1",
      username: "tech_enthusiast",
      avatar: "/diverse-user-avatars.png",
      content: `Amazing developments in #${hashtag} today! The future is here and it's incredible.`,
      image: "/tech-content.jpg",
      likes: 1234,
      comments: 89,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      hashtags: [hashtag, "innovation", "future"],
    },
    {
      id: "post-2",
      username: "creative_mind",
      avatar: "/creative-avatar.jpg",
      content: `Just discovered something incredible about #${hashtag}. Check this out!`,
      likes: 856,
      comments: 42,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      hashtags: [hashtag, "discovery"],
    },
    {
      id: "post-3",
      username: "daily_insights",
      avatar: "/professional-avatar.png",
      content: `Latest trends in #${hashtag} are reshaping the industry. Here's what you need to know.`,
      image: "/business-insights.jpg",
      likes: 2341,
      comments: 156,
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      hashtags: [hashtag, "trends", "business"],
    },
  ]

  return Response.json({ posts })
}
