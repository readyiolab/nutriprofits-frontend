import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Search, ArrowRight, LayoutGrid, ChevronRight, X } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { getProductSlug, getCategorySlug, findCategoryBySlug } from "../../../utils/slug";

const DynamicProducts = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const backofficeData = useBackofficeData();

  const productsPerBatch = 8;
  const productsRef = useRef(null);

  // Smooth scroll when category changes
  useEffect(() => {
    if (productsRef.current) {
      // Small delay to ensure DOM is ready if navigating
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
    setDisplayedCount(8);
  };

  return (
    <div className="min-h-screen bg-[#faf5e4]">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] text-white mb-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-12">
          {/* Left Content */}
          <div className="p-6 md:p-12">
            <span className="inline-block bg-[#f8b400] text-[#004445] px-4 py-1 rounded-full text-sm font-medium mb-4">
              {productPageContent.hero_badge || "PREMIUM WELLNESS"}
            </span>
            <h1 className="text-4xl md:text-5xl font-medium mb-4 leading-tight">
              {activeCategory
                ? activeCategory.category_name
                : productPageContent.hero_title || "Elevate Your Health with Science-Backed Supplements"}
            </h1>
            <p className="text-lg mb-6 text-[#faf5e4]/90 leading-relaxed">
              {activeCategory
                ? activeCategory.category_description || `Browse all ${activeCategory.category_name} products`
                : productPageContent.hero_description || "Discover clinically formulated products trusted by thousands to support weight loss, energy, immunity, and total wellness."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="bg-[#f8b400] text-[#004445] px-8 py-3 rounded-lg font-medium hover:bg-[#ffa500] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Explore Products <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/categories"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#004445] transition-all text-center"
              >
                View Categories
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="h-64 md:h-full min-h-96 relative overflow-hidden">
            <img
              src={productPageContent.hero_image_url || "https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=600&auto=format&fit=crop&q=60"}
              alt="Featured Product"
              className="w-full h-full object-contain drop-shadow-2xl scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* HEADING SECTION */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-medium text-[#004445] mb-3">
            {activeCategory
              ? `${activeCategory.category_name} Products`
              : productPageContent.section_title || "Premium Health & Wellness Supplements"}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {productPageContent.section_description || "Browse our complete range of natural, effective, and science-backed formulas for every health goal."}
          </p>
        </div>

        {/* MOBILE CATEGORY BAR — horizontal scroll, visible only on small screens */}
        {categories.length > 0 && (
          <div className="lg:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Link
                to="/"
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  !categorySlug
                    ? "bg-gradient-to-r from-[#004445] to-[#2c786c] text-white shadow-md shadow-[#004445]/25"
                    : "bg-white text-[#004445] border border-[#2c786c]/30 hover:border-[#f8b400] hover:shadow-sm"
                }`}
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${getCategorySlug(cat)}`}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    categorySlug === getCategorySlug(cat)
                      ? "bg-gradient-to-r from-[#004445] to-[#2c786c] text-white shadow-md shadow-[#004445]/25"
                      : "bg-white text-[#004445] border border-[#2c786c]/30 hover:border-[#f8b400] hover:shadow-sm"
                  }`}
                >
                  {cat.category_name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SEARCH BAR */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-6 py-4 pl-14 pr-12 rounded-full border-2 border-[#2c786c] focus:border-[#f8b400] focus:outline-none shadow-lg transition-all text-gray-800 placeholder-gray-500"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#2c786c] w-6 h-6" />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f8b400] text-[#004445] p-3 rounded-full hover:bg-[#2c786c] hover:text-white transition-all">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ═══ SIDEBAR + PRODUCTS LAYOUT ═══ */}
        <div className="flex gap-8 mb-16" ref={productsRef} style={{ scrollMarginTop: '120px' }}>

          {/* ── ENHANCED STICKY CATEGORY SIDEBAR (desktop only) ── */}
          {categories.length > 0 && (
            <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-24 self-start h-fit max-h-[calc(100vh-8rem)]">
              <div>
                {/* Clean Minimal Sidebar */}
                <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border-2 border-[#f8b400]/10 hover:border-[#f8b400]/30 transition-all duration-300">
                  {/* Elegant Light Header */}
                  <div className="bg-[#faf5e4]/30 px-6 py-6 border-b border-[#f8b400]/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[#004445]/10">
                          <LayoutGrid className="w-5 h-5 text-[#004445]" />
                        </div>
                        <div>
                          <h3 className="text-[#004445] font-bold text-lg tracking-tight">Categories</h3>
                          <p className="text-gray-500 text-xs font-medium">{categories.length} categories</p>
                        </div>
                    </div>
                  </div>

                  {/* Category List - Clean & Minimal */}
                  <nav className="p-4 max-h-[calc(100vh-240px)] overflow-y-auto custom-scrollbar">
                    {/* All Products Link */}
                    <Link
                      to="/"
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 mb-2 group ${
                        !categorySlug
                          ? "bg-gradient-to-r from-[#004445] to-[#2c786c] text-white shadow-lg shadow-[#004445]/25 scale-105"
                          : "text-[#004445] hover:bg-gradient-to-r hover:from-[#faf5e4] hover:to-[#f5f0db] border-2 border-transparent hover:border-[#f8b400]/20"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full transition-all ${
                          !categorySlug ? "bg-[#f8b400] animate-pulse shadow-lg shadow-[#f8b400]/50" : "bg-[#2c786c]/30 group-hover:bg-[#f8b400]"
                        }`}></span>
                        <span>All Products</span>
                      </span>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                        !categorySlug 
                          ? "bg-[#f8b400] text-[#004445]" 
                          : "bg-[#004445]/10 text-[#004445] group-hover:bg-[#f8b400]/20"
                      }`}>
                        {allProducts.length}
                      </span>
                    </Link>

                    {/* Category Links */}
                    {categories.map((cat) => {
                      const catSlug = getCategorySlug(cat);
                      const isActive = categorySlug === catSlug;
                      const count = allProducts.filter((p) => p.category_id === cat.id).length;
                      return (
                        <Link
                          key={cat.id}
                          to={`/categories/${catSlug}`}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 mb-2 group relative overflow-hidden ${
                            isActive
                              ? "bg-gradient-to-r from-[#004445] to-[#2c786c] text-white shadow-lg shadow-[#004445]/25 scale-105"
                              : "text-[#004445] hover:bg-gradient-to-r hover:from-[#faf5e4] hover:to-[#f5f0db] border-2 border-transparent hover:border-[#f8b400]/20 hover:scale-102"
                          }`}
                        >
                          {/* Active indicator line */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#f8b400] rounded-r-full shadow-lg shadow-[#f8b400]/50"></div>
                          )}
                          
                          <span className="flex items-center gap-3 truncate">
                            <ChevronRight 
                              className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
                                isActive 
                                  ? "rotate-90 text-[#f8b400]" 
                                  : "text-[#2c786c] group-hover:translate-x-1 group-hover:text-[#f8b400]"
                              }`} 
                            />
                            <span className="truncate">{cat.category_name}</span>
                          </span>
                          
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-xl flex-shrink-0 transition-all ${
                            isActive 
                              ? "bg-[#f8b400] text-[#004445] shadow-md" 
                              : "bg-[#004445]/10 text-[#004445] group-hover:bg-[#f8b400]/30"
                          }`}>
                            {count}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Bottom Decoration */}
                  <div className="h-2 bg-gradient-to-r from-[#004445] via-[#f8b400] to-[#2c786c]"></div>
                </div>
              </div>
            </aside>
          )}

          {/* ── MAIN PRODUCT GRID ── */}
          <div className="flex-1 min-w-0 products-grid-section">
            {/* Active category indicator */}
            {activeCategory && (
              <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-[#004445]/5 to-[#2c786c]/5 rounded-2xl px-5 py-3.5 border border-[#2c786c]/10">
                <span className="text-sm text-[#004445]">
                  Showing <strong>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? "s" : ""} in
                </span>
                <span className="bg-gradient-to-r from-[#004445] to-[#2c786c] text-white text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 shadow-md shadow-[#004445]/15">
                  {activeCategory.category_name}
                  <Link to="/" className="hover:bg-white/20 rounded-full p-0.5 ml-0.5 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </Link>
                </span>
              </div>
            )}

            {/* Products Grid — 3 cols when sidebar present, 4 cols when no categories */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${categories.length > 0 ? "xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"} gap-5`}>
              {displayedProducts.map((product) => {
                const slug = getProductSlug(product);
                const productLink = activeCategory
                  ? `/categories/${getCategorySlug(activeCategory)}/${slug}`
                  : `/product/${slug}`;
                return (
                  <div
                    key={product.id}
                    onClick={() => navigate(productLink)}
                    className="bg-white rounded-2xl cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-[#2c786c]/10 hover:border-[#2c786c]/25"
                  >
                    {/* Product Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden p-6 flex items-center justify-center">
                      <img
                        src={product.product_image}
                        alt={product.product_name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex-1 mb-3 text-center">
                        <h3 className="text-sm sm:text-base font-semibold text-[#004445] mb-1.5 line-clamp-2 group-hover:text-[#2c786c] transition-colors leading-snug">
                          {product.product_name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {product.product_description}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(productLink);
                        }}
                        className="w-full bg-gradient-to-r from-[#004445] to-[#2c786c] cursor-pointer text-white py-2.5 px-5 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#004445]/15 flex items-center justify-center gap-1.5"
                      >
                        <span>Learn More</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LOAD MORE BUTTON */}
            {hasMoreProducts && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className={`px-10 py-4 rounded-full font-semibold flex items-center gap-2 transition-all transform cursor-pointer ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#004445] to-[#2c786c] text-white hover:shadow-lg hover:scale-105"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </span>
                      <span>Loading Products...</span>
                    </>
                  ) : (
                    <span>Load More Products</span>
                  )}
                </button>
              </div>
            )}

            {/* NO RESULTS */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-7xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-[#004445] mb-2">No products found</h3>
                <p className="text-[#2c786c] text-lg">
                  {activeCategory
                    ? `No products in ${activeCategory.category_name} yet.`
                    : "Try searching for a different product."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] p-6 sm:p-8 md:p-12 text-center text-white shadow-2xl mx-4 sm:mx-6 lg:mx-10 mb-8 md:mb-12 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8b400] opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f8b400] opacity-10 rounded-full -ml-24 -mb-24"></div>

        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 px-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-[#faf5e4] text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
            Join thousands of satisfied customers who have found their perfect wellness solution.
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
            <Link
              to="/"
              className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#ffa500] cursor-pointer shadow-lg text-sm sm:text-base transition-all"
            >
              Start Shopping
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-[#004445] cursor-pointer transition-all text-sm sm:text-base"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProducts;
