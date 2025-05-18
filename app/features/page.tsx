// app/features/page.tsx

"use client"

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Info } from "lucide-react";
import { Trophy, Sparkles, Star } from "lucide-react";
import { Navbar } from "@/components/navbar";

// Import ALL icons used in FEATURE_LIST
import { Heart, Droplet, Moon, Apple, Dumbbell, Scale, Brain, Wind, StretchVerticalIcon as Stretch } from "lucide-react";

// Define feature list type
interface Feature {
  id: number | string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  link: string;
  themeColorName?: string; // e.g., "rose", "sky" - for deriving Tailwind classes
  // Or provide specific classes if more control is needed:
  accentColorClass?: string; // e.g., "text-rose-500" or "border-rose-500"
  bgColorLight?: string; // e.g., "bg-rose-50"
}

// FEATURE_LIST - Tailored for a light, Mac-inspired theme
const FEATURE_LIST: Feature[] = [
  // Using themeColorName to generate consistent accents
  { id: 1, title: "Mood Tracker", description: "Understand your emotional landscape with daily mood logging and insightful pattern analysis.", icon: Heart, image: "/mood.jpg", link: "/mood", themeColorName: "pink" },
  { id: 2, title: "Hydration Tracker", description: "Effortlessly monitor water intake, set goals, and visualize your hydration progress.", icon: Droplet, image: "/hydration-2.jpg", link: "/hydration", themeColorName: "blue" },
  { id: 3, title: "Sleep Tracker", description: "Optimize rest by tracking duration, consistency, and quality for better overall health.", icon: Moon, image: "/sleep.jpg", link: "/sleep", themeColorName: "indigo" },
  { id: 4, title: "Nutrition Tracker", description: "Log meals, track macronutrients, and cultivate healthier eating habits with ease.", icon: Apple, image: "/nutrition.png", link: "/nutrition", themeColorName: "green" },
  { id: 5, title: "Fitness Checklist", description: "Stay consistent with workouts using an interactive checklist to track your achievements.", icon: Dumbbell, image: "/fitness.jpeg", link: "/fitness", themeColorName: "purple" },
  { id: 6, title: "Weight Tracker", description: "Visualize your weight management journey and monitor your progress over time.", icon: Scale, image: "/weight2.jpeg", link: "/weight", themeColorName: "teal" },
  { id: 7, title: "Mental Journal", description: "Reflect on thoughts and experiences to gain clarity and support emotional well-being.", icon: Brain, image: "/journal.jpg", link: "/journal", themeColorName: "rose" },
  { id: 8, title: "Breathing Exercises", description: "Find calm and reduce stress with simple, guided breathing techniques.", icon: Wind, image: "/breather.jpeg", link: "/breathing", themeColorName: "cyan" },
  { id: 9, title: "Stretching Routine", description: "Improve flexibility and prevent injuries with customizable daily stretch routines.", icon: Stretch, image: "/stretch.jpeg", link: "/stretching", themeColorName: "amber" },
];

const GAMIFY_HEADER = (
  <div className="flex flex-col items-center mb-12 sm:mb-16 pt-8 md:pt-12">
    <div className="inline-flex items-center justify-center p-3 mb-5 bg-yellow-100 border-2 border-yellow-300 rounded-full shadow-md animate-bounce">
      <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500 drop-shadow-lg" />
    </div>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-pixel text-center text-yellow-600 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
      Tracker-Hub: Turn Your Goals into High-Scores!
    </h1>
    <p className="mt-4 text-lg text-gray-700 font-pixel max-w-2xl mx-auto flex items-center justify-center gap-2">
      <Sparkles className="inline-block h-6 w-6 text-pink-400 animate-pulse" />
      Unlock achievements, level up your health, and collect badges as you explore each tracker!
      <Sparkles className="inline-block h-6 w-6 text-blue-400 animate-pulse" />
    </p>
    <div className="mt-2 flex flex-wrap gap-2 justify-center">
      <span className="bg-pink-200 text-pink-700 font-pixel px-3 py-1 rounded-full text-xs shadow">XP for every log!</span>
      <span className="bg-blue-200 text-blue-700 font-pixel px-3 py-1 rounded-full text-xs shadow">Daily Streaks</span>
      <span className="bg-green-200 text-green-700 font-pixel px-3 py-1 rounded-full text-xs shadow">Unlock Badges</span>
      <span className="bg-yellow-200 text-yellow-700 font-pixel px-3 py-1 rounded-full text-xs shadow">Level Up!</span>
    </div>
  </div>
);

