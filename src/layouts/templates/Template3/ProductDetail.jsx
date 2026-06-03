import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Heart, Check, Star, ArrowRight, Leaf, ChevronRight, ShoppingBag } from "lucide-react";
import { products } from "../../../data/products";

const ProductDetail = () => {
  const { productId, templateId } = useParams();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("benefits");

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#eeeeee] flex items-center justify-center pt-24">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-[#303841] font-t3-heading">Product Not Found</h1>
          <p className="text-gray-500">This product doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-[#303841] text-white hover:bg-[#d72323] transition-colors text-sm font-bold uppercase tracking-wider"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Related products
  let relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id);
  if (relatedProducts.length < 4) {
    const otherProducts = products
      .filter((p) => p.category !== product.category && p.id !== product.id)
      .slice(0, 4 - relatedProducts.length);
    relatedProducts = [...relatedProducts, ...otherProducts];
  }
  relatedProducts = relatedProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#eeeeee] overflow-x-hidden font-t3-body pt-8">
      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20">
        
        {/* Amazon-style Breadcrumbs & Back controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-gray-500 uppercase font-mono tracking-wider">
          <div className="flex items-center gap-2">
            <Link to={`/template/${templateId}`} className="hover:text-[#d72323] transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/template/${templateId}/products`} className="hover:text-[#d72323] transition-colors">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#303841] font-bold">{product.name}</span>
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

          {/* Image Column */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border-l-4 border-[#d72323]">
              <div className="aspect-square flex items-center justify-center p-10 lg:p-16">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/600")}
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

          {/* Details Column */}
          <div className="space-y-8 lg:pt-4">
            {/* Category & Name */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-block text-xs font-semibold text-[#d72323] bg-[#d72323]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                
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
                {product.name}
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
              {product.fullDescription || product.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-200"></div>

            {/* Tabs */}
            <div>
              <div className="flex gap-1 border-b border-gray-200">
                {["benefits", "ingredients"].map((tab) => (
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
                {activeTab === "benefits" && product.benefits && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#d72323]/20 transition-colors shadow-sm"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#d72323]/10 text-[#d72323] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm text-[#3a4750] leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "ingredients" && product.ingredients && (
                  <div className="space-y-3">
                    {product.ingredients.map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#d72323]/20 transition-colors shadow-sm"
                      >
                        {ingredient.image ? (
                          <div className="w-14 h-14 rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-gray-200 flex-shrink-0">
                            <img
                              src={ingredient.image}
                              alt={ingredient.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-[#d72323]/10 flex items-center justify-center flex-shrink-0">
                            <Leaf className="w-5 h-5 text-[#d72323]" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[#303841] uppercase tracking-wide">{ingredient.name}</h4>
                          {ingredient.description && (
                            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{ingredient.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href={product.buyLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#d72323] text-white py-4 px-8 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[#b91c1c] transition-all shadow-md shadow-[#d72323]/10 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border-b-4 border-[#8b1a1a]"
              >
                Buy Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-center text-[10px] font-mono text-gray-400 mt-4 uppercase tracking-[0.2em]">Affiliate Security System // End-to-End Encrypted</p>
            </div>
          </div>
        </div>
      </main>

      {/* Story Sections */}
      {product.sections && product.sections.length > 0 && (
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#303841] font-t3-heading uppercase tracking-wide">
                The Story Behind {product.name}
              </h2>
            </div>

            <div className="space-y-20">
              {product.sections.map((section, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-12 lg:gap-20`}
                >
                  <div className="flex-1 space-y-5">
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#303841] font-t3-heading leading-tight uppercase">
                      {section.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed font-light">
                      {section.description}
                    </p>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-50 border border-gray-200">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.closest("div").style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-[#eeeeee] border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-bold text-[#d72323] uppercase tracking-wider mb-2">Explore More</p>
                <h2 className="text-3xl font-bold text-[#303841] font-t3-heading uppercase tracking-wide">You Might Also Like</h2>
              </div>
              <button
                onClick={() => navigate(`/template/${templateId}/products`)}
                className="hidden md:flex items-center gap-2 text-xs font-bold text-[#d72323] hover:text-[#303841] transition-colors cursor-pointer uppercase tracking-wider"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <div
                  key={rp.id}
                  onClick={() => navigate(`/template/${templateId}/products/${rp.id}`)}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#d72323]/20 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  <div className="aspect-square p-6 flex items-center justify-center bg-slate-50/50">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                      }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-[#d72323] uppercase tracking-wider mb-1">{rp.category}</p>
                      <h3 className="text-base font-bold text-[#303841] group-hover:text-[#d72323] transition-colors line-clamp-2 leading-snug uppercase">
                        {rp.name}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#303841]/50 group-hover:text-[#d72323] transition-colors uppercase tracking-wider">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
