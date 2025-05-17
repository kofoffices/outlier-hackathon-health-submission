"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SmilePlus, Smile, Meh, Frown, FrownIcon as FrownPlus, CalendarDays, Info, TrendingUp } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import React from "react"

const moods = [
  {
    icon: SmilePlus,
    label: "Great",
    color: "text-green-500",
    bgColor: "bg-green-200",
    hoverColor: "hover:bg-green-300",
  },
  { icon: Smile, label: "Good", color: "text-blue-500", bgColor: "bg-blue-200", hoverColor: "hover:bg-blue-300" },
  { icon: Meh, label: "Okay", color: "text-yellow-500", bgColor: "bg-yellow-200", hoverColor: "hover:bg-yellow-300" },
  { icon: Frown, label: "Bad", color: "text-orange-500", bgColor: "bg-orange-200", hoverColor: "hover:bg-orange-300" },
  { icon: FrownPlus, label: "Awful", color: "text-red-500", bgColor: "bg-red-200", hoverColor: "hover:bg-red-300" },
]

// Generate days for the current month
const generateCalendarDays = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  // Get the first day of the month
  const firstDay = new Date(year, month, 1)
  const startingDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Get the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Create an array for all days in the month
  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ date: null, mood: null })
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      mood: null, // Will be populated from localStorage
    })
  }

  return days
}

// Mock data for mood correlations
const moodCorrelations = [
  { metric: "Sleep Quality", correlation: 0.85, description: "Strong positive correlation" },
  { metric: "Hydration", correlation: 0.72, description: "Moderate positive correlation" },
  { metric: "Exercise", correlation: 0.68, description: "Moderate positive correlation" },
  { metric: "Screen Time", correlation: -0.56, description: "Moderate negative correlation" },
]

function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

