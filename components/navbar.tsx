"use client"

import type React from "react"
import { useState } from "react"
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown, 
  HelpCircle,
  Heart, 
  Droplet, 
  Moon, 
  Apple, 
  Dumbbell, 
  Scale, 
  Brain, 
  Wind, 
  StretchVerticalIcon as Stretch
} from "lucide-react"
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
import Link from "next/link"
import { usePathname } from "next/navigation"

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

// Tracker menu items with retro colors
const trackerMenuItems = [
  { name: "Mood Tracker", href: "/mood", icon: Heart, color: "text-retro-pink" },
  { name: "Hydration Tracker", href: "/hydration", icon: Droplet, color: "text-retro-blue" },
  { name: "Sleep Tracker", href: "/sleep", icon: Moon, color: "text-retro-purple" },
  { name: "Nutrition Tracker", href: "/nutrition", icon: Apple, color: "text-retro-green" },
  { name: "Fitness Checklist", href: "/fitness", icon: Dumbbell, color: "text-retro-orange" },
  { name: "Weight Tracker", href: "/weight", icon: Scale, color: "text-retro-yellow" },
  { name: "Mental Journal", href: "/mental", icon: Brain, color: "text-retro-red" },
  { name: "Breathing Exercise", href: "/breathing", icon: Wind, color: "text-retro-blue" },
  { name: "Stretch Routine", href: "/stretching", icon: Stretch, color: "text-retro-orange" },
]

