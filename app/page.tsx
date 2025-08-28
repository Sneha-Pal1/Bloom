"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Heart,
  Play,
  CheckCircle,
  Star,
  X,
  Youtube,
  Linkedin,
  User,
  LogOut,
  Sparkles,
  Calendar,
  Brain,
  Users,
  ShoppingBag,
  Bot,
  MessageCircle,
  Zap,
  Shield,
  Clock,
  Target,
  Plus,
  ShoppingCart,
  Activity,
  Moon,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";

// Routine data
const routineLibrary = [
  {
    id: 1,
    name: "Morning Energizer Flow",
    duration: "15 min",
    difficulty: "Beginner",
    phase: "All Phases",
    description:
      "Start your day with gentle stretches and energizing movements to awaken your body and mind.",
    benefits: [
      "Increases energy",
      "Improves flexibility",
      "Boosts mood",
      "Enhances focus",
    ],
    poses: [
      "Sun Salutation",
      "Cat-Cow Stretch",
      "Warrior I",
      "Tree Pose",
      "Child's Pose",
    ],
    icon: <Sun className="h-6 w-6" />,
    color: "from-yellow-400 to-orange-500",
    price: 0, // Free routine
  },
  {
    id: 2,
    name: "PMS Relief Sequence",
    duration: "20 min",
    difficulty: "Beginner",
    phase: "Luteal Phase",
    description:
      "Soothing poses designed to ease PMS symptoms and provide comfort during your luteal phase.",
    benefits: [
      "Reduces cramps",
      "Relieves bloating",
      "Calms mind",
      "Improves circulation",
    ],
    poses: [
      "Child's Pose",
      "Cat-Cow",
      "Supine Twist",
      "Legs Up Wall",
      "Savasana",
    ],
    icon: <Heart className="h-6 w-6" />,
    color: "from-pink-400 to-rose-500",
    price: 0,
  },
  {
    id: 3,
    name: "Power Flow for Ovulation",
    duration: "25 min",
    difficulty: "Intermediate",
    phase: "Ovulation Phase",
    description:
      "Dynamic flow to harness your peak energy during ovulation with strength-building poses.",
    benefits: [
      "Builds strength",
      "Increases stamina",
      "Boosts confidence",
      "Enhances power",
    ],
    poses: [
      "Warrior II",
      "Side Plank",
      "Crow Pose",
      "Camel Pose",
      "Wheel Pose",
    ],
    icon: <Zap className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-600",
    price: 0,
  },
  {
    id: 4,
    name: "Restorative Evening Wind Down",
    duration: "30 min",
    difficulty: "Beginner",
    phase: "All Phases",
    description:
      "Gentle, restorative poses to help you unwind and prepare for restful sleep.",
    benefits: [
      "Promotes relaxation",
      "Improves sleep",
      "Reduces stress",
      "Calms nervous system",
    ],
    poses: [
      "Supported Child's Pose",
      "Gentle Twists",
      "Legs Up Wall",
      "Corpse Pose",
    ],
    icon: <Moon className="h-6 w-6" />,
    color: "from-indigo-400 to-purple-500",
    price: 0,
  },
  {
    id: 5,
    name: "Cycle Sync Complete Program",
    duration: "4 weeks",
    difficulty: "All Levels",
    phase: "Full Cycle",
    description:
      "Comprehensive 4-week program with different routines for each phase of your menstrual cycle.",
    benefits: [
      "Complete cycle support",
      "Personalized routines",
      "Expert guidance",
      "Progress tracking",
    ],
    poses: [
      "28 different sequences",
      "Phase-specific poses",
      "Breathing exercises",
      "Meditation",
    ],
    icon: <Target className="h-6 w-6" />,
    color: "from-emerald-400 to-teal-500",
    price: 29.99, // Premium routine
  },
];

