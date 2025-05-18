"use client"
import React from 'react';
import { Zap } from 'lucide-react';

interface EnergyBarProps {
  lastNightSleepHours: number | null;
  lastNightSleepQuality: number | null; // Scale 1-5 (Very Poor to Excellent)
  className?: string;
}

// Max ideal hours for 100% energy contribution from duration
const MAX_HOURS_FOR_ENERGY = 8; 
// Max quality for 100% energy contribution from quality
const MAX_QUALITY_FOR_ENERGY = 5;


const EnergyBar: React.FC<EnergyBarProps> = ({
  lastNightSleepHours,
  lastNightSleepQuality,
  className = "",
}) => {
  let energyPercent = 0;
  let energyLabel = "Low Energy";

  if (lastNightSleepHours !== null && lastNightSleepQuality !== null) {
    // Normalize hours: 0 to 1 (cap at MAX_HOURS_FOR_ENERGY)
    const hoursFactor = Math.min(lastNightSleepHours / MAX_HOURS_FOR_ENERGY, 1);
    // Normalize quality: 0 to 1 (quality is 1-5, so (quality-1)/ (MAX_QUALITY-1) )
    const qualityFactor = Math.max(0, (lastNightSleepQuality -1 ) / (MAX_QUALITY_FOR_ENERGY - 1));

    // Weighted average: e.g., 60% duration, 40% quality
    const calculatedEnergy = (hoursFactor * 0.6 + qualityFactor * 0.4) * 100;
    energyPercent = Math.max(0, Math.min(100, calculatedEnergy)); // Clamp between 0 and 100

    if (energyPercent >= 85) energyLabel = "Max Energy!";
    else if (energyPercent >= 70) energyLabel = "High Energy";
    else if (energyPercent >= 50) energyLabel = "Good Energy";
    else if (energyPercent >= 30) energyLabel = "Moderate Energy";
    else energyLabel = "Low Energy";

  } else {
    energyLabel = "Energy Unknown (Log Sleep)";
  }
  
  const barColorClass =
    energyPercent >= 85 ? "bg-emerald-500" :
    energyPercent >= 70 ? "bg-green-500" :
    energyPercent >= 50 ? "bg-sky-500" :
    energyPercent >= 30 ? "bg-amber-500" :
    "bg-red-500";

  return (
    <div className={`p-3 border-2 border-gray-800 bg-slate-800 rounded-md shadow-sm text-white ${className}`}>
      <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-1 font-pixel">
        <Zap className={`h-4 w-4 ${ barColorClass.replace('bg-', 'text-') }`} />
        Today's Energy Level
      </h4>
      <div className="w-full h-6 bg-slate-700 rounded-full overflow-hidden border border-slate-600 relative">
        <div
          className={`h-full rounded-full ${barColorClass} transition-all duration-500 ease-out flex items-center justify-center`}
          style={{ width: `${energyPercent}%` }}
        >
           {energyPercent > 15 && <span className="text-xs font-bold text-black drop-shadow-sm px-1">{Math.round(energyPercent)}%</span>}
        </div>
         {energyPercent <= 15 && <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-300">{Math.round(energyPercent)}%</span>}
      </div>
      <p className="text-xs text-center text-slate-400 mt-1 font-pixel">{energyLabel}</p>
    </div>
  );
};

export default EnergyBar;