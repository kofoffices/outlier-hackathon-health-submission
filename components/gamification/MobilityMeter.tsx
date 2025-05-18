"use client"
import React from 'react';
import { TrendingUp } from 'lucide-react'; // Icon for mobility/progress

interface MobilityMeterProps {
  progressPercent: number; // Overall progress of the current routine (0-100)
  className?: string;
}

const MobilityMeter: React.FC<MobilityMeterProps> = ({
  progressPercent,
  className = "",
}) => {
  const meterColor =
    progressPercent >= 95 ? "bg-green-500" :   // Nearly/Fully complete
    progressPercent >= 70 ? "bg-lime-500" :    // Good progress
    progressPercent >= 40 ? "bg-yellow-500" :  // Halfway
    progressPercent > 0  ? "bg-orange-500" :  // Started
    "bg-slate-300";                         // Not started

  const label = 
    progressPercent >= 99 ? "Full Mobility Unlocked!" :
    progressPercent >= 70 ? "Great Flow!" :
    progressPercent >= 40 ? "Warming Up Nicely!" :
    progressPercent > 0  ? "Getting Mobile..." :
    "Start Routine for Mobility Boost!";

  return (
    <div className={`p-3 border-2 border-gray-800 bg-slate-100 rounded-md shadow-sm ${className}`}>
      <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1 font-pixel">
        <TrendingUp className={`h-4 w-4 ${meterColor.replace('bg-','text-')}`} />
        Mobility Meter
      </h4>
      <div className="w-full h-5 bg-slate-300 rounded-full border-2 border-gray-800 overflow-hidden relative">
        <div
          className={`h-full rounded-full ${meterColor} transition-all duration-300 ease-out flex items-center justify-end pr-2`}
          style={{ width: `${Math.max(5, progressPercent)}%` }} // Min width 5% to show something
        >
          {progressPercent > 10 && (
            <span className="text-xs font-bold text-black drop-shadow-sm">
              {Math.round(progressPercent)}%
            </span>
          )}
        </div>
        {progressPercent <=10 && progressPercent > 0 && (
             <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
              {Math.round(progressPercent)}%
            </span>
        )}
      </div>
      <p className="text-xs text-center text-gray-600 mt-1.5 font-pixel">{label}</p>
    </div>
  );
};

export default MobilityMeter;