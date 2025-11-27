import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, ChevronRight, Sparkles, TrendingUp, Droplets, Apple, Activity, Eye, Flame, Heart, Shield, Moon, Zap, Dumbbell, Pill, Brain, Sun, Wind } from "lucide-react";

const Template3Categories = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  // Dynamic page content (will come from tbl_category_page_content)
  const pageContent = {
    hero_title: "EXPLORE OUR CATEGORIES",
    hero_subtitle: "Find What You're Looking For",
    hero_image_url: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=600&fit=crop",
    categories_title: "Browse by Category",
    categories_description: "Discover our wide range of products organized by category.",
    view_all_text: "View All Products",
    view_all_link: `/template/${templateId}/products`,
    cta_title: "Can't Find What You're Looking For?",
    cta_description: "Contact our team and we'll help you find the perfect product.",
    cta_button_text: "Contact Support",
    cta_button_link: `/template/${templateId}/contact`,
    cta_support_text: "Browse All Products",
    cta_support_link: `/template/${templateId}/products`,
  };

  const categories = [
    { id: 1, name: "Longevity", description: "Premium longevity and anti-aging support products", image: "/assets/categories_icon/Longevity.png", color: "from-[#2c786c] to-[#004445]", icon: TrendingUp, count: 12 },
    { id: 2, name: "Urinary Tract Support", description: "Comprehensive urinary tract health", image: "/assets/categories_icon/Urinary%20Tract%20Support.png", color: "from-[#f8b400] to-[#2c786c]", icon: Droplets, count: 8 },
    { id: 3, name: "Appetite Suppressant", description: "Natural hunger control products", image: "/assets/categories_icon/Weight%20Loss.png", color: "from-[#004445] to-[#2c786c]", icon: Apple, count: 15 },
    { id: 4, name: "Joint Health", description: "Advanced joint support supplements", image: "/assets/categories_icon/Joint%20Health.png", color: "from-[#2c786c] to-[#f8b400]", icon: Activity, count: 10 },
    { id: 5, name: "Eye Health", description: "Premium vision support formulations", image: "/assets/categories_icon/Eye%20Health.png", color: "from-[#f8b400] to-[#004445]", icon: Eye, count: 6 },
    { id: 6, name: "Weight Loss", description: "Powerful fat-burning supplements", image: "/assets/categories_icon/Weight%20Loss.png", color: "from-[#004445] to-[#f8b400]", icon: Flame, count: 25 },
    { id: 7, name: "Prenatal Care", description: "Essential prenatal vitamins", image: "/assets/categories_icon/Prenatal%20Care.png", color: "from-[#2c786c] to-[#004445]", icon: Heart, count: 9 },
    { id: 8, name: "Prostate", description: "Specialized prostate health support", image: "/assets/categories_icon/Prostate.png", color: "from-[#f8b400] to-[#2c786c]", icon: Shield, count: 7 },
    { id: 9, name: "Hair Loss", description: "Advanced hair growth solutions", image: "/assets/categories_icon/Hair%20Loss.png", color: "from-[#004445] to-[#2c786c]", icon: Sparkles, count: 11 },
    { id: 10, name: "Blood Sugar", description: "Natural glucose control", image: "/assets/categories_icon/Blood%20Sugar.png", color: "from-[#2c786c] to-[#f8b400]", icon: TrendingUp, count: 8 },
    { id: 11, name: "Fresh Breath", description: "Oral health & fresh breath", image: "/assets/categories_icon/Fresh%20Breath.png", color: "from-[#f8b400] to-[#004445]", icon: Wind, count: 5 },
    { id: 12, name: "Cholesterol", description: "Cholesterol management", image: "/assets/categories_icon/Cholesterol.png", color: "from-[#004445] to-[#f8b400]", icon: Heart, count: 9 },
    { id: 13, name: "Menopause", description: "Menopause relief supplements", image: "/assets/categories_icon/Menopause.png", color: "from-[#2c786c] to-[#004445]", icon: Sun, count: 6 },
    { id: 14, name: "Breast Enhancement", description: "Natural enhancement support", image: "/assets/categories_icon/Breast%20Enhancement.png", color: "from-[#f8b400] to-[#2c786c]", icon: Sparkles, count: 4 },
    { id: 15, name: "Immunity", description: "Immune boosting supplements", image: "/assets/categories_icon/Immunity.png", color: "from-[#004445] to-[#2c786c]", icon: Shield, count: 14 },
    { id: 16, name: "Stress", description: "Natural stress relief", image: "/assets/categories_icon/Stress.png", color: "from-[#2c786c] to-[#f8b400]", icon: Moon, count: 10 },
    { id: 17, name: "Male Enhancement", description: "Vitality & performance", image: "/assets/categories_icon/Male%20Enhancement.png", color: "from-[#f8b400] to-[#004445]", icon: Zap, count: 18 },
    { id: 18, name: "Bodybuilding", description: "Muscle growth supplements", image: "/assets/categories_icon/Bodybuilding.png", color: "from-[#004445] to-[#f8b400]", icon: Dumbbell, count: 16 },
    { id: 19, name: "Acne", description: "Clear skin solutions", image: "/assets/categories_icon/Acne.png", color: "from-[#2c786c] to-[#004445]", icon: Pill, count: 7 },
    { id: 20, name: "Nootropics", description: "Brain & focus enhancers", image: "/assets/categories_icon/Nootropics.png", color: "from-[#f8b400] to-[#2c786c]", icon: Brain, count: 12 },
    { id: 21, name: "Anti-Aging", description: "Skin rejuvenation", image: "/assets/categories_icon/Anti-Aging.png", color: "from-[#004445] to-[#2c786c]", icon: Sparkles, count: 13 },
    { id: 22, name: "Varicose Veins", description: "Circulation support", image: "/assets/categories_icon/Varicose%20Veins.png", color: "from-[#2c786c] to-[#f8b400]", icon: Activity, count: 5 },
    { id: 23, name: "Thyroid", description: "Thyroid & metabolism", image: "/assets/categories_icon/Thyroid.png", color: "from-[#f8b400] to-[#004445]", icon: TrendingUp, count: 8 },
    { id: 24, name: "Female Libido", description: "Intimate wellness", image: "/assets/categories_icon/Female%20Libido.png", color: "from-[#004445] to-[#f8b400]", icon: Heart, count: 9 },
    { id: 25, name: "Testosterone", description: "Male hormone support", image: "/assets/categories_icon/Testosterone.png", color: "from-[#2c786c] to-[#004445]", icon: Flame, count: 11 },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProducts = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

  return (
    <div className="bg-[#eeeeee] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[450px] sm:h-[550px] mb-12 sm:mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pageContent.hero_image_url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1214]/90 to-[#0f1214]/50" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <span className="inline-block bg-white text-[#303841] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 uppercase tracking-wider shadow-lg">
                {pageContent.hero_subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
                {pageContent.hero_title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                {pageContent.categories_description}
              </p>
              <button 
                onClick={() => navigate(pageContent.view_all_link)}
                className="bg-[#d72323] text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-[#303841] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                {pageContent.view_all_text} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#303841] mb-4">
            {pageContent.categories_title}
          </h2>
          <p className="text-base sm:text-lg text-[#3a4750] max-w-2xl mx-auto">
            {pageContent.categories_description}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3a4750] w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-[#d72323] focus:outline-none shadow-sm transition-all bg-white text-[#303841]"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-[#3a4750] mb-4" />
            <h3 className="text-2xl font-semibold text-[#303841] mb-2">No categories found</h3>
            <p className="text-[#3a4750]">Try searching for something else</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/template/${templateId}/products?category=${category.name}`)}
                >
                  {/* Card */}
                  <div className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full flex flex-col border-2 border-transparent hover:border-[#d72323]">
                    {/* Image Container with Gradient Overlay */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20`} />
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain p-6   "
                        onError={(e) => (e.target.src = "https://via.placeholder.com/400x400?text=" + category.name)}
                      />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                        <IconComponent className="w-6 h-6 text-[#303841]" />
                      </div>

                      {/* Product Count Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                        <span className="text-sm font-semibold text-[#303841]">{category.count} Products</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-[#303841] mb-2 group-hover:text-[#d72323] transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-[#3a4750] line-clamp-2 mb-4">
                          {category.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-semibold text-[#d72323]">Explore</span>
                        <button className="bg-[#303841] text-white p-2 rounded-lg hover:bg-[#d72323] transition-all transform group-hover:translate-x-1">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-[#303841] via-[#3a4750] to-[#303841] text-white rounded-2xl p-8 md:p-12 mb-12 sm:mb-16 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-2xl md:text-4xl font-normal mb-2 bg-white  bg-clip-text text-transparent">
                {categories.length}+
              </div>
              <p className="text-white/80 text-sm sm:text-base">Categories</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-2xl md:text-4xl font-normal mb-2 bg-white  bg-clip-text text-transparent">
                {totalProducts}+
              </div>
              <p className="text-white/80 text-sm sm:text-base">Total Products</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-2xl md:text-4xl font-normal mb-2 bg-white  bg-clip-text text-transparent">
                100%
              </div>
              <p className="text-white/80 text-sm sm:text-base">Premium Quality</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-2xl md:text-4xl font-normal mb-2 bg-white  bg-clip-text text-transparent">
                24/7
              </div>
              <p className="text-white/80 text-sm sm:text-base">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-[#0f1214] via-[#303841] to-[#0f1214] text-white py-16 px-4 sm:px-6 lg:px-8 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#d72323]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Need Help?
            </span>
            <Sparkles className="w-5 h-5 text-[#d72323]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            {pageContent.cta_title}
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {pageContent.cta_description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => navigate(pageContent.cta_button_link)}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#d72323] text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all transform  shadow-lg"
            >
              {pageContent.cta_button_text}
            </button>
            <button 
              onClick={() => navigate(pageContent.cta_support_link)}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all transform"
            >
              {pageContent.cta_support_text}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template3Categories;