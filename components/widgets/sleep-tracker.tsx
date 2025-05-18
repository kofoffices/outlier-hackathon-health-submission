"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Moon, Clock, BedDouble, Star } from "lucide-react"
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
import { RetroWindow } from "@/components/ui/retro-window"

type SleepEntry = {
  day: string
  hours: number
  quality: number
  bedtime: string
}

const defaultSleepData: SleepEntry[] = [
  { day: "Mon", hours: 7.5, quality: 4, bedtime: "23:30" },
  { day: "Tue", hours: 6.2, quality: 3, bedtime: "00:15" },
  { day: "Wed", hours: 8.0, quality: 5, bedtime: "22:45" },
  { day: "Thu", hours: 7.0, quality: 4, bedtime: "23:00" },
  { day: "Fri", hours: 5.5, quality: 2, bedtime: "23:45" },
  { day: "Sat", hours: 9.0, quality: 5, bedtime: "22:30" },
  { day: "Sun", hours: 4.5, quality: 1, bedtime: "22:00" },
]

function getQualityLabel(quality: number): string {
  if (quality >= 4.5) return "Excellent"
  if (quality >= 3.5) return "Good"
  if (quality >= 2.5) return "Average"
  if (quality >= 1.5) return "Poor"
  if (quality < 1.5 && quality > 0) return "Very Poor"
  if (quality === 0) return "N/A"
  return "Very Poor"
}

function getQualityTailwindColor(
  quality: number,
  type: "bg" | "text" | "border" | "fill",
  elementContext: "bar" | "textDisplay" = "bar"
): string {
  let baseColor = ""
  let hoverColor = ""
  const bgIntensity = "400"
  const textIntensity = "600"
  const fillIntensity = "600"
  const borderIntensity = "500"
  const hoverBgIntensity = "500"
  const hoverTextIntensity = "700"

  let colorName = ""
  if (quality >= 4.5) colorName = "emerald"
  else if (quality >= 3.5) colorName = "sky"
  else if (quality >= 2.5) colorName = "amber"
  else if (quality >= 1.5) colorName = "orange"
  else colorName = "red"

  if (type === "bg") {
    baseColor = `bg-${colorName}-${bgIntensity}`
    hoverColor = `bg-${colorName}-${hoverBgIntensity}`
  } else if (type === "text") {
    baseColor = `text-${colorName}-${textIntensity}`
    hoverColor = `text-${colorName}-${hoverTextIntensity}`
  } else if (type === "fill") {
    baseColor = `fill-${colorName}-${fillIntensity}`
  } else if (type === "border") {
    baseColor = `border-${colorName}-${borderIntensity}`
  }

  if (elementContext === "bar" && (type === "bg" || type === "text")) {
    return `${baseColor} group-hover/bar:${hoverColor}`
  }
  return baseColor
}

