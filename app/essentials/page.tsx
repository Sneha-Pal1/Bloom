"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Sparkles, Heart, Leaf, Zap } from "lucide-react";

export default function EssentialsPage() {
  const { showAuthModal, setShowAuthModal } = useAuth();

  const products = [
    {
      name: "Organic Herbal Tea Blend",
      description:
        "Boost your energy & immunity naturally with our carefully curated blend of adaptogenic herbs.",
      price: "₹299",
      originalPrice: "₹399",
      rating: 4.8,
      reviews: 89,
      features: [
        "Organic certified",
        "Caffeine-free",
        "Hormone balancing",
        "30 servings",
      ],
      icon: <Leaf className="h-6 w-6" />,
      bestseller: true,
    },
    {
      name: "Ultrasonic Aroma Diffuser",
      description:
        "Relaxing essential oil diffuser for stress relief and creating a peaceful atmosphere.",
      price: "₹1,499",
      originalPrice: "₹1,999",
      rating: 4.7,
      reviews: 156,
      features: [
        "7-color LED",
        "Timer function",
        "Auto shut-off",
        "Whisper quiet",
      ],
      icon: <Sparkles className="h-6 w-6" />,
      new: true,
    },
    {
      name: "Eco-Friendly Yoga Mat",
      description:
        "Non-slip mat made with sustainable material, perfect for your daily practice.",
      price: "₹899",
      rating: 4.9,
      reviews: 234,
      features: [
        "Non-toxic TPE",
        "6mm thickness",
        "Alignment lines",
        "Carrying strap",
      ],
      icon: <Heart className="h-6 w-6" />,
    },
    {
      name: "Complete Self-Care Kit",
      description:
        "Curated box for women's daily wellness needs including aromatherapy, skincare, and mindfulness tools.",
      price: "₹2,199",
      originalPrice: "₹2,799",
      rating: 4.6,
      reviews: 67,
      features: [
        "5 premium items",
        "Monthly refills",
        "Gift packaging",
        "Wellness guide",
      ],
      icon: <Zap className="h-6 w-6" />,
      bestseller: true,
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
          <Card className="border-0 bg-gradient-to-r from-green-100 via-mint-100 to-blue-100 rounded-3xl shadow-lg overflow-hidden">
            <FloatingSparkles />
            <CardContent className="p-8 text-center relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Wellness Essentials 🌿
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Handpicked products to support women's self-care, mindfulness,
                and overall well-being. Each item is carefully selected for
                quality and effectiveness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Leaf className="h-4 w-4" />
                  <span>Eco-friendly</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>Women-focused</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>Premium quality</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Products Grid */}
        <div className="bento-grid">
          {products.map((product, index) => (
            <Card
              key={index}
              className="bento-item card-hover border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-mint-100 rounded-full flex items-center justify-center text-green-600 animate-pulse-soft">
                      {product.icon}
                    </div>
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
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Key features:
                  </p>
                  <div className="space-y-1">
                    {product.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-green-300 rounded-full"></div>
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

                <Button className="w-full bg-gradient-to-r from-green-400 to-mint-400 hover:from-green-500 hover:to-mint-500 text-white rounded-2xl btn-hover-lift">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <section className="mt-12">
          <Card className="border-0 bg-gradient-to-r from-green-100 via-mint-100 to-blue-100 rounded-3xl shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Why Choose Our Essentials?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Eco-Conscious
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sustainably sourced and environmentally friendly products
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Women-Focused
                  </h3>
                  <p className="text-sm text-gray-600">
                    Designed specifically for women's unique wellness needs
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Premium Quality
                  </h3>
                  <p className="text-sm text-gray-600">
                    Carefully curated for effectiveness and safety
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
