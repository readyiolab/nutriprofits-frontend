import { useState } from "react";
import { Link } from "react-router-dom";
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
  Package,
} from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { getCategorySlug } from "../../../utils/slug";

const getCategoryIcon = (name) => {
  const normalized = (name || "").toLowerCase();
  if (normalized.includes("long")) return TrendingUp;
  if (normalized.includes("urin")) return Droplets;
  if (normalized.includes("appetite") || normalized.includes("weight")) return Flame;
  if (normalized.includes("joint") || normalized.includes("bone")) return Activity;
  if (normalized.includes("eye") || normalized.includes("vision")) return Eye;
  if (normalized.includes("prenatal") || normalized.includes("libido") || normalized.includes("breast") || normalized.includes("heart") || normalized.includes("cholesterol")) return Heart;
  if (normalized.includes("prostate") || normalized.includes("immun")) return Shield;
  if (normalized.includes("hair") || normalized.includes("skin") || normalized.includes("acne") || normalized.includes("aging")) return Sparkles;
  if (normalized.includes("breath")) return Wind;
  if (normalized.includes("sugar")) return TrendingUp;
  if (normalized.includes("menopause") || normalized.includes("hormone") || normalized.includes("testost")) return Sun;
  if (normalized.includes("stress") || normalized.includes("sleep")) return Moon;
  if (normalized.includes("male") || normalized.includes("energy")) return Zap;
  if (normalized.includes("body") || normalized.includes("muscle") || normalized.includes("gym")) return Dumbbell;
  if (normalized.includes("brain") || normalized.includes("focus") || normalized.includes("nootrop")) return Brain;
  return Package;
};

const DynamicCategories = () => {
  const backofficeData = useBackofficeData();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const categories = backofficeData?.backofficeCategories || [];
  const categoryPageContent = backofficeData?.categoryPageContent || {};
  const storeName = backofficeData?.backoffice?.store_name || "Our Store";

  const filteredCategories = categories.filter((cat) =>
    (cat.category_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.category_description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  <span className="text-xs font-bold tracking-wider uppercase">
                    {categoryPageContent.hero_subtitle || `${categories.length}+ Specialist Sectors`}
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white font-t2-heading leading-tight">
                  Explore Our <span className="text-emerald-400 font-normal italic">Expertise</span>
                </h1>
                
                <p className="text-base text-emerald-100/80 font-light leading-relaxed mb-8 max-w-xl">
                  {categoryPageContent.hero_description || "Discover targeted, science-backed solutions for every aspect of your health journey, organized by our specialist categories."}
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
                {categoryPageContent.categories_title || "Browse by Category"}
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                {categoryPageContent.categories_description || "Discover our wide range of science-backed formulations curated to optimize your vitality and health."}
              </p>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <LayoutGrid className="w-4 h-4 text-emerald-500" />
              <span>{filteredCategories.length} Categories Found</span>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredCategories.map((category) => {
              const IconComp = getCategoryIcon(category.category_name);
              const slug = getCategorySlug(category);
              return (
                <Link
                  key={category.id}
                  to={`/categories/${slug}`}
                  className="group relative block h-full transform transition-all duration-500 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="h-full bg-white rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-emerald-100 transition-all duration-500 flex flex-col">
                    {/* Visual Area */}
                    <div className="relative h-32 sm:h-56 bg-slate-50/50 overflow-hidden flex items-center justify-center p-4 sm:p-12">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10 w-full h-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
                        {category.category_image ? (
                          <img
                            src={category.category_image}
                            alt={category.category_name}
                            className="w-full h-full object-contain drop-shadow-2xl"
                          />
                        ) : (
                          <IconComp className="w-8 h-8 sm:w-16 sm:h-16 text-slate-200 group-hover:text-emerald-600 transition-colors" />
                        )}
                      </div>

                      {/* Icon Badge */}
                      <div className="absolute top-3 left-3 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl border border-slate-50 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 sm:p-8 flex flex-col flex-1">
                      <h3 className="text-sm sm:text-xl font-bold text-slate-900 mb-1 sm:mb-3 group-hover:text-emerald-600 transition-colors leading-tight font-t2-heading line-clamp-1">
                        {category.category_name}
                      </h3>
                      
                      <p className="text-slate-500 text-[11px] sm:text-[13px] leading-relaxed mb-4 sm:mb-8 line-clamp-2 font-light">
                        {category.category_description || "Discover our premium selection of health and wellness products in this category."}
                      </p>
                      
                      <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Explore
                        </span>
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-500 transform group-hover:translate-x-1 shadow-lg shadow-slate-900/10">
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>
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
                {categoryPageContent.cta_title || "Can't Find What You're Looking For?"}
              </h3>
              
              <p className="text-base sm:text-lg text-slate-600 mb-10 font-light leading-relaxed">
                {categoryPageContent.cta_description || `Contact our team and we'll help you find the perfect product to enhance your wellness journey with ${storeName}.`}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to={categoryPageContent.cta_button_link || "/contact"}
                  className="bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-700 hover:shadow-sm transition-all duration-300 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {categoryPageContent.cta_button_text || "Contact Support"}
                </Link>
                <Link
                  to={categoryPageContent.cta_support_link || "/"}
                  className="bg-white text-slate-700 border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all duration-300 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  {categoryPageContent.cta_support_text || "Browse All Products"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DynamicCategories;
