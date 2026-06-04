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
  LayoutGrid,
  Zap,
  ChevronRight,
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-slate-500 font-medium">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* PREMIUM ENTERPRISE DARK CONTRAST HERO */}
        <section className="relative bg-gradient-to-br from-[#064e3b] via-[#043e2f] to-[#022e22] text-white pt-28 pb-20 overflow-hidden border-b border-[#064e3b]/80 shadow-md min-h-[55vh] flex items-center mb-20 w-full">
          {/* Subtle background overlay image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-overlay scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#043e2f]/90 via-[#043e2f]/50 to-transparent"></div>

          <div className="container mx-auto px-6 relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column - Search & Title */}
              <div className="lg:col-span-7 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 mb-6 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold tracking-wider uppercase">Premium Wellness Directory</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white font-t2-heading leading-tight">
                  Explore Our <span className="text-emerald-400 font-normal italic">Expertise</span>
                </h1>
                
                <p className="text-base text-emerald-100/80 font-light leading-relaxed mb-8 max-w-xl">
                  Discover targeted, science-backed solutions for every aspect of your health journey, organized by our specialist categories.
                </p>

                {/* Refined Search Bar */}
                <div className="max-w-xl relative group">
                  <div className="absolute -inset-0.5 bg-emerald-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative flex items-center bg-white border border-slate-200/20 rounded-2xl px-5 py-3 shadow-md">
                    <Search className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search for a health category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 px-2 font-medium text-sm outline-none"
                    />
                    <div className="hidden md:block bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg shadow-sm">Search</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Premium image overlay */}
              <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative">
                <div className="relative w-full max-w-[380px] aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl p-2 bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-sm">
                  <img
                    src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=80"
                    alt="Premium Wellness Directory Visual"
                    className="w-full h-full object-cover rounded-[1.8rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#043e2f]/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8 py-8 mb-32">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-t2-heading tracking-tight leading-tight">
                {pageContent.categories_title}
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                {pageContent.categories_description}
              </p>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <LayoutGrid className="w-4 h-4 text-emerald-500" />
              <span>{filteredCategories.length} Categories Found</span>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredCategories.map((category) => {
              const IconComp = category.icon || Sparkles;
              return (
                <Link
                  key={category.id}
                  to={`/template/${templateId}/products?category=${generateSlug(category.name)}`}
                  className="group relative block h-full transform transition-all duration-500 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="h-full bg-white rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-emerald-100 transition-all duration-500 flex flex-row items-center gap-4 p-4 sm:flex-col sm:items-stretch sm:p-0">
                    {/* Visual Area */}
                    <div className="relative w-16 h-16 sm:w-full sm:h-56 bg-slate-50/50 overflow-hidden flex items-center justify-center rounded-xl sm:rounded-none flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block"></div>
                      
                      <div className="relative z-10 w-4/5 h-4/5 sm:w-full sm:h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-75 sm:duration-700 p-1 sm:p-12">
                        <img
                          src={category.image || 'https://via.placeholder.com/300'}
                          alt={category.name}
                          className="w-full h-full object-contain drop-shadow-2xl"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&q=80"; }}
                        />
                      </div>

                      {/* Icon Badge */}
                      <div className="absolute top-3 left-3 w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-50 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 hidden sm:flex">
                        <IconComp className="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 sm:p-8 flex flex-col justify-center">
                      <h3 className="text-sm sm:text-xl font-bold text-slate-900 mb-0.5 sm:mb-3 group-hover:text-emerald-600 transition-colors leading-tight font-t2-heading line-clamp-1">
                        {category.name}
                      </h3>
                      
                      <p className="text-slate-500 text-[11px] sm:text-[13px] leading-relaxed mb-2 sm:mb-8 line-clamp-1 sm:line-clamp-2 font-light">
                        {category.description || "Discover our premium selection of health and wellness products in this category."}
                      </p>
                      
                      <div className="hidden sm:flex mt-auto pt-4 sm:pt-6 border-t border-slate-50 items-center justify-between">
                        <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Explore Collection
                        </span>
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-500 transform group-hover:translate-x-1 shadow-lg shadow-slate-900/10">
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Arrow */}
                    <div className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 sm:p-16 md:p-24 text-center max-w-2xl mx-auto mt-20">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Search className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-t2-heading">No categories match</h3>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-10">
                We couldn't find any categories matching your search. Please try a different keyword.
              </p>
              <button 
                onClick={() => setSearchQuery("")}
                className="px-10 py-4 bg-emerald-50 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-100 transition-colors text-[11px] uppercase tracking-widest"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Premium CTA Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-32 max-w-5xl">
          <div className="relative rounded-[4rem] overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 border border-emerald-100/50 p-6 sm:p-16 md:p-24 text-center shadow-sm">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl sm:text-5xl font-bold mb-6 text-slate-900 tracking-tight font-t2-heading leading-tight">
                {pageContent.cta_title}
              </h3>
              
              <p className="text-base sm:text-lg text-slate-600 mb-10 font-light leading-relaxed">
                {pageContent.cta_description}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to={`/template/${templateId}${pageContent.cta_button_link}`}
                  className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-700 hover:shadow-sm transition-all duration-300 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {pageContent.cta_button_text}
                </Link>
                <Link
                  to={`/template/${templateId}${pageContent.cta_support_link}`}
                  className="bg-white text-slate-700 border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all duration-300 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  {pageContent.cta_support_text}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2Categories;