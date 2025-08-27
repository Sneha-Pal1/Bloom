"use client";

import Link from "next/link";

export function ShopSection() {
  return (
    <section className="py-16 px-6 bg-pink-300 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Explore Our Offerings
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Take care of your mind and body with our curated essentials and digital
        wellness products.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Wellness Essentials */}
        <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Wellness Essentials
          </h3>
          <p className="text-gray-600 mb-6">
            Curated products for women’s health, self-care, and wellness.
          </p>
          <Link
            href="/essentials"
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Explore Essentials
          </Link>
        </div>

        {/* Digital Store */}
        <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Digital Store
          </h3>
          <p className="text-gray-600 mb-6">
            Wellness journals, planners, guides, and more — crafted to support
            your journey.
          </p>
          <Link
            href="/store"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Explore Store
          </Link>
        </div>
      </div>
    </section>
  );
}
