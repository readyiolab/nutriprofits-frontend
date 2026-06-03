import {
  ArrowLeft,
  Check,
  ShoppingBag,
  ArrowRight,
  Leaf,
  ChevronRight,
  Shield,
  Award,
  Truck,
  Star,
  Sparkles,
  FlaskConical,
} from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../../data/products";

const ProductDetailTemplate2 = () => {
  const { productId, templateId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("highlights");
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const onBack = () => {
    navigate(`/template/${templateId}/products`);
  };

  const product = products.find((p) => p.id === parseInt(productId));
  const tabs = ["highlights", "benefits", "ingredients"];

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-800">Product Not Found</h1>
          <p className="text-slate-500">The product you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Generate realistic gallery mockups by repeating product.image or using related placeholders
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&q=80", // Premium jar/pill mock
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&q=80", // Lab grade check
  ].slice(0, 3);

  // Related products
  let relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  if (relatedProducts.length < 4) {
    const otherProducts = products
      .filter((p) => p.category !== product.category && p.id !== product.id)
      .slice(0, 4 - relatedProducts.length);
    relatedProducts = [...relatedProducts, ...otherProducts];
  }
  relatedProducts = relatedProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body pt-20">
      {/* ─── Breadcrumb ─── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs text-slate-400">
          <span
            className="hover:text-emerald-600 cursor-pointer transition-colors"
            onClick={() => navigate(`/template/${templateId}`)}
          >
            Home
          </span>
          <ChevronRight className="w-3 h-3" />
          <span
            className="hover:text-emerald-600 cursor-pointer transition-colors"
            onClick={() => navigate(`/template/${templateId}/products`)}
          >
            Products
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer mb-6 text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </button>

        {/* ─── Product Details Card ─── */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT - Image Gallery Panel */}
            <div className="p-6 md:p-8 flex flex-col items-center justify-center border-r border-slate-100 bg-slate-50/40">
              <div className="relative aspect-square w-full max-w-[360px] bg-white rounded-2xl border border-slate-200/50 p-6 flex items-center justify-center shadow-sm">
                {product.category && (
                  <span className="absolute top-4 left-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                    {product.category}
                  </span>
                )}
                <img
                  src={galleryImages[activeImageIdx] || product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300 transform"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x500?text=Product";
                  }}
                />
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-3 mt-4">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 rounded-xl border p-2 flex items-center justify-center bg-white transition-all overflow-hidden ${
                      activeImageIdx === idx
                        ? "border-emerald-600 ring-2 ring-emerald-500/10 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100?text=P";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT - Conversion-Focused Product Info */}
            <div className="p-8 md:p-10 flex flex-col justify-center space-y-6">
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 5)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-slate-500 ml-1">
                    {product.rating || "4.9"} (Laboratory Tested)
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight font-t2-heading">
                  {product.name}
                </h1>
              </div>

              {/* Pricing Panel */}
              <div className="py-4 px-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Suggested Retail Price</p>
                  <p className="text-2xl font-extrabold text-slate-900 font-t2-heading">
                    {product.price || "$39.90"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                {product.fullDescription || product.description}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100">
                {[
                  { icon: <Shield className="w-5 h-5 text-emerald-600" />, title: "Quality Tested", desc: "100% Pure" },
                  { icon: <Award className="w-5 h-5 text-emerald-600" />, title: "GMP Certified", desc: "Certified Facility" },
                  { icon: <FlaskConical className="w-5 h-5 text-emerald-600" />, title: "Lab Verified", desc: "Clean Ingredients" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-slate-50/50 rounded-xl border border-slate-100/50">
                    <div className="flex justify-center mb-1.5">{item.icon}</div>
                    <p className="text-slate-800 text-[11px] font-bold font-t2-heading">{item.title}</p>
                    <p className="text-slate-400 text-[9px]">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA and shipping details */}
              <div className="space-y-3">
                <a
                  href={product.buyLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transform hover:-translate-y-0.5 active:translate-y-0 text-center uppercase tracking-wider"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now & Secure Order
                </a>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>Ships within 24 hours. Free shipping for orders over $50.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Specification Tabs ─── */}
        <div className="mb-16">
          {/* Centered pill tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-slate-100 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-transparent text-slate-500 border border-transparent hover:border-slate-200 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto min-h-[180px]">
            {activeTab === "highlights" && product.highlights && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200/50 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed pt-0.5">{highlight}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "benefits" && product.benefits && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200/50 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed pt-0.5">{benefit}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "ingredients" && product.ingredients && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.ingredients.map((ingredient, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200/50 transition-all"
                  >
                    {ingredient.image ? (
                      <div className="w-12 h-12 rounded-lg bg-slate-50 p-2 flex items-center justify-center flex-shrink-0 border border-slate-100">
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <Leaf className="w-4 h-4 text-emerald-600" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 font-t2-heading">{ingredient.name}</h4>
                      {ingredient.description && (
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {ingredient.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─── Story Sections ─── */}
        {product.sections && product.sections.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">
                Proven Formulations
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 font-t2-heading">
                Scientific Benefits of {product.name}
              </h2>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              {product.sections.map((section, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/50">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80";
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-3">
                    <div className="w-8 h-1 bg-emerald-500 rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 font-t2-heading leading-snug">
                      {section.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Related Products ─── */}
      {relatedProducts.length > 0 && (
        <section className="bg-white border-t border-slate-100 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                  Synergistic Health
                </span>
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-t2-heading">
                  Related Products
                </h2>
              </div>
              <button
                onClick={() => navigate(`/template/${templateId}/products`)}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <div
                  key={rp.id}
                  onClick={() => navigate(`/template/${templateId}/products/${rp.id}`)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-500/10 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="aspect-square p-6 flex items-center justify-center bg-slate-50/50">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                      }}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      {rp.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 mt-1 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug font-t2-heading flex-1">
                      {rp.name}
                    </h3>
                    <button className="mt-3 w-full py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white transition-all flex items-center justify-center gap-1.5">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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

export default ProductDetailTemplate2;