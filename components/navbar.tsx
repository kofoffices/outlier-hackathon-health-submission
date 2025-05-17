"use client"

import { useState } from "react"
import { Bell, Search, Settings, User, LogOut, Sun, Moon, Volume2, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { StreakBadge } from "@/components/streak-badge"

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

export function Navbar() {
  const { searchTerm, setSearchTerm, streak } = useHealth()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-50 pl-9 border-gray-200 focus:border-blue-500 transition-all hover:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <StreakBadge streak={streak} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start py-2 cursor-pointer hover:bg-blue-50"
              >
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm text-gray-500">{notification.message}</div>
                <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>

        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
          <SheetContent className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>Customize your Health Tracker Pro experience</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Appearance</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <Label htmlFor="theme-mode">Dark Mode</Label>
                  </div>
                  <Switch id="theme-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    <Label htmlFor="reduce-motion">Reduce Motion</Label>
                  </div>
                  <Switch id="reduce-motion" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <Label htmlFor="sound-effects">Sound Effects</Label>
                  </div>
                  <Switch id="sound-effects" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Regional</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <Label htmlFor="units">Use Metric Units</Label>
                  </div>
                  <Switch id="units" />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:scale-[1.03] transition-transform">
              <div className="text-right">
                <p className="text-sm font-medium">Alex Johnson</p>
                <p className="text-xs text-gray-500">alex@example.com</p>
              </div>
              <Avatar className="hover:ring-2 hover:ring-blue-200 transition-all">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                <AvatarFallback className="bg-blue-100 text-blue-600">AJ</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
