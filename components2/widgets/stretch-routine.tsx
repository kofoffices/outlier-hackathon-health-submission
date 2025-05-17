"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StretchVerticalIcon as Stretch, Play, Pause, Clock, GripVertical, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

// Mock data for stretch exercises
const stretchExercises = [
  { id: 1, name: "Neck Stretch", duration: 30, description: "Gently tilt your head to each side" },
  { id: 2, name: "Shoulder Rolls", duration: 45, description: "Roll shoulders forward and backward" },
  { id: 3, name: "Hamstring Stretch", duration: 60, description: "Bend forward at the hips" },
  { id: 4, name: "Quad Stretch", duration: 45, description: "Pull heel toward buttocks" },
  { id: 5, name: "Calf Stretch", duration: 30, description: "Extend leg back, press heel down" },
]

export function StretchRoutine() {
  const [exercises, setExercises] = useState(stretchExercises)
  const [activeExercise, setActiveExercise] = useState<number | null>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [exerciseProgress, setExerciseProgress] = useState(0)
  const [lastRoutineTime, setLastRoutineTime] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  const totalDuration = exercises.reduce((total, ex) => total + ex.duration, 0)
  const formattedDuration = `${Math.floor(totalDuration / 60)}:${(totalDuration % 60).toString().padStart(2, "0")}`

  // Load last routine time from localStorage
  useEffect(() => {
    const savedLastRoutine = localStorage.getItem("lastStretchRoutine")
    if (savedLastRoutine) {
      setLastRoutineTime(savedLastRoutine)
    }
  }, [])

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1)

        // Update current exercise progress
        const currentExercise = exercises[currentExerciseIndex]
        if (currentExercise) {
          const exerciseElapsed = timerSeconds % currentExercise.duration
          const progress = Math.min(100, (exerciseElapsed / currentExercise.duration) * 100)
          setExerciseProgress(progress)

          // Move to next exercise if current one is complete
          if (exerciseElapsed >= currentExercise.duration - 1) {
            if (currentExerciseIndex < exercises.length - 1) {
              setCurrentExerciseIndex((prev) => prev + 1)
              setExerciseProgress(0)

              toast({
                title: "Exercise complete!",
                description: `Moving on to ${exercises[currentExerciseIndex + 1].name}`,
              })
            }
          }
        }
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTimerRunning, timerSeconds, currentExerciseIndex, exercises, toast])

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Start or pause the routine
  const toggleRoutine = () => {
    if (isTimerRunning) {
      // Pause the routine
      setIsTimerRunning(false)

      // Save completion time
      const now = new Date().toLocaleString()
      setLastRoutineTime(now)
      localStorage.setItem("lastStretchRoutine", now)

      // Show completion message
      toast({
        title: "Routine paused!",
        description: `You've exercised for ${formatTime(timerSeconds)}`,
        variant: "default",
      })
    } else {
      // Start the routine
      setIsTimerRunning(true)
      setCurrentExerciseIndex(0)
      setExerciseProgress(0)

      if (timerSeconds === 0) {
        // Only reset timer if starting a new session
        setTimerSeconds(0)

        toast({
          title: "Routine started!",
          description: `Starting with ${exercises[0].name}`,
        })
      } else {
        toast({
          title: "Routine resumed!",
          description: `Continuing from ${formatTime(timerSeconds)}`,
        })
      }
    }
  }

  // Reset the routine
  const resetRoutine = () => {
    setIsTimerRunning(false)
    setTimerSeconds(0)
    setCurrentExerciseIndex(0)
    setExerciseProgress(0)

    toast({
      title: "Routine reset",
      description: "Ready to start a new routine!",
    })
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Stretch className="h-5 w-5 text-amber-500" />
          Stretch Routine
        </CardTitle>
      </CardHeader>
      <CardContent className="group-hover:bg-amber-50 rounded-b-lg transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Daily Routine</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-500 mr-1" />
              <p className="font-medium">{formattedDuration} min</p>
            </div>
          </div>
          <Button
            className={`hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isTimerRunning
                ? "bg-amber-600 hover:bg-amber-700 focus:ring-amber-300"
                : "bg-amber-500 hover:bg-amber-600 focus:ring-amber-200"
            }`}
            onClick={toggleRoutine}
          >
            {isTimerRunning ? (
              <>
                <Pause className="h-4 w-4 mr-1" />
                Pause Routine
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                {timerSeconds > 0 ? "Resume Routine" : "Start Routine"}
              </>
            )}
          </Button>
        </div>

        {/* Timer display when active */}
        {(isTimerRunning || timerSeconds > 0) && (
          <div className="mb-4 p-3 bg-amber-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm font-medium text-amber-800">Current Exercise</p>
                <p className="text-lg font-semibold text-amber-900">
                  {exercises[currentExerciseIndex]?.name || "Complete!"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-amber-800">Total Time</p>
                <p className="text-lg font-semibold text-amber-900">{formatTime(timerSeconds)}</p>
              </div>
            </div>

            {currentExerciseIndex < exercises.length && (
              <>
                <Progress value={exerciseProgress} className="h-2 bg-amber-200" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-amber-700">
                    {formatTime(timerSeconds % exercises[currentExerciseIndex].duration)}
                  </span>
                  <span className="text-xs text-amber-700">{formatTime(exercises[currentExerciseIndex].duration)}</span>
                </div>
              </>
            )}

            {timerSeconds > 0 && !isTimerRunning && (
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetRoutine}
                  className="text-amber-600 border-amber-300 hover:bg-amber-100"
                >
                  Reset
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2 mt-4">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={`flex items-center p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                index === currentExerciseIndex && isTimerRunning
                  ? "bg-amber-100 border-amber-300 animate-pulse"
                  : activeExercise === exercise.id
                    ? "bg-amber-50 border-amber-200 group-hover:bg-amber-100"
                    : "bg-white border-gray-200 hover:border-amber-200"
              }`}
              onClick={() => setActiveExercise(exercise.id === activeExercise ? null : exercise.id)}
            >
              <div className="mr-3 text-gray-400 cursor-move hover:text-amber-500 transition-colors duration-200">
                <GripVertical className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-gray-500">{exercise.duration}s</p>
                </div>
                <p className="text-xs text-gray-500">{exercise.description}</p>
              </div>
              {index < currentExerciseIndex && <CheckCircle className="h-5 w-5 text-green-500 ml-2" />}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Customize Routine</p>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-200 text-amber-600 hover:bg-amber-100 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Exercise
            </Button>
          </div>
        </div>
      </CardContent>

      {lastRoutineTime && (
        <CardFooter className="pt-0 text-xs text-gray-500">Last routine completed: {lastRoutineTime}</CardFooter>
      )}
    </Card>
  )
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
