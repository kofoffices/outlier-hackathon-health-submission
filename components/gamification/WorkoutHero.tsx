"use client"
import React from 'react';
import { Award } from 'lucide-react';

interface WorkoutHeroProps {
  level: number; // Calculated based on completed exercises/checklists
  pixelSize?: number;
  className?: string;
}

const HERO_COLORS = {
  SKIN: '#FDE68A', // Light Yellow
  HAIR: '#A16207', // Dark Yellow/Brown
  SHIRT_LV1: '#9CA3AF', // Gray
  SHORTS_LV1: '#6B7280',// Darker Gray
  SHIRT_LV2: '#60A5FA', // Blue
  SHORTS_LV2: '#3B82F6',// Darker Blue
  SHIRT_LV3: '#34D399', // Emerald
  SHORTS_LV3: '#059669',// Darker Emerald
  SWEATBAND: '#EF4444', // Red
  BORDER: '#1F2937', // Very Dark Gray
};

const WorkoutHero: React.FC<WorkoutHeroProps> = ({ level, pixelSize = 5, className = "" }) => {
  const canvasSize = 16; // Hero is on a 16x16 grid
  const W = 'transparent';
  const B = HERO_COLORS.BORDER;

  const getHeroMatrix = (): string[][] => {
    let matrix = Array(canvasSize).fill(null).map(() => Array(canvasSize).fill(W));
    const S = HERO_COLORS.SKIN;
    const H = HERO_COLORS.HAIR;
    let SR = HERO_COLORS.SHIRT_LV1;
    let ST = HERO_COLORS.SHORTS_LV1;
    let SW = W; // Sweatband color

    if (level >= 2) { SR = HERO_COLORS.SHIRT_LV2; ST = HERO_COLORS.SHORTS_LV2; SW = HERO_COLORS.SWEATBAND;}
    if (level >= 3) { SR = HERO_COLORS.SHIRT_LV3; ST = HERO_COLORS.SHORTS_LV3;}
    
    // Head
    for(let i=5; i<=10; i++) matrix[2][i] = H; // Hair top
    for(let i=4; i<=11; i++) matrix[3][i] = H;
    for(let i=4; i<=11; i++) matrix[4][i] = S; // Face
    for(let i=5; i<=10; i++) matrix[5][i] = S;
    matrix[4][6] = B; matrix[4][9] = B; // Eyes
    if(SW !== W) { for(let i=4; i<=11; i++) matrix[3][i] = SW; } // Sweatband over hair part

    // Body
    for(let i=5; i<=10; i++) matrix[6][i] = SR; // Shirt
    for(let i=4; i<=11; i++) matrix[7][i] = SR;
    for(let i=4; i<=11; i++) matrix[8][i] = SR;
    
    // Arms (simple)
    matrix[7][3] = S; matrix[8][3] = S; matrix[9][3] = S; // Left arm
    matrix[7][12] = S; matrix[8][12] = S; matrix[9][12] = S; // Right arm

    // Legs
    for(let i=4; i<=11; i++) matrix[9][i] = ST; // Shorts
    for(let i=4; i<=11; i++) matrix[10][i] = ST;
    matrix[11][5] = S; matrix[11][6] = S; matrix[12][5] = S; matrix[12][6] = S; // Left leg
    matrix[11][9] = S; matrix[11][10] = S; matrix[12][9] = S; matrix[12][10] = S; // Right leg
    matrix[13][5] = B; matrix[13][6] = B; matrix[13][9] = B; matrix[13][10] = B; // Shoes

    // Simple animation effect based on level (e.g., jumping jack pose for higher levels)
    if (level >= 2 && (Date.now() % 2000 < 1000)) { // Alternate pose every second for level 2+
        // Arms up
        matrix[7][3] = W; matrix[8][3] = W; matrix[9][3] = W; 
        matrix[5][3] = S; matrix[6][3] = S; matrix[6][2] = S;
        
        matrix[7][12] = W; matrix[8][12] = W; matrix[9][12] = W;
        matrix[5][12] = S; matrix[6][12] = S; matrix[6][13] = S;
    }
     if (level >= 3 && (Date.now() % 1500 < 750)) { // Faster animation for level 3+
        // Legs wider (simple representation)
        matrix[11][4] = S; matrix[11][5] = W; matrix[12][4] = S; matrix[12][5] = W;
        matrix[11][11] = S; matrix[11][10] = W; matrix[12][11] = S; matrix[12][10] = W;
        matrix[13][4] = B; matrix[13][11] = B; 
    }


    return matrix;
  };

  const heroMatrix = getHeroMatrix();
  const svgSize = canvasSize * pixelSize;

  // Force re-render for animation
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    if (level < 2) return; // No animation for level 1
    const interval = setInterval(() => {
      setTick(tick => tick + 1);
    }, 500); // Adjust animation speed
    return () => clearInterval(interval);
  }, [level]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="p-2 border-2 border-purple-700 bg-purple-200 rounded-md shadow-md" title={`Hero Level: ${level}`}>
        <svg width={svgSize} height={svgSize} className="image-rendering-pixelated" xmlns="http://www.w3.org/2000/svg">
          {heroMatrix.map((row, y) =>
            row.map((color, x) => (
              <rect
                key={`${x}-${y}`}
                x={x * pixelSize}
                y={y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill={color}
              />
            ))
          )}
        </svg>
      </div>
      <p className="text-sm mt-2 text-purple-700 font-bold font-pixel flex items-center">
        <Award className="h-4 w-4 mr-1 text-yellow-500"/>
        Hero Level: {level}
      </p>
    </div>
  );
};

export default WorkoutHero;