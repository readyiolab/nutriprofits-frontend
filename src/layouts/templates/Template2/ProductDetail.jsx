import {
  ArrowLeft,
  Star,
  Check,
  Shield,
  Zap,
  Heart,
  Share2,
  ShoppingBag,
  Dot,
  ArrowRight,
  Sparkles,
  Minus,
  Plus,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../../data/products";

const ProductDetailTemplate2 = () => {
  const { productId, templateId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("highlights");
  const [quantity, setQuantity] = useState(1);

  const onBack = () => {
    navigate(`/template/${templateId}/products`);
  };

  // Products data imported from central data file
  const product = products.find((p) => p.id === parseInt(productId));

  const tabs = ["highlights", "benefits", "ingredients"];

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-600 to-blue-900 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-t2-body overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* High-Tech Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={onBack}
              className="group flex items-center gap-3 text-slate-500 hover:text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Laboratory
            </button>
            <div className="hidden md:flex items-center gap-8">
               {['Overview', 'Analysis', 'Composition', 'Mechanism'].map(item => (
                 <span key={item} className="text-[9px] font-black uppercase tracking-widest text-slate-300 hover:text-emerald-500 cursor-pointer transition-colors">{item}</span>
               ))}
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-pulse">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Split Layout */}
        <section className="relative pt-12 pb-24 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Image Side - Analysis View */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative rounded-[4rem] bg-white border border-slate-100 p-12 lg:p-20 shadow-2xl shadow-slate-200/50 group overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                       <Sparkles className="w-6 h-6 text-emerald-500/20" />
                    </div>
                    
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-1000 ease-out drop-shadow-2xl"
                    />

                    {/* Scanning Line Animation */}
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent top-0 animate-[scan_3s_linear_infinite] pointer-events-none"></div>
                  </div>

                  {/* Feature Summary Tags */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                     <div className="bg-slate-900 p-5 rounded-3xl text-white shadow-xl">
                        <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-sm font-black">Clinical Grade A+</p>
                     </div>
                     <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-lg">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Batch</p>
                        <p className="text-sm font-black text-slate-900">v2.0 Certified</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Info Side - Technical Specs */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                    {product.category}
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 font-t2-heading tracking-tight leading-[0.95]">
                    {product.name}<span className="text-emerald-500">.</span>
                  </h1>

                  <div className="flex items-center gap-8 py-4">
                     <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className={`w-1.5 h-6 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                        ))}
                     </div>
                     <div className="space-y-1">
                        <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Efficacy Rating</div>
                        <div className="text-xs text-slate-400 font-bold">98% Satisfaction Based on Clinical Data</div>
                     </div>
                  </div>

                  <p className="text-xl text-slate-500 font-light leading-relaxed max-w-xl">
                    {product.fullDescription || product.description}
                  </p>
                </div>

                {/* Tabbed Technical Data */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="flex border-b border-slate-100 bg-slate-50/50">
                    {tabs.map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                          activeTab === tab ? "text-emerald-600 bg-white" : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="p-8 lg:p-12 min-h-[400px]">
                    {activeTab === "highlights" && product.highlights && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.highlights.map((highlight, idx) => (
                          <div key={idx} className="group p-6 rounded-3xl bg-slate-50 border border-transparent hover:border-emerald-200 transition-all">
                             <div className="flex items-center gap-4 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-500 font-bold text-xs">
                                   0{idx+1}
                                </div>
                                <div className="h-px flex-1 bg-slate-200"></div>
                             </div>
                             <p className="text-slate-600 text-sm font-medium leading-relaxed">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "benefits" && product.benefits && (
                      <div className="space-y-4">
                        {product.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center justify-between p-6 rounded-3xl bg-white border border-slate-100 hover:shadow-lg transition-all group">
                             <div className="flex items-center gap-6">
                                <Zap className="w-5 h-5 text-emerald-500 group-hover:animate-bounce" />
                                <span className="text-slate-900 font-bold">{benefit}</span>
                             </div>
                             <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-emerald-500 transition-colors" />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "ingredients" && product.ingredients && (
                      <div className="grid grid-cols-1 gap-4">
                        {product.ingredients.map((ingredient, idx) => (
                          <div key={idx} className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-emerald-100 hover:shadow-xl transition-all group">
                             {ingredient.image ? (
                               <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                                  <img src={ingredient.image} alt={ingredient.name} className="w-full h-full object-contain" />
                               </div>
                             ) : (
                               <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-xl">
                                  {ingredient.name.charAt(0)}
                               </div>
                             )}
                             <div>
                                <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-1">{ingredient.name}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed max-w-md">{ingredient.description}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Technical Purchase Bar */}
                <div className="pt-8">
                   <div className="flex flex-col sm:flex-row items-center gap-6">
                      <a
                        href={product.buyLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 w-full flex items-center justify-between px-10 py-8 rounded-[2.5rem] bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-emerald-500/40 hover:bg-emerald-700 transition-all hover:-translate-y-1 active:translate-y-0"
                      >
                        Initiate Secure Acquisition
                        <ShoppingBag className="w-5 h-5" />
                      </a>
                      <div className="px-10 py-8 rounded-[2.5rem] border border-slate-200 bg-white flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-emerald-500" />
                         </div>
                         <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                            Guaranteed<br/>Security
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Mechanism of Action (Story Sections) */}
        {product.sections && product.sections.length > 0 && (
          <section className="py-32 bg-slate-950 relative overflow-hidden rounded-t-[5rem] lg:rounded-t-[10rem]">
            {/* Dark Mode Accents */}
            <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-emerald-600/10 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-teal-600/10 rounded-full blur-[150px]"></div>

            <div className="container mx-auto px-4">
              <div className="text-center mb-32 space-y-4">
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em]">Mode of Action</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white font-t2-heading tracking-tight">Biological Integration</h2>
              </div>

              <div className="space-y-40">
                {product.sections.map((section, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20 lg:gap-32`}
                  >
                    <div className="flex-1 space-y-8">
                      <div className="space-y-6">
                        <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white font-t2-heading tracking-tight leading-tight">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-xl text-slate-400 font-light leading-relaxed">
                        {section.description}
                      </p>
                      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                         <div>
                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2">Efficiency</p>
                            <p className="text-2xl font-bold text-white">99.9%</p>
                         </div>
                         <div>
                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2">Integration</p>
                            <p className="text-2xl font-bold text-white">Cellular</p>
                         </div>
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative aspect-video lg:aspect-square rounded-[4rem] overflow-hidden border border-white/10 bg-slate-900 shadow-3xl">
                          <img 
                            src={section.image} 
                            alt={section.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out opacity-80 group-hover:opacity-100"
                            onError={(e) => { e.target.closest('.flex').style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                          
                          {/* Floating Tech Overlay */}
                          <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl max-w-[200px]">
                             <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-2">Micro-Analysis</p>
                             <div className="h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-3/4"></div>
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technical Recommendations (Related Products) */}
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
            <section className="py-32 bg-white">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                  <div>
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Optimization Engine</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-t2-heading tracking-tight leading-tight">Complete System Routine</h2>
                  </div>
                  <div className="hidden lg:block h-px flex-1 bg-slate-100 mx-20"></div>
                  <button 
                    onClick={() => navigate(`/template/${templateId}/products`)}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-emerald-500 pb-2 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    View Complete Lab Inventory
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {relatedProducts.map((rp) => (
                    <div
                      key={rp.id}
                      onClick={() => navigate(`/template/${templateId}/products/${rp.id}`)}
                      className="group flex flex-col h-full cursor-pointer"
                    >
                      <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-slate-100 bg-slate-50 mb-8 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-500/10 group-hover:-translate-y-2">
                        <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"></div>
                        <div className="p-12 h-full flex items-center justify-center">
                          <img
                            src={rp.image}
                            alt={rp.name}
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/400x400.png?text=Product"; }}
                          />
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-white shadow-xl">
                           <div className="flex justify-between items-center">
                              <span className="text-[8px] font-black text-slate-900 uppercase tracking-widest">Protocol {rp.id}</span>
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                           </div>
                        </div>
                      </div>
                      
                      <div className="px-2 space-y-4">
                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors font-t2-heading">
                          {rp.name}
                        </h3>
                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors">
                           View Analysis <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
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

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(500px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailTemplate2;