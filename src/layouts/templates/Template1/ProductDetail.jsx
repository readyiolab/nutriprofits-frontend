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
    <div className="min-h-screen bg-[#faf5e4] py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center justify-center cursor-pointer gap-2 text-[#004445] hover:text-[#2c786c] font-semibold mb-8 transition-colors"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE - STICKY IMAGE */}
          <div className="lg:sticky lg:top-8 h-fit flex justify-center">
            <div className="w-full max-w-[400px] aspect-square flex items-center justify-center p-8">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/500x500?text=Product";
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
                  <span className="inline-block bg-[#f8b400] text-[#004445] px-4 py-1 rounded-full text-sm font-medium mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-medium text-[#004445] mb-2">
                    {product.name}
                  </h1>
                </div>
              </div>

              <p className="text-md text-gray-700 leading-relaxed mb-4">
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-[#004445] mb-6">
                  Key Highlights
                </h3>
                <ul className="space-y-4">
                  {product.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1 font-bold">
                        <Dot />
                      </div>
                      <span className="text-gray-700 leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-[#004445] mb-6">
                  Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3  ">
                      <span className=" font-bold text-lg flex-shrink-0">
                        <Dot />
                      </span>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-[#004445] mb-6">
                  Key Ingredients
                </h3>
                <div className="space-y-4">
                  {product.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="pb-6 border-b last:border-b-0 flex flex-col sm:flex-row gap-6">
                      {ingredient.image && (
                        <div className="flex-shrink-0 w-32 h-32 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center justify-center">
                          <img 
                            src={ingredient.image} 
                            alt={ingredient.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-lg text-[#004445] mb-2 flex items-center gap-2">
                          <Dot className="text-[#f8b400]" /> {ingredient.name}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {ingredient.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alternating Sections */}
        {product.sections && product.sections.length > 0 && (
          <div className="mt-24 space-y-24">
            {product.sections.map((section, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#004445] leading-tight">
                    {section.title}
                  </h2>
                  <div className="w-20 h-1.5 bg-[#f8b400] rounded-full"></div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="flex-1 w-full max-w-[500px]">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-[#f8b400]/10 rounded-[2rem] blur-2xl group-hover:bg-[#f8b400]/20 transition-all duration-500"></div>
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="relative w-full aspect-video md:aspect-square object-cover rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                      onError={(e) => { e.target.closest('.flex').style.display = 'none'; }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RELATED PRODUCTS & CTA */}
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
            <>
              <div className="container mx-auto px-4 py-12 text-center">
                <a
                  href={product.buyLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#f8b400] text-[#004445] px-12 py-5 rounded-full cursor-pointer font-bold shadow-2xl shadow-[#f8b400]/30 hover:bg-[#ffc933] hover:-translate-y-1 transition-all active:translate-y-0 text-xl"
                >
                  Learn More & Buy Now <ArrowRight className="w-6 h-6" />
                </a>
              </div>

              {relatedProducts.length > 0 && (
                <div className="mt-16 border-t border-[#f8b400]/20 pt-16">
                  <div className="text-center mb-10">
                    <span className="text-[#f8b400] font-bold tracking-wider uppercase text-xs mb-2 block">You May Also Like</span>
                    <h2 className="text-3xl font-bold text-[#004445]">Related Products</h2>
                    <div className="w-16 h-1 bg-[#f8b400] mx-auto mt-4 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((rp) => (
                      <div
                        key={rp.id}
                        onClick={() => navigate(`/template/${templateId}/products/${rp.id}`)}
                        className="group bg-white rounded-2xl border border-[#e5e7eb] hover:border-[#f8b400]/50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer overflow-hidden relative"
                      >
                        <div className="h-40 relative p-6 flex items-center justify-center overflow-hidden">
                          <img
                            src={rp.image}
                            alt={rp.name}
                            className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400x400.png?text=Product";
                            }}
                          />
                          {rp.category && (
                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-[#004445] border border-[#e5e7eb]">
                              {rp.category}
                            </span>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-bold text-lg text-[#004445] mb-2 line-clamp-2 group-hover:text-[#2c786c] transition-colors leading-tight">
                            {rp.name}
                          </h3>
                          <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100/50">
                            <span className="text-[#004445] font-bold">Learn More</span>
                            <div className="w-8 h-8 rounded-full bg-[#faf5e4] flex items-center justify-center text-[#004445] group-hover:bg-[#004445] group-hover:text-white transition-all">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default ProductDetail;
