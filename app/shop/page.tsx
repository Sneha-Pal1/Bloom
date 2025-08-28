"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Star,
  ShoppingCart,
  Download,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Headphones,
  Calendar,
  Zap,
  Gift,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { ProtectedAction } from "@/components/protected-action";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: "Digital" | "Physical" | "Subscription";
  type: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  bestseller?: boolean;
  new?: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "Cycle Sync Wellness Journal",
    description:
      "A beautifully designed digital journal to track your menstrual cycle, mood, and wellness patterns with guided prompts and insights.",
    price: 19.99,
    originalPrice: 29.99,
    category: "Digital",
    type: "Journal",
    rating: 4.9,
    reviews: 234,
    image: "/images/cycle-journal.svg",
    features: [
      "90+ guided prompts",
      "Cycle tracking templates",
      "Mood & symptom tracker",
      "Monthly reflection pages",
      "Instant PDF download",
    ],
    bestseller: true,
  },
  {
    id: "2",
    name: "Mindful Morning Routine Guide",
    description:
      "Transform your mornings with this comprehensive guide featuring 30 gentle routines designed for different energy levels and time constraints.",
    price: 14.99,
    category: "Digital",
    type: "Guide",
    rating: 4.8,
    reviews: 189,
    image: "/images/morning-guide.svg",
    features: [
      "30 morning routines",
      "5-30 minute options",
      "Seasonal variations",
      "Printable cards",
      "Audio affirmations",
    ],
    new: true,
  },
  {
    id: "3",
    name: "Bloom Premium Subscription",
    description:
      "Unlock exclusive content, personalized AI routines, advanced tracking, and priority community support.",
    price: 9.99,
    category: "Subscription",
    type: "Monthly",
    rating: 4.7,
    reviews: 456,
    image: "/images/premium-subscription.svg",
    features: [
      "AI-powered routines",
      "Advanced analytics",
      "Exclusive content",
      "Priority support",
      "Ad-free experience",
    ],
    bestseller: true,
  },
  {
    id: "4",
    name: "Self-Care Ritual Cards",
    description:
      "52 beautifully illustrated digital cards with self-care activities, affirmations, and mindfulness practices for every week of the year.",
    price: 12.99,
    category: "Digital",
    type: "Cards",
    rating: 4.6,
    reviews: 167,
    image: "/images/ritual-cards.svg",
    features: [
      "52 unique cards",
      "Weekly themes",
      "Printable format",
      "Mobile-friendly",
      "Seasonal activities",
    ],
  },
  {
    id: "5",
    name: "Hormone Balance Meal Planner",
    description:
      "A comprehensive meal planning system designed to support hormonal health throughout your cycle with recipes and shopping lists.",
    price: 24.99,
    originalPrice: 34.99,
    category: "Digital",
    type: "Planner",
    rating: 4.8,
    reviews: 298,
    image: "/images/meal-planner.svg",
    features: [
      "Cycle-synced recipes",
      "Shopping lists",
      "Nutritional guides",
      "Prep schedules",
      "Substitution charts",
    ],
  },
  {
    id: "6",
    name: "Meditation & Sleep Stories",
    description:
      "A collection of 25 guided meditations and bedtime stories specifically created for women's wellness and peaceful sleep.",
    price: 16.99,
    category: "Digital",
    type: "Audio",
    rating: 4.9,
    reviews: 312,
    image: "/images/sleep-stories.svg",
    features: [
      "25 audio tracks",
      "Various lengths",
      "Sleep stories",
      "Guided meditations",
      "High-quality audio",
    ],
    new: true,
  },
  {
    id: "7",
    name: "Wellness Tracker Stickers",
    description:
      "Beautiful digital sticker pack for your planner or journal to track habits, moods, and wellness goals with style.",
    price: 7.99,
    category: "Digital",
    type: "Stickers",
    rating: 4.5,
    reviews: 145,
    image: "/images/wellness-stickers.svg",
    features: [
      "200+ stickers",
      "Multiple themes",
      "High resolution",
      "Print-ready",
      "Commercial use OK",
    ],
  },
  {
    id: "8",
    name: "Bloom Essential Oil Blend",
    description:
      "A carefully crafted essential oil blend designed to promote relaxation, balance hormones, and enhance your wellness routine.",
    price: 34.99,
    category: "Physical",
    type: "Aromatherapy",
    rating: 4.7,
    reviews: 89,
    image: "/images/essential-oil.svg",
    features: [
      "Organic ingredients",
      "Hormone-balancing",
      "Calming scent",
      "10ml bottle",
      "Free shipping",
    ],
  },
];

