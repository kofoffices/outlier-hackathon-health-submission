import { FitnessChecklist } from "@/components/widgets/fitness-checklist"

export default function FitnessPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Fitness Checklist</h1>
      <div className="max-w-md mx-auto">
        <FitnessChecklist />
      </div>
    </>
  )
}
