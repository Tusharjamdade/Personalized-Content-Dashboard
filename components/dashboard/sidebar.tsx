"use client"

import { Home, TrendingUp, Star, Settings, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navItems = [
  {
    title: "Feed",
    href: "/",
    icon: Home,
  },
  {
    title: "Trending",
    href: "/trending",
    icon: TrendingUp,
  },
  {
    title: "Favorites",
    href: "/favorites",
    icon: Star,
  },
  {
    title: "Explore",
    href: "/explore",
    icon: Search,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar transition-all duration-300">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-16 items-center border-b border-sidebar-border px-6"
        >
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
            >
              <span className="font-mono text-lg font-bold text-primary-foreground">D</span>
            </motion.div>
            <span className="text-lg font-semibold text-sidebar-foreground">Dashboard</span>
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* User section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-sidebar-border p-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-sidebar-accent"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="text-sm font-semibold text-primary-foreground">U</span>
            </div>
            <div className="flex-1 text-sm">
              <p className="font-medium text-sidebar-foreground">User</p>
              <p className="text-xs text-sidebar-foreground/60">user@example.com</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </aside>
  )
}
