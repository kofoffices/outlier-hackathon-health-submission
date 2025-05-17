import { WeightTracker } from "@/components/widgets/weight-tracker"

export default function WeightPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Weight Tracker</h1>
      <div className="max-w-md mx-auto">
        <WeightTracker />
      </div>
    </>
  )
}
