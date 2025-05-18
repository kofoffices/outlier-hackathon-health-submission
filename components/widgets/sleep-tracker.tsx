"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Moon, Clock, BedDouble, Star, Telescope, Zap, Diamond } // Added Telescope, Zap, Diamond
from "lucide-react"
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

// --- GAMIFICATION COMPONENTS ---
import ConstellationCollector from "@/components/gamification/ConstellationCollector"; // Adjust path
import EnergyBar from "@/components/gamification/EnergyBar"; // Adjust path


type SleepEntry = {
  day: string // "Mon", "Tue", etc. or "YYYY-MM-DD" for more robust storage
  hours: number
  quality: number // 1 (Very Poor) to 5 (Excellent)
  bedtime: string
}

// For this example, we'll use simple "Mon"-"Sun" keys for default data
// but for localStorage, using full dates "YYYY-MM-DD" is better.
const defaultSleepDataWeekly: Omit<SleepEntry, 'day'>[] = [ // For filling if no full data
  { hours: 7.5, quality: 4, bedtime: "23:30" }, { hours: 6.2, quality: 3, bedtime: "00:15" },
  { hours: 8.0, quality: 5, bedtime: "22:45" }, { hours: 7.0, quality: 4, bedtime: "23:00" },
  { hours: 5.5, quality: 2, bedtime: "23:45" }, { hours: 9.0, quality: 5, bedtime: "22:30" },
  { hours: 4.5, quality: 1, bedtime: "22:00" },
];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


// Function to get the start of the current week (Monday)
const getWeekStartDate = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sunday, 1 Monday ...
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};


function getQualityLabel(quality: number): string {
  // ... (no change)
  if (quality >= 4.5) return "Excellent"
  if (quality >= 3.5) return "Good"
  if (quality >= 2.5) return "Average"
  if (quality >= 1.5) return "Poor"
  if (quality < 1.5 && quality > 0) return "Very Poor"
  if (quality === 0) return "N/A"
  return "Very Poor"
}

function getQualityTailwindColor(
  // ... (no change)
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
  if (type === "bg") { baseColor = `bg-${colorName}-${bgIntensity}`; hoverColor = `bg-${colorName}-${hoverBgIntensity}`; }
  else if (type === "text") { baseColor = `text-${colorName}-${textIntensity}`; hoverColor = `text-${colorName}-${hoverTextIntensity}`; }
  else if (type === "fill") { baseColor = `fill-${colorName}-${fillIntensity}`; }
  else if (type === "border") { baseColor = `border-${colorName}-${borderIntensity}`; }
  if (elementContext === "bar" && (type === "bg" || type === "text")) { return `${baseColor} group-hover/bar:${hoverColor}`; }
  return baseColor
}

