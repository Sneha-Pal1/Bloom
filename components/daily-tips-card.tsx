"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Heart, Bell, ExternalLink, Lightbulb } from "lucide-react";
import Link from "next/link";
import { ProtectedAction } from "@/components/protected-action";

interface WellnessTip {
  id: string;
  title: string;
  content: string;
  icon: string;
  category: string;
  tags: string[];
  moodTrigger?: string[];
}

const wellnessTips: WellnessTip[] = [
  {
    id: "hydration-1",
    title: "Start Your Day with Warm Lemon Water",
    content:
      "Begin each morning with a glass of warm water and fresh lemon juice. This gentle ritual helps kickstart your metabolism, aids digestion, and provides a moment of mindful intention before the day begins. The vitamin C boost supports your immune system while the warm water helps rehydrate your body after sleep.",
    icon: "💧",
    category: "Hydration",
    tags: ["hydration", "morning", "detox", "immunity"],
    moodTrigger: ["tired", "sluggish"],
  },
  {
    id: "mindfulness-1",
    title: "5-Minute Breathing Space",
    content:
      "When feeling overwhelmed, try the 5-4-3-2-1 grounding technique. Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This simple practice brings you back to the present moment and calms your nervous system naturally.",
    icon: "🧘‍♀️",
    category: "Mindfulness",
    tags: ["mindfulness", "anxiety", "grounding", "breathing"],
    moodTrigger: ["anxious", "stressed", "overwhelmed"],
  },
  {
    id: "nutrition-1",
    title: "Rainbow on Your Plate",
    content:
      "Aim to include at least 3 different colored fruits or vegetables in each meal. Each color represents different nutrients and antioxidants that support your body's natural healing processes. Think purple berries, orange carrots, green leafy vegetables, and red bell peppers for a vibrant, nourishing meal.",
    icon: "🥦",
    category: "Nutrition",
    tags: ["nutrition", "antioxidants", "energy", "health"],
    moodTrigger: ["low energy", "tired"],
  },
  {
    id: "sleep-1",
    title: "Digital Sunset Ritual",
    content:
      "Create a 'digital sunset' by turning off screens 1 hour before bedtime. Use this time for gentle activities like reading, journaling, or light stretching. The blue light from devices can interfere with your natural sleep hormones, so this simple change can dramatically improve your sleep quality.",
    icon: "🛏️",
    category: "Sleep",
    tags: ["sleep", "digital detox", "evening", "rest"],
    moodTrigger: ["restless", "tired"],
  },
  {
    id: "movement-1",
    title: "Gentle Morning Stretches",
    content:
      "Wake up your body with 5 minutes of gentle stretching. Try cat-cow poses, neck rolls, and shoulder shrugs to release overnight tension. These simple movements help increase blood flow, improve flexibility, and set a positive tone for your day ahead.",
    icon: "🤸‍♀️",
    category: "Movement",
    tags: ["movement", "morning", "flexibility", "energy"],
    moodTrigger: ["stiff", "low energy"],
  },
];

// Mock function to get tip based on mood (this would connect to actual mood data)
const getTipBasedOnMood = (mood?: string): WellnessTip => {
  if (mood === "anxious" || mood === "stressed") {
    return (
      wellnessTips.find((tip) => tip.moodTrigger?.includes("anxious")) ||
      wellnessTips[1]
    );
  }
  if (mood === "tired" || mood === "low energy") {
    return (
      wellnessTips.find((tip) => tip.moodTrigger?.includes("tired")) ||
      wellnessTips[0]
    );
  }
  // Default to a random tip
  return wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
};

