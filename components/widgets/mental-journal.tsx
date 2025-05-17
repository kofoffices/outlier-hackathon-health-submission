"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Brain, Plus, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { RetroWindow } from "@/components/ui/retro-window"

// Define the type for journal entries
type JournalEntry = {
  id: number
  date: string
  title: string
  excerpt: string
  content: string
  tags: string[]
}

// Mock data for journal entries
const defaultJournalEntries: JournalEntry[] = [
  {
    id: 1,
    date: "May 30, 2023",
    title: "Morning Reflection",
    excerpt: "Today I woke up feeling refreshed and motivated. I'm looking forward to...",
    content:
      "Today I woke up feeling refreshed and motivated. I'm looking forward to tackling my to-do list and making progress on my personal projects. The weather is beautiful, which always helps my mood.",
    tags: ["Positive", "Morning", "Goals"],
  },
  {
    id: 2,
    date: "May 28, 2023",
    title: "Work Stress",
    excerpt: "The project deadline is approaching and I'm feeling some pressure...",
    content:
      "The project deadline is approaching and I'm feeling some pressure. I need to remember to take breaks and practice my breathing exercises. I'll make a detailed plan tomorrow to help manage my time better.",
    tags: ["Stress", "Work", "Coping"],
  },
  {
    id: 3,
    date: "May 25, 2023",
    title: "Weekend Plans",
    excerpt: "I'm excited about the upcoming weekend. Planning to go hiking and...",
    content:
      "I'm excited about the upcoming weekend. Planning to go hiking and maybe try that new restaurant downtown. It's important to have these things to look forward to when work gets busy.",
    tags: ["Excited", "Plans", "Outdoors"],
  },
]

// Predefined tag suggestions
const tagSuggestions = [
  "Positive",
  "Negative",
  "Neutral",
  "Morning",
  "Evening",
  "Work",
  "Personal",
  "Health",
  "Relationships",
  "Goals",
  "Stress",
  "Relaxed",
  "Anxious",
  "Happy",
  "Sad",
  "Excited",
  "Tired",
  "Energetic",
  "Grateful",
  "Frustrated",
]

