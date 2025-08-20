"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Sparkles,
  Play,
  Droplets,
  Wind,
  Smartphone,
  TrendingUp,
  ArrowLeft,
  Volume2,
  VolumeX,
  Edit3,
} from "lucide-react"
import Link from "next/link"

import { useAuth } from "@/components/auth-context"
import { AuthModal } from "@/components/auth-modal"

const affirmations = [
  {
    short: "You are enough, just as you are",
    full: "You are enough, just as you are. Your worth isn't determined by your productivity, your achievements, or how others see you. You are inherently valuable, deserving of love and kindness, especially from yourself. Take a moment to breathe and feel this truth in your heart.",
  },
  {
    short: "Your feelings are valid and temporary",
    full: "Your feelings are valid and temporary. Whatever you're experiencing right now - joy, sadness, anxiety, or peace - it's okay to feel it fully. Emotions are like weather patterns; they come and go. You have the strength to weather any storm and the wisdom to appreciate the sunshine.",
  },
  {
    short: "Progress, not perfection, is the goal",
    full: "Progress, not perfection, is the goal. Every small step you take toward caring for yourself matters. Whether it's drinking an extra glass of water, taking three deep breaths, or simply showing up today - you're moving forward. Celebrate these moments of growth.",
  },
]

const routines = [
  {
    name: "Morning Gentle Flow",
    duration: "15 min",
    description: "Start your day with gentle stretches and mindful breathing",
    exercises: ["Cat-Cow Stretch", "Child's Pose", "Gentle Twists", "Mountain Pose"],
  },
  {
    name: "Midday Energy Boost",
    duration: "10 min",
    description: "Quick energizing movements to refresh your body and mind",
    exercises: ["Shoulder Rolls", "Neck Stretches", "Standing Forward Fold", "Deep Breathing"],
  },
  {
    name: "Evening Wind Down",
    duration: "20 min",
    description: "Calming poses to help you transition into rest",
    exercises: ["Legs Up Wall", "Gentle Hip Circles", "Seated Meditation", "Gratitude Practice"],
  },
]

const moodEmojis = [
  { emoji: "😢", label: "Very Low", value: 1 },
  { emoji: "😔", label: "Low", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "😊", label: "Good", value: 4 },
  { emoji: "😄", label: "Great", value: 5 },
]

