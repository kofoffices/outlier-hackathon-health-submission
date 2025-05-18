"use client"

import { useState, useEffect } // Added useEffect
from "react"
import { Button } from "@/components/ui/button"
import { Droplet, Plus, Minus, Zap } // Added Zap for Aqua Invaders title
from "lucide-react"
import { useHealth } from "@/components/health-provider" // Assuming this is your context
import confetti from "canvas-confetti"
import { RetroWindow } from "@/components/ui/retro-window"

// --- GAMIFICATION COMPONENTS ---
import PixelPlant from "@/components/gamification/PixelPlant"; // Adjust path
import AquaInvadersDisplay from "@/components/gamification/AquaInvadersDisplay"; // Adjust path

export function HydrationTracker() {
  const { hydration, setHydration, incrementStreak, dailyGoals } = useHealth(); // Assuming dailyGoals has hydration goal
  
  // Ensure goal is loaded from context or set a default
  const goal = dailyGoals?.hydration || 8; // Default to 8 if not found in context

  // State for current cups, initialize from context if available, or 0
  const [cups, setCups] = useState(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return hydration?.log?.[todayStr]?.cups || 0;
  });

  const [showConfetti, setShowConfetti] = useState(false); // Already present
  const progress = goal > 0 ? (cups / goal) * 100 : 0;


  // Effect to update context when local 'cups' state changes
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    setHydration(prevHydration => ({
      ...prevHydration,
      log: {
        ...(prevHydration.log || {}),
        [todayStr]: {
          ...(prevHydration.log?.[todayStr] || {}),
          cups: cups,
          goal: goal, // Store goal for the day too
        }
      }
    }));

    // Reset confetti if cups are reduced below goal
    if (cups < goal && showConfetti) {
        setShowConfetti(false);
    }

  }, [cups, goal, setHydration, showConfetti]);


  const addCup = () => {
    if (cups < goal) {
      const newCups = cups + 1;
      setCups(newCups);

      if (newCups === goal && !showConfetti) {
        setShowConfetti(true);
        incrementStreak("hydration"); // Assuming incrementStreak can take a type

        const canvas = document.createElement("canvas");
        // ... (confetti setup code - no change from your original)
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "1000";
        document.body.appendChild(canvas);

        const myConfetti = confetti.create(canvas, {
          resize: true,
          useWorker: true,
        });

        myConfetti({
          particleCount: 150, // Slightly more confetti
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"], // More blue shades
        });

        setTimeout(() => {
          if (document.body.contains(canvas)) { // Check if canvas still exists
            document.body.removeChild(canvas);
          }
        }, 3000);
      }
    }
  };

  const removeCup = () => {
    if (cups > 0) {
      setCups(cups - 1);
      // showConfetti state is handled in useEffect now
    }
  };

  return (
    <RetroWindow
      title="Hydration Tracker"
      icon={<Droplet className="h-4 w-4 text-blue-500" />}
      variant="blue"
      className={`transition-all duration-200 ${showConfetti ? "ring-4 ring-blue-400 ring-offset-2 ring-offset-white shadow-xl" : ""}`}
    >
      <div className="p-4"> {/* Added padding to the main content area */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 mb-6">
          {/* Left Side: Progress Circle and Cups Display */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 md:w-36 md:h-36">
              {/* SVG Progress Circle - No change */}
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" className="stroke-2 stroke-gray-800"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray={`${progress}, 100`} className="transition-all duration-500 stroke-2 stroke-blue-500"/>
                <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#3B82F6" fontWeight="bold" className="fill-blue-600 font-pixel">
                  {cups} / {goal}
                </text>
              </svg>
            </div>
            <div className="flex justify-center gap-1.5"> {/* Reduced gap for cups */}
              {Array.from({ length: goal }).map((_, i) => (
                <div
                  key={i}
                  className={`w-5 h-7 md:w-6 md:h-8 rounded-b-md border-2 border-gray-800 transition-all duration-300 transform hover:opacity-80 ${
                    i < cups ? "bg-blue-400" : "bg-gray-200"
                  } ${i === cups - 1 && cups > 0 ? "animate-pulse-fast scale-110 ring-2 ring-blue-500" : ""}`} // Added pulse to current cup
                />
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-2">
                {/* Buttons - No change in functionality, minor style tweaks for consistency */}
                <Button variant="outline" size="icon" onClick={removeCup} disabled={cups === 0} className="border-2 border-gray-800 text-blue-600 bg-blue-100 hover:bg-blue-200 active:bg-blue-300 h-10 w-10 hover:scale-[1.03] transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"> <Minus className="h-5 w-5" /> </Button>
                <Button variant="outline" size="icon" onClick={addCup} disabled={cups === goal} className="border-2 border-gray-800 text-blue-600 bg-blue-100 hover:bg-blue-200 active:bg-blue-300 h-10 w-10 hover:scale-[1.03] transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"> <Plus className="h-5 w-5" /> </Button>
            </div>
            <p className="text-center text-sm text-gray-700 mt-2 font-bold font-pixel">
              {cups < goal ? `${goal - cups} more to go!` : "Daily Goal Achieved! 🎉"}
            </p>
          </div>

          {/* Right Side: Pixel Plant */}
          <div className="mt-6 md:mt-0">
            <PixelPlant cups={cups} goal={goal} pixelSize={6} /> {/* Increased pixel size for plant */}
          </div>
        </div>
        
        {/* Aqua Invaders Display - Placed below the main interaction area */}
        <AquaInvadersDisplay cupsLogged={cups} goal={goal} />

      </div>
    </RetroWindow>
  );
}