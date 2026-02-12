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
import { useNavigate, useParams } from "react-router-dom";
import { generateSlug } from "../../../utils/slug";

const Template1Categories = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: 1, name: "Longevity", description: "Premium anti-aging and vital lifespan support", image: "/assets/categories_icon/Longevity.png", icon: TrendingUp },
    { id: 2, name: "Urinary Tract", description: "Comprehensive urinary system health", image: "/assets/categories_icon/Urinary%20Tract%20Support.png", icon: Droplets },
    { id: 3, name: "Appetite Control", description: "Natural hunger management solutions", image: "/assets/categories_icon/Weight%20Loss.png", icon: Apple },
    { id: 4, name: "Joint Health", description: "Advanced flexibility and joint support", image: "/assets/categories_icon/Joint%20Health.png", icon: Activity },
    { id: 5, name: "Eye Wellness", description: "Premium vision support formulations", image: "/assets/categories_icon/Eye%20Health.png", icon: Eye },
    { id: 6, name: "Weight Loss", description: "Effective healthy weight management", image: "/assets/categories_icon/Weight%20Loss.png", icon: Flame },
    { id: 7, name: "Prenatal Care", description: "Essential vitamins for mother and baby", image: "/assets/categories_icon/Prenatal%20Care.png", icon: Heart },
    { id: 8, name: "Prostate Support", description: "Specialized male health formulations", image: "/assets/categories_icon/Prostate.png", icon: Shield },
    { id: 9, name: "Hair Vitality", description: "Nourishing solutions for hair strength", image: "/assets/categories_icon/Hair%20Loss.png", icon: Sparkles },
    { id: 10, name: "Blood Sugar", description: "Natural support for glucose balance", image: "/assets/categories_icon/Blood%20Sugar.png", icon: TrendingUp },
    { id: 11, name: "Oral Health", description: "Complete care for fresh breath", image: "/assets/categories_icon/Fresh%20Breath.png", icon: Wind },
    { id: 12, name: "Heart Health", description: "Vital cardiovascular support supplements", image: "/assets/categories_icon/Cholesterol.png", icon: Heart },
    { id: 13, name: "Menopause", description: "Natural relief for hormonal transition", image: "/assets/categories_icon/Menopause.png", icon: Sun },
    { id: 14, name: "Body Wellness", description: "Premium enhancement & vitality support", image: "/assets/categories_icon/Breast%20Enhancement.png", icon: Sparkles },
    { id: 15, name: "Immune System", description: "Foundational defense & immune support", image: "/assets/categories_icon/Immunity.png", icon: Shield },
    { id: 16, name: "Stress Relief", description: "Calming support for mental wellness", image: "/assets/categories_icon/Stress.png", icon: Moon },
    { id: 17, name: "Vitality", description: "Natural energy and performance boost", image: "/assets/categories_icon/Male%20Enhancement.png", icon: Zap },
    { id: 18, name: "Muscle Build", description: "Premium strength training support", image: "/assets/categories_icon/Bodybuilding.png", icon: Dumbbell },
    { id: 19, name: "Clear Skin", description: "Nourishing care for skin clarity", image: "/assets/categories_icon/Acne.png", icon: Pill },
    { id: 20, name: "Cognitive Focus", description: "Brain health & mental optimization", image: "/assets/categories_icon/Nootropics.png", icon: Brain },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ── CLEAN HERO SECTION ── */}
      <section className="relative pt-20 pb-16 px-4 bg-[#faf9f6] overflow-hidden">
        {/* Subtle Decorative Leaves/Patterns logic could go here */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2c786c]/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#f8b400]/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#2c786c]/10 border border-[#2c786c]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#2c786c]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#2c786c] uppercase">Our Collection</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-medium text-[#004445] mb-6 tracking-tight leading-[1.1]">
            Scientifically Formulated <br />
            <span className="text-[#2c786c] italic font-serif">Health Solutions</span>
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Explore our curated selection of premium supplements designed to support your specific wellness journey with purity and precision.
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
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/template/${templateId}/products?category=${generateSlug(category.name)}`)}
              className="group cursor-pointer"
            >
              <div className="relative bg-[#fcfcfc] rounded-[2.5rem] p-8 border border-gray-50 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_50px_rgba(44,120,108,0.08)] hover:-translate-y-2 flex flex-col items-center">
                {/* Image Container - Floating style */}
                <div className="w-full aspect-square relative mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="relative w-4/5 h-4/5 object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="text-center w-full">
                  <h3 className="text-xl font-semibold text-[#004445] mb-3 group-hover:text-[#2c786c] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-2 px-2">
                    {category.description}
                  </p>
                </div>

                {/* Action Arrow */}
                <div className="absolute bottom-6 right-8 w-10 h-10 rounded-full bg-[#f8b400]/10 border border-[#f8b400]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                  <ArrowRight className="w-4 h-4 text-[#004445]" />
                </div>
              </div>
            </div>
          ))}
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
        
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">
            Take the First Step to <br />
            <span className="text-[#f8b400] italic font-serif">Better Health</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 font-light px-4">
            Our premium supplements are trusted by thousands worldwide. Join our community and experience the difference today.
          </p>
          <button 
            onClick={() => navigate(`/template/${templateId}/products`)}
            className="inline-flex items-center gap-3 bg-[#f8b400] text-[#004445] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#ffc933] transition-all shadow-xl hover:shadow-[#f8b400]/20"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Template1Categories;