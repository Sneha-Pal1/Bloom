"use client";

import type React from "react";

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
import {
  Heart,
  Calendar,
  Flower2,
  Waves,
  Sun,
  Play,
  Clock,
  CheckCircle,
  Plus,
  Filter,
} from "lucide-react";
import { ProtectedAction } from "@/components/protected-action";
import Image from "next/image";
import { getGifForPose } from "@/lib/pose-gifs";
import { PoseGifDisplay } from "@/components/pose-gif-display";

interface Pose {
  id: string;
  name: string;
  benefit: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  selected?: boolean;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  yoga: Pose[];
  exercises: Pose[];
}

const categories: Category[] = [
  {
    id: "overall-health",
    title: "Overall Women's Health",
    description:
      "Holistic practices to support your body's natural balance and vitality",
    icon: <Heart className="h-6 w-6" />,
    color: "text-pink-600",
    bgGradient: "from-pink-50 to-rose-100",
    yoga: [
      {
        id: "cat-cow",
        name: "Cat-Cow Pose",
        benefit: "Improves spinal flexibility and relieves tension",
        duration: "5-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "warrior-ii",
        name: "Warrior II",
        benefit: "Builds strength and confidence",
        duration: "3-5 mins",
        difficulty: "Intermediate",
      },
      {
        id: "tree-pose",
        name: "Tree Pose",
        benefit: "Enhances balance and focus",
        duration: "2-4 mins",
        difficulty: "Beginner",
      },
      {
        id: "bridge-pose",
        name: "Bridge Pose",
        benefit: "Strengthens core and opens heart",
        duration: "3-6 mins",
        difficulty: "Beginner",
      },
    ],
    exercises: [
      {
        id: "pelvic-tilts",
        name: "Pelvic Tilts",
        benefit: "Strengthens core and improves posture",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "split-squat",
        name: "split-squat",
        benefit: "Builds leg strength and endurance",
        duration: "3-8 mins",
        difficulty: "Intermediate",
      },
      {
        id: "modified-planks",
        name: "Modified Planks",
        benefit: "Core strengthening without strain",
        duration: "2-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "lunges",
        name: "lunges",
        benefit: "Targets multiple muscles & improve balance at the same time",
        duration: "2-5 mins",
        difficulty: "Beginner",
      },
    ],
  },
  {
    id: "irregular-periods",
    title: "Late & Irregular Periods",
    description:
      "Gentle movements to support hormonal balance and cycle regulation",
    icon: <Calendar className="h-6 w-6" />,
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-lavender-100",
    yoga: [
      {
        id: "butterfly-pose",
        name: "Butterfly Pose",
        benefit: "Stimulates reproductive organs and improves circulation",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "seated-forward-fold",
        name: "Seated Forward Fold",
        benefit: "Calms nervous system and supports hormone balance",
        duration: "3-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "legs-up-wall",
        name: "Legs Up the Wall",
        benefit: "Improves circulation and reduces stress",
        duration: "10-15 mins",
        difficulty: "Beginner",
      },
      {
        id: "camel-pose",
        name: "Camel Pose",
        benefit: "Opens heart and stimulates thyroid",
        duration: "2-5 mins",
        difficulty: "Advanced",
      },
    ],
    exercises: [
      {
        id: "hip-circles",
        name: "Hip Circles",
        benefit: "Improves pelvic circulation",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "gentle-twists",
        name: "Gentle Spinal Twists",
        benefit: "Massages internal organs",
        duration: "5-8 mins",
        difficulty: "Beginner",
      },
    ],
  },
  {
    id: "pcos",
    title: "PCOS Support",
    description:
      "Targeted practices to manage PCOS symptoms and support metabolic health",
    icon: <Flower2 className="h-6 w-6" />,
    color: "text-green-600",
    bgGradient: "from-green-50 to-mint-100",
    yoga: [
      {
        id: "sun-salutation",
        name: "Sun Salutation (Modified)",
        benefit: "Boosts metabolism and improves insulin sensitivity",
        duration: "8-12 mins",
        difficulty: "Intermediate",
      },
      {
        id: "cobra-pose",
        name: "Cobra Pose",
        benefit: "Stimulates abdominal organs and improves digestion",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "bow-pose",
        name: "Bow Pose",
        benefit: "Massages reproductive organs and aids hormone balance",
        duration: "2-4 mins",
        difficulty: "Intermediate",
      },
      {
        id: "pranayama",
        name: "Alternate Nostril Breathing",
        benefit: "Balances nervous system and reduces stress",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
    ],
    exercises: [
      {
        id: "squats",
        name: "Bodyweight Squats",
        benefit: "Improves insulin sensitivity and builds strength",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "mountain-climbers",
        name: "Modified Mountain Climbers",
        benefit: "Cardio exercise to support weight management",
        duration: "3-8 mins",
        difficulty: "Intermediate",
      },
      {
        id: "resistance-band",
        name: "Resistance Band Exercises",
        benefit: "Builds lean muscle and boosts metabolism",
        duration: "10-15 mins",
        difficulty: "Intermediate",
      },
    ],
  },
  {
    id: "period-cramps",
    title: "Period Cramps Relief",
    description:
      "Soothing poses and gentle movements to ease menstrual discomfort",
    icon: <Waves className="h-6 w-6" />,
    color: "text-orange-600",
    bgGradient: "from-orange-50 to-peach-100",
    yoga: [
      {
        id: "childs-pose",
        name: "Child's Pose",
        benefit: "Relieves lower back pain and calms the mind",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "supine-twist",
        name: "Supine Spinal Twist",
        benefit: "Releases tension in lower back and hips",
        duration: "5-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "happy-baby",
        name: "Happy Baby Pose",
        benefit: "Gently stretches hips and lower back",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "goddess-pose",
        name: "Goddess Pose",
        benefit: "Opens hips and strengthens pelvic floor",
        duration: "2-5 mins",
        difficulty: "Beginner",
      },
    ],
    exercises: [
      {
        id: "pelvic-rocks",
        name: "Pelvic Rocks",
        benefit: "Relieves cramping and improves circulation",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "knee-to-chest",
        name: "Knee to Chest Stretches",
        benefit: "Eases lower abdominal tension",
        duration: "5-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "heat-therapy",
        name: "Gentle Heat Therapy Movement",
        benefit: "Combines movement with warmth for pain relief",
        duration: "10-15 mins",
        difficulty: "Beginner",
      },
    ],
  },
  {
    id: "mood-pms",
    title: "Mood Swings & PMS",
    description: "Calming practices to balance emotions and ease PMS symptoms",
    icon: <Sun className="h-6 w-6" />,
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-sky-100",
    yoga: [
      {
        id: "restorative-pose",
        name: "Supported Savasana",
        benefit: "Deep relaxation and stress relief",
        duration: "10-20 mins",
        difficulty: "Beginner",
      },
      {
        id: "gentle-backbend",
        name: "Gentle Heart Opener",
        benefit: "Lifts mood and opens chest",
        duration: "3-5 mins",
        difficulty: "Beginner",
      },
      {
        id: "forward-fold",
        name: "Standing Forward Fold",
        benefit: "Calms nervous system and relieves anxiety",
        duration: "3-8 mins",
        difficulty: "Beginner",
      },
      {
        id: "meditation",
        name: "Loving-Kindness Meditation",
        benefit: "Cultivates self-compassion and emotional balance",
        duration: "5-15 mins",
        difficulty: "Beginner",
      },
    ],
    exercises: [
      {
        id: "gentle-cardio",
        name: "Gentle Dance Movement",
        benefit: "Releases endorphins and improves mood",
        duration: "10-20 mins",
        difficulty: "Beginner",
      },
      {
        id: "breathing-exercise",
        name: "4-7-8 Breathing",
        benefit: "Reduces anxiety and promotes calm",
        duration: "5-10 mins",
        difficulty: "Beginner",
      },
      {
        id: "nature-walk",
        name: "Mindful Walking",
        benefit: "Combines movement with mindfulness",
        duration: "15-30 mins",
        difficulty: "Beginner",
      },
    ],
  },
];

export function GuidedYogaCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"yoga" | "exercises">("yoga");
  const [selectedPoses, setSelectedPoses] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<
    "All" | "Beginner" | "Intermediate" | "Advanced"
  >("All");
  const [durationFilter, setDurationFilter] = useState<
    "All" | "Short" | "Medium" | "Long"
  >("All");
  const [displayPose, setDisplayPose] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Inline Lottie previews will be rendered per pose when available

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedPoses([]);
    setActiveTab("yoga");
  };

  const togglePoseSelection = (poseId: string) => {
    setSelectedPoses((prev) =>
      prev.includes(poseId)
        ? prev.filter((id) => id !== poseId)
        : [...prev, poseId]
    );
  };

  const filterPoses = (poses: Pose[]) => {
    return poses.filter((pose) => {
      const matchesDifficulty =
        difficultyFilter === "All" || pose.difficulty === difficultyFilter;

      let matchesDuration = true;
      if (durationFilter !== "All") {
        const duration = Number.parseInt(pose.duration);
        if (durationFilter === "Short") matchesDuration = duration <= 5;
        else if (durationFilter === "Medium")
          matchesDuration = duration > 5 && duration <= 10;
        else if (durationFilter === "Long") matchesDuration = duration > 10;
      }

      return matchesDifficulty && matchesDuration;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: "bg-green-100 text-green-700",
      Intermediate: "bg-yellow-100 text-yellow-700",
      Advanced: "bg-red-100 text-red-700",
    };
    return (
      colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700"
    );
  };

  return (
    <>
      {/* Main Feature Card */}
      <Card
        className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-gradient-to-br from-purple-100 to-lavender-100 rounded-3xl shadow-lg cursor-pointer h-full"
        onClick={handleCardClick}
      >
        <CardContent className="p-8 text-center h-full flex flex-col justify-between">
          <div>
            <div className="w-20 h-20 mx-auto mb-6 bg-white/80 rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
              <Heart className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Guided Yoga & Workouts
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Cycle-specific routines with demos and timers tailored for your
              wellness journey
            </p>
          </div>
          <ProtectedAction>
            <Button className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Play className="h-4 w-4 mr-2" />
              Start Flow
            </Button>
          </ProtectedAction>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50/95 via-pink-50/95 to-orange-50/95 backdrop-blur-xl border-0 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl text-gray-800 mb-4">
              Guided Yoga & Workouts 🧘‍♀️
            </DialogTitle>
            <p className="text-center text-gray-600 mb-8">
              Choose your wellness focus and discover gentle practices designed
              for women's health
            </p>
          </DialogHeader>

          {!selectedCategory ? (
            // Category Selection View
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className={`group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br ${category.bgGradient} rounded-3xl cursor-pointer`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 bg-white/70 rounded-full flex items-center justify-center group-hover:bg-white/90 transition-colors ${category.color}`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/70 hover:bg-white border-white/50 text-gray-700 rounded-full"
                    >
                      View Routines
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Category Detail View
            <>
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  ← Back to Categories
                </Button>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <div
                      className={`w-8 h-8 bg-white/70 rounded-full flex items-center justify-center ${selectedCategory.color}`}
                    >
                      {selectedCategory.icon}
                    </div>
                    {selectedCategory.title}
                  </h3>
                </div>
                <div></div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    <Filter className="h-4 w-4 mr-1" />
                    Level:
                  </span>
                  {["All", "Beginner", "Intermediate", "Advanced"].map(
                    (level) => (
                      <Button
                        key={level}
                        variant={
                          difficultyFilter === level ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setDifficultyFilter(level as any)}
                        className={`rounded-full text-xs ${
                          difficultyFilter === level
                            ? "bg-purple-400 hover:bg-purple-500"
                            : "border-purple-200 text-purple-600 hover:bg-purple-50 bg-white/70"
                        }`}
                      >
                        {level}
                      </Button>
                    )
                  )}
                </div>

                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Duration:
                  </span>
                  {["All", "Short", "Medium", "Long"].map((duration) => (
                    <Button
                      key={duration}
                      variant={
                        durationFilter === duration ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setDurationFilter(duration as any)}
                      className={`rounded-full text-xs ${
                        durationFilter === duration
                          ? "bg-pink-400 hover:bg-pink-500"
                          : "border-pink-200 text-pink-600 hover:bg-pink-50 bg-white/70"
                      }`}
                    >
                      {duration}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex mb-6 bg-white/50 rounded-2xl p-1">
                <button
                  onClick={() => setActiveTab("yoga")}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === "yoga"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-600 hover:text-purple-500"
                  }`}
                >
                  🧘‍♀️ Yoga Poses ({selectedCategory.yoga.length})
                </button>
                <button
                  onClick={() => setActiveTab("exercises")}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === "exercises"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-600 hover:text-purple-500"
                  }`}
                >
                  💪 Exercises ({selectedCategory.exercises.length})
                </button>
              </div>

              {/* Content */}
              <div className="grid gap-4 md:grid-cols-2">
                {filterPoses(
                  activeTab === "yoga"
                    ? selectedCategory.yoga
                    : selectedCategory.exercises
                ).map((pose) => (
                  <Card
                    key={pose.id}
                    className={`border-2 transition-all duration-200 rounded-2xl cursor-pointer ${
                      selectedPoses.includes(pose.id)
                        ? "border-purple-400 bg-purple-50/70"
                        : "border-gray-200 bg-white/70 hover:border-purple-300"
                    }`}
                    onClick={() => togglePoseSelection(pose.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {pose.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {pose.benefit}
                          </p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedPoses.includes(pose.id)
                              ? "border-purple-400 bg-purple-400"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedPoses.includes(pose.id) && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge
                            className={getDifficultyColor(pose.difficulty)}
                          >
                            {pose.difficulty}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-gray-50 text-gray-600"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {pose.duration}
                          </Badge>
                        </div>
                        {getGifForPose(pose.id) && (
                          <div
                            className="ml-4 w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDisplayPose({ id: pose.id, name: pose.name });
                            }}
                          >
                            {getGifForPose(pose.id)!.endsWith(".mp4") ? (
                              <video
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover"
                              >
                                <source
                                  src={getGifForPose(pose.id)!}
                                  type="video/mp4"
                                />
                              </video>
                            ) : (
                              <Image
                                src={getGifForPose(pose.id)!}
                                alt={pose.name}
                                width={96}
                                height={96}
                                className="object-cover"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Start Routine CTA */}
              {selectedPoses.length > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ready to start your custom routine?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You've selected {selectedPoses.length}{" "}
                    {selectedPoses.length === 1 ? "pose" : "poses"} for your
                    personalized flow
                  </p>
                  <Button 
                    onClick={() => {
                      // Navigate to the active routine page with the selected poses
                      window.location.href = `/active-routine?name=${selectedCategory?.title || "Custom"} Routine&type=${activeTab}&exercises=${selectedPoses.join(",")}`;
                    }}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Custom Routine
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Pose GIF Display Modal */}
      {displayPose && (
        <PoseGifDisplay
          poseId={displayPose.id}
          poseName={displayPose.name}
          isOpen={!!displayPose}
          onClose={() => setDisplayPose(null)}
        />
      )}
    </>
  );
}
