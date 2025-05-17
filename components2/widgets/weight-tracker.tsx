"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Scale className="h-5 w-5 text-teal-500" />
          Weight Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="group-hover:bg-teal-50 rounded-b-lg transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Current Weight</p>
            <p className="text-2xl font-semibold text-teal-600">
              {currentWeight} <span className="text-sm font-normal">lbs</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">30 Day Change</p>
            <p className={`text-lg font-semibold ${isWeightLoss ? "text-green-600" : "text-red-600"}`}>
              {weightChangeFormatted} <span className="text-sm font-normal">lbs</span>
            </p>
          </div>
        </div>

        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#14b8a6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#14b8a6", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#14b8a6", strokeWidth: 2, stroke: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="hover:scale-[1.03] transition-transform duration-200">
              <p className="text-xs text-gray-500">Starting</p>
              <p className="text-lg font-semibold text-gray-700">{startWeight} lbs</p>
            </div>
            <div className="hover:scale-[1.03] transition-transform duration-200">
              <p className="text-xs text-gray-500">Goal</p>
              <p className="text-lg font-semibold text-teal-600">155 lbs</p>
            </div>
            <div className="hover:scale-[1.03] transition-transform duration-200">
              <p className="text-xs text-gray-500">Remaining</p>
              <p className="text-lg font-semibold text-gray-700">{(155 - currentWeight).toFixed(1)} lbs</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
