import { useState, useEffect } from "react";
import { Sparkles, ChevronDown, MessageCircle, Search } from "lucide-react";

const Template2FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Page content from tbl_faq_page_content (you can later fetch this)
  const [pageContent] = useState({
    hero_title: "Frequently Asked Questions",
    hero_subtitle: "Got questions? We've got answers",
    hero_description: "Browse through our most commonly asked questions below",
    cta_title: "Still Have Questions?",
    cta_description: "Our support team is here 24/7 to help you",
    cta_button_text: "Contact Support",
    cta_button_link: "/contact",
    cta_secondary_button_text: "Start Live Chat",
    cta_secondary_button_link: "/chat",
  });

  // Real dummy FAQs from your tbl_faq_items (backoffice_id = 1)
  const [faqs] = useState([
    {
      question: "What is your shipping policy?",
      answer: "We offer free standard shipping on all orders over $50. Delivery takes 3-7 business days within the US. Orders below $50 have a flat $6.99 shipping fee.",
      category: "Shipping",
      display_order: 1
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International orders may take 10-21 days depending on location and customs processing.",
      category: "Shipping",
      display_order: 2
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee on all products. Items must be unopened and in original packaging. Simply contact support to start your return.",
      category: "Returns",
      display_order: 3
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can track your package directly on our website or through the carrier's site.",
      category: "Orders",
      display_order: 4
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secure and encrypted.",
      category: "Payment",
      display_order: 5
    }
  ]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 600);
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(faqs.map(f => f.category))];

  // Filter FAQs
  const filteredFaqs = faqs
    .filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.display_order - b.display_order);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section - Exact Same Style */}
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Help Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-medium mb-6 leading-tight">
              {pageContent.hero_title}
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              {pageContent.hero_subtitle}
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              {pageContent.hero_description}
            </p>
          </div>
        </div>
      </div>

      {/* Search + Category Filter */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-14 py-4 rounded-full border-2 border-gray-300 focus:border-blue-600 focus:outline-none shadow-md text-base"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-black text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-5">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-16 h-16 mx-auto text-gray-400 mb-4 opacity-50" />
                <p className="text-xl text-gray-600">No FAQs found matching your search.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:border-black transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start gap-4">
                      <ChevronDown
                        className={`w-6 h-6 mt-1 text-blue-600 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                      <div>
                        <span className="font-bold text-lg text-gray-800 block">
                          {faq.question}
                        </span>
                        {faq.category && (
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2 inline-block">
                            {faq.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  {openIndex === index && (
                    <div className="px-8 pb-8 pt-2 border-t border-gray-100">
                      <div className="ml-10 text-gray-700 leading-relaxed text-base">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
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
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
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
        {pageContent.cta_secondary_button_text}
      </a>
    </div>
  </div>
</div>

    </div>
  );
};

export default Template2FAQ;