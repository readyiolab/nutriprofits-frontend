import { Target, Eye, Gem, Users, Award, TrendingUp, CheckCircle, Heart, ArrowRight,Sparkles  } from "lucide-react";

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
    <div>
      {/* HERO SECTION */}
<div className="bg-gradient-to-r from-[#004445] to-[#2c786c] p-8 md:p-12 mb-12 shadow-2xl min-h-screen">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    {/* LEFT CONTENT */}
    <div className="text-white">
      <span className="inline-block bg-[#f8b400] text-[#004445] px-4 py-1 rounded-full text-sm font-semibold mb-4">
        ABOUT US
      </span>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        Building Trust Through Quality & Service
      </h1>
      <p className="text-lg text-[#faf5e4] leading-relaxed">
        Discover our journey, values, and commitment to delivering exceptional
        products and experiences to customers worldwide.
      </p>
      <button className="mt-6 bg-[#f8b400] text-[#004445] px-8 py-3 rounded-lg font-semibold hover:bg-[#ffa500] cursor-pointer shadow-lg">
        Learn More <ArrowRight className="w-5 h-5 inline-block ml-2" />
      </button>
    </div>

    {/* RIGHT SIDE FULL IMAGE */}
    <div className="relative h-[400px] md:h-[600px] l overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1611462499222-f1ee5b9de07b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFib3V0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
        alt="About Us - Wellness Products"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Optional gradient overlay for smooth blending */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  </div>
</div>

{/* OUR STORY SECTION */}
<div className="mb-12">
  {/* Heading */}
  <div className="text-center mb-8">
    <h2 className="text-4xl font-semibold text-[#004445] mb-3">Our Story</h2>
  </div>

  <div className="grid md:grid-cols-2 gap-8 items-center">
    {/* LEFT CONTENT */}
    <div className=" p-8 rounded-2xl ">
      <h3 className="text-2xl font-semibold text-[#004445] mb-4">
        Where It All Began
      </h3>
      <p className="text-black mb-4 leading-relaxed">
        Welcome to our modern business! We've been serving customers since 2020,
        providing high-quality products with exceptional service. Our mission is
        to revolutionize the way people shop online.
      </p>
      <p className="text-black leading-relaxed">
        We believe in innovation, quality, and customer satisfaction. Every product
        we offer is carefully selected to meet our premium standards. Our team
        works tirelessly to ensure that each customer receives the best possible
        experience.
      </p>
    </div>

    {/* RIGHT SIDE FULL IMAGE */}
    <div className="relative h-96 md:h-[500px]  overflow-hidden shadow-xl">
      <img
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3VyJTIwc3Rvcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
        alt="Our Story - Wellness Journey"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Optional overlay for text readability (can remove if not needed) */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  </div>
</div>


      {/* MISSION, VISION, VALUES */}
      <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#004445]/5 to-transparent rounded-full -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#f8b400]/5 to-transparent rounded-full -mr-48 -mb-48"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#f8b400]/20 text-[#004445] px-4 py-2 rounded-full mb-6 font-semibold">
            <Sparkles className="w-4 h-4" />
            Our Purpose
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#004445] mb-4">What Drives Us</h2>
          <p className="text-[#2c786c] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Our core principles guide everything we do and shape our commitment to you
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Card Background with gradient border effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 blur`}></div>
                
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  

                  {/* Content Section */}
                  <div className="p-8">
                    <h3 className="text-2xl font-medium text-[#004445] mb-3 group-hover:text-[#2c786c] transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-[#2c786c] leading-relaxed text-base">
                      {value.description}
                    </p>
                  </div>

                  
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional: Decorative line separator */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#f8b400]"></div>
            <div className="w-2 h-2 rounded-full bg-[#f8b400]"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#f8b400]"></div>
          </div>
        </div>
      </div>
    </section>

      {/* WHY CHOOSE US */}
      <div className="bg-[#faf5e4] rounded-2xl p-8 md:p-12 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold text-[#004445] mb-3">Why Choose Us</h2>
            
            <p className="text-[#2c786c] text-lg">
              We go above and beyond to ensure your satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center  gap-3 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
                <CheckCircle className="w-6 h-6 text-[#f8b400] flex-shrink-0 mt-1" />
                <span className="text-[#004445] font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c]  p-8 md:p-12 text-center text-white shadow-2xl m-10 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8b400] opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f8b400] opacity-10 rounded-full -ml-24 -mb-24"></div>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Experience the Difference?</h2>
        <p className="text-[#faf5e4] text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust us for their shopping needs
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-[#f8b400] text-[#004445] px-8 py-3 rounded-full font-semibold hover:bg-[#ffa500] cursor-pointer  shadow-lg">
            Start Shopping
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#004445] cursor-pointer transition-all">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template1About;