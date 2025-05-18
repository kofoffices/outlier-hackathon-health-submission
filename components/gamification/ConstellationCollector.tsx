"use client"
import React, { useState, useEffect } from 'react';
import { RetroWindow } from '@/components/ui/retro-window'; // Adjust path
import { Sparkles, Telescope } from 'lucide-react'; // Telescope for title

interface StarData {
  id: string;
  x: number; // Percentage
  y: number; // Percentage
  size: number; // Pixel size
}

interface Constellation {
  name: string;
  stars: StarData[];
  description: string; // Unlocked when constellation is complete
  targetGoodSleepNights: number; // How many good sleep nights to complete it
}

// Define some sample constellations
const CONSTELLATIONS_DATA: Constellation[] = [
  {
    name: "Somnus Minor (Little Sleep Bear)",
    stars: [
      { id: "s1", x: 20, y: 30, size: 3 }, { id: "s2", x: 35, y: 20, size: 4 },
      { id: "s3", x: 50, y: 35, size: 3 }, { id: "s4", x: 40, y: 50, size: 5 },
      { id: "s5", x: 60, y: 60, size: 3 }, { id: "s6", x: 75, y: 45, size: 4 },
      { id: "s7", x: 55, y: 75, size: 2 },
    ],
    description: "Legend says Somnus Minor watches over peaceful dreamers. Its appearance signifies restful nights.",
    targetGoodSleepNights: 7,
  },
  {
    name: "Noctua's Eye (Owl's Gaze)",
    stars: [
      { id: "n1", x: 50, y: 15, size: 4 }, { id: "n2", x: 40, y: 30, size: 3 },
      { id: "n3", x: 60, y: 30, size: 3 }, { id: "n4", x: 30, y: 50, size: 5 },
      { id: "n5", x: 70, y: 50, size: 5 }, { id: "n6", x: 50, y: 65, size: 4 },
      { id: "n7", x: 45, y: 80, size: 3 }, { id: "n8", x: 55, y: 80, size: 3 },
    ],
    description: "The watchful gaze of Noctua, the owl of wisdom, ensuring clarity after a night of deep thought.",
    targetGoodSleepNights: 10,
  },
  // Add more constellations
];

interface ConstellationCollectorProps {
  goodSleepNightsCount: number; // Total count of "Good" or "Excellent" sleep nights this month/period
  className?: string;
}

const ConstellationCollector: React.FC<ConstellationCollectorProps> = ({
  goodSleepNightsCount,
  className = "",
}) => {
  const [currentConstellationIndex, setCurrentConstellationIndex] = useState(0);
  const [revealedStarsInCurrent, setRevealedStarsInCurrent] = useState(0);

  useEffect(() => {
    // Determine which constellation and how many stars are revealed
    let nightsAccountedFor = 0;
    let constellationIdx = 0;
    let starsRevealed = 0;

    for (let i = 0; i < CONSTELLATIONS_DATA.length; i++) {
      const constellation = CONSTELLATIONS_DATA[i];
      if (goodSleepNightsCount >= nightsAccountedFor + constellation.targetGoodSleepNights) {
        nightsAccountedFor += constellation.targetGoodSleepNights;
        if (i < CONSTELLATIONS_DATA.length - 1) { // If not the last one, move to next
             constellationIdx = i + 1;
             starsRevealed = 0; // Reset for new constellation
        } else { // Last constellation, fully revealed
            constellationIdx = i;
            starsRevealed = constellation.stars.length;
        }
      } else {
        starsRevealed = Math.min(goodSleepNightsCount - nightsAccountedFor, constellation.stars.length);
        constellationIdx = i;
        break; 
      }
    }
    setCurrentConstellationIndex(constellationIdx);
    setRevealedStarsInCurrent(starsRevealed);

  }, [goodSleepNightsCount]);

  const currentConstellation = CONSTELLATIONS_DATA[currentConstellationIndex];
  const isCurrentConstellationComplete = revealedStarsInCurrent >= currentConstellation.stars.length;

  return (
    <RetroWindow
      title="Constellation Collector"
      icon={<Telescope className="h-4 w-4 text-purple-400" />}
      variant="deepPurple" // A new variant or use existing
      className={`mt-6 ${className}`}
    >
      <div className="p-3 min-h-[200px]">
        <p className="text-xs text-indigo-200 mb-1 font-pixel">
          Each good night's sleep reveals a new star. Current: {currentConstellation.name}
        </p>
        <p className="text-xs text-indigo-300 mb-3 font-pixel">
          Stars Revealed: {revealedStarsInCurrent} / {currentConstellation.stars.length}
          {isCurrentConstellationComplete && " (Complete!)"}
        </p>

        <div className="relative w-full h-40 bg-indigo-900 rounded border border-indigo-700 overflow-hidden">
          {/* Background stars (optional decorative) */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`bg-star-${i}`}
              className="absolute rounded-full bg-indigo-400 opacity-50 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.5 + 0.5}px`, // 0.5px to 2px
                height: `${Math.random() * 1.5 + 0.5}px`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

          {/* Constellation Stars */}
          {currentConstellation.stars.map((star, index) => (
            <div
              key={star.id}
              className={`absolute rounded-full transition-all duration-1000 ease-in-out
                ${index < revealedStarsInCurrent ? 'bg-yellow-300 shadow-[0_0_8px_2px_rgba(253,224,71,0.7)] animate-pulse-slow' : 'bg-indigo-600 opacity-30'}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size * (index < revealedStarsInCurrent ? 1.5 : 1)}px`, // Revealed stars slightly larger
                height: `${star.size * (index < revealedStarsInCurrent ? 1.5 : 1)}px`,
                transform: 'translate(-50%, -50%)',
                transitionDelay: `${index * 100}ms` // Stagger reveal animation
              }}
              title={index < revealedStarsInCurrent ? `Star ${index + 1} of ${currentConstellation.name}` : "Hidden Star"}
            />
          ))}
        </div>

        {isCurrentConstellationComplete && (
          <div className="mt-3 p-2 bg-indigo-800 rounded border border-indigo-600">
            <h5 className="text-sm font-bold text-yellow-300 font-pixel flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              {currentConstellation.name} Complete!
            </h5>
            <p className="text-xs text-indigo-200 mt-1 font-pixel">{currentConstellation.description}</p>
          </div>
        )}
         {CONSTELLATIONS_DATA.length === currentConstellationIndex + 1 && isCurrentConstellationComplete && (
            <p className="text-center text-sm text-yellow-400 font-bold mt-3 font-pixel animate-bounce">
                You've discovered all constellations! Master Dreamer!
            </p>
        )}
      </div>
    </RetroWindow>
  );
};

export default ConstellationCollector;