export default function Dashboard() {
  const { isAuthenticated, user, logout, showAuthModal, setShowAuthModal, authModalTab } = useAuth()

  const [currentTime, setCurrentTime] = useState(new Date())
  const [todayAffirmation] = useState(affirmations[new Date().getDate() % affirmations.length])
  const [todayRoutine] = useState(routines[new Date().getDay() % routines.length])
  const [mood, setMood] = useState([3])
  const [journalEntry, setJournalEntry] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [showJournal, setShowJournal] = useState(false)
  const [streak, setStreak] = useState(7)
  const [completedToday, setCompletedToday] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleStartRoutine = () => {
    setCompletedToday(true)
    // Here you would navigate to the actual routine
  }

  const FloatingSparkles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <Sparkles
          key={i}
          className={`absolute text-yellow-300 opacity-60 animate-bounce`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
          size={16}
        />
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/70 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <ArrowLeft className="h-5 w-5 text-purple-400 mr-2" />
          <Heart className="h-8 w-8 text-purple-400" />
          <span className="ml-2 text-xl font-semibold text-gray-800">Bloom</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link href="/explore" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Explore
          </Link>
          <Link href="/tips" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Tips
          </Link>
          <Link href="/routines" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Routines
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            About
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Header */}
        <section className="relative">
          <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl shadow-lg overflow-hidden">
            <FloatingSparkles />
            <CardContent className="p-8 text-center relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Good {currentTime.getHours() < 12 ? "Morning" : currentTime.getHours() < 17 ? "Afternoon" : "Evening"}!
                ✨
              </h1>
              <p className="text-lg text-gray-600 mb-1">{formatDate(currentTime)}</p>
              <p className="text-purple-600 font-medium">{formatTime(currentTime)}</p>
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Daily Affirmation Card */}
          <Card className="md:col-span-2 lg:col-span-1 border-0 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Sparkles className="h-5 w-5" />
                Daily Affirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 font-medium">{todayAffirmation.short}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    Read Full Affirmation
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl text-purple-700 mb-4">
                      Today's Affirmation ✨
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="relative">
                      <FloatingSparkles />
                      <p className="text-lg text-gray-700 leading-relaxed text-center relative z-10 p-6">
                        {todayAffirmation.full}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="rounded-full"
                      >
                        {isPlaying ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                        {isPlaying ? "Pause" : "Play"} Ambient Sounds
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Today's Suggested Routine */}
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Heart className="h-5 w-5" />
                Today's Routine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{todayRoutine.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{todayRoutine.description}</p>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Play className="h-4 w-4" />
                  {todayRoutine.duration}
                </div>
              </div>
              <div className="space-y-2">
                {todayRoutine.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    {exercise}
                  </div>
                ))}
              </div>
              <Button
                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-full"
                onClick={handleStartRoutine}
                disabled={completedToday}
              >
                {completedToday ? "✓ Completed Today" : "Start Routine"}
              </Button>
            </CardContent>
          </Card>

          {/* Mood Check-In */}
          <Card className="border-0 bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-700">
                <Heart className="h-5 w-5" />
                Mood Check-In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">How are you feeling right now?</p>
                <div className="px-2">
                  <Slider value={mood} onValueChange={setMood} max={5} min={1} step={1} className="w-full" />
                  <div className="flex justify-between mt-2">
                    {moodEmojis.map((item) => (
                      <div key={item.value} className="text-center">
                        <div className="text-lg">{item.emoji}</div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg mb-2">{moodEmojis[mood[0] - 1]?.emoji}</p>
                  <p className="text-sm text-gray-600">You're feeling {moodEmojis[mood[0] - 1]?.label.toLowerCase()}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowJournal(!showJournal)}
                className="w-full rounded-full border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Write More
              </Button>
              {showJournal && (
                <div className="space-y-2">
                  <Textarea
                    placeholder="What's on your mind today? Write freely..."
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    className="min-h-[100px] border-pink-200 focus:border-pink-300 rounded-2xl"
                  />
                  <Button size="sm" className="bg-pink-400 hover:bg-pink-500 text-white rounded-full">
                    Save Entry
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Daily Tips & Reminders */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Wellness Tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Stay Hydrated</h3>
                <p className="text-sm text-gray-600 mb-4">You've had 4/8 glasses today</p>
                <Progress value={50} className="h-2 bg-blue-100" />
                <p className="text-xs text-blue-600 mt-2">Keep going! 💧</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-200 rounded-full flex items-center justify-center">
                  <Wind className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Breathing Break</h3>
                <p className="text-sm text-gray-600 mb-4">Take 5 deep breaths</p>
                <Button size="sm" className="bg-teal-400 hover:bg-teal-500 text-white rounded-full">
                  Start Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-200 rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Phone-Free Time</h3>
                <p className="text-sm text-gray-600 mb-4">30 min of mindful presence</p>
                <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white rounded-full">
                  Begin
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Progress Tracker */}
        <section>
          <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <TrendingUp className="h-5 w-5" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{streak}</div>
                  <p className="text-sm text-gray-600">Day Streak</p>
                  <div className="mt-2">
                    <div className="flex justify-center gap-1">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${i < streak ? "bg-purple-400" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">😊</div>
                  <p className="text-sm text-gray-600">Average Mood</p>
                  <p className="text-xs text-gray-500 mt-1">This week: Mostly positive</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">5/7</div>
                  <p className="text-sm text-gray-600">Routines Completed</p>
                  <Progress value={71} className="h-2 bg-green-100 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
        defaultTab={authModalTab}
      />
    </div>
  )
}
