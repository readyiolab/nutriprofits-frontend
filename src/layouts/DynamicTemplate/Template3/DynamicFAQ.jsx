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

import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";

const DynamicFAQ = () => {
  const navigate = useNavigate();
  const backofficeData = useBackofficeData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const pageContent = backofficeData?.faqPageContent || {};
  const faqItems = backofficeData?.faqItems || [];

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
          style={{ backgroundImage: `url(${pageContent.hero_image_url || pageContent.hero_image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop"})` }}
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
              onClick={() => navigate(pageContent.cta_button_link || "/contact")}
            >
              {pageContent.cta_button_text || "Contact Support"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-gray-900 hover:bg-white  px-10 rounded-full text-white hover:text-gray-900"
              onClick={() => navigate(pageContent.cta_secondary_button_link || "/")}
            >
              {pageContent.cta_secondary_button_text || "View All Products"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicFAQ;