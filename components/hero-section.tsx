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
            <div className="inline-block bg-retro-yellow text-retro-black px-4 py-2 rounded-none border-4 border-retro-black shadow-pixel font-pixel text-sm mb-6 animate-bounce">
              Your Complete Health Companion
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-pixel mb-6 leading-tight">
              Gamify Your Wellness Journey
              <br />
              <span className="text-retro-blue">Visualize, Play, Achieve!</span>
            </h1>

            <p className="text-lg md:text-xl text-retro-gray mb-8 max-w-lg font-pixel">
              Experience health tracking like never before: retro-inspired visuals, playful interactions, and powerful insights-all in one beautifully crafted dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto bg-retro-blue hover:bg-retro-blue-dark text-retro-white border-4 border-retro-black shadow-pixel hover:translate-y-[-2px] transition-transform font-pixel group">
                  Get Started <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-4 border-retro-black shadow-pixel hover:translate-y-[-2px] transition-transform font-pixel group"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-8 text-sm text-retro-gray font-pixel">
              <p>No credit card required • Free 14-day trial • Cancel anytime</p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-retro-white p-6 rounded-none border-4 border-retro-black shadow-pixel transform transition-transform hover:translate-y-[-5px]">
              <img
                src="/1.jpg?height=400&width=500"
                alt="HealthQuest Dashboard"
                className="w-full h-auto rounded-none border-4 border-retro-black"
              />

              <div className="absolute -bottom-6 -left-6 bg-retro-blue text-retro-white px-4 py-2 rounded-none border-4 border-retro-black shadow-pixel font-pixel animate-pulse">
                9 Health Trackers in One App!
              </div>
            </div>
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
