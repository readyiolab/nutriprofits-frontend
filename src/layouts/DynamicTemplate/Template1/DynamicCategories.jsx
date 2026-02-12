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
  Package,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { getCategorySlug } from "../../../utils/slug";

// Icon mapping for dynamic assignment
const iconMap = {
  TrendingUp, Droplets, Apple, Activity, Eye, Flame, Heart, Shield,
  Sparkles, Wind, Sun, Moon, Pill, Brain, Dumbbell, Zap,
};

// Color palette for category cards
const colorPalette = [
  "from-[#2c786c] to-[#004445]",
  "from-[#f8b400] to-[#2c786c]",
  "from-[#004445] to-[#2c786c]",
  "from-[#2c786c] to-[#f8b400]",
  "from-[#f8b400] to-[#004445]",
  "from-[#004445] to-[#f8b400]",
];

const DynamicCategories = () => {
  const backofficeData = useBackofficeData();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = backofficeData?.backofficeCategories || [];
  const categoryPageContent = backofficeData?.categoryPageContent || {};

  const filteredCategories = categories.filter((cat) =>
    (cat.category_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.category_description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ── CLEAN HERO SECTION ── */}
      <section className="relative pt-20 pb-16 px-4 bg-[#faf9f6] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2c786c]/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#f8b400]/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#2c786c]/10 border border-[#2c786c]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#2c786c]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#2c786c] uppercase">
              {categoryPageContent.hero_subtitle || `${categories.length}+ Premium Selection`}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-medium text-[#004445] mb-6 tracking-tight leading-[1.1]">
            {categoryPageContent.hero_title || (
              <>
                Scientifically Formulated <br />
                <span className="text-[#2c786c] italic font-serif">Wellness Solutions</span>
              </>
            )}
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            {categoryPageContent.hero_description || "Explore our expertly curated selection of premium supplements designed to support your specific wellness journey with purity and precision."}
          </p>

          {/* Minimal Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-300 group-focus-within:text-[#2c786c] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search health categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-[#2c786c]/5 shadow-sm focus:shadow-xl transition-all text-gray-600 placeholder:text-gray-300"
            />
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section id="categories-section" className="py-20 px-4 max-w-7xl mx-auto">
        {/* Added Section Header for Dynamic Content */}
        {(categoryPageContent.categories_title || categoryPageContent.categories_description) && (
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-medium text-[#004445] mb-4">{categoryPageContent.categories_title}</h2>
            <p className="text-gray-400 font-light">{categoryPageContent.categories_description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((category) => {
            const slug = getCategorySlug(category);
            const Icon = Package;

            return (
              <Link
                key={category.id}
                to={`/categories/${slug}`}
                className="group cursor-pointer"
              >
                <div className="relative bg-[#fcfcfc] rounded-[2.5rem] p-8 border border-gray-50 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_50px_rgba(44,120,108,0.08)] hover:-translate-y-2 flex flex-col items-center h-full">
                  {/* Image Container - Floating style */}
                  <div className="w-full aspect-square relative mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                    {category.category_image ? (
                      <img
                        src={category.category_image}
                        alt={category.category_name}
                        className="relative w-4/5 h-4/5 object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Icon className="w-1/2 h-1/2 text-gray-200 group-hover:text-[#2c786c] transition-colors" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="text-center w-full">
                    <h3 className="text-xl font-semibold text-[#004445] mb-3 group-hover:text-[#2c786c] transition-colors">
                      {category.category_name}
                    </h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-2 px-2">
                      {category.category_description || category.category_name}
                    </p>
                  </div>

                  {/* Action Arrow */}
                  <div className="mt-auto pt-6 flex justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                     <span className="text-[10px] font-bold tracking-widest text-[#2c786c] uppercase">View Details →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── NO RESULTS ── */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-32">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-200" />
            </div>
            <h3 className="text-2xl font-medium text-[#004445] mb-2">No categories found</h3>
            <p className="text-gray-400 mb-8 font-light">Try adjusting your search terms</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-[#2c786c] font-bold border-b-2 border-[#2c786c] pb-1 hover:text-[#004445] hover:border-[#004445] transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* ── MINIMAL CTA ── */}
      <section className="py-24 px-4 bg-[#004445] rounded-[3rem] mx-4 sm:mx-10 mb-20 text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(44,120,108,0.2),_transparent)] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">
            {categoryPageContent.cta_title ? (
              categoryPageContent.cta_title.split('?').length > 1 ? (
                <>
                  {categoryPageContent.cta_title.split('?')[0]}? <br />
                  <span className="text-[#f8b400] italic font-serif">{categoryPageContent.cta_title.split('?')[1]}</span>
                </>
              ) : categoryPageContent.cta_title
            ) : "Take the First Step to Better Health"}
          </h2>
          <p className="text-gray-300 text-lg mb-10 font-light px-4">
            {categoryPageContent.cta_description || "Our premium supplements are trusted by thousands worldwide. Join our community and experience the difference today."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to={categoryPageContent.cta_button_link || "/"}
              className="inline-flex items-center gap-3 bg-[#f8b400] text-[#004445] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#ffc933] transition-all shadow-xl hover:shadow-[#f8b400]/20"
            >
              {categoryPageContent.cta_button_text || "Start Your Journey"}
              <ArrowRight className="w-5 h-5" />
            </Link>
            {categoryPageContent.cta_support_text && (
              <Link
                to={categoryPageContent.cta_support_link || "/contact"}
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
              >
                {categoryPageContent.cta_support_text} →
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicCategories;
