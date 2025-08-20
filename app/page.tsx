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
  Linkedin,
  User,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  const handleAuthSuccess = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/70 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Heart className="h-8 w-8 text-purple-400" />
          <span className="ml-2 text-xl font-semibold text-gray-800">
            Bloom
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-purple-600 border-b-2 border-purple-400"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/tips"
            className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors"
          >
            Tips
          </Link>
          <Link
            href="/routines"
            className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors"
          >
            Routines
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors"
          >
            About
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600" />
              </div>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-red-500 transition-colors"
                title="Logout"
              >
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

      <main>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-gray-800 leading-tight">
                    Your Space to{" "}
                    <span className="text-purple-400">Reset,</span>{" "}
                    <span className="text-pink-400">Reflect</span> &{" "}
                    <span className="text-emerald-400">Rise.</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
                    Track your mood, follow gentle workouts, and grow through
                    self-care routines—designed just for you.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleStartToday}
                  >
                    Start Today
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-8 py-3 transition-all duration-300 bg-transparent"
                    onClick={handleSetRoutine}
                  >
                    Set Your Routine
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <Image
                    src="/images/generated-image.png"
                    width={500}
                    height={500}
                    alt="Woman meditating peacefully"
                    className="relative rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl blur-2xl opacity-50"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Morning Flow
                    </h3>
                    <div className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-purple-500" />
                      <span className="text-sm text-gray-600">15 min</span>
                    </div>
                  </div>
                  <Image
                    src="/images/morning-flow.svg"
                    width={400}
                    height={300}
                    alt="Workout demo interface"
                    className="rounded-2xl mb-4"
                  />
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  Simple Steps to Better Wellness
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Choose Your Goal
                      </h3>
                      <p className="text-gray-600">
                        Select from yoga, strength, or mindfulness based on how
                        you feel
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-pink-600 font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Follow the Workout
                      </h3>
                      <p className="text-gray-600">
                        Gentle guidance with timers and modifications for every
                        level
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Feel Better
                      </h3>
                      <p className="text-gray-600">
                        Track your progress and celebrate small wins every day
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-800">
                Stories of Transformation
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-lg">
                Real experiences from women on their wellness journey
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "The cycle-friendly workouts have been a game-changer.
                    Finally, fitness that works with my body, not against it."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">S</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Sarah M.</p>
                      <p className="text-sm text-gray-500">Yoga enthusiast</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "The mood tracking feature helped me understand my patterns.
                    I feel more in tune with myself than ever."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-semibold">M</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Maya L.</p>
                      <p className="text-sm text-gray-500">
                        Mindfulness practitioner
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg md:col-span-2 lg:col-span-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "Simple, gentle, and effective. This app meets me exactly
                    where I am each day."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Aria K.</p>
                      <p className="text-sm text-gray-500">Wellness coach</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-800 max-w-3xl">
                Your Mind and Body Deserve This Care
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-lg">
                Start your wellness journey today with gentle guidance every
                step of the way
              </p>
              <div className="flex flex-col gap-4 items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={handleStartToday}
                >
                  Get Started Free
                </Button>
                <p className="text-sm text-gray-500">No credit card required</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 md:grid-cols-3 max-w-4xl mx-auto">
            {/* About Bloom */}
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-800">
                  Bloom
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto md:mx-0">
                "You are worthy of the love you keep trying to give everyone
                else."
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
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <X className="h-5 w-5" />
                </Link>
                {/* <Link
                  href="#"
                  className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Youtube className="h-5 w-5" />
                </Link> */}
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
  );
}
