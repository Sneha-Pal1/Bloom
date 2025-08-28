"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Play,
  CheckCircle,
  Sparkles,
  Calendar,
  Brain,
  Users,
  ShoppingBag,
  MessageCircle,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Activity,
  BarChart3,
  Lightbulb,
  TrendingDown,
  X,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { useState } from "react";

// Wellness Hub Component
function WellnessHub() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [videoModal, setVideoModal] = useState<string | null>(null);

  const wellnessCategories = [
    {
      id: "guided-yoga",
      title: "Guided Yoga & Workouts",
      description: "Personalized yoga routines for your specific needs",
      icon: <Activity className="h-8 w-8" />,
      color: "from-purple-100 to-purple-200",
      textColor: "text-purple-600",
    },
    {
      id: "mood-tracking",
      title: "Mood Tracking",
      description: "Monitor and understand your emotional patterns",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "from-pink-100 to-pink-200",
      textColor: "text-pink-600",
    },
    {
      id: "daily-tips",
      title: "Daily Tips",
      description: "Expert wellness advice tailored to your cycle",
      icon: <Lightbulb className="h-8 w-8" />,
      color: "from-green-100 to-green-200",
      textColor: "text-green-600",
    },
    {
      id: "wellness-insights",
      title: "Wellness Insights",
      description: "Data-driven insights about your health patterns",
      icon: <TrendingDown className="h-8 w-8" />,
      color: "from-blue-100 to-blue-200",
      textColor: "text-blue-600",
    },
  ];

  const yogaCategories = [
    {
      id: "overall-health",
      title: "Overall Health Yoga",
      description:
        "Boost vitality and flexibility with gentle wellness routines for daily energy.",
      icon: <Heart className="h-6 w-6" />,
      color: "from-purple-100 to-purple-200",
    },
    {
      id: "irregular-period",
      title: "Late Irregular Period Yoga",
      description:
        "Gentle poses and breathing techniques to support menstrual regularity.",
      icon: <Calendar className="h-6 w-6" />,
      color: "from-pink-100 to-pink-200",
    },
    {
      id: "pcos",
      title: "PCOS Support Yoga",
      description:
        "Targeted sequences to manage PCOS symptoms and support hormonal health.",
      icon: <Shield className="h-6 w-6" />,
      color: "from-green-100 to-green-200",
    },
    {
      id: "period-cramps",
      title: "Period Cramps Relief",
      description:
        "Soothing poses to ease menstrual discomfort and provide natural pain relief.",
      icon: <Heart className="h-6 w-6" />,
      color: "from-orange-100 to-orange-200",
    },
    {
      id: "mood-swings",
      title: "Mood Swings Balance",
      description:
        "Calming practices to stabilize emotions and promote mental clarity.",
      icon: <Brain className="h-6 w-6" />,
      color: "from-indigo-100 to-indigo-200",
    },
  ];

  const yogaPoses = {
    "overall-health": [
      {
        name: "Sun Salutation",
        duration: "5-10 min",
        difficulty: "Beginner",
        video: "sun-salutation",
      },
      {
        name: "Warrior Flow",
        duration: "8-12 min",
        difficulty: "Intermediate",
        video: "warrior-flow",
      },
      {
        name: "Tree Pose",
        duration: "2-3 min",
        difficulty: "Beginner",
        video: "tree-pose",
      },
      {
        name: "Downward Dog",
        duration: "3-5 min",
        difficulty: "Beginner",
        video: "downward-dog",
      },
    ],
    "irregular-period": [
      {
        name: "Butterfly Pose",
        duration: "3-5 min",
        difficulty: "Beginner",
        video: "butterfly-pose",
      },
      {
        name: "Cobra Pose",
        duration: "2-4 min",
        difficulty: "Beginner",
        video: "cobra-pose",
      },
      {
        name: "Camel Pose",
        duration: "1-3 min",
        difficulty: "Intermediate",
        video: "camel-pose",
      },
      {
        name: "Bridge Pose",
        duration: "3-5 min",
        difficulty: "Beginner",
        video: "bridge-pose",
      },
    ],
    pcos: [
      {
        name: "Bharadvajasana",
        duration: "2-4 min",
        difficulty: "Beginner",
        video: "bharadvajasana",
      },
      {
        name: "Dhanurasana",
        duration: "1-3 min",
        difficulty: "Intermediate",
        video: "dhanurasana",
      },
      {
        name: "Malasana",
        duration: "2-5 min",
        difficulty: "Beginner",
        video: "malasana",
      },
      {
        name: "Surya Namaskara",
        duration: "8-12 min",
        difficulty: "Beginner",
        video: "surya-namaskara",
      },
    ],
    "period-cramps": [
      {
        name: "Child's Pose",
        duration: "3-8 min",
        difficulty: "Beginner",
        video: "childs-pose",
      },
      {
        name: "Cat-Cow Stretch",
        duration: "3-5 min",
        difficulty: "Beginner",
        video: "cat-cow",
      },
      {
        name: "Supine Twist",
        duration: "2-4 min",
        difficulty: "Beginner",
        video: "supine-twist",
      },
      {
        name: "Legs Up Wall",
        duration: "5-15 min",
        difficulty: "Beginner",
        video: "legs-up-wall",
      },
    ],
    "mood-swings": [
      {
        name: "Seated Forward Fold",
        duration: "3-5 min",
        difficulty: "Beginner",
        video: "seated-forward-fold",
      },
      {
        name: "Restorative Fish",
        duration: "5-10 min",
        difficulty: "Beginner",
        video: "restorative-fish",
      },
      {
        name: "Gentle Backbend",
        duration: "2-4 min",
        difficulty: "Beginner",
        video: "gentle-backbend",
      },
      {
        name: "Savasana",
        duration: "5-20 min",
        difficulty: "Beginner",
        video: "savasana",
      },
    ],
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "guided-yoga") {
      setActiveModal("yoga-menu");
    } else {
      // For other categories, you can add different modal types
      setActiveModal(categoryId);
    }
  };

  const handleYogaCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveModal("yoga-poses");
  };

  const handleVideoPlay = (videoId: string) => {
    setVideoModal(videoId);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedCategory(null);
  };

  const closeVideoModal = () => {
    setVideoModal(null);
  };

  return (
    <>
      {/* Main Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wellnessCategories.map((category) => (
          <Card
            key={category.id}
            className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center ${category.textColor} mx-auto mb-4`}
              >
                {category.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {category.description}
              </p>
              <Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-lift">
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Yoga Categories Modal */}
      {activeModal === "yoga-menu" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto border-0">
            <div className="p-8">
              {/* Header with centered title and decorative line */}
              <div className="text-center mb-10 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Guided Yoga & Workouts
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Choose from our specialized yoga routines designed to support
                  your unique wellness needs and health goals
                </p>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {yogaCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="border-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer card-hover transform hover:scale-105"
                    onClick={() => handleYogaCategoryClick(category.id)}
                  >
                    <CardContent className="p-4 text-center h-72 flex flex-col justify-between">
                      <div className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-3 shadow-lg`}
                        >
                          {category.icon}
                        </div>
                        <h3 className="font-bold text-gray-800 mb-3 text-sm leading-tight">
                          {category.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed flex-1">
                          {category.description}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-3 text-xs py-2"
                      >
                        View Routines
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Yoga Poses Modal */}
      {activeModal === "yoga-poses" && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setActiveModal("yoga-menu")}
                    className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-sm"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-sm"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Category Info */}
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    {
                      yogaCategories.find((cat) => cat.id === selectedCategory)
                        ?.title
                    }
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
                    {
                      yogaCategories.find((cat) => cat.id === selectedCategory)
                        ?.description
                    }
                  </p>
                </div>

                {/* Difficulty Levels */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Difficulty Levels
                  </h3>
                  <div className="flex justify-center gap-4">
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-green-200">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">
                        Beginner
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-yellow-200">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-yellow-700">
                        Intermediate
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-red-200">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-red-700">
                        Advanced
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-6">
                {/* Yoga Poses Grid - 2 per row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {yogaPoses[selectedCategory as keyof typeof yogaPoses]?.map(
                    (pose, index) => (
                      <Card
                        key={index}
                        className="border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        <CardContent className="p-0">
                          {/* Image Section */}
                          <div className="relative">
                            <div className="w-full h-48 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                              <Activity className="h-16 w-16 text-purple-400 opacity-60" />
                            </div>
                            <button
                              onClick={() => handleVideoPlay(pose.video)}
                              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                            >
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                <Play className="h-8 w-8 text-purple-600 ml-1" />
                              </div>
                            </button>
                          </div>

                          {/* Content Section */}
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                                  {pose.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Improves spinal flexibility and relieves
                                  tension
                                </p>
                              </div>
                              <button
                                onClick={() => handleVideoPlay(pose.video)}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              >
                                <Play className="h-4 w-4 text-gray-600 ml-0.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  pose.difficulty === "Beginner"
                                    ? "bg-green-100 text-green-700"
                                    : pose.difficulty === "Intermediate"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {pose.difficulty}
                              </span>
                              <div className="flex items-center gap-1 text-gray-500">
                                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                </div>
                                <span className="text-sm">{pose.duration}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Video Modal */}
      {videoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {yogaPoses[selectedCategory as keyof typeof yogaPoses]?.find(
                  (pose) => pose.video === videoModal
                )?.name || "Cat-Cow Pose"}
              </h2>
              <button
                onClick={closeVideoModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Video Section */}
            <div className="px-6">
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-6">
                <div className="aspect-video bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <Activity className="h-20 w-20 text-purple-400 opacity-60" />
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-4 text-white">
                    <button className="hover:scale-110 transition-transform">
                      <Play className="h-6 w-6" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span>0:00</span>
                        <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="w-1/4 h-full bg-white rounded-full"></div>
                        </div>
                        <span>0:07</span>
                      </div>
                    </div>
                    <button className="hover:scale-110 transition-transform">
                      <div className="w-5 h-5 border border-white rounded flex items-center justify-center">
                        <div className="w-2 h-2 border border-white"></div>
                      </div>
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <div className="w-5 h-5 flex flex-col gap-0.5">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 bg-white"></div>
                          <div className="w-1 h-1 bg-white"></div>
                        </div>
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 bg-white"></div>
                          <div className="w-1 h-1 bg-white"></div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Practice Button */}
            <div className="p-6 pt-0">
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={closeVideoModal}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Practice
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Other Category Modals (Placeholder) */}
      {activeModal && !["yoga-menu", "yoga-poses"].includes(activeModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {
                    wellnessCategories.find((cat) => cat.id === activeModal)
                      ?.title
                  }
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {
                    wellnessCategories.find((cat) => cat.id === activeModal)
                      ?.icon
                  }
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Coming Soon!
                </h3>
                <p className="text-gray-600">
                  This feature is under development and will be available soon.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default function ExplorePage() {
  const router = useRouter();
  const { showAuthModal, setShowAuthModal } = useAuth();

  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Cycle-Synced Routines",
      description:
        "Workouts that adapt to your menstrual cycle phases for optimal results",
      color: "from-purple-100 to-purple-200",
      textColor: "text-purple-600",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Guidance",
      description:
        "Personalized wellness recommendations based on your unique needs",
      color: "from-pink-100 to-pink-200",
      textColor: "text-pink-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Supportive Community",
      description:
        "Connect with women on similar wellness journeys and share experiences",
      color: "from-green-100 to-green-200",
      textColor: "text-green-600",
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Curated Wellness Shop",
      description:
        "Premium products and digital resources for your wellness journey",
      color: "from-blue-100 to-blue-200",
      textColor: "text-blue-600",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Expert Consultations",
      description:
        "Access to certified wellness professionals and personalized advice",
      color: "from-orange-100 to-orange-200",
      textColor: "text-orange-600",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy & Security",
      description:
        "Your wellness data is protected with enterprise-grade security",
      color: "from-indigo-100 to-indigo-200",
      textColor: "text-indigo-600",
    },
  ];

  const stats = [
    {
      number: "10k+",
      label: "Active Users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      number: "500+",
      label: "Wellness Routines",
      icon: <Target className="h-5 w-5" />,
    },
    {
      number: "50+",
      label: "Expert Partners",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      number: "4.9★",
      label: "User Rating",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="space-y-0">
        {/* Hero Section */}
        <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
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
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gray-800 leading-tight">
                Everything You Need for{" "}
                <span className="gradient-text">Wellness</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Discover comprehensive tools designed specifically for women's
                unique wellness needs, from cycle-synced routines to AI-powered
                guidance.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 text-center card-hover"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="text-purple-600">{stat.icon}</div>
                      <div className="text-2xl font-bold text-gray-800">
                        {stat.number}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Wellness Hub */}
        <section className="py-16 bg-white/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your Wellness Hub
              </h2>
              <p className="text-lg text-gray-600">
                Explore personalized wellness tools designed for your unique
                needs
              </p>
            </div>

            <WellnessHub />
          </div>
        </section>

        {/* Featured Demo */}
        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl blur-2xl opacity-50"></div>
                <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 card-hover">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Morning Flow
                    </h3>
                    <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                      <Play className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-purple-600 font-medium">
                        15 min
                      </span>
                    </div>
                  </div>
                  <Image
                    src="/images/morning-flow.svg"
                    width={400}
                    height={250}
                    alt="Workout demo interface"
                    className="rounded-2xl mb-4 shadow-lg w-full"
                  />
                  <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-1/3"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    33% Complete
                  </p>
                </Card>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  Your Wellness Journey, Simplified
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Personalized Assessment
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Tell us about your goals, cycle, and preferences for
                        tailored recommendations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        AI-Powered Routines
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Get custom routines that adapt to your cycle, mood, and
                        energy levels
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Track & Celebrate
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Monitor your progress and celebrate every milestone on
                        your wellness journey
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-lift"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Start Your Journey
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Wellness Platform */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Comprehensive Wellness Platform
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every feature is thoughtfully designed to support your unique
                wellness journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center ${feature.textColor} mb-4`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="py-16 bg-white/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Quick Access to Your Favorites
              </h2>
              <p className="text-lg text-gray-600">
                Jump right into the features you love most
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/routines">
                <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-4">
                      <Target className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Browse Routines
                    </h3>
                    <p className="text-gray-600 text-sm">
                      500+ wellness routines
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/community">
                <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mx-auto mb-4">
                      <Users className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Join Community
                    </h3>
                    <p className="text-gray-600 text-sm">
                      10k+ supportive women
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/shop">
                <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-4">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Wellness Shop
                    </h3>
                    <p className="text-gray-600 text-sm">Curated products</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/tips">
                <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Daily Tips
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Expert wellness advice
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Ready to Transform Your Wellness?
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of women discovering a gentler, more sustainable
                approach to health and happiness
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-lift"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/routines")}
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-8 py-3 transition-all duration-300 btn-hover-lift"
                >
                  Browse Routines
                </Button>
              </div>
            </div>
          </div>
        </section>
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
