const Template3Categories = () => {
  const categories = [
    { id: 1, name: "Electronics", count: 45, icon: "📱", color: "from-blue-400 to-blue-600" },
    { id: 2, name: "Fashion", count: 120, icon: "👕", color: "from-purple-400 to-purple-600" },
    { id: 3, name: "Home & Garden", count: 89, icon: "🏠", color: "from-pink-400 to-pink-600" },
    { id: 4, name: "Sports", count: 67, icon: "⚽", color: "from-green-400 to-green-600" },
    { id: 5, name: "Books", count: 234, icon: "📚", color: "from-yellow-400 to-yellow-600" },
    { id: 6, name: "Toys", count: 56, icon: "🧸", color: "from-red-400 to-red-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Shop by Category
        </h1>
        <p className="text-gray-600">Explore our wide range of product categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
              <span className="text-6xl">{category.icon}</span>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.count} Products</p>
              <button className="mt-4 text-blue-600 hover:text-purple-600 font-semibold">
                Browse →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Template3Categories;