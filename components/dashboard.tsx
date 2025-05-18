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
            <DashboardFrame title="Mood Tracker" icon={<i className="fas fa-smile"></i>}>
              <MoodTracker />
            </DashboardFrame>
            <DashboardFrame title="Hydration Tracker" icon={<i className="fas fa-tint"></i>}>
              <HydrationTracker />
            </DashboardFrame>
            <DashboardFrame title="Sleep Tracker" icon={<i className="fas fa-bed"></i>}>
              <SleepTracker />
            </DashboardFrame>
            <DashboardFrame title="Nutrition Tracker" icon={<i className="fas fa-apple-alt"></i>}>
              <NutritionTracker />
            </DashboardFrame>
            <DashboardFrame title="Fitness Checklist" icon={<i className="fas fa-dumbbell"></i>}>
              <FitnessChecklist />
            </DashboardFrame>
            <DashboardFrame title="Weight Tracker" icon={<i className="fas fa-weight"></i>}>
              <WeightTracker />
            </DashboardFrame>
            <DashboardFrame title="Mental Journal" icon={<i className="fas fa-book"></i>}>
              <MentalJournal />
            </DashboardFrame>
            <DashboardFrame title="Breathing Exercise" icon={<i className="fas fa-lungs"></i>}>
              <BreathingExercise />
            </DashboardFrame>
            <DashboardFrame title="Stretch Routine" icon={<i className="fas fa-people-arrows"></i>}>
              <StretchRoutine />
            </DashboardFrame>
          </div>
        </main>
      </div>
    </div>
  )
}

// DashboardFrame: Mac-inspired, gamified card style
export const DashboardFrame: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = "" }) => (
  <div className={`bg-white border border-gray-200/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out overflow-hidden flex flex-col ${className}`}>
    {/* Title Bar */}
    <div className="px-3 py-2 border-b border-gray-200/70 flex items-center justify-between bg-gray-50/60">
      <div className="flex items-center gap-1.5">
        {icon && <span className="mr-1">{icon}</span>}
        <span className="text-xs font-pixel font-bold text-gray-700 opacity-90 tracking-wide">{title}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 bg-red-400 rounded-full opacity-80"></span>
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-80"></span>
        <span className="w-2.5 h-2.5 bg-green-400 rounded-full opacity-80"></span>
      </div>
    </div>
    <div className="p-4 flex-grow flex flex-col bg-gray-50/30">
      {children}
    </div>
  </div>
)
