import {
  ArrowRight,
  Search,
  TrendingUp,
  Droplets,
  Apple,
  Activity,
  Eye,
  Flame,
  Heart,
  Shield,
  Sparkles,
  Wind,
  Sun,
  Moon,
  Pill,
  Brain,
  Dumbbell,
  Zap,
} from "lucide-react";
import { useState } from "react";

const Template1Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    { id: 1, name: "Longevity", description: "Premium longevity and anti-aging support products", image: "/assets/categories_icon/Longevity.png", color: "from-[#2c786c] to-[#004445]", icon: TrendingUp },
    { id: 2, name: "Urinary Tract Support", description: "Comprehensive urinary tract health", image: "/assets/categories_icon/Urinary%20Tract%20Support.png", color: "from-[#f8b400] to-[#2c786c]", icon: Droplets },
    { id: 3, name: "Appetite Suppressant", description: "Natural hunger control products", image: "/assets/categories_icon/Weight%20Loss.png", color: "from-[#004445] to-[#2c786c]", icon: Apple },
    { id: 4, name: "Joint Health", description: "Advanced joint support supplements", image: "/assets/categories_icon/Joint%20Health.png", color: "from-[#2c786c] to-[#f8b400]", icon: Activity },
    { id: 5, name: "Eye Health", description: "Premium vision support formulations", image: "/assets/categories_icon/Eye%20Health.png", color: "from-[#f8b400] to-[#004445]", icon: Eye },
    { id: 6, name: "Weight Loss", description: "Powerful fat-burning supplements", image: "/assets/categories_icon/Weight%20Loss.png", color: "from-[#004445] to-[#f8b400]", icon: Flame },
    { id: 7, name: "Prenatal Care", description: "Essential prenatal vitamins", image: "/assets/categories_icon/Prenatal%20Care.png", color: "from-[#2c786c] to-[#004445]", icon: Heart },
    { id: 8, name: "Prostate", description: "Specialized prostate health support", image: "/assets/categories_icon/Prostate.png", color: "from-[#f8b400] to-[#2c786c]", icon: Shield },
    { id: 9, name: "Hair Loss", description: "Advanced hair growth solutions", image: "/assets/categories_icon/Hair%20Loss.png", color: "from-[#004445] to-[#2c786c]", icon: Sparkles },
    { id: 10, name: "Blood Sugar", description: "Natural glucose control", image: "/assets/categories_icon/Blood%20Sugar.png", color: "from-[#2c786c] to-[#f8b400]", icon: TrendingUp },
    { id: 11, name: "Fresh Breath", description: "Oral health & fresh breath", image: "/assets/categories_icon/Fresh%20Breath.png", color: "from-[#f8b400] to-[#004445]", icon: Wind },
    { id: 12, name: "Cholesterol", description: "Cholesterol management", image: "/assets/categories_icon/Cholesterol.png", color: "from-[#004445] to-[#f8b400]", icon: Heart },
    { id: 13, name: "Menopause", description: "Menopause relief supplements", image: "/assets/categories_icon/Menopause.png", color: "from-[#2c786c] to-[#004445]", icon: Sun },
    { id: 14, name: "Breast Enhancement", description: "Natural enhancement support", image: "/assets/categories_icon/Breast%20Enhancement.png", color: "from-[#f8b400] to-[#2c786c]", icon: Sparkles },
    { id: 15, name: "Immunity", description: "Immune boosting supplements", image: "/assets/categories_icon/Immunity.png", color: "from-[#004445] to-[#2c786c]", icon: Shield },
    { id: 16, name: "Stress", description: "Natural stress relief", image: "/assets/categories_icon/Stress.png", color: "from-[#2c786c] to-[#f8b400]", icon: Moon },
    { id: 17, name: "Male Enhancement", description: "Vitality & performance", image: "/assets/categories_icon/Male%20Enhancement.png", color: "from-[#f8b400] to-[#004445]", icon: Zap },
    { id: 18, name: "Bodybuilding", description: "Muscle growth supplements", image: "/assets/categories_icon/Bodybuilding.png", color: "from-[#004445] to-[#f8b400]", icon: Dumbbell },
    { id: 19, name: "Acne", description: "Clear skin solutions", image: "/assets/categories_icon/Acne.png", color: "from-[#2c786c] to-[#004445]", icon: Pill },
    { id: 20, name: "Nootropics", description: "Brain & focus enhancers", image: "/assets/categories_icon/Nootropics.png", color: "from-[#f8b400] to-[#2c786c]", icon: Brain },
    { id: 21, name: "Anti-Aging", description: "Skin rejuvenation", image: "/assets/categories_icon/Anti-Aging.png", color: "from-[#004445] to-[#2c786c]", icon: Sparkles },
    { id: 22, name: "Varicose Veins", description: "Circulation support", image: "/assets/categories_icon/Varicose%20Veins.png", color: "from-[#2c786c] to-[#f8b400]", icon: Activity },
    { id: 23, name: "Thyroid", description: "Thyroid & metabolism", image: "/assets/categories_icon/Thyroid.png", color: "from-[#f8b400] to-[#004445]", icon: TrendingUp },
    { id: 24, name: "Female Libido", description: "Intimate wellness", image: "/assets/categories_icon/Female%20Libido.png", color: "from-[#004445] to-[#f8b400]", icon: Heart },
    { id: 25, name: "Testosterone", description: "Male hormone support", image: "/assets/categories_icon/Testosterone.png", color: "from-[#2c786c] to-[#004445]", icon: Flame },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf5e4]">
      {/* HERO SECTION - Fully Responsive */}
      <section className="bg-gradient-to-br from-[#004445] to-[#2c786c] px-4 py-10 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-white order-2 lg:order-1 text-center lg:text-left">
              <span className="inline-block bg-[#f8b400] text-[#004445] px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4">
                EXPLORE CATEGORIES
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4">
                Shop by Category
              </h1>
              <p className="text-[#faf5e4]/90 text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                Discover premium health & wellness products tailored to your needs. From longevity to immunity — find exactly what your body deserves.
              </p>
              <button className="bg-[#f8b400] text-[#004445] font-medium px-8 py-4 rounded-full hover:bg-amber-400 transition flex items-center gap-3 mx-auto lg:mx-0 shadow-lg">
                View All Categories <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800"
                alt="Premium Wellness Products"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-medium text-[#004445] mb-3">
            Browse Our Categories
          </h2>
          <p className="text-[#2c786c] text-lg">
            25+ specialized health categories for every wellness goal
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories (e.g., weight loss, immunity...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-14 py-4 rounded-full border-2 border-[#2c786c] focus:border-[#f8b400] focus:outline-none shadow-md text-base"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f8b400] p-3 rounded-full hover:bg-[#2c786c] transition">
              <Search className="w-5 h-5 text-[#004445] hover:text-white" />
            </button>
          </div>
        </div>

        {/* Categories Grid - Ultra Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group cursor-pointer transform transition-all hover:-translate-y-2"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-44 sm:h-52">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-30 group-hover:opacity-50 transition`} />
                  
                  {/* Category Image */}
                  <div className="relative h-32 sm:h-36 flex items-center justify-center p-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="max-w-full max-h-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                    <Icon className="w-12 h-12 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-center mt-3 text-sm sm:text-base font-semibold text-[#004445] group-hover:text-[#2c786c] transition line-clamp-2 px-2">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-[#2c786c] mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-[#004445]">No categories found</h3>
            <p className="text-[#2c786c] mt-2">Try searching for something else?</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#004445] to-[#2c786c] py-16 px-6 m-10 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-6">
            Ready to Transform Your Health?
          </h3>
          <p className="text-lg sm:text-xl text-[#faf5e4]/90 mb-10 max-w-2xl mx-auto">
            Join thousands who’ve already improved their wellness with science-backed supplements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#f8b400] text-[#004445] font-medium px-10 py-4 rounded-full hover:bg-white transition text-lg flex items-center justify-center gap-3 mx-auto sm:mx-0">
              Start Shopping Now <ArrowRight className="w-6 h-6" />
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-full hover:bg-white hover:text-[#004445] transition font-medium text-lg">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template1Categories;