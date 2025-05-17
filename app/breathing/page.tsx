import { BreathingExercise } from "@/components/widgets/breathing-exercise"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function BreathingPage() {
  return (
    <RetroPageLayout title="Breathing Exercise" icon="breathing">
      <div className="max-w-3xl mx-auto">
        <BreathingExercise />
      </div>
    </RetroPageLayout>
  )
}
