import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, ShoppingBag, MessageCircle, TrendingUp } from "lucide-react";

const Template2About = () => {
  const [loading, setLoading] = useState(true);
  const [pageContent, setPageContent] = useState({
    hero_title: "ABOUT US",
    hero_subtitle: "Building Trust Through Quality & Service",
    hero_description:
      "Discover our journey, values, and commitment to delivering excellence in every product.",
    hero_button_text: "Learn More",
    hero_button_link: "#story",
    hero_image_url: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJvdXR8ZW58MHx8MHx8fDA%3D",

    story_title: "Our Story",
    story_subtitle: "Where It All Began",
    story_description:
      "Welcome to our Store! We've been serving our valued customers with premium products. Our journey began with a simple belief: everyone deserves access to high-quality products that truly make a difference.",
    story_image_url: null,

    purpose_title: "Our Purpose",
    purpose_subtitle: "What Drives Us",

    mission_title: "Our Mission",
    mission_description:
      "Delivering excellence in every product and creating a seamless, trustworthy shopping experience for customers worldwide.",

    vision_title: "Our Vision",
    vision_description:
      "To be the most innovative and trusted online store, empowering people to make confident purchasing decisions.",

    values_title: "Our Values",
    values_description:
      "Innovation, Quality, Trust, and Customer-First approach guide everything we do.",

    why_choose_title: "Why Choose Us",
    why_choose_subtitle: "We go above and beyond to ensure your satisfaction",
    features: [
      "Premium quality products",
      "24/7 customer support",
      "Fast & secure shipping",
      "100% satisfaction guarantee",
      "Easy returns & refunds",
      "Transparent pricing",
    ],

    cta_title: "Ready to Experience the Difference?",
    cta_description:
      "Join thousands of satisfied customers who trust us for their shopping needs.",
    cta_button_text: "Start Shopping",
    cta_button_link: "/products",
    cta_secondary_button_text: "Contact Us",
    cta_secondary_button_link: "/contact",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/about-page-content");
        const result = await response.json();

        if (result.success && result.data) {
          // Parse features JSON string from database
          const parsedData = {
            ...result.data,
            features:
              typeof result.data.features === "string"
                ? JSON.parse(result.data.features)
                : result.data.features || [],
          };

          setPageContent((prev) => ({ ...prev, ...parsedData }));
        }
      } catch (err) {
        console.error("Error fetching about page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading about us...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Modern Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 rounded-b-[5rem] shadow-2xl mb-24">
          {/* Background Image with Parallax-like feel */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-[10s] hover:scale-110"
            style={{
              backgroundImage: `url(${pageContent.hero_image_url || 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1600&auto=format&fit=crop&q=80'})`,
            }}
          />
          
          {/* Dynamic Glows */}
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-600/30 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-teal-600/20 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-slate-950"></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-emerald-400 shadow-2xl mb-8 transform transition-all hover:scale-105 hover:bg-white/10">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Our Journey & Philosophy</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white font-t2-heading leading-[1.1]">
                {pageContent.hero_title}
              </h1>
              
              <p className="text-xl md:text-2xl text-emerald-400/80 font-medium mb-6 tracking-wide uppercase">
                {pageContent.hero_subtitle}
              </p>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                {pageContent.hero_description}
              </p>

              <a
                href={pageContent.hero_button_link}
                className="group relative inline-flex items-center gap-4 bg-emerald-600 text-white font-bold px-12 py-5 rounded-2xl hover:bg-emerald-500 transition-all duration-300 shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:-translate-y-1"
              >
                <span className="text-[11px] uppercase tracking-[0.2em]">{pageContent.hero_button_text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="story" className="container mx-auto px-4 lg:px-8 py-24 mb-24">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-white p-4">
                {pageContent.story_image_url ? (
                  <img
                    src={pageContent.story_image_url}
                    alt="Our Story"
                    className="w-full h-full object-cover rounded-[2.5rem]"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-[2.5rem]">
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 text-emerald-200 mx-auto mb-4" />
                      <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">Visualizing Excellence</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-8 rounded-[2rem] shadow-2xl border border-white/10 hidden md:block">
                <p className="text-5xl font-bold text-emerald-400 mb-1 font-t2-heading">10k+</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Happy Customers</p>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{pageContent.story_subtitle}</span>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-t2-heading tracking-tight leading-tight">
                  {pageContent.story_title}
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  {pageContent.story_description}
                </p>
                <p className="text-lg text-slate-500 font-light leading-relaxed border-l-2 border-emerald-500 pl-8">
                  From a small idea to serving thousands of happy customers —
                  we're proud of how far we've come, and even more excited about
                  where we're going. Thank you for being part of our story.
                </p>
              </div>

              <div className="pt-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">99%</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Satisfaction Rate</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">24/7</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Expert Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Grid */}
        <section className="bg-slate-950 py-32 rounded-[5rem] shadow-2xl mb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-emerald-600/10 rounded-full blur-[140px]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-24">
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{pageContent.purpose_subtitle}</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white font-t2-heading tracking-tight leading-tight">
                {pageContent.purpose_title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {/* Mission */}
              <div className="group relative p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-500 transform hover:-translate-y-4">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 font-t2-heading">
                  {pageContent.mission_title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light">
                  {pageContent.mission_description}
                </p>
              </div>

              {/* Vision */}
              <div className="group relative p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-500 transform hover:-translate-y-4">
                <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 font-t2-heading">
                  {pageContent.vision_title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light">
                  {pageContent.vision_description}
                </p>
              </div>

              {/* Values */}
              <div className="group relative p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-500 transform hover:-translate-y-4">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 font-t2-heading">
                  {pageContent.values_title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light">
                  {pageContent.values_description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 lg:px-8 py-24 mb-32">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">The Direct Advantage</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-t2-heading tracking-tight leading-tight">
              {pageContent.why_choose_title}
            </h2>
            <p className="text-slate-500 text-lg mt-6 font-light leading-relaxed">
              {pageContent.why_choose_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pageContent.features &&
              pageContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-emerald-100 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:rotate-12 transition-all duration-500">
                    <Sparkles className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                  </div>
                  <p className="text-xl font-bold text-slate-900 font-t2-heading group-hover:text-emerald-600 transition-colors">
                    {feature}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-32">
          <div className="relative rounded-[4rem] overflow-hidden">
            {/* CTA Background */}
            <div className="absolute inset-0 bg-slate-950"></div>
            <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-emerald-600/10 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 px-8 py-24 sm:py-32 text-center border border-white/5 rounded-[4rem] bg-white/[0.02] backdrop-blur-3xl">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-4xl sm:text-6xl font-bold mb-8 text-white tracking-tight font-t2-heading leading-tight">
                  {pageContent.cta_title}
                </h3>
                
                <p className="text-lg sm:text-xl text-slate-400 mb-12 font-light leading-relaxed">
                  {pageContent.cta_description}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a
                    href={pageContent.cta_button_link}
                    className="bg-emerald-600 text-white font-bold px-12 py-5 rounded-[2rem] hover:bg-emerald-500 hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] transition-all duration-300 text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transform hover:-translate-y-1"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {pageContent.cta_button_text}
                  </a>
                  <a
                    href={pageContent.cta_secondary_button_link}
                    className="bg-white/5 text-white border border-white/10 font-bold px-12 py-5 rounded-[2rem] hover:bg-white/10 transition-all duration-300 text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {pageContent.cta_secondary_button_text}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2About;