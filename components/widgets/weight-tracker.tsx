"use client"

import { useState, useEffect } from "react" // Added useEffect
import { Scale, Plus, MapPin, Star as StarIconLucide } from "lucide-react" // Added Plus, MapPin, StarIconLucide
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { RetroWindow } from "@/components/ui/retro-window"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// --- GAMIFICATION COMPONENTS ---
import ProgressPath from "@/components/gamification/ProgressPath"; // Adjust path
import StabilityStars from "@/components/gamification/StabilityStars"; // Adjust path


interface WeightEntry {
  date: string; // YYYY-MM-DD
  weight: number;
  notes?: string; // Optional notes for "Graph Glyphs" idea later
}

const INITIAL_GOAL_WEIGHT = 155; // lbs

// Helper to format date for display
const formatDateForDisplay = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00"); // Ensure parsing as local date
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};


export function WeightTracker() {
  const [weightLog, setWeightLog] = useState<WeightEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWeight, setNewWeight] = useState<number | string>("");
  const [goalWeight, setGoalWeight] = useState<number>(INITIAL_GOAL_WEIGHT); // User can set this later
  const { toast } = useToast();

  // --- Gamification State ---
  const [loggingStreak, setLoggingStreak] = useState(0);
  // const [maxLoggingStreak, setMaxLoggingStreak] = useState(0); // For future use

  useEffect(() => {
    const savedLog = localStorage.getItem("weightTrackerLog");
    if (savedLog) {
      const parsedLog: WeightEntry[] = JSON.parse(savedLog);
      // Sort by date to ensure chart is correct and streak calculation is easier
      parsedLog.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setWeightLog(parsedLog);
    } else {
      // Initialize with a few mock entries if empty, for demo purposes
      const mockInitialLog: WeightEntry[] = [
        { date: "2024-05-01", weight: 165.5 }, { date: "2024-05-05", weight: 164.8 },
        { date: "2024-05-10", weight: 163.2 },
      ];
       mockInitialLog.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setWeightLog(mockInitialLog);
      localStorage.setItem("weightTrackerLog", JSON.stringify(mockInitialLog));
    }
     const savedGoal = localStorage.getItem("weightGoal");
     if (savedGoal) setGoalWeight(parseFloat(savedGoal));

  }, []);

  // Calculate logging streak
  useEffect(() => {
    if (weightLog.length === 0) {
      setLoggingStreak(0);
      return;
    }
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0,0,0,0);

    // Iterate backwards from most recent log
    for (let i = weightLog.length - 1; i >= 0; i--) {
      const logDate = new Date(weightLog[i].date + "T00:00:00");
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - (weightLog.length - 1 - i));
      
      if (logDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
      } else {
        break; // Streak broken
      }
    }
    setLoggingStreak(currentStreak);
    // setMaxLoggingStreak(prevMax => Math.max(prevMax, currentStreak)); // Update max streak
  }, [weightLog]);


  const handleAddWeight = () => {
    const weightVal = parseFloat(newWeight as string);
    if (isNaN(weightVal) || weightVal <= 0) {
      toast({ title: "Invalid Weight", description: "Please enter a valid positive number.", variant: "destructive" });
      return;
    }
    const todayStr = new Date().toISOString().split("T")[0];
    
    // Check if entry for today already exists, if so, update it. Otherwise, add new.
    const existingEntryIndex = weightLog.findIndex(entry => entry.date === todayStr);
    let updatedLog;

    if (existingEntryIndex > -1) {
        updatedLog = [...weightLog];
        updatedLog[existingEntryIndex] = { date: todayStr, weight: weightVal };
    } else {
        updatedLog = [...weightLog, { date: todayStr, weight: weightVal }];
    }
    updatedLog.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    setWeightLog(updatedLog);
    localStorage.setItem("weightTrackerLog", JSON.stringify(updatedLog));
    setNewWeight("");
    setIsDialogOpen(false);
    toast({ title: "Weight Logged!", description: `Weight ${weightVal} lbs saved for today.` });
  };

  const chartData = weightLog.map(entry => ({
    ...entry,
    displayDate: formatDateForDisplay(entry.date) // For XAxis labels
  }));

  const startWeight = chartData.length > 0 ? chartData[0].weight : 0;
  const currentWeight = chartData.length > 0 ? chartData[chartData.length - 1].weight : 0;
  
  let thirtyDayChange = 0;
  if (chartData.length > 0) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const entry30DaysAgo = chartData.find(entry => new Date(entry.date + "T00:00:00") >= thirtyDaysAgo);
      const weight30DaysAgo = entry30DaysAgo ? entry30DaysAgo.weight : startWeight; // Fallback to start if no data in range
      thirtyDayChange = currentWeight - weight30DaysAgo;
  }
  const weightChangeFormatted = thirtyDayChange.toFixed(1);
  const isWeightLoss = thirtyDayChange < 0;


  return (
    <>
      <RetroWindow
        title="Weight Tracker"
        icon={<Scale className="h-4 w-4 text-teal-500" />}
        variant="teal"
        className="transition-all duration-200"
      >
        {/* Top Section: Current Weight, Change, Add Button */}
        <div className="flex items-center justify-between mb-4 p-3">
          <div>
            <p className="text-sm text-gray-700 font-bold">Current Weight</p>
            <p className="text-3xl font-bold text-teal-600">
              {currentWeight.toFixed(1)} <span className="text-base font-normal">lbs</span>
            </p>
          </div>
           <div className="text-right">
            <p className="text-sm text-gray-700 font-bold">30 Day Change</p>
            <p className={`text-xl font-bold ${isWeightLoss && thirtyDayChange !== 0 ? "text-green-600" : thirtyDayChange > 0 ? "text-red-600" : "text-gray-600"}`}>
              {thirtyDayChange === 0 ? "0.0" : (isWeightLoss ? "" : "+") + weightChangeFormatted} <span className="text-sm font-normal">lbs</span>
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="bg-teal-400 hover:bg-teal-500 active:bg-teal-600 text-black border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-[1px] active:translate-x-[1px]"
          >
            <Plus className="h-4 w-4 mr-1" /> Log Weight
          </Button>
        </div>

        {/* Chart */}
        <div className="h-56 mt-2 border-2 border-gray-800 p-3 rounded-md bg-white">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#9CA3AF" />
                <XAxis dataKey="displayDate" tick={{ fontSize: 10, fill: '#4B5563' }} tickLine={false} axisLine={{ stroke: "#6B7281" }} dy={5}/>
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 10, fill: '#4B5563' }} tickLine={false} axisLine={{ stroke: "#6B7281" }} width={35} />
                <Tooltip contentStyle={{ borderRadius: "6px", border: "2px solid #374151", backgroundColor: "rgba(255,255,255,0.9)", fontWeight: "bold", boxShadow: "2px 2px 0px #374151"}} itemStyle={{color: '#14b8a6'}} labelStyle={{color: '#374151'}}/>
                <Line type="monotone" dataKey="weight" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 5, fill: "#14b8a6", strokeWidth: 1.5, stroke: "#fff" }} activeDot={{ r: 7, fill: "#0f766e", strokeWidth: 2, stroke: "#fff" }}/>
                {/* Optional: Goal Line */}
                {/* <ReferenceLine y={goalWeight} label={{ value: "Goal", position: "right", fill: "#0d9488", fontSize: 10 }} stroke="#0d9488" strokeDasharray="3 3" /> */}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 font-pixel">Log your weight to see the chart!</p>
            </div>
          )}
        </div>
        
        {/* Bottom Stats: Starting, Goal, Remaining */}
        <div className="mt-4 pt-4 border-t-2 border-gray-300">
          <div className="grid grid-cols-3 gap-3">
            {/* ... (existing starting, goal, remaining cards - slight style adjustment) ... */}
            <div className="border-2 border-gray-800 p-2.5 rounded-md bg-teal-50 text-center shadow-sm"><p className="text-xs text-gray-700 font-bold">Starting</p><p className="text-lg font-bold text-gray-700">{startWeight.toFixed(1)} lbs</p></div>
            <div className="border-2 border-teal-600 p-2.5 rounded-md bg-teal-100 text-center shadow-md"><p className="text-xs text-teal-700 font-bold">Goal</p><p className="text-lg font-bold text-teal-600">{goalWeight.toFixed(1)} lbs</p></div>
            <div className="border-2 border-gray-800 p-2.5 rounded-md bg-teal-50 text-center shadow-sm"><p className="text-xs text-gray-700 font-bold">To Goal</p><p className="text-lg font-bold text-gray-700">{(currentWeight - goalWeight).toFixed(1)} lbs</p></div>
          </div>
        </div>
      </RetroWindow>

      {/* GAMIFICATION SECTIONS - Placed below the main tracker window */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <ProgressPath logCount={weightLog.length} />
        <StabilityStars loggingStreak={loggingStreak} />
      </div>


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xs border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <DialogHeader><DialogTitle className="font-bold font-pixel">Log Today's Weight</DialogTitle></DialogHeader>
          <div className="py-4">
            <Label htmlFor="weight" className="font-bold">Weight (lbs)</Label>
            <Input id="weight" type="number" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} placeholder="e.g. 160.5" className="mt-1 border-2 border-gray-800" step="0.1"/>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline" className="border-2 border-gray-800 shadow-sm">Cancel</Button></DialogClose>
            <Button onClick={handleAddWeight} className="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-black border-2 border-gray-800 shadow-sm active:shadow-none">Save Weight</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}