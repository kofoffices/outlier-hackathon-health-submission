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
      <div className="fixed inset-0 bg-black text-green-500 font-mono flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl p-0 flex flex-col">
          <div className="text-3xl mb-6 text-center tracking-widest font-bold" style={{letterSpacing:'0.08em'}}>Health Tracker Pro OS v1.0</div>
          <div className="text-xl mb-2 text-center">Initializing system...</div>
          <div className="mb-6">
            <div className="text-lg mb-1 text-center">Loading components: <span className="font-bold">{bootProgress}%</span></div>
            <div className="w-full h-6 bg-black border border-green-500 relative overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-100"
                style={{ width: `${bootProgress}%` }}
              />
              {/* Retro block progress effect */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r border-green-700 last:border-none"
                    style={{ opacity: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="border border-green-500 bg-black p-4 min-h-[180px] max-h-64 overflow-auto text-green-400 text-base font-mono mb-6" style={{boxShadow:'0 0 8px #0f0'}}>
            {bootProgress > 5 && <div>$ INITIALIZING HEALTH_TRACKER_PRO...</div>}
            {bootProgress > 10 && <div>$ Loading system kernel...</div>}
            {bootProgress > 20 && <div>$ Initializing health modules...</div>}
            {bootProgress > 30 && <div>$ Loading user interface...</div>}
            {bootProgress > 40 && <div>$ Connecting to health database...</div>}
            {bootProgress > 50 && <div>$ Loading mood tracker module...</div>}
            {bootProgress > 60 && <div>$ Loading fitness module...</div>}
            {bootProgress > 70 && <div>$ Loading nutrition module...</div>}
            {bootProgress > 80 && <div>$ Loading sleep tracker module...</div>}
            {bootProgress > 90 && <div>$ System check complete. Starting application...</div>}
            <span className="inline-block animate-pulse ml-1 align-middle">█</span>
          </div>
          <div className="flex justify-between text-green-400 text-xs border-t border-green-700 pt-2 mt-2">
            <div className="text-left">
              <div>CPU</div>
              <div className="font-bold">HEALTH_CORE_1.0</div>
            </div>
            <div className="text-center">
              <div>MEMORY</div>
              <div className="font-bold">512K WELLNESS</div>
            </div>
            <div className="text-right">
              <div>STORAGE</div>
              <div className="font-bold">UNLIMITED</div>
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
