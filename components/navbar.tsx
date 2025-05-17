"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Settings, User, LogOut, ChevronDown, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useHealth } from "@/components/health-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RetroStreakBadge } from "@/components/retro-streak-badge"
import { Heart, Droplet, Moon, Apple, Dumbbell, Scale, Brain, Wind, StretchVerticalIcon as Stretch } from "lucide-react"
import Link from "next/link"

// Mock notifications
const notifications = [
  { id: 1, title: "Hydration Reminder", message: "Don't forget to drink water today!", time: "10 minutes ago" },
  { id: 2, title: "Workout Complete", message: "Great job on completing your morning workout!", time: "2 hours ago" },
  {
    id: 3,
    title: "Sleep Goal Achieved",
    message: "You've met your sleep goal for 3 days in a row!",
    time: "Yesterday",
  },
  { id: 4, title: "New Feature", message: "Check out the new breathing exercises we've added!", time: "2 days ago" },
]

// Tracker menu items
const trackerMenuItems = [
  { name: "Mood Tracker", href: "/mood", icon: Heart, color: "text-pink-500" },
  { name: "Hydration Tracker", href: "/hydration", icon: Droplet, color: "text-blue-500" },
  { name: "Sleep Tracker", href: "/sleep", icon: Moon, color: "text-indigo-500" },
  { name: "Nutrition Tracker", href: "/nutrition", icon: Apple, color: "text-green-500" },
  { name: "Fitness Checklist", href: "/fitness", icon: Dumbbell, color: "text-purple-500" },
  { name: "Weight Tracker", href: "/weight", icon: Scale, color: "text-teal-500" },
  { name: "Mental Journal", href: "/mental", icon: Brain, color: "text-rose-500" },
  { name: "Breathing Exercise", href: "/breathing", icon: Wind, color: "text-blue-500" },
  { name: "Stretch Routine", href: "/stretching", icon: Stretch, color: "text-amber-500" },
]

