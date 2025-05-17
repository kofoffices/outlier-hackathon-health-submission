"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Dumbbell, Timer, Plus } from "lucide-react"
import { useHealth } from "@/components/health-provider"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function FitnessChecklist() {
  const { exercises, addExercise, toggleExercise } = useHealth()
  const { toast } = useToast()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [newExercise, setNewExercise] = useState({
    name: "",
    duration: 0,
    description: "",
  })

  const completedCount = exercises.filter((ex) => ex.completed).length
  const totalCount = exercises.length
  const progressPercentage = (completedCount / totalCount) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExercise({
      ...newExercise,
      [name]: name === "duration" ? Number(value) : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExercise.name || newExercise.duration <= 0) {
      toast({
        title: "Invalid exercise data",
        description: "Please provide a name and duration.",
        variant: "destructive",
      })
      return
    }

    addExercise(newExercise)
    setIsSheetOpen(false)
    setNewExercise({
      name: "",
      duration: 0,
      description: "",
    })

    toast({
      title: "Exercise added",
      description: `${newExercise.name} has been added to your fitness checklist.`,
    })
  }

  return (
    <>
      <Card className="shadow-sm hover:shadow-md transition-all duration-200 group">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-purple-500" />
            Fitness Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="group-hover:bg-purple-50 rounded-b-lg transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Today's Progress</p>
              <p className="text-lg font-semibold">
                {completedCount} <span className="text-gray-500">/ {totalCount} exercises</span>
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-100 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-offset-2"
              onClick={() => setIsSheetOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Exercise
            </Button>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-purple-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="space-y-3">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                  exercise.completed
                    ? "bg-purple-50 border-purple-200 group-hover:bg-purple-100"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={exercise.completed}
                    onCheckedChange={() => toggleExercise(exercise.id)}
                    className="border-purple-300 data-[state=checked]:bg-purple-500 focus:ring-2 focus:ring-purple-200 focus:ring-offset-2"
                  />
                  <div>
                    <p className={`font-medium ${exercise.completed ? "line-through text-gray-500" : ""}`}>
                      {exercise.name}
                    </p>
                    <p className="text-xs text-gray-500">{exercise.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Timer className="h-3.5 w-3.5 mr-1" />
                  {exercise.duration} min
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Weekly Goal</p>
                <p className="text-lg font-semibold text-purple-600">
                  4 <span className="text-sm font-normal">/ 7 days</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Calories Burned</p>
                <p className="text-lg font-semibold text-purple-600">
                  320 <span className="text-sm font-normal">kcal</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add Exercise</SheetTitle>
            <SheetDescription>Add a new exercise to your fitness checklist.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Exercise Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Morning Run"
                  value={newExercise.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="30"
                  value={newExercise.duration || ""}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Brief description of the exercise"
                  value={newExercise.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                Add Exercise
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}
