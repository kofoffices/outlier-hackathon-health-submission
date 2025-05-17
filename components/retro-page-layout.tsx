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
import { Navbar } from "@/components/navbar"

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
        return <Heart className="h-6 w-6 text-retro-pink" />
      case "hydration":
        return <Droplet className="h-6 w-6 text-retro-blue" />
      case "sleep":
        return <Moon className="h-6 w-6 text-retro-purple" />
      case "nutrition":
        return <Apple className="h-6 w-6 text-retro-green" />
      case "fitness":
        return <Dumbbell className="h-6 w-6 text-retro-orange" />
      case "weight":
        return <Scale className="h-6 w-6 text-retro-yellow" />
      case "mental":
        return <Brain className="h-6 w-6 text-retro-red" />
      case "breathing":
        return <Wind className="h-6 w-6 text-retro-blue" />
      case "stretching":
        return <Stretch className="h-6 w-6 text-retro-orange" />
      default:
        return <Heart className="h-6 w-6 text-retro-pink" />
    }
  }

  const getHeaderColor = () => {
    switch (icon) {
      case "mood":
        return "bg-retro-pink border-retro-pink"
      case "hydration":
        return "bg-retro-blue border-retro-blue"
      case "sleep":
        return "bg-retro-purple border-retro-purple"
      case "nutrition":
        return "bg-retro-green border-retro-green"
      case "fitness":
        return "bg-retro-orange border-retro-orange"
      case "weight":
        return "bg-retro-yellow border-retro-yellow"
      case "mental":
        return "bg-retro-red border-retro-red"
      case "breathing":
        return "bg-retro-blue border-retro-blue"
      case "stretching":
        return "bg-retro-orange border-retro-orange"
      default:
        return "bg-retro-blue border-retro-blue"
    }
  }

  if (showLoadingScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-retro-darkGray">
        <div className="w-80 p-6 bg-retro-white border-4 border-retro-black rounded-none shadow-pixel">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-pixel text-retro-black">Loading {title}...</h2>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-window-minimize border-2 border-retro-black rounded-none"></div>
              <div className="w-3 h-3 bg-window-maximize border-2 border-retro-black rounded-none"></div>
              <div className="w-3 h-3 bg-window-close border-2 border-retro-black rounded-none"></div>
            </div>
          </div>
          <div className="w-full h-5 bg-retro-lightGray border-4 border-retro-black rounded-none overflow-hidden">
            <div
              className="h-full bg-retro-blue transition-all duration-200"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-right text-sm font-pixel text-retro-black">{loadingProgress}%</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className={cn("transition-all duration-300 p-4", isFullscreen ? "fixed inset-0 z-50 bg-retro-darkGray" : "")}>
        <div
          className={cn(
            "retro-window flex flex-col rounded-none border-4 border-retro-black shadow-pixel transition-all duration-200 bg-retro-white",
            isFullscreen ? "h-full" : "",
            isMinimized ? "h-12 overflow-hidden" : "",
          )}
        >
          <div
            className={cn(
              "retro-window-header flex items-center justify-between px-4 py-2 border-b-4 border-retro-black",
              getHeaderColor(),
            )}
          >
            <div className="flex items-center gap-2">
              {getIconComponent()}
              <div className="retro-window-title font-bold text-retro-black text-lg font-pixel">{title}</div>
            </div>
            <div className="retro-window-controls flex gap-2">
              <button
                onClick={toggleMinimize}
                className="retro-window-button w-6 h-6 flex items-center justify-center bg-window-minimize border-2 border-retro-black rounded-none hover:bg-opacity-80 transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3 text-retro-black" />
                ) : (
                  <Minimize2 className="h-3 w-3 text-retro-black" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="retro-window-button w-6 h-6 flex items-center justify-center bg-window-maximize border-2 border-retro-black rounded-none hover:bg-opacity-80 transition-colors"
              >
                <Maximize2 className="h-3 w-3 text-retro-black" />
              </button>
              <button
                onClick={() => window.history.back()}
                className="retro-window-button w-6 h-6 flex items-center justify-center bg-window-close border-2 border-retro-black rounded-none hover:bg-opacity-80 transition-colors"
              >
                <X className="h-3 w-3 text-retro-black" />
              </button>
            </div>
          </div>
          <div
            className={cn(
              "retro-window-content flex-1 p-6 bg-retro-white overflow-auto",
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
    </>
  )
}
