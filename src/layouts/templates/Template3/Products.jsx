const Template3Products = () => {
  const products = [
    { id: 1, name: "Premium Product 1", price: "$99.99", category: "Electronics" },
    { id: 2, name: "Premium Product 2", price: "$149.99", category: "Fashion" },
    { id: 3, name: "Premium Product 3", price: "$199.99", category: "Home" },
    { id: 4, name: "Premium Product 4", price: "$249.99", category: "Sports" },
    { id: 5, name: "Premium Product 5", price: "$299.99", category: "Books" },
    { id: 6, name: "Premium Product 6", price: "$349.99", category: "Toys" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Our Premium Products
        </h1>
        <p className="text-gray-600">Discover our carefully curated collection of premium products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
            <div className="p-6">
              <span className="text-xs font-semibold text-blue-600 uppercase">{product.category}</span>
              <h3 className="text-xl font-bold mt-2 mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-purple-600 mb-4">{product.price}</p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Template3Products;