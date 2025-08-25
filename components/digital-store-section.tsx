"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, FileText } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Wellness Journal",
    price: "₹199",
    desc: "Track habits & routines.",
    icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    gradient: "from-purple-100 to-pink-100",
    buttonGradient:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  },
  {
    id: 2,
    title: "Printable Planner",
    price: "₹149",
    desc: "Daily & weekly planners.",
    icon: <FileText className="w-6 h-6 text-pink-400" />,
    gradient: "from-pink-100 to-orange-100",
    buttonGradient:
      "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600",
  },
  {
    id: 3,
    title: "Self-care Guide",
    price: "₹249",
    desc: "Simple wellness strategies.",
    icon: <Download className="w-6 h-6 text-purple-500" />,
    gradient: "from-orange-100 to-purple-100",
    buttonGradient:
      "bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600",
  },
];

export default function DigitalStoreSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-pink-400 inline-block text-transparent bg-clip-text">
          Digital Store
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Enhance your wellness journey with our carefully crafted digital
          products
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <Card
              key={item.id}
              className="rounded-3xl overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className={`bg-gradient-to-br ${item.gradient} p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full p-3">
                    {item.icon}
                  </div>
                  <span className="text-xl font-bold bg-white/80 backdrop-blur-sm py-1 px-3 rounded-full text-purple-700">
                    {item.price}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
              <CardContent className="p-6 bg-white">
                <Button
                  className={`w-full rounded-xl ${item.buttonGradient} text-white border-0`}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
