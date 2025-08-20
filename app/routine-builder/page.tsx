"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Heart, Plus, Check, Edit3, Trash2, Play, ArrowLeft, Save, Sparkles, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-context"
import { AuthModal } from "@/components/auth-modal"

interface Task {
  id: string
  text: string
  completed: boolean
  hasVideo?: boolean
  videoUrl?: string
}

interface SavedRoutine {
  id: string
  name: string
  tasks: Task[]
  createdAt: Date
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
]

export default function RoutineBuilder() {
  const { isAuthenticated, user, logout, showAuthModal, setShowAuthModal, authModalTab } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState("")
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [savedRoutines, setSavedRoutines] = useState<SavedRoutine[]>([])
  const [routineName, setRoutineName] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const addTask = (text: string, hasVideo = false) => {
    if (text.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        hasVideo,
        videoUrl: hasVideo ? "#" : undefined,
      }
      setTasks([...tasks, newTask])
      setNewTaskText("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const startEdit = (task: Task) => {
    setEditingTask(task.id)
    setEditText(task.text)
  }

  const saveEdit = () => {
    if (editingTask && editText.trim()) {
      setTasks(tasks.map((task) => (task.id === editingTask ? { ...task, text: editText.trim() } : task)))
      setEditingTask(null)
      setEditText("")
    }
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setEditText("")
  }

  const saveRoutine = () => {
    if (routineName.trim() && tasks.length > 0) {
      const newRoutine: SavedRoutine = {
        id: Date.now().toString(),
        name: routineName.trim(),
        tasks: [...tasks],
        createdAt: new Date(),
      }
      setSavedRoutines([...savedRoutines, newRoutine])
      setRoutineName("")
      setShowSaveDialog(false)
    }
  }

  const loadRoutine = (routine: SavedRoutine) => {
    setTasks(routine.tasks.map((task) => ({ ...task, completed: false })))
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

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
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/70 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <ArrowLeft className="h-5 w-5 text-purple-400 mr-2" />
          <Heart className="h-8 w-8 text-purple-400" />
          <span className="ml-2 text-xl font-semibold text-gray-800">Bloom</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link href="/explore" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Explore
          </Link>
          <Link href="/tips" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Tips
          </Link>
          <Link href="/routines" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            Routines
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-purple-500 transition-colors">
            About
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Welcome Header */}
            <section className="relative">
              <Card className="border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-3xl shadow-lg overflow-hidden">
                <FloatingSparkles />
                <CardContent className="p-8 text-center relative z-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Create Your Self-Care Routine ✨
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Build your own wellness checklist with activities that nurture your mind, body, and soul. Start
                    small, be gentle with yourself, and celebrate every step forward.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Progress Section */}
            {totalTasks > 0 && (
              <Card className="border-0 bg-gradient-to-r from-green-50 to-mint-50 rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Your Progress Today</h3>
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
                    onKeyPress={(e) => e.key === "Enter" && addTask(newTaskText)}
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
                    Your Routine ({tasks.length} {tasks.length === 1 ? "task" : "tasks"})
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
                                onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                                className="flex-1 h-8 text-sm"
                                autoFocus
                              />
                              <Button size="sm" onClick={saveEdit} className="h-8 px-3">
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
                              <span className={`${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
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
                      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
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
                    No saved routines yet. Create and save your first routine! 🌱
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedRoutines.map((routine) => (
                      <div
                        key={routine.id}
                        className="p-3 bg-white/70 rounded-2xl border border-green-200 hover:border-green-300 transition-colors cursor-pointer"
                        onClick={() => loadRoutine(routine)}
                      >
                        <h4 className="font-medium text-gray-800 mb-1">{routine.name}</h4>
                        <p className="text-xs text-gray-600">
                          {routine.tasks.length} tasks • {routine.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
        defaultTab={authModalTab}
      />
    </div>
  )
}
