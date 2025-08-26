"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  TrendingUp,
  Heart,
  BookOpen,
  Target,
  Droplets,
  Moon,
  Play,
  Sparkles,
  CheckCircle,
  Calendar,
} from "lucide-react"
import { ProtectedAction } from "@/components/protected-action"
import { useRouter } from "next/navigation"

interface WeeklyStats {
  avgMoodScore: number
  avgMoodEmoji: string
  routinesCompleted: number
  totalRoutines: number
  journalEntries: number
}

interface Suggestion {
  id: string
  type: "workout" | "tip" | "goal"
  title: string
  description: string
  icon: React.ReactNode
  category: string
  reason: string
  color: string
}

interface DayData {
  date: string
  mood: string
  moodEmoji: string
  routineCompleted: boolean
  journalEntry: boolean
}

// Mock data for demonstration
const mockWeeklyStats: WeeklyStats = {
  avgMoodScore: 4.2,
  avgMoodEmoji: "😊",
  routinesCompleted: 5,
  totalRoutines: 7,
  journalEntries: 4,
}

const mockSuggestions: Suggestion[] = [
  {
    id: "workout-1",
    type: "workout",
    title: "Gentle Morning Flow",
    description: "Based on your recent mood patterns, try this calming yoga sequence to start your day centered.",
    icon: <Play className="h-5 w-5" />,
    category: "Yoga",
    reason: "You've been feeling a bit stressed lately",
    color: "from-purple-100 to-lilac-100",
  },
  {
    id: "tip-1",
    type: "tip",
    title: "Evening Wind-Down Ritual",
    description: "Create a peaceful bedtime routine with chamomile tea and gentle stretching for better sleep quality.",
    icon: <Moon className="h-5 w-5" />,
    category: "Sleep",
    reason: "Your sleep patterns could use some support",
    color: "from-blue-100 to-sky-100",
  },
  {
    id: "goal-1",
    type: "goal",
    title: "Drink 2L Water Daily",
    description: "Stay hydrated this week! Small sips throughout the day make a big difference in energy levels.",
    icon: <Droplets className="h-5 w-5" />,
    category: "Hydration",
    reason: "Boost your energy and skin health",
    color: "from-blue-50 to-cyan-100",
  },
]

const mockWeekData: DayData[] = [
  { date: "Mon", mood: "happy", moodEmoji: "😊", routineCompleted: true, journalEntry: true },
  { date: "Tue", mood: "calm", moodEmoji: "😌", routineCompleted: true, journalEntry: false },
  { date: "Wed", mood: "neutral", moodEmoji: "😐", routineCompleted: false, journalEntry: true },
  { date: "Thu", mood: "happy", moodEmoji: "😄", routineCompleted: true, journalEntry: true },
  { date: "Fri", mood: "stressed", moodEmoji: "😰", routineCompleted: false, journalEntry: false },
  { date: "Sat", mood: "calm", moodEmoji: "😊", routineCompleted: true, journalEntry: true },
  { date: "Sun", mood: "happy", moodEmoji: "😄", routineCompleted: true, journalEntry: false },
]

