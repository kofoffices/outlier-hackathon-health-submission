"use client"

import { useState, useEffect } from "react"
import { Lightbulb, Quote, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HealthFactType = {
  fact: string
  source?: string
}

type HealthQuoteType = {
  quote: string
  author: string
}

type HealthGoalType = {
  goal: string
  description: string
}

interface HealthFactsProps {
  category: "mood" | "hydration" | "sleep" | "nutrition" | "fitness" | "weight" | "mental" | "breathing" | "stretching"
}

export function HealthFacts({ category }: HealthFactsProps) {
  const [currentFact, setCurrentFact] = useState<number>(0)
  const [currentQuote, setCurrentQuote] = useState<number>(0)
  const [currentGoal, setCurrentGoal] = useState<number>(0)

  // Facts for each category
  const factsByCategory: Record<string, HealthFactType[]> = {
    mood: [
      {
        fact: "Your mood can significantly impact your immune system function.",
        source: "Journal of Behavioral Medicine",
      },
      {
        fact: "Smiling, even when forced, can actually improve your mood by triggering endorphin release.",
        source: "Psychological Science",
      },
      {
        fact: "People who track their mood regularly report 30% better emotional regulation.",
        source: "American Psychological Association",
      },
    ],
    hydration: [
      {
        fact: "Even mild dehydration (1-2% of body weight) can impair cognitive performance.",
        source: "Journal of the American College of Nutrition",
      },
      {
        fact: "Proper hydration can reduce the risk of kidney stones by up to 39%.",
        source: "National Kidney Foundation",
      },
      {
        fact: "Drinking water before meals can reduce calorie intake and support weight management.",
        source: "Obesity Research",
      },
    ],
    sleep: [
      {
        fact: "Adults who sleep less than 7 hours per night have a 13% higher mortality risk.",
        source: "Sleep Research Society",
      },
      {
        fact: "The brain clears out toxins during deep sleep that build up while you're awake.",
        source: "Science Magazine",
      },
      {
        fact: "Consistent sleep schedules can improve your overall sleep quality by up to 50%.",
        source: "Sleep Foundation",
      },
    ],
    nutrition: [
      {
        fact: "Eating a diet rich in fruits and vegetables can lower blood pressure by up to 11%.",
        source: "American Heart Association",
      },
      { fact: "Consuming adequate protein helps maintain muscle mass as you age.", source: "Journal of Nutrition" },
      {
        fact: "Omega-3 fatty acids found in fish can reduce inflammation and lower heart disease risk.",
        source: "Harvard Health",
      },
    ],
    fitness: [
      {
        fact: "Just 30 minutes of moderate exercise 5 days a week can add years to your life.",
        source: "American College of Sports Medicine",
      },
      {
        fact: "Regular strength training can increase your resting metabolic rate by up to 7%.",
        source: "Journal of Applied Physiology",
      },
      {
        fact: "Exercise has been shown to be as effective as medication for treating mild to moderate depression.",
        source: "Harvard Medical School",
      },
    ],
    weight: [
      {
        fact: "People who weigh themselves regularly are more successful at maintaining weight loss.",
        source: "Journal of Obesity",
      },
      {
        fact: "Muscle weighs more than fat, so the scale may not reflect your fitness improvements.",
        source: "American Council on Exercise",
      },
      {
        fact: "Small, consistent weight loss (1-2 lbs per week) is more sustainable than rapid weight loss.",
        source: "CDC",
      },
    ],
    mental: [
      {
        fact: "Journaling for just 15 minutes a day can reduce stress and improve mental clarity.",
        source: "Journal of Experimental Psychology",
      },
      {
        fact: "Practicing gratitude is linked to increased happiness and reduced depression.",
        source: "Positive Psychology Research",
      },
      {
        fact: "Regular mindfulness practice can physically change brain structure in areas related to attention and emotion.",
        source: "Harvard Neuroscience",
      },
    ],
    breathing: [
      {
        fact: "Deep breathing activates the parasympathetic nervous system, reducing stress hormones.",
        source: "American Institute of Stress",
      },
      {
        fact: "Controlled breathing exercises can lower blood pressure by 3-5 mm Hg.",
        source: "Journal of Hypertension",
      },
      {
        fact: "Breathing through your nose filters, warms, and humidifies air before it reaches your lungs.",
        source: "Respiratory Physiology",
      },
    ],
    stretching: [
      {
        fact: "Regular stretching can increase your range of motion by up to 18%.",
        source: "Journal of Physical Therapy",
      },
      {
        fact: "Dynamic stretching before exercise can improve performance and reduce injury risk.",
        source: "Sports Medicine",
      },
      {
        fact: "Stretching increases blood flow to muscles, which can speed up recovery after workouts.",
        source: "International Journal of Sports Physical Therapy",
      },
    ],
  }

  // Quotes for each category
  const quotesByCategory: Record<string, HealthQuoteType[]> = {
    mood: [
      { quote: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
      {
        quote: "The greatest weapon against stress is our ability to choose one thought over another.",
        author: "William James",
      },
    ],
    hydration: [
      { quote: "Water is the driving force of all nature.", author: "Leonardo da Vinci" },
      { quote: "Thousands have lived without love, not one without water.", author: "W.H. Auden" },
    ],
    sleep: [
      { quote: "Sleep is the golden chain that ties health and our bodies together.", author: "Thomas Dekker" },
      { quote: "A good laugh and a long sleep are the best cures in the doctor's book.", author: "Irish Proverb" },
    ],
    nutrition: [
      { quote: "Let food be thy medicine and medicine be thy food.", author: "Hippocrates" },
      {
        quote:
          "The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison.",
        author: "Ann Wigmore",
      },
    ],
    fitness: [
      { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
      {
        quote:
          "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.",
        author: "John F. Kennedy",
      },
    ],
    weight: [
      { quote: "The groundwork for all happiness is health.", author: "Leigh Hunt" },
      { quote: "Your body is a reflection of your lifestyle.", author: "Unknown" },
    ],
    mental: [
      {
        quote: "You don't have to control your thoughts. You just have to stop letting them control you.",
        author: "Dan Millman",
      },
      {
        quote: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
        author: "Noam Shpancer",
      },
    ],
    breathing: [
      {
        quote: "Breath is the bridge which connects life to consciousness, which unites your body to your thoughts.",
        author: "Thich Nhat Hanh",
      },
      { quote: "When you own your breath, nobody can steal your peace.", author: "Unknown" },
    ],
    stretching: [
      {
        quote: "Flexibility is not about touching your toes, it's about what you learn on the way down.",
        author: "Unknown",
      },
      {
        quote:
          "The body will become better at whatever you do, or don't do. If you don't move, your body will make you better at not moving. If you move, your body will allow more movement.",
        author: "Ido Portal",
      },
    ],
  }

  // Goals for each category
  const goalsByCategory: Record<string, HealthGoalType[]> = {
    mood: [
      {
        goal: "Practice daily gratitude",
        description: "Write down three things you're grateful for each day to improve your mood.",
      },
      {
        goal: "Limit social media",
        description: "Reduce social media use to 30 minutes daily to decrease anxiety and improve mood.",
      },
    ],
    hydration: [
      {
        goal: "Drink 8 cups daily",
        description: "Aim for at least 8 cups (64 oz) of water each day for optimal hydration.",
      },
      {
        goal: "Start your day with water",
        description: "Drink a full glass of water first thing in the morning to rehydrate after sleep.",
      },
    ],
    sleep: [
      {
        goal: "Consistent sleep schedule",
        description: "Go to bed and wake up at the same time every day, even on weekends.",
      },
      {
        goal: "Create a bedtime routine",
        description: "Develop a 30-minute wind-down routine before bed to signal your body it's time to sleep.",
      },
    ],
    nutrition: [
      {
        goal: "Eat 5 servings of vegetables",
        description: "Include at least 5 servings of different colored vegetables in your daily diet.",
      },
      {
        goal: "Reduce processed foods",
        description: "Limit processed foods to less than 20% of your total daily caloric intake.",
      },
    ],
    fitness: [
      {
        goal: "Move for 30 minutes daily",
        description: "Aim for at least 30 minutes of moderate physical activity every day.",
      },
      {
        goal: "Strength train twice weekly",
        description: "Include two strength training sessions each week to build and maintain muscle mass.",
      },
    ],
    weight: [
      {
        goal: "Focus on body composition",
        description: "Track body measurements and how clothes fit rather than just the number on the scale.",
      },
      {
        goal: "Set realistic targets",
        description: "Aim for sustainable weight changes of 1-2 pounds per week maximum.",
      },
    ],
    mental: [
      {
        goal: "Daily mindfulness practice",
        description: "Spend 10 minutes each day in mindful meditation to reduce stress and anxiety.",
      },
      {
        goal: "Weekly digital detox",
        description: "Take one day each week to disconnect from digital devices and reconnect with yourself.",
      },
    ],
    breathing: [
      {
        goal: "Practice 4-7-8 breathing",
        description: "Do the 4-7-8 breathing exercise (inhale for 4, hold for 7, exhale for 8) twice daily.",
      },
      {
        goal: "Breathing breaks",
        description: "Take three 2-minute breathing breaks throughout your workday to reduce stress.",
      },
    ],
    stretching: [
      {
        goal: "Morning stretch routine",
        description: "Start each day with a 5-minute full-body stretch to improve circulation and flexibility.",
      },
      {
        goal: "Stretch major muscle groups",
        description: "Hold stretches for each major muscle group for 30 seconds at least 3 times per week.",
      },
    ],
  }

  // Rotate through facts, quotes, and goals
  useEffect(() => {
    const interval = setInterval(() => {
      if (factsByCategory[category]) {
        setCurrentFact((prev) => (prev + 1) % factsByCategory[category].length)
      }
      if (quotesByCategory[category]) {
        setCurrentQuote((prev) => (prev + 1) % quotesByCategory[category].length)
      }
      if (goalsByCategory[category]) {
        setCurrentGoal((prev) => (prev + 1) % goalsByCategory[category].length)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [category])

  // Get current items
  const facts = factsByCategory[category] || []
  const quotes = quotesByCategory[category] || []
  const goals = goalsByCategory[category] || []

  const fact = facts[currentFact]
  const quote = quotes[currentQuote]
  const goal = goals[currentGoal]

  // Get colors based on category
  const getCategoryColors = () => {
    switch (category) {
      case "mood":
        return { bg: "bg-pink-50", border: "border-pink-300", text: "text-pink-800" }
      case "hydration":
        return { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-800" }
      case "sleep":
        return { bg: "bg-indigo-50", border: "border-indigo-300", text: "text-indigo-800" }
      case "nutrition":
        return { bg: "bg-green-50", border: "border-green-300", text: "text-green-800" }
      case "fitness":
        return { bg: "bg-purple-50", border: "border-purple-300", text: "text-purple-800" }
      case "weight":
        return { bg: "bg-teal-50", border: "border-teal-300", text: "text-teal-800" }
      case "mental":
        return { bg: "bg-rose-50", border: "border-rose-300", text: "text-rose-800" }
      case "breathing":
        return { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-800" }
      case "stretching":
        return { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-800" }
      default:
        return { bg: "bg-gray-50", border: "border-gray-300", text: "text-gray-800" }
    }
  }

  const colors = getCategoryColors()

  return (
    <div className="space-y-6 mt-8">
      {/* Did You Know Section */}
      {fact && (
        <div
          className={cn(
            "p-4 rounded-md border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-300",
            colors.bg,
          )}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className={cn("h-6 w-6 mt-1", colors.text)} />
            <div>
              <h3 className="font-bold pixel-font text-lg mb-1">Did You Know?</h3>
              <p className="text-sm font-medium mb-1">{fact.fact}</p>
              {fact.source && <p className="text-xs italic">Source: {fact.source}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Quote Section */}
      {quote && (
        <div
          className={cn(
            "p-4 rounded-md border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-300",
            colors.bg,
          )}
        >
          <div className="flex items-start gap-3">
            <Quote className={cn("h-6 w-6 mt-1", colors.text)} />
            <div>
              <h3 className="font-bold pixel-font text-lg mb-1">Inspiration</h3>
              <p className="text-sm font-medium italic mb-1">"{quote.quote}"</p>
              <p className="text-xs text-right">— {quote.author}</p>
            </div>
          </div>
        </div>
      )}

      {/* Goal Section */}
      {goal && (
        <div
          className={cn(
            "p-4 rounded-md border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-300",
            colors.bg,
          )}
        >
          <div className="flex items-start gap-3">
            <Target className={cn("h-6 w-6 mt-1", colors.text)} />
            <div>
              <h3 className="font-bold pixel-font text-lg mb-1">Goal Suggestion</h3>
              <p className="text-sm font-bold mb-1">{goal.goal}</p>
              <p className="text-sm">{goal.description}</p>
              <Button
                variant="outline"
                size="sm"
                className={cn("mt-2 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]", colors.bg)}
              >
                Add to My Goals <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
