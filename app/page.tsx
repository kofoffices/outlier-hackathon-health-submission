"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeatureShowcaseSection } from "@/components/feature-showcase"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { HeartPulse } from "lucide-react" // Example icon

// Pixelated Apple-like logo (simple heart)
const PixelHealthLogo = () => (
  <div className="mb-8">
    <svg width="80" height="80" viewBox="0 0 20 20" className="mx-auto image-rendering-pixelated fill-current">
      {/* Simple Pixel Heart */}
      <rect x="6" y="3" width="8" height="1" />
      <rect x="4" y="4" width="12" height="1" />
      <rect x="3" y="5" width="14" height="1" />
      <rect x="2" y="6" width="16" height="2" />
      <rect x="3" y="8" width="14" height="1" />
      <rect x="4" y="9" width="12" height="1" />
      <rect x="5" y="10" width="10" height="1" />
      <rect x="6" y="11" width="8" height="1" />
      <rect x="7" y="12" width="6" height="1" />
      <rect x="8" y="13" width="4" height="1" />
      <rect x="9" y="14" width="2" height="1" />
    </svg>
  </div>
);


const BOOT_MESSAGES = [
  { text: "$ INITIALIZING HEALTH_TRACKER_PRO_OS...", progressThreshold: 5 },
  { text: "$ Loading system kernel [KERNEL_HTP_v1.0.2]...", progressThreshold: 10 },
  { text: "$ Mounting wellness drive...", progressThreshold: 15 },
  { text: "$ Initializing health modules:", progressThreshold: 20 },
  { text: "  - MoodTracker Core         [OK]", progressThreshold: 30, icon: "🧠" },
  { text: "  - Hydration Engine         [OK]", progressThreshold: 35, icon: "💧" },
  { text: "  - Sleep Analysis Unit      [OK]", progressThreshold: 40, icon: "🌙" },
  { text: "  - Nutrition Database       [OK]", progressThreshold: 50, icon: "🍎" },
  { text: "  - Fitness Subroutines      [OK]", progressThreshold: 60, icon: "🏋️" },
  { text: "  - Weight Metrics           [OK]", progressThreshold: 65, icon: "⚖️" },
  { text: "  - Mental Journal           [OK]", progressThreshold: 70, icon: "✍️" },
  { text: "  - Breathing Synthesizer    [OK]", progressThreshold: 75, icon: "🌬️" },
  { text: "  - Stretch Sequencer        [OK]", progressThreshold: 80, icon: "🤸" },
  { text: "$ Loading user interface [AQUA_GUI_RETRO]...", progressThreshold: 85 },
  { text: "$ System check complete.", progressThreshold: 95 },
  { text: "$ Welcome to HealthQuest OS!", progressThreshold: 100, style: "text-center text-xl mt-2" },
];


export default function LandingPage() {
  const [showStartup, setShowStartup] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(true);
  const [currentMessages, setCurrentMessages] = useState<string[]>([]);

  // Simulate boot sequence
  useEffect(() => {
    if (showStartup) {
      // Initial logo display
      const logoTimer = setTimeout(() => {
        setShowLogo(false);
      }, 1500); // Show logo for 1.5 seconds

      const bootInterval = setInterval(() => {
        setBootProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 3) + 2; // More varied progress
          if (newProgress >= 100) {
            clearInterval(bootInterval);
            // Ensure all messages for 100% are shown before hiding
            const finalMessages = BOOT_MESSAGES.filter(m => m.progressThreshold <= 100).map(m => `${m.icon ? m.icon + ' ' : ''}${m.text}`);
            setCurrentMessages(finalMessages);
            setTimeout(() => setShowStartup(false), 2000); // Wait a bit after "Welcome" message
            return 100;
          }
          return newProgress;
        });
      }, 200); // Slower, more deliberate interval

      return () => {
        clearTimeout(logoTimer);
        clearInterval(bootInterval);
      };
    }
  }, [showStartup]);

  useEffect(() => {
    // Update displayed messages based on bootProgress
    if (!showLogo) { // Start showing messages after logo
        const newDisplayedMessages = BOOT_MESSAGES
            .filter(m => bootProgress >= m.progressThreshold)
            .map(m => `${m.icon ? m.icon + ' ' : ''}${m.text}`); // Add icon if present
        setCurrentMessages(newDisplayedMessages);
    }
  }, [bootProgress, showLogo]);


  if (showStartup) {
    return (
      <div className="fixed inset-0 bg-black text-green-400 font-mono flex flex-col items-center justify-center min-h-screen p-4 select-none">
        {/* Simulated CRT Screen Bezel */}
        <div className="w-full max-w-3xl bg-black border-2 border-green-700 rounded-lg shadow-[0_0_20px_rgba(52,211,153,0.3)] p-6 flex flex-col" style={{boxShadow:'0 0 15px 2px #054005, inset 0 0 10px 1px #053005'}}>

          {showLogo ? (
            <div className="flex-grow flex flex-col items-center justify-center animate-pulse">
              <PixelHealthLogo />
              {/* <HeartPulse size={80} className="text-green-500" /> */}
            </div>
          ) : (
            <>
              <div className="text-2xl mb-4 text-center tracking-wider font-bold" style={{textShadow: '0 0 5px #34d399'}}>
                Health-Quest💓 OS <span className="text-xl">v1.0</span>
              </div>
              
              <div className="text-sm mb-1 text-center opacity-80">Initializing system...</div>
              <div className="mb-4">
                {/* Progress Bar - Mac OS Classic Style */}
                <div className="w-full h-5 bg-gray-800 border border-green-600 rounded-sm overflow-hidden relative shadow-inner">
                  <div
                    className="h-full bg-green-500 transition-all duration-200 ease-linear"
                    style={{ width: `${bootProgress}%` }}
                  />
                  {/* Subtle segments for retro feel */}
                   <div className="absolute inset-0 flex">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="flex-1 border-r border-green-800 last:border-r-0" style={{opacity: 0.2}} />
                    ))}
                  </div>
                </div>
                <div className="text-xs mt-1 text-center opacity-70">Loading components: {bootProgress}%</div>
              </div>

              {/* Terminal-like Output */}
              <div className="border border-green-600 bg-black bg-opacity-50 p-3 min-h-[200px] max-h-60 overflow-y-auto text-sm mb-4 rounded-sm shadow-inner_custom" style={{boxShadow: 'inset 0 0 8px rgba(0,255,0,0.1)'}}>
                {currentMessages.map((msg, index) => (
                  <div key={index} className={`whitespace-pre-wrap ${BOOT_MESSAGES.find(m=>m.text === msg.replace(/^(🧠|💧|🌙|🍎|🏋️|⚖️|✍️|🌬️|🤸)\s/, ''))?.style || ''}`}>
                    {msg}
                  </div>
                ))}
                {bootProgress < 100 && <span className="inline-block animate-pulse ml-0 leading-none">▋</span>}
              </div>

              {/* System Info Footer */}
              <div className="flex justify-between text-xs opacity-80 border-t border-green-700 pt-3 mt-auto">
                <div>CPU: <span className="font-semibold">Wellness Core v1</span></div>
                <div>RAM: <span className="font-semibold">512KB EDR</span> (Extended Duration RAM)</div>
                <div>HDD: <span className="font-semibold">UNLIMITED</span></div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Original landing page content
  return (
    <div className="min-h-screen bg-gray-100"> {/* Changed bg for contrast after boot */}
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