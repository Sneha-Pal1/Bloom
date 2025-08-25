export default function EssentialsPage() {
  const products = [
    {
      name: "Organic Herbal Tea",
      description: "Boost your energy & immunity naturally.",
      price: "₹299",
    },
    {
      name: "Aroma Diffuser",
      description: "Relaxing essential oil diffuser for stress relief.",
      price: "₹1,499",
    },
    {
      name: "Yoga Mat (Eco-Friendly)",
      description: "Non-slip mat made with sustainable material.",
      price: "₹899",
    },
    {
      name: "Self-Care Kit",
      description: "Curated box for women’s daily wellness needs.",
      price: "₹2,199",
    },
  ];

  return (
    <section className="py-16 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Wellness Essentials
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Handpicked products to support women’s self-care, mindfulness, and
        overall well-being.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-pink-600">{product.price}</p>
            <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
