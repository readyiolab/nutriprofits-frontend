import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { findProductBySlug, getProductSlug, getCategorySlug, findCategoryBySlug } from "../../../utils/slug";

const DynamicProductDetail = () => {
  const { productSlug, categorySlug } = useParams();
  const navigate = useNavigate();
  const backofficeData = useBackofficeData();
  const [activeTab, setActiveTab] = useState("highlights");
  const [quantity, setQuantity] = useState(1);

  const allProducts = backofficeData?.backofficeProducts || [];
  const categories = backofficeData?.backofficeCategories || [];

  const product = findProductBySlug(allProducts, productSlug);

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

  const tabs = ["highlights", "benefits", "ingredients"];

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
    <div className="min-h-screen bg-[#eeeeee]">
      {/* Hero Section - Dark Tech Style */}
      <div className="relative bg-[#303841] text-white py-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d72323]/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-[#d72323] transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            {fromCategory ? (
              <>
                <Link to="/categories" className="hover:text-[#d72323] transition-colors">Categories</Link>
                <span className="text-gray-600">/</span>
                <Link
                  to={`/categories/${getCategorySlug(fromCategory)}`}
                  className="hover:text-[#d72323] transition-colors"
                >
                  {fromCategory.category_name}
                </Link>
                <span className="text-gray-600">/</span>
              </>
            ) : productCategory ? (
              <>
                <Link
                  to={`/categories/${getCategorySlug(productCategory)}`}
                  className="hover:text-[#d72323] transition-colors"
                >
                  {productCategory.category_name}
                </Link>
                <span className="text-gray-600">/</span>
              </>
            ) : null}
            <span className="text-white font-medium">{product.product_name}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-[#d72323] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 justify-center items-center">
          {/* LEFT - Product Image */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="relative rounded-xl p-8 border-l-4 border-[#d72323]">
              {/* Badge */}
              {productCategory && (
                <div className="absolute top-6 right-6 bg-[#303841] text-white px-4 py-2 rounded-lg text-sm font-medium z-10 uppercase tracking-wider">
                  {productCategory.category_name}
                </div>
              )}

              {/* Image */}
              <div className="aspect-square flex items-center justify-center">
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
          </div>

          {/* RIGHT - Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#303841] mb-4 uppercase tracking-wide">
                {product.product_name}
              </h1>
              <p className="text-lg text-[#3a4750] leading-relaxed mb-6">
                {product.full_description || product.product_description}
              </p>

            {/* Price & Quantity Panel */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 border-l-4 border-[#d72323] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                {/* Price */}
                {product.product_price > 0 && (
                  <div>
                     <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">market_price_index</div>
                     <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-black text-[#303841] tracking-tighter">
                          ${Number(product.product_price).toFixed(2)}
                        </span>
                     </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                   <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 text-right sm:text-left">quantity_selector</div>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center bg-[#f8fafc] rounded-lg border-2 border-[#303841] p-1 shadow-[4px_4px_0px_rgba(48,56,65,0.1)]">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center rounded hover:bg-white transition-all text-[#303841] hover:text-[#d72323]"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <div className="w-12 text-center font-black text-[#303841] text-lg font-mono">{String(quantity).padStart(2, '0')}</div>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center rounded hover:bg-white transition-all text-[#303841] hover:text-[#d72323]"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <button 
                        onClick={() => setQuantity(1)}
                        className="w-12 h-12 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#303841] hover:bg-gray-50 transition-all font-bold"
                        title="Reset Quantity"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              {product.buylink && (
                <div className="mt-8">
                   <a 
                     href={product.buylink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full flex items-center justify-center gap-3 bg-[#d72323] text-white px-8 py-5 rounded-xl font-black uppercase tracking-[0.1em] shadow-[0_10px_20px_rgba(215,35,35,0.2)] hover:bg-[#b91c1c] hover:shadow-[0_15px_30px_rgba(215,35,35,0.3)] hover:-translate-y-1 transition-all active:translate-y-0"
                   >
                     <ShoppingBag className="w-6 h-6" />
                     EXECUTE_ORDER_MODULE
                   </a>
                   <p className="text-center text-[10px] font-mono text-gray-400 mt-4 uppercase tracking-[0.2em]">Affiliate Data Link // Encrypted Session</p>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl h-1 bg-[#303841] my-12 mx-auto"></div>

        {/* Tabs Section */}
        <div className="overflow-x-auto scrollbar-hide mb-8 -mx-4 px-4">
          <div className="flex justify-start sm:justify-center gap-2 min-w-max sm:min-w-0">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-3 font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300
                  rounded-lg border-2
                  ${
                    activeTab === tab
                      ? "bg-[#303841] text-white border-[#d72323]"
                      : "bg-transparent text-[#303841] border-transparent hover:border-[#d72323]/50 hover:text-[#d72323]"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {/* Highlights Tab */}
          {activeTab === "highlights" && highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, idx) => {
                const text = typeof highlight === "string" ? highlight : highlight.text || highlight.name || "";
                return (
                  <div
                    key={idx}
                    className="bg-white border-l-4 border-[#d72323] rounded-lg p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#303841] text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-[#3a4750] leading-relaxed">{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === "benefits" && benefits.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => {
                const text = typeof benefit === "string" ? benefit : benefit.text || benefit.name || "";
                return (
                  <div
                    key={idx}
                    className="bg-white border-l-4 border-[#d72323] rounded-lg p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#d72323] text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-[#3a4750] leading-relaxed">{text}</p>
                    </div>
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
                    className="bg-white border-l-4 border-[#d72323] rounded-lg p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-[#d72323] font-bold text-lg w-8 text-center">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-[#303841] mb-2 uppercase tracking-wide">{name}</h4>
                        {description && (
                          <p className="text-[#3a4750] leading-relaxed">{description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#303841] mb-8 text-center uppercase tracking-wider relative inline-block left-1/2 -translate-x-1/2">
              Related Systems
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#d72323] transform skew-x-12"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => {
                const rpSlug = getProductSlug(rp);
                const rpCategory = categories.find((c) => c.id === rp.category_id);
                const rpLink = rpCategory
                  ? `/categories/${getCategorySlug(rpCategory)}/${rpSlug}`
                  : `/product/${rpSlug}`;
                return (
                  <Link
                    key={rp.id}
                    to={rpLink}
                    className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-200 hover:border-[#303841] relative"
                  >
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d72323] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    
                    <div className="h-48 overflow-hidden flex items-center justify-center p-4 relative">
                      <img
                        src={rp.product_image}
                        alt={rp.product_name}
                        className="w-full h-full object-contain filter group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                        }}
                      />
                    </div>
                    <div className="p-4 text-center bg-white border-t border-gray-100 relative">
                      <div className="text-[10px] font-mono text-[#d72323] mb-1">ID: {rp.id}</div>
                      <h3 className="text-lg font-bold text-[#303841] group-hover:text-black transition-colors line-clamp-2 uppercase">
                        {rp.product_name}
                      </h3>
                      <div className="mt-3 flex items-center justify-center">
                        <span className="px-4 py-1 border border-[#303841] text-[#303841] text-xs font-bold uppercase tracking-widest group-hover:bg-[#303841] group-hover:text-white transition-all">
                          View Data
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicProductDetail;