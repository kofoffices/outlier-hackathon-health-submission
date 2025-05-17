"use client"

import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakBadgeProps {
  streak: number
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak === 0) return null

  return (
    <div
      className={cn(
        "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
        "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
        "hover:scale-[1.03] transition-transform duration-200",
        "animate-[pulse_2s_ease-in-out_1]",
      )}
    >
      <Flame className="h-4 w-4 text-white" />
      <span>{streak}-day streak</span>
    </div>
  )
}
