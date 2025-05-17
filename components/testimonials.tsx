"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type TestimonialType = {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  text: string
  feature: string
}

const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "HealthQuest completely changed my approach to fitness. The mood tracker helped me see how exercise affects my mental health, and the hydration reminders keep me on track daily!",
    feature: "mood",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Developer",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "As someone who sits at a desk all day, the breathing exercises and stretch reminders have been a game-changer for my productivity and back pain. The retro interface is also super fun!",
    feature: "breathing",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Yoga Instructor",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
    text: "I recommend HealthQuest to all my yoga students. The sleep tracker has helped me optimize my rest, and the mental journal provides valuable insights into my emotional patterns.",
    feature: "sleep",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Marathon Runner",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The nutrition tracker is perfect for monitoring my macros during training. I've seen significant improvements in my recovery time since I started using the app consistently.",
    feature: "nutrition",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Medical Student",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
    text: "The mental health journaling feature has been essential during my stressful med school days. I love how the app connects physical and mental wellness in such a thoughtful way.",
    feature: "mental",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const getFeatureColor = (feature: string) => {
    switch (feature) {
      case "mood":
        return "bg-retro-pink text-retro-white"
      case "hydration":
        return "bg-retro-blue text-retro-white"
      case "sleep":
        return "bg-retro-purple text-retro-white"
      case "nutrition":
        return "bg-retro-green text-retro-white"
      case "fitness":
        return "bg-retro-yellow text-retro-black"
      case "weight":
        return "bg-retro-cyan text-retro-white"
      case "mental":
        return "bg-retro-orange text-retro-white"
      case "breathing":
        return "bg-retro-blue text-retro-white"
      case "stretching":
        return "bg-retro-yellow text-retro-black"
      default:
        return "bg-retro-gray text-retro-white"
    }
  }

  return (
    <div className="py-12 px-4 bg-retro-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-pixel mb-2 text-retro-black">What Our Users Say</h2>
        <p className="text-retro-gray max-w-2xl mx-auto font-pixel">
          Join thousands of users who have transformed their health journey with HealthQuest
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div
            className={cn(
              "transition-all duration-500 transform",
              isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100",
            )}
          >
            <div className="bg-retro-white p-6 rounded-none border-4 border-retro-black shadow-pixel">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <Avatar className="h-20 w-20 border-4 border-retro-black shadow-pixel">
                    <AvatarImage
                      src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                    />
                    <AvatarFallback className="bg-retro-blue text-retro-white font-pixel text-xl">
                      {testimonials[activeIndex].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < testimonials[activeIndex].rating ? "text-retro-yellow fill-retro-yellow" : "text-retro-gray",
                        )}
                      />
                    ))}
                    <span
                      className={cn(
                        "ml-2 text-xs px-2 py-1 rounded-none border-2 border-retro-black font-pixel",
                        getFeatureColor(testimonials[activeIndex].feature),
                      )}
                    >
                      {testimonials[activeIndex].feature.charAt(0).toUpperCase() +
                        testimonials[activeIndex].feature.slice(1)}{" "}
                      Tracker
                    </span>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-retro-gray opacity-50" />
                    <p className="text-retro-black italic mb-4 pl-4 font-pixel">"{testimonials[activeIndex].text}"</p>
                  </div>
                  <div className="font-bold font-pixel text-retro-black">{testimonials[activeIndex].name}</div>
                  <div className="text-sm text-retro-gray font-pixel">{testimonials[activeIndex].role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="border-4 border-retro-black shadow-pixel hover:bg-retro-blue hover:text-retro-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-1 items-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-none transition-all",
                  index === activeIndex ? "bg-retro-blue w-4" : "bg-retro-gray",
                )}
                onClick={() => {
                  setIsAnimating(true)
                  setActiveIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="border-4 border-retro-black shadow-pixel hover:bg-retro-blue hover:text-retro-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
