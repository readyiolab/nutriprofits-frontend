import { ChevronRight, Sparkles } from "lucide-react";
import { templatesData } from "../../data/templates";
import { Link } from "react-router-dom";

export default function Templates() {
  return (
    <>
      {/* Enhanced Hero Section */}
      <section
        className="bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)]

 text-white py-12 md:py-24 overflow-hidden relative"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/90 font-medium mb-1">
                  <Sparkles size={20} />
                  <span className="text-sm font-semibold tracking-wide">
                    EXPLORE TEMPLATES
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-medium leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Your Perfect Design Awaits
                </h1>
              </div>

              <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
                Kickstart your project with stunning, professionally designed
                templates. Fully customizable, responsive, and ready to impress
                your audience.
              </p>

              {/* Feature List */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Easy to Customize</span>
                </div>
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Mobile Ready & Responsive</span>
                </div>
                <div className="flex items-center gap-3 text-blue-50">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Beautiful Color Schemes</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  Explore All <ChevronRight size={20} />
                </button>
                <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden md:block relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-6 px-8 w-full">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-12 bg-white/10 rounded-lg backdrop-blur-sm"
                        style={{ width: `${100 - i * 15}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl font-medium text-gray-900 mb-4">
              Choose Your Template
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each template is crafted with love and attention to detail. Pick
              one that matches your vibe!
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templatesData.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Template Preview */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <div
                    className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white opacity-90 group-hover:scale-110 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)`,
                    }}
                  >
                    {template.name}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {template.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Color Palette */}
                  <div className="flex gap-2">
                    {Object.values(template.colors)
                      .slice(0, 4)
                      .map((color, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full shadow-lg border-2 border-white ring-1 ring-gray-200 hover:scale-110 transition-transform duration-300 cursor-pointer"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                  </div>

                  {/* Action Button */}
                  {/* Action Button */}
                  {template.comingSoon ? (
                    <div className="w-full bg-gray-200 text-gray-500 font-semibold py-3 px-6 rounded-xl cursor-not-allowed flex items-center justify-center">
                      Coming Soon
                    </div>
                  ) : (
                    <Link
                      to={`/template/${template.id}`}
                      className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group/btn flex items-center justify-center gap-2"
                    >
                      Preview Template
                      <ChevronRight
                        size={18}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                Can't decide? No problem!
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Try any template — you can switch anytime! Our templates are
                flexible and designed to grow with your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-white text-black font-medium rounded-xl hover:shadow-lg ">
                  Read More
                </button>
                <button className="px-8 py-3 bg-white/20 border border-white text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
