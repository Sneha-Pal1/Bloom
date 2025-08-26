"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ExpertConsultationsSection() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-pink-50 to-white text-center">
      <h2 className="text-3xl font-bold text-pink-500 mb-4">
        Expert Consultations
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Soon, you’ll be able to connect with certified gynecologists,
        therapists, and nutritionists to support your wellness journey. Get
        guidance from trusted professionals—at your fingertips.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-pink-600">
              Gynecologists
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Professional support for women’s health & reproductive care.
            </p>
            <span className="text-pink-500 text-sm font-semibold block mt-3">
              Coming Soon
            </span>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-pink-600">Therapists</h3>
            <p className="text-gray-500 text-sm mt-2">
              Mental health support to help you feel balanced & resilient.
            </p>
            <span className="text-pink-500 text-sm font-semibold block mt-3">
              Coming Soon
            </span>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-pink-600">
              Nutritionists
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Personalized diet & lifestyle guidance for your body’s needs.
            </p>
            <span className="text-pink-500 text-sm font-semibold block mt-3">
              Coming Soon
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Sign-up for reminders */}
      <div className="mt-10">
        <Button className=" bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Notify Me When Available
        </Button>
      </div>
    </section>
  );
}
