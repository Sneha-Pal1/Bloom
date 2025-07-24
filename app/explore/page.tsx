"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Play, CheckCircle, User, LogOut, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/components/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { GuidedYogaCard } from "@/components/guided-yoga-card"
import { MoodTrackingCard } from "@/components/mood-tracking-card"
import { DailyTipsCard } from "@/components/daily-tips-card"
import { WellnessInsightsCard } from "@/components/wellness-insights-card"

export default function ExplorePage() {
  const router = useRouter()
  const { isAuthenticated, user, logout, showAuthModal, setShowAuthModal, authModalTab, login } = useAuth()

  const handleAuthSuccess = () => {
    const mockUser = {
      id: "1",
      email: "user@example.com",
      name: "Wellness User",
    }
    login(mockUser)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/80 sticky top-0 z-50 border-b border-pink-100">
        <Link href="/" className="flex items-center justify-center">
          <Heart className="h-8 w-8 text-purple-400" />
          <span className="ml-2 text-xl font-semibold text-gray-800">Bloom</span>
        </Link>
        <nav className="ml-auto flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link href="/explore" className="text-sm font-medium text-purple-600 border-b-2 border-purple-400">
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

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600" />
              </div>
              <button onClick={logout} className="text-gray-600 hover:text-red-500 transition-colors" title="Logout">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              onClick={() => setShowAuthModal(true)}
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-6 py-2 text-sm transition-all duration-300 bg-transparent"
            >
              Login / Sign Up
            </Button>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Everything You Need for Wellness</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Gentle tools designed to support your journey through every phase of life
          </p>
        </div>

        {/* Main Feature Cards - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* Guided Yoga & Workouts Card */}
          <div className="h-80">
            <GuidedYogaCard />
          </div>

          {/* Mood Tracking Card */}
          <div className="h-80">
            <MoodTrackingCard />
          </div>

          {/* Daily Tips Card */}
          <div className="h-80">
            <DailyTipsCard />
          </div>

          {/* Wellness Insights Card */}
          <div className="h-80">
            <WellnessInsightsCard />
          </div>
        </div>

        {/* Featured Section - Morning Flow & Steps */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Featured Workout Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200/50 to-pink-200/50 rounded-3xl blur-3xl opacity-60"></div>
            <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Morning Flow</h3>
                  <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                    <Play className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">15 min</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <Image
                    src="/placeholder.svg?height=300&width=400&text=Morning+Flow+Preview"
                    width={400}
                    height={300}
                    alt="Morning Flow workout preview"
                    className="rounded-2xl w-full object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-purple-600 rounded-full w-16 h-16 shadow-lg">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>33% Complete</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full w-1/3 transition-all duration-500 shadow-sm"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Simple Steps Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple Steps to Better Wellness</h2>
              <p className="text-gray-600 leading-relaxed">
                Follow our gentle approach to building lasting wellness habits that fit your lifestyle
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-purple-700 font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose Your Goal</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Select from yoga, strength, or mindfulness practices based on how you feel and what your body needs
                    today
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-pink-700 font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Follow the Workout</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enjoy gentle guidance with built-in timers and modifications for every fitness level and ability
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Feel Better</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Track your progress, celebrate small wins, and build confidence in your wellness journey every day
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Your Journey Today
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl shadow-lg overflow-hidden">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Wellness?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of women discovering a gentler, more sustainable approach to health and happiness
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/routines">
                  <Button
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-8 py-3 transition-all duration-300 bg-white/70"
                  >
                    Browse Routines
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 mt-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 md:grid-cols-3 max-w-4xl mx-auto">
            {/* About Bloom */}
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-800">Bloom</span>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto md:mx-0">
                "You are worthy of the love you keep trying to give everyone else."
              </p>
            </div>

            {/* Connect */}
            <div className="space-y-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Connect</h3>
              <div className="flex justify-center space-x-4">
                <Link
                  href="#"
                  className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-6 text-center md:text-right">
              <h3 className="text-lg font-semibold text-gray-800">Support</h3>
              <nav className="flex flex-col space-y-3">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
                >
                  Terms & Conditions
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-12 pt-8 border-t border-white/30">
            <p className="text-center text-sm text-gray-600 font-medium">
              © 2025 Bloom. Made with love for your wellness journey.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        defaultTab={authModalTab}
      />
    </div>
  )
}
