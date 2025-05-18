"use client"
import React from 'react';
import { Star as StarIcon } from 'lucide-react'; // Using Lucide Star

interface StabilityStarsProps {
  loggingStreak: number; // Current consecutive days of logging weight
  maxStreak?: number;     // Optional: max streak achieved
  className?: string;
}

const StabilityStars: React.FC<StabilityStarsProps> = ({
  loggingStreak,
  maxStreak,
  className = "",
}) => {
  const starsToDisplay = Math.min(Math.floor(loggingStreak / 2), 5); // 1 star per 2 days, max 5 stars

  return (
    <div className={`p-3 border-2 border-gray-800 bg-slate-100 rounded-md shadow-sm text-center ${className}`}>
      <h4 className="text-sm font-bold text-slate-700 mb-2 font-pixel">
        Logging Consistency
      </h4>
      <div className="flex justify-center items-center space-x-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className={`h-7 w-7 transition-all duration-300
              ${index < starsToDisplay ? 'text-yellow-400 fill-yellow-400 animate-pulse-slow' : 'text-gray-400 fill-gray-300'}`}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-2 font-pixel">
        Current Streak: <span className="font-bold text-teal-600">{loggingStreak} days</span>
      </p>
      {maxStreak !== undefined && (
         <p className="text-xs text-gray-500 mt-0.5 font-pixel">
            Max Streak: {maxStreak} days
        </p>
      )}
    </div>
  );
};

export default StabilityStars;