export function SleepTracker() {
  // Store sleep data as a Record<string, Omit<SleepEntry, 'day'>> where key is "YYYY-MM-DD"
  const [sleepLog, setSleepLog] = useState<Record<string, Omit<SleepEntry, 'day'>>>({});
  const [currentWeekData, setCurrentWeekData] = useState<SleepEntry[]>([]);
  
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null); // "YYYY-MM-DD"
  const [editedEntry, setEditedEntry] = useState<Omit<SleepEntry, 'day'> | null>(null);
  const { toast } = useToast()


  // Initialize and update currentWeekData based on sleepLog and current date
  useEffect(() => {
    const weekStart = getWeekStartDate();
    const weekEntries: SleepEntry[] = [];
    let goodSleepThisWeek = 0;

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      const dateKey = currentDate.toISOString().split("T")[0];
      const dayLabel = dayLabels[i];
      
      const entryData = sleepLog[dateKey] || { // Use default if no log for this day
          hours: defaultSleepDataWeekly[i % defaultSleepDataWeekly.length].hours, // Cycle through defaults
          quality: defaultSleepDataWeekly[i % defaultSleepDataWeekly.length].quality,
          bedtime: defaultSleepDataWeekly[i % defaultSleepDataWeekly.length].bedtime,
      };

      weekEntries.push({ day: dayLabel, ...entryData });
      if(entryData.quality >= 3.5) goodSleepThisWeek++; // Quality 4 (Good) or 5 (Excellent)
    }
    setCurrentWeekData(weekEntries);
    // setGoodSleepNights(goodSleepThisWeek); // This would be for the ConstellationCollector if it uses weekly data
  }, [sleepLog]);


  // Load sleep data from localStorage
  useEffect(() => {
    const savedSleepLog = localStorage.getItem("sleepTrackerLog");
    if (savedSleepLog) {
      setSleepLog(JSON.parse(savedSleepLog));
    } else {
      // Optional: Initialize with some default data for the current week if you want
      // For now, it will be empty until user adds data or we prefill current week.
      // Let's prefill current week with defaults if log is empty
      const initialLog: Record<string, Omit<SleepEntry, 'day'>> = {};
      const weekStart = getWeekStartDate();
       for (let i = 0; i < 7; i++) {
          const currentDate = new Date(weekStart);
          currentDate.setDate(weekStart.getDate() + i);
          const dateKey = currentDate.toISOString().split("T")[0];
          initialLog[dateKey] = defaultSleepDataWeekly[i % defaultSleepDataWeekly.length];
       }
       setSleepLog(initialLog);
       localStorage.setItem("sleepTrackerLog", JSON.stringify(initialLog));
    }
  }, []);
  

  // Calculate overall stats from the entire sleepLog
  const allLoggedEntries = Object.values(sleepLog);
  const avgDuration =
    allLoggedEntries.length > 0
      ? (allLoggedEntries.reduce((sum, entry) => sum + entry.hours, 0) / allLoggedEntries.length).toFixed(1)
      : "0.0";
  const avgBedtime = allLoggedEntries.length > 0 ? calculateAverageBedtime(allLoggedEntries.map((entry) => entry.bedtime)) : "00:00";
  const avgQualityNumeric =
    allLoggedEntries.length > 0
      ? allLoggedEntries.reduce((sum, entry) => sum + entry.quality, 0) / allLoggedEntries.length
      : 0;
  const avgQualityLabel = getQualityLabel(avgQualityNumeric);

  // For Constellation Collector: count good/excellent nights from entire log
  const totalGoodSleepNights = allLoggedEntries.filter(entry => entry.quality >= 3.5).length;

  // For Energy Bar: get the most recent sleep entry
  const sortedDates = Object.keys(sleepLog).sort((a,b) => new Date(b).getTime() - new Date(a).getTime());
  const lastNightSleepEntry = sortedDates.length > 0 ? sleepLog[sortedDates[0]] : null;


  const openDayEditor = (dayKey: string, dayData: Omit<SleepEntry, 'day'>) => {
    setSelectedDayKey(dayKey);
    setEditedEntry({ ...dayData });
    setIsSheetOpen(true);
  };

  const handleQualityChange = (value: number[]) => {
    if (editedEntry) {
      setEditedEntry({ ...editedEntry, quality: value[0] });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedEntry) return;
    const { name, value } = e.target;
    setEditedEntry({
      ...editedEntry,
      [name]: name === "hours" ? Number.parseFloat(value) : value,
    });
  };

  const saveEntry = () => {
    if (!editedEntry || !selectedDayKey) return;
    const updatedLog = { ...sleepLog, [selectedDayKey]: editedEntry };
    setSleepLog(updatedLog);
    localStorage.setItem("sleepTrackerLog", JSON.stringify(updatedLog));
    setIsSheetOpen(false);
    toast({
      title: "Sleep data updated",
      description: `Sleep for ${new Date(selectedDayKey).toLocaleDateString()} has been updated.`,
    });
  };


  return (
    <RetroWindow
      title="Sleep Tracker - Click on days to Edit!"
      icon={<Moon className="h-4 w-4 text-indigo-500" />} // Indigo matches avg stats cards
      variant="indigo" // Changed to indigo to match
      className="transition-all duration-200"
    >
      {/* Top section: Energy Bar + Main Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-1">
            <EnergyBar 
                lastNightSleepHours={lastNightSleepEntry?.hours || null}
                lastNightSleepQuality={lastNightSleepEntry?.quality || null}
            />
        </div>
        <div className="md:col-span-2 h-64 border-2 border-gray-800 p-3 rounded-md bg-slate-100"> {/* Lightened bar chart bg */}
          <div className="flex h-full gap-2">
            {currentWeekData.map((data, index) => {
              const maxHours = 12;
              const barHeight = Math.max((data.hours / maxHours) * 100, 8);
              const qualityColorBg = getQualityTailwindColor(data.quality, 'bg', 'bar');
              const qualityColorText = getQualityTailwindColor(data.quality, 'text', 'textDisplay');
              
              // Determine the dateKey for this bar
              const weekStart = getWeekStartDate();
              const barDate = new Date(weekStart);
              barDate.setDate(weekStart.getDate() + index);
              const dateKeyForBar = barDate.toISOString().split("T")[0];

              return (
                <div
                  key={data.day + '-' + index} // More unique key
                  className="flex flex-col justify-end items-center flex-1 group/bar cursor-pointer relative"
                  onClick={() => openDayEditor(dateKeyForBar, {hours: data.hours, quality: data.quality, bedtime: data.bedtime})}
                >
                  <div
                    className={`w-full rounded-t-sm border-2 border-gray-800 border-b-0 transition-all duration-200 hover:scale-y-105 relative ${qualityColorBg}`}
                    style={{ height: `${barHeight}%`, opacity: 0.75 + data.quality * 0.05, minHeight: 24 }}
                  >
                    <span className={`absolute -top-7 left-1/2 -translate-x-1/2 text-sm font-bold ${qualityColorText} opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 select-none pointer-events-none`}>
                      {data.hours}h
                    </span>
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 mb-1 bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 delay-150 z-10 pointer-events-none whitespace-nowrap">
                      {data.hours}h, {getQualityLabel(data.quality)}<br />Bed: {formatBedtime(data.bedtime)}
                    </span>
                  </div>
                  <span className={`text-xs font-bold mt-1.5 group-hover/bar:${qualityColorText} transition-colors duration-200`}>
                    {data.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Middle Section: Average Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-1 border-2 border-gray-800 p-4 rounded-md bg-indigo-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
          {/* Average Sleep Quality - No change */}
            <p className="text-sm font-bold text-center mb-2 text-gray-700">Average Sleep Quality</p>
            <div className="text-center">
            <p className={`text-3xl font-bold ${getQualityTailwindColor(avgQualityNumeric, 'text', 'textDisplay')}`}>{avgQualityLabel}</p>
            <div className="flex justify-center mt-2 space-x-1">{[...Array(5)].map((_, i) => ( <Star key={i} className={`h-6 w-6 ${ i < Math.round(avgQualityNumeric) ? `${getQualityTailwindColor(avgQualityNumeric, 'fill', 'textDisplay')} ${getQualityTailwindColor(avgQualityNumeric, 'text', 'textDisplay').replace('-600','-700')}` : 'fill-gray-300 text-gray-400'}`} strokeWidth={1.5}/>))}</div>
            <p className="text-xs text-gray-600 mt-1">({avgQualityNumeric.toFixed(1)} / 5.0)</p>
            </div>
        </div>
        <div className="border-2 border-gray-800 p-3 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] flex flex-col items-center text-center justify-center">
            <Clock className="h-7 w-7 text-indigo-500 mb-1.5" />
            <p className="text-xs text-gray-700 font-bold uppercase tracking-wider">Avg. Duration</p>
            <p className="text-2xl font-bold text-indigo-700 mt-0.5">{avgDuration} <span className="text-base font-normal">hrs</span></p>
        </div>
        <div className="border-2 border-gray-800 p-3 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] flex flex-col items-center text-center justify-center">
            <BedDouble className="h-7 w-7 text-indigo-500 mb-1.5" />
            <p className="text-xs text-gray-700 font-bold uppercase tracking-wider">Avg. Bedtime</p>
            <p className="text-2xl font-bold text-indigo-700 mt-0.5">{formatBedtime(avgBedtime)}</p>
        </div>
      </div>

      {/* Bottom Section: Constellation Collector */}
      <ConstellationCollector goodSleepNightsCount={totalGoodSleepNights} />
      
      {/* Sheet for editing - No change in structure */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <SheetHeader>
            <SheetTitle className="font-bold">Edit Sleep Data</SheetTitle>
            <SheetDescription>Update sleep for {selectedDayKey ? new Date(selectedDayKey).toLocaleDateString() : ""}</SheetDescription>
          </SheetHeader>
          {editedEntry && (
            <div className="py-6 space-y-6">
              {/* Inputs for hours, bedtime, quality slider - No functional change */}
              <div className="space-y-2"><Label htmlFor="hours" className="font-bold">Sleep Duration (hours)</Label><Input id="hours" name="hours" type="number" step="0.1" min="0" max="24" value={editedEntry.hours} onChange={handleInputChange} className="border-2 border-gray-800"/></div>
              <div className="space-y-2"><Label htmlFor="bedtime" className="font-bold">Bedtime</Label><Input id="bedtime" name="bedtime" type="time" value={editedEntry.bedtime} onChange={handleInputChange} className="border-2 border-gray-800"/></div>
              <div className="space-y-2"><div className="flex justify-between"><Label className="font-bold">Sleep Quality</Label><span className={`text-sm font-bold ${getQualityTailwindColor(editedEntry.quality, 'text', 'textDisplay')}`}>{getQualityLabel(editedEntry.quality)}</span></div><Slider value={[editedEntry.quality]} onValueChange={handleQualityChange} max={5} step={1} className={`[&>span:first-child]:${getQualityTailwindColor(editedEntry.quality, 'bg', 'textDisplay')} [&>span]:hover:scale-110 [&>span]:border-2 [&>span]:border-gray-800`}/><div className="flex justify-between"><span className="text-xs text-gray-700 font-bold">Poor</span><span className="text-xs text-gray-700 font-bold">Excellent</span></div></div>
              <SheetFooter>
                <SheetClose asChild><Button variant="outline" className="border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">Cancel</Button></SheetClose>
                <Button onClick={saveEntry} className="bg-blue-600 hover:bg-indigo-700 text-black border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">Save Changes</Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </RetroWindow>
  )
}

// Helper functions formatBedtime, calculateAverageBedtime - NO CHANGE
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
  let totalMinutes = 0; let validBedtimesCount = 0;
  for (const time of bedtimes) {
      if (!time || !time.includes(':')) continue;
      const [hoursStr, minutesStr] = time.split(":");
      const hours = parseInt(hoursStr, 10); const minutes = parseInt(minutesStr, 10);
      if (isNaN(hours) || isNaN(minutes)) continue;
      totalMinutes += hours * 60 + minutes; validBedtimesCount++;
  }
  if (validBedtimesCount === 0) return "00:00";
  const avgMinutes = Math.round(totalMinutes / validBedtimesCount);
  const avgH = Math.floor(avgMinutes / 60) % 24; const avgM = avgMinutes % 60
  return `${avgH.toString().padStart(2, "0")}:${avgM.toString().padStart(2, "0")}`
}