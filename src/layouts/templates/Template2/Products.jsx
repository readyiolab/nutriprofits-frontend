import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  TrendingUp,
  Zap,
  Heart,
  ShoppingBag,
  LayoutGrid,
  ChevronRight,
  X,
  ArrowRight,
  Sparkles,
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

  // Products data imported from central data file
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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDisplayedCount(9);
  };

  // Handle product click
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


  const displayedProducts = filteredProducts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Modern Hero Section */}
        <section className="relative bg-slate-950 pt-32 pb-20 overflow-hidden rounded-b-[4rem] shadow-2xl mb-16 min-h-[60vh] flex items-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-[10s] hover:scale-110"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
          
          {/* Dynamic Glow Backgrounds */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-600/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl mb-6 transform transition-transform hover:scale-105">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold tracking-wide uppercase">Premium Wellness Collection</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tight text-white font-t2-heading drop-shadow-2xl">
                Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Vitality</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light drop-shadow-md">
                Discover science-backed supplements that deliver real results and transform your daily performance.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* SIDEBAR NAVIGATION (Desktop) */}
            <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                 <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg font-t2-heading">
                       <LayoutGrid className="w-5 h-5 text-emerald-600" />
                       Categories
                    </h3>
                 </div>
                  <nav className="p-4 flex flex-col gap-2 max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar">
                    <button
                       onClick={() => handleCategorySelect("All")}
                       className={`w-full px-4 py-3 rounded-2xl transition-all flex justify-between items-center group text-left ${
                          selectedCategory === "All"
                             ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                             : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600 border border-transparent hover:border-slate-100"
                       }`}
                    >
                       <span className="font-semibold text-sm">All Products</span>
                       {selectedCategory === "All" && <ChevronRight className="w-4 h-4" />}
                    </button>
                    {categories.map((cat) => (
                       <button
                          key={cat.name}
                          onClick={() => handleCategorySelect(cat.name)}
                          className={`w-full px-4 py-3 rounded-2xl transition-all flex justify-between items-center group text-left ${
                             selectedCategory === cat.name
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600 border border-transparent hover:border-slate-100"
                          }`}
                       >
                          <span className="font-semibold text-sm">{cat.name}</span>
                          {selectedCategory === cat.name && <ChevronRight className="w-4 h-4" />}
                       </button>
                    ))}
                 </nav>
              </div>

              {/* Stats Widget */}
              <div className="mt-6 bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                 <div className="relative z-10">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Products</p>
                    <h4 className="text-4xl font-bold font-t2-heading text-white">{products.length}</h4>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-slate-300">
                       <Sparkles className="w-4 h-4 text-emerald-600" />
                       Premium Quality Guaranteed
                    </div>
                 </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 w-full" ref={productsRef} style={{ scrollMarginTop: '120px' }}>
              
              {/* MOBILE CATEGORY BAR (Horizontal) */}
              <div className="lg:hidden mb-8">
                 <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    <button
                       onClick={() => handleCategorySelect("All")}
                       className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                          selectedCategory === "All"
                             ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                             : "bg-white text-slate-600 border border-slate-200"
                       }`}
                    >
                       All Products
                    </button>
                    {categories.map((cat) => (
                       <button
                          key={cat.name}
                          onClick={() => handleCategorySelect(cat.name)}
                          className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                             selectedCategory === cat.name
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                : "bg-white text-slate-600 border border-slate-200"
                          }`}
                       >
                          {cat.name}
                       </button>
                    ))}
                 </div>
              </div>
            
              {/* Filter Bar */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl p-4 md:p-6 mb-8 border border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="md:col-span-2 relative transform hover:scale-[1.01] transition-transform duration-300">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 
                rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-inner outline-none transition-all text-sm md:text-base"
                    />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-inner outline-none transition-all text-sm md:text-base cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 justify-between">
                  <div className="text-sm font-medium text-slate-500">
                    Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span> results
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2.5 rounded-xl transition-all ${
                        viewMode === "grid"
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105"
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2.5 rounded-xl transition-all ${
                        viewMode === "list"
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105"
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ─── MAIN GRID ─── */}
               <div className={`grid grid-cols-1 ${viewMode === 'list' ? 'cols-1' : 'sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'} gap-6`}>
                  {displayedProducts.map((product) => {
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className={`group bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-500 cursor-pointer transform hover:-translate-y-1 flex ${viewMode === 'list' ? 'flex-row items-center' : 'flex-col'}`}
                      >
                        <div className={`relative overflow-hidden flex items-center justify-center p-6 bg-slate-50/50 ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-[4/3] w-full'}`}>
                          <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-sm"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80"; }}
                          />
                          {/* Floating Badge */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-bold text-emerald-600 px-4 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                             View Details
                          </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-1">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-hover:text-teal-600 transition-colors">
                             {product.category || "Collection"}
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 mb-3 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2 font-t2-heading">
                            {product.name}
                          </h3>
                          <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
                            {product.description}
                          </p>
                          
                           <button className="w-full py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-bold group-hover:bg-slate-900 group-hover:border-emerald-600 group-hover:text-white group-hover:shadow-lg shadow-slate-900/20 transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                              Learn More <ArrowRight className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setDisplayedCount((prev) => prev + 10)}
                    className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 bg-slate-900 rounded-[2rem] hover:bg-emerald-600 shadow-2xl shadow-slate-900/10 hover:shadow-emerald-500/20 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Grid className="w-5 h-5 mr-3" />
                    <span className="text-xs uppercase tracking-widest">Load More Products</span>
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-16 text-center max-w-2xl mx-auto mt-8">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 font-t2-heading">No products found</h3>
                  <p className="text-slate-500 text-lg">
                    Try adjusting your search query or select another category to see results.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="mt-6 text-emerald-600 font-semibold hover:text-third transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              )}
              
            </div>
          </div>
        </div>

        {/* Dynamic CTA Section */}
        <section className="container mx-auto px-4 mb-20 mt-12">
          <div className="relative rounded-[2.5rem] overflow-hidden max-w-5xl mx-auto">
            {/* CTA Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 z-0"></div>
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 px-6 py-20 sm:py-24 text-center border border-white/10 rounded-[2.5rem] bg-white/5 backdrop-blur-sm">
              <h3 className="text-3xl sm:text-5xl font-bold mb-6 text-white tracking-tight font-t2-heading drop-shadow-md">
                Ready to Start Your Transformation?
              </h3>
              
              <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                Join thousands who trust our products
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setDisplayedCount((prev) => prev + 10)}
                  className="bg-white text-slate-900 font-bold px-10 py-5 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 text-lg flex items-center gap-3 transform hover:-translate-y-1"
                >
                  <ShoppingBag className="w-6 h-6" />
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2Products;
