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
        "flex items-center gap-1 px-3 py-1 rounded-md text-sm font-bold",
        "border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]",
        "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
        "hover:scale-[1.03] transition-transform duration-200",
        isAnimating ? "animate-[pulse_0.5s_ease-in-out_3]" : "",
      )}
    >
      <Flame className={cn("h-4 w-4 text-white", isAnimating ? "animate-[spin_1s_ease-in-out_1]" : "")} />
      <span className="pixel-font">{streak}-day streak</span>
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full bg-yellow-500 opacity-20 rounded-md animate-ping"></div>
        </div>
      )}
    </div>
  )
}
