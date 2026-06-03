import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Search, ArrowRight, LayoutGrid, ChevronRight, Sparkles, Check } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { getProductSlug, getCategorySlug, findCategoryBySlug } from "../../../utils/slug";

const DynamicProducts = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const backofficeData = useBackofficeData();

  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCount, setDisplayedCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerBatch = 9;
  const productsRef = useRef(null);

  // Smooth scroll when category changes
  useEffect(() => {
    if (productsRef.current) {
      setTimeout(() => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [categorySlug]);

  const allProducts = backofficeData?.backofficeProducts || [];
  const categories = backofficeData?.backofficeCategories || [];
  const productPageContent = backofficeData?.productPageContent || {};

  // Find active category if browsing by category
  const activeCategory = categorySlug
    ? findCategoryBySlug(categories, categorySlug)
    : null;

  // Filter products by category if a category slug is in URL
  const categoryFilteredProducts = activeCategory
    ? allProducts.filter((p) => p.category_id === activeCategory.id)
    : allProducts;

  // Filter by search query
  const filteredProducts = categoryFilteredProducts.filter((product) => {
    const name = (product.product_name || "").toLowerCase();
    const desc = (product.product_description || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || desc.includes(query);
  });

  const displayedProducts = filteredProducts.slice(0, displayedCount);
  const hasMoreProducts = displayedCount < filteredProducts.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + productsPerBatch);
      setIsLoading(false);
    }, 400);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDisplayedCount(9);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body">
      {/* PREMIUM ENTERPRISE DARK CONTRAST HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#043e2f] to-[#022e22] text-white min-h-[55vh] flex items-center border-b border-[#064e3b]/80 shadow-md pt-24 pb-20">
        {/* Subtle background overlay image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url('${productPageContent.hero_image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80'}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#043e2f]/90 via-[#043e2f]/50 to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Product info */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {productPageContent.hero_badge || "Premium Collection"}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white font-t2-heading leading-tight">
                {activeCategory
                  ? activeCategory.category_name
                  : productPageContent.hero_title || "Wellness Redefined"}
              </h1>
              <p className="text-base text-emerald-100/80 font-light leading-relaxed mb-8 max-w-xl">
                 {activeCategory
                  ? activeCategory.category_description || `Explore our exclusive ${activeCategory.category_name} collection.`
                  : productPageContent.hero_description || "Experience the perfect balance of nature and science with our premium supplements."}
              </p>

              {/* Trust Badges Checkbox list */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/15 text-xs text-emerald-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="font-semibold uppercase tracking-wider">GMP Certified Facility</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#064e3b] bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="font-semibold uppercase tracking-wider">3rd Party Lab Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#064e3b] bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="font-semibold uppercase tracking-wider">Pure & Organic Standard</span>
                </div>
              </div>
            </div>

            {/* Right Column - Premium image overlay */}
            <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-[400px] aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl p-2 bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-sm">
                <img
                  src={productPageContent.hero_image_url || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"}
                  alt="Premium Collection visual"
                  className="w-full h-full object-cover rounded-[1.8rem]"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80";
                  }}
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
      </div>

      <div className="container mx-auto px-6 py-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
               <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base font-t2-heading">
                     <LayoutGrid className="w-4 h-4 text-emerald-600" />
                     Collections
                  </h3>
               </div>
                <nav className="p-3 flex flex-col gap-1 max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar">
                  <Link
                     to="/"
                     className={`px-4 py-2.5 rounded-xl transition-all flex justify-between items-center ${
                        !categorySlug
                           ? "bg-emerald-600 text-white shadow-sm font-semibold"
                           : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                     }`}
                  >
                     <span className="text-sm">All Products</span>
                     {!categorySlug && <ChevronRight className="w-4 h-4" />}
                  </Link>
                  {categories.map((cat) => (
                     <Link
                        key={cat.id}
                        to={`/categories/${getCategorySlug(cat)}`}
                        className={`px-4 py-2.5 rounded-xl transition-all flex justify-between items-center ${
                           categorySlug === getCategorySlug(cat)
                              ? "bg-emerald-600 text-white shadow-sm font-semibold"
                              : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                        }`}
                     >
                        <span className="text-sm">{cat.category_name}</span>
                        {categorySlug === getCategorySlug(cat) && <ChevronRight className="w-4 h-4" />}
                     </Link>
                  ))}
               </nav>
            </div>

            {/* Stats Widget */}
            <div className="mt-5 bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden shadow-md">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -mr-12 -mt-12"></div>
               <div className="relative z-10">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Catalog Size</p>
                  <h4 className="text-3xl font-bold font-t2-heading text-white">{allProducts.length} Products</h4>
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
                  <Link
                     to="/"
                     className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                        !categorySlug
                           ? "bg-emerald-600 text-white shadow-sm"
                           : "bg-white text-slate-600 border border-slate-200"
                     }`}
                  >
                     All Products
                  </Link>
                  {categories.map((cat) => (
                     <Link
                        key={cat.id}
                        to={`/categories/${getCategorySlug(cat)}`}
                        className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                           categorySlug === getCategorySlug(cat)
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-white text-slate-600 border border-slate-200"
                        }`}
                     >
                        {cat.category_name}
                     </Link>
                  ))}
               </div>
            </div>

            {/* SEARCH BAR */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-slate-100 flex items-center gap-3">
               <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Search className="w-4 h-4" />
               </div>
               <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 text-sm outline-none"
               />
               <div className="hidden sm:block px-4 py-2 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 border border-slate-100">
                  {filteredProducts.length} Results
               </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => {
                    const slug = getProductSlug(product);
                    const productLink = activeCategory
                      ? `/categories/${getCategorySlug(activeCategory)}/${slug}`
                      : `/products/${slug}`;
                      
                    return (
                      <div
                        key={product.id}
                        onClick={() => navigate(productLink)}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-500/10 transition-all duration-300 border border-slate-100 cursor-pointer flex flex-col h-full"
                      >
                        <div className="relative aspect-square overflow-hidden flex items-center justify-center p-6 bg-slate-50/50 border-b border-slate-100/50">
                          <img
                            src={product.product_image}
                            alt={product.product_name}
                            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Product"; }}
                          />
                          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-bold text-emerald-600 px-2.5 py-1 rounded-full border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                             View Details
                          </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-1">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                             {categories.find(c => c.id === product.category_id)?.category_name || "Collection"}
                          </div>
                          <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2 font-t2-heading">
                            {product.product_name}
                          </h3>
                          <p className="text-slate-500 text-xs line-clamp-2 mb-4">
                            {product.product_description}
                          </p>
                          
                           <button className="w-full py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white transition-all flex items-center justify-center gap-1.5 mt-auto">
                            Learn More <ArrowRight className="w-3.5 h-3.5" />
                           </button>
                        </div>
                      </div>
                    );
                  })}
               </div>
            ) : (
               <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-lg mx-auto">
                  <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                  <p className="text-lg text-slate-800 font-bold font-t2-heading">No products found</p>
                  <p className="text-slate-500 text-sm mt-1">Try refining your keyword or category filter.</p>
                  <button onClick={() => {setSearchQuery(""); navigate("/");}} className="mt-4 text-emerald-600 font-semibold text-sm hover:text-emerald-700">Clear Search</button>
               </div>
            )}

            {/* Load More */}
            {hasMoreProducts && (
               <div className="flex justify-center mt-10">
                 <button onClick={handleLoadMore} disabled={isLoading} className="bg-slate-900 text-white text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded-lg hover:bg-emerald-600 transition-colors shadow-sm">
                    {isLoading ? "Loading..." : "Load More Products"}
                 </button>
               </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProducts;
