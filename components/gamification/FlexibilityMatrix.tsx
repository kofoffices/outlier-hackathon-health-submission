"use client"
import React from 'react';
import { RetroWindow } from '@/components/ui/retro-window'; // Adjust path
import { LayoutGrid } from 'lucide-react';

interface FlexibilityMatrixProps {
  completedStretchesToday: number; // Count of unique stretches done today or routines
  totalPossibleStretches: number; // Total unique stretches in the library or a weekly target
  gridSize?: number; // e.g., 5 for a 5x5 matrix
  className?: string;
}

const MATRIX_COLORS = {
  EMPTY: 'bg-slate-200 opacity-60',
  FILLED: 'bg-amber-400 animate-pulse-once', // Pulse once when filled
  BORDER: 'border-slate-400',
};

const FlexibilityMatrix: React.FC<FlexibilityMatrixProps> = ({
  completedStretchesToday,
  totalPossibleStretches, // Not directly used for grid filling, but for context
  gridSize = 5, // Results in gridSize * gridSize cells
  className = "",
}) => {
  const totalCells = gridSize * gridSize;
  // Fill cells proportionally, or one by one. Let's do one by one up to totalCells.
  const cellsToFill = Math.min(completedStretchesToday, totalCells);

  return (
    <RetroWindow
      title="Flexibility Matrix"
      icon={<LayoutGrid className="h-4 w-4 text-orange-500" />}
      variant="orange" // Example, or use amber
      className={`mt-6 ${className}`}
    >
      <div className="p-3">
        <p className="text-xs text-gray-700 mb-3 text-center font-pixel">
          Complete stretches to fill the matrix! {cellsToFill} / {totalCells} cells active.
        </p>
        <div
          className="grid gap-px bg-slate-300 border border-slate-400 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: gridSize * 24, // 24px per cell (20px + 2*1px border + 2*1px gap)
            height: gridSize * 24,
            imageRendering: 'pixelated',
          }}
        >
          {Array.from({ length: totalCells }).map((_, index) => (
            <div
              key={index}
              className={`w-[20px] h-[20px] m-px transition-colors duration-500
                ${index < cellsToFill ? MATRIX_COLORS.FILLED : MATRIX_COLORS.EMPTY}
                ${MATRIX_COLORS.BORDER} border`}
              title={index < cellsToFill ? `Matrix Cell ${index + 1} Activated!` : `Cell ${index + 1}`}
            />
          ))}
        </div>
        {cellsToFill === totalCells && (
             <p className="text-center text-sm font-bold text-orange-600 mt-3 font-pixel animate-bounce">
                Matrix Full! Peak Flexibility Achieved! 🌟
            </p>
        )}
      </div>
    </RetroWindow>
  );
};

export default FlexibilityMatrix;