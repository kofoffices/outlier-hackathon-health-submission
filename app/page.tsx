"use client"
import { useHealth } from "@/components/health-provider"
import { MoodTracker } from "@/components/widgets/mood-tracker"
import { HydrationTracker } from "@/components/widgets/hydration-tracker"
import { SleepTracker } from "@/components/widgets/sleep-tracker"
import { NutritionTracker } from "@/components/widgets/nutrition-tracker"
import { FitnessChecklist } from "@/components/widgets/fitness-checklist"
import { WeightTracker } from "@/components/widgets/weight-tracker"
import { MentalJournal } from "@/components/widgets/mental-journal"
import { BreathingExercise } from "@/components/widgets/breathing-exercise"
import { StretchRoutine } from "@/components/widgets/stretch-routine"

export default function Dashboard() {
  const { searchTerm } = useHealth()

  // Define all widgets with their titles for filtering
  const widgets = [
    { id: "mood", title: "Mood Tracker", component: <MoodTracker /> },
    { id: "hydration", title: "Hydration Tracker", component: <HydrationTracker /> },
    { id: "sleep", title: "Sleep Tracker", component: <SleepTracker /> },
    { id: "nutrition", title: "Nutrition Tracker", component: <NutritionTracker /> },
    { id: "fitness", title: "Fitness Checklist", component: <FitnessChecklist /> },
    { id: "weight", title: "Weight Tracker", component: <WeightTracker /> },
    { id: "mental", title: "Mental Journal", component: <MentalJournal /> },
    { id: "breathing", title: "Breathing Exercise", component: <BreathingExercise /> },
    { id: "stretch", title: "Stretch Routine", component: <StretchRoutine /> },
  ]

  // Filter widgets based on search term
  const filteredWidgets = searchTerm
    ? widgets.filter((widget) => widget.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : widgets

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWidgets.map((widget) => (
          <div key={widget.id} className="transition-all duration-200 hover:scale-[1.03] focus-within:scale-[1.03]">
            {widget.component}
          </div>
        ))}
      </div>
    </>
  )
}
