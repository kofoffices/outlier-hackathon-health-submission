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

interface FeatureProps {
  title: string
  description: string
  icon: React.ReactElement<{ className?: string }>
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
        {/* Mac-inspired card design */}
        <div className="bg-white border border-gray-200/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out overflow-hidden flex flex-col transform hover:scale-[1.02]">
          {/* Title bar */}
          <div className="px-3 py-2 border-b border-gray-200/70 flex items-center justify-between bg-gray-50/60">
            <div className="flex items-center gap-1.5">
              {React.cloneElement(icon, {
                className: `h-4 w-4 ml-2 ${color.includes('pink') ? 'text-pink-600' : color.includes('blue') ? 'text-blue-600' : 'text-gray-600'} opacity-70`,
              })}
              <span className="text-xs font-pixel font-bold text-gray-700 opacity-90 tracking-wide">{title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full opacity-80"></span>
              <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-80"></span>
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full opacity-80"></span>
            </div>
          </div>
          
          {/* Image Container */}
          <div className="relative">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-auto object-cover aspect-[16/10] transition-all duration-300 group-hover:scale-[1.03] group-hover:brightness-110"
            />
            
            {/* Badge overlay */}
            <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 shadow text-xs font-pixel text-gray-700 border border-gray-200">
              {React.cloneElement(icon, {
                className: "h-3 w-3 text-yellow-400",
              })}
              {title.replace(/ Tracker| Checklist| Routine| Exercises| Journal/g, "")} XP
            </div>
          </div>
        </div>
      </div>

      <div className={cn("order-1", reversed ? "md:order-2" : "md:order-1")}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className={cn(
              "p-4 rounded-xl border-2 border-gray-800 transform transition-all duration-500 hover:scale-110 hover:rotate-6 shadow-lg",
              color,
            )}
          >
            {React.cloneElement(icon, {
              className: `h-8 w-8 ${icon.props.className}`,
            })}
          </div>
          <h2 className="text-3xl font-bold font-pixel">{title}</h2>
        </div>

        <p className="text-xl text-retro-gray mb-8 leading-relaxed font-pixel">{description}</p>

        <Link href={link}>
          <Button
            className={cn(
              "text-lg px-6 py-6 rounded-lg border-2 border-gray-800 shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:shadow-md active:translate-y-0 transition-all duration-200 font-pixel group",
              color.replace("bg-", "bg-").replace("-100", "-500").replace("text-", "text-retro-white"),
            )}
          >
            Open {title} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
      icon: <Heart className="h-8 w-8 text-retro-blue stroke-[2]" />,
      image: "/mood.jpg?height=300&width=500",
      link: "/mood",
      color: "bg-retro-pink text-retro-blue",
    },
    {
      title: "Hydration Tracker",
      description:
        "Stay properly hydrated with our intuitive water intake tracker. Set daily goals, receive reminders, and visualize your hydration progress.",
      icon: <Droplet className="h-8 w-8 text-retro-pink stroke-[2]" />,
      image: "/hydration-2.jpg?height=300&width=500",
      link: "/hydration",
      color: "bg-retro-blue text-retro-pink",
    },
    {
      title: "Sleep Tracker",
      description:
        "Improve your sleep quality by tracking duration, consistency, and quality. Discover how your sleep patterns affect your overall health.",
      icon: <Moon className="h-8 w-8 text-retro-yellow stroke-[2]" />,
      image: "/sleep.jpg?height=300&width=500",
      link: "/sleep",
      color: "bg-retro-purple text-retro-yellow",
    },
    {
      title: "Nutrition Tracker",
      description:
        "Monitor your daily food intake, track macros, and develop healthier eating habits. Our nutrition tracker makes it easy to maintain a balanced diet.",
      icon: <Apple className="h-8 w-8 text-retro-pink stroke-[2]" />,
      image: "/nutrition.png?height=300&width=500",
      link: "/nutrition",
      color: "bg-retro-green text-retro-pink",
    },
    {
      title: "Fitness Checklist",
      description:
        "Stay on top of your exercise routine with our interactive fitness checklist. Set goals, track workouts, and celebrate your achievements.",
      icon: <Dumbbell className="h-8 w-8 text-retro-blue stroke-[2]" />,
      image: "/fitness.jpeg?height=300&width=500",
      link: "/fitness",
      color: "bg-retro-orange text-retro-blue",
    },
    {
      title: "Weight Tracker",
      description:
        "Monitor your weight journey with our visual weight tracker. Set realistic goals and track your progress over time.",
      icon: <Scale className="h-8 w-8 text-retro-purple stroke-[2]" />,
      image: "/weight2.jpeg?height=300&width=500",
      link: "/weight",
      color: "bg-retro-yellow text-retro-purple",
    },
    {
      title: "Mental Journal",
      description:
        "Maintain your mental well-being with our journaling tool. Record thoughts, track mood patterns, and gain insights into your emotional health.",
      icon: <Brain className="h-8 w-8 text-retro-green stroke-[2]" />,
      image: "/journal.jpg?height=300&width=500",
      link: "/mental",
      color: "bg-retro-red text-retro-green",
    },
    {
      title: "Breathing Exercise",
      description:
        "Reduce stress and improve focus with guided breathing exercises. Perfect for quick relaxation breaks throughout your day.",
      icon: <Wind className="h-8 w-8 text-retro-yellow stroke-[2]" />,
      image: "/breather.jpeg?height=300&width=500",
      link: "/breathing",
      color: "bg-retro-blue text-retro-yellow",
    },
    {
      title: "Stretch Routine",
      description:
        "Improve flexibility and prevent injuries with our customizable stretch routines. Perfect for before or after workouts, or as a standalone practice.",
      icon: <Stretch className="h-8 w-8 text-retro-purple stroke-[2]" />,
      image: "/stretch.jpeg?height=300&width=500",
      link: "/stretching",
      color: "bg-retro-orange text-retro-purple",
    },
  ];   

  return (
    <div className="py-12 bg-gradient-to-b from-retro-light-gray to-retro-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-pixel mb-4">Comprehensive Health Tracking</h2>
          <p className="text-xl text-retro-gray max-w-3xl mx-auto font-pixel">
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
