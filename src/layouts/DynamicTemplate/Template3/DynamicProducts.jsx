import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Search, ArrowRight, LayoutGrid, ChevronRight, X, Terminal, Filter } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { getProductSlug, getCategorySlug, findCategoryBySlug } from "../../../utils/slug";

const DynamicProducts = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const backofficeData = useBackofficeData();

  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerBatch = 12;
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

  const activeCategory = categorySlug
    ? findCategoryBySlug(categories, categorySlug)
    : null;

  const categoryFilteredProducts = activeCategory
    ? allProducts.filter((p) => p.category_id === activeCategory.id)
    : allProducts;

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
    setDisplayedCount(12);
  };

  return (
    <div className="min-h-screen bg-[#eeeeee] font-sans">
      
      {/* INDUSTRIAL HERO */}
      <div className="bg-[#303841] text-[#eeeeee] relative overflow-hidden border-b-4 border-[#d72323]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="max-w-2xl">
              <div className="inline-block bg-[#d72323] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 rounded-sm">
                {productPageContent.hero_badge || "System Online"}
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                 {activeCategory ? activeCategory.category_name : productPageContent.hero_title || "CATALOG_V3.0"}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl font-mono border-l-2 border-gray-600 pl-4">
                 {activeCategory ? `// ${activeCategory.category_description || "FILTERING_ACTIVE"}` : "// PREMIUM_SUPPLEMENTS_DATABASE_LOADED"}
              </p>
           </div>
           
           {/* Tech Stats/Decoration */}
           <div className="hidden md:block">
              <div className="bg-[#3a4750] p-6 rounded-sm border border-gray-600 shadow-2xl">
                 <div className="flex items-center gap-4 mb-4 border-b border-gray-600 pb-2">
                    <Terminal className="w-5 h-5 text-[#d72323]" />
                    <span className="font-mono text-xs text-gray-400">SYSTEM_STATUS</span>
                 </div>
                 <div className="space-y-2 font-mono text-sm text-gray-300">
                    <div className="flex justify-between gap-8"><span>TOTAL_ITEMS:</span> <span className="text-[#00adb5]">{allProducts.length}</span></div>
                    <div className="flex justify-between gap-8"><span>CATEGORIES:</span> <span className="text-[#00adb5]">{categories.length}</span></div>
                    <div className="flex justify-between gap-8"><span>LAST_UPDATE:</span> <span className="text-[#00adb5]">NOW</span></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* CONTROL PANEL HEADER */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-end mb-10 border-b border-gray-300 pb-6">
           <div className="flex-1 w-full relative">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Search Database</label>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                 <input 
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full bg-white border-2 border-gray-300 text-[#303841] pl-12 pr-4 py-3 rounded-sm focus:border-[#303841] focus:outline-none transition-colors font-mono"
                    placeholder="ENTER_KEYWORD..."
                 />
              </div>
           </div>
        </div>

        {/* MOBILE CATEGORY TABS (Tech Style) */}
        {categories.length > 0 && (
          <div className="lg:hidden mb-10 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2">
                <Link 
                   to="/" 
                   className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] border-2 transition-all ${
                      !categorySlug 
                       ? "bg-[#d72323] text-white border-[#d72323] shadow-lg shadow-[#d72323]/20" 
                       : "bg-white text-gray-500 border-gray-200 hover:border-[#d72323] hover:text-[#d72323]"
                   }`}
                >
                   // ALL
                </Link>
                {categories.map(cat => (
                   <Link 
                      key={cat.id} 
                      to={`/categories/${getCategorySlug(cat)}`} 
                      className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] border-2 transition-all whitespace-nowrap ${
                         categorySlug === getCategorySlug(cat)
                           ? "bg-[#d72323] text-white border-[#d72323] shadow-lg shadow-[#d72323]/20" 
                           : "bg-white text-gray-500 border-gray-200 hover:border-[#d72323] hover:text-[#d72323]"
                      }`}
                   >
                      {cat.category_name}
                   </Link>
                ))}
            </div>
          </div>
        )}

        <div className="flex gap-8 items-start">
           
           {/* ─── SIDEBAR: TECH PANEL (Template 3 Unique) ─── */}
           {categories.length > 0 && (
             <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
               <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100 bg-[#f8fafc] flex items-center justify-between">
                     <h3 className="flex items-center gap-2 font-mono text-xs font-bold text-[#d72323] tracking-widest">
                        <Filter className="w-4 h-4" />
                        SYSTEM_FILTER
                     </h3>
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  </div>
                  <nav className="flex flex-col p-2">
                     <Link 
                        to="/" 
                        className={`px-4 py-3.5 rounded-xl border transition-all flex justify-between items-center group mb-1 ${!categorySlug ? "bg-[#f8fafc] border-[#d72323]/20 text-[#d72323]" : "bg-transparent border-transparent text-gray-500 hover:bg-gray-50 hover:text-[#303841]"}`}
                     >
                        <span className={`font-mono text-sm uppercase tracking-tight flex items-center gap-3 ${!categorySlug ? "font-bold" : ""}`}>
                           <span className={`w-2 h-2 rounded-full ${!categorySlug ? "bg-[#d72323] shadow-[0_0_8px_rgba(215,35,35,0.4)]" : "bg-gray-200"}`}></span>
                           ALL_UNITS
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${!categorySlug ? "bg-[#d72323] text-white" : "bg-gray-100 text-gray-500"}`}>{allProducts.length}</span>
                     </Link>

                     {categories.map((cat) => {
                        const catSlug = getCategorySlug(cat);
                        const isActive = categorySlug === catSlug;
                        const count = allProducts.filter((p) => p.category_id === cat.id).length;
                        return (
                           <Link 
                              key={cat.id}
                              to={`/categories/${catSlug}`}
                              className={`px-4 py-3.5 rounded-xl border transition-all flex justify-between items-center group mb-0.5 ${isActive ? "bg-[#f8fafc] border-[#d72323]/20 text-[#d72323]" : "bg-transparent border-transparent text-gray-500 hover:bg-gray-50 hover:text-[#303841]"}`}
                           >
                              <span className={`font-mono text-sm uppercase tracking-tight flex items-center gap-3 ${isActive ? "font-bold" : ""}`}>
                                 <span className={`w-2 h-2 rounded-full transition-all ${isActive ? "bg-[#d72323] shadow-[0_0_8px_rgba(215,35,35,0.4)]" : "bg-gray-200"}`}></span>
                                 {cat.category_name}
                              </span>
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-all ${isActive ? "bg-[#d72323] text-white" : "bg-gray-100 text-gray-400 group-hover:text-gray-600"}`}>{count}</span>
                           </Link>
                        )
                     })}
                  </nav>
               </div>
             </aside>
           )}

           {/* ─── GRID AREA ─── */}
           <div className="flex-1 min-w-0" ref={productsRef} style={{ scrollMarginTop: '120px' }}>
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${categories.length > 0 ? "xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"} gap-6`}>
                 {displayedProducts.map((product) => {
                    const slug = getProductSlug(product);
                    const productLink = activeCategory
                      ? `/categories/${getCategorySlug(activeCategory)}/${slug}`
                      : `/products/${slug}`;
                      
                    return (
                       <div 
                          key={product.id}
                          onClick={() => navigate(productLink)}
                          className="group bg-white border border-gray-300 hover:border-[#303841] transition-all cursor-pointer relative"
                       >
                          {/* Tech Corner Markers */}
                          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                          <div className="h-64 p-6 relative overflow-hidden">
                             <img 
                                src={product.product_image} 
                                alt={product.product_name}
                                className="w-full h-full object-contain filter group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=NO_IMAGE"; }}
                             />
                             <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-400 opacity-50">ID: {product.id}</div>
                          </div>
                          
                          <div className="p-6">
                             <div className="text-[10px] uppercase tracking-widest font-bold text-[#d72323] mb-2">
                                {categories.find(c => c.id === product.category_id)?.category_name || "GENERAL"}
                             </div>
                             <h3 className="text-xl font-bold text-[#303841] mb-2 uppercase leading-none group-hover:text-black">
                                {product.product_name}
                             </h3>
                             <p className="text-gray-500 text-sm line-clamp-2 mb-4 font-mono">
                                {product.product_description}
                             </p>
                             <button className="w-full py-2 border-2 border-[#303841] text-[#303841] text-xs font-bold uppercase tracking-widest hover:bg-[#303841] hover:text-white transition-colors">
                                Learn More
                             </button>
                          </div>
                       </div>
                    );
                 })}
              </div>

              {hasMoreProducts && (
                <div className="flex justify-center mt-12">
                   <button onClick={handleLoadMore} disabled={isLoading} className="px-8 py-3 bg-[#303841] text-white font-mono text-sm uppercase hover:bg-[#d72323] transition-colors">
                      {isLoading ? "LOADING..." : "[ LOAD_MORE_DATA ]"}
                   </button>
                </div>
              )}
              
               {filteredProducts.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-gray-300">
                   <p className="text-xl text-gray-400 font-mono mb-4">ERROR: NO_RESULTS_FOUND</p>
                   <button onClick={() => {setSearchQuery(""); navigate("/");}} className="text-[#d72323] font-bold uppercase tracking-wider hover:underline">Reset System Parameters</button>
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProducts;
