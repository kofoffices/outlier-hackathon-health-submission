"use client"

import { Scale } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { RetroWindow } from "@/components/ui/retro-window"

// Mock data for weight tracking
const weightData = [
  { date: "May 1", weight: 165.5 },
  { date: "May 5", weight: 164.8 },
  { date: "May 10", weight: 163.2 },
  { date: "May 15", weight: 163.0 },
  { date: "May 20", weight: 162.5 },
  { date: "May 25", weight: 161.8 },
  { date: "May 30", weight: 161.0 },
]

export function WeightTracker() {
  const startWeight = weightData[0].weight
  const currentWeight = weightData[weightData.length - 1].weight
  const weightChange = currentWeight - startWeight
  const weightChangeFormatted = weightChange.toFixed(1)
  const isWeightLoss = weightChange < 0

  return (
    <RetroWindow
      title="Weight Tracker"
      icon={<Scale className="h-4 w-4 text-teal-500" />}
      variant="teal"
      className="transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4 border-2 border-gray-800 p-3 rounded-md bg-teal-50">
        <div>
          <p className="text-sm text-gray-700 font-bold">Current Weight</p>
          <p className="text-2xl font-bold text-teal-600">
            {currentWeight} <span className="text-sm font-normal">lbs</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-700 font-bold">30 Day Change</p>
          <p className={`text-lg font-bold ${isWeightLoss ? "text-green-600" : "text-red-600"}`}>
            {weightChangeFormatted} <span className="text-sm font-normal">lbs</span>
          </p>
        </div>
      </div>

      <div className="h-48 mt-4 border-2 border-gray-800 p-2 rounded-md bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#374151" }} />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#374151" }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "2px solid #1f2937",
                boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 0.8)",
                fontWeight: "bold",
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={{ r: 6, fill: "#14b8a6", strokeWidth: 2, stroke: "#1f2937" }}
              activeDot={{ r: 8, fill: "#14b8a6", strokeWidth: 2, stroke: "#1f2937" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t-2 border-gray-300">
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-gray-800 p-2 rounded-md bg-teal-50 hover:bg-teal-100 transition-all duration-200 hover:scale-[1.03] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            <p className="text-xs text-gray-700 font-bold">Starting</p>
            <p className="text-lg font-bold text-gray-700">{startWeight} lbs</p>
          </div>
          <div className="border-2 border-gray-800 p-2 rounded-md bg-teal-100 hover:bg-teal-200 transition-all duration-200 hover:scale-[1.03] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            <p className="text-xs text-gray-700 font-bold">Goal</p>
            <p className="text-lg font-bold text-teal-600">155 lbs</p>
          </div>
          <div className="border-2 border-gray-800 p-2 rounded-md bg-teal-50 hover:bg-teal-100 transition-all duration-200 hover:scale-[1.03] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            <p className="text-xs text-gray-700 font-bold">Remaining</p>
            <p className="text-lg font-bold text-gray-700">{(155 - currentWeight).toFixed(1)} lbs</p>
          </div>
        </div>
      </div>
    </RetroWindow>
  )
}