export default function WellnessLanding() {
  const router = useRouter();
  const {
    isAuthenticated,
    user,
    logout,
    showAuthModal,
    setShowAuthModal,
    authModalTab,
  } = useAuth();

  // State management
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<
    (typeof routineLibrary)[0] | null
  >(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cart, setCart] = useState<typeof routineLibrary>([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const handleStartJourney = () => {
    router.push("/dashboard");
  };

  const handleStartToday = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleExploreFeatures = () => {
    router.push("/explore");
  };

  const handleStartRoutine = (routine: (typeof routineLibrary)[0]) => {
    setSelectedRoutine(routine);
    setShowRoutineModal(true);
  };

  const handleRoutineStart = () => {
    setShowRoutineModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      router.push("/dashboard");
    }, 2000);
  };

  const handleAddToCart = (routine: (typeof routineLibrary)[0]) => {
    if (!cart.find((item) => item.id === routine.id)) {
      setCart((prev) => [...prev, routine]);
    }
  };

  const removeFromCart = (routineId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== routineId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleSetRoutine = () => {
    if (isAuthenticated) {
      router.push("/routine-builder");
    } else {
      setShowAuthModal(true);
    }
  };

  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Cycle-Synced Routines",
      description: "Workouts that adapt to your menstrual cycle phases",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Guidance",
      description: "Personalized wellness recommendations just for you",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Supportive Community",
      description: "Connect with women on similar wellness journeys",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Curated Shop",
      description: "Premium wellness products and digital resources",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Expert Consultations",
      description: "Access to certified wellness professionals",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "Your wellness data is secure and private",
    },
  ];

  const stats = [
    { number: "10k+", label: "Women Supported" },
    { number: "500+", label: "Wellness Routines" },
    { number: "50+", label: "Expert Partners" },
    { number: "4.9★", label: "User Rating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="space-y-0">
        {/* Hero Section */}
        <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Sparkles */}
            {[...Array(12)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-yellow-300 opacity-30 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
                size={12 + Math.random() * 8}
              />
            ))}

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-pulse-soft"></div>
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl opacity-15 animate-pulse-soft"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center min-h-[600px]">
              {/* Left Content */}
              <div className="space-y-8 lg:pr-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Trusted by 10k+ women
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-800 leading-[1.1]">
                    Your Space to{" "}
                    <span className="gradient-text block">Reset,</span>
                    <span className="gradient-text">Reflect</span> &{" "}
                    <span className="gradient-text">Rise</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                    AI-powered wellness platform designed specifically for
                    women. Track your cycle, follow gentle workouts, and grow
                    through personalized self-care routines.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 btn-hover-lift"
                    onClick={handleStartJourney}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Your Journey
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 rounded-full px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 btn-hover-lift backdrop-blur-sm bg-white/80"
                    onClick={handleExploreFeatures}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Explore Features
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="pt-8">
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    Trusted by wellness experts
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        4.9/5
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">2,847</span> reviews
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="flex justify-center lg:justify-center relative lg:pr-16">
                <div className="relative group lg:ml-8">
                  {/* Main Image Container */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-pink-300 to-green-300 rounded-3xl blur-2xl opacity-40 animate-pulse-soft group-hover:opacity-60 transition-opacity duration-500"></div>

                    {/* Image */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                      <Image
                        src="/images/generated-image.png"
                        width={500}
                        height={500}
                        alt="Woman meditating peacefully"
                        className="rounded-2xl shadow-lg animate-float"
                        priority
                      />
                    </div>
                  </div>

                  {/* Floating Stats Cards */}
                  <div
                    className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">
                          500+
                        </div>
                        <div className="text-xs text-gray-600">Routines</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">
                          10k+
                        </div>
                        <div className="text-xs text-gray-600">Women</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">
                          4.9★
                        </div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-white/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Everything You Need for Wellness
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools designed specifically for women's unique
                wellness needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
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

        {/* How It Works */}
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
                  Simple Steps to Better Wellness
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Choose Your Goal
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Select from yoga, strength, or mindfulness based on your
                        current needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Follow AI Guidance
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Get personalized recommendations with gentle guidance
                        and modifications
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Track Progress
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Monitor your wellness journey and celebrate every
                        milestone
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Routines */}
        <section className="py-16 bg-white/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Popular Wellness Routines
              </h2>
              <p className="text-lg text-gray-600">
                Discover routines designed for every phase of your cycle
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {routineLibrary.slice(0, 3).map((routine) => (
                <Card
                  key={routine.id}
                  className="border-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${routine.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}
                    >
                      {routine.icon}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {routine.name}
                      </h3>
                      {routine.price > 0 && (
                        <span className="text-sm font-bold text-purple-600">
                          ${routine.price}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {routine.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {routine.duration}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full ${
                          routine.difficulty === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : routine.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {routine.difficulty}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full"
                        onClick={() => handleStartRoutine(routine)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Start Routine
                      </Button>
                      {routine.price > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => handleAddToCart(routine)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cart Button */}
            {cart.length > 0 && (
              <div className="text-center">
                <Button
                  onClick={() => setShowCartModal(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full px-6 py-3 shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart ({cart.length})
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Loved by Women Everywhere
              </h2>
              <p className="text-lg text-gray-600">
                Real stories from our wellness community
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah M.",
                  role: "Yoga enthusiast",
                  content:
                    "The cycle-friendly workouts have been a game-changer. Finally, fitness that works with my body.",
                  avatar: "S",
                },
                {
                  name: "Maya L.",
                  role: "Working mom",
                  content:
                    "The AI recommendations help me find the perfect routine for my energy level each day.",
                  avatar: "M",
                },
                {
                  name: "Aria K.",
                  role: "Wellness coach",
                  content:
                    "I recommend Bloom to all my clients. It's gentle, effective, and truly understands women.",
                  avatar: "A",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg card-hover"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Ready to Transform Your Wellness Journey?
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of women discovering a gentler, more personalized
                approach to health and happiness
              </p>
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 btn-hover-lift"
                  onClick={handleStartToday}
                >
                  Start Free Today
                </Button>
                <p className="text-sm text-gray-500">
                  No credit card required • 7-day free trial
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-purple-500" />
                <span className="text-xl font-semibold text-gray-800">
                  Bloom
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering women through personalized wellness journeys.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Product</h3>
              <div className="space-y-2">
                <Link
                  href="/routines"
                  className="block text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Routines
                </Link>
                <Link
                  href="/community"
                  className="block text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Community
                </Link>
                <Link
                  href="/shop"
                  className="block text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Shop
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Resources</h3>
              <div className="space-y-2">
                <Link
                  href="/tips"
                  className="block text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Wellness Tips
                </Link>
                <Link
                  href="/explore"
                  className="block text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  Explore
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-purple-600 text-sm transition-colors"
                >
                  About
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Connect</h3>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              © 2025 Bloom. Made with love for your wellness journey.
            </p>
          </div>
        </div>
      </footer>

      {/* Routine Details Modal */}
      <Dialog open={showRoutineModal} onOpenChange={setShowRoutineModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedRoutine && (
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${selectedRoutine.color} rounded-xl flex items-center justify-center text-white`}
                >
                  {selectedRoutine.icon}
                </div>
              )}
              {selectedRoutine?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedRoutine && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedRoutine.duration}
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    selectedRoutine.difficulty === "Beginner"
                      ? "bg-green-100 text-green-700"
                      : selectedRoutine.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedRoutine.difficulty}
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {selectedRoutine.phase}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {selectedRoutine.description}
              </p>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Benefits:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRoutine.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  What's Included:
                </h4>
                <div className="space-y-2">
                  {selectedRoutine.poses.map((pose, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{pose}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowRoutineModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRoutineStart}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Now
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Routine Added Successfully!
            </h3>
            <p className="text-gray-600">
              Your routine has been added to your dashboard. Redirecting you
              now...
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cart Modal */}
      <Dialog open={showCartModal} onOpenChange={setShowCartModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart ({cart.length} items)
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.duration} • {item.difficulty}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        ${item.price}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-purple-600">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowCartModal(false)}
                      className="flex-1"
                    >
                      Continue Shopping
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
        defaultTab={authModalTab}
      />
    </div>
  );
}
