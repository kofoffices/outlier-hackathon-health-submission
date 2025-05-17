import { MentalJournal } from "@/components/widgets/mental-journal"
import { RetroPageLayout } from "@/components/retro-page-layout"

export default function MentalPage() {
  return (
    <RetroPageLayout title="Mental Journal" icon="mental">
      <div className="max-w-3xl mx-auto">
        <MentalJournal />
      </div>
    </RetroPageLayout>
  )
}
