import { useState } from "react";

const Template2FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is your shipping policy?",
      answer: "We offer free shipping on all orders over $50. Standard shipping takes 3-5 business days."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 100 countries worldwide. International shipping times vary by location."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unused and in original packaging."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, gift wrapping is available for an additional $5 per item."
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600">Find answers to common questions about our products and services</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <span className="text-2xl text-blue-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white inline-block">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-4">Our support team is here to help</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template2FAQ;