"use client"
import React from 'react';
import { RetroWindow } from '@/components/ui/retro-window';
import { Gift } from 'lucide-react';

interface MoodMosaicProps {
  loggedMoodCount: number;
  targetImagePattern: (string | number)[][]; // This is now a *guide* for colors
  patternColors: { [key: string | number]: string };
  pixelSize?: number;
  className?: string;
  currentDate: Date; // Pass the current date to determine month length
}

const MoodMosaic: React.FC<MoodMosaicProps> = ({
  loggedMoodCount,
  targetImagePattern,
  patternColors,
  pixelSize = 10, // Smaller default pixel size for more cells
  className = "",
  currentDate,
}) => {
  if (!targetImagePattern || targetImagePattern.length === 0) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

  // Determine grid dimensions (aim for roughly square)
  // This is a simple approach; more sophisticated layout algorithms exist
  let gridCols = Math.ceil(Math.sqrt(daysInCurrentMonth));
  if (daysInCurrentMonth <= 5) gridCols = daysInCurrentMonth; // For very few days, make it a row
  else if (daysInCurrentMonth <= 7) gridCols = 4; // common for weekly views
  else if (daysInCurrentMonth <= 14) gridCols = 5;
  else if (daysInCurrentMonth <= 21) gridCols = 6;
  else gridCols = 7; // Max 7 columns like a calendar week
  
  let gridRows = Math.ceil(daysInCurrentMonth / gridCols);


  const pixelsToReveal = Math.min(loggedMoodCount, daysInCurrentMonth);
  const isComplete = pixelsToReveal >= daysInCurrentMonth;

  // Flatten the *guide* pattern to easily pick colors
  const flatGuidePattern = targetImagePattern.flat();
  const guidePatternLength = flatGuidePattern.length;

  const getCellColorKey = (index: number): string | number => {
    // Cycle through the guide pattern if it's smaller than daysInCurrentMonth
    return flatGuidePattern[index % guidePatternLength];
  };

  return (
    <RetroWindow
      title={`Mood Mosaic - ${currentDate.toLocaleString("default", { month: "long" })}`}
      icon={<Gift className="h-4 w-4 text-purple-500" />}
      variant="purple"
      className={`mt-6 ${className}`} // Added more margin-top
    >
      <div className="p-3">
        <p className="text-xs text-gray-600 mb-2 font-pixel">
          Log a mood each day to reveal a piece of the mosaic! {pixelsToReveal}/{daysInCurrentMonth} pieces revealed.
        </p>
        <div
          className="grid gap-px border border-gray-800 bg-gray-800 mx-auto" // Added mx-auto to center
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            width: gridCols * (pixelSize + 1), // +1 for gap/border
            // height will be determined by gridRows * pixelSize, aspect-square handles cell
            imageRendering: "pixelated",
          }}
        >
          {Array.from({ length: daysInCurrentMonth }).map((_, index) => {
            const isRevealed = index < pixelsToReveal;
            const colorKey = getCellColorKey(index); // Get color from the guide pattern
            const bgColorClass = isRevealed ? patternColors[colorKey] || 'bg-gray-400' : 'bg-gray-300';
            const opacityClass = isRevealed ? 'opacity-100' : 'opacity-50';

            return (
              <div
                key={index}
                className={`aspect-square ${bgColorClass} ${opacityClass} transition-opacity duration-500`}
                style={{ width: pixelSize, height: pixelSize }}
                title={isRevealed ? `Piece ${index + 1}` : "Hidden"}
              />
            );
          })}
        </div>
        {isComplete && (
          <p className="text-sm font-bold text-purple-600 mt-3 text-center font-pixel animate-bounce">
            Mosaic Complete for {currentDate.toLocaleString("default", { month: "long" })}! ✨ Well done!
          </p>
        )}
      </div>
    </RetroWindow>
  );
};

export default MoodMosaic;