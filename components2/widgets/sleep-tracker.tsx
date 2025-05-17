"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

// Define the type for sleep data
type SleepEntry = {
  day: string
  hours: number
  quality: number
  bedtime: string
}

// Default sleep data
const defaultSleepData: SleepEntry[] = [
  { day: "Mon", hours: 7.5, quality: 4, bedtime: "23:30" },
  { day: "Tue", hours: 6.2, quality: 3, bedtime: "00:15" },
  { day: "Wed", hours: 8.0, quality: 5, bedtime: "22:45" },
  { day: "Thu", hours: 7.0, quality: 4, bedtime: "23:00" },
  { day: "Fri", hours: 6.5, quality: 3, bedtime: "23:45" },
  { day: "Sat", hours: 9.0, quality: 5, bedtime: "22:30" },
  { day: "Sun", hours: 8.5, quality: 4, bedtime: "22:00" },
]

export function SleepTracker() {
  const [sleepData, setSleepData] = useState<SleepEntry[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<SleepEntry | null>(null)
  const [editedEntry, setEditedEntry] = useState<SleepEntry | null>(null)
  const { toast } = useToast()

  // Calculate stats
  const avgDuration =
    sleepData.length > 0
      ? (sleepData.reduce((sum, entry) => sum + entry.hours, 0) / sleepData.length).toFixed(1)
      : "0.0"

  const avgBedtime = sleepData.length > 0 ? calculateAverageBedtime(sleepData.map((entry) => entry.bedtime)) : "00:00"

  // Load sleep data from localStorage on component mount
  useEffect(() => {
    const savedSleepData = localStorage.getItem("sleepData")
    if (savedSleepData) {
      setSleepData(JSON.parse(savedSleepData))
    } else {
      // Use default data if nothing is saved
      setSleepData(defaultSleepData)
    }
  }, [])

  // Open the sheet for editing a day's sleep data
  const openDayEditor = (day: SleepEntry) => {
    setSelectedDay(day)
    setEditedEntry({ ...day })
    setIsSheetOpen(true)
  }

  // Handle changes to the quality slider
  const handleQualityChange = (value: number[]) => {
    if (editedEntry) {
      setEditedEntry({ ...editedEntry, quality: value[0] })
    }
  }

  // Handle changes to input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedEntry) return

    const { name, value } = e.target
    setEditedEntry({
      ...editedEntry,
      [name]: name === "hours" ? Number.parseFloat(value) : value,
    })
  }

  // Save the edited entry
  const saveEntry = () => {
    if (!editedEntry || !selectedDay) return

    const updatedSleepData = sleepData.map((entry) => (entry.day === selectedDay.day ? editedEntry : entry))

    setSleepData(updatedSleepData)
    localStorage.setItem("sleepData", JSON.stringify(updatedSleepData))

    setIsSheetOpen(false)

    toast({
      title: "Sleep data updated",
      description: `Your sleep data for ${selectedDay.day} has been updated.`,
    })
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Moon className="h-5 w-5 text-indigo-500" />
          Sleep Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="group-hover:bg-indigo-50 rounded-b-lg transition-colors duration-200">
        <div className="h-40 mt-2">
          <div className="flex h-full items-end gap-2">
            {sleepData.map((data) => (
              <div
                key={data.day}
                className="flex flex-col items-center flex-1 group/bar cursor-pointer"
                onClick={() => openDayEditor(data)}
              >
                <div
                  className="w-full rounded-t-sm bg-indigo-400 group-hover/bar:bg-indigo-500 transition-all duration-200 hover:scale-y-105"
                  style={{
                    height: `${(data.hours / 10) * 100}%`,
                    opacity: 0.6 + data.quality * 0.1,
                  }}
                />
                <span className="text-xs font-medium mt-1 hover:text-indigo-600 transition-colors duration-200">
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Sleep Quality</span>
            <span className="text-sm font-medium text-indigo-600">
              {getQualityLabel(sleepData.reduce((sum, entry) => sum + entry.quality, 0) / sleepData.length)}
            </span>
          </div>
          <Slider
            value={[
              sleepData.length > 0 ? sleepData.reduce((sum, entry) => sum + entry.quality, 0) / sleepData.length : 0,
            ]}
            max={5}
            step={1}
            className="[&>span]:bg-indigo-500 [&>span]:hover:bg-indigo-600 [&>span]:transition-colors [&>span]:duration-200 [&>span]:hover:scale-110"
            disabled
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Poor</span>
            <span className="text-xs text-gray-500">Excellent</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Avg. Duration</p>
              <p className="text-xl font-semibold text-indigo-600">
                {avgDuration} <span className="text-sm font-normal">hrs</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Bedtime</p>
              <p className="text-xl font-semibold text-indigo-600">{formatBedtime(avgBedtime)}</p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Sheet for editing sleep data */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Sleep Data</SheetTitle>
            <SheetDescription>Update your sleep information for {selectedDay?.day || ""}</SheetDescription>
          </SheetHeader>

          {editedEntry && (
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hours">Sleep Duration (hours)</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  step="0.1"
                  min="0"
                  max="24"
                  value={editedEntry.hours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedtime">Bedtime</Label>
                <Input
                  id="bedtime"
                  name="bedtime"
                  type="time"
                  value={editedEntry.bedtime}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Sleep Quality</Label>
                  <span className="text-sm text-indigo-600">{getQualityLabel(editedEntry.quality)}</span>
                </div>
                <Slider
                  value={[editedEntry.quality]}
                  onValueChange={handleQualityChange}
                  max={5}
                  step={1}
                  className="[&>span]:bg-indigo-500 [&>span]:hover:bg-indigo-600 [&>span]:transition-colors [&>span]:duration-200 [&>span]:hover:scale-110"
                />
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Poor</span>
                  <span className="text-xs text-gray-500">Excellent</span>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button onClick={saveEntry} className="bg-indigo-500 hover:bg-indigo-600">
                  Save Changes
                </Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  )
}

// Helper function to get quality label
function getQualityLabel(quality: number): string {
  if (quality >= 4.5) return "Excellent"
  if (quality >= 3.5) return "Good"
  if (quality >= 2.5) return "Average"
  if (quality >= 1.5) return "Poor"
  return "Very Poor"
}

// Helper function to format bedtime
function formatBedtime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`
}

// Helper function to calculate average bedtime
function calculateAverageBedtime(bedtimes: string[]): string {
  if (bedtimes.length === 0) return "00:00"

  // Convert all bedtimes to minutes since midnight
  const minutesSinceMidnight = bedtimes.map((time) => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  })

  // Calculate average minutes
  const avgMinutes = Math.round(minutesSinceMidnight.reduce((sum, mins) => sum + mins, 0) / bedtimes.length)

  // Convert back to HH:MM format
  const hours = Math.floor(avgMinutes / 60)
  const minutes = avgMinutes % 60

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}
