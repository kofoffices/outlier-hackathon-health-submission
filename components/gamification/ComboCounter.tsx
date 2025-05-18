"use client"
import React from 'react';
import { Zap, Flame } from 'lucide-react'; // Flame for streak/combo

interface ComboCounterProps {
  currentDailyCombo: number; // Number of exercises completed *today in a row*
  maxDailyCombo: number;     // Max combo achieved today
  // weeklyStreak: number;   // Days this week with at least one exercise (optional for future)
  className?: string;
}

const ComboCounter: React.FC<ComboCounterProps> = ({
  currentDailyCombo,
  maxDailyCombo,
  className = "",
}) => {
  const comboColor =
    currentDailyCombo >= 5 ? "text-red-500" :
    currentDailyCombo >= 3 ? "text-orange-500" :
    currentDailyCombo > 0 ? "text-yellow-500" :
    "text-gray-500";
  
  const fireSize = 
    currentDailyCombo >= 5 ? "h-8 w-8" :
    currentDailyCombo >= 3 ? "h-7 w-7" :
    currentDailyCombo > 0 ? "h-6 w-6" :
    "h-5 w-5 opacity-50";

  return (
    <div className={`p-3 border-2 border-gray-800 bg-slate-100 rounded-md shadow-sm ${className} text-center`}>
      <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center justify-center gap-1 font-pixel">
        <Zap className="h-4 w-4 text-yellow-500" />
        Workout Combo
      </h4>
      <div className="flex items-center justify-center gap-2">
        <Flame className={`${fireSize} ${comboColor} transition-all duration-300 ${currentDailyCombo > 0 ? 'animate-pulse' : ''}`} />
        <span className={`text-4xl font-bold font-pixel ${comboColor} transition-all duration-300`}>
          {currentDailyCombo > 0 ? `${currentDailyCombo}x` : "0x"}
        </span>
      </div>
      {maxDailyCombo > 0 && (
         <p className="text-xs text-gray-600 mt-1 font-pixel">
            Today's Max: {maxDailyCombo}x
        </p>
      )}
      {currentDailyCombo === 0 && maxDailyCombo === 0 && (
         <p className="text-xs text-gray-500 mt-1 font-pixel">
            Complete exercises to start a combo!
        </p>
      )}
    </div>
  );
};

export default ComboCounter;