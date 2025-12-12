import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SectionHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
  icon?: React.ReactNode
}

export function SectionHeader({ title, description, action, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Button asChild variant="outline">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  )
}
