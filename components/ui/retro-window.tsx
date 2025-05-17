"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { X, Minus, Square } from "lucide-react"

interface RetroWindowProps {
  title: string
  icon?: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  children: React.ReactNode
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  variant?: "pink" | "blue" | "green" | "yellow" | "purple" | "orange" | "teal" | "amber" | "rose"
  isMinimized?: boolean
  isMaximized?: boolean
}

export function RetroWindow({
  title,
  icon,
  className,
  headerClassName,
  contentClassName,
  children,
  onMinimize,
  onMaximize,
  onClose,
  variant = "blue",
  isMinimized = false,
  isMaximized = false,
}: RetroWindowProps) {
  // Color variants for the window headers
  const variantStyles = {
    pink: "from-pink-300 to-pink-200 border-pink-400",
    blue: "from-blue-300 to-blue-200 border-blue-400",
    green: "from-green-300 to-green-200 border-green-400",
    yellow: "from-yellow-300 to-yellow-200 border-yellow-400",
    purple: "from-purple-300 to-purple-200 border-purple-400",
    orange: "from-orange-300 to-orange-200 border-orange-400",
    teal: "from-teal-300 to-teal-200 border-teal-400",
    amber: "from-amber-300 to-amber-200 border-amber-400",
    rose: "from-rose-300 to-rose-200 border-rose-400",
  }

  return (
    <div
      className={cn(
        "retro-window flex flex-col rounded-md border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "retro-window-header flex items-center justify-between px-2 py-1 border-b-2 border-gray-800 bg-gradient-to-r",
          variantStyles[variant],
          headerClassName,
        )}
      >
        <div className="flex items-center gap-2">
          {icon && <div className="retro-window-icon">{icon}</div>}
          <div className="retro-window-title font-bold text-gray-800 text-sm">{title}</div>
        </div>
        <div className="retro-window-controls flex gap-1">
          <button
            onClick={onMinimize}
            className="retro-window-button w-4 h-4 flex items-center justify-center bg-yellow-400 border border-yellow-600 rounded-sm hover:bg-yellow-300 transition-colors"
          >
            <Minus className="h-2 w-2 text-yellow-800" />
          </button>
          <button
            onClick={onMaximize}
            className="retro-window-button w-4 h-4 flex items-center justify-center bg-green-400 border border-green-600 rounded-sm hover:bg-green-300 transition-colors"
          >
            <Square className="h-2 w-2 text-green-800" />
          </button>
          <button
            onClick={onClose}
            className="retro-window-button w-4 h-4 flex items-center justify-center bg-red-400 border border-red-600 rounded-sm hover:bg-red-300 transition-colors"
          >
            <X className="h-2 w-2 text-red-800" />
          </button>
        </div>
      </div>
      <div
        className={cn(
          "retro-window-content flex-1 p-3 bg-white bg-opacity-80 backdrop-blur-sm",
          isMinimized ? "hidden" : "",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
