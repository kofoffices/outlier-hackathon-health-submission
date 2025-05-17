"use client"

import Link from "next/link"
import { Heart, Instagram, Twitter, Facebook, Youtube, Github, Mail, HeartPulse } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-retro-white border-t-4 border-retro-black pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <HeartPulse className="h-6 w-6 fill-retro-pink stroke-retro-pink group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xl font-bold font-pixel text-retro-black">HealthQuest</span>
                <span className="text-xs text-retro-gray font-pixel">Your Wellness Adventure-Visualized, Motivated, Rewarded.</span>
              </div>
            </Link>
            <p className="text-retro-gray mb-4 font-pixel">
              Track your wellness journey with our retro-styled health tracking platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold font-pixel mb-4 text-retro-black">Quick Links</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-retro-gray hover:text-retro-blue font-pixel transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-pixel mb-4 text-retro-black">Trackers</h3>
            <ul className="space-y-2">
              {[
                "Mood",
                "Hydration",
                "Sleep",
                "Nutrition",
                "Fitness",
                "Weight",
                "Mental",
                "Breathing",
                "Stretch",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-retro-gray hover:text-retro-blue font-pixel transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-pixel mb-4 text-retro-black">Connect</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="p-2 border-4 border-retro-black bg-retro-white hover:bg-retro-blue hover:text-retro-white transition-colors shadow-pixel group"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t-4 border-retro-black pt-6 text-center">
          <p className="text-retro-gray font-pixel">
            © {currentYear} HealthQuest. All rights reserved. Made with{" "}
            <Heart className="inline-block h-4 w-4 fill-retro-pink stroke-retro-pink" /> for health enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  )
}
