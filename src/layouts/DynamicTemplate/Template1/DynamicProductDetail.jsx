import { Dot, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { findProductBySlug, getProductSlug, getCategorySlug, findCategoryBySlug } from "../../../utils/slug";

const DynamicProductDetail = () => {
  const { productSlug, categorySlug } = useParams();
  const navigate = useNavigate();
  const backofficeData = useBackofficeData();
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

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf5e4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#004445] mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#004445] text-white px-8 py-3 rounded-lg hover:bg-[#2c786c] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf5e4] py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-[#004445] transition-colors">Home</Link>
          <span>/</span>
          {fromCategory ? (
            <>
              <Link to="/categories" className="hover:text-[#004445] transition-colors">Categories</Link>
              <span>/</span>
              <Link
                to={`/categories/${getCategorySlug(fromCategory)}`}
                className="hover:text-[#004445] transition-colors"
              >
                {fromCategory.category_name}
              </Link>
              <span>/</span>
            </>
          ) : productCategory ? (
            <>
              <Link
                to={`/categories/${getCategorySlug(productCategory)}`}
                className="hover:text-[#004445] transition-colors"
              >
                {productCategory.category_name}
              </Link>
              <span>/</span>
            </>
          ) : null}
          <span className="text-[#004445] font-medium">{product.product_name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center cursor-pointer gap-2 text-[#004445] hover:text-[#2c786c] font-semibold mb-8 transition-colors"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE - STICKY IMAGE */}
          <div className="lg:sticky lg:top-8 h-fit flex justify-center">
            <div className="w-full max-w-[400px] aspect-square flex items-center justify-center p-8">
              <img
                src={product.product_image}
                alt={product.product_name}
                className="max-w-full max-h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/500x500?text=Product";
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE - CONTENT */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  {productCategory && (
                    <Link
                      to={`/categories/${getCategorySlug(productCategory)}`}
                      className="inline-block bg-[#f8b400] text-[#004445] px-4 py-1 rounded-full text-sm font-medium mb-3 hover:bg-[#ffa500] transition-colors"
                    >
                      {productCategory.category_name}
                    </Link>
                  )}
                  <h1 className="text-2xl md:text-3xl font-medium text-[#004445] mb-2">
                    {product.product_name}
                  </h1>
                </div>
              </div>

              <p className="text-md text-gray-700 leading-relaxed mb-4">
                {product.full_description || product.product_description}
              </p>

              {/* Price & Quantity Area */}
              {product.product_price > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Price</div>
                    <div className="text-3xl font-bold text-[#004445]">
                      ${Number(product.product_price).toFixed(2)}
                    </div>
                  </div>

                  <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>

                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Quantity</div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-[#004445]"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-[#004445]">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-[#d72323]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => setQuantity(1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all font-bold"
                        title="Reset Quantity"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {product.buylink && (
                <div>
                  <a
                    href={product.buylink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#f8b400] text-[#004445] px-10 py-4 rounded-full cursor-pointer font-bold shadow-lg shadow-[#f8b400]/20 hover:bg-[#ffc933] hover:-translate-y-0.5 transition-all active:translate-y-0"
                  >
                    Learn More & Buy Now <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-[#004445] mb-6">Key Highlights</h3>
                <ul className="space-y-4">
                  {highlights.map((highlight, idx) => {
                    const text = typeof highlight === "string" ? highlight : highlight.text || highlight.name || "";
                    return (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1 font-bold"><Dot /></div>
                        <span className="text-gray-700 leading-relaxed">{text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-[#004445] mb-6">Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => {
                    const text = typeof benefit === "string" ? benefit : benefit.text || benefit.name || "";
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="font-bold text-lg flex-shrink-0"><Dot /></span>
                        <span className="text-gray-700">{text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-[#004445] mb-6">Key Ingredients</h3>
                <div className="space-y-4">
                  {ingredients.map((ingredient, idx) => {
                    const name = typeof ingredient === "string" ? ingredient : ingredient.name || "";
                    const description = typeof ingredient === "object" ? ingredient.description || "" : "";
                    return (
                      <div key={idx} className="pb-4 border-b last:border-b-0">
                        <h4 className="font-normal text-[#004445] mb-2 flex items-center gap-2">
                          <Dot /> {name}
                        </h4>
                        {description && (
                          <p className="text-gray-600 text-sm leading-relaxed flex items-center gap-2">
                            <Dot /> {description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-[#f8b400]/20 pt-16">
            <div className="text-center mb-10">
              <span className="text-[#f8b400] font-bold tracking-wider uppercase text-xs mb-2 block">You May Also Like</span>
              <h2 className="text-3xl font-bold text-[#004445]">Related Products</h2>
              <div className="w-16 h-1 bg-[#f8b400] mx-auto mt-4 rounded-full"></div>
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
                    className="group bg-white rounded-2xl border border-[#e5e7eb] hover:border-[#f8b400]/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
                  >
                    <div className="h-40 relative p-6 flex items-center justify-center overflow-hidden">
                      <img
                        src={rp.product_image}
                        alt={rp.product_name}
                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                        }}
                      />
                      {rpCategory && (
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-[#004445] border border-[#e5e7eb]">
                          {rpCategory.category_name}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-[#004445] mb-2 line-clamp-2 group-hover:text-[#2c786c] transition-colors leading-tight">
                        {rp.product_name}
                      </h3>
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100/50">
                        <span className="text-[#004445] font-bold">{rp.product_price ? `$${Number(rp.product_price).toFixed(2)}` : "View"}</span>
                        <div className="w-8 h-8 rounded-full bg-[#faf5e4] flex items-center justify-center text-[#004445] group-hover:bg-[#004445] group-hover:text-white transition-all">
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
