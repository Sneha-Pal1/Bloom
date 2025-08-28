"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
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
  Calendar,
  Activity,
  Brain,
  Users,
  MessageCircle,
  Plus,
  BarChart3,
  Target,
  Zap,
  Moon,
  Sun,
  Coffee,
  Apple,
  Dumbbell,
  Book,
  Camera,
  Send,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  Settings,
  Bell,
  Search,
  Filter,
  X,
  CheckCircle,
  Clock,
  Star,
  Lightbulb,
  Shield,
  Flame,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";

// Sample data for the dashboard
const cyclePhases = [
  {
    name: "Menstrual",
    days: "1-5",
    color: "bg-red-500",
    description: "Rest and reflect",
  },
  {
    name: "Follicular",
    days: "6-13",
    color: "bg-green-500",
    description: "Energy building",
  },
  {
    name: "Ovulation",
    days: "14-16",
    color: "bg-yellow-500",
    description: "Peak energy",
  },
  {
    name: "Luteal",
    days: "17-28",
    color: "bg-purple-500",
    description: "Prepare for rest",
  },
];

const communityPosts = [
  {
    id: 1,
    user: "Sarah M.",
    avatar: "👩‍🦰",
    time: "2h ago",
    content:
      "Just completed my first week of cycle syncing! Feeling so much more in tune with my body. The energy tracking really helped me understand my patterns. 💪",
    likes: 24,
    comments: 8,
    category: "Success Story",
  },
  {
    id: 2,
    user: "Emma K.",
    avatar: "👩‍🦱",
    time: "4h ago",
    content:
      "Anyone else struggling with PMS symptoms this week? Looking for natural remedies that have worked for you. The yoga routines have been helping but need more ideas! 🧘‍♀️",
    likes: 15,
    comments: 12,
    category: "Question",
  },
  {
    id: 3,
    user: "Dr. Lisa Chen",
    avatar: "👩‍⚕️",
    time: "6h ago",
    content:
      "Reminder: Your luteal phase is the perfect time for gentle, restorative activities. Listen to your body and don't push through fatigue. Self-care isn't selfish! ✨",
    likes: 45,
    comments: 6,
    category: "Expert Tip",
  },
];

const yogaRoutines = [
  {
    name: "Morning Flow",
    duration: "15 min",
    difficulty: "Beginner",
    phase: "All phases",
    description: "Gentle wake-up sequence",
    completed: true,
  },
  {
    name: "PMS Relief",
    duration: "20 min",
    difficulty: "Beginner",
    phase: "Luteal",
    description: "Soothing poses for comfort",
    completed: false,
  },
  {
    name: "Energy Boost",
    duration: "25 min",
    difficulty: "Intermediate",
    phase: "Follicular",
    description: "Dynamic flow for vitality",
    completed: false,
  },
];

const moodEmojis = [
  { emoji: "😢", label: "Very Low", value: 1 },
  { emoji: "😔", label: "Low", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "😊", label: "Good", value: 4 },
  { emoji: "😄", label: "Great", value: 5 },
];

const symptoms = [
  "Cramps",
  "Bloating",
  "Headache",
  "Fatigue",
  "Mood swings",
  "Breast tenderness",
  "Acne",
  "Food cravings",
  "Back pain",
  "Nausea",
];

const aiSuggestions = [
  {
    title: "Optimize Your Follicular Phase",
    description:
      "Based on your energy patterns, try high-intensity workouts on days 8-12 of your cycle.",
    icon: <Zap className="h-5 w-5" />,
    category: "Fitness",
  },
  {
    title: "Improve Sleep Quality",
    description:
      "Your data shows better mood when you sleep 7+ hours. Try a bedtime routine starting at 10 PM.",
    icon: <Moon className="h-5 w-5" />,
    category: "Sleep",
  },
  {
    title: "Nutrition Timing",
    description:
      "Consider increasing iron-rich foods during your menstrual phase to combat fatigue.",
    icon: <Apple className="h-5 w-5" />,
    category: "Nutrition",
  },
];

