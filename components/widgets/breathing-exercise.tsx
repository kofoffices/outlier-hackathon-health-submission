"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Wind, Play, Pause, CheckCircle } from "lucide-react"
import { useHealth } from "@/components/health-provider"
import { motion, AnimatePresence } from "framer-motion"
import { RetroWindow } from "@/components/ui/retro-window"

export function BreathingExercise() {
  const { addBreathingSession, getLastBreathingSession } = useHealth()
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [progress, setProgress] = useState(0)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSession = getLastBreathingSession()

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (sessionTimerRef.current) clearInterval(sessionTimerRef.current)

    if (isActive) {
      // Timer for breathing phases
      timerRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            // Switch phases
            if (phase === "inhale") {
              setPhase("hold")
            } else if (phase === "hold") {
              setPhase("exhale")
            } else {
              setPhase("inhale")
            }
            return 0
          }
          return prevProgress + 1
        })
      }, 50)

      // Timer for session duration
      sessionTimerRef.current = setInterval(() => {
        setSessionDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current)
    }
  }, [isActive, phase])

  const toggleActive = () => {
    if (isActive) {
      // Stopping the session
      if (sessionDuration > 5) {
        // Only count sessions longer than 5 seconds
        addBreathingSession(sessionDuration)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }
      setSessionDuration(0)
    } else {
      // Starting a new session
      setPhase("inhale")
      setProgress(0)
    }
    setIsActive(!isActive)
  }

  const getInstructions = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
    }
  }

  const getDuration = () => {
    switch (phase) {
      case "inhale":
        return "4 seconds"
      case "hold":
        return "7 seconds"
      case "exhale":
        return "8 seconds"
    }
  }

  const getColor = () => {
    switch (phase) {
      case "inhale":
        return "text-blue-500"
      case "hold":
        return "text-purple-500"
      case "exhale":
        return "text-teal-500"
    }
  }

  const getCircleSize = () => {
    if (phase === "inhale") {
      return 100 + progress * 0.5
    } else if (phase === "exhale") {
      return 150 - progress * 0.5
    }
    return 150
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <RetroWindow
      title="Breathing Exercise"
      icon={<Wind className="h-4 w-4 text-blue-500" />}
      variant="teal"
      className="transition-all duration-200"
    >
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative flex items-center justify-center mb-6" style={{ height: "150px" }}>
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute"
              >
                <CheckCircle className="h-24 w-24 text-green-500" />
              </motion.div>
            ) : (
              <motion.div
                key="circle"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="absolute rounded-full border-4 border-gray-800 transition-all duration-200"
                style={{
                  width: `${getCircleSize()}px`,
                  height: `${getCircleSize()}px`,
                  borderColor:
                    phase === "inhale"
                      ? "#60A5FA" // blue-400
                      : phase === "hold"
                        ? "#A78BFA" // purple-400
                        : "#2DD4BF", // teal-400
                }}
              />
            )}
          </AnimatePresence>
          {!showSuccess && <div className={`text-2xl font-bold ${getColor()}`}>{getInstructions()}</div>}
        </div>

        <p className="text-sm text-gray-700 mb-4 font-bold">{isActive ? getDuration() : "4-7-8 Breathing Technique"}</p>

        <Button
          onClick={toggleActive}
          className={`hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-[1px] hover:translate-x-[1px] ${
            isActive ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          {isActive ? (
            <>
              <Pause className="h-4 w-4 mr-2" /> Stop Exercise ({formatTime(sessionDuration)})
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" /> Start Exercise
            </>
          )}
        </Button>

        {!isActive && !showSuccess && (
          <div className="mt-4 text-sm text-gray-700 font-bold border-2 border-gray-800 p-3 rounded-md bg-teal-50">
            <p className="mb-1">• Inhale through your nose for 4 seconds</p>
            <p className="mb-1">• Hold your breath for 7 seconds</p>
            <p>• Exhale through your mouth for 8 seconds</p>
          </div>
        )}
      </div>

      {lastSession && (
        <div className="text-xs text-gray-700 pt-2 border-t-2 border-gray-300 mt-2 font-bold">
          Last session: {formatTime(lastSession.duration)} on {formatDate(lastSession.date)}
        </div>
      )}
    </RetroWindow>
  )
}
