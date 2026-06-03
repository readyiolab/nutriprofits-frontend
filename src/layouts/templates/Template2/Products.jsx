import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Search,
  ChevronRight,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Grid,
  List,
  Check,
} from "lucide-react";
import { generateSlug } from "../../../utils/slug";
import { products } from "../../../data/products";

const Template2Products = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [displayedCount, setDisplayedCount] = useState(9);
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
        setDisplayedCount(9);
      }
    }
  }, [location.search]);

  // Extract unique categories with counts
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
    setDisplayedCount(9);
    setSearchQuery("");
    
    // Smooth scroll to products section
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDisplayedCount(9);
  };

  const handleProductClick = (product) => {
    navigate(`/template/${templateId}/products/${product.id}`);
  };

  // Filter and sort products
  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || (product.category || "").trim() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  const displayedProducts = filteredProducts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-6">
        {/* PREMIUM ENTERPRISE DARK CONTRAST HERO */}
        <section className="relative bg-gradient-to-br from-[#064e3b] via-[#043e2f] to-[#022e22] text-white pt-28 pb-20 overflow-hidden border-b border-[#064e3b]/80 shadow-md min-h-[55vh] flex items-center">
          {/* Subtle background overlay image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#043e2f]/90 via-[#043e2f]/50 to-transparent"></div>
          
          <div className="container mx-auto px-6 relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column - Product info */}
              <div className="lg:col-span-7 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 mb-6 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold tracking-wider uppercase">Science-Backed Wellness</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white font-t2-heading leading-tight">
                  Premium Wellness for <span className="text-emerald-400 font-normal italic">Peak Performance</span>
                </h1>
                
                <p className="text-base text-emerald-100/80 font-light leading-relaxed mb-8 max-w-xl">
                  Discover our curated range of clean, high-potency supplements engineered to elevate your daily energy, focus, and overall vitality. Crafted with verified premium ingredients.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <button 
                    onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer transform hover:-translate-y-0.5"
                  >
                    Explore Catalog <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust Badges Checkbox list */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10 pt-8 border-t border-white/15 text-xs text-emerald-200/80">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="font-semibold uppercase tracking-wider">GMP Certified Facility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="font-semibold uppercase tracking-wider">3rd Party Lab Tested</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="font-semibold uppercase tracking-wider">100% Pure & Organic</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Premium image overlay */}
              <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative">
                <div className="relative w-full max-w-[400px] aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl p-2 bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-sm">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
                    alt="Premium Wellness Visual"
                    className="w-full h-full object-cover rounded-[1.8rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#043e2f]/50 to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#043e2f]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold font-t2-heading">Formulated by Experts</p>
                      <p className="text-emerald-300 text-[10px] uppercase tracking-wider font-semibold">Quality Guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* SIDEBAR NAVIGATION (Desktop) */}
            <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base font-t2-heading">
                    <LayoutGrid className="w-4 h-4 text-emerald-600" />
                    Categories
                  </h3>
                </div>
                <nav className="p-3 flex flex-col gap-1 max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar">
                  <button
                    onClick={() => handleCategorySelect("All")}
                    className={`w-full px-4 py-2.5 rounded-xl transition-all flex justify-between items-center text-left ${
                      selectedCategory === "All"
                        ? "bg-emerald-600 text-white shadow-sm font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                    }`}
                  >
                    <span className="text-sm">All Products</span>
                    {selectedCategory === "All" && <ChevronRight className="w-4 h-4" />}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`w-full px-4 py-2.5 rounded-xl transition-all flex justify-between items-center text-left ${
                        selectedCategory === cat.name
                          ? "bg-emerald-600 text-white shadow-sm font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                      }`}
                    >
                      <span className="text-sm">{cat.name}</span>
                      {selectedCategory === cat.name && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Stats Widget */}
              <div className="mt-5 bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -mr-12 -mt-12"></div>
                <div className="relative z-10">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Catalog Size</p>
                  <h4 className="text-3xl font-bold font-t2-heading text-white">{products.length} Products</h4>
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    Premium Quality Guaranteed
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 w-full" ref={productsRef} style={{ scrollMarginTop: '120px' }}>
              {/* MOBILE CATEGORY BAR (Horizontal) */}
              <div className="lg:hidden mb-6">
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                  <button
                    onClick={() => handleCategorySelect("All")}
                    className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      selectedCategory === "All"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                        selectedCategory === cat.name
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            
              {/* Filter Bar */}
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                    />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm cursor-pointer text-slate-700"
                  >
                    <option value="featured">Featured</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 justify-between">
                  <div className="text-xs font-medium text-slate-500">
                    Showing <span className="text-slate-800 font-bold">{filteredProducts.length}</span> results
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-500 border border-slate-200"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-500 border border-slate-200"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* PRODUCT GRID */}
              <div className={`grid grid-cols-1 ${viewMode === 'list' ? 'gap-4' : 'sm:grid-cols-2 xl:grid-cols-3'} gap-6`}>
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-500/10 transition-all duration-300 cursor-pointer flex ${viewMode === 'list' ? 'flex-row items-center p-4 gap-4' : 'flex-col'}`}
                  >
                    <div className={`relative overflow-hidden flex items-center justify-center p-4 bg-slate-50/50 ${viewMode === 'list' ? 'w-36 h-36 rounded-xl flex-shrink-0' : 'aspect-square w-full'}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Product"; }}
                      />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-bold text-emerald-600 px-2.5 py-1 rounded-full border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Product
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        {product.category || "Collection"}
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2 font-t2-heading">
                        {product.name}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      
                      <button className="w-full py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white transition-all flex items-center justify-center gap-1.5">
                        View Product <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setDisplayedCount((prev) => prev + 9)}
                    className="bg-slate-900 text-white text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
                  >
                    Load More Products
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-lg mx-auto mt-6 shadow-sm">
                  <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-1 font-t2-heading">No products found</h3>
                  <p className="text-slate-500 text-sm">
                    Try adjusting your keywords or selecting another category.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="mt-4 text-emerald-600 text-sm font-semibold hover:text-emerald-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PREMIUM ENTERPRISE LIGHT CTA SECTION */}
        <section className="container mx-auto px-6 mb-20 mt-10 max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 border border-emerald-100/50 p-12 md:p-16 text-center shadow-sm">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900 tracking-tight font-t2-heading">
              Ready to Upgrade Your Well-Being?
            </h3>
            
            <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto font-light leading-relaxed">
              Explore our laboratory-tested formulations today and experience real, tangible improvements in your energy and health metrics.
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-emerald-700 transition-all flex items-center gap-2 text-sm shadow-md shadow-emerald-600/10 transform hover:-translate-y-0.5"
              >
                Start Exploring Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2Products;
