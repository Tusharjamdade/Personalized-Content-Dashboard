"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Heart, MessageCircle } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addFavorite, removeFavorite } from "@/lib/store/slices/favoritesSlice"
import type { NewsArticle } from "@/lib/store/slices/newsSlice"
import type { Recommendation } from "@/lib/store/slices/recommendationsSlice"
import type { SocialPost } from "@/lib/store/slices/socialSlice"
import { motion } from "framer-motion"
import Image from "next/image"

type ContentItem = NewsArticle | Recommendation | SocialPost

interface ContentCardProps {
  item: ContentItem
  type: "news" | "recommendation" | "social"
  index: number
}

export function ContentCard({ item, type, index }: ContentCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.items)
  const isFavorite = favorites.some((fav) => fav.id === item.id)

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id))
    } else {
      dispatch(addFavorite({ id: item.id, type, data: item }))
    }
  }

  const renderNewsCard = (article: NewsArticle) => (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <Image
          src={article.image || "/placeholder.svg?height=300&width=400"}
          alt={article.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full"
            onClick={(e) => {
              e.preventDefault()
              handleToggleFavorite()
            }}
          >
            <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {article.category}
          </span>
          <span className="text-xs text-muted-foreground">{article.source}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{article.title}</h3>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{article.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString()}</span>
          <Button size="sm" variant="ghost" asChild>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </>
  )

  const renderRecommendationCard = (rec: Recommendation) => (
    <>
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-lg">
        <Image
          src={rec.image || "/placeholder.svg?height=450&width=300"}
          alt={rec.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full"
            onClick={(e) => {
              e.preventDefault()
              handleToggleFavorite()
            }}
          >
            <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
          <span className="text-xs font-medium text-white">{rec.rating}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">{rec.type}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{rec.title}</h3>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{rec.description}</p>
        {"year" in rec && rec.year && <span className="text-xs text-muted-foreground">Released: {rec.year}</span>}
        {"artist" in rec && rec.artist && <span className="text-xs text-muted-foreground">Artist: {rec.artist}</span>}
      </CardContent>
    </>
  )

  const renderSocialCard = (post: SocialPost) => (
    <CardContent className="p-4">
      <div className="mb-4 flex items-start gap-3">
        <Image
          src={post.avatar || "/placeholder.svg?height=40&width=40"}
          alt={post.username}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{post.username}</p>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault()
                handleToggleFavorite()
              }}
            >
              <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">{new Date(post.timestamp).toLocaleString()}</span>
        </div>
      </div>

      <p className="mb-3 text-sm">{post.content}</p>

      {post.image && (
        <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg">
          <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
        </div>
      )}

      <div className="mb-3 flex flex-wrap gap-2">
        {post.hashtags.map((tag) => (
          <span key={tag} className="text-xs text-primary hover:underline">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <button className="flex items-center gap-1 hover:text-foreground">
          <Heart className="h-4 w-4" />
          {post.likes}
        </button>
        <button className="flex items-center gap-1 hover:text-foreground">
          <MessageCircle className="h-4 w-4" />
          {post.comments}
        </button>
      </div>
    </CardContent>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
        {type === "news" && renderNewsCard(item as NewsArticle)}
        {type === "recommendation" && renderRecommendationCard(item as Recommendation)}
        {type === "social" && renderSocialCard(item as SocialPost)}
      </Card>
    </motion.div>
  )
}
