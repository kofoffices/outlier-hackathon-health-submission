"use client"
import React from 'react';

interface PixelPlantProps {
  cups: number;
  goal: number;
  pixelSize?: number;
  className?: string;
}

const PLANT_COLORS = {
  BORDER: '#374151', // Dark Gray
  SOIL: '#78350F',   // Brown
  POT_LIGHT: '#FBBF24', // Amber-400
  POT_DARK: '#D97706',  // Amber-600
  STEM_HEALTHY: '#16A34A', // Green-600
  LEAF_HEALTHY_LIGHT: '#22C55E', // Green-500
  LEAF_HEALTHY_DARK: '#15803D',  // Green-700
  STEM_DRY: '#A16207', // Yellow-700 (Dry stem)
  LEAF_DRY: '#CA8A04',  // Yellow-600 (Dry leaf)
  FLOWER_PETAL: '#EC4899', // Pink-500
  FLOWER_CENTER: '#FDE047', // Yellow-300
  WATER_DROP: '#60A5FA', // Blue-400
};

const PixelPlant: React.FC<PixelPlantProps> = ({ cups, goal, pixelSize = 4, className = "" }) => {
  const canvasSize = 16; // Plant is on a 16x16 grid
  const progressRatio = goal > 0 ? cups / goal : 0;

  const getPlantMatrix = (): string[][] => {
    const W = 'transparent'; // Transparent background
    const B = PLANT_COLORS.BORDER;
    const S = PLANT_COLORS.SOIL;
    const PL = PLANT_COLORS.POT_LIGHT;
    const PD = PLANT_COLORS.POT_DARK;
    
    let ST = PLANT_COLORS.STEM_HEALTHY;
    let LL = PLANT_COLORS.LEAF_HEALTHY_LIGHT;
    let LD = PLANT_COLORS.LEAF_HEALTHY_DARK;
    let FP = PLANT_COLORS.FLOWER_PETAL;
    let FC = PLANT_COLORS.FLOWER_CENTER;

    // Base pot and soil
    let matrix: string[][] = Array(canvasSize).fill(null).map(() => Array(canvasSize).fill(W));

    // Pot
    for (let i = 4; i <= 11; i++) matrix[13][i] = PD; // Pot base
    for (let i = 5; i <= 10; i++) matrix[12][i] = PL;
    for (let i = 6; i <= 9; i++) matrix[11][i] = PL;
    matrix[11][5] = PD; matrix[11][10] = PD; // Pot rim dark
    matrix[12][4] = PD; matrix[12][11] = PD; 
    
    // Soil
    for (let i = 5; i <= 10; i++) matrix[10][i] = S;


    // Determine plant health based on progress
    if (progressRatio < 0.25) { // Very thirsty
      ST = PLANT_COLORS.STEM_DRY;
      LL = PLANT_COLORS.LEAF_DRY;
      LD = PLANT_COLORS.LEAF_DRY;
      FP = W; FC = W; // No flower
    } else if (progressRatio < 0.5) { // Thirsty
      ST = PLANT_COLORS.STEM_HEALTHY; // Stem might still be okay
      LL = PLANT_COLORS.LEAF_DRY;
      LD = PLANT_COLORS.LEAF_DRY;
      FP = W; FC = W; // No flower
    }

    // Draw plant based on progress
    if (progressRatio >= 0.1) { // Stem starts
        matrix[9][7] = ST; matrix[9][8] = ST;
        matrix[8][7] = ST; matrix[8][8] = ST;
    }
    if (progressRatio >= 0.25) { // First leaves
        matrix[8][6] = LL; matrix[8][9] = LL;
        matrix[7][7] = ST; matrix[7][8] = ST;
    }
    if (progressRatio >= 0.5) { // More leaves
        matrix[7][5] = LD; matrix[7][10] = LD;
        matrix[6][6] = LL; matrix[6][9] = LL;
        matrix[6][7] = ST; matrix[6][8] = ST;
    }
    if (progressRatio >= 0.75) { // Budding flower or taller
        matrix[5][7] = ST; matrix[5][8] = ST;
        matrix[4][7] = LL; matrix[4][8] = LL; // Top leaves
    }
    if (progressRatio >= 1) { // Full bloom!
        matrix[5][7] = ST; matrix[5][8] = ST;
        matrix[4][7] = FC; matrix[4][8] = FC; // Flower center
        matrix[3][7] = FP; matrix[3][8] = FP; // Top petals
        matrix[4][6] = FP; matrix[4][9] = FP; // Side petals
        matrix[5][6] = LL; matrix[5][9] = LL; // Leaves under flower
        // Add a water drop as a reward
        if (cups >= goal) {
            matrix[1][1] = PLANT_COLORS.WATER_DROP;
            matrix[2][1] = PLANT_COLORS.WATER_DROP; matrix[2][2] = PLANT_COLORS.WATER_DROP;
            matrix[3][1] = PLANT_COLORS.WATER_DROP;
        }
    }
    
    // Add border around non-transparent pixels for a cleaner look
    const finalMatrix = JSON.parse(JSON.stringify(matrix)); // Deep copy
    for(let r = 0; r < canvasSize; r++) {
        for(let c = 0; c < canvasSize; c++) {
            if (matrix[r][c] !== W) {
                // Check neighbors
                if (r > 0 && matrix[r-1][c] === W) finalMatrix[r-1][c] = B;
                if (r < canvasSize - 1 && matrix[r+1][c] === W) finalMatrix[r+1][c] = B;
                if (c > 0 && matrix[r][c-1] === W) finalMatrix[r][c-1] = B;
                if (c < canvasSize - 1 && matrix[r][c+1] === W) finalMatrix[r][c+1] = B;
                // Corners (optional for thicker outline effect)
                 if (r > 0 && c > 0 && matrix[r-1][c-1] === W && (matrix[r-1][c] !==W || matrix[r][c-1] !==W)) finalMatrix[r-1][c-1] = B;
                 if (r > 0 && c < canvasSize-1 && matrix[r-1][c+1] === W && (matrix[r-1][c] !==W || matrix[r][c+1] !==W)) finalMatrix[r-1][c+1] = B;
                 if (r < canvasSize-1 && c > 0 && matrix[r+1][c-1] === W && (matrix[r+1][c] !==W || matrix[r][c-1] !==W)) finalMatrix[r+1][c-1] = B;
                 if (r < canvasSize-1 && c < canvasSize-1 && matrix[r+1][c+1] === W && (matrix[r+1][c] !==W || matrix[r][c+1] !==W)) finalMatrix[r+1][c+1] = B;
            }
        }
    }
     // Re-draw original on top of borders to ensure colors are right
    for(let r = 0; r < canvasSize; r++) {
        for(let c = 0; c < canvasSize; c++) {
            if (matrix[r][c] !== W) {
                 finalMatrix[r][c] = matrix[r][c];
            }
        }
    }


    return finalMatrix;
  };

  const plantMatrix = getPlantMatrix();
  const svgSize = canvasSize * pixelSize;

  let plantStatus = "Thirsty";
  if (progressRatio >= 1) plantStatus = "Happy & Hydrated!";
  else if (progressRatio >= 0.75) plantStatus = "Almost there!";
  else if (progressRatio >= 0.5) plantStatus = "Doing good!";
  else if (progressRatio >= 0.25) plantStatus = "Needs more water!";


  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div 
        className="p-1 border border-dashed border-blue-300 rounded bg-blue-50" // Added light blue bg for contrast
        title={`Plant status: ${plantStatus}`}
      >
        <svg width={svgSize} height={svgSize} className="image-rendering-pixelated" xmlns="http://www.w3.org/2000/svg">
          {plantMatrix.map((row, y) =>
            row.map((color, x) => (
              <rect
                key={`${x}-${y}`}
                x={x * pixelSize}
                y={y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill={color === PLANT_COLORS.BORDER ? PLANT_COLORS.BORDER : (color === 'transparent' ? 'transparent' : color) }
                // No stroke on individual pixels if border is drawn via matrix
              />
            ))
          )}
        </svg>
      </div>
      <p className="text-xs mt-1 text-blue-700 font-pixel">{plantStatus}</p>
    </div>
  );
};

export default PixelPlant;