export function MentalJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    tags: "",
  })
  const [moodTrends, setMoodTrends] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])
  const { toast } = useToast()

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    } else {
      // Use default entries if nothing is saved
      setEntries(defaultJournalEntries)
    }

    // Generate mood trends based on entries
    updateMoodTrends()
  }, [])

  // Update mood trends when entries change
  useEffect(() => {
    updateMoodTrends()
    // Save entries to localStorage
    localStorage.setItem("journalEntries", JSON.stringify(entries))
  }, [entries])

  // Handle input changes for the new entry form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEntry({
      ...newEntry,
      [name]: value,
    })
  }

  // Add a tag from suggestions
  const addTag = (tag: string) => {
    const currentTags = newEntry.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t)
    if (!currentTags.includes(tag)) {
      const updatedTags = [...currentTags, tag].join(", ")
      setNewEntry({
        ...newEntry,
        tags: updatedTags,
      })
    }
  }

  // Save a new journal entry
  const saveEntry = () => {
    if (!newEntry.title || !newEntry.content) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your journal entry.",
        variant: "destructive",
      })
      return
    }

    // Format the tags
    const formattedTags = newEntry.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    // Create a new entry
    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const newJournalEntry: JournalEntry = {
      id: Date.now(),
      date: formattedDate,
      title: newEntry.title,
      excerpt: newEntry.content.substring(0, 100) + (newEntry.content.length > 100 ? "..." : ""),
      content: newEntry.content,
      tags: formattedTags,
    }

    // Add the new entry to the beginning of the list
    const updatedEntries = [newJournalEntry, ...entries]
    setEntries(updatedEntries)

    // Reset the form and close the dialog
    setNewEntry({
      title: "",
      content: "",
      tags: "",
    })
    setIsDialogOpen(false)

    toast({
      title: "Entry saved",
      description: "Your journal entry has been saved successfully.",
    })
  }

  // Update mood trends based on entry tags
  const updateMoodTrends = () => {
    // This is a simplified version - in a real app, you might want to use actual dates
    // and more sophisticated mood analysis
    const moodMap: Record<string, number> = {
      Happy: 4,
      Excited: 4,
      Positive: 3,
      Grateful: 3,
      Relaxed: 3,
      Neutral: 2,
      Tired: 1,
      Sad: 1,
      Anxious: 1,
      Stressed: 0,
      Frustrated: 0,
      Negative: 0,
    }

    // Generate random mood trends for demo purposes
    // In a real app, you would analyze the entries by day and extract mood information
    const newTrends = Array(7)
      .fill(0)
      .map(() => Math.floor(Math.random() * 5))
    setMoodTrends(newTrends)
  }

  return (
    <>
      <RetroWindow
        title="Mental Journal"
        icon={<Brain className="h-4 w-4 text-rose-500" />}
        variant="rose"
        className="transition-all duration-200"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-700 font-bold">Recent Entries</p>
          <Button
            size="sm"
            className="bg-rose-500 hover:bg-rose-600 hover:scale-[1.03] transition-all duration-200 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-[1px] hover:translate-x-[1px]"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            New Entry
          </Button>
        </div>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-md border-2 border-gray-800 hover:border-rose-400 hover:bg-rose-50 transition-all duration-200 cursor-pointer hover:scale-[1.02] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold">{entry.title}</h4>
                <p className="text-xs text-gray-700 font-bold">{entry.date}</p>
              </div>
              <p className="text-sm text-gray-700 mb-2 line-clamp-2 font-medium">{entry.excerpt}</p>
              <div className="flex flex-wrap gap-1">
                {entry.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs bg-rose-50 text-rose-600 border-2 border-gray-800 hover:bg-rose-100 transition-colors duration-200 font-bold"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-300">
          <h4 className="font-bold text-sm mb-2">Mood Trends</h4>
          <div className="flex items-center gap-1 border-2 border-gray-800 p-2 rounded-md bg-white">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const moodColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-green-500"]
              const moodIndex = moodTrends[i]
              return (
                <div key={day} className="flex flex-col items-center flex-1 group/bar">
                  <div
                    className={`w-full rounded-t-sm border-2 border-gray-800 border-b-0 ${moodColors[moodIndex]} group-hover/bar:scale-y-110 transition-transform duration-200`}
                    style={{ height: `${(moodIndex + 1) * 8}px` }}
                  />
                  <span className="text-xs mt-1 font-bold">{day}</span>
                </div>
              )
            })}
          </div>
        </div>
      </RetroWindow>

      {/* Dialog for creating a new journal entry */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <DialogHeader>
            <DialogTitle className="font-bold">New Journal Entry</DialogTitle>
            <DialogDescription>Record your thoughts, feelings, and experiences.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-bold">
                Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="Give your entry a title"
                value={newEntry.title}
                onChange={handleInputChange}
                className="border-2 border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-bold">
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your thoughts here..."
                rows={6}
                value={newEntry.content}
                onChange={handleInputChange}
                className="resize-none border-2 border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-bold">
                Tags (comma separated)
              </label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g. Happy, Work, Goals"
                value={newEntry.tags}
                onChange={handleInputChange}
                className="border-2 border-gray-800"
              />

              <div className="mt-2">
                <p className="text-xs text-gray-700 mb-2 font-bold">Suggested tags:</p>
                <div className="flex flex-wrap gap-1">
                  {tagSuggestions.slice(0, 10).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs bg-rose-50 text-rose-600 border-2 border-gray-800 hover:bg-rose-100 transition-colors duration-200 cursor-pointer font-bold"
                      onClick={() => addTag(tag)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={saveEntry}
              className="bg-rose-500 hover:bg-rose-600 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
            >
              Save Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
