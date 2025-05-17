"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { MoodTracker } from "@/components/widgets/mood-tracker"
import { HydrationTracker } from "@/components/widgets/hydration-tracker"
import { SleepTracker } from "@/components/widgets/sleep-tracker"
import { NutritionTracker } from "@/components/widgets/nutrition-tracker"
import { FitnessChecklist } from "@/components/widgets/fitness-checklist"
import { WeightTracker } from "@/components/widgets/weight-tracker"
import { MentalJournal } from "@/components/widgets/mental-journal"
import { BreathingExercise } from "@/components/widgets/breathing-exercise"
import { StretchRoutine } from "@/components/widgets/stretch-routine"

export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 pixel-font">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MoodTracker />
            <HydrationTracker />
            <SleepTracker />
            <NutritionTracker />
            <FitnessChecklist />
            <WeightTracker />
            <MentalJournal />
            <BreathingExercise />
            <StretchRoutine />
          </div>
        </main>
      </div>
    </div>
  )
}
