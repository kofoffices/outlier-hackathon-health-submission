"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Apple, Plus } from "lucide-react"
import { useHealth } from "@/components/health-provider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function NutritionTracker() {
  const { meals, addMeal } = useHealth()
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: 0,
    time: "",
    protein: 0,
    carbs: 0,
    fat: 0,
  })

  // Calculate total calories and macros
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0)
  const totalFat = meals.reduce((sum, meal) => sum + (meal.fat || 0), 0)

  const caloriesGoal = 2000
  const caloriesPercentage = (totalCalories / caloriesGoal) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMeal({
      ...newMeal,
      [name]: name === "name" || name === "time" ? value : Number(value),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMeal.name || !newMeal.time || newMeal.calories <= 0) {
      toast({
        title: "Invalid meal data",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    addMeal(newMeal)
    setIsDialogOpen(false)
    setNewMeal({
      name: "",
      calories: 0,
      time: "",
      protein: 0,
      carbs: 0,
      fat: 0,
    })

    toast({
      title: "Meal added",
      description: `${newMeal.name} has been added to your nutrition tracker.`,
    })
  }

  return (
    <>
      <Card className="shadow-sm hover:shadow-md transition-all duration-200 group">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Apple className="h-5 w-5 text-green-500" />
            Nutrition Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="group-hover:bg-green-50 rounded-b-lg transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Calories Consumed</p>
              <p className="text-2xl font-semibold">
                {totalCalories}
                <span className="text-sm font-normal text-gray-500"> / {caloriesGoal}</span>
              </p>
            </div>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Log Meal
            </Button>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(caloriesPercentage, 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-colors duration-200">
              <p className="text-xs text-gray-500">Protein</p>
              <p className="text-lg font-semibold text-green-600">{totalProtein}g</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
              <p className="text-xs text-gray-500">Carbs</p>
              <p className="text-lg font-semibold text-blue-600">{totalCarbs}g</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded-lg group-hover:bg-yellow-100 transition-colors duration-200">
              <p className="text-xs text-gray-500">Fat</p>
              <p className="text-lg font-semibold text-yellow-600">{totalFat}g</p>
            </div>
          </div>

          <h4 className="font-medium text-sm mb-2">Today's Meals</h4>
          <div className="space-y-2">
            {meals.map((meal, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-200 hover:scale-[1.02]"
              >
                <div>
                  <p className="font-medium text-sm">{meal.name}</p>
                  <p className="text-xs text-gray-500">{meal.time}</p>
                </div>
                <p className="text-sm font-medium">{meal.calories} cal</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log a Meal</DialogTitle>
            <DialogDescription>Enter the details of your meal to track your nutrition.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Meal Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newMeal.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  name="time"
                  value={newMeal.time}
                  onChange={handleInputChange}
                  placeholder="e.g. 8:30 AM"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="calories" className="text-right">
                  Calories
                </Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  value={newMeal.calories || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                  min="1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="protein" className="text-right">
                  Protein (g)
                </Label>
                <Input
                  id="protein"
                  name="protein"
                  type="number"
                  value={newMeal.protein || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carbs" className="text-right">
                  Carbs (g)
                </Label>
                <Input
                  id="carbs"
                  name="carbs"
                  type="number"
                  value={newMeal.carbs || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fat" className="text-right">
                  Fat (g)
                </Label>
                <Input
                  id="fat"
                  name="fat"
                  type="number"
                  value={newMeal.fat || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  min="0"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Add Meal
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
