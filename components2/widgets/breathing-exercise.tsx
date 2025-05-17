"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wind, Play, Pause, CheckCircle } from "lucide-react"
import { useHealth } from "@/components/health-provider"
import { motion, AnimatePresence } from "framer-motion"

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
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Wind className="h-5 w-5 text-blue-500" />
          Breathing Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="group-hover:bg-blue-50 rounded-b-lg transition-colors duration-200">
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
                  className="absolute rounded-full border-4 transition-all duration-200"
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
            {!showSuccess && <div className={`text-2xl font-semibold ${getColor()}`}>{getInstructions()}</div>}
          </div>

          <p className="text-sm text-gray-500 mb-4">{isActive ? getDuration() : "4-7-8 Breathing Technique"}</p>

          <Button
            onClick={toggleActive}
            className={`hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isActive
                ? "bg-red-500 hover:bg-red-600 focus:ring-red-200"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-200"
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
            <div className="mt-4 text-sm text-gray-600">
              <p className="mb-1">• Inhale through your nose for 4 seconds</p>
              <p className="mb-1">• Hold your breath for 7 seconds</p>
              <p>• Exhale through your mouth for 8 seconds</p>
            </div>
          )}
        </div>
      </CardContent>
      {lastSession && (
        <CardFooter className="text-xs text-gray-500 pt-0">
          Last session: {formatTime(lastSession.duration)} on {formatDate(lastSession.date)}
        </CardFooter>
      )}
    </Card>
  )
}
