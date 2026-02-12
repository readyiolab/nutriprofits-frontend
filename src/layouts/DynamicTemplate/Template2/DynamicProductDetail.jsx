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

  // Related products from same category
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section with Gradient */}
      <div className="relative bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] text-white py-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            {fromCategory ? (
              <>
                <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
                <span>/</span>
                <Link
                  to={`/categories/${getCategorySlug(fromCategory)}`}
                  className="hover:text-white transition-colors"
                >
                  {fromCategory.category_name}
                </Link>
                <span>/</span>
              </>
            ) : productCategory ? (
              <>
                <Link
                  to={`/categories/${getCategorySlug(productCategory)}`}
                  className="hover:text-white transition-colors"
                >
                  {productCategory.category_name}
                </Link>
                <span>/</span>
              </>
            ) : null}
            <span className="text-white font-medium">{product.product_name}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors cursor-pointer"
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
            <div className="relative p-8">
              {/* Badge */}
              {productCategory && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium z-10">
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
              <h1 className="text-2xl md:text-3xl font-medium text-slate-800 mb-4">
                {product.product_name}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {product.full_description || product.product_description}
              </p>

               {/* Price & Actions Area */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                {product.product_price > 0 && (
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mb-1.5 font-bold">Price per Unit</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      ${Number(product.product_price).toFixed(2)}
                    </div>
                  </div>
                )}

                <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>

                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest mb-1.5 font-bold">Total Quantity</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white rounded-xl border border-slate-200 shadow-sm p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 transition-all text-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-slate-800 text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-all text-blue-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => setQuantity(1)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      title="Reset Quantity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {product.buylink && (
                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href={product.buylink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-5 rounded-2xl font-bold shadow-xl shadow-blue-800/20 flex items-center justify-center gap-3 hover:shadow-blue-800/40 hover:-translate-y-1 transition-all active:translate-y-0"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Proceed to Purchase
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl h-[1px] bg-slate-200 my-12 mx-auto"></div>

        {/* Tabs Section */}
        <div className="overflow-x-auto scrollbar-hide mb-8 -mx-4 px-4">
          <div className="flex justify-start sm:justify-center gap-3 min-w-max sm:min-w-0">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-3 font-semibold capitalize whitespace-nowrap transition-all duration-300
                  rounded-full border-2
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white border-transparent shadow-lg"
                      : "bg-transparent text-slate-600 border-transparent hover:border-blue-200 hover:bg-blue-50"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((highlight, idx) => {
                const text = typeof highlight === "string" ? highlight : highlight.text || highlight.name || "";
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-slate-700 leading-relaxed">{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === "benefits" && benefits.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit, idx) => {
                const text = typeof benefit === "string" ? benefit : benefit.text || benefit.name || "";
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-slate-700 leading-relaxed">{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Ingredients Tab */}
          {activeTab === "ingredients" && ingredients.length > 0 && (
            <div className="space-y-4">
              {ingredients.map((ingredient, idx) => {
                const name = typeof ingredient === "string" ? ingredient : ingredient.name || "";
                const description = typeof ingredient === "object" ? ingredient.description || "" : "";
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-blue-600 font-bold text-lg w-8 text-center">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">{name}</h4>
                        {description && (
                          <p className="text-slate-600 leading-relaxed">{description}</p>
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
          <div className="mt-20 border-t border-blue-100 pt-16">
            <div className="text-center mb-12">
               <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 block">Complete Your Routine</span>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Complementary Solutions</h2>
               <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full shadow-lg shadow-blue-500/20"></div>
            </div>

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
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-transparent hover:border-blue-100 flex flex-col h-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center p-6">
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src={rp.product_image}
                        alt={rp.product_name}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-sm"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                        }}
                      />
                      {/* Floating Badge */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold text-blue-600 px-3 py-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                         {rpCategory ? rpCategory.category_name : 'Featured'}
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {rp.product_name}
                      </h3>
                      
                       <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                          <span className="text-slate-800 font-bold">{rp.product_price ? `$${rp.product_price}` : "View"}</span>
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                             <ArrowRight className="w-4 h-4" />
                          </div>
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
