"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Sparkles,
  Droplets,
  Wind,
  Sun,
  Moon,
  Search,
  Clock,
  Bookmark,
  Filter,
  Calendar,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { ProtectedAction } from "@/components/protected-action";

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  timeOfDay: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  tags: string[];
  icon: React.ReactNode;
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
      "Inhale for 4 counts, hold for 7, exhale for 8. This calming breath work activates your parasympathetic nervous system, reducing stress and promoting relaxation.",
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
      "Wake up your body with cat-cow stretches, gentle neck rolls, and shoulder shrugs. These movements help release overnight tension and prepare your body for the day ahead.",
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
      "Create a mini tea ceremony by choosing your tea mindfully, watching the steam rise, feeling the warmth of the cup, and savoring each sip.",
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
      "One hour before bed, dim the lights and put away screens. Use this time for gentle activities like reading, stretching, or journaling.",
    category: "Sleep",
    timeOfDay: "Evening",
    duration: "60 min",
    difficulty: "Medium",
    tags: ["sleep", "digital detox", "evening"],
    icon: <Moon className="h-5 w-5" />,
  },
];

const categories = ["All", "Hydration", "Mindfulness", "Movement", "Sleep"];
const timeFilters = ["All", "Morning", "Afternoon", "Evening", "Anytime"];