export function Navbar() {
  const { streak } = useHealth()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  return (
    <header className="h-16 border-b-2 border-gray-800 bg-white px-6 flex items-center justify-between shadow-[0_2px_0px_0px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 hover:scale-[1.03] transition-transform">
          <Heart className="h-8 w-8 fill-blue-100 stroke-blue-600" />
          <div className="flex flex-col">
            <span className="text-xl font-bold pixel-font text-blue-600">HealthQuest</span>
            <span className="text-xs text-gray-500">Your Wellness Adventure-Visualized, Motivated, Rewarded.</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:bg-blue-50 hover:scale-[1.03] transition-all duration-200"
            >
              Suite of Trackers <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
          >
            <DropdownMenuLabel className="font-bold">Health Trackers</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {trackerMenuItems.map((item) => (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href} className="cursor-pointer flex items-center gap-2 hover:bg-blue-50">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer flex items-center gap-2 hover:bg-blue-50">
                <span className="font-bold">View All Trackers</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <RetroStreakBadge streak={streak} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
          >
            <DropdownMenuLabel className="font-bold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-gray-300" />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start py-2 cursor-pointer hover:bg-blue-50 border-b border-gray-200 last:border-b-0"
              >
                <div className="font-bold">{notification.title}</div>
                <div className="text-sm text-gray-500">{notification.message}</div>
                <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
          onClick={() => setShowHelp(true)}
        >
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>

        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
          <SheetContent className="w-[300px] sm:w-[400px] border-l-2 border-gray-800 shadow-[-4px_0px_0px_0px_rgba(0,0,0,0.8)]">
            <SheetHeader>
              <SheetTitle className="font-bold pixel-font text-xl">Settings</SheetTitle>
              <SheetDescription>Customize your HealthQuest experience</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold pixel-font">Appearance</h3>
                <div className="flex items-center justify-between p-2 border-2 border-gray-800 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <Label htmlFor="theme-mode" className="font-bold">
                      Dark Mode
                    </Label>
                  </div>
                  <Switch id="theme-mode" className="border-2 border-gray-800" />
                </div>
                <div className="flex items-center justify-between p-2 border-2 border-gray-800 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    <Label htmlFor="pixel-effects" className="font-bold">
                      Pixel Effects
                    </Label>
                  </div>
                  <Switch id="pixel-effects" defaultChecked className="border-2 border-gray-800" />
                </div>
                <div className="flex items-center justify-between p-2 border-2 border-gray-800 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <Label htmlFor="animations" className="font-bold">
                      Animations
                    </Label>
                  </div>
                  <Switch id="animations" defaultChecked className="border-2 border-gray-800" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold pixel-font">Notifications</h3>
                <div className="flex items-center justify-between p-2 border-2 border-gray-800 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="push-notifications" className="font-bold">
                      Push Notifications
                    </Label>
                  </div>
                  <Switch id="push-notifications" defaultChecked className="border-2 border-gray-800" />
                </div>
                <div className="flex items-center justify-between p-2 border-2 border-gray-800 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <Label htmlFor="sound-effects" className="font-bold">
                      Sound Effects
                    </Label>
                  </div>
                  <Switch id="sound-effects" defaultChecked className="border-2 border-gray-800" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold pixel-font">Regional</h3>
                <div className="flex items-center justify-between p-2 border-2 border-gray-800 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <Label htmlFor="units" className="font-bold">
                      Use Metric Units
                    </Label>
                  </div>
                  <Switch id="units" className="border-2 border-gray-800" />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={showHelp} onOpenChange={setShowHelp}>
          <SheetContent className="w-[300px] sm:w-[400px] border-l-2 border-gray-800 shadow-[-4px_0px_0px_0px_rgba(0,0,0,0.8)]">
            <SheetHeader>
              <SheetTitle className="font-bold pixel-font text-xl">Help & Tips</SheetTitle>
              <SheetDescription>Learn how to use HealthQuest</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold pixel-font">Quick Tips</h3>
                <div className="p-3 border-2 border-gray-800 rounded-md bg-yellow-50">
                  <h4 className="font-bold mb-1">Window Controls</h4>
                  <p className="text-sm">Each tracker has minimize, maximize, and close buttons at the top right.</p>
                </div>
                <div className="p-3 border-2 border-gray-800 rounded-md bg-yellow-50">
                  <h4 className="font-bold mb-1">Streak Tracking</h4>
                  <p className="text-sm">Complete daily activities to build your streak and earn achievements!</p>
                </div>
                <div className="p-3 border-2 border-gray-800 rounded-md bg-yellow-50">
                  <h4 className="font-bold mb-1">Keyboard Shortcuts</h4>
                  <p className="text-sm">Press Ctrl+S to save, Ctrl+H to go home, Ctrl+F to search.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold pixel-font">Getting Started</h3>
                <div className="p-3 border-2 border-gray-800 rounded-md bg-blue-50">
                  <p className="text-sm">1. Set your daily goals in each tracker</p>
                  <p className="text-sm">2. Track your progress throughout the day</p>
                  <p className="text-sm">3. Review your stats on the dashboard</p>
                  <p className="text-sm">4. Maintain your streak for best results!</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:scale-[1.03] transition-transform border-2 border-gray-800 p-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] bg-gradient-to-r from-blue-100 to-blue-50">
              <div className="text-right">
                <p className="text-sm font-bold">Alex Johnson</p>
                <p className="text-xs text-gray-500">alex@example.com</p>
              </div>
              <Avatar className="hover:ring-2 hover:ring-blue-200 transition-all border-2 border-gray-800">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">AJ</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
          >
            <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-gray-300" />
            <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 font-bold">
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 font-bold">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-gray-300" />
            <DropdownMenuItem className="cursor-pointer hover:bg-red-50 text-red-600 font-bold">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function Sun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function Cpu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  )
}

function Zap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function Volume2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}
