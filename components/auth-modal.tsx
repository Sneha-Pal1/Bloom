"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Heart, Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from "./auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  defaultTab?: "login" | "signup"
}

const FloatingSparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <Sparkles
        key={i}
        className="absolute text-yellow-300 opacity-30 animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
        size={12}
      />
    ))}
  </div>
)

export function AuthModal({ isOpen, onClose, onSuccess, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup } = useAuth()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (activeTab === "signup" && !formData.name) {
      newErrors.name = "Name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (activeTab === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      if (activeTab === "login") {
        await login(formData.email, formData.password)
      } else {
        await signup({ name: formData.name, email: formData.email, password: formData.password })
      }
      onSuccess()
      onClose()
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
      setErrors({})
    } catch (err: any) {
      const message = err?.message || "Authentication failed"
      setErrors((prev) => ({ ...prev, form: message }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)

    // Simulate Google auth
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    onSuccess()
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-transparent border-0 shadow-none">
        <Card className="border-0 bg-gradient-to-br from-purple-50/95 via-pink-50/95 to-orange-50/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative">
            <FloatingSparkles />

            {/* Header */}
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {activeTab === "login" ? "Welcome Back" : "Create Your Space"}
              </CardTitle>
              <p className="text-gray-600 text-sm">
                {activeTab === "login" ? "Continue your wellness journey" : "Begin your path to wellness"}
              </p>
            </CardHeader>

            {/* Tabs */}
            <div className="flex mx-6 mb-6 bg-white/50 rounded-2xl p-1 relative z-10">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === "login" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-purple-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === "signup" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-purple-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            <CardContent className="px-6 pb-6 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form && <p className="text-red-500 text-xs ml-1">{errors.form}</p>}

                {/* Name Input (Sign Up only) */}
                {activeTab === "signup" && (
                  <div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`border-2 rounded-2xl bg-white/70 backdrop-blur-sm transition-all duration-200 ${
                          errors.name ? "border-red-300 focus:border-red-400" : "border-purple-200 focus:border-purple-400"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                  </div>
                )}
                {/* Email Input */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 border-2 rounded-2xl bg-white/70 backdrop-blur-sm transition-all duration-200 ${
                        errors.email
                          ? "border-red-300 focus:border-red-400"
                          : "border-purple-200 focus:border-purple-400"
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pl-10 pr-10 border-2 rounded-2xl bg-white/70 backdrop-blur-sm transition-all duration-200 ${
                        errors.password
                          ? "border-red-300 focus:border-red-400"
                          : "border-purple-200 focus:border-purple-400"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                </div>

                {/* Confirm Password (Sign Up only) */}
                {activeTab === "signup" && (
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`pl-10 pr-10 border-2 rounded-2xl bg-white/70 backdrop-blur-sm transition-all duration-200 ${
                          errors.confirmPassword
                            ? "border-red-300 focus:border-red-400"
                            : "border-purple-200 focus:border-purple-400"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {activeTab === "login" ? "Signing In..." : "Creating Account..."}
                    </div>
                  ) : activeTab === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gradient-to-r from-purple-50/95 via-pink-50/95 to-orange-50/95 text-gray-500">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Google Button */}
                <Button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-2 border-gray-200 bg-white/70 backdrop-blur-sm hover:bg-white/90 rounded-2xl py-3 font-medium transition-all duration-200 disabled:opacity-50"
                >
                  <FcGoogle className="w-5 h-5 mr-3" />
                  Continue with Google
                </Button>

                {/* Footer Toggle */}
                <div className="text-center mt-6">
                  <p className="text-gray-600 text-sm">
                    {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
                      className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      {activeTab === "login" ? "Sign Up" : "Log In"}
                    </button>
                  </p>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
