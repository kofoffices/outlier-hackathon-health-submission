import { NutritionTracker } from "@/components/widgets/nutrition-tracker"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function NutritionPage() {
  return (
    <RetroPageLayout title="Nutrition Tracker" icon="nutrition">
      <div className="max-w-3xl mx-auto">
        <NutritionTracker />
      </div>
    </RetroPageLayout>
  )
}
