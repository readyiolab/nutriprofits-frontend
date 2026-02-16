import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Search, ArrowRight, LayoutGrid, ChevronRight, X, Sparkles } from "lucide-react";
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
    }, 500);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDisplayedCount(9);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* MODERN HERO SECTION (Glass/Gradient) */}
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] min-h-[50vh] md:min-h-[60vh] text-white flex items-center justify-center">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>

        <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              {productPageContent.hero_badge || "Premium Collection"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              {activeCategory
                ? activeCategory.category_name
                : productPageContent.hero_title || "Wellness Redefined"}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
               {activeCategory
                ? activeCategory.category_description || `Explore our exclusive ${activeCategory.category_name} collection.`
                : productPageContent.hero_description || "Experience the perfect balance of nature and science with our premium supplements."}
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-900/5 border border-white/60 overflow-hidden">
               <div className="p-6 border-b border-blue-50 bg-blue-50/50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                     <LayoutGrid className="w-5 h-5 text-blue-600" />
                     Collections
                  </h3>
               </div>
                <nav className="p-3 flex flex-col gap-1 max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar">
                  <Link
                     to="/"
                     className={`px-4 py-3 rounded-2xl transition-all flex justify-between items-center group ${
                        !categorySlug
                           ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                           : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                     }`}
                  >
                     <span className="font-semibold text-sm">All Products</span>
                     {!categorySlug && <ChevronRight className="w-4 h-4" />}
                  </Link>
                  {categories.map((cat) => (
                     <Link
                        key={cat.id}
                        to={`/categories/${getCategorySlug(cat)}`}
                        className={`px-4 py-3 rounded-2xl transition-all flex justify-between items-center group ${
                           categorySlug === getCategorySlug(cat)
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                     >
                        <span className="font-semibold text-sm">{cat.category_name}</span>
                        {categorySlug === getCategorySlug(cat) && <ChevronRight className="w-4 h-4" />}
                     </Link>
                  ))}
               </nav>
            </div>

            {/* Stats Widget */}
            <div className="mt-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
               <div className="relative z-10">
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Total Products</p>
                  <h4 className="text-4xl font-bold">{allProducts.length}</h4>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-blue-100">
                     <Sparkles className="w-3 h-3 text-yellow-300" />
                     Premium Quality Guaranteed
                  </div>
               </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 w-full" ref={productsRef} style={{ scrollMarginTop: '120px' }}>
            
            {/* MOBILE CATEGORY BAR (Horizontal) */}
            <div className="lg:hidden mb-8">
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <Link
                     to="/"
                     className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                        !categorySlug
                           ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                           : "bg-white text-slate-600 border border-blue-100"
                     }`}
                  >
                     All
                  </Link>
                  {categories.map((cat) => (
                     <Link
                        key={cat.id}
                        to={`/categories/${getCategorySlug(cat)}`}
                        className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                           categorySlug === getCategorySlug(cat)
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                              : "bg-white text-slate-600 border border-blue-100"
                        }`}
                     >
                        {cat.category_name}
                     </Link>
                  ))}
               </div>
            </div>

            {/* SEARCH BAR */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg shadow-blue-900/5 border border-white/60 p-2 mb-8 flex items-center gap-2">
               <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Search className="w-5 h-5" />
               </div>
               <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 font-medium"
               />
               <div className="hidden sm:block px-6 py-2 bg-white rounded-xl text-xs font-bold text-slate-500 border border-blue-50">
                  {filteredProducts.length} Results
               </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => {
                    const slug = getProductSlug(product);
                    const productLink = activeCategory
                      ? `/categories/${getCategorySlug(activeCategory)}/${slug}`
                      : `/products/${slug}`;
                      
                    return (
                      <div
                        key={product.id}
                        onClick={() => navigate(productLink)}
                        className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 cursor-pointer border border-transparent hover:border-blue-100 flex flex-col h-full"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center p-6">
                          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <img
                            src={product.product_image}
                            alt={product.product_name}
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-sm"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Product"; }}
                          />
                          {/* Floating Badge */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold text-blue-600 px-3 py-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 delay-100">
                             Learn More
                          </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-1">
                          <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2">
                             {categories.find(c => c.id === product.category_id)?.category_name || "Collection"}
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.product_name}
                          </h3>
                          <p className="text-slate-500 text-xs line-clamp-2 mb-4 flex-1">
                            {product.product_description}
                          </p>
                          
                           <button className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                            Learn More <ArrowRight className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    );
                  })}
               </div>
            ) : (
               <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60">
                  <p className="text-2xl text-slate-400 font-light">No products found matching your criteria.</p>
                  <button onClick={() => {setSearchQuery(""); navigate("/");}} className="mt-4 text-blue-600 font-medium hover:underline">Clear Filters</button>
               </div>
            )}

            {/* Load More */}
            {hasMoreProducts && (
               <div className="flex justify-center mt-12">
                 <button onClick={handleLoadMore} disabled={isLoading} className="px-8 py-3 bg-white border border-blue-100 text-blue-600 font-semibold rounded-full shadow-lg shadow-blue-900/5 hover:bg-blue-50 transition-all">
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
