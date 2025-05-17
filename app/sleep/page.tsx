import { SleepTracker } from "@/components/widgets/sleep-tracker"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function SleepPage() {
  return (
    <RetroPageLayout title="Sleep Tracker" icon="sleep">
      <div className="max-w-3xl mx-auto">
        <SleepTracker />
      </div>
    </RetroPageLayout>
  )
}