export default function Dashboard() {
  const {
    isAuthenticated,
    user,
    logout,
    showAuthModal,
    setShowAuthModal,
    authModalTab,
  } = useAuth();

  // State management
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [mood, setMood] = useState([3]);
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [cycleDay, setCycleDay] = useState(14);
  const [lastPeriod, setLastPeriod] = useState("2024-02-15");
  const [newPost, setNewPost] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [waterIntake, setWaterIntake] = useState(4);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [exerciseMinutes, setExerciseMinutes] = useState(30);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [streak, setStreak] = useState(7);
  const [completedToday, setCompletedToday] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleStartRoutine = () => {
    setCompletedToday(true);
    // Here you would navigate to the actual routine
  };

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
  );

  // Helper functions
  const getCurrentPhase = () => {
    if (cycleDay <= 5) return cyclePhases[0];
    if (cycleDay <= 13) return cyclePhases[1];
    if (cycleDay <= 16) return cyclePhases[2];
    return cyclePhases[3];
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleNewPost = () => {
    if (newPost.trim()) {
      // Add new post logic here
      setNewPost("");
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Header with Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Good{" "}
                {currentTime.getHours() < 12
                  ? "Morning"
                  : currentTime.getHours() < 17
                  ? "Afternoon"
                  : "Evening"}
                ! ✨
              </h1>
              <p className="text-gray-600">{formatDate(currentTime)}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIChat(true)}
                className="rounded-full"
              >
                <Brain className="h-4 w-4 mr-2" />
                Ask AI
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="flex gap-1 overflow-x-auto">
              {[
                {
                  id: "overview",
                  label: "Overview",
                  icon: <BarChart3 className="h-4 w-4" />,
                  color: "from-purple-500 to-indigo-500",
                  bgColor: "bg-purple-50",
                  textColor: "text-purple-700",
                },
                {
                  id: "cycle",
                  label: "Cycle Tracking",
                  icon: <Calendar className="h-4 w-4" />,
                  color: "from-pink-500 to-rose-500",
                  bgColor: "bg-pink-50",
                  textColor: "text-pink-700",
                },
                {
                  id: "routines",
                  label: "Routines",
                  icon: <Activity className="h-4 w-4" />,
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-50",
                  textColor: "text-green-700",
                },
                {
                  id: "community",
                  label: "Community",
                  icon: <Users className="h-4 w-4" />,
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-50",
                  textColor: "text-blue-700",
                },
                {
                  id: "data",
                  label: "My Data",
                  icon: <Target className="h-4 w-4" />,
                  color: "from-orange-500 to-amber-500",
                  bgColor: "bg-orange-50",
                  textColor: "text-orange-700",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 min-w-fit
                    ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                        : `${tab.bgColor} ${tab.textColor} hover:shadow-md hover:scale-102`
                    }
                  `}
                >
                  <div
                    className={`
                    ${activeTab === tab.id ? "text-white" : ""}
                  `}
                  >
                    {tab.icon}
                  </div>
                  <span className="font-semibold">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-pink-50 to-pink-100 border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">
                    Day {cycleDay}
                  </div>
                  <div className="text-sm text-gray-600">Current Cycle</div>
                  <div className="text-xs text-pink-500 mt-1">
                    {getCurrentPhase().name}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {mood[0]}/5
                  </div>
                  <div className="text-sm text-gray-600">Today's Mood</div>
                  <div className="text-lg mt-1">
                    {moodEmojis[mood[0] - 1]?.emoji}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {waterIntake}/8
                  </div>
                  <div className="text-sm text-gray-600">Water Glasses</div>
                  <div className="text-lg mt-1">💧</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {streak}
                  </div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                  <div className="text-lg mt-1">🔥</div>
                </CardContent>
              </Card>
            </div>

            {/* AI Suggestions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Personalized Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-purple-600">{suggestion.icon}</div>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {suggestion.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {suggestion.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Focus */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Today's Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Complete morning routine</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Drink 8 glasses of water</span>
                    <div className="text-sm text-gray-500">{waterIntake}/8</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Log mood & symptoms</span>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">30 min exercise</span>
                    <div className="text-sm text-gray-500">
                      {exerciseMinutes}/30 min
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Phase-Specific Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {getCurrentPhase().name} Phase
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {getCurrentPhase().description}
                      </p>
                      <div className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full inline-block">
                        Days {getCurrentPhase().days}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      💡 During your {getCurrentPhase().name.toLowerCase()}{" "}
                      phase, focus on gentle movements and self-care.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Cycle Tracking Tab */}
        {activeTab === "cycle" && (
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-pink-600" />
                  Menstrual Cycle Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Cycle Visualization */}
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <div className="w-48 h-48 rounded-full border-8 border-gray-200 relative">
                        {cyclePhases.map((phase, index) => (
                          <div
                            key={phase.name}
                            className={`absolute inset-0 rounded-full border-8 ${phase.color} opacity-70`}
                            style={{
                              clipPath: `polygon(50% 50%, 50% 0%, ${
                                50 + index * 25
                              }% 0%, ${50 + (index + 1) * 25}% 50%)`,
                            }}
                          />
                        ))}
                        <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-pink-600">
                              Day {cycleDay}
                            </div>
                            <div className="text-sm text-gray-600">
                              {getCurrentPhase().name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {cyclePhases.map((phase) => (
                        <div
                          key={phase.name}
                          className="flex items-center gap-2"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${phase.color}`}
                          ></div>
                          <span>{phase.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cycle Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Period Start Date
                      </label>
                      <Input
                        type="date"
                        value={lastPeriod}
                        onChange={(e) => setLastPeriod(e.target.value)}
                        className="rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Cycle Day
                      </label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[cycleDay]}
                          onValueChange={(value) => setCycleDay(value[0])}
                          max={28}
                          min={1}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">
                          {cycleDay}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-semibold text-pink-800 mb-2">
                        Predictions
                      </h4>
                      <div className="space-y-2 text-sm text-pink-700">
                        <div>Next Period: March 15, 2024</div>
                        <div>Fertile Window: March 8-12, 2024</div>
                        <div>PMS Symptoms: March 12-14, 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Symptom Tracking */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Today's Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  {symptoms.map((symptom) => (
                    <Button
                      key={symptom}
                      variant={
                        selectedSymptoms.includes(symptom)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleSymptom(symptom)}
                      className="rounded-full text-xs"
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mood (1-5)
                    </label>
                    <Slider
                      value={mood}
                      onValueChange={setMood}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      {moodEmojis.map((item) => (
                        <div key={item.value} className="text-center">
                          <div className="text-lg">{item.emoji}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <Textarea
                      placeholder="Any additional notes about how you're feeling today..."
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                    Save Today's Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Routines Tab */}
        {activeTab === "routines" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Routines
              </h2>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Routine
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yogaRoutines.map((routine, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            routine.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <span className="text-xs text-gray-500">
                          {routine.phase}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          routine.difficulty === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {routine.difficulty}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2">
                      {routine.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {routine.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {routine.duration}
                      </div>
                      <Button
                        size="sm"
                        className={`rounded-full ${
                          routine.completed
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                        }`}
                        disabled={routine.completed}
                      >
                        {routine.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recommended Routines */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Recommended for Your Current Phase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Gentle Flow Yoga
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Perfect for your current{" "}
                      {getCurrentPhase().name.toLowerCase()} phase
                    </p>
                    <Button
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full"
                    >
                      Try Now
                    </Button>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Breathing Meditation
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      5-minute calming session
                    </p>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                    >
                      Start Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === "community" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Community</h2>
              <Button
                onClick={() => setShowNewPost(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            {/* New Post Modal */}
            {showNewPost && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Share with the Community</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewPost(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="What's on your mind? Share your wellness journey, ask questions, or offer support..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[120px] rounded-lg"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          <Camera className="h-4 w-4 mr-1" />
                          Photo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Mood
                        </Button>
                      </div>
                      <Button
                        onClick={handleNewPost}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Community Posts */}
            <div className="space-y-6">
              {communityPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{post.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">
                              {post.user}
                            </span>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {post.time}
                            </span>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{post.content}</p>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-pink-600"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-green-600"
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* My Data Tab */}
        {activeTab === "data" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">
              My Wellness Data
            </h2>

            {/* Data Input Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Droplets className="h-5 w-5" />
                    Water Intake
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {waterIntake}
                      </div>
                      <div className="text-sm text-gray-600">glasses today</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setWaterIntake(Math.max(0, waterIntake - 1))
                        }
                        className="flex-1"
                      >
                        -
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setWaterIntake(waterIntake + 1)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        +
                      </Button>
                    </div>
                    <Progress value={(waterIntake / 8) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Moon className="h-5 w-5" />
                    Sleep Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {sleepHours}
                      </div>
                      <div className="text-sm text-gray-600">
                        hours last night
                      </div>
                    </div>
                    <Slider
                      value={[sleepHours]}
                      onValueChange={(value) => setSleepHours(value[0])}
                      max={12}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 text-center">
                      Recommended: 7-9 hours
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Dumbbell className="h-5 w-5" />
                    Exercise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {exerciseMinutes}
                      </div>
                      <div className="text-sm text-gray-600">minutes today</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setExerciseMinutes(Math.max(0, exerciseMinutes - 15))
                        }
                        className="flex-1"
                      >
                        -15
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setExerciseMinutes(exerciseMinutes + 15)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        +15
                      </Button>
                    </div>
                    <Progress
                      value={(exerciseMinutes / 60) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  This Week's Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      6.8
                    </div>
                    <div className="text-sm text-gray-600">Avg Water/Day</div>
                    <div className="text-xs text-green-600">
                      ↑ 12% from last week
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      7.2
                    </div>
                    <div className="text-sm text-gray-600">Avg Sleep/Night</div>
                    <div className="text-xs text-green-600">
                      ↑ 5% from last week
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      180
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Exercise Min
                    </div>
                    <div className="text-xs text-red-600">
                      ↓ 8% from last week
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600 mb-1">
                      4.2
                    </div>
                    <div className="text-sm text-gray-600">Avg Mood Score</div>
                    <div className="text-xs text-green-600">
                      ↑ 15% from last week
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Chat Modal */}
        {showAIChat && (
          <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Wellness Assistant
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Brain className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1 bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm">
                          Hi! I'm your AI wellness assistant. I can help you
                          create personalized routines, answer questions about
                          your cycle, and provide wellness tips. What would you
                          like to know?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about wellness, cycles, or routines..."
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="text-xs">
                    Create a routine for PMS
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Best foods for my cycle phase
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Why am I feeling tired?
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
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