export function DailyTipsCard() {
  const [showModal, setShowModal] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [savedTip, setSavedTip] = useState(false);
  const [currentUserMood] = useState<string>("anxious"); // This would come from mood tracking

  const handleCardClick = () => {
    setShowModal(true);
  };

  const toggleReminder = () => {
    setDailyReminder(!dailyReminder);
  };

  const toggleSaveTip = () => {
    setSavedTip(!savedTip);
  };

  // Get today's tip (could be based on date, mood, etc.)
  const todaysTip = getTipBasedOnMood(currentUserMood);

  const getCategoryColor = (category: string) => {
    const colors = {
      Hydration: "bg-blue-100 text-blue-700 border-blue-200",
      Mindfulness: "bg-purple-100 text-purple-700 border-purple-200",
      Nutrition: "bg-green-100 text-green-700 border-green-200",
      Sleep: "bg-indigo-100 text-indigo-700 border-indigo-200",
      Movement: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

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
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
          size={12}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Main Feature Card */}
      <Card
        className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-gradient-to-br from-green-100 to-mint-100 rounded-3xl shadow-lg cursor-pointer h-full"
        onClick={handleCardClick}
      >
        <CardContent className="p-8 text-center h-full flex flex-col justify-between">
          <div>
            <div className="w-20 h-20 mx-auto mb-6 bg-white/80 rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
              <Sparkles className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Daily Tips</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Get personalized hydration, mindfulness, and nutrition reminders
              daily
            </p>
          </div>
          <ProtectedAction>
            <Button className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Lightbulb className="h-4 w-4 mr-2" />
              View Tips
            </Button>
          </ProtectedAction>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-green-50/95 via-purple-50/95 to-yellow-50/95 backdrop-blur-xl border-0 rounded-3xl">
          <div className="relative">
            <FloatingSparkles />

            <DialogHeader className="relative z-10">
              <DialogTitle className="text-center text-3xl text-gray-800 mb-4">
                Daily Wellness Tips ✨
              </DialogTitle>
              <p className="text-center text-gray-600 mb-8">
                Your personalized wellness guidance for a healthier, happier you
              </p>
            </DialogHeader>

            <div className="relative z-10 space-y-8">
              {/* Tip of the Day Section */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{todaysTip.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          Tip of the Day
                        </h3>
                        <Badge className={getCategoryColor(todaysTip.category)}>
                          {todaysTip.category}
                        </Badge>
                      </div>
                    </div>
                    <button
                      onClick={toggleSaveTip}
                      className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                        savedTip
                          ? "bg-red-100 text-red-500 shadow-lg"
                          : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400"
                      }`}
                    >
                      <Heart
                        className={`h-6 w-6 ${savedTip ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    {todaysTip.title}
                  </h4>

                  <div className="bg-gradient-to-r from-mint-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                      {todaysTip.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {todaysTip.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Mood-based suggestion */}
                  {currentUserMood && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">
                          Suggested for you
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on your recent mood, this tip can help you feel
                        more balanced and centered today.
                      </p>
                    </div>
                  )}

                  {/* Daily Reminder Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-mint-50 to-green-50 rounded-2xl mb-6">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-800">
                          Daily Reminder
                        </p>
                        <p className="text-sm text-gray-600">
                          Get your wellness tip at 8:00 AM
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleReminder}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        dailyReminder ? "bg-green-400" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          dailyReminder ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/tips" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-green-400 to-mint-400 hover:from-green-500 hover:to-mint-500 text-white rounded-full py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Show Me More Tips
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full py-3 transition-all duration-300 bg-white/70"
                      onClick={() => {
                        // This would refresh with a new tip
                        setShowModal(false);
                        setTimeout(() => setShowModal(true), 100);
                      }}
                    >
                      Get Another Tip
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips Preview */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    More Wellness Tips
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {wellnessTips.slice(0, 4).map((tip) => (
                      <div
                        key={tip.id}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-white/50 to-gray-50/50 rounded-2xl hover:shadow-md transition-all duration-200"
                      >
                        <div className="text-2xl">{tip.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">
                            {tip.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {tip.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Link href="/tips">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-200 text-green-600 hover:bg-green-50 rounded-full bg-white/70"
                      >
                        View All Tips
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
