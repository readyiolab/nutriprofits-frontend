import { ArrowRight, Sparkles, ShoppingBag, MessageCircle } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";

const DynamicAbout = () => {
  const backofficeData = useBackofficeData();
  const pageContent = backofficeData?.aboutPageContent || {};

  // Parse features JSON safely
  let parsedFeatures = [];
  try {
    parsedFeatures = pageContent.features ? (typeof pageContent.features === 'string' ? JSON.parse(pageContent.features) : pageContent.features) : [];
  } catch (e) {
    parsedFeatures = [];
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section - Same as Categories Template */}
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Our Journey</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-medium mb-6 leading-tight">
              {pageContent.hero_title}
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              {pageContent.hero_subtitle}
            </p>
            <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
              {pageContent.hero_description}
            </p>
            <a
              href={pageContent.hero_button_link}
              className="inline-flex items-center gap-3 bg-white text-black font-medium px-8 py-4 rounded-full hover:shadow-xl transition text-lg"
            >
              {pageContent.hero_button_text} <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-800 mb-4">
              {pageContent.story_title}
            </h2>
            <p className="text-xl text-gray-600">{pageContent.story_subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {pageContent.story_description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                From a small idea to serving thousands of happy customers — we’re proud of how far we’ve come,
                and even more excited about where we’re going. Thank you for being part of our story.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl h-96 flex items-center justify-center shadow-xl">
              {pageContent.story_image_url ? (
                <img src={pageContent.story_image_url} alt="Our Story" className="rounded-2xl object-cover w-full h-full" />
              ) : (
                <div className="text-9xl">Photo</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="group bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-10 text-white text-center transform hover:-translate-y-3 transition-all duration-500">
            <div className="text-6xl mb-6">Target</div>
            <h3 className="text-2xl font-bold mb-4">{pageContent.mission_title}</h3>
            <p className="text-white/90 leading-relaxed">{pageContent.mission_description}</p>
          </div>

          {/* Vision */}
          <div className="group bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-10 text-white text-center transform hover:-translate-y-3 transition-all duration-500">
            <div className="text-6xl mb-6">Eye</div>
            <h3 className="text-2xl font-bold mb-4">{pageContent.vision_title}</h3>
            <p className="text-white/90 leading-relaxed">{pageContent.vision_description}</p>
          </div>

          {/* Values */}
          <div className="group bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl shadow-xl p-10 text-white text-center transform hover:-translate-y-3 transition-all duration-500">
            <div className="text-6xl mb-6">Diamond</div>
            <h3 className="text-2xl font-bold mb-4">{pageContent.values_title}</h3>
            <p className="text-white/90 leading-relaxed">{pageContent.values_description}</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-medium text-gray-800 mb-4">
            {pageContent.why_choose_title}
          </h2>
          <p className="text-xl text-gray-600">{pageContent.why_choose_subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {parsedFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:border hover:border-black transition-all"
            >
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                 ✓
              </div>
              <p className="text-lg font-medium text-gray-800">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section  */}
      <div className="bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)]
     py-12 sm:py-20 mb-10 mx-4 sm:mx-12 rounded-2xl sm:rounded-3xl 
     shadow-2xl overflow-hidden">

  <div className="container mx-auto px-3 sm:px-4 text-center text-white">

    <h3 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4 leading-tigh">
      {pageContent.cta_title}
    </h3>

    <p className="text-base sm:text-xl text-white/90 mb-8 sm:mb-12 
                  max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
      {pageContent.cta_description}
    </p>

    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">

      {/* Primary button */}
      <a
        href={pageContent.cta_button_link}
        className="bg-white text-black font-medium 
                   px-6 py-3 sm:px-10 sm:py-5 rounded-full 
                   hover:shadow-2xl transition 
                   text-base sm:text-lg 
                   flex items-center justify-center gap-3 
                   w-full sm:w-auto"
      >
        {pageContent.cta_button_text}
        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* Secondary button */}
      <a
        href={pageContent.cta_secondary_button_link}
        className="border-2 border-white text-white 
                   px-6 py-3 sm:px-10 sm:py-5 rounded-full 
                   hover:bg-white hover:text-black transition 
                   font-medium text-base sm:text-lg 
                   flex items-center justify-center gap-3 
                   w-full sm:w-auto"
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

export default DynamicAbout;