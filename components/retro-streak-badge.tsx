"use client"

import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface RetroStreakBadgeProps {
  streak: number
}

export function RetroStreakBadge({ streak }: RetroStreakBadgeProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (streak > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [streak])

  if (streak === 0) return null

  return (
    <div
      className={cn(
        "flex items-center gap-1 px-3 py-1 rounded-none text-sm font-bold",
        "border-4 border-retro-black shadow-pixel",
        "bg-retro-orange text-retro-black",
        "hover:scale-[1.02] transition-transform duration-200",
        isAnimating ? "animate-pixel-pulse" : "",
      )}
    >
      <Flame className={cn("h-4 w-4 text-retro-black", isAnimating ? "animate-pixel-bounce" : "")} />
      <span className="font-pixel">{streak}-day streak</span>
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full bg-retro-yellow opacity-20 rounded-none animate-pixel-pulse"></div>
        </div>
      )}
    </div>
  )
}
