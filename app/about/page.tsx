"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  User,
  LogOut,
  Target,
  Users,
  Shield,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";

export default function AboutPage() {
  const {
    isAuthenticated,
    user,
    logout,
    showAuthModal,
    setShowAuthModal,
    authModalTab,
  } = useAuth();

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
            className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors"
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
            className="text-sm font-medium text-purple-600 border-b-2 border-purple-400"
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-gray-800 leading-tight">
                About <span className="text-purple-400">Bloom</span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
                We believe every woman deserves wellness tools that honor her
                unique journey and natural rhythms.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  Our Mission
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  At Bloom, we're reimagining wellness for women. We understand
                  that your body, mind, and spirit go through natural cycles and
                  changes. That's why we've created a platform that adapts to
                  you—not the other way around.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our approach is gentle, evidence-based, and deeply respectful
                  of the feminine experience. Whether you're navigating hormonal
                  changes, managing stress, or simply seeking more balance in
                  your life, we're here to support you with tools that truly
                  understand women's wellness.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl blur-2xl opacity-50"></div>
                <Image
                  src="/images/about.png"
                  width={500}
                  height={400}
                  alt="Women supporting each other"
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-800">
                Our Values
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-lg">
                These principles guide everything we do at Bloom
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-200 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Compassion
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We approach wellness with kindness, understanding that every
                    woman's journey is unique and valid.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink-200 rounded-full flex items-center justify-center">
                    <Target className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Evidence-Based
                  </h3>
                  <p className="text-gray-600 text-sm">
                    All our content is grounded in scientific research and
                    developed with women's health experts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-200 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Community
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We believe in the power of women supporting women on their
                    wellness journeys.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-200 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Privacy
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your wellness data is sacred. We protect your privacy with
                    the highest security standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-800">
                Meet Our Team
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-lg">
                Passionate experts dedicated to women's wellness
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-semibold text-purple-600">
                      SM
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">
                    Dr. Sarah Martinez
                  </h3>
                  <p className="text-purple-600 text-sm mb-3">
                    Women's Health Specialist
                  </p>
                  <p className="text-gray-600 text-sm">
                    15+ years in women's health, specializing in hormonal
                    wellness and cycle awareness.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-semibold text-pink-600">
                      AL
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">
                    Aria Liu
                  </h3>
                  <p className="text-pink-600 text-sm mb-3">
                    Certified Yoga Instructor
                  </p>
                  <p className="text-gray-600 text-sm">
                    Trauma-informed yoga teacher with expertise in gentle
                    movement and mindfulness practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-semibold text-green-600">
                      MJ
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">
                    Maya Johnson
                  </h3>
                  <p className="text-green-600 text-sm mb-3">
                    Nutritional Therapist
                  </p>
                  <p className="text-gray-600 text-sm">
                    Specializes in hormone-balancing nutrition and intuitive
                    eating approaches for women.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl shadow-2xl overflow-hidden">
              <CardContent className="p-12 text-center relative">
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
                      size={16}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Join Our Community
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Ready to experience wellness that truly understands you?
                    Join thousands of women who have found their gentle path to
                    better health.
                  </p>
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Start Your Journey
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                {/* <Link
                  href="#"
                  className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="h-5 w-5" />
                </Link> */}
                {/* <Link
                  href="#"
                  className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                <img src="/images/about.png" alt="Women supporting each other" className="w-full h-64 object-cover rounded-2xl shadow-md" />
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
