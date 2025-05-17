import { MoodTracker } from "@/components/widgets/mood-tracker"

export default function MoodPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Mood Tracker</h1>
      <div className="max-w-md mx-auto">
        <MoodTracker />
      </div>
    </>
  )
}
