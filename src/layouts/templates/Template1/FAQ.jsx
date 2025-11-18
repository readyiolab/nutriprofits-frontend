import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Template1FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is your shipping policy?",
      answer: "We offer free shipping on all orders over $50. Standard shipping takes 3-5 business days.",
    },
    {
      id: 2,
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 100 countries worldwide. International shipping times vary by location.",
    },
    {
      id: 3,
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unused and in original packaging.",
    },
    {
      id: 4,
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email.",
    },
    {
      id: 5,
      question: "Do you offer gift wrapping?",
      answer: "Yes, gift wrapping is available for an additional $5 per item.",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] mb-8 md:mb-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 text-white order-2 md:order-1">
            <span className="inline-block bg-[#f8b400] text-[#004445] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              FAQ SECTION
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#faf5e4] mb-4 sm:mb-6 leading-relaxed">
              Find quick answers to the most common questions about our
              products, shipping, returns, and more.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <button className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#ffa500] shadow-lg text-sm sm:text-base transition-all">
                Browse All
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-white hover:text-[#004445] transition-all text-sm sm:text-base">
                Contact Us
              </button>
            </div>
          </div>

          <div className="h-[250px] sm:h-[300px] md:h-full md:min-h-[400px] bg-gradient-to-br from-[#2c786c] to-[#f8b400] flex items-center justify-center order-1 md:order-2">
            <div className="w-full h-full bg-[#faf5e4]/20 flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <img
                src="https://plus.unsplash.com/premium_photo-1678216285963-253d94232eb7?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600"
                alt="FAQ illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION HEADING */}
      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#004445] mb-2 sm:mb-3">
          Browse FAQs
        </h2>
        <p className="text-black text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          Click any question to view the answer
        </p>
      </div>

      {/* SIMPLE ACCORDION LIST */}
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-4 sm:px-6 lg:px-8">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 pr-2">
                <span className="font-semibold text-[#004445] text-sm sm:text-base">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 sm:h-5 sm:w-5 text-[#f8b400] transition-transform duration-300 flex-shrink-0 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === idx ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#004445] to-[#2c786c] py-8 sm:py-10 md:py-12 mx-4 sm:mx-6 lg:mx-10 mb-8 md:mb-12 rounded-2xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#f8b400] opacity-10 rounded-full -mr-24 md:-mr-32 -mt-24 md:-mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#f8b400] opacity-10 rounded-full -ml-16 md:-ml-24 -mb-16 md:-mb-24"></div>
        
        <div className="max-w-4xl mx-auto text-center text-white px-4 sm:px-6 relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4">
            Still have questions?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#faf5e4] mb-6 sm:mb-8">
            Our support team is ready to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#ffa500] cursor-pointer shadow-lg text-sm sm:text-base transition-all">
              Contact Support
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-[#004445] cursor-pointer transition-all text-sm sm:text-base">
              View All FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1FAQ;