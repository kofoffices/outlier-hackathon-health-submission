"use client"
import React from 'react';
import { RetroWindow } from '@/components/ui/retro-window'; // Adjust path
import { Leaf, Waves, Mountain } from 'lucide-react'; // Icons for garden elements

interface ZenPixelGardenProps {
  completedSessions: number; // Total number of completed breathing sessions
  pixelSize?: number;
  className?: string;
}

const GARDEN_COLORS = {
  BORDER: '#374151', // Dark Gray
  GRASS_LIGHT: '#4ADE80', // Green-400
  GRASS_DARK: '#22C55E',  // Green-500
  ROCK_LIGHT: '#A8A29E',  // Stone-400
  ROCK_DARK: '#78716C',   // Stone-500
  WATER: '#60A5FA',     // Blue-400
  PLANT_STEM: '#16A34A', // Green-600
  PLANT_LEAF: '#10B981', // Emerald-500
  SAND: '#FDE68A',       // Yellow-200 (for raked sand effect)
};

const ZenPixelGarden: React.FC<ZenPixelGardenProps> = ({
  completedSessions,
  pixelSize = 6, // Larger pixels for a chunkier garden
  className = "",
}) => {
  const canvasWidth = 20; // Garden grid width
  const canvasHeight = 10; // Garden grid height
  const W = 'transparent'; // For areas not yet "grown" or empty

  const getGardenMatrix = (): string[][] => {
    let matrix = Array(canvasHeight).fill(null).map(() => Array(canvasWidth).fill(GARDEN_COLORS.GRASS_LIGHT));

    // Base grass variation
    for(let r=0; r<canvasHeight; r++) {
        for(let c=0; c<canvasWidth; c++) {
            if ((r + c) % 2 === 0) matrix[r][c] = GARDEN_COLORS.GRASS_DARK;
        }
    }

    // Add elements based on completedSessions
    // Element 1: A Rock (1 session)
    if (completedSessions >= 1) {
      matrix[7][3] = GARDEN_COLORS.ROCK_DARK; matrix[7][4] = GARDEN_COLORS.ROCK_LIGHT;
      matrix[8][3] = GARDEN_COLORS.ROCK_LIGHT; matrix[8][4] = GARDEN_COLORS.ROCK_DARK;
    }

    // Element 2: Small Pond (3 sessions)
    if (completedSessions >= 3) {
      matrix[3][15] = GARDEN_COLORS.WATER; matrix[3][16] = GARDEN_COLORS.WATER;
      matrix[4][14] = GARDEN_COLORS.WATER; matrix[4][15] = GARDEN_COLORS.WATER; matrix[4][16] = GARDEN_COLORS.WATER; matrix[4][17] = GARDEN_COLORS.WATER;
      matrix[5][15] = GARDEN_COLORS.WATER; matrix[5][16] = GARDEN_COLORS.WATER;
    }
    
    // Element 3: A Small Plant (5 sessions)
    if (completedSessions >= 5) {
      matrix[6][8] = GARDEN_COLORS.PLANT_STEM; matrix[5][8] = GARDEN_COLORS.PLANT_STEM;
      matrix[4][8] = GARDEN_COLORS.PLANT_LEAF; matrix[5][7] = GARDEN_COLORS.PLANT_LEAF; matrix[5][9] = GARDEN_COLORS.PLANT_LEAF;
    }

    // Element 4: Raked Sand Patch (7 sessions)
    if (completedSessions >= 7) {
        for(let r=1; r<=3; r++) {
            for(let c=2; c<=6; c++) {
                 matrix[r][c] = GARDEN_COLORS.SAND;
                 if (c % 2 === 0 && r < 3) matrix[r][c+1] = GARDEN_COLORS.GRASS_DARK; // Rake lines
            }
        }
    }
     // Element 5: Second, larger rock (10 sessions)
    if (completedSessions >= 10) {
      matrix[1][10] = GARDEN_COLORS.ROCK_DARK; matrix[1][11] = GARDEN_COLORS.ROCK_DARK; matrix[1][12] = GARDEN_COLORS.ROCK_LIGHT;
      matrix[2][10] = GARDEN_COLORS.ROCK_LIGHT; matrix[2][11] = GARDEN_COLORS.ROCK_DARK; matrix[2][12] = GARDEN_COLORS.ROCK_DARK;
      matrix[3][11] = GARDEN_COLORS.ROCK_LIGHT;
    }


    return matrix;
  };

  const gardenMatrix = getGardenMatrix();
  const svgWidth = canvasWidth * pixelSize;
  const svgHeight = canvasHeight * pixelSize;

  return (
    <RetroWindow
      title="Zen Pixel Garden"
      icon={<Leaf className="h-4 w-4 text-green-500" />}
      variant="greenDark" // A darker green or teal for zen feel
      className={`mt-6 ${className}`}
    >
      <div className="p-3 flex flex-col items-center">
        <p className="text-xs text-gray-300 mb-3 text-center font-pixel">
          Your garden grows with each completed session. Sessions: {completedSessions}
        </p>
        <div 
            className="border-2 border-gray-700 shadow-inner overflow-hidden"
            style={{ width: svgWidth + 4, height: svgHeight + 4}} // +4 for border
        >
            <svg width={svgWidth} height={svgHeight} className="image-rendering-pixelated block" xmlns="http://www.w3.org/2000/svg">
            {gardenMatrix.map((row, y) =>
                row.map((color, x) => (
                <rect
                    key={`${x}-${y}`}
                    x={x * pixelSize}
                    y={y * pixelSize}
                    width={pixelSize}
                    height={pixelSize}
                    fill={color}
                    // Optional: add a very subtle stroke between pixels if desired
                    // stroke={GARDEN_COLORS.BORDER}
                    // strokeWidth="0.2"
                />
                ))
            )}
            </svg>
        </div>
        {completedSessions >= 10 && (
             <p className="text-center text-sm font-bold text-green-300 mt-3 font-pixel animate-pulse">
                Your garden is flourishing! 🧘
            </p>
        )}
      </div>
    </RetroWindow>
  );
};

export default ZenPixelGarden;