"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react" // Added useCallback
import { Button } from "@/components/ui/button"
import { StretchVerticalIcon as Stretch, Play, Pause, Clock, GripVertical, CheckCircle, Plus, RotateCcw } from "lucide-react" // Added Plus, RotateCcw
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { RetroWindow } from "@/components/ui/retro-window"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog" // For adding exercises
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle as ActualSheetTitle, SheetFooter, SheetClose as ActualSheetClose } from "@/components/ui/sheet";

// --- GAMIFICATION COMPONENTS ---
import FlexibilityMatrix from "@/components/gamification/FlexibilityMatrix"; // Adjust path
import MobilityMeter from "@/components/gamification/MobilityMeter"; // Adjust path

interface StretchExercise {
  id: string; // Use string for IDs for easier management
  name: string;
  duration: number; // in seconds
  description: string;
  completedToday?: boolean; // For FlexibilityMatrix tracking
}


const defaultStretchExercises: StretchExercise[] = [
  { id: "neck_stretch", name: "Neck Stretch", duration: 30, description: "Gently tilt your head to each side" },
  { id: "shoulder_rolls", name: "Shoulder Rolls", duration: 45, description: "Roll shoulders forward and backward" },
  { id: "hamstring_stretch", name: "Hamstring Stretch", duration: 60, description: "Bend forward at the hips" },
  { id: "quad_stretch", name: "Quad Stretch", duration: 45, description: "Pull heel toward buttocks" },
  { id: "calf_stretch", name: "Calf Stretch", duration: 30, description: "Extend leg back, press heel down" },
];

