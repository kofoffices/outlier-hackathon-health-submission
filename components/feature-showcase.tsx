"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Heart,
  Droplet,
  Moon,
  Apple,
  Dumbbell,
  Scale,
  Brain,
  Wind,
  StretchVerticalIcon as Stretch,
} from "lucide-react"
import { cn } from "@/lib/utils"

type FeatureProps = {
  title: string
  description: string
  icon: React.ReactNode
  image: string
  link: string
  color: string
  reversed?: boolean
}

function FeatureShowcase({ title, description, icon, image, link, color, reversed = false }: FeatureProps) {
  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16", reversed ? "md:flex-row-reverse" : "")}
    >
      <div className={cn("order-2", reversed ? "md:order-1" : "md:order-2")}>
        <div className="bg-white p-6 rounded-lg border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transform transition-transform hover:translate-y-[-5px]">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-auto rounded-md border-2 border-gray-800"
          />
        </div>
      </div>

      <div className={cn("order-1", reversed ? "md:order-2" : "md:order-1")}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className={cn(
              "p-4 rounded-full border-2 border-gray-800 transform transition-all duration-500 hover:scale-110 hover:rotate-6",
              color,
            )}
          >
            {React.cloneElement(icon as React.ReactElement, {
              className: `h-8 w-8 ${(icon as React.ReactElement).props.className} animate-pulse`,
            })}
          </div>
          <h2 className="text-3xl font-bold pixel-font">{title}</h2>
        </div>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">{description}</p>

        <Link href={link}>
          <Button
            className={cn(
              "text-lg px-6 py-6 border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-1 hover:translate-x-1 active:shadow-none active:translate-y-2 active:translate-x-2 transition-all duration-200",
              color.replace("bg-", "bg-").replace("-100", "-500").replace("text-", "text-white"),
            )}
          >
            Open {title} <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function FeatureShowcaseSection() {
  const features = [
    {
      title: "Mood Tracker",
      description:
        "Track your daily moods and discover patterns in your emotional well-being. Identify triggers and see how lifestyle changes affect your mental state.",
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      image: "/mood.jpg?height=300&width=500",
      link: "/mood",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Hydration Tracker",
      description:
        "Stay properly hydrated with our intuitive water intake tracker. Set daily goals, receive reminders, and visualize your hydration progress.",
      icon: <Droplet className="h-6 w-6 text-blue-600" />,
      image: "/hydration-2.jpg?height=300&width=500",
      link: "/hydration",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Sleep Tracker",
      description:
        "Improve your sleep quality by tracking duration, consistency, and quality. Discover how your sleep patterns affect your overall health.",
      icon: <Moon className="h-6 w-6 text-indigo-600" />,
      image: "/sleep.jpg?height=300&width=500",
      link: "/sleep",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Nutrition Tracker",
      description:
        "Monitor your daily food intake, track macros, and develop healthier eating habits. Our nutrition tracker makes it easy to maintain a balanced diet.",
      icon: <Apple className="h-6 w-6 text-green-600" />,
      image: "/nutrition.png?height=300&width=500",
      link: "/nutrition",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Fitness Checklist",
      description:
        "Stay on top of your exercise routine with our interactive fitness checklist. Set goals, track workouts, and celebrate your achievements.",
      icon: <Dumbbell className="h-6 w-6 text-purple-600" />,
      image: "/fitness.jpeg?height=300&width=500",
      link: "/fitness",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Weight Tracker",
      description:
        "Monitor your weight journey with our visual weight tracker. Set realistic goals and track your progress over time.",
      icon: <Scale className="h-6 w-6 text-teal-600" />,
      image: "/weight2.jpeg?height=300&width=500",
      link: "/weight",
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "Mental Journal",
      description:
        "Maintain your mental well-being with our journaling tool. Record thoughts, track mood patterns, and gain insights into your emotional health.",
      icon: <Brain className="h-6 w-6 text-rose-600" />,
      image: "/journal.jpg?height=300&width=500",
      link: "/mental",
      color: "bg-rose-100 text-rose-600",
    },
    {
      title: "Breathing Exercise",
      description:
        "Reduce stress and improve focus with guided breathing exercises. Perfect for quick relaxation breaks throughout your day.",
      icon: <Wind className="h-6 w-6 text-blue-600" />,
      image: "/breather.jpeg?height=300&width=500",
      link: "/breathing",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Stretch Routine",
      description:
        "Improve flexibility and prevent injuries with our customizable stretch routines. Perfect for before or after workouts, or as a standalone practice.",
      icon: <Stretch className="h-6 w-6 text-amber-600" />,
      image: "/stretch.jpeg?height=300&width=500",
      link: "/stretching",
      color: "bg-amber-100 text-amber-600",
    },
  ]

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold pixel-font mb-4">Comprehensive Health Tracking</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our suite of tracking tools helps you monitor every aspect of your health journey
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <FeatureShowcase key={feature.title} {...feature} reversed={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  )
}
