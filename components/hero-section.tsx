"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Heart,
  Droplet,
  Moon,
  Apple,
  Dumbbell,
  Scale,
  Brain,
  Wind,
  StretchVerticalIcon as Stretch,
  Play,
} from "lucide-react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-retro-white to-retro-light-gray py-20 border-b-4 border-retro-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isLoaded && (
          <>
            <Heart className="absolute text-retro-pink h-16 w-16 top-[10%] left-[5%] animate-float opacity-30" />
            <Droplet
              className="absolute text-retro-blue h-12 w-12 top-[20%] left-[80%] animate-float opacity-30"
              style={{ animationDelay: "1.5s" }}
            />
            <Moon
              className="absolute text-retro-purple h-14 w-14 top-[70%] left-[15%] animate-float opacity-30"
              style={{ animationDelay: "2.2s" }}
            />
            <Apple
              className="absolute text-retro-green h-10 w-10 top-[60%] left-[85%] animate-float opacity-30"
              style={{ animationDelay: "0.7s" }}
            />
            <Dumbbell
              className="absolute text-retro-orange h-16 w-16 top-[80%] left-[40%] animate-float opacity-30"
              style={{ animationDelay: "1.2s" }}
            />
            <Scale
              className="absolute text-retro-yellow h-12 w-12 top-[30%] left-[60%] animate-float opacity-30"
              style={{ animationDelay: "2s" }}
            />
            <Brain
              className="absolute text-retro-red h-14 w-14 top-[15%] left-[30%] animate-float opacity-30"
              style={{ animationDelay: "0.5s" }}
            />
            <Wind
              className="absolute text-retro-blue h-10 w-10 top-[50%] left-[10%] animate-float opacity-30"
              style={{ animationDelay: "1.8s" }}
            />
            <Stretch
              className="absolute text-retro-orange h-16 w-16 top-[40%] left-[90%] animate-float opacity-30"
              style={{ animationDelay: "1s" }}
            />
          </>
        )}
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            {/* 1. Pill-shaped badge above headline (already present, but enhance with retro badge variant and bounce) */}
            <div className="inline-block mb-6 animate-bounce">
              <span className="font-pixel text-sm px-4 py-2 border-4 border-retro-black bg-retro-yellow text-retro-black shadow-pixel rounded-full badge badge-retro">
                Your Complete Health Companion
              </span>
            </div>

            {/* 2. Main headline with pixel/arcade font (already present) */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-pixel mb-6 leading-tight">
              Gamify Your Wellness Journey
              <br />
              <span className="text-retro-blue">Visualize, Play, Achieve!</span>
            </h1>

            <p className="text-lg md:text-xl text-retro-gray mb-8 max-w-lg font-pixel">
              Experience health tracking like never before: retro-inspired visuals, playful interactions, and powerful insights-all in one beautifully crafted dashboard.
            </p>

            {/* 4. Call-to-action buttons: use retro variant and add glowing effect */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/features">
                <Button variant="retro" className="w-full sm:w-auto border-4 border-retro-black shadow-pixel hover:shadow-[0_0_16px_4px_#4E77FF] hover:scale-105 transition-transform font-pixel group">
                  Get Started with Quests 📜<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {/* <Link href="/features">
              <Button
                variant="retro"
                className="w-full sm:w-auto border-4 border-retro-black shadow-pixel hover:shadow-[0_0_16px_4px_#FFD600] hover:scale-105 transition-transform font-pixel group"
              >
                View all Quests 
              </Button>
              </Link>    */}
            </div>

            <div className="mt-8 text-sm text-retro-gray font-pixel">
              <p>No credit card required • Free 14-day trial • Cancel anytime</p>
            </div>
          </div>

          <div className="relative">
            <div className="retro-window bg-[#4E77FF] border-4 border-retro-black shadow-pixel rounded-none w-[420px] md:w-[520px] mx-auto">
              <div className="flex items-center justify-between px-3 py-1 bg-[#4E77FF] border-b-4 border-retro-black">
                <div className="flex gap-1">
                  <span className="w-3 h-3 bg-window-minimize border-2 border-retro-black rounded-none mr-1"></span>
                  <span className="w-3 h-3 bg-window-maximize border-2 border-retro-black rounded-none mr-1"></span>
                  <span className="w-3 h-3 bg-window-close border-2 border-retro-black rounded-none"></span>
                </div>
                <span className="font-pixel text-xlg text-retro-black tracking-wider"></span>
                <span></span>
              </div>
              <div className="p-0 md:p-2">
                <img
                  src="/vid.gif?height=400&width=500"
                  alt="HealthQuest Dashboard"
                  className="w-full h-auto rounded-none border-4 border-retro-black"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>
            {/* 6. Pixel badge below hero image (already present, but enhance with retro badge variant and bounce) */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2 bg-yellow-300 text-black border-4 border-retro-black shadow-pixel font-pixel text-base font-bold rounded-none z-10 animate-bounce badge badge-retro">
              <span className="inline-block"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="3" fill="#fff"/><path d="M10 3v14M3 10h14" stroke="#000" strokeWidth="2"/></svg></span>
              9 Health Trackers in One App!
            </div>
          </div>
        </div>

        {/* 5. Pixel-art tracker icons row with tooltips (below hero image) */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {/* Example pixel-art icons for each tracker, with tooltips */}
          <div className="relative group">
            <Heart className="h-8 w-8 text-retro-pink" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-yellow text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Mood</span>
          </div>
          <div className="relative group">
            <Droplet className="h-8 w-8 text-retro-blue" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-blue text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Hydration</span>
          </div>
          <div className="relative group">
            <Moon className="h-8 w-8 text-retro-purple" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-purple text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Sleep</span>
          </div>
          <div className="relative group">
            <Apple className="h-8 w-8 text-retro-green" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-green text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Nutrition</span>
          </div>
          <div className="relative group">
            <Dumbbell className="h-8 w-8 text-retro-orange" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-orange text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Fitness</span>
          </div>
          <div className="relative group">
            <Scale className="h-8 w-8 text-retro-yellow" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-yellow text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Weight</span>
          </div>
          <div className="relative group">
            <Brain className="h-8 w-8 text-retro-red" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-red text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Mental</span>
          </div>
          <div className="relative group">
            <Wind className="h-8 w-8 text-retro-blue" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-blue text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Breathing</span>
          </div>
          <div className="relative group">
            <Stretch className="h-8 w-8 text-retro-orange" />
            <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 bg-retro-black text-retro-orange text-xs rounded font-pixel opacity-0 group-hover:opacity-100 transition-opacity">Stretching</span>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-retro-gray mb-2 text-sm uppercase tracking-widest font-pixel">Trusted by</p>
          <h3 className="text-xl font-semibold mb-6 text-retro-black font-pixel">
            Health-conscious individuals worldwide 🌍
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 opacity-80">
            {[
              "Brian Williams",
              "Brad Michel",
              "Jan Ascher",
              "David Dominguez",
              "John Derse"
            ].map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-10 px-4 bg-retro-white rounded-none border-4 border-retro-black shadow-pixel hover:scale-105 transition-transform duration-200 font-pixel"
              >
                <span className="text-retro-black text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
