import { StretchRoutine } from "@/components/widgets/stretch-routine"

export default function StretchingPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Stretch Routine</h1>
      <div className="max-w-md mx-auto">
        <StretchRoutine />
      </div>
    </>
  )
}
