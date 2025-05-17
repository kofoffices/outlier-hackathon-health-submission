"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, Plus, Minus } from "lucide-react"
import { useHealth } from "@/components/health-provider"
import confetti from "canvas-confetti"

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
    <Card
      className={`shadow-sm hover:shadow-md transition-all duration-200 group ${showConfetti ? "ring-2 ring-blue-300" : ""}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Droplet className="h-5 w-5 text-blue-500" />
          Hydration Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="group-hover:bg-blue-50 rounded-b-lg transition-colors duration-200">
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray={`${progress}, 100`}
                className="transition-all duration-500"
              />
              <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#3B82F6" fontWeight="bold">
                {cups} / {goal}
              </text>
            </svg>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {Array.from({ length: goal }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-8 rounded-b-lg border-2 transition-all duration-300 transform ${
                i < cups
                  ? "bg-blue-400 border-blue-500 group-hover:bg-blue-500 group-hover:border-blue-600"
                  : "bg-gray-100 border-gray-300 group-hover:bg-gray-200"
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
            className="border-blue-200 text-blue-600 hover:bg-blue-100 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={addCup}
            disabled={cups === goal}
            className="border-blue-200 text-blue-600 hover:bg-blue-100 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          {cups < goal ? `${goal - cups} more cups to reach your goal!` : "You've reached your daily goal!"}
        </p>
      </CardContent>
    </Card>
  )
}
