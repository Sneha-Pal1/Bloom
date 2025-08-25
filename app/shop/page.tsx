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

export default function ShopPage() {
  const {
    isAuthenticated,
    user,
    logout,
    showAuthModal,
    setShowAuthModal,
    authModalTab,
  } = useAuth();
  return (
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
  );
}
