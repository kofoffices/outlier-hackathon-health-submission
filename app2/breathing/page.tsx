import { BreathingExercise } from "@/components/widgets/breathing-exercise"

export default function BreathingPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Breathing Exercise</h1>
      <div className="max-w-md mx-auto">
        <BreathingExercise />
      </div>
    </>
  )
}
