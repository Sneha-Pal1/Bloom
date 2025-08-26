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
import Link from "next/link";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";

export default function ShopPage() {
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

      <section className="py-16 px-6 bg-pink-50 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Our Shop</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Explore curated wellness essentials and our digital store to support
          your health & growth.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Wellness Essentials */}
          <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Wellness Essentials
            </h2>
            <p className="text-gray-600 mb-6">
              Handpicked products to support women’s self-care and well-being.
            </p>
            <Link
              href="/essentials"
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Explore Essentials
            </Link>
          </div>

          {/* Digital Store */}
          <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Digital Store
            </h2>
            <p className="text-gray-600 mb-6">
              Journals, guides, planners, and more — one-time purchase, instant
              download.
            </p>
            <Link
              href="/store"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Visit Store
            </Link>
          </div>
        </div>
      </section>
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
