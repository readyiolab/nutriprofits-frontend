import { Dot, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../../data/products";

const ProductDetail = () => {
  const { productId, templateId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const onBack = () => {
    navigate(`/template/${templateId}/products`);
  };

  // Find product by ID from URL parameter
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf5e4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#004445] mb-4">
            Product Not Found
          </h1>
          <button
            onClick={onBack}
            className="bg-[#004445] text-white px-8 py-3 rounded-lg hover:bg-[#2c786c] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf5e4] selection:bg-[#f8b400] selection:text-[#004445] overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#004445" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-[#004445] hover:text-[#2c786c] font-bold uppercase tracking-widest text-xs transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-[#004445]/20 flex items-center justify-center group-hover:bg-[#004445] group-hover:text-[#faf5e4] transition-all">
              ←
            </div>
            Back to Catalog
          </button>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#004445]/40">
            <span>Product</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f8b400]"></span>
            <span>Detail</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          {/* LEFT SIDE - VISUALS */}
          <div className="lg:col-span-5 xl:col-span-6">
            <div className="lg:sticky lg:top-8 space-y-8">
              <div className="relative aspect-square bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white p-12 flex items-center justify-center shadow-2xl shadow-[#004445]/5 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f8b400]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x500?text=Product";
                  }}
                />
                
                {/* Floating Tags */}
                <div className="absolute top-8 left-8">
                   <div className="bg-[#004445] text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl">
                      Premium Quality
                   </div>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-3 gap-4">
                 {[
                   { label: 'Natural', value: '100%', icon: '🌿' },
                   { label: 'Safety', value: 'Tested', icon: '🛡️' },
                   { label: 'Form', value: 'Capsules', icon: '💊' }
                 ].map((spec, i) => (
                   <div key={i} className="bg-white/40 backdrop-blur-sm border border-white p-4 rounded-3xl text-center hover:bg-[#f8b400]/10 transition-colors">
                      <div className="text-xl mb-1">{spec.icon}</div>
                      <div className="text-[10px] font-bold text-[#004445]/60 uppercase tracking-tighter">{spec.label}</div>
                      <div className="text-sm font-black text-[#004445]">{spec.value}</div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CORE INFO */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-[#f8b400]"></span>
                  <span className="text-[#f8b400] font-black uppercase tracking-[0.3em] text-[10px]">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium text-[#004445] leading-[1.1]">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-6 py-4 border-y border-[#004445]/5">
                <div className="flex items-center gap-1">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={`w-3 h-3 rounded-full ${i < 4 ? 'bg-[#f8b400]' : 'bg-[#004445]/10'}`}></div>
                   ))}
                </div>
                <span className="text-xs font-bold text-[#004445]/60 uppercase tracking-widest">4.8 / 5.0 (2.4k Reviews)</span>
              </div>

              <p className="text-lg text-[#004445]/80 leading-relaxed font-serif italic">
                "{product.fullDescription || product.description}"
              </p>
            </div>

            {/* Content Blocks - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Highlights */}
               {product.highlights && product.highlights.length > 0 && (
                 <div className="space-y-6">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#004445] pb-2 border-b-2 border-[#f8b400]">
                     Key Features
                   </h3>
                   <ul className="space-y-4">
                     {product.highlights.map((highlight, idx) => (
                       <li key={idx} className="flex items-start gap-3">
                         <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f8b400] flex-shrink-0"></div>
                         <span className="text-sm text-[#004445]/80 font-medium leading-relaxed">
                           {highlight}
                         </span>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}

               {/* Benefits */}
               {product.benefits && product.benefits.length > 0 && (
                 <div className="space-y-6">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#004445] pb-2 border-b-2 border-[#f8b400]">
                     Main Benefits
                   </h3>
                   <div className="space-y-3">
                     {product.benefits.map((benefit, idx) => (
                       <div key={idx} className="bg-white/50 border border-white p-3 rounded-2xl flex items-center gap-3 hover:shadow-lg hover:shadow-[#004445]/5 transition-all">
                         <div className="w-6 h-6 rounded-lg bg-[#004445] text-[#f8b400] flex items-center justify-center text-[10px] font-bold">
                           ✓
                         </div>
                         <span className="text-sm font-bold text-[#004445]">{benefit}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
            </div>

            {/* Ingredients - Full Width within Content */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-8 pt-8">
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-medium text-[#004445]">Core Ingredients</h3>
                  <span className="text-[10px] font-bold text-[#004445]/40 uppercase tracking-widest">{product.ingredients.length} Active Elements</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {product.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="group bg-white p-5 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:border-[#f8b400]/30 transition-all flex items-center gap-6">
                      {ingredient.image && (
                        <div className="flex-shrink-0 w-20 h-20 bg-[#faf5e4] rounded-2xl p-2 flex items-center justify-center overflow-hidden border border-[#004445]/5 group-hover:scale-105 transition-transform">
                          <img 
                            src={ingredient.image} 
                            alt={ingredient.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-[#004445] mb-1 flex items-center gap-2">
                          {ingredient.name}
                        </h4>
                        <p className="text-[#004445]/60 text-xs leading-relaxed line-clamp-2">
                          {ingredient.description}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-[#004445]/10 flex items-center justify-center text-[#004445]/20 group-hover:text-[#f8b400] group-hover:border-[#f8b400]/30 transition-all">
                         +
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Bar */}
            <div className="sticky bottom-8 z-50 pt-8">
               <div className="bg-[#004445] p-2 rounded-[2rem] shadow-2xl flex items-center gap-4 border-4 border-[#f8b400]">
                  <div className="flex-1 pl-8 hidden sm:block">
                     <div className="text-[10px] font-bold text-[#f8b400] uppercase tracking-[0.2em]">Ready to order?</div>
                     <div className="text-white font-bold">{product.name}</div>
                  </div>
                  <a
                    href={product.buyLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-3 bg-[#f8b400] text-[#004445] px-10 py-4 rounded-full cursor-pointer font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-xl active:scale-95"
                  >
                    Buy Now <ArrowRight className="w-4 h-4" />
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* Storytelling Sections - Alternating & Full Width Backgrounds */}
        {product.sections && product.sections.length > 0 && (
          <div className="mt-40 space-y-40">
            {product.sections.map((section, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}
              >
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className="text-[#f8b400] font-black text-6xl opacity-20 font-serif">0{idx + 1}</div>
                    <h2 className="text-4xl md:text-5xl font-medium text-[#004445] leading-[1.1]">
                      {section.title}
                    </h2>
                    <div className="w-24 h-2 bg-[#f8b400] rounded-full"></div>
                  </div>
                  <p className="text-xl text-[#004445]/70 leading-relaxed font-light">
                    {section.description}
                  </p>
                  <button className="text-[#004445] font-bold uppercase tracking-widest text-xs flex items-center gap-2 group cursor-pointer">
                     Learn the science <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
                <div className="flex-1 w-full max-w-[600px]">
                  <div className="relative group">
                    <div className="absolute -inset-8 bg-[#f8b400]/5 rounded-[4rem] blur-3xl group-hover:bg-[#f8b400]/10 transition-all duration-700"></div>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[3.5rem] shadow-2xl border border-white">
                      <img 
                        src={section.image} 
                        alt={section.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                        onError={(e) => { e.target.closest('.flex').style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#004445]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Related Products */}
        {(() => {
          let relatedProducts = products
            .filter(p => p.category === product.category && p.id !== product.id);

          if (relatedProducts.length < 4) {
            const otherProducts = products
              .filter(p => p.category !== product.category && p.id !== product.id)
              .slice(0, 4 - relatedProducts.length);
            relatedProducts = [...relatedProducts, ...otherProducts];
          }
          
          relatedProducts = relatedProducts.slice(0, 4);
          
          return (
            <div className="mt-40 border-t-4 border-[#004445] pt-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-medium text-[#004445]">Related Solutions</h2>
                  <p className="text-[#004445]/60 uppercase tracking-[0.2em] font-bold text-xs">Based on your current interest</p>
                </div>
                <div className="w-20 h-px bg-[#004445]/20 hidden md:block flex-1 mx-12"></div>
                <button 
                  onClick={() => navigate(`/template/${templateId}/products`)}
                  className="bg-[#004445] text-[#f8b400] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#2c786c] transition-all cursor-pointer"
                >
                  View All Products
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((rp) => (
                  <div
                    key={rp.id}
                    onClick={() => navigate(`/template/${templateId}/products/${rp.id}`)}
                    className="group bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-white hover:border-[#f8b400] hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer overflow-hidden relative"
                  >
                    <div className="h-64 relative p-8 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#faf5e4] to-transparent opacity-50"></div>
                      <img
                        src={rp.image}
                        alt={rp.name}
                        className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                        }}
                      />
                      <span className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-[#004445] uppercase tracking-widest">
                        {rp.category}
                      </span>
                    </div>
                    <div className="p-8 pt-0 flex flex-col flex-grow relative z-10">
                      <h3 className="font-bold text-xl text-[#004445] mb-6 line-clamp-2 leading-tight">
                        {rp.name}
                      </h3>
                      <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#004445]/5">
                        <span className="text-[10px] font-black text-[#004445] uppercase tracking-widest">Explore Details</span>
                        <div className="w-12 h-12 rounded-full bg-[#004445] text-[#f8b400] flex items-center justify-center group-hover:bg-[#f8b400] group-hover:text-[#004445] transition-all duration-500 shadow-xl">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default ProductDetail;
