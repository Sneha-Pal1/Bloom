"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Sparkles, TrendingUp, BookOpen } from "lucide-react"
import { ProtectedAction } from "@/components/protected-action"

interface MoodEntry {
  date: string
  mood: string
  emoji: string
  reflection?: string
  tags: string[]
}

interface MoodOption {
  emoji: string
  label: string
  value: string
  color: string
}

const moodOptions: MoodOption[] = [
  { emoji: "😄", label: "Happy", value: "happy", color: "bg-yellow-100 border-yellow-300" },
  { emoji: "😊", label: "Calm", value: "calm", color: "bg-green-100 border-green-300" },
  { emoji: "😐", label: "Neutral", value: "neutral", color: "bg-gray-100 border-gray-300" },
  { emoji: "😢", label: "Sad", value: "sad", color: "bg-blue-100 border-blue-300" },
  { emoji: "😠", label: "Angry", value: "angry", color: "bg-red-100 border-red-300" },
]

const emotionTags = [
  { label: "Stress", color: "bg-red-100 text-red-700 border-red-200" },
  { label: "Anxiety", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "PMS", color: "bg-pink-100 text-pink-700 border-pink-200" },
  { label: "Joy", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { label: "Tired", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { label: "Energetic", color: "bg-green-100 text-green-700 border-green-200" },
  { label: "Peaceful", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Overwhelmed", color: "bg-gray-100 text-gray-700 border-gray-200" },
]

// Mock data for demonstration
const mockMoodData: MoodEntry[] = [
  {
    date: "2024-01-15",
    mood: "happy",
    emoji: "😄",
    reflection: "Had a great yoga session!",
    tags: ["Joy", "Energetic"],
  },
  { date: "2024-01-14", mood: "calm", emoji: "😊", reflection: "Peaceful morning meditation", tags: ["Peaceful"] },
  { date: "2024-01-13", mood: "neutral", emoji: "😐", reflection: "", tags: ["Tired"] },
  { date: "2024-01-12", mood: "sad", emoji: "😢", reflection: "Feeling a bit down today", tags: ["Stress", "PMS"] },
  { date: "2024-01-11", mood: "happy", emoji: "😄", reflection: "Great day with friends!", tags: ["Joy"] },
  { date: "2024-01-10", mood: "calm", emoji: "😊", reflection: "", tags: ["Peaceful"] },
  {
    date: "2024-01-09",
    mood: "angry",
    emoji: "😠",
    reflection: "Stressful day at work",
    tags: ["Stress", "Overwhelmed"],
  },
]

export function MoodTrackingCard() {
  const [showModal, setShowModal] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [reflection, setReflection] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showReflection, setShowReflection] = useState(false)
  const [currentView, setCurrentView] = useState<"tracker" | "calendar" | "insights">("tracker")
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(mockMoodData)

  const handleCardClick = () => {
    setShowModal(true)
  }

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const saveMoodEntry = () => {
    if (!selectedMood) return

    const today = new Date().toISOString().split("T")[0]
    const moodOption = moodOptions.find((m) => m.value === selectedMood)

    const newEntry: MoodEntry = {
      date: today,
      mood: selectedMood,
      emoji: moodOption?.emoji || "😐",
      reflection: reflection.trim(),
      tags: selectedTags,
    }

    setMoodEntries((prev) => [newEntry, ...prev.filter((entry) => entry.date !== today)])

    // Reset form
    setSelectedMood("")
    setReflection("")
    setSelectedTags([])
    setShowReflection(false)
  }

  const getMoodForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return moodEntries.find((entry) => entry.date === dateStr)
  }

  const getWeeklyMoodData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    return last7Days.map((date) => {
      const entry = moodEntries.find((e) => e.date === date)
      const moodValue = entry ? moodOptions.findIndex((m) => m.value === entry.mood) + 1 : 0
      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        value: moodValue,
        emoji: entry?.emoji || "",
      }
    })
  }

  const FloatingSparkles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-pink-300 opacity-40 animate-bounce"
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

  const weeklyData = getWeeklyMoodData()

  return (
    <>
      {/* Main Feature Card */}
      <Card
        className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl shadow-lg cursor-pointer h-full"
        onClick={handleCardClick}
      >
        <CardContent className="p-8 text-center h-full flex flex-col justify-between">
          <div>
            <div className="w-20 h-20 mx-auto mb-6 bg-white/80 rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
              <BookOpen className="h-10 w-10 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Mood Tracking</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Track emotional patterns and reflect on your wellness journey with daily insights
            </p>
          </div>
          <ProtectedAction>
            <Button className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <TrendingUp className="h-4 w-4 mr-2" />
              Track Mood
            </Button>
          </ProtectedAction>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-pink-50/95 via-peach-50/95 to-purple-50/95 backdrop-blur-xl border-0 rounded-3xl">
          <div className="relative">
            <FloatingSparkles />

            <DialogHeader className="relative z-10">
              <DialogTitle className="text-center text-3xl text-gray-800 mb-4">Mood Tracking 💕</DialogTitle>
              <p className="text-center text-gray-600 mb-6">
                Track your emotions, reflect on your day, and discover patterns in your wellness journey
              </p>
            </DialogHeader>

            {/* Navigation Tabs */}
            <div className="flex mb-8 bg-white/50 rounded-2xl p-1 relative z-10">
              <button
                onClick={() => setCurrentView("tracker")}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentView === "tracker" ? "bg-white text-pink-600 shadow-sm" : "text-gray-600 hover:text-pink-500"
                }`}
              >
                📝 Daily Tracker
              </button>
              <button
                onClick={() => setCurrentView("calendar")}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentView === "calendar" ? "bg-white text-pink-600 shadow-sm" : "text-gray-600 hover:text-pink-500"
                }`}
              >
                📅 Calendar View
              </button>
              <button
                onClick={() => setCurrentView("insights")}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentView === "insights" ? "bg-white text-pink-600 shadow-sm" : "text-gray-600 hover:text-pink-500"
                }`}
              >
                📊 Insights
              </button>
            </div>

            <div className="relative z-10">
              {currentView === "tracker" && (
                <div className="space-y-8">
                  {/* Daily Mood Picker */}
                  <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        How are you feeling today?
                      </h3>
                      <div className="grid grid-cols-5 gap-4 mb-6">
                        {moodOptions.map((mood) => (
                          <button
                            key={mood.value}
                            onClick={() => handleMoodSelect(mood.value)}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 ${
                              selectedMood === mood.value
                                ? `${mood.color} border-opacity-100 shadow-lg scale-105`
                                : "bg-white/50 border-gray-200 hover:border-pink-300"
                            }`}
                          >
                            <div className="text-3xl mb-2">{mood.emoji}</div>
                            <div className="text-sm font-medium text-gray-700">{mood.label}</div>
                          </button>
                        ))}
                      </div>

                      {selectedMood && (
                        <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
                          {/* Emotion Tags */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">What's influencing your mood?</h4>
                            <div className="flex flex-wrap gap-2">
                              {emotionTags.map((tag) => (
                                <Badge
                                  key={tag.label}
                                  variant="outline"
                                  className={`cursor-pointer transition-all duration-200 ${
                                    selectedTags.includes(tag.label)
                                      ? `${tag.color} border-opacity-100 shadow-sm`
                                      : "bg-white/50 border-gray-200 hover:border-pink-300 text-gray-600"
                                  }`}
                                  onClick={() => toggleTag(tag.label)}
                                >
                                  {tag.label}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Add Reflection Button */}
                          <div className="text-center">
                            <Button
                              variant="outline"
                              onClick={() => setShowReflection(!showReflection)}
                              className="bg-white/70 hover:bg-white border-pink-200 text-pink-600 rounded-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {showReflection ? "Hide Reflection" : "Add Reflection"}
                            </Button>
                          </div>

                          {/* Reflection Textarea */}
                          {showReflection && (
                            <div className="animate-in slide-in-from-bottom duration-300">
                              <Textarea
                                placeholder="What's on your mind today? Write about your feelings, experiences, or anything you'd like to remember..."
                                value={reflection}
                                onChange={(e) => setReflection(e.target.value)}
                                className="min-h-[120px] border-pink-200 focus:border-pink-300 rounded-2xl bg-white/70 backdrop-blur-sm"
                              />
                            </div>
                          )}

                          {/* Save Button */}
                          <div className="text-center pt-4">
                            <Button
                              onClick={saveMoodEntry}
                              className="bg-gradient-to-r from-pink-400 to-peach-400 hover:from-pink-500 hover:to-peach-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                              Save Today's Mood
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentView === "calendar" && (
                <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Your Mood Calendar</h3>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        className="rounded-2xl"
                        components={{
                          Day: ({ date, ...props }) => {
                            const moodEntry = getMoodForDate(date)
                            return (
                              <div className="relative">
                                <button {...props} className="w-full h-full">
                                  {date.getDate()}
                                </button>
                                {moodEntry && <div className="absolute -top-1 -right-1 text-xs">{moodEntry.emoji}</div>}
                              </div>
                            )
                          },
                        }}
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Emojis show your daily moods. Click on any date to see your reflection.
                      </p>
                      <div className="flex justify-center gap-4 text-xs">
                        {moodOptions.map((mood) => (
                          <div key={mood.value} className="flex items-center gap-1">
                            <span>{mood.emoji}</span>
                            <span className="text-gray-600">{mood.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentView === "insights" && (
                <div className="space-y-6">
                  {/* Weekly Mood Chart */}
                  <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Past 7 Days</h3>
                      <div className="space-y-4">
                        {weeklyData.map((day, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="w-12 text-sm font-medium text-gray-600">{day.date}</div>
                            <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-pink-300 to-peach-300 rounded-full transition-all duration-500"
                                style={{ width: `${(day.value / 5) * 100}%` }}
                              />
                            </div>
                            <div className="w-8 text-center">
                              {day.emoji && <span className="text-lg">{day.emoji}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                          Your mood patterns help you understand what affects your wellbeing
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mood Summary */}
                  <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week's Insights</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 bg-gradient-to-r from-green-50 to-mint-50 rounded-2xl">
                          <div className="text-2xl mb-2">😊</div>
                          <div className="text-sm font-medium text-gray-800">Most Common Mood</div>
                          <div className="text-xs text-gray-600">Calm & Peaceful</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                          <div className="text-2xl mb-2">🌟</div>
                          <div className="text-sm font-medium text-gray-800">Positive Days</div>
                          <div className="text-xs text-gray-600">5 out of 7 days</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-pink-400 to-peach-400 hover:from-pink-500 hover:to-peach-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Start Tracking Today
                </Button>
                <Button
                  variant="outline"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 rounded-full px-8 py-3 transition-all duration-300 bg-white/70"
                >
                  View Full Mood History
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