const categories = ["All", "Digital", "Physical", "Subscription"];
const types = [
  "All",
  "Journal",
  "Guide",
  "Cards",
  "Planner",
  "Audio",
  "Stickers",
  "Aromatherapy",
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

export default function ShopPage() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesType = selectedType === "All" || product.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Digital: "bg-purple-100 text-purple-700 border-purple-200",
      Physical: "bg-green-100 text-green-700 border-green-200",
      Subscription: "bg-orange-100 text-orange-700 border-orange-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      Journal: BookOpen,
      Guide: BookOpen,
      Cards: Gift,
      Planner: Calendar,
      Audio: Headphones,
      Stickers: Sparkles,
      Aromatherapy: Zap,
      Monthly: Calendar,
    };
    return icons[type as keyof typeof icons] || BookOpen;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
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
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-800">
                Bloom <span className="gradient-text">Shop</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Curated wellness products, digital resources, and tools designed
                specifically for women's health and self-care journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Instant downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>Made with love</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>Highly rated</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="container px-4 md:px-6 mx-auto mb-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search wellness products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full border border-purple-200 focus:border-purple-400 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Filter className="h-4 w-4" />
                  <span>Filter by:</span>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
                          : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="w-px h-6 bg-gray-300"></div>

                {/* Type Filters */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Type:
                  </span>
                  {types.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={`rounded-full transition-all duration-300 ${
                        selectedType === type
                          ? "bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
                          : "border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300"
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Category Cards */}
        <section className="container px-4 md:px-6 mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Equipment</h3>
                <p className="text-sm text-gray-600">
                  Yoga mats, blocks & more
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Supplements</h3>
                <p className="text-sm text-gray-600">
                  Natural wellness support
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Digital Guides</h3>
                <p className="text-sm text-gray-600">Journals & resources</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gift className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Self-Care</h3>
                <p className="text-sm text-gray-600">Aromatherapy & rituals</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="container px-4 md:px-6 mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Best Sellers</h2>
              <p className="text-gray-600">Most loved by our community</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {products
              .filter((p) => p.bestseller)
              .map((product) => (
                <Card
                  key={product.id}
                  className="min-w-[280px] border-0 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-2xl"
                    />
                    <Badge className="absolute top-3 left-3 bg-orange-100 text-orange-700">
                      Bestseller
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-800">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <ProtectedAction>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </ProtectedAction>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Best Deals Section */}
        <section className="container px-4 md:px-6 mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Best Deals</h2>
              <p className="text-gray-600">Limited time offers</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {products
              .filter((p) => p.originalPrice)
              .map((product) => (
                <Card
                  key={product.id}
                  className="min-w-[280px] border-0 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-2xl"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-100 text-green-700">
                      Sale
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                      <ProtectedAction>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </ProtectedAction>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Limited Stock Section */}
        <section className="container px-4 md:px-6 mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Limited Stock
              </h2>
              <p className="text-gray-600">Get them while you can</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {products
              .filter((p) => p.new)
              .map((product) => (
                <Card
                  key={product.id}
                  className="min-w-[280px] border-0 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-2xl"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-100 text-red-700">
                      Only 3 left
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">
                        ${product.price}
                      </span>
                      <ProtectedAction>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </ProtectedAction>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* All Products Section */}
        <section className="container px-4 md:px-6 mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
              <p className="text-gray-600">Complete wellness collection</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const TypeIcon = getTypeIcon(product.type);
              return (
                <Card
                  key={product.id}
                  className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/images/morning-flow.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
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
                    <div className="absolute top-4 right-4">
                      <Badge className={getCategoryColor(product.category)}>
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <TypeIcon className="h-4 w-4 text-purple-600" />
                          <span className="text-sm text-gray-600">
                            {product.type}
                          </span>
                        </div>
                        <CardTitle className="text-lg text-gray-800 mb-2">
                          {product.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
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
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                      {product.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Features:
                      </p>
                      <div className="space-y-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                        {product.features.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{product.features.length - 3} more features
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-800">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.category === "Subscription" && (
                        <span className="text-sm text-gray-600">/month</span>
                      )}
                    </div>

                    <ProtectedAction>
                      <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.category === "Subscription"
                          ? "Subscribe"
                          : "Add to Cart"}
                      </Button>
                    </ProtectedAction>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
              <CardContent className="p-12 text-center">
                <Sparkles className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to discover amazing
                  wellness products.
                </p>
              </CardContent>
            </Card>
          )}
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
