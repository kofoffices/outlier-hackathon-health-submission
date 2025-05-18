"use client"

// ... (all existing imports)
import { useState, useEffect, useRef } from "react"
import {
  SmilePlus,
  Smile,
  Meh,
  Frown as FrownIconOriginal, 
  FrownIcon as FrownPlus, 
  CalendarDays,
  Info,
  TrendingUp,
  Heart,
  Sparkles, 
  Puzzle, 
  Gift // Ensure Gift is imported
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { RetroWindow } from "@/components/ui/retro-window"
import React from "react"
import PixelPal from "@/components/gamification/PixelPal"; 
import MoodMosaic from "@/components/gamification/MoodMosaic"; 

// ... (interface Day, moods array, generateCalendarDays, moodCorrelations - NO CHANGES)
interface Day {
  date: Date | null
  mood: number | null 
}
const moods = [
  { icon: SmilePlus, label: "Great", color: "text-green-700", bgColor: "bg-green-400", hoverColor: "hover:bg-green-300", emoji: "😄", emojiColor: "text-green-600 drop-shadow-[0_2px_0_#fff]", },
  { icon: Smile, label: "Good", color: "text-sky-700", bgColor: "bg-sky-400", hoverColor: "hover:bg-sky-300", emoji: "🙂", emojiColor: "text-sky-600 drop-shadow-[0_2px_0_#fff]" },
  { icon: Meh, label: "Okay", color: "text-yellow-700", bgColor: "bg-yellow-400", hoverColor: "hover:bg-yellow-300", emoji: "😐", emojiColor: "text-yellow-600 drop-shadow-[0_2px_0_#fff]" },
  { icon: FrownIconOriginal, label: "Bad", color: "text-orange-700", bgColor: "bg-orange-400", hoverColor: "hover:bg-orange-300", emoji: "🙁", emojiColor: "text-orange-600 drop-shadow-[0_2px_0_#fff]" },
  { icon: FrownPlus, label: "Awful", color: "text-red-700", bgColor: "bg-red-500", hoverColor: "hover:bg-red-400", emoji: "😢", emojiColor: "text-red-600 drop-shadow-[0_2px_0_#fff]" },
]
const generateCalendarDays = (): Day[] => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1)
  const startingDayOfWeek = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysArray = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    daysArray.push({ date: null, mood: null })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({
      date: new Date(year, month, i),
      mood: null,
    })
  }
  return daysArray
}
const moodCorrelations = [
  { metric: "Sleep Quality", correlation: 0.85, description: "Strong positive correlation" },
  { metric: "Hydration", correlation: 0.72, description: "Moderate positive correlation" },
  { metric: "Exercise", correlation: 0.68, description: "Moderate positive correlation" },
  { metric: "Screen Time", correlation: -0.56, description: "Moderate negative correlation" },
]


// --- MOOD MOSAIC CONFIGURATION ---
// This pattern is now a *color guide*. It should have enough variety.
// Let's make a smaller, more abstract pattern that can be repeated or sampled from.
// Example: A simple 3x3 checkerboard or a small symbol.
const mosaicColorGuidePattern = [
  ['C1', 'C2', 'C1'],
  ['C2', 'C3', 'C2'],
  ['C1', 'C2', 'C1'],
];
const mosaicPatternColors = {
  'C1': 'bg-pink-500', // Main color
  'C2': 'bg-pink-400', // Secondary color
  'C3': 'bg-purple-400', // Accent color (or another pink shade)
  // Add more colors if your guide pattern uses more keys
};


