"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Play,
  Clock,
  Users,
  Star,
  Sparkles,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { ProtectedAction } from "@/components/protected-action";
// import { LottiePlayer } from "@/components/lottie-player"
// import { getLottieForExercise } from "@/lib/exercise-animations";

interface Routine {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  exercises: string[];
  rating: number;
  completions: number;
  image: string;
}

const routines: Routine[] = [
  {
    id: "1",
    name: "Morning Gentle Flow",
    description:
      "Start your day with gentle stretches and mindful breathing to awaken your body and center your mind.",
    duration: "15 min",
    difficulty: "Beginner",
    category: "Yoga",
    exercises: [
      "Cat-Cow Stretch",
      "Child's Pose",
      "Gentle Twists",
      "Mountain Pose",
      "Deep Breathing",
    ],
    rating: 4.8,
    completions: 1247,
    image: "/wellness1.jpg",
  },
  {
    id: "2",
    name: "Cycle Sync Strength",
    description:
      "Hormone-friendly strength training that adapts to your menstrual cycle phases for optimal results.",
    duration: "25 min",
    difficulty: "Intermediate",
    category: "Strength",
    exercises: [
      "Bodyweight Squats",
      "Modified Push-ups",
      "Glute Bridges",
      "Wall Sits",
      "Core Breathing",
    ],
    rating: 4.9,
    completions: 892,
    image: "/wellness2.jpg",
  },
  {
    id: "3",
    name: "Evening Wind Down",
    description:
      "Calming poses and meditation to help you transition into restful sleep and release the day's tension.",
    duration: "20 min",
    difficulty: "Beginner",
    category: "Yoga",
    exercises: [
      "Legs Up Wall",
      "Gentle Hip Circles",
      "Seated Meditation",
      "Gratitude Practice",
      "Savasana",
    ],
    rating: 4.7,
    completions: 1456,
    image: "/wellness3.jpg",
  },
  {
    id: "4",
    name: "Mindful Movement",
    description:
      "Gentle, flowing movements combined with breathwork to connect mind and body in harmony.",
    duration: "18 min",
    difficulty: "Beginner",
    category: "Mindfulness",
    exercises: [
      "Tai Chi Flow",
      "Walking Meditation",
      "Breath Awareness",
      "Body Scan",
      "Gentle Stretching",
    ],
    rating: 4.6,
    completions: 734,
    image: "/wellness4.jpg",
  },
  {
    id: "5",
    name: "PMS Relief Flow",
    description:
      "Specially designed sequence to ease cramps, reduce bloating, and support you during challenging days.",
    duration: "22 min",
    difficulty: "Beginner",
    category: "Therapeutic",
    exercises: [
      "Hip Openers",
      "Gentle Twists",
      "Supported Child's Pose",
      "Legs Up Wall",
      "Breathing Exercises",
    ],
    rating: 4.9,
    completions: 1123,
    image: "/wellness5.jpg",
  },
  {
    id: "6",
    name: "Energy Boost Flow",
    description:
      "Invigorating yet gentle sequence to naturally boost your energy when you're feeling low or tired.",
    duration: "12 min",
    difficulty: "Intermediate",
    category: "Energizing",
    exercises: [
      "Sun Salutations",
      "Warrior Poses",
      "Backbends",
      "Twists",
      "Energizing Breath",
    ],
    rating: 4.5,
    completions: 567,
    image: "/wellness1.jpg",
  },
];

const categories = [
  "All",
  "Yoga",
  "Strength",
  "Mindfulness",
  "Therapeutic",
  "Energizing",
];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const FloatingSparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <Sparkles
        key={i}
        className="absolute text-yellow-300 opacity-40 animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
        size={14}
      />
    ))}
  </div>
);

export default function Routines() {
  const router = useRouter();

  const {
    isAuthenticated,
    user,
    logout,
    showAuthModal,
    setShowAuthModal,
    authModalTab,
  } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoutines = routines.filter((routine) => {
    const matchesSearch =
      routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || routine.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "All" || routine.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Yoga: "bg-purple-100 text-purple-700 border-purple-200",
      Strength: "bg-green-100 text-green-700 border-green-200",
      Mindfulness: "bg-blue-100 text-blue-700 border-blue-200",
      Therapeutic: "bg-pink-100 text-pink-700 border-pink-200",
      Energizing: "bg-orange-100 text-orange-700 border-orange-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: "bg-green-100 text-green-700",
      Intermediate: "bg-yellow-100 text-yellow-700",
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
                Wellness <span className="gradient-text">Routines</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Gentle, cycle-friendly workouts and mindfulness practices
                designed to honor your body's natural rhythms and support your
                wellness journey.
              </p>
              <Button
                onClick={() => router.push("/routine-builder")}
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 btn-hover-lift"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Routine
              </Button>
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
                <input
                  type="text"
                  placeholder="Search wellness routines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full border border-purple-200 focus:border-purple-400 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
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

                {/* Difficulty Filters */}
                <div className="flex flex-wrap gap-2">
                  <Clock className="h-4 w-4 text-gray-500 mt-1" />
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={
                        selectedDifficulty === difficulty
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`rounded-full transition-all duration-300 ${
                        selectedDifficulty === difficulty
                          ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
                          : "border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300"
                      }`}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Routines Grid */}
        <section className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoutines.map((routine) => (
              <Card
                key={routine.id}
                className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={routine.image || "/wellness1.jpg"}
                    alt={routine.name}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover"
                    quality={75}
                    priority={false}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getDifficultyColor(routine.difficulty)}>
                      {routine.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-800 mb-2">
                        {routine.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(routine.category)}>
                          {routine.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          {routine.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{routine.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{routine.completions.toLocaleString()}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {routine.description}
                  </p>

                  {/* Lottie preview for the first exercise if available */}
                  {/* {getLottieForExercise(routine.exercises[0]) && (
                  <div className="mb-4 flex justify-center">
                    <LottiePlayer src={getLottieForExercise(routine.exercises[0])!} height={160} />
                  </div>
                )} */}

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      What's included:
                    </p>
                    <div className="space-y-1">
                      {routine.exercises.slice(0, 3).map((exercise, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                          {exercise}
                        </div>
                      ))}
                      {routine.exercises.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{routine.exercises.length - 3} more exercises
                        </div>
                      )}
                    </div>
                  </div>

                  <ProtectedAction>
                    <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl">
                      <Play className="h-4 w-4 mr-2" />
                      Start Routine
                    </Button>
                  </ProtectedAction>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRoutines.length === 0 && (
            <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
              <CardContent className="p-12 text-center">
                <Sparkles className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No routines found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to discover new wellness
                  routines.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
        defaultTab={authModalTab}
      />
    </div>
  );
}
