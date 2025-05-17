"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Droplet, Plus, Minus } from "lucide-react"
import { useHealth } from "@/components/health-provider"
import confetti from "canvas-confetti"
import { RetroWindow } from "@/components/ui/retro-window"

export function HydrationTracker() {
  const { hydration, setHydration, incrementStreak } = useHealth()
  const { cups, goal } = hydration
  const progress = (cups / goal) * 100
  const [showConfetti, setShowConfetti] = useState(false)

  const addCup = () => {
    if (cups < goal) {
      const newCups = cups + 1
      setHydration({ ...hydration, cups: newCups })

      // If goal reached, trigger confetti and increment streak
      if (newCups === goal && !showConfetti) {
        setShowConfetti(true)
        incrementStreak()

        // Trigger confetti animation
        const canvas = document.createElement("canvas")
        canvas.style.position = "fixed"
        canvas.style.top = "0"
        canvas.style.left = "0"
        canvas.style.width = "100vw"
        canvas.style.height = "100vh"
        canvas.style.pointerEvents = "none"
        canvas.style.zIndex = "1000"
        document.body.appendChild(canvas)

        const myConfetti = confetti.create(canvas, {
          resize: true,
          useWorker: true,
        })

        myConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
        })

        setTimeout(() => {
          document.body.removeChild(canvas)
        }, 3000)
      }
    }
  }

  const removeCup = () => {
    if (cups > 0) {
      setHydration({ ...hydration, cups: cups - 1 })
      if (showConfetti) setShowConfetti(false)
    }
  }

  return (
    <RetroWindow
      title="Hydration Tracker"
      icon={<Droplet className="h-4 w-4 text-blue-500" />}
      variant="blue"
      className={`transition-all duration-200 ${showConfetti ? "ring-2 ring-blue-300" : ""}`}
    >
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
              strokeDasharray="100, 100"
              className="stroke-2 stroke-gray-800"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray={`${progress}, 100`}
              className="transition-all duration-500 stroke-2 stroke-blue-500"
            />
            <text
              x="18"
              y="20.5"
              textAnchor="middle"
              fontSize="8"
              fill="#3B82F6"
              fontWeight="bold"
              className="fill-blue-600 font-pixel"
            >
              {cups} / {goal}
            </text>
          </svg>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {Array.from({ length: goal }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-8 rounded-b-lg border-2 border-gray-800 transition-all duration-300 transform ${
              i < cups ? "bg-blue-400 group-hover:bg-blue-500" : "bg-gray-100 group-hover:bg-gray-200"
            } ${i === cups - 1 ? "scale-110" : ""}`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={removeCup}
          disabled={cups === 0}
          className="border-2 border-gray-800 text-blue-600 bg-blue-100 hover:bg-blue-200 hover:scale-[1.03] transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-[1px] hover:translate-x-[1px]"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={addCup}
          disabled={cups === goal}
          className="border-2 border-gray-800 text-blue-600 bg-blue-100 hover:bg-blue-200 hover:scale-[1.03] transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-[1px] hover:translate-x-[1px]"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-center text-sm text-gray-700 mt-4 font-bold">
        {cups < goal ? `${goal - cups} more cups to reach your goal!` : "You've reached your daily goal!"}
      </p>
    </RetroWindow>
  )
}
