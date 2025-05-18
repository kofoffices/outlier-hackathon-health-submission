"use client"
import React from 'react';

interface PixelPalProps {
  averageMood: number | null;
  pixelSize?: number;
  className?: string;
}

// Define colors for the pal's parts
const PAL_COLORS = {
  BORDER: '#4A4A4A', // A dark gray for outlines, retro feel
  EYE: '#000000',
  MOUTH_HAPPY_LIGHT: '#2E7D32', // Darker green
  MOUTH_HAPPY_DARK: '#1B5E20', // Even darker green
  MOUTH_NEUTRAL: '#333333',
  MOUTH_SAD_LIGHT: '#D32F2F', // Darker red
  MOUTH_SAD_DARK: '#B71C1C', // Even darker red
  TEAR: '#42A5F5', // A light blue for tears
  SKIN_TONE_DEFAULT: 'transparent', // Make it transparent to fit on pink bg
};

const PixelPal: React.FC<PixelPalProps> = ({ averageMood, pixelSize = 5, className = "" }) => {
  const palCanvasSize = 8; // Pal is an 8x8 grid of "logic" pixels

  const getFaceMatrix = (avgMood: number | null): string[][] => {
    const W = PAL_COLORS.SKIN_TONE_DEFAULT; // Transparent Background/Skin
    const E = PAL_COLORS.EYE;          // Eye
    const T = PAL_COLORS.TEAR;         // Tear

    // Default face: neutral/sleeping
    let matrix: string[][] = [
      [W, W, W, W, W, W, W, W],
      [W, E, E, W, W, E, E, W], // Eyes
      [W, E, E, W, W, E, E, W],
      [W, W, W, W, W, W, W, W],
      [W, PAL_COLORS.MOUTH_NEUTRAL, PAL_COLORS.MOUTH_NEUTRAL, PAL_COLORS.MOUTH_NEUTRAL, PAL_COLORS.MOUTH_NEUTRAL, PAL_COLORS.MOUTH_NEUTRAL, PAL_COLORS.MOUTH_NEUTRAL, W], // Straight mouth
      [W, W, W, W, W, W, W, W],
      [W, W, W, W, W, W, W, W],
      [W, W, W, W, W, W, W, W],
    ];

    if (avgMood === null) return matrix; // Return sleeping/neutral if no mood

    const moodLevel = Math.round(avgMood); // Moods are 0 (Awful) to 4 (Great)

    // Base eyes
    matrix[1][1] = E; matrix[1][2] = E; matrix[1][5] = E; matrix[1][6] = E;
    matrix[2][1] = E; matrix[2][2] = E; matrix[2][5] = E; matrix[2][6] = E;
    
    // Clear mouth area for redrawing
    for(let i=1; i < palCanvasSize-1; i++) matrix[4][i] = W;


    switch (moodLevel) {
      case 0: // Awful
        matrix[4][2] = PAL_COLORS.MOUTH_SAD_DARK; matrix[4][3] = PAL_COLORS.MOUTH_SAD_DARK; matrix[4][4] = PAL_COLORS.MOUTH_SAD_DARK; matrix[4][5] = PAL_COLORS.MOUTH_SAD_DARK; // Frown part 1
        matrix[3][1] = PAL_COLORS.MOUTH_SAD_DARK; matrix[3][6] = PAL_COLORS.MOUTH_SAD_DARK; // Frown part 2
        matrix[3][2] = T; matrix[3][5] = T; // Tears
        break;
      case 1: // Bad
        matrix[4][2] = PAL_COLORS.MOUTH_SAD_LIGHT; matrix[4][3] = PAL_COLORS.MOUTH_SAD_LIGHT; matrix[4][4] = PAL_COLORS.MOUTH_SAD_LIGHT; matrix[4][5] = PAL_COLORS.MOUTH_SAD_LIGHT; // Slightly sad mouth
        break;
      case 2: // Okay
        matrix[4][1] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][2] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][3] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][4] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][5] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][6] = PAL_COLORS.MOUTH_NEUTRAL; // Straight mouth
        break;
      case 3: // Good
        matrix[4][1] = W; matrix[4][6] = W;
        matrix[4][2] = PAL_COLORS.MOUTH_HAPPY_LIGHT; matrix[4][3] = PAL_COLORS.MOUTH_HAPPY_LIGHT; matrix[4][4] = PAL_COLORS.MOUTH_HAPPY_LIGHT; matrix[4][5] = PAL_COLORS.MOUTH_HAPPY_LIGHT; // Slight curve up
        matrix[3][1] = PAL_COLORS.MOUTH_HAPPY_LIGHT; matrix[3][6] = PAL_COLORS.MOUTH_HAPPY_LIGHT;
        break;
      case 4: // Great
        matrix[4][1] = W; matrix[4][6] = W;
        matrix[4][2] = PAL_COLORS.MOUTH_HAPPY_DARK; matrix[4][3] = PAL_COLORS.MOUTH_HAPPY_DARK; matrix[4][4] = PAL_COLORS.MOUTH_HAPPY_DARK; matrix[4][5] = PAL_COLORS.MOUTH_HAPPY_DARK; // Big smile
        matrix[3][1] = PAL_COLORS.MOUTH_HAPPY_DARK; matrix[3][6] = PAL_COLORS.MOUTH_HAPPY_DARK;
        // Optional: sparkling eyes for "Great"
        matrix[0][2] = PAL_COLORS.EYE; matrix[0][5] = PAL_COLORS.EYE; // Sparkles above eyes
        break;
      default: // Okay
        matrix[4][1] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][2] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][3] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][4] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][5] = PAL_COLORS.MOUTH_NEUTRAL; matrix[4][6] = PAL_COLORS.MOUTH_NEUTRAL;
        break;
    }
    return matrix;
  };

  const faceMatrix = getFaceMatrix(averageMood);
  const svgSize = palCanvasSize * pixelSize;

  return (
    <div className={`inline-block p-1 border border-dashed border-pink-300 rounded ${className}`} title={`Pixel Pal feels: ${averageMood !== null ? moods[Math.round(averageMood)].label : 'Resting'}`}>
      <svg width={svgSize} height={svgSize} className="image-rendering-pixelated" xmlns="http://www.w3.org/2000/svg">
        {faceMatrix.map((row, y) =>
          row.map((color, x) => (
            <rect
              key={`${x}-${y}`}
              x={x * pixelSize}
              y={y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={color}
              stroke={PAL_COLORS.BORDER} // Add a subtle border to each pixel
              strokeWidth="0.5"
            />
          ))
        )}
      </svg>
    </div>
  );
};

// Expose moods array to PixelPal (or pass it as prop if preferred for isolation)
// This is needed for the title attribute. For now, this is a simplification.
// Ideally, PixelPal wouldn't directly depend on the global moods array.
const moods = [ 
  { label: "Great" }, { label: "Good" }, { label: "Okay" }, { label: "Bad" }, { label: "Awful" }
].reverse(); // Align with 0=Awful, 4=Great

export default PixelPal;