"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  Heart,
  Droplet,
  Moon,
  Apple,
  Dumbbell,
  Scale,
  Brain,
  Wind,
  StretchVerticalIcon as Stretch,
  Settings,
  LogOut,
  HelpCircle,
  Folder,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
}

function NavItem({ icon: Icon, label, href }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-none px-3 py-2 transition-all duration-200 ease-in-out border-4 border-retro-black shadow-pixel mb-2 font-pixel",
        "hover:scale-[1.03] focus:scale-[1.03] focus:outline-none",
        isActive
          ? "bg-retro-blue text-retro-white"
          : "bg-retro-white text-retro-black hover:bg-retro-blue hover:text-retro-white",
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-bold">{label}</span>
    </Link>
  )
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={cn(
        "border-r-4 border-retro-black bg-retro-white flex flex-col h-full transition-all duration-300",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="p-4 border-b-4 border-retro-black bg-gradient-to-r from-retro-blue to-retro-cyan">
        <Link
          href="/"
          className="text-xl font-bold text-retro-white flex items-center gap-2 hover:scale-[1.03] transition-transform font-pixel"
        >
          <Heart className="h-6 w-6 fill-retro-pink stroke-retro-white" />
          {isOpen && <span>Health Tracker</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          <NavItem icon={Home} label="Dashboard" href="/" />
          <NavItem icon={Heart} label="Mood" href="/mood" />
          <NavItem icon={Droplet} label="Hydration" href="/hydration" />
          <NavItem icon={Moon} label="Sleep" href="/sleep" />
          <NavItem icon={Apple} label="Nutrition" href="/nutrition" />
          <NavItem icon={Dumbbell} label="Fitness" href="/fitness" />
          <NavItem icon={Scale} label="Weight" href="/weight" />
          <NavItem icon={Brain} label="Mental Health" href="/mental" />
          <NavItem icon={Wind} label="Breathing" href="/breathing" />
          <NavItem icon={Stretch} label="Stretching" href="/stretching" />
        </div>

        <div className="mt-6 border-t-4 border-retro-black pt-4">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 rounded-none px-3 py-2 text-retro-black hover:bg-retro-blue hover:text-retro-white hover:scale-[1.03] transition-all duration-200 border-4 border-retro-black shadow-pixel font-pixel">
              <Folder className="h-5 w-5" />
              {isOpen && <span className="text-sm font-bold">Files</span>}
            </button>
            <button className="w-full flex items-center gap-3 rounded-none px-3 py-2 text-retro-black hover:bg-retro-blue hover:text-retro-white hover:scale-[1.03] transition-all duration-200 border-4 border-retro-black shadow-pixel font-pixel">
              <HelpCircle className="h-5 w-5" />
              {isOpen && <span className="text-sm font-bold">Help</span>}
            </button>
            <button className="w-full flex items-center gap-3 rounded-none px-3 py-2 text-retro-black hover:bg-retro-blue hover:text-retro-white hover:scale-[1.03] transition-all duration-200 border-4 border-retro-black shadow-pixel font-pixel">
              <Settings className="h-5 w-5" />
              {isOpen && <span className="text-sm font-bold">Settings</span>}
            </button>
            <button className="w-full flex items-center gap-3 rounded-none px-3 py-2 text-retro-black hover:bg-retro-pink hover:text-retro-white hover:scale-[1.03] transition-all duration-200 border-4 border-retro-black shadow-pixel font-pixel">
              <LogOut className="h-5 w-5" />
              {isOpen && <span className="text-sm font-bold">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="p-2 border-t-4 border-retro-black bg-gradient-to-r from-retro-blue to-retro-cyan">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center p-2 rounded-none bg-retro-blue text-retro-white hover:bg-retro-blue/90 transition-colors border-4 border-retro-black shadow-pixel font-pixel"
        >
          {isOpen ? "<<" : ">>"}
        </button>
      </div>
    </div>
  )
}
