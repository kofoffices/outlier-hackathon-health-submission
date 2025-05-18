"use client"
import React from 'react';
import { RetroWindow } from '@/components/ui/retro-window';
import { Leaf } from 'lucide-react';

interface ZenPixelGardenProps {
  currentSessionCycleCount: number; // Number of 4-7-8 cycles completed in *this* session
  isActive: boolean; // Is a breathing session currently active?
  pixelSize?: number;
  className?: string;
}

const GARDEN_COLORS = {
  BORDER: '#374151',
  GRASS_LIGHT: '#4ADE80',
  GRASS_DARK: '#22C55E',
  ROCK_LIGHT: '#A8A29E',
  ROCK_DARK: '#78716C',
  WATER: '#60A5FA',
  PLANT_STEM: '#16A34A',
  PLANT_LEAF: '#10B981',
  SAND: '#FDE68A',
  FLOWER_PETAL: '#EC4899', // Added for a more advanced plant
  FLOWER_CENTER: '#FCD34D', // Added
};

const ZenPixelGarden: React.FC<ZenPixelGardenProps> = ({
  currentSessionCycleCount,
  isActive,
  pixelSize = 7, // Slightly larger pixels for a more prominent garden during session
  className = "",
}) => {
  const canvasWidth = 18; // Adjusted size slightly
  const canvasHeight = 9;
  const W = 'transparent';

  const getGardenMatrix = (): string[][] => {
    let matrix = Array(canvasHeight).fill(null).map(() => Array(canvasWidth).fill(GARDEN_COLORS.GRASS_LIGHT));

    // Base grass variation
    for (let r = 0; r < canvasHeight; r++) {
      for (let c = 0; c < canvasWidth; c++) {
        if ((r + c) % 3 === 0) matrix[r][c] = GARDEN_COLORS.GRASS_DARK;
        else if ((r*2 + c) % 5 === 0) matrix[r][c] = GARDEN_COLORS.GRASS_DARK; // More varied grass
      }
    }

    // Elements appear based on currentSessionCycleCount
    // Reset if not active or cycle count is 0
    const displayCycles = isActive ? currentSessionCycleCount : 0;

    // Cycle 1: A small rock appears
    if (displayCycles >= 1) {
      matrix[6][2] = GARDEN_COLORS.ROCK_DARK; matrix[6][3] = GARDEN_COLORS.ROCK_LIGHT;
      matrix[7][2] = GARDEN_COLORS.ROCK_LIGHT; matrix[7][3] = GARDEN_COLORS.ROCK_DARK;
    }

    // Cycle 2: A tiny sprout
    if (displayCycles >= 2) {
      matrix[5][7] = GARDEN_COLORS.PLANT_STEM;
      matrix[4][7] = GARDEN_COLORS.PLANT_LEAF;
    }

    // Cycle 3: The sprout grows a bit, and a small water ripple
    if (displayCycles >= 3) {
      matrix[4][7] = GARDEN_COLORS.PLANT_STEM; // Stem grows
      matrix[3][7] = GARDEN_COLORS.PLANT_LEAF; // Leaf moves up
      matrix[4][6] = GARDEN_COLORS.PLANT_LEAF; // Side leaf
      
      matrix[2][14] = GARDEN_COLORS.WATER; // Small water feature start
      matrix[3][13] = GARDEN_COLORS.WATER; matrix[3][15] = GARDEN_COLORS.WATER;
    }

    // Cycle 4: Plant gets another leaf, water expands
    if (displayCycles >= 4) {
      matrix[4][8] = GARDEN_COLORS.PLANT_LEAF; // Another side leaf

      matrix[2][13] = GARDEN_COLORS.WATER; matrix[2][15] = GARDEN_COLORS.WATER;
      matrix[4][14] = GARDEN_COLORS.WATER; matrix[4][16] = GARDEN_COLORS.WATER;
    }
    
    // Cycle 5: Plant flowers! Water feature is calm.
    if (displayCycles >= 5) {
      matrix[2][7] = GARDEN_COLORS.FLOWER_CENTER; // Flower center
      matrix[1][7] = GARDEN_COLORS.FLOWER_PETAL; // Top petal
      matrix[2][6] = GARDEN_COLORS.FLOWER_PETAL; // Side petals
      matrix[2][8] = GARDEN_COLORS.FLOWER_PETAL;
    }
    
    // Cycle 6+: Maybe some raked sand or another element
    if (displayCycles >= 6) {
        for(let r=canvasHeight-3; r<canvasHeight-1; r++) {
            for(let c=canvasWidth-6; c<canvasWidth-2; c++) {
                 matrix[r][c] = GARDEN_COLORS.SAND;
                 if (c % 2 === 0 && r < canvasHeight-1) matrix[r][c+1] = GARDEN_COLORS.GRASS_DARK; // Rake lines
            }
        }
    }


    return matrix;
  };

  const gardenMatrix = getGardenMatrix();
  const svgWidth = canvasWidth * pixelSize;
  const svgHeight = canvasHeight * pixelSize;

  return (
    <RetroWindow
      title="Session Zen Garden"
      icon={<Leaf className="h-4 w-4 text-green-400" />}
      variant="greenDark"
      className={`mt-6 transition-opacity duration-500 ${isActive || currentSessionCycleCount > 0 ? 'opacity-100' : 'opacity-50'} ${className}`}
    >
      <div className="p-3 flex flex-col items-center">
        <p className="text-xs text-gray-300 mb-3 text-center font-pixel h-4">
          {isActive ? `Cycles: ${currentSessionCycleCount}` : "Garden rests..."}
        </p>
        <div
          className="border-2 border-gray-700 shadow-inner overflow-hidden bg-green-700" // Added bg color to window
          style={{ width: svgWidth + 4, height: svgHeight + 4 }}
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
                  className="transition-colors duration-1000 ease-in-out" // Smooth color transition if pixels change color
                />
              ))
            )}
          </svg>
        </div>
         {isActive && currentSessionCycleCount >= 5 && (
             <p className="text-center text-sm font-bold text-green-300 mt-3 font-pixel animate-pulse">
                Serenity achieved... 🧘
            </p>
        )}
      </div>
    </RetroWindow>
  );
};

export default ZenPixelGarden;