export function SleepTracker() {
  const [sleepData, setSleepData] = useState<SleepEntry[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<SleepEntry | null>(null)
  const [editedEntry, setEditedEntry] = useState<SleepEntry | null>(null)
  const { toast } = useToast()

  const avgDuration =
    sleepData.length > 0
      ? (sleepData.reduce((sum, entry) => sum + entry.hours, 0) / sleepData.length).toFixed(1)
      : "0.0"
  const avgBedtime = sleepData.length > 0 ? calculateAverageBedtime(sleepData.map((entry) => entry.bedtime)) : "00:00"
  const avgQualityNumeric =
    sleepData.length > 0
      ? sleepData.reduce((sum, entry) => sum + entry.quality, 0) / sleepData.length
      : 0
  const avgQualityLabel = getQualityLabel(avgQualityNumeric)

  useEffect(() => {
    const savedSleepData = localStorage.getItem("sleepData")
    if (savedSleepData) {
      setSleepData(JSON.parse(savedSleepData))
    } else {
      setSleepData(defaultSleepData)
    }
  }, [])

  const openDayEditor = (day: SleepEntry) => {
    setSelectedDay(day)
    setEditedEntry({ ...day })
    setIsSheetOpen(true)
  }

  const handleQualityChange = (value: number[]) => {
    if (editedEntry) {
      setEditedEntry({ ...editedEntry, quality: value[0] })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedEntry) return
    const { name, value } = e.target
    setEditedEntry({
      ...editedEntry,
      [name]: name === "hours" ? Number.parseFloat(value) : value,
    })
  }

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
    <RetroWindow
      title="Sleep Tracker - Click on days to Edit!"
      icon={<Moon className="h-4 w-4 text-indigo-500" />}
      variant="purple"
      className="transition-all duration-200"
    >
      <div className="h-64 mt-2 border-2 border-gray-800 p-3 rounded-md bg-slate-50">
        {/* FlexParentOfBars: Removed items-end. Defaults to align-items: stretch */}
        <div className="flex h-full gap-2"> 
          {sleepData.map((data) => {
            const maxHours = 12
            const barHeight = Math.max((data.hours / maxHours) * 100, 8) 
            const qualityColorBg = getQualityTailwindColor(data.quality, 'bg', 'bar');
            const qualityColorText = getQualityTailwindColor(data.quality, 'text', 'textDisplay');

            return (
              // BarWrapper: Added justify-end
              <div
                key={data.day}
                className="flex flex-col justify-end items-center flex-1 group/bar cursor-pointer relative"
                onClick={() => openDayEditor(data)}
              >
                {/* ActualBar */}
                <div
                  className={`w-full rounded-t-sm border-2 border-gray-800 border-b-0 transition-all duration-200 hover:scale-y-105 relative ${qualityColorBg}`}
                  style={{
                    height: `${barHeight}%`,
                    opacity: 0.8 + data.quality * 0.04, 
                    minHeight: 24, 
                  }}
                >
                  <span className={`absolute -top-7 left-1/2 -translate-x-1/2 text-sm font-bold ${qualityColorText} opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 select-none pointer-events-none`}>
                    {data.hours}h
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 mb-1 bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 delay-150 z-10 pointer-events-none whitespace-nowrap">
                    {data.hours}h, {getQualityLabel(data.quality)}<br />Bed: {formatBedtime(data.bedtime)}
                  </span>
                </div>
                {/* DayLabel */}
                <span className={`text-xs font-bold mt-1.5 group-hover/bar:${qualityColorText} transition-colors duration-200`}>
                  {data.day}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 border-2 border-gray-800 p-4 rounded-md bg-indigo-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
        <p className="text-sm font-bold text-center mb-2 text-gray-700">Average Sleep Quality</p>
        <div className="text-center">
          <p className={`text-3xl font-bold ${getQualityTailwindColor(avgQualityNumeric, 'text', 'textDisplay')}`}>
            {avgQualityLabel}
          </p>
          <div className="flex justify-center mt-2 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < Math.round(avgQualityNumeric)
                    ? `${getQualityTailwindColor(avgQualityNumeric, 'fill', 'textDisplay')} ${getQualityTailwindColor(avgQualityNumeric, 'text', 'textDisplay').replace('-600','-700')}`
                    : 'fill-gray-300 text-gray-400'
                }`}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-1">
            ({avgQualityNumeric.toFixed(1)} / 5.0)
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-gray-800 p-3 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] flex flex-col items-center text-center">
            <Clock className="h-7 w-7 text-indigo-500 mb-1.5" />
            <p className="text-xs text-gray-700 font-bold uppercase tracking-wider">Avg. Duration</p>
            <p className="text-2xl font-bold text-indigo-700 mt-0.5">
              {avgDuration} <span className="text-base font-normal">hrs</span>
            </p>
          </div>
          <div className="border-2 border-gray-800 p-3 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] flex flex-col items-center text-center">
            <BedDouble className="h-7 w-7 text-indigo-500 mb-1.5" />
            <p className="text-xs text-gray-700 font-bold uppercase tracking-wider">Avg. Bedtime</p>
            <p className="text-2xl font-bold text-indigo-700 mt-0.5">{formatBedtime(avgBedtime)}</p>
          </div>
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <SheetHeader>
            <SheetTitle className="font-bold">Edit Sleep Data</SheetTitle>
            <SheetDescription>Update your sleep information for {selectedDay?.day || ""}</SheetDescription>
          </SheetHeader>
          {editedEntry && (
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hours" className="font-bold">Sleep Duration (hours)</Label>
                <Input id="hours" name="hours" type="number" step="0.1" min="0" max="24" value={editedEntry.hours} onChange={handleInputChange} className="border-2 border-gray-800"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedtime" className="font-bold">Bedtime</Label>
                <Input id="bedtime" name="bedtime" type="time" value={editedEntry.bedtime} onChange={handleInputChange} className="border-2 border-gray-800"/>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="font-bold">Sleep Quality</Label>
                  <span className={`text-sm font-bold ${getQualityTailwindColor(editedEntry.quality, 'text', 'textDisplay')}`}>{getQualityLabel(editedEntry.quality)}</span>
                </div>
                <Slider value={[editedEntry.quality]} onValueChange={handleQualityChange} max={5} step={1} className={`[&>span:first-child]:${getQualityTailwindColor(editedEntry.quality, 'bg', 'textDisplay')} [&>span]:hover:scale-110 [&>span]:border-2 [&>span]:border-gray-800`}/>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-700 font-bold">Poor</span>
                  <span className="text-xs text-gray-700 font-bold">Excellent</span>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild><Button variant="outline" className="border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">Cancel</Button></SheetClose>
                <Button onClick={saveEntry} className="text-black bg-blue-500 hover:bg-blue-600 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">Save Changes</Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </RetroWindow>
  )
}

function formatBedtime(time: string): string {
  if (!time || !time.includes(':')) return "00:00 AM";
  const [hoursStr, minutesStr] = time.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";
  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`
}

function calculateAverageBedtime(bedtimes: string[]): string {
  if (bedtimes.length === 0) return "00:00"
  let totalMinutes = 0;
  let validBedtimesCount = 0;
  for (const time of bedtimes) {
      if (!time || !time.includes(':')) continue;
      const [hoursStr, minutesStr] = time.split(":");
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      if (isNaN(hours) || isNaN(minutes)) continue;
      totalMinutes += hours * 60 + minutes;
      validBedtimesCount++;
  }
  if (validBedtimesCount === 0) return "00:00";
  const avgMinutes = Math.round(totalMinutes / validBedtimesCount);
  const avgH = Math.floor(avgMinutes / 60) % 24;
  const avgM = avgMinutes % 60
  return `${avgH.toString().padStart(2, "0")}:${avgM.toString().padStart(2, "0")}`
}