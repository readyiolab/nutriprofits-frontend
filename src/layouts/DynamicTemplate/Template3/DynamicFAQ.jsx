import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const DynamicFAQ = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Dynamic page content
  const pageContent = {
    hero_title: "FAQ SECTION",
    hero_subtitle: "Frequently Asked Questions",
    hero_description: "Find quick answers to the most common questions about our products and services.",
    hero_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
    cta_title: "Still have questions?",
    cta_description: "Our support team is ready to help you 24/7.",
    cta_button_text: "Contact Support",
    cta_button_link: `/template/${templateId}/contact`,
    cta_secondary_button_text: "View All Products",
    cta_secondary_button_link: `/template/${templateId}/products`,
  };

  // FAQ items from DB
  const faqItems = [
    { faq_id: 1, question: "What is your shipping policy?", answer: "We offer free standard shipping on all orders over $50. Standard delivery takes 5-7 business days. Express shipping is available at checkout.", category: "Shipping", display_order: 1, is_active: 1 },
    { faq_id: 2, question: "Do you offer international shipping?", answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination.", category: "Shipping", display_order: 2, is_active: 1 },
    { faq_id: 3, question: "What is your return policy?", answer: "We offer a 30-day money-back guarantee on all products. Items must be unused and in original packaging.", category: "Returns", display_order: 3, is_active: 1 },
    { faq_id: 4, question: "How can I track my order?", answer: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package on our website.", category: "Orders", display_order: 4, is_active: 1 },
    { faq_id: 5, question: "What payment methods do you accept?", answer: "We accept all major credit cards, debit cards, PayPal, and digital wallets. All payments are securely processed.", category: "Payment", display_order: 5, is_active: 1 },
    { faq_id: 6, question: "How do I cancel or modify my order?", answer: "You can cancel or modify your order within 24 hours of placing it by contacting our support team.", category: "Orders", display_order: 6, is_active: 1 },
    { faq_id: 7, question: "Do you offer refunds?", answer: "Yes, we offer full refunds for returns within 30 days. The item must be in its original condition.", category: "Returns", display_order: 7, is_active: 1 },
    { faq_id: 8, question: "Is my payment information secure?", answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your credit card details.", category: "Payment", display_order: 8, is_active: 1 },
  ];

  const categories = ["all", ...new Set(faqItems.map(item => item.category))];

  const filteredFaqs = faqItems
    .filter(faq => faq.is_active === 1)
    .filter(faq => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.display_order - b.display_order);

  const faqsByCategory = categories.reduce((acc, cat) => {
    if (cat !== "all") {
      acc[cat] = filteredFaqs.filter(f => f.category === cat);
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pageContent.hero_image})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full mb-6">
            <HelpCircle className="w-10 h-10" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-90">
            {pageContent.hero_subtitle}
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6">{pageContent.hero_title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{pageContent.hero_description}</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16 -mt-10 relative z-20">
        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg border-2 focus-visible:ring-red-600 rounded-full"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full ${
                selectedCategory === cat
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              {cat !== "all" && selectedCategory === "all" && (
                <Badge variant="secondary" className="ml-2">
                  {faqItems.filter(f => f.category === cat).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* FAQ Accordion */}
        {filteredFaqs.length === 0 ? (
          <Card className="p-16 text-center">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No questions found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </Card>
        ) : selectedCategory === "all" ? (
          // Grouped by category
          <div className="space-y-12">
            {Object.entries(faqsByCategory).map(([category, items]) => (
              <div key={category}>
                
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {items.map((faq) => (
                    <AccordionItem key={faq.faq_id} value={`item-${faq.faq_id}`} className="border-2 rounded-xl overflow-hidden data-[state=open]:border-red-600">
                      <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50">
                        <span className="font-semibold text-lg pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-6 bg-gray-50 border-t">
                        <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                        <Badge variant="outline" className="border-red-600 text-red-600">
                          {faq.category}
                        </Badge>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        ) : (
          // Single category view
          <Accordion type="single" collapsible className="w-full space-y-3">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.faq_id} value={`item-${faq.faq_id}`} className="border-2 rounded-xl overflow-hidden data-[state=open]:border-red-600">
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50">
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 bg-gray-50 border-t">
                  <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                  <Badge variant="outline" className="border-red-600 text-red-600">
                    {faq.category}
                  </Badge>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20 m-10 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
            <MessageCircle className="w-9 h-9" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">{pageContent.cta_title}</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{pageContent.cta_description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-10 rounded-full shadow-lg transform hover:scale-105 transition"
              onClick={() => navigate(pageContent.cta_button_link)}
            >
              {pageContent.cta_button_text}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-gray-900 hover:bg-white  px-10 rounded-full"
              onClick={() => navigate(pageContent.cta_secondary_button_link)}
            >
              {pageContent.cta_secondary_button_text}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicFAQ;