"use client"
import React from 'react';
import { RetroWindow } from '@/components/ui/retro-window'; // Adjust path
import { Pyramid } from 'lucide-react';

interface FoodGroupPortions {
  grains: number; // Represents portions or %
  vegetables: number;
  fruits: number;
  protein: number;
  dairy: number;
  fats_sweets: number; // Smallest part
}

interface PixelFoodPyramidProps {
  portions: FoodGroupPortions;
  className?: string;
}

const PYRAMID_COLORS = {
  grains: 'bg-yellow-400',
  vegetables: 'bg-green-500',
  fruits: 'bg-red-400',
  protein: 'bg-orange-400',
  dairy: 'bg-blue-400',
  fats_sweets: 'bg-purple-400',
  border: 'border-gray-800',
  empty: 'bg-gray-300 opacity-50',
};

const PixelFoodPyramid: React.FC<PixelFoodPyramidProps> = ({
  portions,
  className = "",
}) => {
  // Define the pyramid structure (number of cells per tier)
  const pyramidStructure = [1, 3, 5, 7]; // Top to bottom tiers
  const totalPyramidCells = pyramidStructure.reduce((sum, count) => sum + count, 0);

  // Normalize portions to fit into the pyramid cells (simplified approach)
  const totalPortions = Object.values(portions).reduce((sum, p) => sum + p, 0);
  
  const getCellsForGroup = (groupPortion: number) => {
    if (totalPortions === 0) return 0;
    return Math.round((groupPortion / totalPortions) * totalPyramidCells);
  };

  let cells = {
    fats_sweets: getCellsForGroup(portions.fats_sweets),
    dairy: getCellsForGroup(portions.dairy),
    protein: getCellsForGroup(portions.protein),
    fruits: getCellsForGroup(portions.fruits),
    vegetables: getCellsForGroup(portions.vegetables),
    grains: getCellsForGroup(portions.grains),
  };

  // Distribute cells into pyramid tiers, prioritizing recommended groups at wider tiers
  // This is a very simplified distribution logic for visualization.
  const pyramidCells: string[] = [];
  const fillOrder: (keyof FoodGroupPortions)[] = ['grains', 'vegetables', 'fruits', 'protein', 'dairy', 'fats_sweets'];
  
  let currentCellCount = 0;
  for (const group of fillOrder) {
    for (let i = 0; i < cells[group] && currentCellCount < totalPyramidCells; i++) {
      pyramidCells.push(PYRAMID_COLORS[group]);
      currentCellCount++;
    }
  }
  // Fill remaining cells if any (e.g., due to rounding)
  while (pyramidCells.length < totalPyramidCells) {
    pyramidCells.push(PYRAMID_COLORS.empty);
  }


  let cellIndex = 0;

  return (
    <RetroWindow
      title="Pixel Food Pyramid"
      icon={<Pyramid className="h-4 w-4 text-yellow-600" />}
      variant="yellow" // Example variant
      className={`mt-6 ${className}`}
    >
      <div className="p-3 flex flex-col items-center">
        <p className="text-xs text-gray-700 mb-3 text-center font-pixel">
          Visualize your weekly food group balance. Aim for a well-structured pyramid!
        </p>
        <div className="space-y-px"> {/* Use gap-px if bg-color on parent doesn't show */}
          {pyramidStructure.map((tierCellCount, tierIndex) => (
            <div key={tierIndex} className="flex justify-center gap-px">
              {Array.from({ length: tierCellCount }).map((_, cellInTierIndex) => {
                const cellColor = pyramidCells[cellIndex] || PYRAMID_COLORS.empty;
                cellIndex++;
                return (
                  <div
                    key={`${tierIndex}-${cellInTierIndex}`}
                    className={`w-5 h-5 ${PYRAMID_COLORS.border} border ${cellColor} transition-colors duration-500`}
                    style={{ imageRendering: "pixelated" }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        {totalPortions > 0 && (
            <p className="text-xs text-yellow-700 mt-3 text-center font-pixel">
                Pyramid reflects logged food group portions.
            </p>
        )}
         {totalPortions === 0 && (
            <p className="text-xs text-gray-500 mt-3 text-center font-pixel">
                Log meals with food groups to build your pyramid!
            </p>
        )}
      </div>
    </RetroWindow>
  );
};

export default PixelFoodPyramid;