import { Target, Eye, Gem, Users, Award, TrendingUp, CheckCircle, Heart, ArrowRight, Sparkles } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";

const DynamicAbout = () => {
  const backofficeData = useBackofficeData();

  const about = backofficeData?.aboutPageContent || {};

  // Parse features JSON safely
  let parsedFeatures = [];
  try {
    parsedFeatures = about.features ? JSON.parse(about.features) : [];
  } catch (e) {
    parsedFeatures = [];
  }

  // Values section from DB
  const dynamicValues = [
    {
      icon: Target,
      title: about.mission_title,
      description: about.mission_description,
      color: "from-blue-500 to-cyan-500",
      accent: "bg-blue-100",
    },
    {
      icon: Eye,
      title: about.vision_title,
      description: about.vision_description,
      color: "from-purple-500 to-pink-500",
      accent: "bg-purple-100",
    },
    {
      icon: Gem,
      title: about.values_title,
      description: about.values_description,
      color: "from-amber-500 to-orange-500",
      accent: "bg-amber-100",
    }
  ];

  return (
    <div className="overflow-x-hidden">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] p-4 sm:p-6 md:p-8 lg:p-12 mb-8 md:mb-12 shadow-2xl min-h-[500px] sm:min-h-[600px] md:min-h-screen">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center max-w-7xl mx-auto">

          {/* LEFT CONTENT */}
          <div className="text-white order-2 md:order-1">
            <span className="inline-block bg-[#f8b400] text-[#004445] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              {about.hero_title || "ABOUT US"}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4 leading-tight">
              {about.hero_subtitle}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#faf5e4] leading-relaxed mb-4 sm:mb-6">
              {about.hero_description}
            </p>

            <a href={about.hero_button_link || "#"}>
              <button className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#ffa500] cursor-pointer shadow-lg text-sm sm:text-base transition-all">
                {about.hero_button_text} 
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-2" />
              </button>
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden shadow-lg rounded-lg order-1 md:order-2">
            <img
              src={about.hero_image_url || "https://images.unsplash.com/photo-1611462499222-f1ee5b9de07b"}
              alt="About"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </div>

      {/* OUR STORY */}
      <div className="mb-8 md:mb-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#004445] mb-3">
            {about.story_title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center max-w-7xl mx-auto">

          <div className="p-4 sm:p-6 md:p-8 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-medium text-[#004445] mb-3 sm:mb-4">
              {about.story_subtitle}
            </h3>

            <p className="text-sm sm:text-base text-black mb-3 sm:mb-4 leading-relaxed">
              {about.story_description}
            </p>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden shadow-xl rounded-lg">
            <img
              src={about.story_image_url || "https://images.unsplash.com/photo-1557804506-669a67965ba0"}
              alt="Our Story"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

        </div>
      </div>

      {/* MISSION / VISION / VALUES */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

        <div className="relative z-10 max-w-6xl mx-auto">

          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f8b400]/20 text-[#004445] px-3 py-1.5 rounded-full mb-4 font-semibold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4" />
              {about.purpose_title}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#004445] mb-3">
              {about.purpose_subtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {dynamicValues.map((value, i) => (
              <div key={i} className="group relative bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <value.icon className="w-10 h-10 text-[#004445] mb-3" />
                <h3 className="text-xl font-medium text-[#004445] mb-2">{value.title}</h3>
                <p className="text-[#2c786c] text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <div className="bg-[#faf5e4] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8 md:mb-12 mx-4">

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl font-medium text-[#004445] mb-2">
            {about.why_choose_title}
          </h2>
          <p className="text-[#2c786c]">
            {about.why_choose_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {parsedFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-md">
              <CheckCircle className="w-6 h-6 text-[#f8b400]" />
              <span className="text-[#004445] font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] p-8 md:p-12 text-center text-white shadow-2xl mx-4 mb-8 rounded-2xl">

        <h2 className="text-3xl font-medium mb-4">
          {about.cta_title}
        </h2>

        <p className="text-[#faf5e4] mb-6 max-w-2xl mx-auto">
          {about.cta_description}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">

          <a href={about.cta_button_link}>
            <button className="bg-[#f8b400] text-[#004445] px-8 py-3 rounded-full font-semibold hover:bg-[#ffa500] shadow-lg">
              {about.cta_button_text}
            </button>
          </a>

          <a href={about.cta_secondary_button_link}>
            <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#004445]">
              {about.cta_secondary_button_text}
            </button>
          </a>

        </div>
      </div>
    </div>
  );
};

export default DynamicAbout;
