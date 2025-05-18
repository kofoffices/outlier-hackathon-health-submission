"use client"
import React from 'react';
import { RetroWindow } from '@/components/ui/retro-window'; // Adjust path
import { Salad, Drumstick, Wheat, Blocks, Cherry } from 'lucide-react'; // Example icons

interface FoodByte {
  id: string;
  name: string;
  icon: React.ElementType; // e.g., lucide-react icon component
  color: string; // Tailwind text color class
  bgColor: string; // Tailwind bg color class
  collected: boolean;
}

// Define food categories (our "Bytes")
// These would ideally map to categories you assign when logging meals
export const FOOD_BYTE_CATEGORIES: Omit<FoodByte, 'collected'>[] = [
  { id: "fruit", name: "Fruits", icon: Cherry, color: "text-red-600", bgColor: "bg-red-100" },
  { id: "vegetable", name: "Vegetables", icon: Salad, color: "text-green-600", bgColor: "bg-green-100" },
  { id: "protein_source", name: "Protein", icon: Drumstick, color: "text-orange-600", bgColor: "bg-orange-100" },
  { id: "grain", name: "Grains", icon: Wheat, color: "text-yellow-700", bgColor: "bg-yellow-100" },
  { id: "dairy", name: "Dairy", icon: Blocks, color: "text-blue-600", bgColor: "bg-blue-100" }, // Blocks as generic "building blocks"
  // Add more like 'healthy_fats', 'sweets' (to limit), etc.
];

interface FoodBytesCollectorProps {
  collectedCategories: Set<string>; // Set of collected category IDs (e.g., "fruit", "vegetable")
  className?: string;
}

const FoodBytesCollector: React.FC<FoodBytesCollectorProps> = ({
  collectedCategories,
  className = "",
}) => {
  const allBytesWithStatus: FoodByte[] = FOOD_BYTE_CATEGORIES.map(byte => ({
    ...byte,
    collected: collectedCategories.has(byte.id),
  }));

  const totalCollected = allBytesWithStatus.filter(b => b.collected).length;
  const totalPossible = allBytesWithStatus.length;

  return (
    <RetroWindow
      title="Food Bytes Collector"
      icon={<Blocks />} // Generic "collector" icon
      variant="amber" // Example variant
      className={`mt-6 ${className}`}
    >
      <div className="p-3">
        <p className="text-xs text-gray-700 mb-3 font-pixel">
          Collect different food group "Bytes" by logging diverse meals!
          Collected: {totalCollected} / {totalPossible} Bytes
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {allBytesWithStatus.map((byte) => {
            const Icon = byte.icon;
            return (
              <div
                key={byte.id}
                className={`p-2 rounded-md border-2 border-gray-800 flex flex-col items-center justify-center aspect-square transition-all duration-300
                  ${byte.collected ? `${byte.bgColor} shadow-md scale-105 animate-pulse-once` : 'bg-gray-200 opacity-60'}`}
                title={byte.collected ? `${byte.name} Byte Collected!` : `Collect ${byte.name} Byte`}
              >
                <Icon className={`h-7 w-7 ${byte.collected ? byte.color : 'text-gray-500'}`} />
                <span className={`mt-1 text-xs font-bold font-pixel ${byte.collected ? byte.color : 'text-gray-500'}`}>
                  {byte.name}
                </span>
                {byte.collected && (
                    <span className="absolute top-1 right-1 text-xs text-green-500 font-bold">✓</span>
                )}
              </div>
            );
          })}
        </div>
        {totalCollected === totalPossible && (
             <p className="text-center text-sm font-bold text-lime-600 mt-3 font-pixel animate-bounce">
                All Food Bytes Collected! You're a nutrition explorer! 💾
            </p>
        )}
      </div>
    </RetroWindow>
  );
};

export default FoodBytesCollector;