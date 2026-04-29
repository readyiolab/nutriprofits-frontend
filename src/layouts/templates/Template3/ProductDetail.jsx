import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Check, Star, Package, Zap, Shield, ArrowRight } from "lucide-react";
import { products } from "../../../data/products";

const ProductDetail = () => {
  const { productId, templateId } = useParams();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("benefits");

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fcfaf2] flex items-center justify-center font-serif">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-medium text-[#5c4033]">Product Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-12 py-4 bg-[#5c4033] text-white rounded-full hover:bg-[#7d8f69] transition-all duration-500 uppercase tracking-widest text-xs font-bold"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf2] font-serif selection:bg-[#7d8f69] selection:text-white overflow-x-hidden">
      {/* Organic Shapes Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#7d8f69]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-[30rem] h-[30rem] bg-[#d4a373]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#5c4033]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        {/* Editorial Top Bar */}
        <header className="container mx-auto px-6 py-10 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-4 text-[#5c4033] hover:text-[#7d8f69] transition-all group"
          >
            <div className="w-12 h-12 rounded-full border border-[#5c4033]/10 flex items-center justify-center group-hover:bg-[#7d8f69] group-hover:text-white transition-all duration-500">
               <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-widest text-[10px] uppercase">Back to Collection</span>
          </button>
          
          <div className="hidden md:block">
             <div className="flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5c4033]/40">
                <span className="text-[#7d8f69]">Composition</span>
                <span>Provenance</span>
                <span>Ethos</span>
             </div>
          </div>

          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`w-12 h-12 rounded-full border border-[#5c4033]/10 flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-50 text-red-500 border-red-100' : 'text-[#5c4033] hover:bg-white'}`}
          >
             <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </header>

        <main className="container mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
            
            {/* Left Column: The Visual Story */}
            <div className="lg:col-span-6">
              <div className="lg:sticky lg:top-12 space-y-12">
                <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden bg-white shadow-2xl shadow-[#5c4033]/5 group">
                  <div className="absolute inset-0 bg-[#7d8f69]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-12 lg:p-20 transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/600")}
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-10 left-10">
                     <div className="bg-[#fcfaf2]/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 text-[10px] font-bold text-[#7d8f69] uppercase tracking-widest">
                        100% Organic Origin
                     </div>
                  </div>
                </div>

                {/* Trust Signifiers */}
                <div className="grid grid-cols-3 gap-8 px-4">
                   {[
                     { icon: <Package className="w-5 h-5" />, label: 'Eco Packaging' },
                     { icon: <Shield className="w-5 h-5" />, label: 'Purity Tested' },
                     { icon: <Zap className="w-5 h-5" />, label: 'Fast Transit' }
                   ].map((item, i) => (
                     <div key={i} className="text-center space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-white mx-auto flex items-center justify-center text-[#d4a373] shadow-sm">
                           {item.icon}
                        </div>
                        <p className="text-[9px] font-bold text-[#5c4033]/60 uppercase tracking-widest">{item.label}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Right Column: The Details */}
            <div className="lg:col-span-6 space-y-16">
              <div className="space-y-8">
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <span className="w-12 h-px bg-[#d4a373]"></span>
                      <span className="text-[#d4a373] font-bold text-[10px] uppercase tracking-[0.4em]">{product.category}</span>
                   </div>
                   <h1 className="text-5xl lg:text-7xl font-medium text-[#5c4033] leading-[1.1] font-serif">
                     {product.name}
                   </h1>
                </div>

                <div className="flex items-center gap-6">
                   <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#d4a373] fill-current" />
                      ))}
                   </div>
                   <span className="h-4 w-px bg-[#5c4033]/10"></span>
                   <span className="text-xs font-bold text-[#5c4033]/40 uppercase tracking-widest">4.9 Efficiency Rating</span>
                </div>

                <p className="text-2xl text-[#5c4033]/70 font-light leading-relaxed italic border-l-4 border-[#7d8f69]/20 pl-8">
                  {product.fullDescription || product.description}
                </p>
              </div>

              {/* Functional Content Tabs */}
              <div className="space-y-10">
                <div className="flex items-center gap-12 border-b border-[#5c4033]/5 pb-1">
                   {['benefits', 'ingredients'].map(tab => (
                     <button
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                         activeTab === tab ? 'text-[#7d8f69]' : 'text-[#5c4033]/30 hover:text-[#5c4033]'
                       }`}
                     >
                       {tab}
                       {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7d8f69]"></div>}
                     </button>
                   ))}
                </div>

                <div className="min-h-[400px]">
                   {activeTab === 'benefits' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.benefits.map((benefit, idx) => (
                          <div key={idx} className="group p-8 rounded-[2rem] bg-white border border-[#5c4033]/5 hover:border-[#7d8f69]/20 transition-all hover:shadow-xl hover:shadow-[#5c4033]/5">
                             <div className="w-10 h-10 rounded-full bg-[#fcfaf2] flex items-center justify-center text-[#7d8f69] mb-6 group-hover:bg-[#7d8f69] group-hover:text-white transition-all duration-500">
                                <Check className="w-5 h-5" />
                             </div>
                             <p className="text-[#5c4033] font-bold leading-snug">{benefit}</p>
                          </div>
                        ))}
                     </div>
                   )}

                   {activeTab === 'ingredients' && (
                     <div className="space-y-6">
                        {product.ingredients.map((ingredient, idx) => (
                          <div key={idx} className="flex items-center gap-8 p-8 rounded-[2.5rem] bg-white border border-[#5c4033]/5 group hover:shadow-2xl transition-all">
                             <div className="flex-shrink-0 w-24 h-24 rounded-3xl bg-[#fcfaf2] p-4 flex items-center justify-center border border-[#5c4033]/5 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <img src={ingredient.image} alt={ingredient.name} className="w-full h-full object-contain" />
                             </div>
                             <div>
                                <h4 className="text-xl font-medium text-[#5c4033] mb-2">{ingredient.name}</h4>
                                <p className="text-sm text-[#5c4033]/60 leading-relaxed">{ingredient.description}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                   )}
                </div>
              </div>

              {/* Elevated CTA Section */}
              <div className="pt-12">
                <div className="bg-[#5c4033] rounded-[3rem] p-10 lg:p-12 text-center space-y-8 shadow-2xl shadow-[#5c4033]/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#7d8f69]/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                  
                  <div className="space-y-2 relative z-10">
                     <p className="text-[#d4a373] font-bold text-[10px] uppercase tracking-[0.4em]">Experience Nature's Best</p>
                     <h3 className="text-white text-3xl font-medium">{product.name}</h3>
                  </div>

                  <a 
                    href={product.buyLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-4 w-full bg-[#fcfaf2] text-[#5c4033] py-6 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#7d8f69] hover:text-white transition-all duration-500 shadow-xl group/btn"
                  >
                    Complete Purchase <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </a>
                  
                  <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest relative z-10">Secured via encrypted node protocol</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Narrative Sections - Immersive Full Width Design */}
        {product.sections && product.sections.length > 0 && (
          <div className="mt-32 space-y-40 mb-40">
            {product.sections.map((section, idx) => (
              <section key={idx} className="container mx-auto px-6">
                <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20 lg:gap-32`}>
                   <div className="flex-1 space-y-10">
                      <div className="space-y-6">
                         <div className="flex items-center gap-4">
                            <span className="text-[#7d8f69] font-serif italic text-4xl">0{idx + 1}</span>
                            <div className="flex-1 h-px bg-[#5c4033]/10"></div>
                         </div>
                         <h2 className="text-4xl md:text-6xl font-medium text-[#5c4033] leading-tight font-serif italic">
                           {section.title}
                         </h2>
                      </div>
                      <p className="text-2xl text-[#5c4033]/60 font-light leading-relaxed">
                        {section.description}
                      </p>
                      <button className="text-[#7d8f69] font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 hover:gap-6 transition-all">
                         Discover Provenance <ArrowRight className="w-4 h-4" />
                      </button>
                   </div>
                   <div className="flex-1 w-full">
                      <div className="relative">
                         <div className="absolute -inset-10 bg-[#d4a373]/5 rounded-full blur-[100px]"></div>
                         <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden shadow-3xl border-8 border-white group">
                            <img 
                              src={section.image} 
                              alt={section.title} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-in-out"
                              onError={(e) => { e.target.closest('.flex').style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 bg-[#5c4033]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                         </div>
                      </div>
                   </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Editorial Recommendation Grid (Related Products) */}
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
          
          if (relatedProducts.length === 0) return null;
          
          return (
            <section className="bg-white py-32 rounded-t-[5rem] lg:rounded-t-[10rem]">
              <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                   <div className="max-w-2xl space-y-6">
                      <h2 className="text-5xl lg:text-7xl font-medium text-[#5c4033] font-serif">A Natural<br/>Continuum</h2>
                      <p className="text-[#5c4033]/40 text-xs font-bold uppercase tracking-[0.4em]">Suggested Harmonious Integrations</p>
                   </div>
                   <button 
                    onClick={() => navigate(`/template/${templateId}/products`)}
                    className="bg-[#fcfaf2] text-[#5c4033] px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#5c4033] hover:text-white transition-all duration-500 shadow-xl"
                   >
                     The Full Catalog
                   </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                  {relatedProducts.map((rp) => (
                    <div
                      key={rp.id}
                      onClick={() => navigate(`/template/${templateId}/products/${rp.id}`)}
                      className="group cursor-pointer space-y-8"
                    >
                      <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-[#fcfaf2] border border-[#5c4033]/5 group-hover:shadow-3xl transition-all duration-700">
                        <img
                          src={rp.image}
                          alt={rp.name}
                          className="w-full h-full object-contain p-12 transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400.png?text=Product"; }}
                        />
                        <div className="absolute top-6 right-6 px-4 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black text-[#5c4033] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                           {rp.category}
                        </div>
                      </div>
                      
                      <div className="space-y-4 px-2">
                        <h3 className="text-2xl font-medium text-[#5c4033] font-serif group-hover:text-[#7d8f69] transition-colors leading-tight">
                          {rp.name}
                        </h3>
                        <div className="flex items-center gap-4 text-[9px] font-black text-[#5c4033]/30 uppercase tracking-[0.3em] group-hover:text-[#5c4033] transition-colors">
                           View Details <div className="w-6 h-px bg-current group-hover:w-10 transition-all"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}
      </div>
    </div>
  );
};

export default ProductDetail;
