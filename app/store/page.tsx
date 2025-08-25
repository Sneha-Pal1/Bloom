export default function StorePage() {
  const digitalProducts = [
    {
      name: "Daily Journal (Printable)",
      description: "Track your thoughts & routines with ease.",
      price: "₹199",
    },
    {
      name: "30-Day Self-Care Guide (PDF)",
      description: "A structured program to improve your lifestyle.",
      price: "₹349",
    },
    {
      name: "Habit Tracker (Printable)",
      description: "Build discipline with daily habit tracking sheets.",
      price: "₹149",
    },
    {
      name: "Mindfulness E-Book",
      description: "Learn techniques to reduce stress & stay focused.",
      price: "₹499",
    },
  ];

  return (
    <section className="py-16 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Digital Store
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Explore journals, guides, planners, and e-books. Instant download after
        purchase.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {digitalProducts.map((product, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-purple-600">{product.price}</p>
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
