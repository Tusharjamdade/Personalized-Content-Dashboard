"use client"

export const dynamic = "force-dynamic"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setCategories } from "@/lib/store/slices/preferencesSlice"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const availableCategories = [
  "technology",
  "business",
  "sports",
  "entertainment",
  "science",
  "health",
  "politics",
  "world",
]

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const selectedCategories = useAppSelector((state) => state.preferences.categories)
  const [tempCategories, setTempCategories] = useState(selectedCategories)

  const toggleCategory = (category: string) => {
    if (tempCategories.includes(category)) {
      setTempCategories(tempCategories.filter((c) => c !== category))
    } else {
      setTempCategories([...tempCategories, category])
    }
  }

  const handleSave = () => {
    dispatch(setCategories(tempCategories))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-pretty text-muted-foreground">Customize your dashboard experience</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Preferences</CardTitle>
            <CardDescription>Select the categories you're interested in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Selected Categories</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {tempCategories.map((category) => (
                  <Badge key={category} variant="default" className="gap-1">
                    {category}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="ml-1 rounded-full hover:bg-primary-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Available Categories</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {availableCategories
                  .filter((cat) => !tempCategories.includes(cat))
                  .map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      + {category}
                    </Badge>
                  ))}
              </div>
            </div>

            <Button onClick={handleSave}>Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
