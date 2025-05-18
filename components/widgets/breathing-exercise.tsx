"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Wind, Play, Pause, CheckCircle, Leaf } from "lucide-react"
import { useHealth } from "@/components/health-provider"
import { motion, AnimatePresence } from "framer-motion"
import { RetroWindow } from "@/components/ui/retro-window"

import ZenPixelGarden from "@/components/gamification/ZenPixelGarden"; 
import AuraAnimator from "@/components/gamification/AuraAnimator"; 

export function BreathingExercise() {
  const { addBreathingSession, breathingSessionsLog } = useHealth(); 
  
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [progress, setProgress] = useState(0) 
  const [cycleCount, setCycleCount] = useState(0); 
  const [currentPhaseTime, setCurrentPhaseTime] = useState(0); 
  
  const [showSuccess, setShowSuccess] = useState(false)
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Historical total completed sessions for other potential features, not garden
  const totalHistoricalSessions = breathingSessionsLog?.length || 0;
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (breathingSessionsLog && breathingSessionsLog.length > 0) {
        let streak = 0;
        const today = new Date().setHours(0,0,0,0);
        const uniqueDays = new Set(breathingSessionsLog.map(s => new Date(s.date).setHours(0,0,0,0)));
        for (let i = 0; i < 30; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            if (uniqueDays.has(checkDate.getTime())) streak++;
            else if (i > 0) break;
        }
        setCurrentStreak(streak);
    }
  }, [breathingSessionsLog]);


  const durations = { inhale: 4, hold: 7, exhale: 8 }; 

  useEffect(() => {
    if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);
    if (isActive) {
      phaseTimerRef.current = setInterval(() => {
        setCurrentPhaseTime((prevTime) => {
          const currentPhaseDuration = durations[phase];
          const newTime = prevTime + 0.05; 
          setProgress((newTime / currentPhaseDuration) * 100);
          if (newTime >= currentPhaseDuration) {
            if (phase === "inhale") setPhase("hold");
            else if (phase === "hold") setPhase("exhale");
            else { 
              setPhase("inhale");
              setCycleCount(c => c + 1); // Increment cycle count here
            }
            return 0; 
          }
          return newTime;
        });
      }, 50); 
    } else {
        setProgress(0); 
        setCurrentPhaseTime(0);
        // Do not reset cycleCount here, it should reset when starting a new session
    }
    return () => { if (phaseTimerRef.current) clearInterval(phaseTimerRef.current); };
  }, [isActive, phase, durations]); 


  const toggleActive = () => {
    if (isActive) { 
      if (cycleCount > 0) { 
        addBreathingSession({ duration: cycleCount * (4+7+8), date: new Date().toISOString() }); 
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
      }
      // Don't reset cycleCount here; it will be reset when starting.
    } else { 
      setPhase("inhale");
      setProgress(0);
      setCurrentPhaseTime(0);
      setCycleCount(0); // Reset cycleCount when a new session starts
    }
    setIsActive(!isActive);
  };

  // ... (getInstructionText, getCurrentPhaseTargetTime, circleSize, circleColor - no changes)
  const getInstructionText = () => phase.charAt(0).toUpperCase() + phase.slice(1);
  const getCurrentPhaseTargetTime = () => durations[phase];

  const circleSize = isActive ? (
    phase === "inhale" ? 100 + progress * 0.6 : 
    phase === "exhale" ? 160 - progress * 0.6 : 
    160 
  ) : 120; 

  const circleColor = isActive ? (
    phase === "inhale" ? "border-sky-400" :
    phase === "hold" ? "border-purple-400" :
    "border-teal-400"
  ) : "border-gray-400";

  return (
    <>
    <RetroWindow title="Breathing Exercise" icon={<Wind className="h-4 w-4 text-sky-500" />} variant="sky" className="transition-all duration-200 relative overflow-hidden">
      <AuraAnimator isActive={isActive} phase={phase} streakCount={currentStreak} />
      <div className="flex flex-col items-center justify-center py-6 relative z-10">
        {/* ... (Breathing circle and instructions - no major change) ... */}
        <div className="relative flex items-center justify-center mb-8" style={{ height: "180px", width: "180px" }}>
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="absolute flex flex-col items-center">
                <CheckCircle className="h-20 w-20 text-green-500 mb-2" />
                <p className="text-lg font-bold text-green-600 font-pixel">Session Complete!</p>
              </motion.div>
            ) : (
              <>
                <motion.div key="breathingCircle" className={`absolute rounded-full border-4 transition-all ease-linear duration-[50ms] ${circleColor}`} style={{ width: `${circleSize}px`, height: `${circleSize}px` }} animate={{ width: `${circleSize}px`, height: `${circleSize}px` }} transition={{ type: "spring", stiffness: 200, damping: 20 }}/>
                <div className={`text-3xl font-bold font-pixel transition-colors duration-500 ${isActive ? (phase === "inhale" ? "text-sky-600" : phase === "hold" ? "text-purple-600" : "text-teal-600") : "text-gray-700"}`}>
                  {isActive ? getInstructionText() : "Ready?"}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
        <p className="text-sm text-gray-700 mb-1 font-bold font-pixel h-5">{isActive ? `Target: ${getCurrentPhaseTargetTime()}s` : "4-7-8 Breathing Technique"}</p>
        <p className="text-xs text-gray-500 mb-5 font-pixel h-3">{isActive ? `Cycle: ${cycleCount + 1}` : ""}</p>
        <Button onClick={toggleActive} size="lg" className={`text-black min-w-[180px] text-black se hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-0.5 active:translate-x-0.5 ${isActive ? "bg-rose-500 hover:bg-rose-600 text-white" : "bg-sky-400 hover:bg-sky-500 text-black"}`}>
          {isActive ? <><Pause className="text-black h-5 w-5 mr-2" /> Stop Session</> : <><Play className="text-black h-5 w-5 mr-2" /> Start Session</>}
        </Button>
        {!isActive && !showSuccess && ( /* ... (instructions - no change) ... */
          <div className="mt-6 text-sm text-gray-700 border-2 border-gray-800 p-4 rounded-md bg-sky-50 shadow-sm max-w-sm text-center">
            <p className="font-bold mb-1.5 text-sky-700">How it works:</p>
            <ul className="list-disc list-inside text-left space-y-1 text-xs"><li>Inhale through your nose for 4 seconds.</li><li>Hold your breath gently for 7 seconds.</li><li>Exhale slowly through your mouth for 8 seconds.</li></ul>
            <p className="text-xs mt-2 text-gray-500">Repeat for desired duration.</p>
          </div>
        )}
      </div>
    </RetroWindow>

    {/* Pass currentSessionCycleCount and isActive to ZenPixelGarden */}
    <ZenPixelGarden
      currentSessionCycleCount={cycleCount}
      isActive={isActive}
      pixelSize={8}
    />
    </>
  );
}