const GAMIFY_DESCRIPTIONS: Record<string, string> = {
  "Mood Tracker": "Log your mood, earn Mood Master badges, and reveal your emotional mosaic!",
  "Hydration Tracker": "Fill your Aqua Meter, unlock hydration streaks, and become a Water Champion!",
  "Sleep Tracker": "Track your sleep, collect Zzz Stars, and boost your Restfulness Level!",
  "Nutrition Tracker": "Log meals, complete Food Quests, and build your Nutrition Pyramid!",
  "Fitness Checklist": "Complete workouts, earn Power Points, and unlock Fitness Hero status!",
  "Weight Tracker": "Track progress, smash milestones, and earn Transformation Badges!",
  "Mental Journal": "Write entries, unlock Reflection XP, and collect Mindful Moments!",
  "Breathing Exercises": "Complete sessions, earn Zen Points, and unlock Calm Achievements!",
  "Stretching Routine": "Stretch daily, collect Flexibility Stars, and level up your Mobility!",
};

const FeatureCard: React.FC<Feature> = ({
  title, description, icon: Icon, image, link, themeColorName = "gray"
}) => {
  // Construct Tailwind classes from themeColorName for Mac-like accents
  const accentText = `text-${themeColorName}-600`;
  const accentBorderHover = `group-hover:border-${themeColorName}-100`;
  const accentBgLight = `bg-${themeColorName}-50`;
  const accentShadowHover = `group-hover:shadow-[0_0_0_2px_var(--tw-shadow-color),0_8px_20px_-5px_var(--tw-shadow-color)]`;


  return (
    <Link href={link} className="block group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-blue-500">
      <div className={`card-macOS bg-white border border-gray-200/80 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 ease-out overflow-hidden h-full flex flex-col ${accentBorderHover}`}
        style={{ '--tw-shadow-color': `rgba(var(--${themeColorName}-400-rgb, 0,0,0), 0.3)` } as React.CSSProperties}
      >
        <div className={`px-3 py-2 border-b border-gray-200/70 flex items-center justify-between ${accentBgLight}/60`}> {/* Title bar */}
          <div className="flex items-center gap-1.5">
            <Icon className={`h-4 w-4 ml-2 ${accentText} opacity-70`} />
            <span className={`text-xs font-pixel font-bold ${accentText} opacity-90 tracking-wide`}>{title}</span>
            <Star className="h-3.5 w-3.5 text-yellow-400 ml-1 animate-spin-slow" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-400 rounded-full opacity-80 group-hover:opacity-100"></span>
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-80 group-hover:opacity-100"></span>
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full opacity-80 group-hover:opacity-100"></span>
          </div>
        </div>
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={`${title} Feature Illustration`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
            priority={FEATURE_LIST.findIndex(f => f.title === title) < 3}
          />
          {/* Gamified badge overlay */}
          <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 shadow text-xs font-pixel text-gray-700 border border-gray-200">
            <Star className="h-3 w-3 text-yellow-400" />
            {title.replace(/ Tracker| Checklist| Routine| Exercises| Journal/g, "")} XP
          </div>
        </div>
        <div className={`p-4 flex-grow flex flex-col ${accentBgLight}/30`}>
          <h3 className={`text-lg font-pixel font-bold ${accentText} mb-1.5`}>{title}</h3>
          <p className="text-sm text-gray-700 font-pixel mb-4 line-clamp-3 leading-normal flex-grow">
            {GAMIFY_DESCRIPTIONS[title] || description}
          </p>
          <div className="mt-auto text-right">
            <span className={`font-pixel text-sm ${accentText} group-hover:underline decoration-1 underline-offset-2 transition-all flex items-center gap-1.5`}>
              Open Tracker
              <ArrowRight className="inline-block h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
              <span className="inline-block bg-yellow-100 text-yellow-700 font-pixel px-2 py-0.5 rounded ml-2 text-xs animate-bounce">+XP</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-slate-50 to-blue-50 p-4 sm:p-6 md:p-10 features-page-light-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {GAMIFY_HEADER}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURE_LIST.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
        <div className="text-center mt-16 sm:mt-20 mb-8">
            <Link href="/dashboard">
                <button className={`font-pixel font-bold bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 px-7 py-3 rounded-lg shadow-md hover:shadow-lg active:shadow-sm text-base transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400`}>
                    Back to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform inline-block" />
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}