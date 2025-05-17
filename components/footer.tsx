"use client"

import Link from "next/link"
import { Heart, Instagram, Twitter, Facebook, Youtube, Github, Mail, HeartPulse } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t-2 border-gray-800 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {/* <HeartPulse className="h-6 w-6 fill-blue-100 stroke-blue-600" /> */}
              <img src="/placeholder.png" alt="HealthQuest" className="h-6 w-6" />
              <div className="flex flex-col">
                <span className="text-xl font-bold pixel-font text-blue-600">HealthQuest</span>
                <span className="text-xs text-gray-600">Your Wellness Adventure-Visualized, Motivated, Rewarded.</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-4">
              Track your wellness journey with our retro-styled health tracking platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 pixel-font">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mood" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Mood Tracker
                </Link>
              </li>
              <li>
                <Link href="/hydration" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Hydration Tracker
                </Link>
              </li>
              <li>
                <Link href="/sleep" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Sleep Tracker
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Nutrition Tracker
                </Link>
              </li>
              <li>
                <Link href="/fitness" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Fitness Checklist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 pixel-font">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Health Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Wellness Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 pixel-font">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t-2 border-gray-200">
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg pixel-font text-blue-600">Stay Updated on Health Tips</h3>
                <p className="text-gray-600">Your Wellness Adventure-Visualized, Motivated, Rewarded.</p>
              </div>
              <div className="flex w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 pr-24 py-2 w-full md:w-64 border-2 border-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-0 top-0 bottom-0 bg-blue-500 text-white px-4 rounded-r-md border-2 border-gray-800 font-bold hover:bg-blue-600 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {currentYear} HealthQuest. All rights reserved.
            </p>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm italic">"The greatest wealth is health." — Virgil</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
