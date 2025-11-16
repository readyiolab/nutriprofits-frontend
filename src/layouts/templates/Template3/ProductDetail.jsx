import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = ({  onBack = () => {} }) => {
  const { productId, templateId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);


    // Sample product data (In real scenario, fetch this data based on product ID)
    const products = [
    {
      id: 1,
      name: "Matcha Extreme",
      price: "$59.99",
      category: "Weight Loss",
      description:
        "Premium matcha blend for energy boost and weight management",
      fullDescription:
        "Matcha Extreme is a premium supplement designed to help you lose weight in a tasty and healthy way. It combines the power of matcha green tea with other natural ingredients to boost metabolism, increase energy, and support healthy weight management.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792729/Matcha_Extreme_ty0jgp.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405628/Matcha_Extreme_arxbnc.png",
      rating: 4.8,
      highlights: [
        "Helps achieve and maintain a healthy body weight",
        "Increases the excretion of water from the body",
        "Reduces feelings of fatigue and tiredness",
        "Helps maintain normal blood glucose levels",
      ],
      benefits: [
        "Loss of excess weight",
        "Improved metabolism and digestion",
        "Increased water excretion from the body",
        "Stable glycaemia and reduced appetite",
        "Increased energy to take action",
        "More energy and motivation to exercise",
        "Improved concentration and support of the nervous system",
        "Decreased feelings of fatigue and tiredness",
        "Revitalisation of the body and mind",
        "Efficient elimination of toxins and heavy metals",
        "Improved lipid profile",
        "Reduction of stress and tension",
        "Protection against free radicals",
      ],
      ingredients: [
        {
          name: "Matcha Green Tea Leaves Powder",
          description:
            "Rich in antioxidants, chlorophyll, EGCG, l-theanine and catechins. Supports weight loss, blood sugar stability, lipid profile, liver and heart health.",
        },
        {
          name: "Cacti-Nea™ (Prickly Pear Fruit Extract)",
          description:
            "Rich source of indicaxanthin, inhibits water retention, reduces waist circumference, slims figure, enhances muscle definition.",
        },
        {
          name: "Spirulina Powder",
          description:
            "High in protein, antioxidants, vitamins and trace elements. Speeds up metabolism, regulates blood sugar, detoxifies body, lowers cholesterol.",
        },
        {
          name: "Acerola Fruit Extract",
          description:
            "Natural vitamin C source, improves immune system function, supports post-workout regeneration, reduces fatigue.",
        },
      ],
    },
  ];

  // Find product by ID from URL parameter
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf5e4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#004445] mb-4">
            Product Not Found
          </h1>
          <button
            onClick={onBack}
            className="bg-[#004445] text-white px-8 py-3 rounded-lg hover:bg-[#2c786c] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleQuantityChange = (value) => {
    if (value >= 1) setQuantity(value);
  };

  return (
    <div className="min-h-screen bg-[#faf5e4] py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#004445] hover:text-[#2c786c] font-semibold mb-8 transition-colors"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-[#2c786c]/10 to-[#004445]/10 rounded-xl flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-[#004445]"
                  }`}
                >
                  ♥ {isWishlisted ? "Wishlisted" : "Wishlist"}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="inline-block bg-[#f8b400] text-[#004445] px-4 py-1 rounded-full text-sm font-bold mb-3">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-[#004445] mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-700 mb-4">
                {product.fullDescription}
              </p>
              <div className="text-4xl font-bold text-[#004445] mb-6">
                {product.price}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <label className="block text-sm font-semibold text-[#004445] mb-4">
                Quantity
              </label>
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-3 border-2 border-[#2c786c] rounded-lg"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="w-16 text-center border-2 border-[#2c786c] rounded-lg"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-3 border-2 border-[#2c786c] rounded-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-[#004445] to-[#2c786c] text-white py-4 rounded-xl font-bold text-lg"
              >
                Add to Cart
              </button>
            </div>

            {product.highlights && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[#004445] mb-6">
                  Key Highlights
                </h3>
                <ul className="space-y-4">
                  {product.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
