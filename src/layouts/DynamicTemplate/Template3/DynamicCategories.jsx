import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { getCategorySlug } from "../../../utils/slug";
import {
  Search,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Droplets,
  Apple,
  Activity,
  Eye,
  Flame,
  Heart,
  Shield,
  Moon,
  Zap,
  Dumbbell,
  Pill,
  Brain,
  Sun,
  Wind,
  Package,
} from "lucide-react";

// Icon mapping based on category name keywords
const getIcon = (name) => {
  const n = (name || "").toLowerCase();
  if (n.includes("long") || n.includes("age") || n.includes("sugar")) return TrendingUp;
  if (n.includes("urine") || n.includes("tract") || n.includes("water") || n.includes("drop")) return Droplets;
  if (n.includes("appetite") || n.includes("food") || n.includes("eat")) return Apple;
  if (n.includes("joint") || n.includes("bone") || n.includes("move") || n.includes("vein")) return Activity;
  if (n.includes("eye") || n.includes("vision") || n.includes("see")) return Eye;
  if (n.includes("weight") || n.includes("burn") || n.includes("fat") || n.includes("slim")) return Flame;
  if (n.includes("prenatal") || n.includes("mother") || n.includes("baby") || n.includes("heart") || n.includes("libido") || n.includes("cardio") || n.includes("cholesterol")) return Heart;
  if (n.includes("prostate") || n.includes("immune") || n.includes("defend") || n.includes("protect")) return Shield;
  if (n.includes("hair") || n.includes("glow") || n.includes("skin") || n.includes("nail") || n.includes("breast") || n.includes("enhance")) return Sparkles;
  if (n.includes("breath") || n.includes("fresh") || n.includes("oral") || n.includes("mouth")) return Wind;
  if (n.includes("sleep") || n.includes("stress") || n.includes("night") || n.includes("calm")) return Moon;
  if (n.includes("menopause") || n.includes("hormone") || n.includes("female")) return Sun;
  if (n.includes("energy") || n.includes("performance") || n.includes("male") || n.includes("testo") || n.includes("power") || n.includes("vital")) return Zap;
  if (n.includes("muscle") || n.includes("build") || n.includes("strength") || n.includes("body")) return Dumbbell;
  if (n.includes("brain") || n.includes("focus") || n.includes("nootropic") || n.includes("mind")) return Brain;
  return Package;
};

