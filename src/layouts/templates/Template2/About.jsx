import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, ShoppingBag, MessageCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      {/* Hero Section - Fixed with Background Image + Overlay */}
<div className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${pageContent.hero_image_url || 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1600&auto=format&fit=crop&q=80'})`,
    }}
  />

  {/* Dark Overlay for Readability */}
  <div className="absolute inset-0 bg-black/50" /> {/* Adjust opacity here: bg-black/40 to /70 */}

 
  {/* Content */}
  <div className="relative container mx-auto px-4 py-20 text-center z-10">
    <div className="max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
        <Sparkles className="w-4 h-4 text-yellow-300" />
        <span className="text-sm font-medium">Our Journey</span>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight text-white drop-shadow-lg">
        {pageContent.hero_title}
      </h1>

      <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto font-light">
        {pageContent.hero_subtitle}
      </p>

      <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
        {pageContent.hero_description}
      </p>

      <a
        href={pageContent.hero_button_link}
        className="inline-flex items-center gap-3 bg-white text-black font-normal px-8 py-4 rounded-full hover:shadow-2xl transition-all text-lg shadow-xl"
      >
        {pageContent.hero_button_text} 
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  </div>

  {/* Decorative Blobs (optional - remove if too much) */}
  <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
</div>

      {/* Our Story Section */}
      <div id="story" className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-800 mb-4">
              {pageContent.story_title}
            </h2>
            <p className="text-xl text-gray-600">
              {pageContent.story_subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {pageContent.story_description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                From a small idea to serving thousands of happy customers —
                we're proud of how far we've come, and even more excited about
                where we're going. Thank you for being part of our story.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl h-96 flex items-center justify-center shadow-xl">
              {pageContent.story_image_url ? (
                <img
                  src={pageContent.story_image_url}
                  alt="Our Story"
                  className="rounded-2xl object-cover w-full h-full"
                />
              ) : (
                <div className="text-9xl opacity-20">📸</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium text-gray-800 mb-4">
            {pageContent.purpose_title}
          </h2>
          <p className="text-xl text-gray-600">
            {pageContent.purpose_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="group bg-gradient-to-br from-blue-500 to-blue-500 rounded-2xl shadow-xl p-10 text-white text-center transform hover:-translate-y-3 transition-all duration-500">
           
            <h3 className="text-2xl font-bold mb-4">
              {pageContent.mission_title}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {pageContent.mission_description}
            </p>
          </div>

          {/* Vision */}
          <div className="group bg-gradient-to-br from-blue-500 to-blue-500  rounded-2xl shadow-xl p-10 text-white text-center transform hover:-translate-y-3 transition-all duration-500">
        
            <h3 className="text-2xl font-bold mb-4">
              {pageContent.vision_title}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {pageContent.vision_description}
            </p>
          </div>

          {/* Values */}
          <div className="group bg-gradient-to-br from-blue-500 to-blue-500  rounded-2xl shadow-xl p-10 text-white text-center transform hover:-translate-y-3 transition-all duration-500">
       
            <h3 className="text-2xl font-bold mb-4">
              {pageContent.values_title}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {pageContent.values_description}
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-medium text-gray-800 mb-4">
            {pageContent.why_choose_title}
          </h2>
          <p className="text-xl text-gray-600">
            {pageContent.why_choose_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pageContent.features &&
            pageContent.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:border hover:border-blue-500 transition-all"
              >
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✓
                </div>
                <p className="text-lg font-medium text-gray-800">{feature}</p>
              </div>
            ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] py-12 sm:py-20 mb-10 mx-4 sm:mx-12 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        <div className="container mx-auto px-3 sm:px-4 text-center text-white">
          <h3 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4 leading-tight">
            {pageContent.cta_title}
          </h3>

          <p className="text-base sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            {pageContent.cta_description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            {/* Primary button */}
            <a
            href={pageContent.cta_button_link}
            className="bg-white text-black font-medium px-6 py-3 sm:px-10
            sm:py-5 rounded-full hover:shadow-2xl transition text-base
            sm:text-lg flex items-center justify-center gap-3 w-full sm:w-auto" >
           
              {pageContent.cta_button_text}
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" /> 
            </a>
            {/* Secondary button */}
            <a
              href={pageContent.cta_secondary_button_link}
              className="border-2 border-white text-white px-6 py-3 sm:px-10 sm:py-5 rounded-full hover:bg-white hover:text-black transition font-medium text-base sm:text-lg flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              {pageContent.cta_secondary_button_text}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2About;
