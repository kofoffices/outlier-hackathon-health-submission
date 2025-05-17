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
} from "lucide-react"
import { cn } from "@/lib/utils"

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
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out",
        "hover:scale-[1.03] focus:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2",
        isActive
          ? "bg-blue-100 text-blue-600 focus:ring-blue-400"
          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 focus:ring-blue-200",
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}

export function Sidebar() {
  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 flex items-center gap-2 hover:scale-[1.03] transition-transform"
        >
          <Heart className="h-6 w-6 fill-blue-100 stroke-blue-600" />
          Health Tracker Pro
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
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
