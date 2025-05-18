"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Wind, Play, Pause, CheckCircle, Leaf } from "lucide-react" // Added Leaf
import { useHealth } from "@/components/health-provider"
import { motion, AnimatePresence } from "framer-motion"
import { RetroWindow } from "@/components/ui/retro-window"

// --- GAMIFICATION COMPONENTS ---
import ZenPixelGarden from "@/components/gamification/ZenPixelGarden"; // Adjust path
import AuraAnimator from "@/components/gamification/AuraAnimator"; // Adjust path

export function BreathingExercise() {
  const { addBreathingSession, breathingSessionsLog } = useHealth(); // Assuming breathingSessionsLog is an array of session dates or objects
  
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [progress, setProgress] = useState(0) // Progress within a single phase (0-100)
  const [cycleCount, setCycleCount] = useState(0); // How many 4-7-8 cycles completed in this session
  const [currentPhaseTime, setCurrentPhaseTime] = useState(0); // Time elapsed in current phase
  
  const [showSuccess, setShowSuccess] = useState(false)
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate total completed sessions for Zen Garden
  const totalCompletedSessions = breathingSessionsLog?.length || 0;
  // Calculate current streak for Aura Animator (simplified: assume daily, needs robust date checking)
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    // Simplified streak calculation - for a real app, this needs to check dates
    if (breathingSessionsLog && breathingSessionsLog.length > 0) {
        let streak = 0;
        const today = new Date().setHours(0,0,0,0);
        const uniqueDays = new Set(breathingSessionsLog.map(s => new Date(s.date).setHours(0,0,0,0)));
        
        for (let i = 0; i < 30; i++) { // Check up to 30 days back for streak
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            if (uniqueDays.has(checkDate.getTime())) {
                streak++;
            } else if (i > 0) { // Break if not today and not consecutive
                break;
            }
        }
        setCurrentStreak(streak);
    }
  }, [breathingSessionsLog]);


  const durations = { inhale: 4, hold: 7, exhale: 8 }; // seconds

  useEffect(() => {
    if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);

    if (isActive) {
      phaseTimerRef.current = setInterval(() => {
        setCurrentPhaseTime((prevTime) => {
          const currentPhaseDuration = durations[phase];
          const newTime = prevTime + 0.05; // Interval is 50ms
          setProgress((newTime / currentPhaseDuration) * 100);

          if (newTime >= currentPhaseDuration) {
            // Switch phases
            if (phase === "inhale") setPhase("hold");
            else if (phase === "hold") setPhase("exhale");
            else { // exhale complete, new cycle
              setPhase("inhale");
              setCycleCount(c => c + 1);
            }
            return 0; // Reset time for new phase
          }
          return newTime;
        });
      }, 50); // Update progress every 50ms for smoother animation
    } else {
        setProgress(0); // Reset progress when not active
        setCurrentPhaseTime(0);
    }

    return () => { if (phaseTimerRef.current) clearInterval(phaseTimerRef.current); };
  }, [isActive, phase, durations]); // Added durations to dependency array


  const toggleActive = () => {
    if (isActive) { // Stopping
      if (cycleCount > 0) { // Only count if at least one full cycle completed
        addBreathingSession({ duration: cycleCount * (4+7+8), date: new Date().toISOString() }); // Store total cycle time
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
      }
    } else { // Starting
      setPhase("inhale");
      setProgress(0);
      setCurrentPhaseTime(0);
      setCycleCount(0);
    }
    setIsActive(!isActive);
  };

  const getInstructionText = () => phase.charAt(0).toUpperCase() + phase.slice(1);
  const getCurrentPhaseTargetTime = () => durations[phase];

  const circleSize = isActive ? (
    phase === "inhale" ? 100 + progress * 0.6 : // Grows more
    phase === "exhale" ? 160 - progress * 0.6 : // Shrinks more
    160 // Hold size
  ) : 120; // Resting size

  const circleColor = isActive ? (
    phase === "inhale" ? "border-sky-400" :
    phase === "hold" ? "border-purple-400" :
    "border-teal-400"
  ) : "border-gray-400";

  return (
    <>
    <RetroWindow title="Breathing Exercise" icon={<Wind className="h-4 w-4 text-sky-500" />} variant="sky" className="transition-all duration-200 relative overflow-hidden">
      {/* Aura Animator - Behind everything */}
      <AuraAnimator isActive={isActive} phase={phase} streakCount={currentStreak} />

      <div className="flex flex-col items-center justify-center py-6 relative z-10"> {/* Ensure content is above Aura */}
        <div className="relative flex items-center justify-center mb-8" style={{ height: "180px", width: "180px" }}>
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="absolute flex flex-col items-center">
                <CheckCircle className="h-20 w-20 text-green-500 mb-2" />
                <p className="text-lg font-bold text-green-600 font-pixel">Session Complete!</p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  key="breathingCircle"
                  className={`absolute rounded-full border-4 transition-all ease-linear duration-[50ms] ${circleColor}`}
                  style={{ width: `${circleSize}px`, height: `${circleSize}px` }}
                  animate={{ width: `${circleSize}px`, height: `${circleSize}px` }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
                <div className={`text-3xl font-bold font-pixel transition-colors duration-500 ${
                    isActive ? (phase === "inhale" ? "text-sky-600" : phase === "hold" ? "text-purple-600" : "text-teal-600") : "text-gray-700"
                }`}>
                  {isActive ? getInstructionText() : "Ready?"}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>

        <p className="text-sm text-gray-700 mb-1 font-bold font-pixel h-5">
            {isActive ? `Target: ${getCurrentPhaseTargetTime()}s` : "4-7-8 Breathing Technique"}
        </p>
        <p className="text-xs text-gray-500 mb-5 font-pixel h-3">
            {isActive ? `Cycle: ${cycleCount + 1}` : ""}
        </p>


        <Button onClick={toggleActive} size="lg" className={`min-w-[180px] text-black hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-0.5 active:translate-x-0.5 ${isActive ? "bg-rose-500 hover:bg-rose-600 text-white" : "bg-sky-400 hover:bg-sky-500 text-black"}`}>
          {isActive ? <><Pause className="text-black h-5 w-5 mr-2" /> Stop Session</> : <><Play className="text-black h-5 w-5 mr-2" /> Start Session</>}
        </Button>

        {!isActive && !showSuccess && (
          <div className="mt-6 text-sm text-gray-700 border-2 border-gray-800 p-4 rounded-md bg-sky-50 shadow-sm max-w-sm text-center">
            <p className="font-bold mb-1.5 text-sky-700">How it works:</p>
            <ul className="list-disc list-inside text-left space-y-1 text-xs">
                <li>Inhale through your nose for 4 seconds.</li>
                <li>Hold your breath gently for 7 seconds.</li>
                <li>Exhale slowly through your mouth for 8 seconds.</li>
            </ul>
            <p className="text-xs mt-2 text-gray-500">Repeat for desired duration.</p>
          </div>
        )}
      </div>
    </RetroWindow>

    <ZenPixelGarden completedSessions={totalCompletedSessions} pixelSize={8}/>
    </>
  );
}