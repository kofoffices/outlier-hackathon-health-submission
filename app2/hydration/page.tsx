import { HydrationTracker } from "@/components/widgets/hydration-tracker"

export default function HydrationPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Hydration Tracker</h1>
      <div className="max-w-md mx-auto">
        <HydrationTracker />
      </div>
    </>
  )
}