export function WellnessInsightsCard() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false)

  const handleCardClick = () => {
    setShowModal(true)
  }

  const FloatingSparkles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-blue-300 opacity-40 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
          size={12}
        />
      ))}
    </div>
  )

  return (
    <>
      {/* Main Feature Card */}
      <Card
        className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-gradient-to-br from-orange-100 to-peach-100 rounded-3xl shadow-lg cursor-pointer h-full"
        onClick={handleCardClick}
      >
        <CardContent className="p-8 text-center h-full flex flex-col justify-between">
          <div>
            <div className="w-20 h-20 mx-auto mb-6 bg-white/80 rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
              <Calendar className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Wellness Insights</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Smart suggestions based on your cycle patterns and mood analytics
            </p>
          </div>
          <ProtectedAction>
            <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Insights
            </Button>
          </ProtectedAction>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-lilac-50/95 via-sky-50/95 to-blush-50/95 backdrop-blur-xl border-0 rounded-3xl">
          <div className="relative">
            <FloatingSparkles />

            <DialogHeader className="relative z-10">
              <DialogTitle className="text-center text-3xl text-gray-800 mb-4">Wellness Insights 📊</DialogTitle>
              <p className="text-center text-gray-600 mb-8">
                Your personalized wellness overview and smart suggestions for the week ahead
              </p>
            </DialogHeader>

            <div className="relative z-10 space-y-8">
              {/* This Week at a Glance */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">This Week at a Glance ✨</h3>

                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Average Mood Score */}
                    <div className="text-center p-6 bg-gradient-to-br from-lilac-50 to-purple-50 rounded-3xl">
                      <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                        <Heart className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">{mockWeeklyStats.avgMoodScore}/5</div>
                      <div className="text-2xl mb-2">{mockWeeklyStats.avgMoodEmoji}</div>
                      <p className="text-sm font-medium text-gray-700">Average Mood</p>
                      <p className="text-xs text-gray-500 mt-1">Mostly positive this week!</p>
                    </div>

                    {/* Routines Completed */}
                    <div className="text-center p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl">
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {mockWeeklyStats.routinesCompleted}/{mockWeeklyStats.totalRoutines}
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-sky-400 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(mockWeeklyStats.routinesCompleted / mockWeeklyStats.totalRoutines) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Routines Completed</p>
                      <p className="text-xs text-gray-500 mt-1">Great consistency!</p>
                    </div>

                    {/* Journal Entries */}
                    <div className="text-center p-6 bg-gradient-to-br from-blush-50 to-pink-50 rounded-3xl">
                      <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-pink-600" />
                      </div>
                      <div className="text-3xl font-bold text-pink-600 mb-2">{mockWeeklyStats.journalEntries}</div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < mockWeeklyStats.journalEntries ? "bg-pink-400" : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-gray-700">Journal Entries</p>
                      <p className="text-xs text-gray-500 mt-1">Keep reflecting!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions for You */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Suggestions for You 💡</h3>

                  <div className="grid gap-6 md:grid-cols-3">
                    {mockSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className={`p-6 bg-gradient-to-br ${suggestion.color} rounded-3xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-white/70 rounded-full flex items-center justify-center text-gray-600">
                            {suggestion.icon}
                          </div>
                          <div>
                            <Badge variant="outline" className="bg-white/50 text-gray-600 border-gray-200 text-xs">
                              {suggestion.category}
                            </Badge>
                          </div>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{suggestion.description}</p>

                        <div className="bg-white/50 rounded-2xl p-3 mb-4">
                          <p className="text-xs text-gray-500 font-medium">Why this suggestion?</p>
                          <p className="text-xs text-gray-600">{suggestion.reason}</p>
                        </div>

                        <Button
                          size="sm"
                          className="w-full bg-white/70 hover:bg-white text-gray-700 border-0 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            if (suggestion.type === "workout") {
                              // Navigate to active routine with appropriate exercises
                              router.push(`/active-routine?name=${suggestion.title}&type=yoga&exercises=cat-cow,childs-pose,happy-baby`);
                            } else if (suggestion.type === "tip") {
                              router.push("/tips");
                            }
                          }}
                        >
                          {suggestion.type === "workout"
                            ? "Start Routine"
                            : suggestion.type === "tip"
                              ? "Learn More"
                              : "Set Goal"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Timeline */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Week Timeline 📅</h3>

                  <div className="space-y-4">
                    {/* Timeline Header */}
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {mockWeekData.map((day, index) => (
                        <div key={index} className="text-sm font-medium text-gray-600">
                          {day.date}
                        </div>
                      ))}
                    </div>

                    {/* Mood Row */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Daily Mood</p>
                      <div className="grid grid-cols-7 gap-2">
                        {mockWeekData.map((day, index) => (
                          <div
                            key={index}
                            className="h-12 bg-gradient-to-br from-purple-50 to-lilac-50 rounded-2xl flex items-center justify-center text-2xl hover:shadow-md transition-all duration-200"
                          >
                            {day.moodEmoji}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Routines Row */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Routine Completed</p>
                      <div className="grid grid-cols-7 gap-2">
                        {mockWeekData.map((day, index) => (
                          <div
                            key={index}
                            className={`h-8 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                              day.routineCompleted
                                ? "bg-gradient-to-r from-green-100 to-mint-100 text-green-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {day.routineCompleted ? <CheckCircle className="h-4 w-4" /> : "○"}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Journal Row */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Journal Entry</p>
                      <div className="grid grid-cols-7 gap-2">
                        {mockWeekData.map((day, index) => (
                          <div
                            key={index}
                            className={`h-8 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                              day.journalEntry
                                ? "bg-gradient-to-r from-pink-100 to-blush-100 text-pink-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {day.journalEntry ? <BookOpen className="h-4 w-4" /> : "○"}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Track your patterns to understand what helps you feel your best! 🌟
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-lilac-400 to-purple-400 hover:from-lilac-500 hover:to-purple-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
                <Button
                  variant="outline"
                  className="border-sky-200 text-sky-600 hover:bg-sky-50 rounded-full px-8 py-3 transition-all duration-300 bg-white/70"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Set Weekly Goals
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
