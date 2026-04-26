import { useState, useEffect } from "react";
import { Sparkles, ChevronDown, MessageCircle, Search } from "lucide-react";

const Template2FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
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
  const [pageContent, setPageContent] = useState({
    hero_title: "Frequently Asked Questions",
    hero_subtitle: "Got questions? We've got answers",
    hero_description: "Browse through our most commonly asked questions below",
    hero_image: "https://plus.unsplash.com/premium_photo-1678216285963-253d94232eb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFxc3xlbnwwfHwwfHx8MA%3D%3D",
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
        // Fetch page content
        const contentResponse = await fetch('/api/faq-page-content');
        const contentData = await contentResponse.json();
        if (contentData.success) {
          setPageContent(contentData.data);
        }

        // Fetch FAQ items
        const faqsResponse = await fetch('/api/faq-items');
        const faqsData = await faqsResponse.json();
        if (faqsData.success) {
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
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Modern Hero Section */}
        <section className="relative bg-slate-950 pt-32 pb-24 overflow-hidden rounded-b-[4rem] shadow-2xl mb-20 min-h-[60vh] flex items-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-[10s] hover:scale-110"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1454165833767-027ffea9e77b?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>

          {/* Dynamic Glow Backgrounds */}
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-teal-600/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-emerald-400 shadow-2xl mb-8 transform transition-all hover:scale-105 hover:bg-white/10">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Intelligence Hub</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white font-t2-heading leading-[1.1]">
                {pageContent.hero_title}
              </h1>
              
              <p className="text-xl md:text-2xl text-emerald-400/90 font-medium mb-6 tracking-wide uppercase">
                {pageContent.hero_subtitle}
              </p>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
                {pageContent.hero_description}
              </p>

              <div className="max-w-2xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                  <Search className="w-5 h-5 text-emerald-400" />
                  <input 
                    type="text" 
                    placeholder="Search the knowledge base..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 px-4 font-light text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 pb-32">
          {/* Category Filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-4 mb-20">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20"
                      : "bg-white text-slate-400 border border-slate-100 hover:border-emerald-200 hover:text-emerald-600 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Results Found</h3>
                <p className="text-slate-400 font-light">Try broadening your search criteria.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={faq.faq_id || index}
                  className={`group bg-white rounded-[2rem] overflow-hidden transition-all duration-500 border ${
                    openIndex === index ? "border-emerald-500 shadow-2xl -translate-y-1" : "border-slate-100 shadow-sm hover:border-emerald-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-8 md:px-12 py-8 text-left flex justify-between items-center transition-colors group-hover:bg-slate-50/50"
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        openIndex === index ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-300 group-hover:text-emerald-600"
                      }`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <span className={`text-lg md:text-xl font-bold font-t2-heading transition-colors ${
                          openIndex === index ? "text-slate-900" : "text-slate-700 group-hover:text-emerald-600"
                        }`}>
                          {faq.question}
                        </span>
                        {faq.category && (
                          <span className="block text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
                            {faq.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-500 ${
                        openIndex === index ? "rotate-180 text-emerald-600" : "text-slate-300"
                      }`}
                    />
                  </button>

                  <div className={`transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}>
                    <div className="px-8 md:px-12 pb-10 pt-2 ml-14">
                      <div className="text-slate-500 text-lg font-light leading-relaxed border-l-2 border-emerald-500 pl-8">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Premium CTA Section */}
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
                    <MessageCircle className="w-5 h-5" />
                    {pageContent.cta_button_text}
                  </a>
                  <a
                    href={pageContent.cta_secondary_button_link}
                    className="bg-white/5 text-white border border-white/10 font-bold px-12 py-5 rounded-[2rem] hover:bg-white/10 transition-all duration-300 text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                  >
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

export default Template2FAQ;