export function StretchRoutine() {
  const [exercises, setExercises] = useState<StretchExercise[]>(() => defaultStretchExercises);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTimeOverall, setElapsedTimeOverall] = useState(0); // Total time for the whole routine
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeInCurrentExercise, setTimeInCurrentExercise] = useState(0); // Time elapsed in the current stretch
  
  const [lastRoutineCompletionTime, setLastRoutineCompletionTime] = useState<string | null>(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [isAddExerciseSheetOpen, setIsAddExerciseSheetOpen] = useState(false);
  const [newExercise, setNewExercise] = useState({ name: "", duration: 30, description: ""});


  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const totalRoutineDuration = exercises.reduce((total, ex) => total + ex.duration, 0);
  const formattedTotalDuration = `${Math.floor(totalRoutineDuration / 60)}:${(totalRoutineDuration % 60).toString().padStart(2, "0")}`;
  const overallProgressPercent = totalRoutineDuration > 0 ? (elapsedTimeOverall / totalRoutineDuration) * 100 : 0;
  const currentExerciseProgressPercent = exercises[currentExerciseIndex]?.duration > 0 ? (timeInCurrentExercise / exercises[currentExerciseIndex].duration) * 100 : 0;


  // Load data from localStorage
  useEffect(() => {
    const savedExercises = localStorage.getItem("stretchRoutineExercises");
    if (savedExercises) {
      try {
        const parsed = JSON.parse(savedExercises);
        if (Array.isArray(parsed) && parsed.length > 0) setExercises(parsed);
      } catch (e) { console.error("Failed to parse exercises from localStorage", e); }
    }
    const savedLastCompletion = localStorage.getItem("lastStretchRoutineCompletion");
    if (savedLastCompletion) setLastRoutineCompletionTime(savedLastCompletion);
  }, []);

  // Save exercises to localStorage
  useEffect(() => {
    localStorage.setItem("stretchRoutineExercises", JSON.stringify(exercises));
  }, [exercises]);


  // Timer logic
  useEffect(() => {
    if (isTimerRunning && currentExerciseIndex < exercises.length) {
      timerRef.current = setInterval(() => {
        setElapsedTimeOverall((prev) => prev + 1);
        setTimeInCurrentExercise((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimerRunning, currentExerciseIndex, exercises.length]);

  // Handle exercise completion and routine end
  useEffect(() => {
    if (currentExerciseIndex < exercises.length && timeInCurrentExercise >= exercises[currentExerciseIndex].duration) {
        // Mark as completed for today (for matrix) - needs more robust daily tracking
        setExercises(prevEx => prevEx.map((ex, idx) => idx === currentExerciseIndex ? {...ex, completedToday: true} : ex));

      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1);
        setTimeInCurrentExercise(0);
        toast({ title: "Stretch Complete!", description: `Next: ${exercises[currentExerciseIndex + 1].name}` });
      } else { // All exercises done
        setIsTimerRunning(false);
        setShowCompletionMessage(true);
        const now = new Date().toLocaleString();
        setLastRoutineCompletionTime(now);
        localStorage.setItem("lastStretchRoutineCompletion", now);
        toast({ title: "Routine Complete!", description: "Great job staying flexible!", duration: 5000 });
      }
    }
  }, [timeInCurrentExercise, currentExerciseIndex, exercises, toast]);


  const formatTime = (seconds: number) => { /* ... (no change) ... */
    const mins = Math.floor(seconds / 60); const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleRoutine = () => {
    if (isTimerRunning) { // Pausing
      setIsTimerRunning(false);
      toast({ title: "Routine Paused", description: `Progress saved at ${formatTime(elapsedTimeOverall)}` });
    } else { // Starting or Resuming
      if (showCompletionMessage) { // If was complete, treat as reset
          resetRoutine(false); // Soft reset, don't toast "reset"
      }
      setIsTimerRunning(true);
      setShowCompletionMessage(false);
      toast({ title: elapsedTimeOverall > 0 ? "Routine Resumed!" : "Let's Stretch!", description: `Starting with ${exercises[currentExerciseIndex]?.name || "the first exercise"}` });
    }
  };

  const resetRoutine = (showToast = true) => {
    setIsTimerRunning(false);
    setElapsedTimeOverall(0);
    setCurrentExerciseIndex(0);
    setTimeInCurrentExercise(0);
    setShowCompletionMessage(false);
    // Reset completedToday status
    setExercises(prevEx => prevEx.map(ex => ({...ex, completedToday: false })));
    if (showToast) toast({ title: "Routine Reset", description: "Ready for a fresh start!" });
  };

  const handleAddExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExercise.name || newExercise.duration <= 0) {
        toast({title: "Invalid Exercise", description: "Name and positive duration required.", variant: "destructive"}); return;
    }
    setExercises(prev => [...prev, {...newExercise, id: Date.now().toString()}]);
    setNewExercise({name: "", duration: 30, description: ""});
    setIsAddExerciseSheetOpen(false);
    toast({title: "Exercise Added!", description: `${newExercise.name} added to your routine.`});
  };
  
  const completedStretchesCount = exercises.filter(ex => ex.completedToday).length;

  return (
    <>
    <RetroWindow title="Stretch Routine" icon={<Stretch className="h-4 w-4 text-amber-500" />} variant="amber" className="transition-all duration-200">
      {/* Initial Motivational Message or Completion Message */}
      {!isTimerRunning && !showCompletionMessage && elapsedTimeOverall === 0 && (
        <div className="p-3 mb-4 bg-amber-100 rounded-md border-2 border-gray-800 text-center shadow-sm">
          <p className="text-amber-700 font-bold font-pixel text-sm">Ready to get flexible? Hit 'Start Routine'!</p>
        </div>
      )}
      {showCompletionMessage && (
        <div className="p-4 mb-4 bg-green-100 rounded-md border-2 border-green-600 text-center shadow-lg animate-bounce">
          <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2"/>
          <p className="text-green-700 font-bold font-pixel text-lg">Routine Complete! Amazing Work!</p>
          <p className="text-xs text-green-600">You stretched for {formatTime(elapsedTimeOverall)}.</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        {/* ... (Daily Routine duration - no change) ... */}
        <div><p className="text-sm text-gray-700 font-bold">Daily Routine</p><div className="flex items-center"><Clock className="h-4 w-4 text-amber-500 mr-1" /><p className="font-bold">{formattedTotalDuration} min</p></div></div>
        <div className="flex gap-2">
            { (isTimerRunning || elapsedTimeOverall > 0) && !showCompletionMessage && (
                <Button variant="outline" size="sm" onClick={() => resetRoutine()} className="text-amber-700 border-2 border-gray-800 bg-amber-100 hover:bg-amber-200 active:bg-amber-300 shadow-sm active:shadow-none"><RotateCcw className="h-4 w-4 mr-1"/>Reset</Button>
            )}
            <Button className={`text-black hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-[1px] active:translate-x-[1px] ${isTimerRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-amber-400 hover:bg-amber-500"}`} onClick={toggleRoutine}>
            {isTimerRunning ? <><Pause className="h-4 w-4 mr-1" />Pause</> : <><Play className="h-4 w-4 mr-1 text-black" />{elapsedTimeOverall > 0 && !showCompletionMessage ? "Resume" : "Start Routine"}</>}
            </Button>
        </div>
      </div>

      {(isTimerRunning || (elapsedTimeOverall > 0 && !showCompletionMessage)) && exercises[currentExerciseIndex] && (
        <div className="mb-4 p-3 bg-amber-100 rounded-md border-2 border-gray-800 shadow-sm">
          {/* ... (Current exercise display and progress - no functional change, minor style tweaks if needed) ... */}
          <div className="flex justify-between items-center mb-1"><p className="text-sm font-bold text-amber-800">Current: <span className="text-amber-900 text-base">{exercises[currentExerciseIndex]?.name}</span></p><p className="text-sm font-bold text-amber-800">Time: <span className="text-amber-900 text-base">{formatTime(elapsedTimeOverall)}</span></p></div>
          <Progress value={currentExerciseProgressPercent} className="h-2.5 bg-amber-200 border border-gray-800 [&>*]:bg-amber-500" />
          <div className="flex justify-between mt-1 text-xs text-amber-700 font-bold"><span>{formatTime(timeInCurrentExercise)}</span><span>{formatTime(exercises[currentExerciseIndex].duration)}</span></div>
        </div>
      )}

      <div className="space-y-2 mt-4 max-h-72 overflow-y-auto pr-1">
        {exercises.map((exercise, index) => (
          <div key={exercise.id} className={`flex items-center p-2.5 rounded-md border-2 border-gray-800 transition-all duration-200 hover:shadow-md ${ index === currentExerciseIndex && isTimerRunning ? "bg-amber-200 ring-2 ring-amber-500 animate-pulse-border" : "bg-white hover:bg-amber-50"}`}>
            <GripVertical className="h-5 w-5 mr-2 text-gray-500 cursor-grab" />
            <div className="flex-1"><p className="font-bold text-sm text-gray-800">{exercise.name}</p><p className="text-xs text-gray-600">{exercise.description}</p></div>
            <p className="text-sm text-gray-700 font-bold shrink-0 ml-2">{exercise.duration}s</p>
            {index < currentExerciseIndex || (index === currentExerciseIndex && timeInCurrentExercise >= exercise.duration) ? <CheckCircle className="h-5 w-5 text-green-500 ml-2 shrink-0" /> : null }
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t-2 border-gray-300">
        {/* ... (Customize Routine button - no change) ... */}
        <div className="flex justify-between items-center"><p className="text-sm font-bold">Customize Routine</p><Button variant="outline" size="sm" onClick={()=>setIsAddExerciseSheetOpen(true)} className="border-2 border-gray-800 text-amber-600 bg-amber-100 hover:bg-amber-200 active:bg-amber-300 shadow-sm active:shadow-none"><Plus className="h-4 w-4 mr-1" />Add Exercise</Button></div>
      </div>
      {lastRoutineCompletionTime && <div className="pt-2 text-xs text-gray-600 font-bold mt-1 text-center">Last routine completed: {lastRoutineCompletionTime}</div>}
    </RetroWindow>

    {/* GAMIFICATION SECTIONS - Below main window */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <MobilityMeter progressPercent={overallProgressPercent} />
        <FlexibilityMatrix completedStretchesToday={completedStretchesCount} totalPossibleStretches={exercises.length} gridSize={Math.max(3, Math.ceil(Math.sqrt(exercises.length)))} />
    </div>

    {/* Add Exercise Sheet */}
    <Sheet open={isAddExerciseSheetOpen} onOpenChange={setIsAddExerciseSheetOpen}>
        <SheetContent className="sm:max-w-md border-2 border-gray-800 shadow-lg bg-white">
            <SheetHeader><DialogTitle className="font-bold font-pixel text-lg">Add Custom Stretch</DialogTitle></SheetHeader>
            <form onSubmit={handleAddExerciseSubmit} className="py-6 space-y-4">
                <div><Label htmlFor="exName" className="font-bold text-sm">Stretch Name</Label><Input id="exName" value={newExercise.name} onChange={e=>setNewExercise({...newExercise, name: e.target.value})} className="mt-1 border-2 border-gray-800" required/></div>
                <div><Label htmlFor="exDuration" className="font-bold text-sm">Duration (seconds)</Label><Input id="exDuration" type="number" value={newExercise.duration} onChange={e=>setNewExercise({...newExercise, duration: parseInt(e.target.value) || 0})} className="mt-1 border-2 border-gray-800" required min="5"/></div>
                <div><Label htmlFor="exDesc" className="font-bold text-sm">Description (optional)</Label><Input id="exDesc" value={newExercise.description} onChange={e=>setNewExercise({...newExercise, description: e.target.value})} className="mt-1 border-2 border-gray-800"/></div>
                <DialogFooter className="pt-4">
                    <DialogClose asChild><Button type="button" variant="outline" className="border-2 border-gray-800 shadow-sm">Cancel</Button></DialogClose>
                    <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black border-2 border-gray-800 shadow-sm">Add Stretch</Button>
                </DialogFooter>
            </form>
        </SheetContent>
    </Sheet>
    </>
  )
}

// Plus icon component already defined in your code, removed re-definition.

function Plus(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
