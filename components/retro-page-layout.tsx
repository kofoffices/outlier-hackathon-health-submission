"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Heart,
  Droplet,
  Moon,
  Apple,
  Dumbbell,
  Scale,
  Brain,
  Wind,
  StretchVerticalIcon as Stretch,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { HealthFacts } from "@/components/health-facts"

type RetroPageLayoutProps = {
  children: React.ReactNode
  title: string
  icon: "mood" | "hydration" | "sleep" | "nutrition" | "fitness" | "weight" | "mental" | "breathing" | "stretching"
}

export function RetroPageLayout({ children, title, icon }: RetroPageLayoutProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading screen
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShowLoadingScreen(false)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const getIconComponent = () => {
    switch (icon) {
      case "mood":
        return <Heart className="h-6 w-6 text-pink-500" />
      case "hydration":
        return <Droplet className="h-6 w-6 text-blue-500" />
      case "sleep":
        return <Moon className="h-6 w-6 text-indigo-500" />
      case "nutrition":
        return <Apple className="h-6 w-6 text-green-500" />
      case "fitness":
        return <Dumbbell className="h-6 w-6 text-purple-500" />
      case "weight":
        return <Scale className="h-6 w-6 text-teal-500" />
      case "mental":
        return <Brain className="h-6 w-6 text-rose-500" />
      case "breathing":
        return <Wind className="h-6 w-6 text-blue-500" />
      case "stretching":
        return <Stretch className="h-6 w-6 text-amber-500" />
      default:
        return <Heart className="h-6 w-6 text-pink-500" />
    }
  }

  const getHeaderColor = () => {
    switch (icon) {
      case "mood":
        return "from-pink-300 to-pink-200 border-pink-400"
      case "hydration":
        return "from-blue-300 to-blue-200 border-blue-400"
      case "sleep":
        return "from-indigo-300 to-indigo-200 border-indigo-400"
      case "nutrition":
        return "from-green-300 to-green-200 border-green-400"
      case "fitness":
        return "from-purple-300 to-purple-200 border-purple-400"
      case "weight":
        return "from-teal-300 to-teal-200 border-teal-400"
      case "mental":
        return "from-rose-300 to-rose-200 border-rose-400"
      case "breathing":
        return "from-blue-300 to-blue-200 border-blue-400"
      case "stretching":
        return "from-amber-300 to-amber-200 border-amber-400"
      default:
        return "from-blue-300 to-blue-200 border-blue-400"
    }
  }

  if (showLoadingScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="w-80 p-6 bg-white border-2 border-gray-800 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold pixel-font">Loading {title}...</h2>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-yellow-400 border border-yellow-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-400 border border-green-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-red-400 border border-red-600 rounded-sm"></div>
            </div>
          </div>
          <div className="w-full h-5 bg-gray-200 border-2 border-gray-800 rounded-sm overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-right text-sm font-bold">{loadingProgress}%</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("transition-all duration-300 p-4", isFullscreen ? "fixed inset-0 z-50 bg-gray-100" : "")}>
      <div
        className={cn(
          "retro-window flex flex-col rounded-md border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-all duration-200 bg-white",
          isFullscreen ? "h-full" : "",
          isMinimized ? "h-12 overflow-hidden" : "",
        )}
      >
        <div
          className={cn(
            "retro-window-header flex items-center justify-between px-4 py-2 border-b-2 border-gray-800 bg-gradient-to-r",
            getHeaderColor(),
          )}
        >
          <div className="flex items-center gap-2">
            {getIconComponent()}
            <div className="retro-window-title font-bold text-gray-800 text-lg pixel-font">{title}</div>
          </div>
          <div className="retro-window-controls flex gap-2">
            <button
              onClick={toggleMinimize}
              className="retro-window-button w-6 h-6 flex items-center justify-center bg-yellow-400 border-2 border-yellow-600 rounded-sm hover:bg-yellow-300 transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="h-3 w-3 text-yellow-800" />
              ) : (
                <Minimize2 className="h-3 w-3 text-yellow-800" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="retro-window-button w-6 h-6 flex items-center justify-center bg-green-400 border-2 border-green-600 rounded-sm hover:bg-green-300 transition-colors"
            >
              <Maximize2 className="h-3 w-3 text-green-800" />
            </button>
            <button
              onClick={() => window.history.back()}
              className="retro-window-button w-6 h-6 flex items-center justify-center bg-red-400 border-2 border-red-600 rounded-sm hover:bg-red-300 transition-colors"
            >
              <X className="h-3 w-3 text-red-800" />
            </button>
          </div>
        </div>
        <div
          className={cn(
            "retro-window-content flex-1 p-6 bg-white bg-opacity-80 backdrop-blur-sm overflow-auto",
            isMinimized ? "hidden" : "",
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">{children}</div>
            <div className="md:col-span-1">
              <HealthFacts category={icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
