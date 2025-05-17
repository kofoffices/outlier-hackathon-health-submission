import { MentalJournal } from "@/components/widgets/mental-journal"

export default function MentalPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Mental Journal</h1>
      <div className="max-w-md mx-auto">
        <MentalJournal />
      </div>
    </>
  )
}
