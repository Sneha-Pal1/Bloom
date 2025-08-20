"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Play, Clock, Users } from "lucide-react"
import Image from "next/image"
import { ProtectedAction } from "@/components/protected-action"

interface Pose {
  id: string
  name: string
  benefit: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  selected?: boolean
}

interface Category {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgGradient: string
  yoga: Pose[]
  exercises: Pose[]
}

const categories: Category[] = [
  {
    id: "overall-health",
    title: "Overall Women's Health",
    description: "Holistic practices to support your body's natural balance and vitality",
    icon: <Heart className="h-6 w-6" />,
    color: "text-pink-600",
    bgGradient: "from-pink-50 to-rose-100",
    yoga: [
      {
        id: "cat-cow",
        name: "Cat-Cow Pose",
        benefit: "Improves spinal flexibility and relieves tension",
        duration: "5-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "warrior-ii",
        name: "Warrior II",
        benefit: "Builds strength and confidence",
        duration: "3-5 mins",
        difficulty: "Intermediate",
      },
      {
        id: "tree-pose",
        name: "Tree Pose",
        benefit: "Enhances balance and focus",
        duration: "2-4 mins",
        difficulty: "Beginner",
      },
      {
        id: "bridge-pose",
        name: "Bridge Pose",
        benefit: "Strengthens core and opens heart",
        duration: "3-6 mins",
        difficulty: "Beginner",
      },
    ],
    exercises: [
      {
        id: "pelvic-tilts",
        name: "Pelvic Tilts",
        benefit: "Strengthens core and improves posture",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "wall-sits",
        name: "Wall Sits",
        benefit: "Builds leg strength and endurance",
        duration: "3-8 mins",
        difficulty: "Intermediate",
      },
      {
        id: "modified-planks",
        name: "Modified Planks",
        benefit: "Core strengthening without strain",
        duration: "2-5 mins",
        difficulty: "Beginner",
      },
    ],
  },
  {
    id: "irregular-periods",
    title: "Late & Irregular Periods",
    description: "Gentle movements to support hormonal balance and cycle regulation",
    icon: <Heart className="h-6 w-6" />,
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-lavender-100",
    yoga: [
      {
        id: "butterfly-pose",
        name: "Butterfly Pose",
        benefit: "Stimulates reproductive organs and improves circulation",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "seated-forward-fold",
        name: "Seated Forward Fold",
        benefit: "Calms nervous system and supports hormone balance",
        duration: "3-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "legs-up-wall",
        name: "Legs Up the Wall",
        benefit: "Improves circulation and reduces stress",
        duration: "10-15 mins",
        difficulty: "Beginner",
      },
      {
        id: "camel-pose",
        name: "Camel Pose",
        benefit: "Opens heart and stimulates thyroid",
        duration: "2-5 mins",
        difficulty: "Advanced",
      },
    ],
    exercises: [
      {
        id: "hip-circles",
        name: "Hip Circles",
        benefit: "Improves pelvic circulation",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "gentle-twists",
        name: "Gentle Spinal Twists",
        benefit: "Massages internal organs",
        duration: "5-8 mins",
        difficulty: "Beginner",
      },
    ],
  },
  {
    id: "pcos",
    title: "PCOS Support",
    description: "Targeted practices to manage PCOS symptoms and support metabolic health",
    icon: <Heart className="h-6 w-6" />,
    color: "text-green-600",
    bgGradient: "from-green-50 to-mint-100",
    yoga: [
      {
        id: "sun-salutation",
        name: "Sun Salutation (Modified)",
        benefit: "Boosts metabolism and improves insulin sensitivity",
        duration: "8-12 mins",
        difficulty: "Intermediate",
      },
      {
        id: "cobra-pose",
        name: "Cobra Pose",
        benefit: "Stimulates abdominal organs and improves digestion",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "bow-pose",
        name: "Bow Pose",
        benefit: "Massages reproductive organs and aids hormone balance",
        duration: "2-4 mins",
        difficulty: "Intermediate",
      },
      {
        id: "pranayama",
        name: "Alternate Nostril Breathing",
        benefit: "Balances nervous system and reduces stress",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
    ],
    exercises: [
      {
        id: "squats",
        name: "Bodyweight Squats",
        benefit: "Improves insulin sensitivity and builds strength",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "mountain-climbers",
        name: "Modified Mountain Climbers",
        benefit: "Cardio exercise to support weight management",
        duration: "3-8 mins",
        difficulty: "Intermediate",
      },
      {
        id: "resistance-band",
        name: "Resistance Band Exercises",
        benefit: "Builds lean muscle and boosts metabolism",
        duration: "10-15 mins",
        difficulty: "Intermediate",
      },
    ],
  },
  {
    id: "period-cramps",
    title: "Period Cramps Relief",
    description: "Soothing poses and gentle movements to ease menstrual discomfort",
    icon: <Heart className="h-6 w-6" />,
    color: "text-orange-600",
    bgGradient: "from-orange-50 to-peach-100",
    yoga: [
      {
        id: "childs-pose",
        name: "Child's Pose",
        benefit: "Relieves lower back pain and calms the mind",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "supine-twist",
        name: "Supine Spinal Twist",
        benefit: "Releases tension in lower back and hips",
        duration: "5-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "happy-baby",
        name: "Happy Baby Pose",
        benefit: "Gently stretches hips and lower back",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "goddess-pose",
        name: "Goddess Pose",
        benefit: "Opens hips and strengthens pelvic floor",
        duration: "2-5 mins",
        difficulty: "Beginner",
      },
    ],
    exercises: [
      {
        id: "pelvic-rocks",
        name: "Pelvic Rocks",
        benefit: "Relieves cramping and improves circulation",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "knee-to-chest",
        name: "Knee to Chest Stretches",
        benefit: "Eases lower abdominal tension",
        duration: "5-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "heat-therapy",
        name: "Gentle Heat Therapy Movement",
        benefit: "Combines movement with warmth for pain relief",
        duration: "10-15 mins",
        difficulty: "Beginner",
      },
    ],
  },
  {
    id: "mood-pms",
    title: "Mood Swings & PMS",
    description: "Calming practices to balance emotions and ease PMS symptoms",
    icon: <Heart className="h-6 w-6" />,
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-sky-100",
    yoga: [
      {
        id: "restorative-pose",
        name: "Supported Savasana",
        benefit: "Deep relaxation and stress relief",
        duration: "10-20 mins",
        difficulty: "Beginner",
      },
      {
        id: "gentle-backbend",
        name: "Gentle Heart Opener",
        benefit: "Lifts mood and opens chest",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "forward-fold",
        name: "Standing Forward Fold",
        benefit: "Calms nervous system and relieves anxiety",
        duration: "3-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "meditation",
        name: "Loving-Kindness Meditation",
        benefit: "Cultivates self-compassion and emotional balance",
        duration: "5-15 mins",
        difficulty: "Beginner",
      },
    ],
    exercises: [
      {
        id: "gentle-cardio",
        name: "Gentle Dance Movement",
        benefit: "Releases endorphins and improves mood",
        duration: "10-20 mins",
        difficulty: "Beginner",
      },
      {
        id: "breathing-exercise",
        name: "4-7-8 Breathing",
        benefit: "Reduces anxiety and promotes calm",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "nature-walk",
        name: "Mindful Walking",
        benefit: "Combines movement with mindfulness",
        duration: "15-30 mins",
        difficulty: "Beginner",
      },
    ],
  },
]

const yogaRoutines = [
  {
    id: 1,
    title: "Morning Goddess Flow",
    description: "Start your day with intention and grace",
    duration: "20 min",
    level: "Beginner",
    participants: 1247,
    image: "/images/morning-flow.svg",
    tags: ["energizing", "flexibility", "mindfulness"],
  },
  {
    id: 2,
    title: "Cycle Sync Gentle",
    description: "Hormone-friendly movement for every phase",
    duration: "15 min",
    level: "All Levels",
    participants: 892,
    image: "/images/cycle-strength.svg",
    tags: ["gentle", "hormones", "adaptive"],
  },
  {
    id: 3,
    title: "Evening Wind Down",
    description: "Release tension and prepare for rest",
    duration: "25 min",
    level: "Beginner",
    participants: 1534,
    image: "/images/evening-wind-down.svg",
    tags: ["relaxing", "sleep", "restoration"],
  },
  {
    id: 4,
    title: "Core Goddess",
    description: "Build strength from your center",
    duration: "18 min",
    level: "Intermediate",
    participants: 678,
    image: "/images/energy-boost.svg",
    tags: ["strength", "core", "empowerment"],
  },
]

export function GuidedYogaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-purple-400" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-800">Guided Yoga & Workouts</h2>
          </div>
          <p className="max-w-[900px] text-gray-600 md:text-lg">
            Cycle-specific routines with demos and timers, designed to honor your body's natural rhythms
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {yogaRoutines.map((routine) => (
            <Card
              key={routine.id}
              className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={routine.image || "/images/morning-flow.svg"}
                  width={300}
                  height={200}
                  alt={routine.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Play className="h-4 w-4 text-purple-600" />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{routine.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{routine.description}</p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{routine.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{routine.participants}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {routine.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <ProtectedAction>
                  <Button className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-2xl">
                    Start Flow
                  </Button>
                </ProtectedAction>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <ProtectedAction>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-8 py-3 transition-all duration-300 bg-transparent"
            >
              View All Routines
            </Button>
          </ProtectedAction>
        </div>
      </div>
    </section>
  )
}
