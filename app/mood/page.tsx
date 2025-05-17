import { MoodTracker } from "@/components/widgets/mood-tracker"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function MoodPage() {
  return (
    <RetroPageLayout title="Mood Tracker" icon="mood">
      <div className="max-w-3xl mx-auto">
        <MoodTracker />
      </div>
    </RetroPageLayout>
  )
}
