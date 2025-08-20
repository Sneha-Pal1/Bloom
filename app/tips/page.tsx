"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Sparkles, Droplets, Wind, Sun, Moon, Search, Filter, Clock, Bookmark } from "lucide-react"
import Link from "next/link"

import { useAuth } from "@/components/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { ProtectedAction } from "@/components/protected-action"

interface Tip {
  id: string
  title: string
  content: string
  category: string
  timeOfDay: string
  duration: string
  difficulty: "Easy" | "Medium" | "Advanced"
  tags: string[]
  icon: React.ReactNode
}

const tips: Tip[] = [
  {
    id: "1",
    title: "Morning Hydration Ritual",
    content:
      "Start your day with a glass of warm water with lemon. This gentle practice helps kickstart your metabolism, aids digestion, and provides a moment of mindful intention before the day begins.",
    category: "Hydration",
    timeOfDay: "Morning",
    duration: "2 min",
    difficulty: "Easy",
    tags: ["hydration", "morning", "detox"],
    icon: <Droplets className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "4-7-8 Breathing Technique",
    content:
      "Inhale for 4 counts, hold for 7, exhale for 8. This calming breath work activates your parasympathetic nervous system, reducing stress and promoting relaxation. Perfect for moments of anxiety or before sleep.",
    category: "Mindfulness",
    timeOfDay: "Anytime",
    duration: "3 min",
    difficulty: "Easy",
    tags: ["breathing", "anxiety", "sleep"],
    icon: <Wind className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Gentle Morning Stretches",
    content:
      "Wake up your body with cat-cow stretches, gentle neck rolls, and shoulder shrugs. These movements help release overnight tension and prepare your body for the day ahead with loving awareness.",
    category: "Movement",
    timeOfDay: "Morning",
    duration: "5 min",
    difficulty: "Easy",
    tags: ["stretching", "morning", "flexibility"],
    icon: <Sun className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "Evening Gratitude Practice",
    content:
      "Before bed, write down three things you're grateful for from your day. This practice shifts your focus to positive experiences and helps create a peaceful transition into rest.",
    category: "Mindfulness",
    timeOfDay: "Evening",
    duration: "5 min",
    difficulty: "Easy",
    tags: ["gratitude", "evening", "journaling"],
    icon: <Moon className="h-5 w-5" />,
  },
  {
    id: "5",
    title: "Mindful Tea Ceremony",
    content:
      "Create a mini tea ceremony by choosing your tea mindfully, watching the steam rise, feeling the warmth of the cup, and savoring each sip. This transforms a simple drink into a meditation.",
    category: "Mindfulness",
    timeOfDay: "Afternoon",
    duration: "10 min",
    difficulty: "Medium",
    tags: ["mindfulness", "tea", "meditation"],
    icon: <Heart className="h-5 w-5" />,
  },
  {
    id: "6",
    title: "Digital Sunset Routine",
    content:
      "One hour before bed, dim the lights and put away screens. Use this time for gentle activities like reading, stretching, or journaling. This helps your body prepare for restorative sleep.",
    category: "Sleep",
    timeOfDay: "Evening",
    duration: "60 min",
    difficulty: "Medium",
    tags: ["sleep", "digital detox", "evening"],
    icon: <Moon className="h-5 w-5" />,
  },
]

const categories = ["All", "Hydration", "Mindfulness", "Movement", "Sleep"]
const timeFilters = ["All", "Morning", "Afternoon", "Evening", "Anytime"]

const FloatingSparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <Sparkles
        key={i}
        className="absolute text-yellow-300 opacity-40 animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
        size={12}
      />
    ))}
  </div>
)

export default function Tips() {
  const { isAuthenticated, user, logout, showAuthModal, setShowAuthModal, authModalTab } = useAuth()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTime, setSelectedTime] = useState("All")
  const [bookmarkedTips, setBookmarkedTips] = useState<string[]>([])

  const toggleBookmark = (tipId: string) => {
    setBookmarkedTips((prev) => (prev.includes(tipId) ? prev.filter((id) => id !== tipId) : [...prev, tipId]))
  }

  const filteredTips = tips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || tip.category === selectedCategory
    const matchesTime = selectedTime === "All" || tip.timeOfDay === selectedTime

    return matchesSearch && matchesCategory && matchesTime
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      Hydration: "bg-blue-100 text-blue-700 border-blue-200",
      Mindfulness: "bg-purple-100 text-purple-700 border-purple-200",
      Movement: "bg-green-100 text-green-700 border-green-200",
      Sleep: "bg-indigo-100 text-indigo-700 border-indigo-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: "bg-green-100 text-green-700",
      Medium: "bg-yellow-100 text-yellow-700",
      Advanced: "bg-red-100 text-red-700",
    }
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/70 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
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
          <Link href="/tips" className="text-sm font-medium text-purple-600 border-b-2 border-purple-400">
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

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <section className="relative mb-8">
          <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl shadow-lg overflow-hidden">
            <FloatingSparkles />
            <CardContent className="p-8 text-center relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Daily Wellness Tips ✨</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple, gentle practices to nurture your mind, body, and soul throughout the day. Start small, be
                consistent, and celebrate every step.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-purple-200 focus:border-purple-300 rounded-2xl max-w-md"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                Category:
              </span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full ${
                    selectedCategory === category
                      ? "bg-purple-400 hover:bg-purple-500"
                      : "border-purple-200 text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Time:
              </span>
              {timeFilters.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-full ${
                    selectedTime === time
                      ? "bg-pink-400 hover:bg-pink-500"
                      : "border-pink-200 text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTips.map((tip) => (
            <Card
              key={tip.id}
              className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-purple-600">
                      {tip.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">{tip.title}</CardTitle>
                    </div>
                  </div>
                  <ProtectedAction>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleBookmark(tip.id)}
                      className={`${bookmarkedTips.includes(tip.id) ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-500`}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </ProtectedAction>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">{tip.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getCategoryColor(tip.category)}>{tip.category}</Badge>
                  <Badge className={getDifficultyColor(tip.difficulty)}>{tip.difficulty}</Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-600">
                    {tip.duration}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-600">
                    {tip.timeOfDay}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tip.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-purple-50 border-purple-200 text-purple-600"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
            <CardContent className="p-12 text-center">
              <Sparkles className="h-16 w-16 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No tips found</h3>
              <p className="text-gray-600">Try adjusting your search or filters to discover new wellness practices.</p>
            </CardContent>
          </Card>
        )}

        {/* Bookmarked Tips */}
        {bookmarkedTips.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Bookmark className="h-6 w-6 text-yellow-500" />
              Your Bookmarked Tips
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tips
                .filter((tip) => bookmarkedTips.includes(tip.id))
                .map((tip) => (
                  <Card
                    key={`bookmarked-${tip.id}`}
                    className="border-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-lg"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                          {tip.icon}
                        </div>
                        <h3 className="font-semibold text-gray-800">{tip.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{tip.content.substring(0, 100)}...</p>
                      <Badge className={getCategoryColor(tip.category)} size="sm">
                        {tip.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}
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
