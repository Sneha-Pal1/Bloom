"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Plus,
  Check,
  Edit3,
  Trash2,
  Play,
  Save,
  Sparkles,
  BookOpen,
  TrendingUp,
  Bot,
  Zap,
  Clock,
  Target,
  Wand2,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { ProtectedAction } from "@/components/protected-action";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  hasVideo?: boolean;
  videoUrl?: string;
}

interface SavedRoutine {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: Date;
  isAIGenerated?: boolean;
}

const quickAddItems = [
  { text: "Daily Affirmation ✨", category: "mindfulness", hasVideo: false },
  { text: "Mood Check 😌", category: "mindfulness", hasVideo: false },
  { text: "Journal 📝", category: "mindfulness", hasVideo: false },
  { text: "Morning Yoga 🧘‍♀️", category: "movement", hasVideo: true },
  { text: "Water Reminder 🚰", category: "health", hasVideo: false },
  { text: "Breathing Exercise 🌬️", category: "mindfulness", hasVideo: true },
  { text: "Gentle Stretching 🤸‍♀️", category: "movement", hasVideo: true },
  { text: "Gratitude Practice 🙏", category: "mindfulness", hasVideo: false },
  { text: "Healthy Snack 🥗", category: "health", hasVideo: false },
  { text: "Nature Walk 🌿", category: "movement", hasVideo: false },
];

const aiRoutineTemplates = [
  {
    name: "Energizing Morning",
    description:
      "AI-curated routine to boost energy and set positive intentions",
    duration: "15-20 min",
    tasks: [
      "Gentle wake-up stretches 🌅",
      "3-minute breathing exercise 🌬️",
      "Positive affirmation practice ✨",
      "Hydration check 💧",
      "Set daily intention 🎯",
    ],
  },
  {
    name: "Stress Relief Evening",
    description: "AI-designed routine to unwind and release daily tension",
    duration: "20-25 min",
    tasks: [
      "Progressive muscle relaxation 😌",
      "Gratitude journaling 📝",
      "Calming tea ritual 🍵",
      "Gentle yoga flow 🧘‍♀️",
      "Meditation or sleep story 🌙",
    ],
  },
  {
    name: "Cycle Sync Wellness",
    description: "AI-adapted routine based on menstrual cycle phase",
    duration: "10-30 min",
    tasks: [
      "Cycle phase check-in 🌸",
      "Hormone-friendly movement 💃",
      "Nutritional support 🥗",
      "Emotional awareness practice 💭",
      "Self-compassion moment 💕",
    ],
  },
  {
    name: "Productivity Boost",
    description: "AI-optimized routine for focus and mental clarity",
    duration: "10-15 min",
    tasks: [
      "Brain dump exercise 🧠",
      "Priority setting 📋",
      "Energizing movement �‍♀️",
      "Focus meditation 🎯",
      "Workspace preparation 💻",
    ],
  },
];