type CalendarDay = {
  date: Date | null
  mood: number | null
}

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [days, setDays] = useState<CalendarDay[]>(generateCalendarDays().map(day => ({
    ...day,
    mood: day.mood as number | null
  })))
  const [activeDay, setActiveDay] = useState<number | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [activeMoodButton, setActiveMoodButton] = useState<number | null>(null)
  const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  })
  const dayRefs = useRef<Array<HTMLDivElement | null>>([])
  const moodButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const { toast } = useToast()

  // Load saved moods from localStorage
  useEffect(() => {
    const savedMoods = localStorage.getItem("moodCalendar")
    if (savedMoods) {
      const parsedMoods = JSON.parse(savedMoods)

      // Update days with saved moods
      setDays(
        days.map((day) => {
          if (!day.date) return day

          const dateStr = day.date.toISOString().split("T")[0]
          return {
            ...day,
            mood: parsedMoods[dateStr] !== undefined ? parsedMoods[dateStr] : null,
          }
        }),
      )
    }
  }, [])

  // Calculate mood statistics
  const calculateMoodStats = () => {
    const moodCounts = [0, 0, 0, 0, 0]
    let totalMoods = 0

    days.forEach((day) => {
      if (day.date && day.mood !== null) {
        moodCounts[day.mood]++
        totalMoods++
      }
    })

    const dominantMood = moodCounts.indexOf(Math.max(...moodCounts))
    const averageMood =
      totalMoods > 0 ? moodCounts.reduce((sum, count, index) => sum + count * index, 0) / totalMoods : null

    return {
      moodCounts,
      totalMoods,
      dominantMood: dominantMood !== -1 ? dominantMood : null,
      averageMood,
    }
  }

  const moodStats = calculateMoodStats()

  // Save moods to localStorage when they change
  const saveMoodForDay = (dayIndex: number, moodIndex: number) => {
    const updatedDays = [...days]

    if (updatedDays[dayIndex].date) {
      updatedDays[dayIndex].mood = moodIndex
      setDays(updatedDays)

      // Save to localStorage
      const moodsToSave: Record<string, number> = {}
      updatedDays.forEach((day) => {
        if (day.date && day.mood !== null) {
          const dateStr = day.date.toISOString().split("T")[0]
          moodsToSave[dateStr] = day.mood
        }
      })

      localStorage.setItem("moodCalendar", JSON.stringify(moodsToSave))

      // Show toast
      toast({
        title: "Mood saved",
        description: `You're feeling ${moods[moodIndex].label} today!`,
      })
    }

    setIsPopoverOpen(false)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, dayIndex: number) => {
    if (e.key === "Enter") {
      setActiveDay(dayIndex)
      setIsPopoverOpen(true)
    } else if (e.key === "ArrowRight") {
      const nextIndex = Math.min(dayIndex + 1, days.length - 1)
      dayRefs.current[nextIndex]?.focus()
    } else if (e.key === "ArrowLeft") {
      const prevIndex = Math.max(dayIndex - 1, 0)
      dayRefs.current[prevIndex]?.focus()
    } else if (e.key === "ArrowUp") {
      const prevRowIndex = Math.max(dayIndex - 7, 0)
      dayRefs.current[prevRowIndex]?.focus()
    } else if (e.key === "ArrowDown") {
      const nextRowIndex = Math.min(dayIndex + 7, days.length - 1)
      dayRefs.current[nextRowIndex]?.focus()
    }
  }

  // Handle mood button click with ripple effect
  const handleMoodButtonClick = (index: number, e: React.MouseEvent) => {
    // Get button dimensions and position
    const button = moodButtonRefs.current[index]
    if (button) {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Set ripple effect
      setRippleEffect({ x, y, active: true })

      // Reset ripple after animation
      setTimeout(() => {
        setRippleEffect({ x: 0, y: 0, active: false })
      }, 600)
    }

    setSelectedMood(index)
    setActiveMoodButton(index)
  }

  // Handle mood selection in popover
  const handleMoodSelection = (moodIndex: number, e: React.MouseEvent) => {
    // Create ripple effect
    const target = e.currentTarget as HTMLButtonElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Set ripple effect
    setRippleEffect({ x, y, active: true })

    // Reset ripple after animation
    setTimeout(() => {
      setRippleEffect({ x: 0, y: 0, active: false })
    }, 600)

    // Save mood
    if (activeDay !== null) {
      saveMoodForDay(activeDay, moodIndex)
    }
  }

  // Fix ref callbacks
  const setDayRef = (el: HTMLDivElement | null, index: number) => {
    dayRefs.current[index] = el
  }

  const setMoodButtonRef = (el: HTMLButtonElement | null, index: number) => {
    moodButtonRefs.current[index] = el
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Mood Tracker
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-pink-100 transition-colors"
                  onClick={() => setShowInsights(!showInsights)}
                >
                  <TrendingUp className="h-4 w-4 text-pink-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View mood insights</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="group-hover:bg-yellow-50 rounded-b-lg transition-colors duration-200">
        <div className="flex justify-between mb-4">
          {moods.map((mood, index) => {
            const Icon = mood.icon
            return (
              <Button
                key={mood.label}
                ref={(el) => setMoodButtonRef(el, index)}
                variant="ghost"
                className={`relative overflow-hidden flex flex-col items-center p-2 transition-all duration-200 hover:scale-[1.08] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 ${
                  selectedMood === index ? "bg-yellow-100 ring-2 ring-yellow-200" : "hover:bg-yellow-100"
                } ${activeMoodButton === index ? "animate-pulse" : ""}`}
                onClick={(e) => handleMoodButtonClick(index, e)}
              >
                {rippleEffect.active && activeMoodButton === index && (
                  <span
                    className="absolute bg-yellow-300 opacity-70 rounded-full animate-ripple"
                    style={{
                      left: rippleEffect.x + "px",
                      top: rippleEffect.y + "px",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
                <Icon className={`h-8 w-8 ${mood.color} transition-transform duration-200 hover:scale-110`} />
                <span className="text-xs mt-1 font-medium">{mood.label}</span>
              </Button>
            )
          })}
        </div>

        <Collapsible open={showInsights} onOpenChange={setShowInsights} className="mb-4">
          <CollapsibleContent className="p-3 bg-pink-50 rounded-lg mb-4 animate-in slide-in-from-top-5 duration-300">
            <h4 className="text-sm font-medium text-pink-700 mb-2 flex items-center gap-1">
              <Info className="h-4 w-4" />
              Mood Insights
            </h4>

            <div className="space-y-3">
              {moodStats.dominantMood !== null && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Dominant Mood:</span>
                  <div className="flex items-center gap-1">
                    {React.createElement(moods[moodStats.dominantMood].icon, {
                      className: `h-4 w-4 ${moods[moodStats.dominantMood].color}`,
                    })}
                    <span className="text-xs font-medium">{moods[moodStats.dominantMood].label}</span>
                  </div>
                </div>
              )}

              {moodStats.averageMood !== null && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Average Mood:</span>
                  <span className="text-xs font-medium">
                    {moodStats.averageMood < 1.5
                      ? "Awful to Bad"
                      : moodStats.averageMood < 2.5
                        ? "Bad to Okay"
                        : moodStats.averageMood < 3.5
                          ? "Okay to Good"
                          : "Good to Great"}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-pink-200">
                <h5 className="text-xs font-medium text-pink-700 mb-1">Correlations with other metrics:</h5>
                <div className="space-y-2">
                  {moodCorrelations.map((correlation, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{correlation.metric}:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${correlation.correlation > 0 ? "bg-green-500" : "bg-red-500"}`}
                            style={{ width: `${Math.abs(correlation.correlation) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{correlation.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })}
            </h4>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={`${day}-${index}`} className="text-xs text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
            {days.map((day, i) => {
              const moodColors = day.mood !== null ? moods[day.mood].bgColor : "bg-gray-100"
              const hoverColors = day.mood !== null ? moods[day.mood].hoverColor : "hover:bg-gray-200"
              return day.date ? (
                <Popover
                  key={i}
                  open={isPopoverOpen && activeDay === i}
                  onOpenChange={(open) => {
                    setIsPopoverOpen(open)
                    if (open) setActiveDay(i)
                  }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <div
                            ref={(el) => setDayRef(el, i)}
                            className={`aspect-square rounded-sm ${moodColors} ${hoverColors} hover:opacity-90 cursor-pointer transition-all duration-200 hover:scale-[1.1] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 shadow-sm hover:shadow`}
                            title={
                              day.date
                                ? `${day.date.toLocaleDateString()}: ${
                                    day.mood !== null ? moods[day.mood].label : "No mood set"
                                  }`
                                : ""
                            }
                            onClick={() => {
                              setActiveDay(i)
                              setIsPopoverOpen(true)
                            }}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Select mood for ${day.date.toLocaleDateString()}`}
                          >
                            <div className="flex items-center justify-center h-full">
                              <span className="text-xs font-medium">
                                {day.date instanceof Date ? day.date.getDate() : ''}
                              </span>
                              {day.mood !== null && (
                                <span className="absolute bottom-0.5 right-0.5">
                                  {React.createElement(moods[day.mood].icon, { className: "h-2.5 w-2.5" })}
                                </span>
                              )}
                            </div>
                          </div>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="p-2 text-xs">
                        <p className="font-medium">{day.date.toLocaleDateString()}</p>
                        {day.mood !== null ? (
                          <div className="flex items-center gap-1 mt-1">
                            <span>Mood:</span>
                            {React.createElement(moods[day.mood].icon, {
                              className: `h-3.5 w-3.5 ${moods[day.mood].color}`,
                            })}
                            <span>{moods[day.mood].label}</span>
                          </div>
                        ) : (
                          <p className="italic mt-1">No mood recorded</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <PopoverContent className="w-auto p-2" align="center">
                    <div className="flex gap-1">
                      {moods.map((mood, moodIndex) => {
                        const Icon = mood.icon
                        return (
                          <Button
                            key={moodIndex}
                            variant="ghost"
                            size="sm"
                            className={`relative overflow-hidden ${mood.color} hover:bg-opacity-20`}
                            onClick={(e) => handleMoodSelection(moodIndex, e)}
                            aria-label={`Set mood to ${mood.label}`}
                          >
                            {rippleEffect.active && activeDay === i && (
                              <span
                                className="absolute bg-gray-200 opacity-70 rounded-full animate-ripple"
                                style={{
                                  left: rippleEffect.x + "px",
                                  top: rippleEffect.y + "px",
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                            )}
                            <Icon
                              className={`h-6 w-6 ${mood.color} transition-transform duration-200 hover:scale-110`}
                            />
                          </Button>
                        )
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div key={`empty-${i}`} className="text-xs text-center font-medium text-gray-500">
                  {day.date ? day.date.getDate() : ""}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}