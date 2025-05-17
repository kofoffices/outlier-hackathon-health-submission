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
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] mb-2",
        "hover:scale-[1.03] focus:scale-[1.03] focus:outline-none",
        isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600",
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
        "border-r-2 border-gray-800 bg-white flex flex-col h-full transition-all duration-300",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="p-4 border-b-2 border-gray-800 bg-gradient-to-r from-blue-300 to-blue-200">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 flex items-center gap-2 hover:scale-[1.03] transition-transform"
        >
          <Heart className="h-6 w-6 fill-blue-100 stroke-blue-600" />
          {isOpen && <span className="pixel-font">Health Tracker</span>}
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

        <div className="mt-6 border-t-2 border-gray-300 pt-4">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
              <Folder className="h-5 w-5" />
              {isOpen && <span className="text-sm font-bold">Files</span>}
            </button>
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
              <HelpCircle className="h-5 w-5" />
              {isOpen && <span className="text-sm font-bold">Help</span>}
            </button>
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
              <Settings className="h-5 w-5" />
              {isOpen && <span className="text-sm font-bold">Settings</span>}
            </button>
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
              <LogOut className="h-5 w-5" />
              {isOpen && <span className="text-sm font-bold">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="p-2 border-t-2 border-gray-800 bg-gradient-to-r from-blue-200 to-blue-100">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
        >
          {isOpen ? "<<" : ">>"}
        </button>
      </div>
    </div>
  )
}