export function Navbar() {
  const { streak } = useHealth()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const pathname = usePathname()

  return (
    <header 
      className="h-16 border-b-4 border-retro-black bg-retro-white px-6 flex items-center justify-between shadow-pixel retro-navbar backdrop-blur-md transition-all duration-200"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:scale-[1.02] transition-transform"
          aria-label="HealthQuest Home"
        >
          <img src="/main_logo.png" alt="Main Logo" className="h-8 w-8 group-hover:scale-110 transition-transform pixel-border"/>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-pixel text-retro-black drop-shadow-[2px_2px_0px_#fff]">HealthQuest</span>
            <span className="text-xs text-retro-gray font-pixel">Your Wellness Adventure-Visualized, Motivated, Rewarded.</span>
          </div>
        </Link>
      </div>

      <nav className="flex items-center gap-4" role="navigation" aria-label="Main menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-4 border-retro-black shadow-pixel hover:bg-retro-blue hover:text-retro-white hover:scale-[1.02] transition-all duration-200 font-pixel"
              aria-label="Open trackers menu"
            >
              Suite of Trackers <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 border-4 border-retro-black shadow-pixel bg-retro-white"
          >
            <DropdownMenuLabel className="font-pixel text-retro-black">Health Trackers</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-retro-black" />
            {trackerMenuItems.map((item) => (
              <DropdownMenuItem 
                key={item.name} 
                asChild
                className={pathname === item.href ? "bg-retro-blue text-retro-white relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-retro-yellow after:rounded-full after:animate-pulse" : ""}
              >
                <Link 
                  href={item.href} 
                  className="cursor-pointer flex items-center gap-2 hover:bg-retro-blue hover:text-retro-white font-pixel"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="border-retro-black" />
            <DropdownMenuItem asChild>
              <Link 
                href="/" 
                className="cursor-pointer flex items-center gap-2 hover:bg-retro-blue hover:text-retro-white font-pixel"
                aria-current={pathname === "/" ? "page" : undefined}
              >
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
              className="text-retro-black hover:text-retro-white hover:bg-retro-blue hover:scale-[1.02] transition-all duration-200 border-4 border-retro-black shadow-pixel"
              aria-label="Open notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-none bg-retro-red border-2 border-retro-black"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 border-4 border-retro-black shadow-pixel bg-retro-white"
          >
            <DropdownMenuLabel className="font-pixel text-retro-black">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-retro-black" />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start py-2 cursor-pointer hover:bg-retro-blue hover:text-retro-white border-b-4 border-retro-black last:border-b-0 font-pixel"
              >
                <div className="font-bold">{notification.title}</div>
                <div className="text-sm">{notification.message}</div>
                <div className="text-xs mt-1">{notification.time}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          className="text-retro-black hover:text-retro-white hover:bg-retro-blue hover:scale-[1.02] transition-all duration-200 border-4 border-retro-black shadow-pixel"
          onClick={() => setShowHelp(true)}
          aria-label="Open help menu"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="text-retro-black hover:text-retro-white hover:bg-retro-blue hover:scale-[1.02] transition-all duration-200 border-4 border-retro-black shadow-pixel"
          onClick={() => setSettingsOpen(true)}
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </Button>

        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
          <SheetContent className="w-[300px] sm:w-[400px] border-l-4 border-retro-black shadow-pixel bg-retro-white">
            <SheetHeader>
              <SheetTitle className="font-pixel text-xl text-retro-black">Settings</SheetTitle>
              <SheetDescription className="font-pixel text-retro-gray">Customize your HealthQuest experience</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-pixel text-retro-black">Appearance</h3>
                <div className="flex items-center justify-between p-2 border-4 border-retro-black bg-retro-white hover:bg-retro-blue hover:text-retro-white transition-colors">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <Label htmlFor="theme-mode" className="font-pixel">
                      Dark Mode
                    </Label>
                  </div>
                  <Switch id="theme-mode" className="border-4 border-retro-black" />
                </div>
                <div className="flex items-center justify-between p-2 border-4 border-retro-black bg-retro-white hover:bg-retro-blue hover:text-retro-white transition-colors">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    <Label htmlFor="pixel-effects" className="font-pixel">
                      Pixel Effects
                    </Label>
                  </div>
                  <Switch id="pixel-effects" defaultChecked className="border-4 border-retro-black" />
                </div>
                <div className="flex items-center justify-between p-2 border-4 border-retro-black bg-retro-white hover:bg-retro-blue hover:text-retro-white transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <Label htmlFor="animations" className="font-pixel">
                      Animations
                    </Label>
                  </div>
                  <Switch id="animations" defaultChecked className="border-4 border-retro-black" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-pixel text-retro-black">Notifications</h3>
                <div className="flex items-center justify-between p-2 border-4 border-retro-black bg-retro-white hover:bg-retro-blue hover:text-retro-white transition-colors">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="push-notifications" className="font-pixel">
                      Push Notifications
                    </Label>
                  </div>
                  <Switch id="push-notifications" defaultChecked className="border-4 border-retro-black" />
                </div>
                <div className="flex items-center justify-between p-2 border-4 border-retro-black bg-retro-white hover:bg-retro-blue hover:text-retro-white transition-colors">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <Label htmlFor="sound-effects" className="font-pixel">
                      Sound Effects
                    </Label>
                  </div>
                  <Switch id="sound-effects" defaultChecked className="border-4 border-retro-black" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-pixel text-retro-black">Regional</h3>
                <div className="flex items-center justify-between p-2 border-4 border-retro-black bg-retro-white hover:bg-retro-blue hover:text-retro-white transition-colors">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <Label htmlFor="units" className="font-pixel">
                      Use Metric Units
                    </Label>
                  </div>
                  <Switch id="units" className="border-4 border-retro-black" />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={showHelp} onOpenChange={setShowHelp}>
          <SheetContent className="w-[300px] sm:w-[400px] border-l-4 border-retro-black shadow-pixel bg-retro-white">
            <SheetHeader>
              <SheetTitle className="font-pixel text-xl text-retro-black">Help & Tips</SheetTitle>
              <SheetDescription className="font-pixel text-retro-gray">Learn how to use HealthQuest</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-pixel text-retro-black">Quick Tips</h3>
                <div className="p-3 border-4 border-retro-black bg-retro-yellow">
                  <h4 className="font-pixel font-bold mb-1">Window Controls</h4>
                  <p className="text-sm font-pixel">Each tracker has minimize, maximize, and close buttons at the top right.</p>
                </div>
                <div className="p-3 border-4 border-retro-black bg-retro-yellow">
                  <h4 className="font-pixel font-bold mb-1">Streak Tracking</h4>
                  <p className="text-sm font-pixel">Complete daily activities to build your streak and earn achievements!</p>
                </div>
                <div className="p-3 border-4 border-retro-black bg-retro-yellow">
                  <h4 className="font-pixel font-bold mb-1">Keyboard Shortcuts</h4>
                  <p className="text-sm font-pixel">Press Ctrl+S to save, Ctrl+H to go home, Ctrl+F to search.</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
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
