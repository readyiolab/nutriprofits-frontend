import React from 'react';
import { Search, HelpCircle, Layout, Database, Shield, MessageCircle, Globe, ShoppingBag, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = [
    { id: 'platform', label: 'Platform & CMS', icon: <Layout className="h-5 w-5" /> },
    { id: 'domains', label: 'Domains & Branding', icon: <Globe className="h-5 w-5" /> },
    { id: 'catalog', label: 'Catalog & Products', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'security', label: 'Security & Scaling', icon: <Shield className="h-5 w-5" /> }
  ];

  const faqs = {
    platform: [
      {
        question: "Do I need technical knowledge?",
        answer: "No. Everything can be managed from the dashboard without writing code, managing servers, or having developer experience."
      },
      {
        question: "Can I manage website content?",
        answer: "Yes. Full CMS access is included, letting you edit text, banners, images, blogs, FAQ lists, and specific landing pages from the back-office dashboard."
      },
      {
        question: "Is the website mobile-friendly?",
        answer: "Yes. All frontend templates are fully responsive and optimized for mobile, tablet, and desktop screens."
      },
      {
        question: "Can I customize the look of my store?",
        answer: "Yes. You can select premium layouts, upload your custom logo, configure site-wide accent colors, and structure navigation directly from your back office."
      }
    ],
    domains: [
      {
        question: "Can I use my own domain?",
        answer: "Yes. You can connect any custom domain you own. We provide simple DNS instructions, and our system automatically provisions an SSL certificate for your secure custom domain."
      },
      {
        question: "Is custom branding supported?",
        answer: "Absolutely. All logos, footers, favicons, site names, and metadata can be customized so that visitors see only your brand."
      },
      {
        question: "How long does domain setup take?",
        answer: "Domain resolution usually takes between 1 to 24 hours depending on your DNS provider. Once DNS propagation is complete, your store goes live immediately."
      }
    ],
    catalog: [
      {
        question: "Can I add products and categories?",
        answer: "Yes. Product and category management is fully available from the admin panel, allowing you to activate and catalog items according to your business needs."
      },
      {
        question: "What health & wellness categories are supported?",
        answer: "Our catalog covers Weight Management, Beauty & Skincare, Men's Health, Women's Health, Hair Care, Fitness & Bodybuilding, General Wellness, Vitamins & Supplements, Anti-Aging, and Lifestyle products."
      },
      {
        question: "Can I edit descriptions and specifications?",
        answer: "Yes. You can customize the title, full descriptions, highlights, benefits, ingredients, and pricing details of any product to fit your target market."
      }
    ],
    security: [
      {
        question: "Is the system built on a secure architecture?",
        answer: "Yes. We run a secure multi-tenant SaaS architecture where every store operates in secure database isolation, preventing any cross-tenant data leaks."
      },
      {
        question: "Can I scale my business later?",
        answer: "Absolutely. Our platform is built on a scalable and optimized infrastructure capable of handling high concurrent traffic and rapid order growth without slowdowns."
      },
      {
        question: "How is database connectivity maintained?",
        answer: "We employ connection pooling and automatic query retries to ensure that transient database connectivity glitches never affect your customer storefronts."
      }
    ]
  };

  const quickHelp = [
    {
      icon: <Layout className="h-8 w-8 text-blue-600" />,
      title: "Configure Store",
      description: "Customize your layout and styles"
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Add Domain",
      description: "Set up your branded web address"
    },
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: "Import Catalog",
      description: "Manage products & categories"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Contact Support",
      description: "We are here to help 24/7"
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = {};
  Object.entries(faqs).forEach(([categoryKey, questions]) => {
    const matched = questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matched.length > 0) {
      filteredFaqs[categoryKey] = matched;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <HelpCircle className="h-16 w-16 mx-auto mb-4 text-blue-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-200 mb-8">
              Find answers to common questions about launching and running your NutriProfits store
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-12 py-6 text-lg bg-white text-gray-900 rounded-xl border-slate-200 shadow-lg shadow-indigo-950/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Cards */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {quickHelp.map((item, index) => (
            <Card key={index} className="hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer bg-white border-slate-100 rounded-2xl p-4 text-center">
              <CardHeader className="p-4">
                <div className="flex justify-center mb-2">
                  {item.icon}
                </div>
                <CardTitle className="text-lg font-bold text-slate-900">{item.title}</CardTitle>
                <CardDescription className="text-slate-500 text-xs mt-1">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="platform" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center justify-center gap-2 rounded-lg font-bold text-xs uppercase tracking-wider py-2">
                {category.icon}
                <span>{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const questions = filteredFaqs[category.id] || [];
            return (
              <TabsContent key={category.id} value={category.id}>
                <Card className="border border-slate-100 shadow-xl shadow-slate-100/50 rounded-3xl overflow-hidden bg-white p-6 md:p-8">
                  <CardHeader className="p-0 pb-6 border-b border-slate-100 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                        {category.icon}
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900">{category.label}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold">
                      {questions.length} Questions
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-0 pt-6">
                    {questions.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {questions.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100 last:border-0 py-2">
                            <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:text-blue-600 text-slate-800 transition-colors py-4">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 text-sm md:text-base leading-relaxed pb-4">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-12 text-slate-400">
                        No answers found for "{searchQuery}". Try another keyword.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {/* Still Need Help Section */}
      <div className="bg-slate-100/60 py-16 border-t border-slate-200/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 text-white border-none shadow-2xl rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <CardContent className="text-center py-12 px-6 relative z-10 space-y-6">
              <MessageCircle className="h-14 w-14 mx-auto mb-2 text-blue-300 animate-bounce" />
              <h2 className="text-2xl md:text-3xl font-extrabold">Still Have Questions?</h2>
              <p className="text-lg text-blue-100 max-w-xl mx-auto">
                Our operations team is available 24/7 to assist you in setting up and launching your store.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-5 px-8 rounded-xl shadow-lg">
                  Submit Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;