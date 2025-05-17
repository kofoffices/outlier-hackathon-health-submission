import { StretchRoutine } from "@/components/widgets/stretch-routine"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function StretchingPage() {
  return (
    <RetroPageLayout title="Stretch Routine" icon="stretching">
      <div className="max-w-3xl mx-auto">
        <StretchRoutine />
      </div>
    </RetroPageLayout>
  )
}