export function MoodTracker() {
  // ... (all existing states and useEffect for loading moods - NO CHANGES)
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [days, setDays] = useState<Day[]>(generateCalendarDays())
  const [activeDay, setActiveDay] = useState<number | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [showInsights, setShowInsights] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const savedMoods = localStorage.getItem("moodCalendar")
    if (savedMoods) {
      const parsedMoods = JSON.parse(savedMoods)
      setDays(
        generateCalendarDays().map((day) => { 
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

  // calculateMoodStats - NO CHANGES from previous version
  const calculateMoodStats = () => {
    const moodCounts = Array(moods.length).fill(0);
    let totalMoodValueSum = 0;
    let loggedMoodsCount = 0;
    days.forEach((day) => {
      if (day.date && day.mood !== null) {
        moodCounts[day.mood]++;
        totalMoodValueSum += (moods.length - 1 - day.mood);
        loggedMoodsCount++;
      }
    });
    const dominantMoodIndex = moodCounts.indexOf(Math.max(...moodCounts));
    const dominantMood = loggedMoodsCount > 0 && dominantMoodIndex !== -1 ? dominantMoodIndex : null;
    const averageMoodNumeric = loggedMoodsCount > 0 ? totalMoodValueSum / loggedMoodsCount : null;
    return {
      moodCounts,
      totalMoods: loggedMoodsCount,
      dominantMood,
      averageMood: averageMoodNumeric, 
      loggedMoodsThisMonth: loggedMoodsCount,
    };
  };
  const moodStats = calculateMoodStats()

  // saveMoodForDay - NO CHANGES
  const saveMoodForDay = (dayIndex: number, moodIndex: number) => {
    const updatedDays = [...days]
    if (updatedDays[dayIndex].date) {
      updatedDays[dayIndex].mood = moodIndex
      setDays(updatedDays)
      const moodsToSave: Record<string, number> = {}
      updatedDays.forEach((day) => {
        if (day.date && day.mood !== null) {
          const dateStr = day.date.toISOString().split("T")[0]
          moodsToSave[dateStr] = day.mood
        }
      })
      localStorage.setItem("moodCalendar", JSON.stringify(moodsToSave))
      toast({
        title: "Mood saved",
        description: `You're feeling ${moods[moodIndex].label} today!`,
      })
    }
    setIsPopoverOpen(false)
  }

  // handleKeyDown, handleMoodSelection - NO CHANGES
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]) 
  const handleKeyDown = (e: React.KeyboardEvent, dayIndex: number) => {
    if (e.key === "Enter") {
      setActiveDay(dayIndex)
      setIsPopoverOpen(true)
    } else if (e.key === "ArrowRight") {
      const nextIndex = Math.min(dayIndex + 1, days.length - 1)
      if(days[nextIndex]?.date) dayRefs.current[nextIndex]?.focus()
    } else if (e.key === "ArrowLeft") {
      const prevIndex = Math.max(dayIndex - 1, 0)
      if(days[prevIndex]?.date) dayRefs.current[prevIndex]?.focus()
    } else if (e.key === "ArrowUp") {
      const prevRowIndex = Math.max(dayIndex - 7, 0)
       if(days[prevRowIndex]?.date) dayRefs.current[prevRowIndex]?.focus()
    } else if (e.key === "ArrowDown") {
      const nextRowIndex = Math.min(dayIndex + 7, days.length - 1)
      if(days[nextRowIndex]?.date) dayRefs.current[nextRowIndex]?.focus()
    }
  }
  const handleMoodSelection = (moodIndex: number, e: React.MouseEvent) => {
    if (activeDay !== null) {
      saveMoodForDay(activeDay, moodIndex)
    }
  }

  const currentDateForMosaic = new Date(); // To pass to MoodMosaic

  return (
    <RetroWindow
      title="Mood Tracker - Click on a day to set the mood"
      icon={<Heart className="h-4 w-4 text-pink-500" />}
      variant="pink"
      className="transition-all duration-200 group"
    >
      {/* Collapsible Insights section - NO CHANGES from previous version */}
      <Collapsible open={showInsights} onOpenChange={setShowInsights} className="mb-4">
        <CollapsibleContent className="p-3 border-2 border-gray-800 bg-pink-100 rounded-md mb-4 animate-in slide-in-from-top-5 duration-300">
          <h4 className="text-sm font-bold text-pink-700 mb-3 flex items-center gap-1 pixel-font">
            <Info className="h-4 w-4" />
            Mood Insights (Real-Time)
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-grow">
                {moodStats.dominantMood !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 font-bold">Dominant Mood (month):</span>
                    <div className="flex items-center gap-1">
                      <span className={`text-xl md:text-2xl ${moods[moodStats.dominantMood].emojiColor}`}>{moods[moodStats.dominantMood].emoji}</span>
                      <span className="text-xs font-bold">{moods[moodStats.dominantMood].label}</span>
                    </div>
                  </div>
                )}
                {moodStats.averageMood !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 font-bold">Average Mood (live):</span>
                    <span className="text-xs font-bold">
                      {moodStats.averageMood < 1 ? "Awful" :
                       moodStats.averageMood < 2 ? "Bad" :
                       moodStats.averageMood < 3 ? "Okay" :
                       moodStats.averageMood < 3.75 ? "Good" : "Great"}
                      <span className="ml-2 text-lg align-middle">
                        {moods[moods.length - 1 - Math.round(moodStats.averageMood)].emoji}
                      </span>
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-4 flex flex-col items-center">
                 <PixelPal averageMood={moodStats.averageMood} pixelSize={6} />
                 <span className="text-xs mt-1 text-pink-700 font-pixel">Your Pal!</span>
              </div>
            </div>
            <div className="pt-2 border-t-2 border-pink-300">
              <h5 className="text-xs font-bold text-pink-700 mb-1">Correlations with other metrics (auto-updating):</h5>
              <div className="space-y-2">
                {moodCorrelations.map((correlation, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 font-bold">{correlation.metric}:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-800">
                        <div
                          className={`h-full rounded-full ${correlation.correlation > 0 ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                          style={{ width: `${Math.abs(correlation.correlation) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold">{correlation.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 text-xs text-pink-700 italic">* All insights update instantly as you log moods!</div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Calendar section - NO CHANGES from previous version */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-base font-bold text-gray-700 flex items-center gap-1 font-pixel">
            <CalendarDays className="h-5 w-5" />
            {currentDateForMosaic.toLocaleString("default", { month: "long", year: "numeric" })}
          </h4>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-[1px] hover:translate-x-[1px] bg-pink-200 hover:bg-pink-300 font-pixel animate-glow-pulse ring-2 ring-pink-400 ring-offset-2 ring-offset-white"
            onClick={() => setShowInsights(!showInsights)}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Insights
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 border-2 border-gray-800 p-2 rounded-md bg-white">
           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-xs text-center font-bold text-gray-500 font-pixel tracking-wide pb-1">
              {day}
            </div>
          ))}
          {days.map((day, i) => {
            const moodDefinition = day.mood !== null ? moods[day.mood] : null;
            const moodColors = moodDefinition ? moodDefinition.bgColor : "bg-gray-100";
            const hoverColors = moodDefinition ? moodDefinition.hoverColor : "hover:bg-gray-200";
            return day.date ? (
              <Popover key={i} open={isPopoverOpen && activeDay === i} onOpenChange={open => { setIsPopoverOpen(open); if (open) setActiveDay(i); }}>
                <TooltipProvider><Tooltip><TooltipTrigger asChild><PopoverTrigger asChild>
                        <div ref={el => { if (el) dayRefs.current[i] = el }}
                          className={`aspect-square rounded-sm ${moodColors} ${hoverColors} hover:opacity-90 cursor-pointer transition-all duration-200 hover:scale-[1.1] focus:outline-none border border-gray-800 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center`}
                          title={day.date ? `${day.date.toLocaleDateString()}: ${day.mood !== null ? moods[day.mood].label : "No mood set"}` : ""}
                          onClick={() => { setActiveDay(i); setIsPopoverOpen(true); }}
                          onKeyDown={e => handleKeyDown(e, i)} tabIndex={0} role="button" aria-label={`Select mood for ${day.date.toLocaleDateString()}`}>
                          <span className="text-lg font-bold font-pixel text-gray-900 leading-none">{day.date.getDate()}</span>
                          {day.mood !== null && (
                            <span className="flex flex-col items-center justify-center mt-1">
                              <span className={`text-2xl md:text-3xl ${moods[day.mood].emojiColor} transition-transform duration-200`}>{moods[day.mood].emoji}</span>
                              <span className="text-xs font-pixel font-bold text-gray-900 mt-1">{moods[day.mood].label}</span>
                            </span> )}
                        </div>
                </PopoverTrigger></TooltipTrigger>
                <TooltipContent side="bottom" className="p-2 text-xs border-2 border-gray-800 font-pixel">
                      <p className="font-bold">{day.date.toLocaleDateString()}</p>
                      {day.mood !== null ? ( <div className="flex items-center gap-1 mt-1"> <span>Mood:</span> {React.createElement(moods[day.mood].icon, { className: `h-4 w-4 ${moods[day.mood].color}` })} <span>{moods[day.mood].label}</span> </div>
                      ) : ( <p className="italic mt-1">No mood recorded</p> )}
                </TooltipContent></Tooltip></TooltipProvider>
                <PopoverContent className="w-auto max-w-[260px] md:max-w-[320px] p-2 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] font-pixel" align="center">
                  <div className="flex gap-2 flex-wrap justify-center items-center">
                    {moods.map((mood, moodIndex) => {
                      return (
                        <Button key={mood.label} variant="outline" size="sm"
                          className={`relative overflow-hidden p-1 hover:bg-gray-100 transition-all duration-150 border-2 border-gray-800 flex flex-col items-center justify-center min-w-[80px] min-h-[80px] font-pixel text-xs font-bold ${activeDay !== null && days[activeDay]?.mood === moodIndex ? "bg-gray-100 ring-2 ring-pink-400" : ""}`}
                          onClick={e => handleMoodSelection(moodIndex, e)} aria-label={`Set mood to ${mood.label}`}>
                          <span className={`text-2xl md:text-3xl ${mood.emojiColor} transition-transform duration-200`}>{mood.emoji}</span>
                          <span className="mt-1">{mood.label}</span>
                        </Button> )})}
                  </div>
                </PopoverContent>
              </Popover>
            ) : ( <div key={i} className="aspect-square rounded-sm bg-transparent" /> )})}
        </div>
      </div>

      {/* MOOD MOSAIC INTEGRATION - Pass currentDateForMosaic */}
      <MoodMosaic
        loggedMoodCount={moodStats.loggedMoodsThisMonth}
        targetImagePattern={mosaicColorGuidePattern} // Use the new guide pattern
        patternColors={mosaicPatternColors}
        pixelSize={8} // Can adjust pixel size here; smaller = more detailed for more days
        currentDate={currentDateForMosaic} // Pass current date
      />
    </RetroWindow>
  )
}