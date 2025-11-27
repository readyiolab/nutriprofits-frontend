import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Target, Eye, Heart, Shield, Zap, Users, Award, TrendingUp, CheckCircle } from "lucide-react";

const Template3About = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();

  // Dynamic page content (will come from tbl_about_page_content)
  const pageContent = {
    hero_title: "ABOUT US",
    hero_subtitle: "Building Trust Through Quality & Service",
    hero_description: "Discover our journey, values, and commitment to delivering excellence in everything we do.",
    hero_button_text: "Learn More",
    hero_button_link: "#story",
    hero_image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    
    story_title: "Our Story",
    story_subtitle: "Where It All Began",
    story_description: "Welcome to our store! We've been serving our customers with dedication and passion. Our journey started with a simple mission: to provide quality products and exceptional service. Over the years, we've grown into a trusted name, always putting our customers first.",
    story_image_url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    
    purpose_title: "Our Purpose",
    purpose_subtitle: "What Drives Us",
    
    mission_title: "Our Mission",
    mission_description: "Delivering excellence in every product and creating lasting relationships with our customers.",
    
    vision_title: "Our Vision",
    vision_description: "To be the most innovative and trusted online store in our industry.",
    
    values_title: "Our Values",
    values_description: "Innovation, Quality, Trust, and Customer-First approach guide everything we do.",
    
    why_choose_title: "Why Choose Us",
    why_choose_subtitle: "We go above and beyond to ensure your satisfaction",
    features: [
      "Premium quality products",
      "24/7 customer support",
      "Fast and secure shipping",
      "Easy returns and refunds",
      "Secure payment options",
      "Expert product knowledge"
    ],
    
    cta_title: "Ready to Experience the Difference?",
    cta_description: "Join thousands of satisfied customers who trust us.",
    cta_button_text: "Start Shopping",
    cta_button_link: `/template/${templateId}/products`,
    cta_secondary_button_text: "Contact Us",
    cta_secondary_button_link: `/template/${templateId}/contact`,
  };

  const stats = [
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Award, value: "500+", label: "Products" },
    { icon: TrendingUp, value: "99%", label: "Satisfaction Rate" },
    { icon: Shield, value: "5+", label: "Years Experience" }
  ];

  const purposeCards = [
    {
      icon: Target,
      title: pageContent.mission_title,
      description: pageContent.mission_description,
      gradient: "from-[#d72323] to-[#303841]"
    },
    {
      icon: Eye,
      title: pageContent.vision_title,
      description: pageContent.vision_description,
      gradient: "from-[#303841] to-[#d72323]"
    },
    {
      icon: Heart,
      title: pageContent.values_title,
      description: pageContent.values_description,
      gradient: "from-[#d72323] to-[#303841]"
    }
  ];

  return (
    <div className="bg-[#eeeeee] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[500px] sm:h-[600px] mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pageContent.hero_image_url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1214]/90 to-[#0f1214]/60" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-white">
              <span className="inline-block bg-[#d72323] px-5 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider shadow-lg">
                {pageContent.hero_subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
                {pageContent.hero_title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                {pageContent.hero_description}
              </p>
              <button 
                onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#d72323] text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all shadow-lg transform hover:scale-105"
              >
                {pageContent.hero_button_text}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#303841] to-[#303841] rounded-xl mb-4">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-medium text-[#303841] mb-2">{stat.value}</div>
                <p className="text-sm sm:text-base text-[#3a4750]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={pageContent.story_image_url}
                alt={pageContent.story_title}
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#303841]/50 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-sm font-semibold text-[#d72323] uppercase tracking-wider mb-4">
              {pageContent.story_subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#303841] mb-6">
              {pageContent.story_title}
            </h2>
            <p className="text-base sm:text-lg text-[#3a4750] leading-relaxed mb-6">
              {pageContent.story_description}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#d72323]" />
                <span className="text-sm font-medium text-[#303841]">Quality First</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#d72323]" />
                <span className="text-sm font-medium text-[#303841]">Customer Focus</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#d72323]" />
                <span className="text-sm font-medium text-[#303841]">Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE SECTION (Mission, Vision, Values) */}
      <section className="bg-white py-16 sm:py-20 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-sm font-semibold text-[#d72323] uppercase tracking-wider mb-4">
              {pageContent.purpose_subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#303841] mb-4">
              {pageContent.purpose_title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {purposeCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div key={index} className="group">
                  <div className={`bg-gradient-to-br from-[#303841] to-[#303841] rounded-2xl p-8 sm:p-10 text-white h-full  shadow-xl `}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-6  transition-transform">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                    <p className="text-white/90 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#d72323] uppercase tracking-wider mb-4">
            {pageContent.why_choose_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#303841] mb-6">
            {pageContent.why_choose_title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageContent.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#303841] to-[#303841] rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-[#303841] mb-1">{feature}</h3>
                  <p className="text-sm text-[#3a4750]">We ensure the best experience</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-[#0f1214] via-[#303841] to-[#0f1214] text-white py-16 sm:py-20 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            {pageContent.cta_title}
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {pageContent.cta_description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate(pageContent.cta_button_link)}
              className="px-8 py-4 bg-[#d72323] text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all shadow-lg transform "
            >
              {pageContent.cta_button_text}
            </button>
            <button 
              onClick={() => navigate(pageContent.cta_secondary_button_link)}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all transform "
            >
              {pageContent.cta_secondary_button_text}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template3About;