import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Search, Star, ChevronDown, Heart, LayoutGrid, ChevronRight, X } from "lucide-react";
import { generateSlug } from "../../../utils/slug";
import { products } from "../../../data/products";

const Template3Products = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayedCount, setDisplayedCount] = useState(12);
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
  const productsRef = useRef(null);

  // Read ?category= slug from URL when navigating from Categories page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catSlug = params.get("category");
    if (catSlug) {
      const allCats = [...new Set(products.map((p) => (p.category || "").trim()).filter(Boolean))];
      const matched = allCats.find((c) => generateSlug(c) === catSlug);
      if (matched) {
        setSelectedCategory(matched);
        setDisplayedCount(12);
      }
    }
  }, [location.search]);

  // Dynamic page content
  const pageContent = {
    hero_title: "BIO-ACTIVE SUPPLEMENT DATABASE",
    hero_subtitle: "Clinical Purity // Verified Potency",
    hero_description: "Access our premium database of molecularly optimized health formulations, engineered to support cellular longevity and physical performance.",
    hero_button_text: "EXPLORE FORMULATIONS",
    hero_image_url: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=1200&h=600&fit=crop",
    section_title: "Active Supplement Catalog",
    section_description: "Filter and deploy premium pharmacy-grade supplement modules",
    cta_title: "Deploy Purity Protocols?",
    cta_description: "Join thousands of wellness users optimizing their bio-stats",
    cta_button_text: "START PROTOCOL",
  };

  const categories = useMemo(() => {
    const catMap = {};
    products.forEach((p) => {
      const cat = (p.category || "").trim();
      if (cat) catMap[cat] = (catMap[cat] || 0) + 1;
    });
    return Object.entries(catMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    setDisplayedCount(12);
    setSearchQuery("");
    
    // Smooth scroll to products section
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || (product.category || "").trim() === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const totalFiltered = filteredProducts.length;
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayedCount);
  }, [filteredProducts, displayedCount]);

  const hasMoreProducts = displayedCount < totalFiltered;

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const RatingStars = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-[#3a4750] ml-1">({rating})</span>
    </div>
  );

  // Grid View Card
  const GridCard = ({ product }) => (
    <div 
      onClick={() => navigate(`/template/${templateId}/products/${product.id}`)}
      className="group cursor-pointer h-full flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#d72323]/30"
    >
      <div className="relative overflow-hidden aspect-square p-4 flex items-center justify-center bg-slate-50/30">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
        />
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <span className="text-[8px] sm:text-[10px] font-bold text-[#d72323] uppercase tracking-widest mb-1 sm:mb-1.5">
          {product.category}
        </span>
        <h3 className="font-semibold text-xs sm:text-sm text-[#303841] line-clamp-1 mb-1 sm:mb-1.5 group-hover:text-[#d72323] transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-2 mb-2 sm:mb-3 flex-1 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );

  // List View Card
  const ListCard = ({ product }) => (
    <div 
      onClick={() => navigate(`/template/${templateId}/products/${product.id}`)}
      className="flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 bg-white rounded-2xl hover:shadow-lg transition-all cursor-pointer group border border-gray-100 hover:border-[#d72323]/30"
    >
      <div className="relative overflow-hidden rounded-xl w-full sm:w-40 h-40 flex-shrink-0 p-4 flex items-center justify-center bg-slate-50/30">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <span className="text-[10px] font-bold text-[#d72323] uppercase tracking-widest">
            {product.category}
          </span>
          <h3 className="text-base font-semibold text-[#303841] mb-1.5 group-hover:text-[#d72323] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#eeeeee] min-h-screen font-mono">
      {/* HERO SECTION - HIGH-TECH APOTHECARY CONSOLE */}
      <div className="relative min-h-[550px] lg:h-[650px] flex items-center mb-12 sm:mb-16 overflow-hidden border-b-[8px] border-[#d72323] py-16 lg:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[15s]"
          style={{ backgroundImage: `url('${pageContent.hero_image_url}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1214] via-[#0f1214]/90 to-[#0f1214]/40" />
        
        {/* Edgy accent elements */}
        <div className="absolute top-0 left-12 w-[1px] h-full bg-white/5 z-0"></div>
        <div className="absolute top-0 left-24 w-[1px] h-full bg-white/5 z-0"></div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Console Panel */}
              <div className="lg:col-span-7 bg-gradient-to-br from-[#0f1214]/95 to-[#1c2227]/90 backdrop-blur-md p-6 sm:p-12 border-l-[6px] border-[#d72323] shadow-2xl relative">
                {/* Tech corner accents */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#d72323] opacity-55"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#d72323] opacity-55"></div>
                
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#d72323] mb-4">
                  <span className="w-8 h-[2px] bg-[#d72323]"></span>
                  {pageContent.hero_subtitle}
                </span>
                
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 leading-none font-t3-heading text-white tracking-tight uppercase">
                  {pageContent.hero_title}
                </h1>
                
                <p className="text-sm sm:text-base mb-8 text-gray-400 font-mono leading-relaxed max-w-xl border-l border-gray-700 pl-4">
                  {pageContent.hero_description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="px-8 py-4 bg-[#d72323] text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#303841] transition-all transform shadow-[5px_5px_0_0_#303841] hover:shadow-[2px_2px_0_0_#303841] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-mono"
                  >
                    {pageContent.hero_button_text}
                  </button>
                </div>
              </div>

              {/* Right Column: Lab Diagnostics Console */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="bg-[#0f1214]/90 backdrop-blur-md border border-gray-800 p-6 rounded-sm shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#d72323]/5 rounded-full blur-2xl"></div>
                  
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-4 font-mono text-[10px] text-gray-500">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      SYSTEM_DIAGNOSTICS_V1.1
                    </span>
                    <span>SECURE_OUTLET</span>
                  </div>

                  {/* Tech Readout stats */}
                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>POTENCY_INDEX</span>
                        <span className="text-[#00adb5]">99.8% PASS</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1.5 rounded-none overflow-hidden">
                        <div className="bg-[#d72323] h-full" style={{ width: '99.8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-gray-400 mb-1">
                        <span>ORGANIC_BIO_MATCH</span>
                        <span className="text-[#00adb5]">100% OK</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1.5 rounded-none overflow-hidden">
                        <div className="bg-[#00adb5] h-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-800 space-y-2 text-gray-400 text-[11px]">
                      <div className="flex justify-between"><span>GMP_CERTIFICATION:</span> <span className="text-white font-bold">VERIFIED_FDA</span></div>
                      <div className="flex justify-between"><span>ACTIVE_COMPOUNDS:</span> <span className="text-white font-bold">NATURAL_EXCLUSIVES</span></div>
                      <div className="flex justify-between"><span>DISTRIBUTION:</span> <span className="text-white font-bold">WORLDWIDE_EXPRESS</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* HEADER */}
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#303841] mb-3">
            {selectedCategory !== "all"
              ? `${selectedCategory} Products`
              : pageContent.section_title}
          </h2>
          <p className="text-base sm:text-lg text-[#3a4750] max-w-2xl mx-auto">
            {pageContent.section_description}
          </p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col gap-4 mb-6">
            {/* Search & Sort Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3a4750] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#d72323] focus:outline-none transition-all bg-white text-[#303841]"
                />
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1 sm:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#d72323] focus:outline-none appearance-none bg-white text-[#303841] font-medium"
                  >
                    <option value="featured">Featured</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#3a4750] pointer-events-none" />
                </div>

                <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-3 transition-all font-medium ${
                      viewMode === "grid"
                        ? "bg-[#303841] text-white"
                        : "text-[#3a4750] hover:bg-gray-50"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-3 transition-all font-medium border-l-2 border-gray-200 ${
                      viewMode === "list"
                        ? "bg-[#303841] text-white"
                        : "text-[#3a4750] hover:bg-gray-50"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE CATEGORY BAR */}
        {categories.length > 0 && (
          <div className="lg:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => handleCategorySelect("all")}
                className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border-2 ${
                  selectedCategory === "all"
                    ? "bg-[#d72323] text-white border-[#d72323] shadow-lg shadow-[#d72323]/20"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#d72323] hover:text-[#d72323]"
                }`}
              >
                // ALL
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border-2 ${
                    selectedCategory === cat.name
                      ? "bg-[#d72323] text-white border-[#d72323] shadow-lg shadow-[#d72323]/20"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#d72323] hover:text-[#d72323]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ SIDEBAR + PRODUCTS LAYOUT ═══ */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── STICKY CATEGORY SIDEBAR (desktop only) ── */}
          {categories.length > 0 && (
            <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div>
                {/* Modern / Lighter High-Tech Sidebar */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="relative px-6 py-5 border-b border-gray-100 bg-[#f8fafc]">
                    <div className="absolute left-0 top-0 w-1.5 h-full bg-[#d72323]"></div>
                    <h3 className="text-[#303841] font-bold text-lg flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-center">
                        <LayoutGrid className="w-5 h-5 text-[#d72323]" />
                      </div>
                      Categories
                    </h3>
                    <p className="text-gray-400 text-[10px] font-mono mt-1.5 uppercase tracking-[0.2em]">{categories.length} MODULES_LOADED</p>
                  </div>

                  {/* Category List */}
                  <nav className="p-3 max-h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar">
                    <button
                      onClick={() => handleCategorySelect("all")}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 mb-1 relative border ${
                        selectedCategory === "all"
                          ? "bg-[#f8fafc] text-[#d72323] border-[#d72323]/20 shadow-sm"
                          : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-[#303841]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${selectedCategory === "all" ? "bg-[#d72323] shadow-[0_0_8px_rgba(215,35,35,0.4)]" : "bg-gray-200"}`}></span>
                        ALL_STOCKS
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        selectedCategory === "all" ? "bg-[#d72323] text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {products.length}
                      </span>
                    </button>

                    <div className="h-px bg-gray-100 my-2 mx-4"></div>

                    {categories.map((cat) => {
                      const isActive = selectedCategory === cat.name;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => handleCategorySelect(cat.name)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 mb-0.5 group relative border ${
                            isActive
                              ? "bg-[#f8fafc] text-[#d72323] border-[#d72323]/20 shadow-sm"
                              : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-[#303841]"
                          }`}
                        >
                          <span className="flex items-center gap-3 truncate">
                             <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? "rotate-90 text-[#d72323]" : "text-gray-300 group-hover:text-[#d72323]"}`} />
                             <span className="truncate tracking-tight">{cat.name}</span>
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-all ${
                            isActive ? "bg-[#d72323] text-white" : "bg-gray-100 text-gray-400 group-hover:text-gray-600"
                          }`}>
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>
          )}

          {/* ── MAIN PRODUCT AREA ── */}
          <div className="flex-1 min-w-0" ref={productsRef} style={{ scrollMarginTop: '120px' }}>
            {/* Active category indicator */}
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-3 mb-6 bg-white rounded-xl px-5 py-3.5 shadow-sm border border-gray-100">
                <span className="text-sm text-[#3a4750]">
                  Showing <strong className="text-[#303841]">{totalFiltered}</strong> product{totalFiltered !== 1 ? "s" : ""} in
                </span>
                <span className="bg-[#303841] text-white text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center gap-2 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d72323]"></span>
                  {selectedCategory}
                  <button onClick={() => handleCategorySelect("all")} className="hover:bg-white/20 rounded-full p-0.5 ml-0.5 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>
            )}

            {/* PRODUCTS */}
            {displayedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-[#303841] mb-2">
                  No products found
                </h3>
                <p className="text-[#3a4750]">
                  {selectedCategory !== "all"
                    ? `No products found in ${selectedCategory}.`
                    : "Try adjusting your search or filters"}
                </p>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className={`grid grid-cols-2 sm:grid-cols-2 ${categories.length > 0 ? "xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"} gap-4 sm:gap-6 mb-12`}>
                    {displayedProducts.map((product) => (
                      <GridCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 mb-12">
                    {displayedProducts.map((product) => (
                      <ListCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* LOAD MORE */}
                {hasMoreProducts && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setDisplayedCount((prev) => prev + 12)}
                      className="px-10 py-4 bg-white border-2 border-[#303841] text-[#303841] font-semibold rounded-full hover:bg-[#303841] hover:text-white transition-all duration-300 transform shadow-md"
                    >
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      {filteredProducts.length > 0 && (
        <div className="bg-gradient-to-br from-[#303841] via-[#3a4750] to-[#303841] text-white py-16 mb-8 mx-4 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              {pageContent.cta_title}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {pageContent.cta_description}
            </p>
            <button className="px-8 py-4 bg-[#d72323] text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all transform shadow-lg">
              {pageContent.cta_button_text}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template3Products;