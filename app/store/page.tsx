"use client";

import { Navbar } from "@/components/navbar";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Sparkles } from "lucide-react";

export default function StorePage() {
  const { showAuthModal, setShowAuthModal } = useAuth();

  const digitalProducts = [
    {
      name: "Daily Journal (Printable)",
      description:
        "Track your thoughts & routines with ease. Beautiful layouts designed for mindful reflection.",
      price: "₹199",
      originalPrice: "₹299",
      rating: 4.8,
      reviews: 124,
      features: [
        "50+ pages",
        "Printable PDF",
        "Daily prompts",
        "Mood tracking",
      ],
      bestseller: true,
    },
    {
      name: "30-Day Self-Care Guide (PDF)",
      description:
        "A structured program to improve your lifestyle with gentle, sustainable practices.",
      price: "₹349",
      rating: 4.9,
      reviews: 89,
      features: [
        "30-day program",
        "Weekly themes",
        "Progress tracker",
        "Bonus resources",
      ],
      new: true,
    },
    {
      name: "Habit Tracker (Printable)",
      description:
        "Build discipline with daily habit tracking sheets designed for women's wellness.",
      price: "₹149",
      originalPrice: "₹199",
      rating: 4.7,
      reviews: 156,
      features: [
        "Monthly layouts",
        "Habit categories",
        "Progress charts",
        "Motivational quotes",
      ],
    },
    {
      name: "Mindfulness E-Book",
      description:
        "Learn techniques to reduce stress & stay focused with evidence-based practices.",
      price: "₹499",
      rating: 4.6,
      reviews: 67,
      features: [
        "100+ pages",
        "Audio guides",
        "Meditation scripts",
        "Quick reference cards",
      ],
    },
  ];

  const FloatingSparkles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-yellow-300 opacity-40 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
          size={14}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <section className="relative mb-8">
          <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 rounded-3xl shadow-lg overflow-hidden">
            <FloatingSparkles />
            <CardContent className="p-8 text-center relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Digital Store 📚
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Explore journals, guides, planners, and e-books designed
                specifically for women's wellness. Instant download after
                purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Instant downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>Highly rated</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  <span>Premium quality</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Products Grid */}
        <div className="bento-grid">
          {digitalProducts.map((product, index) => (
            <Card
              key={index}
              className="bento-item card-hover border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-800 mb-2">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      {product.bestseller && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                          Bestseller
                        </Badge>
                      )}
                      {product.new && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    What's included:
                  </p>
                  <div className="space-y-1">
                    {product.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl btn-hover-lift">
                  <Download className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="mt-12">
          <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl shadow-lg">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Need Something Custom?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Looking for a specific wellness tool or resource? We'd love to
                create something special for your journey.
              </p>
              <Button
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-2xl px-8 py-3 btn-hover-lift"
              >
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