const DynamicCategories = () => {
  const navigate = useNavigate();
  const backofficeData = useBackofficeData();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = backofficeData?.backofficeCategories || [];
  const allProducts = backofficeData?.backofficeProducts || [];
  const categoryPageContent = backofficeData?.categoryPageContent || {};

  const filteredCategories = categories.filter((cat) =>
    (cat.category_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.category_description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProductsCount = allProducts.length;

  return (
    <div className="bg-[#eeeeee] min-h-screen font-mono">
      {/* INDUSTRIAL HERO */}
      <div className="bg-[#303841] text-[#eeeeee] relative overflow-hidden border-b-4 border-[#d72323] min-h-[400px] flex items-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-left">
            <span className="inline-block bg-[#d72323] text-white text-xs font-bold uppercase tracking-[0.3em] px-3 py-1.5 mb-4 rounded-sm">
              {categoryPageContent.hero_subtitle || "SYSTEM_CATEGORIES_v1.0"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
              {categoryPageContent.hero_title || "EXPLORE OUR CATEGORIES"}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light border-l-2 border-gray-600 pl-4 max-w-xl">
              {categoryPageContent.hero_description || "Browse our targeted segments of premium health formulations designed to meet high efficiency standards."}
            </p>
          </div>
          
          <div className="w-full lg:max-w-md">
            {/* Search Panel */}
            <div className="bg-[#3a4750] p-6 rounded-sm border border-gray-600 shadow-2xl relative">
              <label className="text-xs font-bold text-[#00adb5] uppercase tracking-wider mb-3 block">Query Categories</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#303841] border border-gray-600 text-white pl-12 pr-4 py-3 rounded-sm focus:border-[#d72323] focus:outline-none transition-colors font-mono placeholder:text-gray-500 text-sm"
                  placeholder="FILTER_KEYWORDS..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-300 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#303841] uppercase tracking-tight mb-2">
              {categoryPageContent.categories_title || "Wellness Classifications"}
            </h2>
            <p className="text-gray-500 text-sm">
              {categoryPageContent.categories_description || "Dynamic collection modules supporting multiple bio-pathways."}
            </p>
          </div>
          <div className="flex items-center gap-3 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <span>{filteredCategories.length} CATEGORIES LOADED</span>
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-300 bg-white/50">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-[#303841] mb-2 uppercase">NO MATCHING DATA FOUND</h3>
            <p className="text-gray-500 text-sm">Try running another directory scan parameter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {filteredCategories.map((category) => {
              const slug = getCategorySlug(category);
              const IconComponent = getIcon(category.category_name);
              const count = allProducts.filter((p) => p.category_id === category.id).length;

              return (
                <Link
                  key={category.id}
                  to={`/categories/${slug}`}
                  className="group relative"
                >
                  <div className="bg-white border border-gray-300 hover:border-[#d72323]/50 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                    {/* Tech Corner Markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Image Area */}
                    <div className="relative h-28 sm:h-48 overflow-hidden bg-gray-50/50 flex items-center justify-center p-4">
                      {category.category_image ? (
                        <img
                          src={category.category_image}
                          alt={category.category_name}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + category.category_name; }}
                        />
                      ) : (
                        <IconComponent className="w-12 h-12 text-gray-300 group-hover:text-[#d72323] transition-colors duration-300" />
                      )}
                      
                      {/* Icon Badge */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white border border-gray-200 p-1.5 rounded-sm shadow-sm">
                        <IconComponent className="w-3.5 h-3.5 text-[#303841]" />
                      </div>

                      {/* Count Badge */}
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-[#303841] text-white text-[8px] sm:text-[10px] font-mono px-2 py-0.5 rounded-sm shadow-sm">
                        {count} UNITS
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-5 flex flex-col flex-1 border-t border-gray-200">
                      <div className="flex-1">
                        <h3 className="text-xs sm:text-base font-bold text-[#303841] mb-1.5 uppercase leading-tight group-hover:text-black line-clamp-1">
                          {category.category_name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                          {category.category_description || category.category_name}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-gray-100 mt-auto">
                        <span className="text-[10px] font-bold text-[#d72323] uppercase tracking-wider">Access Panel</span>
                        <button className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded-sm hover:bg-[#d72323] hover:text-white hover:border-[#d72323] flex items-center justify-center transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-[#303841] via-[#3a4750] to-[#303841] text-white rounded-sm p-8 md:p-12 mb-16 shadow-xl border border-gray-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10 text-center">
            <div>
              <div className="text-2xl md:text-4xl font-black mb-2 text-[#00adb5]">
                {categories.length}
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">MODULE_CLASSES</p>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-black mb-2 text-[#00adb5]">
                {totalProductsCount}
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">ACTIVE_PRODUCTS</p>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-black mb-2 text-[#00adb5]">
                100%
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">STANDARDS_PASS</p>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-black mb-2 text-[#00adb5]">
                24H
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-mono">SERVICE_UPTIME</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-[#0f1214] via-[#303841] to-[#0f1214] text-white py-16 px-4 mx-4 rounded-sm mb-12 border border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#d72323]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              {categoryPageContent.cta_title ? "SYSTEM_RESOLVER" : "RESOLVE_SYSTEM_NEEDS"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-none">
            {categoryPageContent.cta_title ? categoryPageContent.cta_title.split('?')[0] + '?' : "Can't Find What You're Looking For?"}
          </h2>
          <p className="text-sm text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {categoryPageContent.cta_description || "Our customer support channels are online to help you locate target products."}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              to={categoryPageContent.cta_button_link || "/contact"}
              className="px-8 py-4 bg-[#d72323] text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#303841] transition-all transform shadow-[4px_4px_0_0_#eeeeee] hover:shadow-[2px_2px_0_0_#eeeeee] active:translate-x-[2px] active:translate-y-[2px]"
            >
              {categoryPageContent.cta_button_text || "Contact Support"}
            </Link>
            <Link 
              to={categoryPageContent.cta_support_link || "/"}
              className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-bold text-xs uppercase tracking-widest hover:border-white hover:text-white transition-colors"
            >
              {categoryPageContent.cta_support_text || "Browse All Products"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicCategories;
