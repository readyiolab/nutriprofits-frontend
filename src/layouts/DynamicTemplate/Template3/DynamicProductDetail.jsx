import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, ArrowRight, Heart, Check, Star, Leaf } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { findProductBySlug, getProductSlug, getCategorySlug, findCategoryBySlug } from "../../../utils/slug";
import { apiCall } from "../../../utils/domain";

const DynamicProductDetail = () => {
  const { productSlug, categorySlug } = useParams();
  const navigate = useNavigate();
  const backofficeData = useBackofficeData();
  const [activeTab, setActiveTab] = useState("highlights");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const allProducts = backofficeData?.backofficeProducts || [];
  const categories = backofficeData?.backofficeCategories || [];

  const initialProduct = findProductBySlug(allProducts, productSlug);
  const [product, setProduct] = useState(initialProduct);
  const [loadingDetail, setLoadingDetail] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchDetail = async () => {
      try {
        setLoadingDetail(true);
        const response = await apiCall(`/backoffice-public/products/slug/${productSlug}`);
        if (response.success && active) {
          setProduct(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      } finally {
        if (active) setLoadingDetail(false);
      }
    };
    fetchDetail();
    return () => {
      active = false;
    };
  }, [productSlug]);

  useEffect(() => {
    if (initialProduct && (!product || product.id !== initialProduct.id)) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const productCategory = product
    ? categories.find((c) => c.id === product.category_id)
    : null;

  // Determine if we came from a category route
  const fromCategory = categorySlug
    ? findCategoryBySlug(categories, categorySlug)
    : null;

  const parseJSON = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      if (typeof val === "string") {
        return val.split("\n").filter((s) => s.trim());
      }
      return [];
    }
  };

  const highlights = parseJSON(product?.highlights);
  const benefits = parseJSON(product?.benefits);
  const ingredients = parseJSON(product?.ingredients);

  // Related products from same category, fallback to others if empty
  let relatedProducts = product
    ? allProducts.filter((p) => p.category_id === product.category_id && p.id !== product.id)
    : [];

  if (relatedProducts.length < 4 && product) {
    const otherProducts = allProducts
      .filter((p) => p.category_id !== product.category_id && p.id !== product.id)
      .slice(0, 4 - relatedProducts.length);
    relatedProducts = [...relatedProducts, ...otherProducts];
  }
  
  relatedProducts = relatedProducts.slice(0, 4);

  // Dynamic tabs that exist
  const tabs = [];
  if (highlights.length > 0) tabs.push("highlights");
  if (benefits.length > 0) tabs.push("benefits");
  if (ingredients.length > 0) tabs.push("ingredients");

  // Set first tab as active if activeTab not in list
  useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(activeTab)) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, activeTab]);

  if (loadingDetail && (!product || !product.full_description)) {
    return (
      <div className="min-h-screen bg-[#eeeeee] flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d72323] mx-auto"></div>
          <p className="text-slate-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#eeeeee] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#303841] mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#d72323] text-white px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eeeeee] overflow-x-hidden font-t3-body pt-8">
      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20">
        
        {/* Amazon-style Breadcrumbs & Back controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-gray-500 uppercase font-mono tracking-wider">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#d72323] transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            {fromCategory ? (
              <>
                <Link to="/categories" className="hover:text-[#d72323] transition-colors">Categories</Link>
                <span className="text-gray-400">/</span>
                <Link
                  to={`/categories/${getCategorySlug(fromCategory)}`}
                  className="hover:text-[#d72323] transition-colors"
                >
                  {fromCategory.category_name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            ) : productCategory ? (
              <>
                <Link
                  to={`/categories/${getCategorySlug(productCategory)}`}
                  className="hover:text-[#d72323] transition-colors"
                >
                  {productCategory.category_name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            ) : null}
            <span className="text-[#303841] font-bold">{product.product_name}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-[#d72323] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Products
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* LEFT - Product Image */}
          <div className="lg:sticky lg:top-24 w-full max-w-[320px] sm:max-w-md lg:max-w-none mx-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border-l-4 border-[#d72323]">
              <div className="aspect-square flex items-center justify-center p-6 sm:p-10 lg:p-16">
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x500?text=Product";
                  }}
                />
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-6 text-[#3a4750]/60">
              {["Natural", "Lab Tested", "Premium Quality"].map((label, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 text-[#d72323]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Product Info & Tabs */}
          <div className="space-y-8 lg:pt-4">
            {/* Category & Name */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                {productCategory && (
                  <span className="inline-block text-xs font-semibold text-[#d72323] bg-[#d72323]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {productCategory.category_name}
                  </span>
                )}
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isWishlisted
                      ? "bg-red-500 text-white border-red-500"
                      : "border-gray-300 text-gray-400 hover:text-red-400 hover:border-red-400"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#303841] leading-tight font-t3-heading">
                {product.product_name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Top Rated</span>
            </div>

            {/* Description */}
            <p className="text-base text-[#3a4750] leading-relaxed">
              {product.full_description || product.product_description}
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-200"></div>

            {/* Tabs Section */}
            {tabs.length > 0 && (
              <div>
                <div className="flex gap-1 border-b border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all relative ${
                        activeTab === tab
                          ? "text-[#d72323]"
                          : "text-gray-400 hover:text-[#303841]"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d72323] rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-6 min-h-[200px]">
                  {/* Highlights Tab */}
                  {activeTab === "highlights" && highlights.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {highlights.map((highlight, idx) => {
                        const text = typeof highlight === "string" ? highlight : highlight.text || highlight.name || "";
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#d72323]/20 transition-colors shadow-sm"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#d72323]/10 text-[#d72323] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-[#3a4750] leading-relaxed">{text}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Benefits Tab */}
                  {activeTab === "benefits" && benefits.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {benefits.map((benefit, idx) => {
                        const text = typeof benefit === "string" ? benefit : benefit.text || benefit.name || "";
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#d72323]/20 transition-colors shadow-sm"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#d72323]/10 text-[#d72323] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-[#3a4750] leading-relaxed">{text}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Ingredients Tab */}
                  {activeTab === "ingredients" && ingredients.length > 0 && (
                    <div className="space-y-3">
                      {ingredients.map((ingredient, idx) => {
                        const name = typeof ingredient === "string" ? ingredient : ingredient.name || "";
                        const description = typeof ingredient === "object" ? ingredient.description || "" : "";
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#d72323]/20 transition-colors shadow-sm"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#d72323]/10 text-[#d72323] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Leaf className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-[#303841] uppercase tracking-wide">{name}</h4>
                              {description && (
                                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            {product.buylink && (
              <div className="pt-4">
                <a
                  href={product.buylink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#d72323] text-white py-4 px-8 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[#b91c1c] transition-all shadow-md shadow-[#d72323]/10 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border-b-4 border-[#8b1a1a]"
                >
                  Buy Now
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-center text-[10px] font-mono text-gray-400 mt-4 uppercase tracking-[0.2em]">Affiliate Security System // End-to-End Encrypted</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-[#eeeeee] border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-bold text-[#d72323] uppercase tracking-wider mb-2">Explore More</p>
                <h2 className="text-3xl font-bold text-[#303841] font-t3-heading uppercase tracking-wide">You Might Also Like</h2>
              </div>
              <Link
                to="/"
                className="hidden md:flex items-center gap-2 text-xs font-bold text-[#d72323] hover:text-[#303841] transition-colors cursor-pointer uppercase tracking-wider"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => {
                const rpSlug = getProductSlug(rp);
                const rpCategory = categories.find((c) => c.id === rp.category_id);
                const rpLink = rpCategory
                  ? `/categories/${getCategorySlug(rpCategory)}/${rpSlug}`
                  : `/products/${rpSlug}`;
                return (
                  <Link
                    key={rp.id}
                    to={rpLink}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#d72323]/20 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                    <div className="aspect-square p-6 flex items-center justify-center bg-slate-50/50">
                      <img
                        src={rp.product_image}
                        alt={rp.product_name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                        }}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {rpCategory && (
                          <p className="text-[10px] font-bold text-[#d72323] uppercase tracking-wider mb-1">
                            {rpCategory.category_name}
                          </p>
                        )}
                        <h3 className="text-base font-bold text-[#303841] group-hover:text-[#d72323] transition-colors line-clamp-2 leading-snug uppercase">
                          {rp.product_name}
                        </h3>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#303841]/50 group-hover:text-[#d72323] transition-colors uppercase tracking-wider">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DynamicProductDetail;
