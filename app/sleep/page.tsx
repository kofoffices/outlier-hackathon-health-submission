import { SleepTracker } from "@/components/widgets/sleep-tracker"

export default function SleepPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Sleep Tracker</h1>
      <div className="max-w-md mx-auto">
        <SleepTracker />
      </div>
    </>
  )
}
