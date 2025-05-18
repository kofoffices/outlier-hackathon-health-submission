"use client"
import React from 'react';
import { MapPin, Flag } from 'lucide-react';

interface ProgressPathProps {
  logCount: number; // Total number of weight logs
  milestones?: { logCount: number; name: string; icon?: React.ElementType }[];
  pixelSize?: number; // Size of each "step" or segment on the path
  pathLength?: number; // Total "segments" in the path visual
  className?: string;
}

const DEFAULT_MILESTONES = [
  { logCount: 1, name: "Journey Started!", icon: Flag },
  { logCount: 7, name: "1 Week Consistent!", icon: MapPin },
  { logCount: 15, name: "Halfway Point!", icon: MapPin },
  { logCount: 30, name: "1 Month Strong!", icon: Flag },
];

const PATH_COLORS = {
  TERRAIN_1: 'bg-green-600', // Darker green for path
  TERRAIN_2: 'bg-green-400', // Lighter green for surroundings
  PLAYER: 'bg-red-500',      // Player icon color
  MILESTONE_REACHED: 'bg-yellow-400',
  MILESTONE_FUTURE: 'bg-blue-300',
  PATH_LINE: 'bg-yellow-600', // Color of the path itself
};

const ProgressPath: React.FC<ProgressPathProps> = ({
  logCount,
  milestones = DEFAULT_MILESTONES,
  pixelSize = 10,
  pathLength = 30, // Represents 30 "steps" or days of logging
  className = "",
}) => {
  const playerPosition = Math.min(logCount, pathLength); // Player can't go beyond path length

  // Create a simple path array for display (e.g., 1 row for simplicity)
  const pathSegments = Array(pathLength).fill(null);

  const getSegmentContent = (index: number) => {
    const milestone = milestones.find(m => m.logCount === index + 1); // +1 because index is 0-based

    if (index + 1 === playerPosition) {
      return <div className={`w-full h-full ${PATH_COLORS.PLAYER} rounded-full animate-bounce`} title="You are here!"/>;
    }
    if (milestone) {
      const ReachedIcon = milestone.icon || MapPin;
      const reached = logCount >= milestone.logCount;
      return (
        <div 
            className={`w-full h-full rounded-sm flex items-center justify-center text-xs font-bold
            ${reached ? `${PATH_COLORS.MILESTONE_REACHED} text-yellow-800` : `${PATH_COLORS.MILESTONE_FUTURE} text-blue-800`}
            border-2 ${reached ? 'border-yellow-600' : 'border-blue-500'}`}
            title={`${milestone.name} (${reached ? 'Reached' : `${milestone.logCount - logCount} logs away`})`}
        >
           <ReachedIcon className={`w-[60%] h-[60%] ${reached ? 'animate-ping once' : ''}`} />
        </div>
      );
    }
    return <div className={`w-1/2 h-1/2 ${PATH_COLORS.PATH_LINE} rounded-sm mx-auto`} />; // Path segment
  };


  return (
    <div className={`p-3 border-2 border-gray-800 bg-teal-100 rounded-md shadow-sm ${className}`}>
      <h4 className="text-sm font-bold text-teal-700 mb-3 text-center font-pixel">
        Your Progress Path
      </h4>
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex space-x-px bg-green-300 p-1 rounded border border-green-500 min-w-max">
            {pathSegments.map((_, index) => (
            <div
                key={index}
                className="relative flex items-center justify-center"
                style={{ width: pixelSize * 3, height: pixelSize * 3 }} // Each segment is a cell
            >
                {/* Background terrain (optional) */}
                {/* <div className={`absolute inset-0 ${index % 2 === 0 ? PATH_COLORS.TERRAIN_1 : PATH_COLORS.TERRAIN_2}`} /> */}
                <div className="relative w-full h-full flex items-center justify-center p-px">
                 {getSegmentContent(index)}
                </div>
            </div>
            ))}
        </div>
      </div>
      <p className="text-xs text-teal-600 mt-2 text-center font-pixel">
        Each log moves you further on your wellness journey! {logCount} logs made.
      </p>
    </div>
  );
};

export default ProgressPath;