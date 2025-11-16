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
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#004445]",
      icon: TrendingUp,
    },
    {
      id: 2,
      name: "Urinary Tract Support",
      description: "Comprehensive urinary tract health and bladder support",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      color: "from-[#f8b400] to-[#2c786c]",
      icon: Droplets,
    },
    {
      id: 3,
      name: "Appetite Suppressant",
      description: "Natural appetite suppressant and hunger control products",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop",
      color: "from-[#004445] to-[#2c786c]",
      icon: Apple,
    },
    {
      id: 4,
      name: "Joint Health",
      description: "Advanced joint support and mobility supplements",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#f8b400]",
      icon: Activity,
    },
    {
      id: 5,
      name: "Eye Health",
      description: "Premium eye health and vision support formulations",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop",
      color: "from-[#f8b400] to-[#004445]",
      icon: Eye,
    },
    {
      id: 6,
      name: "Weight Loss",
      description: "Powerful weight loss and fat-burning supplements",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
      color: "from-[#004445] to-[#f8b400]",
      icon: Flame,
    },
    {
      id: 7,
      name: "Prenatal Care",
      description: "Essential prenatal vitamins and pregnancy support",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#004445]",
      icon: Heart,
    },
    {
      id: 8,
      name: "Prostate",
      description: "Specialized prostate health support supplements",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
      color: "from-[#f8b400] to-[#2c786c]",
      icon: Shield,
    },
    {
      id: 9,
      name: "Hair Loss",
      description: "Advanced hair growth and anti-hair loss formulations",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop",
      color: "from-[#004445] to-[#2c786c]",
      icon: Sparkles,
    },
    {
      id: 10,
      name: "Blood Sugar",
      description: "Natural blood sugar management and glucose control",
      image: "https://images.unsplash.com/photo-1579154341655-c91ff748e1fd?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#f8b400]",
      icon: TrendingUp,
    },
    {
      id: 11,
      name: "Fresh Breath",
      description: "Fresh breath and oral health care products",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop",
      color: "from-[#f8b400] to-[#004445]",
      icon: Wind,
    },
    {
      id: 12,
      name: "Cholesterol",
      description: "Cholesterol management supplements",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
      color: "from-[#004445] to-[#f8b400]",
      icon: Heart,
    },
    {
      id: 13,
      name: "Menopause",
      description: "Comprehensive menopause support supplements",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#004445]",
      icon: Sun,
    },
    {
      id: 14,
      name: "Breast Enhancement",
      description: "Natural breast enhancement and beauty support",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop",
      color: "from-[#f8b400] to-[#2c786c]",
      icon: Sparkles,
    },
    {
      id: 15,
      name: "Immunity",
      description: "Immune system support supplements packed with vitamins",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      color: "from-[#004445] to-[#2c786c]",
      icon: Shield,
    },
    {
      id: 16,
      name: "Stress",
      description: "Natural stress relief and relaxation supplements",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#f8b400]",
      icon: Moon,
    },
    {
      id: 17,
      name: "Male Enhancement",
      description: "Premium male enhancement and vitality supplements",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      color: "from-[#f8b400] to-[#004445]",
      icon: Zap,
    },
    {
      id: 18,
      name: "Bodybuilding",
      description: "Advanced bodybuilding and muscle-building supplements",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
      color: "from-[#004445] to-[#f8b400]",
      icon: Dumbbell,
    },
    {
      id: 19,
      name: "Acne",
      description: "Effective acne treatment and skincare solutions",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#004445]",
      icon: Pill,
    },
    {
      id: 20,
      name: "Nootropics",
      description: "Cognitive enhancement and brain support supplements",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
      color: "from-[#f8b400] to-[#2c786c]",
      icon: Brain,
    },
    {
      id: 21,
      name: "Anti-Aging",
      description: "Powerful anti-aging and skin rejuvenation supplements",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
      color: "from-[#004445] to-[#2c786c]",
      icon: Sparkles,
    },
    {
      id: 22,
      name: "Varicose Veins",
      description: "Specialized varicose veins treatment supplements",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#f8b400]",
      icon: Activity,
    },
    {
      id: 23,
      name: "Thyroid",
      description: "Thyroid health and metabolism support supplements",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      color: "from-[#f8b400] to-[#004445]",
      icon: TrendingUp,
    },
    {
      id: 24,
      name: "Female Libido",
      description: "Natural female libido enhancement and intimate health",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop",
      color: "from-[#004445] to-[#f8b400]",
      icon: Heart,
    },
    {
      id: 25,
      name: "Testosterone",
      description: "Testosterone support supplements for male vitality",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      color: "from-[#2c786c] to-[#004445]",
      icon: Flame,
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf5e4]">
      <div className="max-w-7xl mx-auto ">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] p-8 md:p-12 mb-12 shadow-2xl ">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* LEFT CONTENT */}
            <div className="text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#f8b400] text-[#004445] px-4 py-1 rounded-full text-sm font-semibold">
                  EXPLORE CATEGORIES
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Shop by Category
              </h1>
              <p className="text-lg text-[#faf5e4] mb-6 leading-relaxed">
                Discover your perfect product across our diverse range of categories.
                From cutting-edge wellness to health supplements, we've got everything
                organized for your convenience.
              </p>
              <div className="flex gap-4">
                <button className="bg-[#f8b400] text-[#004445] px-8 py-3 rounded-lg font-semibold hover:bg-[#ffa500] cursor-pointer shadow-lg flex items-center gap-2">
                  View All <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* RIGHT FULL IMAGE */}
            <div className="relative h-[350px] md:h-[450px] overflow-hidden shadow-lg rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
                alt="Wellness Product Display"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* HEADING */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-[#004445] mb-3">
            Browse Our Categories
          </h2>
          <p className="text-[#2c786c] text-lg max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized collection
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full border-2 border-[#2c786c] focus:border-[#f8b400] focus:outline-none shadow-lg transition-all"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f8b400] text-[#004445] p-3 rounded-full hover:bg-[#2c786c] hover:text-white transition-all">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            const isHovered = hoveredId === category.id;

            return (
              <div
                key={category.id}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover  transition-transform duration-300"
                  />
                  {/* Icon Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all`}>
                    <IconComponent className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium text-[#004445] group-hover:text-[#2c786c] transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* NO RESULTS */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-[#2c786c] mb-4" />
            <h3 className="text-2xl font-bold text-[#004445] mb-2">
              No categories found
            </h3>
            <p className="text-[#2c786c]">Try adjusting your search query</p>
          </div>
        )}

        {/* FEATURED SECTION - CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#004445] to-[#2c786c] rounded-2xl p-12 md:p-16 relative overflow-hidden m-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8b400] opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f8b400] opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h3 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Ready to Transform Your Health?
            </h3>
            <p className="text-[#faf5e4] text-lg mb-8 leading-relaxed">
              Join thousands of satisfied customers who have found their perfect wellness solution. 
              Browse our categories and discover products that match your health goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-[#f8b400] text-[#004445] px-10 py-4 rounded-full font-semibold hover:bg-white transition-all transform  cursor-pointer shadow-xl flex items-center gap-2">
                Start Shopping <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-[#004445] cursor-pointer transition-all transform hover:scale-105">
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