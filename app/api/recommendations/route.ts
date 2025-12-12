import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") || "movie"

  await new Promise((resolve) => setTimeout(resolve, 500))

  const recommendations =
    type === "movie"
      ? [
          {
            id: "movie-1",
            title: "The Future Chronicles",
            description: "A gripping sci-fi adventure that explores the boundaries of time and space",
            image: "/sci-fi-movie-poster.png",
            type: "movie" as const,
            rating: 8.5,
            year: 2024,
          },
          {
            id: "movie-2",
            title: "Beyond the Horizon",
            description: "An epic tale of courage and discovery in uncharted territories",
            image: "/adventure-movie-poster.png",
            type: "movie" as const,
            rating: 9.1,
            year: 2024,
          },
          {
            id: "movie-3",
            title: "Digital Dreams",
            description: "A thought-provoking drama about artificial intelligence and humanity",
            image: "/drama-movie-poster.png",
            type: "movie" as const,
            rating: 8.8,
            year: 2023,
          },
        ]
      : [
          {
            id: "music-1",
            title: "Midnight Echoes",
            description: "Latest album from emerging indie artist",
            image: "/abstract-soundscape.png",
            type: "music" as const,
            rating: 4.5,
            artist: "Luna Rivers",
          },
          {
            id: "music-2",
            title: "Electric Sunrise",
            description: "Fresh electronic beats for your playlist",
            image: "/electronic-music.jpg",
            type: "music" as const,
            rating: 4.8,
            artist: "Neon Pulse",
          },
        ]

  return Response.json({ recommendations })
}
