import { useState, useEffect } from "react";
import { Sparkles, ChevronDown, MessageCircle, Search } from "lucide-react";

const Template2FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([
    {
      question: "What is your shipping policy?",
      answer: "We offer free standard shipping on all orders over $50. Delivery takes 3-7 business days within the US. Orders below $50 have a flat $6.99 shipping fee.",
      category: "Shipping",
      display_order: 1,
      is_active: 1
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International orders may take 10-21 days depending on location and customs processing.",
      category: "Shipping",
      display_order: 2,
      is_active: 1
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee on all products. Items must be unopened and in original packaging. Simply contact support to start your return.",
      category: "Returns",
      display_order: 3,
      is_active: 1
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can track your package directly on our website or through the carrier's site.",
      category: "Orders",
      display_order: 4,
      is_active: 1
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secure and encrypted.",
      category: "Payment",
      display_order: 5,
      is_active: 1
    }
  ]);
  const [pageContent, setPageContent] = useState({
    hero_title: "Frequently Asked Questions",
    hero_subtitle: "Got questions? We've got answers",
    hero_description: "Browse through our most commonly asked questions below",
    cta_title: "Still Have Questions?",
    cta_description: "Our support team is here 24/7 to help you",
    cta_button_text: "Contact Support",
    cta_button_link: "/contact",
    cta_secondary_button_text: "Start Live Chat",
    cta_secondary_button_link: "/chat"
  });

  // Fetch page content and FAQs from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentResponse = await fetch('/api/faq-page-content');
        const contentData = await contentResponse.json();
        if (contentData.success && contentData.data) {
          setPageContent(contentData.data);
        }

        const faqsResponse = await fetch('/api/faq-items');
        const faqsData = await faqsResponse.json();
        if (faqsData.success && faqsData.data) {
          setFaqs(faqsData.data.filter(faq => faq.is_active === 1));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(faqs.map(f => f.category).filter(Boolean))];

  // Filter FAQs
  const filteredFaqs = faqs
    .filter(faq => {
      const question = (faq.question || "").toLowerCase();
      const answer = (faq.answer || "").toLowerCase();
      const matchesSearch = question.includes(searchQuery.toLowerCase()) ||
                           answer.includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.display_order - b.display_order);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-slate-500 font-medium">Loading FAQs...</p>
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

      <div className="relative z-10 pt-6">
        {/* ENTERPRISE-GRADE LIGHT HERO */}
        <section className="relative bg-white pt-24 pb-16 overflow-hidden border-b border-slate-100 shadow-sm min-h-[50vh] flex items-center">
          {/* Subtle background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1454165833767-027ffea9e77b?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold tracking-wider uppercase">Help Center</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-slate-900 font-t2-heading leading-tight">
                {pageContent.hero_title}
              </h1>
              
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">
                {pageContent.hero_subtitle}
              </p>
              
              <p className="text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed mb-8">
                {pageContent.hero_description}
              </p>

              {/* Light Search Bar */}
              <div className="max-w-xl mx-auto relative group">
                <div className="absolute -inset-0.5 bg-emerald-600/10 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-sm">
                  <Search className="w-4 h-4 text-emerald-600 mr-3 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search our help topics..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 text-sm outline-none font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-20">
          {/* Category Filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-1 font-t2-heading">No Results Found</h3>
                <p className="text-slate-500 text-sm">Please try a different keyword search.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={faq.faq_id || index}
                  className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
                    openIndex === index ? "border-emerald-500 shadow-sm" : "border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:border-emerald-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center transition-colors hover:bg-slate-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        openIndex === index ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-400"
                      }`}>
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className={`text-sm sm:text-base font-bold font-t2-heading transition-colors ${
                          openIndex === index ? "text-slate-900" : "text-slate-700"
                        }`}>
                          {faq.question}
                        </span>
                        {faq.category && (
                          <span className="block text-[8px] font-bold text-emerald-600 uppercase tracking-widest">
                            {faq.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180 text-emerald-600" : "text-slate-400"
                      }`}
                    />
                  </button>

                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-[300px] opacity-100 border-t border-slate-50" : "max-h-0 opacity-0"
                  }`}>
                    <div className="px-6 py-5 bg-slate-50/40">
                      <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed border-l-2 border-emerald-500 pl-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Premium Light CTA Section */}
        <section className="container mx-auto px-6 mb-20 max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 border border-emerald-100/50 p-12 md:p-16 text-center shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900 tracking-tight font-t2-heading leading-tight">
              {pageContent.cta_title}
            </h3>
            
            <p className="text-sm text-slate-600 mb-8 max-w-lg mx-auto font-light leading-relaxed">
              {pageContent.cta_description}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={pageContent.cta_button_link}
                className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                {pageContent.cta_button_text}
              </a>
              <a
                href={pageContent.cta_secondary_button_link}
                className="bg-white text-slate-700 border border-slate-200 font-bold px-6 py-3 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              >
                {pageContent.cta_secondary_button_text}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2FAQ;