import { Target, Eye, Gem, Users, Award, TrendingUp, CheckCircle, Heart, ArrowRight, Sparkles } from "lucide-react";

const Template1About = () => {
  const stats = [
    { number: "5000+", label: "Happy Customers", icon: Users },
    { number: "600+", label: "Products", icon: Award },
    { number: "98%", label: "Satisfaction Rate", icon: Heart },
    { number: "4.8/5", label: "Average Rating", icon: TrendingUp },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Delivering excellence in every product and creating unforgettable shopping experiences",
      color: "from-blue-500 to-cyan-500",
      accent: "bg-blue-100",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To be the most innovative and trusted online store, setting new standards in e-commerce",
      color: "from-purple-500 to-pink-500",
      accent: "bg-purple-100",
    },
    {
      icon: Gem,
      title: "Our Values",
      description: "Innovation, Quality, Trust, and Customer-First approach in everything we do",
      color: "from-amber-500 to-orange-500",
      accent: "bg-amber-100",
    }
  ];

  const features = [
    "Premium quality products",
    "24/7 customer support",
    "Free shipping on orders over $50",
    "30-day money-back guarantee",
    "Secure payment processing",
    "Eco-friendly packaging"
  ];

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] p-4 sm:p-6 md:p-8 lg:p-12 mb-8 md:mb-12 shadow-2xl min-h-[500px] sm:min-h-[600px] md:min-h-screen">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center max-w-7xl mx-auto">
          {/* LEFT CONTENT */}
          <div className="text-white order-2 md:order-1">
            <span className="inline-block bg-[#f8b400] text-[#004445] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              ABOUT US
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4 leading-tight">
              Building Trust Through Quality & Service
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#faf5e4] leading-relaxed mb-4 sm:mb-6">
              Discover our journey, values, and commitment to delivering exceptional
              products and experiences to customers worldwide.
            </p>
            <button className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#ffa500] cursor-pointer shadow-lg text-sm sm:text-base transition-all">
              Learn More <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-2" />
            </button>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden shadow-lg rounded-lg order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1611462499222-f1ee5b9de07b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFib3V0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
              alt="About Us - Wellness Products"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </div>

      {/* OUR STORY SECTION */}
      <div className="mb-8 md:mb-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#004445] mb-3">Our Story</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center max-w-7xl mx-auto">
          {/* LEFT CONTENT */}
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-medium text-[#004445] mb-3 sm:mb-4">
              Where It All Began
            </h3>
            <p className="text-sm sm:text-base text-black mb-3 sm:mb-4 leading-relaxed">
              Welcome to our modern business! We've been serving customers since 2020,
              providing high-quality products with exceptional service. Our mission is
              to revolutionize the way people shop online.
            </p>
            <p className="text-sm sm:text-base text-black leading-relaxed">
              We believe in innovation, quality, and customer satisfaction. Every product
              we offer is carefully selected to meet our premium standards. Our team
              works tirelessly to ensure that each customer receives the best possible
              experience.
            </p>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden shadow-xl rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3VyJTIwc3Rvcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
              alt="Our Story - Wellness Journey"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </div>

      {/* MISSION, VISION, VALUES */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#004445]/5 to-transparent rounded-full -ml-32 md:-ml-48 -mt-32 md:-mt-48"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#f8b400]/5 to-transparent rounded-full -mr-32 md:-mr-48 -mb-32 md:-mb-48"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8b400]/20 text-[#004445] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 font-semibold text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Our Purpose
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#004445] mb-3 sm:mb-4 px-4">
              What Drives Us
            </h2>
            <p className="text-[#2c786c] text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              Our core principles guide everything we do and shape our commitment to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-[#004445] mb-2 sm:mb-3 group-hover:text-[#2c786c] transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-[#2c786c] leading-relaxed text-sm sm:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#f8b400]"></div>
              <div className="w-2 h-2 rounded-full bg-[#f8b400]"></div>
              <div className="h-1 w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#f8b400]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <div className="bg-[#faf5e4] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8 md:mb-12 mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#004445] mb-2 sm:mb-3">
              Why Choose Us
            </h2>
            <p className="text-[#2c786c] text-sm sm:text-base lg:text-lg">
              We go above and beyond to ensure your satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3 bg-white rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#f8b400] flex-shrink-0 mt-0.5" />
                <span className="text-[#004445] font-medium text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] p-6 sm:p-8 md:p-12 text-center text-white shadow-2xl mx-4 sm:mx-6 lg:mx-10 mb-8 md:mb-12 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#f8b400] opacity-10 rounded-full -mr-24 md:-mr-32 -mt-24 md:-mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#f8b400] opacity-10 rounded-full -ml-16 md:-ml-24 -mb-16 md:-mb-24"></div>
        
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 px-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-[#faf5e4] text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
            Join thousands of satisfied customers who trust us for their shopping needs
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
            <button className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#ffa500] cursor-pointer shadow-lg text-sm sm:text-base transition-all">
              Start Shopping
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-[#004445] cursor-pointer transition-all text-sm sm:text-base">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1About;