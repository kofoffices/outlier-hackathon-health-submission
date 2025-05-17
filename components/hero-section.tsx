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
} from "lucide-react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 border-b-2 border-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isLoaded && (
          <>
            <Heart className="absolute text-pink-200 h-16 w-16 top-[10%] left-[5%] animate-float opacity-30" />
            <Droplet
              className="absolute text-blue-200 h-12 w-12 top-[20%] left-[80%] animate-float opacity-30"
              style={{ animationDelay: "1.5s" }}
            />
            <Moon
              className="absolute text-indigo-200 h-14 w-14 top-[70%] left-[15%] animate-float opacity-30"
              style={{ animationDelay: "2.2s" }}
            />
            <Apple
              className="absolute text-green-200 h-10 w-10 top-[60%] left-[85%] animate-float opacity-30"
              style={{ animationDelay: "0.7s" }}
            />
            <Dumbbell
              className="absolute text-purple-200 h-16 w-16 top-[80%] left-[40%] animate-float opacity-30"
              style={{ animationDelay: "1.2s" }}
            />
            <Scale
              className="absolute text-teal-200 h-12 w-12 top-[30%] left-[60%] animate-float opacity-30"
              style={{ animationDelay: "2s" }}
            />
            <Brain
              className="absolute text-rose-200 h-14 w-14 top-[15%] left-[30%] animate-float opacity-30"
              style={{ animationDelay: "0.5s" }}
            />
            <Wind
              className="absolute text-blue-200 h-10 w-10 top-[50%] left-[10%] animate-float opacity-30"
              style={{ animationDelay: "1.8s" }}
            />
            <Stretch
              className="absolute text-amber-200 h-16 w-16 top-[40%] left-[90%] animate-float opacity-30"
              style={{ animationDelay: "1s" }}
            />
          </>
        )}
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold text-sm mb-6 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
              Your Complete Health Companion
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold pixel-font mb-6 leading-tight">
              Track Your Health <br />
              <span className="text-blue-600">Retro Style</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Your Wellness Adventure-Visualized, Motivated, Rewarded. Monitor all aspects of your wellness journey with
              our comprehensive health tracking platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-[-2px] transition-transform">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-[-2px] transition-transform"
              >
                Watch Demo
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>No credit card required • Free 14-day trial • Cancel anytime</p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transform transition-transform hover:translate-y-[-5px]">
              <img
                src="/1.jpg?height=400&width=500"
                alt="HealthQuest Dashboard"
                className="w-full h-auto rounded-md border-2 border-gray-800"
              />

              <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white px-4 py-2 rounded-lg border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] font-bold pixel-font">
                9 Health Trackers in One App!
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-2 text-sm uppercase tracking-widest">Trusted by</p>
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
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
                  className="flex items-center justify-center h-10 px-4 bg-gray-200 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                >
                  <span className="text-gray-700 text-sm font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>

      </div>
    </div>
  )
}
