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
  {
    id: 1,
    name: "Longevity",
    description: "Premium longevity and anti-aging support products",
    image: "/assets/categories_icon/Longevity.png",
    color: "from-[#2c786c] to-[#004445]",
    icon: TrendingUp,
  },
  {
    id: 2,
    name: "Urinary Tract Support",
    description: "Comprehensive urinary tract health and bladder support",
    image: "/assets/categories_icon/Urinary%20Tract%20Support.png",
    color: "from-[#f8b400] to-[#2c786c]",
    icon: Droplets,
  },
  {
    id: 3,
    name: "Appetite Suppressant",
    description: "Natural appetite suppressant and hunger control products",
    image: "/assets/categories_icon/Weight%20Loss.png",
    color: "from-[#004445] to-[#2c786c]",
    icon: Apple,
  },
  {
    id: 4,
    name: "Joint Health",
    description: "Advanced joint support and mobility supplements",
    image: "/assets/categories_icon/Joint%20Health.png",
    color: "from-[#2c786c] to-[#f8b400]",
    icon: Activity,
  },
  {
    id: 5,
    name: "Eye Health",
    description: "Premium eye health and vision support formulations",
    image: "/assets/categories_icon/Eye%20Health.png",
    color: "from-[#f8b400] to-[#004445]",
    icon: Eye,
  },
  {
    id: 6,
    name: "Weight Loss",
    description: "Powerful weight loss and fat-burning supplements",
    image: "/assets/categories_icon/Weight%20Loss.png",
    color: "from-[#004445] to-[#f8b400]",
    icon: Flame,
  },
  {
    id: 7,
    name: "Prenatal Care",
    description: "Essential prenatal vitamins and pregnancy support",
    image: "/assets/categories_icon/Prenatal%20Care.png",
    color: "from-[#2c786c] to-[#004445]",
    icon: Heart,
  },
  {
    id: 8,
    name: "Prostate",
    description: "Specialized prostate health support supplements",
    image: "/assets/categories_icon/Prostate.png",
    color: "from-[#f8b400] to-[#2c786c]",
    icon: Shield,
  },
  {
    id: 9,
    name: "Hair Loss",
    description: "Advanced hair growth and anti-hair loss formulations",
    image: "/assets/categories_icon/Hair%20Loss.png",
    color: "from-[#004445] to-[#2c786c]",
    icon: Sparkles,
  },
  {
    id: 10,
    name: "Blood Sugar",
    description: "Natural blood sugar management and glucose control",
    image: "/assets/categories_icon/Blood%20Sugar.png",
    color: "from-[#2c786c] to-[#f8b400]",
    icon: TrendingUp,
  },
  {
    id: 11,
    name: "Fresh Breath",
    description: "Fresh breath and oral health care products",
    image: "/assets/categories_icon/Fresh%20Breath.png",
    color: "from-[#f8b400] to-[#004445]",
    icon: Wind,
  },
  {
    id: 12,
    name: "Cholesterol",
    description: "Cholesterol management supplements",
    image: "/assets/categories_icon/Cholesterol.png",
    color: "from-[#004445] to-[#f8b400]",
    icon: Heart,
  },
  {
    id: 13,
    name: "Menopause",
    description: "Comprehensive menopause support supplements",
    image: "/assets/categories_icon/Menopause.png",
    color: "from-[#2c786c] to-[#004445]",
    icon: Sun,
  },
  {
    id: 14,
    name: "Breast Enhancement",
    description: "Natural breast enhancement and beauty support",
    image: "/assets/categories_icon/Breast%20Enhancement.png",
    color: "from-[#f8b400] to-[#2c786c]",
    icon: Sparkles,
  },
  {
    id: 15,
    name: "Immunity",
    description: "Immune system support supplements packed with vitamins",
    image: "/assets/categories_icon/Immunity.png",
    color: "from-[#004445] to-[#2c786c]",
    icon: Shield,
  },
  {
    id: 16,
    name: "Stress",
    description: "Natural stress relief and relaxation supplements",
    image: "/assets/categories_icon/Stress.png",
    color: "from-[#2c786c] to-[#f8b400]",
    icon: Moon,
  },
  {
    id: 17,
    name: "Male Enhancement",
    description: "Premium male enhancement and vitality supplements",
    image: "/assets/categories_icon/Male%20Enhancement.png",
    color: "from-[#f8b400] to-[#004445]",
    icon: Zap,
  },
  {
    id: 18,
    name: "Bodybuilding",
    description: "Advanced bodybuilding and muscle-building supplements",
    image: "/assets/categories_icon/Bodybuilding.png",
    color: "from-[#004445] to-[#f8b400]",
    icon: Dumbbell,
  },
  {
    id: 19,
    name: "Acne",
    description: "Effective acne treatment and skincare solutions",
    image: "/assets/categories_icon/Acne.png",
    color: "from-[#2c786c] to-[#004445]",
    icon: Pill,
  },
  {
    id: 20,
    name: "Nootropics",
    description: "Cognitive enhancement and brain support supplements",
    image: "/assets/categories_icon/Nootropics.png",
    color: "from-[#f8b400] to-[#2c786c]",
    icon: Brain,
  },
  {
    id: 21,
    name: "Anti-Aging",
    description: "Powerful anti-aging and skin rejuvenation supplements",
    image: "/assets/categories_icon/Anti-Aging.png",
    color: "from-[#004445] to-[#2c786c]",
    icon: Sparkles,
  },
  {
    id: 22,
    name: "Varicose Veins",
    description: "Specialized varicose veins treatment supplements",
    image: "/assets/categories_icon/Varicose%20Veins.png",
    color: "from-[#2c786c] to-[#f8b400]",
    icon: Activity,
  },
  {
    id: 23,
    name: "Thyroid",
    description: "Thyroid health and metabolism support supplements",
    image: "/assets/categories_icon/Thyroid.png",
    color: "from-[#f8b400] to-[#004445]",
    icon: TrendingUp,
  },
  {
    id: 24,
    name: "Female Libido",
    description: "Natural female libido enhancement and intimate health",
    image: "/assets/categories_icon/Female%20Libido.png",
    color: "from-[#004445] to-[#f8b400]",
    icon: Heart,
  },
  {
    id: 25,
    name: "Testosterone",
    description: "Testosterone support supplements for male vitality",
    image: "/assets/categories_icon/Testosterone.png",
    color: "from-[#2c786c] to-[#004445]",
    icon: Flame,
  },
];


  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf5e4] overflow-x-hidden">
      <div >
        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] p-4 sm:p-6 md:p-8 lg:p-12 mb-8 md:mb-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* LEFT CONTENT */}
            <div className="text-white order-2 md:order-1">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="bg-[#f8b400] text-[#004445] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  EXPLORE CATEGORIES
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                Shop by Category
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-[#faf5e4] mb-4 sm:mb-6 leading-relaxed">
                Discover your perfect product across our diverse range of categories.
                From cutting-edge wellness to health supplements, we've got everything
                organized for your convenience.
              </p>
              <div className="flex gap-3 sm:gap-4">
                <button className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#ffa500] cursor-pointer shadow-lg flex items-center gap-2 text-sm sm:text-base transition-all">
                  View All <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* RIGHT FULL IMAGE */}
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] overflow-hidden shadow-lg rounded-xl order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
                alt="Wellness Product Display"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* HEADING */}
        <div className="text-center mb-6 md:mb-8 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#004445] mb-2 sm:mb-3">
            Browse Our Categories
          </h2>
          <p className="text-[#2c786c] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized collection
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8 md:mb-10 max-w-2xl mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-14 rounded-full border-2 border-[#2c786c] focus:border-[#f8b400] focus:outline-none shadow-lg transition-all text-sm sm:text-base"
            />
            <button className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-[#f8b400] text-[#004445] p-2 sm:p-3 rounded-full hover:bg-[#2c786c] hover:text-white transition-all">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-4">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            const isHovered = hoveredId === category.id;

            return (
              <div
                key={category.id}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer"
              >
                <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className=" object-cover transition-transform duration-300 group-hover:scale-105 w-40 h-40 mx-auto mt-2"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-2 sm:p-3 md:p-4 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#004445] group-hover:text-[#2c786c] transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* NO RESULTS */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 sm:py-16 px-4">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-[#2c786c] mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#004445] mb-2">
              No categories found
            </h3>
            <p className="text-[#2c786c] text-sm sm:text-base">Try adjusting your search query</p>
          </div>
        )}

        {/* FEATURED SECTION - CTA */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#004445] to-[#2c786c] rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden mx-4 sm:mx-6 lg:mx-10 shadow-2xl mb-8 md:mb-12">
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#f8b400] opacity-10 rounded-full -mr-24 md:-mr-32 -mt-24 md:-mt-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#f8b400] opacity-10 rounded-full -ml-16 md:-ml-24 -mb-16 md:-mb-24"></div>
          
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 sm:mb-6">
              Ready to Transform Your Health?
            </h3>
            <p className="text-[#faf5e4] text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed px-4">
              Join thousands of satisfied customers who have found their perfect wellness solution. 
              Browse our categories and discover products that match your health goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button className="w-full sm:w-auto bg-[#f8b400] text-[#004445] px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-white transition-all transform cursor-pointer shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base">
                Start Shopping <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-[#004445] cursor-pointer transition-all text-sm sm:text-base">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1Categories;