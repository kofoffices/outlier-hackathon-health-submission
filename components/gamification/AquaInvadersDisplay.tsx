"use client"
import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react'; // Example icons

interface AquaInvadersDisplayProps {
  cupsLogged: number;
  goal: number;
  pixelSize?: number;
  className?: string;
}

const ALIEN_COLORS = {
  BODY: '#EF4444', // Red-500
  EYE: '#000000',
  BORDER: '#7F1D1D', // Red-800
  DEFEATED_BODY: '#D1D5DB', // Gray-300 (ghostly)
  DEFEATED_EYE: '#9CA3AF', // Gray-400
};

const AlienPixelArt = ({ defeated = false, size = 24 }: { defeated?: boolean; size?: number }) => {
  const W = 'transparent';
  const B = defeated ? ALIEN_COLORS.DEFEATED_BODY : ALIEN_COLORS.BODY;
  const E = defeated ? ALIEN_COLORS.DEFEATED_EYE : ALIEN_COLORS.EYE;
  const BR = ALIEN_COLORS.BORDER;

  const matrix = [
    [W, BR,BR, W],
    [BR, B, B, BR],
    [BR, E, E, BR],
    [BR, B, B, BR],
    [W, BR,BR, W],
  ];
  
  const pixelSize = size / 5; // 5 rows

  return (
    <svg width={size} height={size} className="image-rendering-pixelated" viewBox={`0 0 ${size} ${size}`}>
       {matrix.map((row, y) =>
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
  );
};


const AquaInvadersDisplay: React.FC<AquaInvadersDisplayProps> = ({
  cupsLogged,
  goal,
  className = ""
}) => {
  const aliensToDisplay = goal; // Show one alien per cup in the goal

  return (
    <div className={`mt-6 p-3 border-2 border-gray-800 bg-blue-100 rounded-md shadow-sm ${className}`}>
      <h4 className="text-sm font-bold text-blue-700 mb-2 flex items-center gap-1 font-pixel">
        <ShieldAlert className="h-4 w-4 text-red-500" />
         Dehydration Invaders
        <ShieldCheck className="h-4 w-4 text-green-500" />
      </h4>
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: aliensToDisplay }).map((_, index) => (
          <div key={index} className={`p-0.5 rounded transition-all duration-300 ${index < cupsLogged ? 'opacity-50' : 'opacity-100'}`}
               title={index < cupsLogged ? "Invader Defeated!" : "Invader Active!"}
          >
            <AlienPixelArt defeated={index < cupsLogged} size={20} />
          </div>
        ))}
      </div>
      {cupsLogged >= goal && (
        <p className="text-xs font-bold text-green-600 mt-2 text-center font-pixel animate-pulse">
          All Invaders Defeated for Today! Area Secure!
        </p>
      )}
    </div>
  );
};

export default AquaInvadersDisplay;