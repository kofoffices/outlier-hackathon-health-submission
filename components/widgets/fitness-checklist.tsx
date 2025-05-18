"use client"

import type React from "react" // Keep if you use React.FC or similar
import { useState, useEffect } from "react" // Added useEffect
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Dumbbell, Timer, Plus, Award, Zap, Flame } // Added Award, Zap, Flame
from "lucide-react"
import { useHealth, Exercise } from "@/components/health-provider" // Import Exercise type
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { RetroWindow } from "@/components/ui/retro-window"

// --- GAMIFICATION COMPONENTS ---
import WorkoutHero from "@/components/gamification/WorkoutHero"; // Adjust path
import ComboCounter from "@/components/gamification/ComboCounter"; // Adjust path

export function FitnessChecklist() {
  const { exercises, addExercise, toggleExercise: toggleExerciseContext, dailyGoals } = useHealth();
  const { toast } = useToast()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [newExercise, setNewExercise] = useState({ name: "", duration: 0, description: "" })

  // --- Gamification State ---
  const [workoutHeroLevel, setWorkoutHeroLevel] = useState(1);
  const [currentDailyCombo, setCurrentDailyCombo] = useState(0);
  const [maxDailyCombo, setMaxDailyCombo] = useState(0);
  // To track if the last toggled exercise was a completion for combo
  const [lastToggleCompleted, setLastToggleCompleted] = useState(false);


  const completedCount = exercises.filter((ex) => ex.completed).length
  const totalCount = exercises.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Calculate Hero Level and Combo
  useEffect(() => {
    // Hero Level (simple logic: 1 level per 3 fully completed checklists, or per 5 total exercises done)
    // This needs historical data or a persistent "total exercises completed ever" count.
    // For now, let's base it on today's completion.
    if (totalCount > 0 && completedCount === totalCount) {
        setWorkoutHeroLevel(prev => Math.min(3, prev + 1)); // Max level 3 for this simple demo
    } else if (completedCount >= Math.floor(totalCount * 0.66) && totalCount > 0) {
        setWorkoutHeroLevel(2);
    } else if (completedCount >= Math.floor(totalCount * 0.33) && totalCount > 0) {
        setWorkoutHeroLevel(1);
    } else {
        // Potentially reset or keep current level based on design
        // setWorkoutHeroLevel(1); // Or keep it, avoid losing level easily
    }

    // Combo Counter: This should ideally reset daily.
    // For this example, it's based on current `exercises` state.
    // A more robust combo would track consecutive completions.
    if (lastToggleCompleted) {
        setCurrentDailyCombo(prev => prev + 1);
    } else {
        // If the last toggle was an uncheck, or if no toggle happened (initial load),
        // check current state for an ongoing combo from the end.
        let ongoingCombo = 0;
        for (let i = exercises.length - 1; i >= 0; i--) {
            if (exercises[i].completed) ongoingCombo++;
            else break; // Combo broken
        }
        // This logic is flawed for "current" combo after unchecking. 
        // True combo needs to track the sequence of completions.
        // Simplified: just count completed for "current" as well for now
        setCurrentDailyCombo(completedCount); // Simplification: current combo is just total completed today
    }
    setMaxDailyCombo(prevMax => Math.max(prevMax, currentDailyCombo));
    
    // Reset lastToggleCompleted for next interaction
    setLastToggleCompleted(false);

  }, [exercises, completedCount, totalCount, currentDailyCombo, lastToggleCompleted]); // Added currentDailyCombo

  const toggleExercise = (id: string) => {
    const exercise = exercises.find(ex => ex.id === id);
    if (exercise) {
        // If it's about to be completed
        if (!exercise.completed) {
            setLastToggleCompleted(true);
        } else {
            // If it's about to be un-completed, reset current combo for simplicity here.
            // A real combo would be more complex if unchecking mid-list.
            setCurrentDailyCombo(0); 
            setLastToggleCompleted(false);
        }
    }
    toggleExerciseContext(id);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... no change ... */
    const { name, value } = e.target
    setNewExercise({ ...newExercise, [name]: name === "duration" ? Number(value) : value })
  }

  const handleSubmit = (e: React.FormEvent) => { /* ... no change ... */
    e.preventDefault()
    if (!newExercise.name || newExercise.duration <= 0) {
      toast({ title: "Invalid exercise data", description: "Please provide a name and duration.", variant: "destructive" })
      return
    }
    addExercise(newExercise as Omit<Exercise, 'id' | 'completed'>) // Cast if addExercise expects this
    setIsSheetOpen(false)
    setNewExercise({ name: "", duration: 0, description: "" })
    toast({ title: "Exercise added", description: `${newExercise.name} has been added.`})
  }

  // Mocked weekly goal & calories - replace with real data from useHealth if available
  const weeklyGoalProgress = dailyGoals?.fitnessWeeklyDays || 4;
  const weeklyGoalTarget = 7;
  const caloriesBurnedToday = exercises.reduce((sum, ex) => ex.completed ? sum + (ex.calories || (ex.duration * 5)) : sum, 0); // Estimate calories if not present


  return (
    <>
      <RetroWindow
        title="Fitness Checklist"
        icon={<Dumbbell className="h-4 w-4 text-purple-500" />}
        variant="purple"
        className="transition-all duration-200"
      >
        <div className="flex flex-col md:flex-row gap-4">
            {/* Left Column: Checklist and Stats */}
            <div className="flex-grow md:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  {/* ... Today's Progress & Add Button - no change ... */}
                  <div><p className="text-sm text-gray-700 font-bold">Today's Progress</p><p className="text-lg font-bold">{completedCount} <span className="text-gray-500">/ {totalCount} exercises</span></p></div>
                  <Button size="sm" variant="outline" className="border-2 border-gray-800 text-purple-600 bg-purple-100 hover:bg-purple-200 active:bg-purple-300 hover:scale-[1.03] transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-[1px] active:translate-x-[1px]" onClick={() => setIsSheetOpen(true)}><Plus className="h-4 w-4 mr-1" />Add</Button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 border-2 border-gray-800"><div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}/></div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1"> {/* Added max-h and overflow */}
                {exercises.map((exercise) => (
                    <div key={exercise.id} className={`flex items-center justify-between p-3 rounded-md border-2 border-gray-800 transition-all duration-200 hover:scale-[1.01] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] ${ exercise.completed ? "bg-purple-100 hover:bg-purple-200" : "bg-white hover:bg-purple-50"}`}>
                    <div className="flex items-center gap-3">
                        <Checkbox checked={exercise.completed} onCheckedChange={() => toggleExercise(exercise.id)} id={`ex-${exercise.id}`} className="border-2 border-purple-400 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-700 focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 h-5 w-5 shrink-0"/>
                        <div><label htmlFor={`ex-${exercise.id}`} className={`font-bold cursor-pointer ${exercise.completed ? "line-through text-gray-500" : "text-gray-800"}`}>{exercise.name}</label>
                        <p className="text-xs text-gray-600">{exercise.description}</p></div>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 font-bold whitespace-nowrap"> <Timer className="h-3.5 w-3.5 mr-1 text-purple-600" />{exercise.duration} min</div>
                    </div>
                ))}
                {exercises.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No exercises added for today. Click "Add Exercise" to start!</p>
                )}
                </div>
            </div>

            {/* Right Column: Gamification */}
            <div className="md:w-1/3 flex flex-col gap-4 mt-4 md:mt-0">
                <WorkoutHero level={workoutHeroLevel} pixelSize={8}/>
                <ComboCounter currentDailyCombo={currentDailyCombo} maxDailyCombo={maxDailyCombo} />
            </div>
        </div>


        <div className="mt-6 pt-4 border-t-2 border-gray-300">
          {/* ... Weekly Goal & Calories Burned - using mocked values, adjust as needed ... */}
            <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-gray-800 p-2 rounded-md bg-purple-100 hover:bg-purple-200 transition-colors duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] text-center"><p className="text-xs text-gray-700 font-bold">Weekly Goal</p><p className="text-lg font-bold text-purple-600">{weeklyGoalProgress} <span className="text-sm font-normal">/ {weeklyGoalTarget} days</span></p></div>
                <div className="border-2 border-gray-800 p-2 rounded-md bg-purple-100 hover:bg-purple-200 transition-colors duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] text-center"><p className="text-xs text-gray-700 font-bold">Est. Calories Burned</p><p className="text-lg font-bold text-purple-600">{caloriesBurnedToday} <span className="text-sm font-normal">kcal</span></p></div>
            </div>
        </div>
      </RetroWindow>

      {/* Sheet for Adding Exercise - No change to its internal structure */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}><SheetContent className="sm:max-w-md border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"><SheetHeader><SheetTitle className="font-bold font-pixel">Add New Exercise</SheetTitle><SheetDescription>Define your workout for the checklist.</SheetDescription></SheetHeader><form onSubmit={handleSubmit} className="space-y-6 py-6"><div className="space-y-4"><div className="space-y-2"><Label htmlFor="name" className="font-bold">Exercise Name</Label><Input id="name" name="name" placeholder="e.g. Morning Run" value={newExercise.name} onChange={handleInputChange} className="border-2 border-gray-800" required/></div><div className="space-y-2"><Label htmlFor="duration" className="font-bold">Duration (minutes)</Label><Input id="duration" name="duration" type="number" placeholder="30" value={newExercise.duration || ""} onChange={handleInputChange} className="border-2 border-gray-800" required min="1"/></div><div className="space-y-2"><Label htmlFor="description" className="font-bold">Description (optional)</Label><Input id="description" name="description" placeholder="Brief description" value={newExercise.description} onChange={handleInputChange} className="border-2 border-gray-800"/></div></div><SheetFooter><SheetClose asChild><Button type="button" variant="outline" className="border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">Cancel</Button></SheetClose><Button type="submit" className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-[1px] active:translate-x-[1px]">Add Exercise</Button></SheetFooter></form></SheetContent></Sheet>
    </>
  )
}