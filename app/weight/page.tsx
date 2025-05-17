import { WeightTracker } from "@/components/widgets/weight-tracker"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function WeightPage() {
  return (
    <RetroPageLayout title="Weight Tracker" icon="weight">
      <div className="max-w-3xl mx-auto">
        <WeightTracker />
      </div>
    </RetroPageLayout>
  )
}
