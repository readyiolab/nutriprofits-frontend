import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { generateSlug } from "../../../utils/slug";
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
  ShoppingBag,
  Zap,
} from "lucide-react";

const Template2Categories = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [pageContent, setPageContent] = useState({
    hero_title: "EXPLORE OUR CATEGORIES",
    hero_subtitle: "Find What You're Looking For",
    hero_image_url: "https://plus.unsplash.com/premium_photo-1661515727122-787b38d2107f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNhdGVnb3J5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    categories_title: "Browse by Category",
    categories_description: "Discover our wide range of products organized by category.",
    view_all_text: "View All Products",
    view_all_link: "/products",
    cta_title: "Can't Find What You're Looking For?",
    cta_description: "Contact our team and we'll help you find the perfect product.",
    cta_button_text: "Contact Support",
    cta_button_link: "/contact",
    cta_support_text: "Browse All Products",
    cta_support_link: "/products"
  });

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

  // Fetch page content from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch page content
        const contentResponse = await fetch('/api/category-page-content');
        const contentData = await contentResponse.json();
        if (contentData.success) {
          setPageContent(contentData.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section with Image */}
      <div className="relative overflow-hidden">
        {pageContent.hero_image_url ? (
          <>
            <div className="relative h-[400px] md:h-[500px]">
              <img 
                src={pageContent.hero_image_url} 
                alt="Hero" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto text-center text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span className="text-sm font-medium">Explore Categories</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-medium mb-6 leading-tight">
                      {pageContent.hero_title}
                    </h1>
                    <p className="text-xl text-white/90">
                      {pageContent.hero_subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-100 text-gray-800">
            <div className="container mx-auto px-4 py-20">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Explore Categories</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-medium mb-6 leading-tight">
                  {pageContent.hero_title}
                </h1>
                <p className="text-xl text-gray-600">
                  {pageContent.hero_subtitle}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-800 mb-3">
            {pageContent.categories_title}
          </h2>
          <p className="text-gray-600 text-lg">
            {pageContent.categories_description}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-14 py-4 rounded-full border-2 border-gray-300 focus:border-blue-600 focus:outline-none shadow-md text-base"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black p-3 rounded-full hover:bg-gray-800 transition">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/template/${templateId}/products?category=${generateSlug(category.name)}`}
              className="group block cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden transition-all h-full border border-gray-100 hover:border-blue-200 hover:shadow-lg">
                {/* Image */}
                <div className="relative h-44 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 overflow-hidden">
                  <img
                    src={category.image || 'https://via.placeholder.com/300'}
                    alt={category.name}
                    className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4`}>
                    <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">View Products</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1.5 group-hover:text-blue-600 transition line-clamp-1 leading-snug">
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {category.product_count !== undefined && (
                      <span className="text-xs text-gray-400 font-medium">
                        {category.product_count} Products
                      </span>
                    )}
                    <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg group-hover:bg-blue-600 group-hover:shadow-md transition-all flex items-center gap-1.5 ml-auto">
                      <span className="text-xs font-medium">Browse</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-800">No categories found</h3>
            <p className="text-gray-600 mt-2">Try searching for something else?</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] py-10 sm:py-16 mx-4 sm:mx-12 rounded-2xl sm:rounded-3xl shadow-xl mb-10">
        <div className="container mx-auto px-3 sm:px-4 text-center text-white">
          <h3 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4 leading-tight">
            {pageContent.cta_title}
          </h3>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            {pageContent.cta_description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-2">
            <Link to={`/template/${templateId}${pageContent.cta_button_link}`} className="bg-white text-black font-medium px-8 py-3 sm:px-10 sm:py-4 rounded-full hover:shadow-lg transition text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              {pageContent.cta_button_text} 
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

            <Link to={`/template/${templateId}${pageContent.cta_support_link}`} className="border-2 border-white text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full hover:bg-white hover:text-black transition font-medium text-base sm:text-lg w-full sm:w-auto flex items-center justify-center">
              {pageContent.cta_support_text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2Categories;