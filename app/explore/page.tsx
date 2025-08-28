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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";

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

        {/* Features Grid */}
        <section className="py-16 bg-white/50">
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

        {/* Quick Access Cards */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
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
