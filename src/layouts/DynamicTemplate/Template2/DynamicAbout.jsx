import { ArrowRight, Sparkles, ShoppingBag, MessageCircle, TrendingUp } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";

const DynamicAbout = () => {
  const backofficeData = useBackofficeData();
  const pageContent = backofficeData?.aboutPageContent || {};

  // Parse features safely
  let parsedFeatures = [];
  try {
    parsedFeatures = pageContent.features
      ? (typeof pageContent.features === "string" ? JSON.parse(pageContent.features) : pageContent.features)
      : [];
  } catch (e) {
    parsedFeatures = [];
  }

  return (
    <div className="min-h-screen bg-white font-t2-body overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* PREMIUM ENTERPRISE DARK CONTRAST HERO */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#043e2f] to-[#022e22] text-white border-b border-[#064e3b]/80 py-24">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: `url(${pageContent.hero_image_url || 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1600&auto=format&fit=crop&q=80'})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#022e22]/90"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-bold tracking-wider uppercase">Our Journey & Philosophy</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white font-t2-heading leading-tight">
                {pageContent.hero_title}
              </h1>
              
              <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-6">
                {pageContent.hero_subtitle}
              </p>
              
              <p className="text-base text-emerald-100/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
                {pageContent.hero_description}
              </p>

              {pageContent.hero_button_text && (
                <a
                  href={pageContent.hero_button_link || "#"}
                  className="group inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-400 transition-all duration-300 shadow-md hover:shadow-emerald-500/20 text-sm cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>{pageContent.hero_button_text}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="story" className="bg-white py-24 border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 bg-white p-2">
                  {pageContent.story_image_url ? (
                    <img
                      src={pageContent.story_image_url}
                      alt="Our Story"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-xl">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">NutriProfits Integrity</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Floating Stat Badge */}
                <div className="absolute -bottom-6 -right-6 bg-slate-900 p-6 rounded-2xl shadow-md border border-white/5 hidden md:block text-white">
                  <p className="text-3xl font-extrabold text-emerald-400 mb-0.5 font-t2-heading">10,000+</p>
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Happy Customers</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-2 block">{pageContent.story_subtitle}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-t2-heading tracking-tight">
                    {pageContent.story_title}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-base text-slate-600 font-light leading-relaxed">
                    {pageContent.story_description}
                  </p>
                  <p className="text-sm text-slate-500 font-light leading-relaxed border-l-2 border-emerald-500 pl-6">
                    From a small idea to serving thousands of happy customers —
                    we're proud of how far we've come, and even more excited about
                    where we're going. Thank you for being part of our story.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Grid */}
        <section className="bg-slate-50 py-24 border-b border-slate-100 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-2 block">Our Purpose</span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-955 font-t2-heading tracking-tight">
                What Drives Us Forward
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Mission */}
              <div className="group relative p-8 rounded-2xl bg-white border border-slate-200/50 hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-2 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-6 border border-emerald-100">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-t2-heading">
                  {pageContent.mission_title || "Our Mission"}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
                  {pageContent.mission_description}
                </p>
              </div>

              {/* Vision */}
              <div className="group relative p-8 rounded-2xl bg-white border border-slate-200/50 hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-2 shadow-sm">
                <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-6 border border-teal-100">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-t2-heading">
                  {pageContent.vision_title || "Our Vision"}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
                  {pageContent.vision_description}
                </p>
              </div>

              {/* Values */}
              <div className="group relative p-8 rounded-2xl bg-white border border-slate-200/50 hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-2 shadow-sm">
                <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-t2-heading">
                  {pageContent.values_title || "Our Values"}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
                  {pageContent.values_description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        {parsedFeatures.length > 0 && (
          <section className="bg-white py-24 border-b border-slate-100">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-2 block">Our Advantage</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-t2-heading tracking-tight">
                  {pageContent.why_choose_title || "Why Choose Us"}
                </h2>
                <p className="text-slate-500 text-sm mt-3 font-light leading-relaxed">
                  {pageContent.why_choose_subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {parsedFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="group relative p-8 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-emerald-100 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-base font-bold text-slate-900 font-t2-heading group-hover:text-emerald-600 transition-colors">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-slate-50/70 py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 border border-emerald-100/50 p-12 md:p-16 text-center shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900 tracking-tight font-t2-heading leading-tight">
                {pageContent.cta_title}
              </h3>
              
              <p className="text-sm text-slate-600 mb-8 max-w-lg mx-auto font-light leading-relaxed">
                {pageContent.cta_description}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={pageContent.cta_button_link || "/"}
                  className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {pageContent.cta_button_text || "Shop Collection"}
                </a>
                <a
                  href={pageContent.cta_secondary_button_link || "/contact"}
                  className="bg-white text-slate-700 border border-slate-200 font-bold px-6 py-3 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" />
                  {pageContent.cta_secondary_button_text || "Contact Us"}
                </a>
              </div>
            </div>
          </div>
        </section>n>
      </div>
    </div>
  );
};

export default DynamicAbout;