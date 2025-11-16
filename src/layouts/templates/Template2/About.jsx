const Template2About = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          About Us
        </h1>
        <p className="text-gray-600 text-lg">Learn more about our story and values</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Welcome to our modern business! We've been serving customers since 2020, providing 
          high-quality products with exceptional service. Our mission is to revolutionize the 
          way people shop online.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We believe in innovation, quality, and customer satisfaction. Every product we offer 
          is carefully selected to meet our premium standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-blue-100">Delivering excellence in every product</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-8 text-white text-center">
          <div className="text-5xl mb-4">👁️</div>
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-purple-100">To be the most innovative online store</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-xl shadow-lg p-8 text-white text-center">
          <div className="text-5xl mb-4">💎</div>
          <h3 className="text-xl font-bold mb-2">Our Values</h3>
          <p className="text-pink-100">Innovation, Quality, Trust</p>
        </div>
      </div>
    </div>
  );
};

export default Template2About;