export default function Tips() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTime, setSelectedTime] = useState("All");
  const [bookmarkedTips, setBookmarkedTips] = useState<string[]>([]);

  const toggleBookmark = (tipId: string) => {
    setBookmarkedTips((prev) =>
      prev.includes(tipId)
        ? prev.filter((id) => id !== tipId)
        : [...prev, tipId]
    );
  };

  const filteredTips = tips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || tip.category === selectedCategory;
    const matchesTime =
      selectedTime === "All" || tip.timeOfDay === selectedTime;
    return matchesSearch && matchesCategory && matchesTime;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Hydration: "bg-blue-100 text-blue-700",
      Mindfulness: "bg-purple-100 text-purple-700",
      Movement: "bg-green-100 text-green-700",
      Sleep: "bg-indigo-100 text-indigo-700",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: "bg-green-100 text-green-700",
      Medium: "bg-yellow-100 text-yellow-700",
      Advanced: "bg-red-100 text-red-700",
    };
    return (
      colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="space-y-8">
        {/* Header Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-yellow-300 opacity-20 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
                size={14}
              />
            ))}
          </div>
          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-800">
                Daily <span className="gradient-text">Wellness Tips</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Simple, gentle practices to nurture your mind, body, and soul
                throughout the day. Start small, be consistent, and celebrate
                every step.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="container px-4 md:px-6 mx-auto">
          <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search wellness tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border-purple-200 focus:border-purple-400 rounded-full text-center focus-ring"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Filter className="h-4 w-4" />
                  <span>Filter by:</span>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
                          : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="w-px h-6 bg-gray-300"></div>

                {/* Time Filters */}
                <div className="flex flex-wrap gap-2">
                  <Clock className="h-4 w-4 text-gray-500 mt-1" />
                  {timeFilters.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-full transition-all duration-300 ${
                        selectedTime === time
                          ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
                          : "border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300"
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Tips Grid */}
        <section className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip) => (
              <Card
                key={tip.id}
                className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                        {tip.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-800 leading-tight">
                          {tip.title}
                        </CardTitle>
                      </div>
                    </div>
                    <ProtectedAction>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleBookmark(tip.id)}
                        className={`${
                          bookmarkedTips.includes(tip.id)
                            ? "text-yellow-500"
                            : "text-gray-400"
                        } hover:text-yellow-500 transition-colors`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </ProtectedAction>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {tip.content}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`${getCategoryColor(tip.category)} text-xs`}
                    >
                      {tip.category}
                    </Badge>
                    <Badge
                      className={`${getDifficultyColor(
                        tip.difficulty
                      )} text-xs`}
                    >
                      {tip.difficulty}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-gray-50 text-gray-600 text-xs"
                    >
                      {tip.duration}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-gray-50 text-gray-600 text-xs"
                    >
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
            <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <CardContent className="p-12 text-center">
                <Sparkles className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No tips found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to discover new wellness
                  practices.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Expert Advice Section */}
        <section className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Expert Advice
              </h2>
              <p className="text-lg text-gray-600">
                Book appointments with certified professionals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: "1",
                  name: "Dr. Sarah Chen",
                  specialty: "Gynecologist",
                  experience: "12+ years",
                  rating: 4.9,
                  reviews: 156,
                  price: 120,
                  image: "/images/doctor-1.svg",
                  specialties: ["Hormonal Health", "PCOS", "Fertility"],
                  nextAvailable: "Tomorrow 2:00 PM",
                },
                {
                  id: "2",
                  name: "Dr. Maya Patel",
                  specialty: "Therapist",
                  experience: "8+ years",
                  rating: 4.8,
                  reviews: 203,
                  price: 95,
                  image: "/images/therapist-1.svg",
                  specialties: ["Anxiety", "Women's Mental Health", "Trauma"],
                  nextAvailable: "Today 4:30 PM",
                },
                {
                  id: "3",
                  name: "Dr. Lisa Rodriguez",
                  specialty: "Nutritionist",
                  experience: "10+ years",
                  rating: 4.7,
                  reviews: 89,
                  price: 85,
                  image: "/images/nutritionist-1.svg",
                  specialties: [
                    "Cycle Nutrition",
                    "Weight Management",
                    "Gut Health",
                  ],
                  nextAvailable: "Friday 10:00 AM",
                },
                {
                  id: "4",
                  name: "Dr. Amanda Kim",
                  specialty: "Endocrinologist",
                  experience: "15+ years",
                  rating: 4.9,
                  reviews: 134,
                  price: 150,
                  image: "/images/endocrinologist-1.svg",
                  specialties: ["Thyroid", "Hormonal Imbalances", "Diabetes"],
                  nextAvailable: "Monday 9:00 AM",
                },
                {
                  id: "5",
                  name: "Dr. Jennifer Walsh",
                  specialty: "Psychiatrist",
                  experience: "11+ years",
                  rating: 4.8,
                  reviews: 178,
                  price: 140,
                  image: "/images/psychiatrist-1.svg",
                  specialties: [
                    "Depression",
                    "Postpartum",
                    "Medication Management",
                  ],
                  nextAvailable: "Wednesday 1:00 PM",
                },
                {
                  id: "6",
                  name: "Dr. Rachel Green",
                  specialty: "Wellness Coach",
                  experience: "6+ years",
                  rating: 4.6,
                  reviews: 92,
                  price: 75,
                  image: "/images/coach-1.svg",
                  specialties: [
                    "Lifestyle Changes",
                    "Stress Management",
                    "Goal Setting",
                  ],
                  nextAvailable: "Tomorrow 11:00 AM",
                },
              ].map((expert) => (
                <Card
                  key={expert.id}
                  className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <div className="relative">
                    <img
                      src={expert.image || "/images/doctor-placeholder.svg"}
                      alt={expert.name}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    />
                    <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-700">
                      {expert.specialty}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-gray-800 mb-1">
                      {expert.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {expert.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({expert.reviews} reviews)
                      </span>
                      <span className="text-sm text-gray-500">
                        • {expert.experience}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Specialties:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {expert.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-blue-50 border-blue-200 text-blue-600"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-600">Next available:</p>
                        <p className="text-sm font-medium text-gray-800">
                          {expert.nextAvailable}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">
                          ${expert.price}
                        </p>
                        <p className="text-xs text-gray-500">per session</p>
                      </div>
                    </div>

                    <ProtectedAction>
                      <Button className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                    </ProtectedAction>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bookmarked Tips */}
        {bookmarkedTips.length > 0 && (
          <section className="container px-4 md:px-6 mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Bookmark className="h-6 w-6 text-yellow-500" />
                Your Bookmarked Tips
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips
                .filter((tip) => bookmarkedTips.includes(tip.id))
                .map((tip) => (
                  <Card
                    key={`bookmarked-${tip.id}`}
                    className="border-0 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                          {tip.icon}
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {tip.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {tip.content.substring(0, 80)}...
                      </p>
                      <Badge
                        className={`${getCategoryColor(tip.category)} text-xs`}
                      >
                        {tip.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
