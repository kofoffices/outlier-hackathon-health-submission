import { FitnessChecklist } from "@/components/widgets/fitness-checklist"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function FitnessPage() {
  return (
    <RetroPageLayout title="Fitness Checklist" icon="fitness">
      <div className="max-w-3xl mx-auto">
        <FitnessChecklist />
      </div>
    </RetroPageLayout>
  )
}
