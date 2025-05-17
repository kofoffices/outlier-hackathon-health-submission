"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for our health data
type HydrationData = {
  cups: number
  goal: number
}

type BreathingSession = {
  date: string
  duration: number
}

type MealEntry = {
  name: string
  calories: number
  time: string
  protein?: number
  carbs?: number
  fat?: number
}

type ExerciseItem = {
  id: number
  name: string
  duration: number
  description: string
  completed: boolean
}

type HealthContextType = {
  hydration: HydrationData
  setHydration: React.Dispatch<React.SetStateAction<HydrationData>>
  breathingSessions: BreathingSession[]
  addBreathingSession: (duration: number) => void
  getLastBreathingSession: () => BreathingSession | null
  streak: number
  incrementStreak: () => void
  resetStreak: () => void
  meals: MealEntry[]
  addMeal: (meal: MealEntry) => void
  exercises: ExerciseItem[]
  addExercise: (exercise: Omit<ExerciseItem, "id" | "completed">) => void
  toggleExercise: (id: number) => void
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const HealthContext = createContext<HealthContextType | undefined>(undefined)

export function HealthProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with localStorage values or defaults
  const [hydration, setHydration] = useState<HydrationData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hydration")
      return saved ? JSON.parse(saved) : { cups: 3, goal: 8 }
    }
    return { cups: 3, goal: 8 }
  })

  const [breathingSessions, setBreathingSessions] = useState<BreathingSession[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("breathingSessions")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [streak, setStreak] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("streak")
      return saved ? Number.parseInt(saved, 10) : 0
    }
    return 0
  })

  const [meals, setMeals] = useState<MealEntry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("meals")
      return saved
        ? JSON.parse(saved)
        : [
            { name: "Breakfast", calories: 350, time: "8:30 AM" },
            { name: "Lunch", calories: 550, time: "12:45 PM" },
            { name: "Snack", calories: 150, time: "3:30 PM" },
            { name: "Dinner", calories: 400, time: "7:00 PM" },
          ]
    }
    return [
      { name: "Breakfast", calories: 350, time: "8:30 AM" },
      { name: "Lunch", calories: 550, time: "12:45 PM" },
      { name: "Snack", calories: 150, time: "3:30 PM" },
      { name: "Dinner", calories: 400, time: "7:00 PM" },
    ]
  })

  const [exercises, setExercises] = useState<ExerciseItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("exercises")
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              name: "Morning Stretching",
              duration: 10,
              description: "Gently tilt your head to each side",
              completed: true,
            },
            {
              id: 2,
              name: "Cardio Workout",
              duration: 30,
              description: "Run or jog at moderate pace",
              completed: false,
            },
            { id: 3, name: "Strength Training", duration: 45, description: "Focus on upper body", completed: false },
            { id: 4, name: "Evening Yoga", duration: 20, description: "Relaxation poses", completed: false },
          ]
    }
    return [
      {
        id: 1,
        name: "Morning Stretching",
        duration: 10,
        description: "Gently tilt your head to each side",
        completed: true,
      },
      { id: 2, name: "Cardio Workout", duration: 30, description: "Run or jog at moderate pace", completed: false },
      { id: 3, name: "Strength Training", duration: 45, description: "Focus on upper body", completed: false },
      { id: 4, name: "Evening Yoga", duration: 20, description: "Relaxation poses", completed: false },
    ]
  })

  const [searchTerm, setSearchTerm] = useState("")

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("hydration", JSON.stringify(hydration))
  }, [hydration])

  useEffect(() => {
    localStorage.setItem("breathingSessions", JSON.stringify(breathingSessions))
  }, [breathingSessions])

  useEffect(() => {
    localStorage.setItem("streak", streak.toString())
  }, [streak])

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals))
  }, [meals])

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises))
  }, [exercises])

  // Helper functions
  const addBreathingSession = (duration: number) => {
    const newSession = {
      date: new Date().toISOString(),
      duration,
    }
    setBreathingSessions((prev) => [newSession, ...prev])
    incrementStreak()
  }

  const getLastBreathingSession = () => {
    return breathingSessions.length > 0 ? breathingSessions[0] : null
  }

  const incrementStreak = () => {
    setStreak((prev) => prev + 1)
  }

  const resetStreak = () => {
    setStreak(0)
  }

  const addMeal = (meal: MealEntry) => {
    setMeals((prev) => [...prev, meal])
    incrementStreak()
  }

  const addExercise = (exercise: Omit<ExerciseItem, "id" | "completed">) => {
    const newExercise = {
      ...exercise,
      id: exercises.length > 0 ? Math.max(...exercises.map((e) => e.id)) + 1 : 1,
      completed: false,
    }
    setExercises((prev) => [...prev, newExercise])
  }

  const toggleExercise = (id: number) => {
    setExercises((prev) =>
      prev.map((exercise) => (exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise)),
    )
    incrementStreak()
  }

  const value = {
    hydration,
    setHydration,
    breathingSessions,
    addBreathingSession,
    getLastBreathingSession,
    streak,
    incrementStreak,
    resetStreak,
    meals,
    addMeal,
    exercises,
    addExercise,
    toggleExercise,
    searchTerm,
    setSearchTerm,
  }

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>
}

export function useHealth() {
  const context = useContext(HealthContext)
  if (context === undefined) {
    throw new Error("useHealth must be used within a HealthProvider")
  }
  return context
}
