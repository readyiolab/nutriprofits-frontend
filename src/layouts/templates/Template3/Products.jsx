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

  // Dummy products array (you can replace this with your actual products)
  // Products data imported from central data file

  // Dynamic page content (will come from database)
  const pageContent = {
    hero_title: "Discover Our Products",
    hero_subtitle: "Premium Quality",
    hero_description: "Explore our wide range of high-quality products designed to meet your needs",
    hero_button_text: "Shop Now",
    hero_image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    section_title: "Our Product Collection",
    section_description: "Browse through our carefully curated selection",
    cta_title: "Ready to Shop?",
    cta_description: "Join thousands of satisfied customers today",
    cta_button_text: "Start Shopping",
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

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || (product.category || "").trim() === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .slice(0, displayedCount);

  const totalFiltered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || (product.category || "").trim() === selectedCategory;
    return matchesSearch && matchesCategory;
  }).length;

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
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <span className="text-[10px] font-bold text-[#d72323] uppercase tracking-widest mb-1.5">
          {product.category}
        </span>
        <h3 className="font-semibold text-sm text-[#303841] line-clamp-2 mb-1.5 group-hover:text-[#d72323] transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3 flex-1 leading-relaxed">
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
      <div className="relative overflow-hidden rounded-xl w-full sm:w-40 h-40 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
    <div className="bg-[#eeeeee] min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[400px] sm:h-[500px] mb-12 sm:mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pageContent.hero_image_url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1214]/80 to-[#0f1214]/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
            <div className="max-w-2xl">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider bg-[#d72323] px-4 py-1 rounded-full mb-4">
                {pageContent.hero_subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 leading-tight">
                {pageContent.hero_title}
              </h1>
              <p className="text-lg sm:text-xl mb-6 text-white/90">
                {pageContent.hero_description}
              </p>
              <button className="px-8 py-4 bg-[#d72323] text-white font-semibold rounded-full hover:bg-[#303841] transition-all transform hover:scale-105 shadow-lg">
                {pageContent.hero_button_text}
              </button>
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
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#d72323] focus:outline-none bg-white cursor-pointer pr-10 text-[#303841]"
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
                  className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? "bg-[#d72323] text-white shadow-lg shadow-[#d72323]/20"
                      : "bg-white text-[#303841] border border-gray-200 hover:border-[#d72323] hover:text-[#d72323]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ SIDEBAR + PRODUCTS LAYOUT ═══ */}
        <div className="flex gap-8">

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
        {filteredProducts.length === 0 ? (
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
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${categories.length > 0 ? "xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"} gap-4 sm:gap-6 mb-12`}>
                {filteredProducts.map((product) => (
                  <GridCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-12">
                {filteredProducts.map((product) => (
                  <ListCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* LOAD MORE */}
            {hasMoreProducts && (
              <div className="flex justify-center">
                <button
                  onClick={() => setDisplayedCount((prev) => prev + 12)}
                  className="px-10 py-4 bg-white border-2 border-[#303841] text-[#303841] font-semibold rounded-full hover:bg-[#303841] hover:text-white transition-all duration-300 transform  shadow-md"
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
            <button className="px-8 py-4 bg-[#d72323] text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all transform  shadow-lg">
              {pageContent.cta_button_text}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template3Products;