export default function RoutineBuilder() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [savedRoutines, setSavedRoutines] = useState<SavedRoutine[]>([]);
  const [routineName, setRoutineName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const addTask = (text: string, hasVideo = false) => {
    if (text.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        hasVideo,
        videoUrl: hasVideo ? "#" : undefined,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  };

  const addAITemplate = (template: (typeof aiRoutineTemplates)[0]) => {
    const newTasks = template.tasks.map((taskText, index) => ({
      id: `${Date.now()}-${index}`,
      text: taskText,
      completed: false,
      hasVideo:
        taskText.includes("yoga") ||
        taskText.includes("stretches") ||
        taskText.includes("movement"),
    }));
    setTasks([...tasks, ...newTasks]);
  };

  const generateAIRoutine = async () => {
    if (!aiPrompt.trim()) return;

    setIsGeneratingAI(true);

    // Simulate AI generation (in real app, this would call an AI API)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const aiGeneratedTasks = [
      `Personalized morning intention based on: "${aiPrompt}" 🎯`,
      "AI-recommended breathing pattern 🌬️",
      "Custom affirmation for your goal ✨",
      "Tailored movement practice 💃",
      "Reflection on your progress 📝",
    ];

    const newTasks = aiGeneratedTasks.map((taskText, index) => ({
      id: `ai-${Date.now()}-${index}`,
      text: taskText,
      completed: false,
      hasVideo: taskText.includes("movement") || taskText.includes("breathing"),
    }));

    setTasks([...tasks, ...newTasks]);
    setIsGeneratingAI(false);
    setShowAIDialog(false);
    setAiPrompt("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task: Task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editingTask && editText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask ? { ...task, text: editText.trim() } : task
        )
      );
      setEditingTask(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText("");
  };

  const saveRoutine = () => {
    if (routineName.trim() && tasks.length > 0) {
      const newRoutine: SavedRoutine = {
        id: Date.now().toString(),
        name: routineName.trim(),
        tasks: [...tasks],
        createdAt: new Date(),
        isAIGenerated: tasks.some((task) => task.id.startsWith("ai-")),
      };
      setSavedRoutines([...savedRoutines, newRoutine]);
      setRoutineName("");
      setShowSaveDialog(false);
    }
  };

  const loadRoutine = (routine: SavedRoutine) => {
    setTasks(routine.tasks.map((task) => ({ ...task, completed: false })));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const FloatingSparkles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-yellow-300 opacity-40 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
          size={12}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Welcome Header */}
            <section className="relative">
              <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl shadow-lg overflow-hidden">
                <FloatingSparkles />
                <CardContent className="p-8 text-center relative z-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    AI-Powered Routine Builder ✨
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                    Create personalized wellness routines with AI assistance.
                    Build your own checklist or let our AI suggest activities
                    based on your goals and preferences.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <ProtectedAction>
                      <Dialog
                        open={showAIDialog}
                        onOpenChange={setShowAIDialog}
                      >
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <Bot className="h-4 w-4 mr-2" />
                            Generate with AI
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-3xl max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-center text-2xl text-purple-700 mb-4">
                              AI Routine Generator 🤖
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tell AI about your wellness goals:
                              </label>
                              <Textarea
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                placeholder="e.g., I want to feel more energized in the mornings, reduce stress after work, improve my sleep quality, or build a consistent self-care practice..."
                                className="min-h-[120px] border-purple-200 rounded-2xl focus:border-purple-300 resize-none"
                              />
                            </div>
                            <div className="flex gap-4">
                              <Button
                                onClick={generateAIRoutine}
                                disabled={!aiPrompt.trim() || isGeneratingAI}
                                className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl"
                              >
                                {isGeneratingAI ? (
                                  <>
                                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                  </>
                                ) : (
                                  <>
                                    <Wand2 className="h-4 w-4 mr-2" />
                                    Generate Routine
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setShowAIDialog(false)}
                                className="rounded-2xl"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </ProtectedAction>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Progress Section */}
            {totalTasks > 0 && (
              <Card className="border-0 bg-gradient-to-r from-green-50 to-mint-50 rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Your Progress Today
                    </h3>
                    <span className="text-2xl font-bold text-green-600">
                      {completedTasks}/{totalTasks}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    {progressPercentage === 100
                      ? "🎉 Amazing! You've completed your routine!"
                      : progressPercentage > 0
                      ? "You're doing great! Keep going 🌸"
                      : "Ready to start your wellness journey? 💕"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* AI Templates */}
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                  <Bot className="h-5 w-5" />
                  AI-Curated Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {aiRoutineTemplates.map((template, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/70 rounded-2xl border border-indigo-200 hover:border-indigo-300 transition-all duration-200 cursor-pointer transform hover:scale-105"
                      onClick={() => addAITemplate(template)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {template.name}
                        </h4>
                        <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                          <Clock className="h-3 w-3 mr-1" />
                          {template.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {template.description}
                      </p>
                      <div className="space-y-1">
                        {template.tasks.slice(0, 3).map((task, taskIndex) => (
                          <div
                            key={taskIndex}
                            className="flex items-center gap-2 text-xs text-gray-500"
                          >
                            <div className="w-1 h-1 bg-indigo-300 rounded-full"></div>
                            {task}
                          </div>
                        ))}
                        {template.tasks.length > 3 && (
                          <div className="text-xs text-gray-400">
                            +{template.tasks.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Add Chips */}
            <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Sparkles className="h-5 w-5" />
                  Quick Add Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {quickAddItems.map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 transform hover:scale-105 px-3 py-2 text-sm bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700"
                      onClick={() => addTask(item.text, item.hasVideo)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {item.text}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Custom Task */}
            <Card className="border-0 bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-700">
                  <Plus className="h-5 w-5" />
                  Add Custom Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="What would you like to add to your routine?"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && addTask(newTaskText)
                    }
                    className="flex-1 border-pink-200 focus:border-pink-300 rounded-2xl"
                  />
                  <Button
                    onClick={() => addTask(newTaskText)}
                    className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-2xl px-6"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Task List */}
            {tasks.length > 0 && (
              <Card className="border-0 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <BookOpen className="h-5 w-5" />
                    Your Routine ({tasks.length}{" "}
                    {tasks.length === 1 ? "task" : "tasks"})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
                          task.completed
                            ? "bg-gradient-to-r from-green-50 to-green-100 border border-green-200"
                            : "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                        }`}
                      >
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            task.completed
                              ? "bg-green-400 border-green-400 text-white"
                              : "border-gray-300 hover:border-purple-400"
                          }`}
                        >
                          {task.completed && <Check className="h-3 w-3" />}
                        </button>

                        <div className="flex-1">
                          {editingTask === task.id ? (
                            <div className="flex gap-2">
                              <Input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" && saveEdit()
                                }
                                className="flex-1 h-8 text-sm"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={saveEdit}
                                className="h-8 px-3"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEdit}
                                className="h-8 px-3 bg-transparent"
                              >
                                ✕
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span
                                className={`${
                                  task.completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-800"
                                }`}
                              >
                                {task.text}
                              </span>
                              {task.hasVideo && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-purple-50 border-purple-200 text-purple-600"
                                >
                                  <Play className="h-2 w-2 mr-1" />
                                  Video
                                </Badge>
                              )}
                              {task.id.startsWith("ai-") && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-blue-50 border-blue-200 text-blue-600"
                                >
                                  <Bot className="h-2 w-2 mr-1" />
                                  AI
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {editingTask !== task.id && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEdit(task)}
                              className="h-8 w-8 p-0 hover:bg-purple-100"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteTask(task.id)}
                              className="h-8 w-8 p-0 hover:bg-red-100 text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {tasks.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Dialog
                        open={showSaveDialog}
                        onOpenChange={setShowSaveDialog}
                      >
                        <DialogTrigger asChild>
                          <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl">
                            <Save className="h-4 w-4 mr-2" />
                            Save as Routine Template
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-3xl">
                          <DialogHeader>
                            <DialogTitle className="text-center text-xl text-purple-700">
                              Save Your Routine ✨
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              placeholder="Give your routine a name (e.g., 'Morning Self-Care')"
                              value={routineName}
                              onChange={(e) => setRoutineName(e.target.value)}
                              className="border-purple-200 focus:border-purple-300 rounded-2xl"
                            />
                            <div className="flex gap-3">
                              <Button
                                onClick={saveRoutine}
                                disabled={!routineName.trim()}
                                className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl"
                              >
                                Save Routine
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setShowSaveDialog(false)}
                                className="rounded-2xl"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Routines */}
            <Card className="border-0 bg-gradient-to-br from-mint-50 to-green-100 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <TrendingUp className="h-5 w-5" />
                  Saved Routines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedRoutines.length === 0 ? (
                  <p className="text-sm text-gray-600 text-center py-4">
                    No saved routines yet. Create and save your first routine!
                    🌱
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedRoutines.map((routine) => (
                      <div
                        key={routine.id}
                        className="p-3 bg-white/70 rounded-2xl border border-green-200 hover:border-green-300 transition-colors cursor-pointer"
                        onClick={() => loadRoutine(routine)}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-gray-800">
                            {routine.name}
                          </h4>
                          {routine.isAIGenerated && (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                              <Bot className="h-2 w-2 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">
                          {routine.tasks.length} tasks •{" "}
                          {routine.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="border-0 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                  <Zap className="h-5 w-5" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-indigo-600" />
                    <span>Personalized suggestions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-indigo-600" />
                    <span>Goal-based routines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-indigo-600" />
                    <span>Adaptive scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    <span>Smart recommendations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Heart className="h-5 w-5" />
                  Gentle Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>💕 Start with just 3-5 activities</p>
                  <p>🌱 Progress over perfection</p>
                  <p>✨ Celebrate small wins</p>
                  <p>🌸 Be kind to yourself</p>
                  <p>🤖 Let AI help personalize your journey</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
