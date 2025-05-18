"use client"
import React from 'react';
import { Droplet } from 'lucide-react'; // Using Droplet to represent ink

interface InkCartridgeProps {
  inkLevel: number; // Percentage 0-100
  maxInk: number;   // Max capacity, for display
  className?: string;
}

const InkCartridge: React.FC<InkCartridgeProps> = ({
  inkLevel,
  maxInk,
  className = "",
}) => {
  const displayLevel = Math.max(0, Math.min(inkLevel, maxInk)); // Clamp between 0 and maxInk
  const percentage = maxInk > 0 ? (displayLevel / maxInk) * 100 : 0;

  const inkColor =
    percentage > 70 ? "bg-sky-500" : // Fullish
    percentage > 40 ? "bg-sky-400" : // Medium
    percentage > 10 ? "bg-rose-400" : // Low
    "bg-rose-500"; // Very Low

  return (
    <div className={`flex flex-col items-center p-2 border-2 border-gray-800 bg-slate-100 rounded-md shadow-sm ${className}`}>
      <div className="w-8 h-16 bg-gray-300 border-2 border-gray-800 rounded-t-md rounded-b-sm overflow-hidden relative flex flex-col justify-end">
        {/* Cartridge Top Plastic */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-700" />
        <div
          className={`w-full ${inkColor} transition-all duration-500 ease-out`}
          style={{ height: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center mt-1.5">
        <Droplet className={`h-4 w-4 mr-1 ${inkColor.replace('bg-', 'text-')}`} />
        <p className="text-xs text-gray-700 font-bold font-pixel">
          {Math.round(displayLevel)} / {maxInk} Ink
        </p>
      </div>
       {inkLevel <= 10 && inkLevel > 0 && (
         <p className="text-xs text-rose-600 font-bold animate-pulse">Ink Low!</p>
       )}
       {inkLevel === 0 && (
         <p className="text-xs text-red-600 font-bold">Out of Ink!</p>
       )}
    </div>
  );
};

export default InkCartridge;