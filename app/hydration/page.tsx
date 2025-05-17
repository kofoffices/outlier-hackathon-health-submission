import { HydrationTracker } from "@/components/widgets/hydration-tracker"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function HydrationPage() {
  return (
    <RetroPageLayout title="Hydration Tracker" icon="hydration">
      <div className="max-w-3xl mx-auto">
        <HydrationTracker />
      </div>
    </RetroPageLayout>
  )
}
