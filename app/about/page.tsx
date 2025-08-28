"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/components/auth-context";
import { AuthModal } from "@/components/auth-modal";

export default function AboutPage() {
  const { showAuthModal, setShowAuthModal } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-green-50">
      <Navbar />

      <main className="space-y-0">
        {/* Hero Section */}
        <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
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
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gray-800 leading-tight">
                About <span className="gradient-text">Bloom</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                We believe every woman deserves wellness tools that honor her
                unique journey and natural rhythms.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Bloom, we're reimagining wellness for women. We understand
                  that your body, mind, and spirit go through natural cycles and
                  changes. That's why we've created a platform that adapts to
                  you—not the other way around.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our approach is gentle, evidence-based, and deeply respectful
                  of the feminine experience. Whether you're navigating hormonal
                  changes, managing stress, or simply seeking more balance in
                  your life, we're here to support you with tools that truly
                  understand women's wellness.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl blur-2xl opacity-50"></div>
                <Image
                  src="/images/about.png"
                  width={500}
                  height={400}
                  alt="Women supporting each other"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at Bloom
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Heart className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Compassion
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We approach wellness with kindness, understanding that every
                    woman's journey is unique and valid.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-2xl flex items-center justify-center">
                    <Target className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Evidence-Based
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All our content is grounded in scientific research and
                    developed with women's health experts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Community
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We believe in the power of women supporting women on their
                    wellness journeys.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Privacy
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Your wellness data is sacred. We protect your privacy with
                    the highest security standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                Passionate experts dedicated to women's wellness
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Dr. Sarah Martinez",
                  role: "Women's Health Specialist",
                  description:
                    "15+ years in women's health, specializing in hormonal wellness and cycle awareness.",
                  avatar: "SM",
                  color: "from-purple-200 to-pink-200",
                },
                {
                  name: "Aria Liu",
                  role: "Certified Yoga Instructor",
                  description:
                    "Trauma-informed yoga teacher with expertise in gentle movement and mindfulness practices.",
                  avatar: "AL",
                  color: "from-pink-200 to-orange-200",
                },
                {
                  name: "Maya Johnson",
                  role: "Nutritional Therapist",
                  description:
                    "Specializes in hormone-balancing nutrition and intuitive eating approaches for women.",
                  avatar: "MJ",
                  color: "from-green-200 to-blue-200",
                },
              ].map((member, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-2xl font-semibold text-gray-700">
                        {member.avatar}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-purple-600 text-sm mb-3 font-medium">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Join Our Community
              </h2>
              <p className="text-lg text-gray-600">
                Ready to experience wellness that truly understands you? Join
                thousands of women who have found their gentle path to better
                health.
              </p>
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-lift"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
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
