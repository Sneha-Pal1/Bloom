"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Search,
  Filter,
  Sparkles,
  Users,
  Calendar,
  BookOpen,
  Smile,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { ProtectedAction } from "@/components/protected-action";

interface Post {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
}

const posts: Post[] = [
  {
    id: "1",
    author: "Sarah M.",
    avatar: "S",
    title: "Finding peace during PMS week",
    content:
      "I wanted to share what's been helping me during those tough PMS days. I've started doing the gentle hip openers from the app, and honestly, it's been a game-changer. The combination of movement and breathing has helped me feel more grounded. What works for you during this time?",
    category: "Cycle Health",
    likes: 24,
    comments: 8,
    timeAgo: "2 hours ago",
    tags: ["PMS", "Self-care", "Movement"],
  },
  {
    id: "2",
    author: "Maya L.",
    avatar: "M",
    title: "Celebrating small wins in my wellness journey",
    content:
      "Today marks 30 days of consistent morning routines! 🎉 It wasn't always perfect - some days I only managed 5 minutes, but I showed up. To anyone starting their journey: progress over perfection, always. You've got this! ✨",
    category: "Motivation",
    likes: 45,
    comments: 12,
    timeAgo: "4 hours ago",
    tags: ["Milestone", "Morning routine", "Consistency"],
  },
  {
    id: "3",
    author: "Aria K.",
    avatar: "A",
    title: "Mindful eating during emotional moments",
    content:
      "I've been practicing mindful eating when I feel overwhelmed, and it's helping me connect with my body's needs rather than eating from stress. Taking three deep breaths before meals has become my new ritual. Anyone else exploring mindful eating?",
    category: "Nutrition",
    likes: 18,
    comments: 6,
    timeAgo: "6 hours ago",
    tags: ["Mindful eating", "Stress management", "Self-awareness"],
  },
  {
    id: "4",
    author: "Luna R.",
    avatar: "L",
    title: "Creating boundaries with social media",
    content:
      "I've started putting my phone in another room during my evening wind-down routine. The difference in my sleep quality has been incredible! It's amazing how much mental space opens up when we're not constantly scrolling. What digital boundaries have helped you?",
    category: "Mental Health",
    likes: 32,
    comments: 15,
    timeAgo: "8 hours ago",
    tags: ["Digital wellness", "Sleep", "Boundaries"],
  },
  {
    id: "5",
    author: "Zoe T.",
    avatar: "Z",
    title: "Postpartum wellness journey",
    content:
      "6 months postpartum and finally feeling like myself again. The gentle strength routines have been perfect for rebuilding my core safely. To all the new mamas out there - be patient with yourself. Healing isn't linear, and that's okay. 💕",
    category: "Motherhood",
    likes: 67,
    comments: 23,
    timeAgo: "1 day ago",
    tags: ["Postpartum", "Core strength", "Self-compassion"],
  },
];

const categories = [
  "All",
  "Cycle Health",
  "Mental Health",
  "Motivation",
  "Nutrition",
  "Motherhood",
  "Relationships",
  "Career",
  "Self-care",
];

const FloatingSparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <Sparkles
        key={i}
        className="absolute text-yellow-300 opacity-30 animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.7}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
        size={12}
      />
    ))}
  </div>
);

export default function CommunityPage() {
  const { isAuthenticated, showAuthModal, setShowAuthModal } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Mental Health",
  });

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "Cycle Health": "bg-pink-100 text-pink-700 border-pink-200",
      "Mental Health": "bg-purple-100 text-purple-700 border-purple-200",
      Motivation: "bg-orange-100 text-orange-700 border-orange-200",
      Nutrition: "bg-green-100 text-green-700 border-green-200",
      Motherhood: "bg-blue-100 text-blue-700 border-blue-200",
      Relationships: "bg-rose-100 text-rose-700 border-rose-200",
      Career: "bg-indigo-100 text-indigo-700 border-indigo-200",
      "Self-care": "bg-teal-100 text-teal-700 border-teal-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  const handleCreatePost = () => {
    // Here you would typically send the post to your backend
    console.log("Creating post:", newPost);
    setShowCreatePost(false);
    setNewPost({ title: "", content: "", category: "Mental Health" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <section className="relative mb-8">
          <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 rounded-3xl shadow-lg overflow-hidden">
            <FloatingSparkles />
            <CardContent className="p-8 text-center relative z-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Bloom Community 🌸
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                A safe space for women to share experiences, support each other,
                and grow together on our wellness journeys.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ProtectedAction>
                  <Button
                    onClick={() => setShowCreatePost(true)}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Share Your Story
                  </Button>
                </ProtectedAction>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>2.4k members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>156 posts this week</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">1.2k</div>
            <div className="text-sm text-gray-600">Stories Shared</div>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg text-center p-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Smile className="h-6 w-6 text-pink-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">89%</div>
            <div className="text-sm text-gray-600">Feel Supported</div>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">156</div>
            <div className="text-sm text-gray-600">Posts This Week</div>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg text-center p-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">24/7</div>
            <div className="text-sm text-gray-600">Safe Space</div>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search posts, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-purple-200 rounded-2xl focus:border-purple-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              Topics:
            </span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-purple-400 hover:bg-purple-500"
                    : "border-purple-200 text-purple-600 hover:bg-purple-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">
                        {post.avatar}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {post.author}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {post.timeAgo}
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gray-800 mt-4">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-full border border-purple-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <ProtectedAction>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                    </ProtectedAction>
                    <ProtectedAction>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                    </ProtectedAction>
                  </div>
                  <ProtectedAction>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </ProtectedAction>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
            <CardContent className="p-12 text-center">
              <Sparkles className="h-16 w-16 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or be the first to share about this
                topic!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-gray-800">
                    Share Your Story
                  </CardTitle>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Plus className="h-6 w-6 rotate-45" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    placeholder="What would you like to share?"
                    className="border-purple-200 rounded-2xl focus:border-purple-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) =>
                      setNewPost({ ...newPost, category: e.target.value })
                    }
                    className="w-full p-3 border border-purple-200 rounded-2xl focus:border-purple-300 focus:outline-none"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Story
                  </label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    placeholder="Share your experience, insights, or ask for support. This is a safe space for authentic sharing..."
                    className="min-h-[200px] border-purple-200 rounded-2xl focus:border-purple-300 resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowCreatePost(false)}
                    variant="outline"
                    className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-2xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPost.title.trim() || !newPost.content.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl"
                  >
                    Share Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
