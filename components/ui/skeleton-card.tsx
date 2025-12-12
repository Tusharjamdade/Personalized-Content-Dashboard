import { Card, CardContent } from "@/components/ui/card"

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full animate-pulse bg-muted" />
      <CardContent className="space-y-3 p-4">
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}
