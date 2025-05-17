"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeatureShowcaseSection } from "@/components/feature-showcase"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function LandingPage() {
  const [showStartup, setShowStartup] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)

  // Simulate boot sequence
  useEffect(() => {
    if (showStartup) {
      const bootInterval = setInterval(() => {
        setBootProgress((prev) => {
          if (prev >= 100) {
            clearInterval(bootInterval)
            setTimeout(() => setShowStartup(false), 500)
            return 100
          }
          return prev + 5
        })
      }, 100)

      return () => clearInterval(bootInterval)
    }
  }, [showStartup])

  if (showStartup) {
    return (
      <div className="fixed inset-0 bg-black text-green-500 font-pixel flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl p-8 flex flex-col">
          <div className="text-4xl mb-8 text-center animate-pulse">Health Tracker Pro OS v1.0</div>
          <div className="text-2xl mb-4 text-center">Initializing system...</div>
          <div className="mb-8">
            <div className="text-xl mb-2 text-center">Loading components: {bootProgress}%</div>
            <div className="w-full h-8 bg-gray-800 border-2 border-green-500 overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-100 relative"
                style={{ width: `${bootProgress}%` }}
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 w-4 bg-green-700"
                    style={{ left: `${i * 10}%`, opacity: Math.random() * 0.5 + 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto text-lg space-y-2 max-h-80 w-full max-w-2xl mx-auto border-2 border-green-500 p-4 bg-black">
            {bootProgress > 5 && <div className="typing-effect">$ INITIALIZING HEALTH_TRACKER_PRO...</div>}
            {bootProgress > 10 && <div className="typing-effect">$ Loading system kernel...</div>}
            {bootProgress > 20 && <div className="typing-effect">$ Initializing health modules...</div>}
            {bootProgress > 30 && <div className="typing-effect">$ Loading user interface...</div>}
            {bootProgress > 40 && <div className="typing-effect">$ Connecting to health database...</div>}
            {bootProgress > 50 && <div className="typing-effect">$ Loading mood tracker module...</div>}
            {bootProgress > 60 && <div className="typing-effect">$ Loading fitness module...</div>}
            {bootProgress > 70 && <div className="typing-effect">$ Loading nutrition module...</div>}
            {bootProgress > 80 && <div className="typing-effect">$ Loading sleep tracker module...</div>}
            {bootProgress > 90 && <div className="typing-effect">$ System check complete. Starting application...</div>}
            {bootProgress === 100 && (
              <div className="text-2xl text-center animate-pulse mt-4">
                Welcome to Health Tracker Pro!
                <div className="text-sm mt-2">Your Wellness Adventure-Visualized, Motivated, Rewarded.</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="text-sm">CPU</div>
              <div className="text-xs">HEALTH_CORE_1.0</div>
            </div>
            <div className="text-center">
              <div className="text-sm">MEMORY</div>
              <div className="text-xs">512K WELLNESS</div>
            </div>
            <div className="text-center">
              <div className="text-sm">STORAGE</div>
              <div className="text-xs">UNLIMITED</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureShowcaseSection />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
