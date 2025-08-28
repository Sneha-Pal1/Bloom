"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";

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

  const handleStartToday = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      setShowAuthModal(true);
    }
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
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gray-800 leading-tight">
                    Your Space to <span className="gradient-text">Reset,</span>{" "}
                    <span className="gradient-text">Reflect</span> &{" "}
                    <span className="gradient-text">Rise</span>
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                    AI-powered wellness platform designed specifically for
                    women. Track your cycle, follow gentle workouts, and grow
                    through personalized self-care routines.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-lift"
                    onClick={handleStartToday}
                  >
                    Start Your Journey
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-8 py-3 transition-all duration-300 btn-hover-lift"
                    onClick={handleSetRoutine}
                  >
                    Explore Features
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl blur-3xl opacity-30 animate-pulse-soft"></div>
                  <Image
                    src="/images/generated-image.png"
                    width={450}
                    height={450}
                    alt="Woman meditating peacefully"
                    className="relative rounded-3xl shadow-2xl animate-float"
                  />
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

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
        defaultTab={authModalTab}
      />
    </div>
  );
}
