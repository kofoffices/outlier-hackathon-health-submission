import { NutritionTracker } from "@/components/widgets/nutrition-tracker"

export default function NutritionPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Nutrition Tracker</h1>
      <div className="max-w-md mx-auto">
        <NutritionTracker />
      </div>
    </>
  )
}
