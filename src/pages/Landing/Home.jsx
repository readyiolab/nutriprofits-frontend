import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Clock, Check, Globe, Layout, Database, ShoppingBag, 
  BarChart, Settings, Smartphone, Award, Sparkles, CheckCircle2, ChevronRight, HelpCircle, 
  Plus, Minus, Users, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const websiteFeatures = [
    "Custom Domain Support",
    "SEO-Friendly Pages",
    "Mobile Responsive Design",
    "Fast Loading Performance",
    "Blog Management",
    "Product Catalog",
    "Category Pages",
    "About Us Page",
    "Contact Us Page",
    "FAQ Management"
  ];

  const dashboardControls = [
    "Products",
    "Categories",
    "Orders",
    "Customers",
    "Website Content",
    "Blogs",
    "FAQs",
    "Contact Enquiries",
    "Media Files",
    "SEO Settings",
    "Users & Staff"
  ];

  const categories = [
    { name: "Weight Management", slug: "weight-management" },
    { name: "Beauty & Skincare", slug: "beauty-skincare" },
    { name: "Men's Health", slug: "mens-health" },
    { name: "Women's Health", slug: "womens-health" },
    { name: "Hair Care", slug: "hair-care" },
    { name: "Fitness & Bodybuilding", slug: "fitness-bodybuilding" },
    { name: "General Wellness", slug: "general-wellness" },
    { name: "Vitamins & Supplements", slug: "vitamins-supplements" },
    { name: "Anti-Aging Products", slug: "anti-aging" },
    { name: "Lifestyle Products", slug: "lifestyle" }
  ];

  const valueProps = [
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Global Business Opportunities",
      desc: "Sell products to customers worldwide with multi-country support, localized content, scalable infrastructure, and multi-language landing pages.",
      items: ["Multi-country support", "Multi-language landing pages", "International customer reach", "Localized content support", "Scalable infrastructure"]
    },
    {
      icon: <BarChart className="h-6 w-6 text-blue-600" />,
      title: "Real-Time Analytics & Tracking",
      desc: "Monitor your business performance with powerful reporting tools that help you make better business decisions.",
      items: ["Orders & Revenue tracking", "Conversion Rates tracking", "Product Performance", "Customer Activity", "Marketing Campaign Results"]
    },
    {
      icon: <Settings className="h-6 w-6 text-blue-600" />,
      title: "Complete Content Management",
      desc: "Update your website anytime without developer support. Full CMS control makes editing content, pages, and products simple.",
      items: ["Homepage & landing pages", "About Us & Contact Us", "FAQ pages & Blogs", "Product Details", "Privacy Policy & Terms"]
    }
  ];

  const steps = [
    { step: "01", title: "Choose Your Plan", desc: "Select the pricing plan that fits your business scale." },
    { step: "02", title: "Connect Custom Domain", desc: "Add your own branded web address easily." },
    { step: "03", title: "Customize Website Content", desc: "Edit text, colors, layouts, and pages via the dashboard." },
    { step: "04", title: "Manage Products", desc: "Activate high-converting products and categories." },
    { step: "05", title: "Launch and Grow", desc: "Go live, drive traffic, and watch your business expand." }
  ];

  const faqs = [
    {
      question: "Do I need technical knowledge?",
      answer: "No. Everything can be managed from the dashboard without writing code or having server configuration skills."
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes. Connect any custom domain you own through our secure and simple domain setup."
    },
    {
      question: "Can I manage website content?",
      answer: "Yes. Full CMS access is included, letting you edit text, banners, images, blogs, policies, and more."
    },
    {
      question: "Can I add products and categories?",
      answer: "Yes. Product and category management is fully available from the admin panel, allowing you to scale your catalog as needed."
    },
    {
      question: "Is the website mobile-friendly?",
      answer: "Yes. All frontend templates are designed with modern, fully responsive grids that adapt perfectly to mobile, tablet, and desktop screens."
    },
    {
      question: "Can I scale my business later?",
      answer: "Absolutely. Our platform is built on a high-performance multi-tenant SaaS architecture designed to scale seamlessly with your traffic and orders."
    }
  ];

  const reasonsToChoose = [
    "Ready-to-Launch Website",
    "Powerful Back Office",
    "Product & Category Management",
    "Global Reach",
    "Multi-Language Support",
    "Real-Time Reporting",
    "Mobile Responsive Design",
    "SEO Optimized",
    "Fast & Secure Hosting",
    "Dedicated Support Team",
    "Custom Branding",
    "Custom Domain Support"
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white py-24 md:py-36 border-b border-indigo-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="px-4 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 text-sm font-semibold rounded-full uppercase tracking-wider">
              Multi-Tenant SaaS Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
              Launch Your Own Health & Wellness eCommerce Business
            </h1>
            <p className="text-xl md:text-2xl font-bold text-blue-300 max-w-3xl mx-auto leading-relaxed">
              Complete Website + Back Office + Product Management Platform
            </p>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Start your own branded health, wellness, nutrition, beauty, or supplement business with a ready-to-use website and powerful back-office management system. No coding required. No technical expertise needed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Button 
                onClick={() => {
                  const element = document.getElementById("how-it-works");
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-50 text-white font-semibold text-base py-6 px-8 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/templates')}
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-white font-semibold text-base py-6 px-8 rounded-xl"
              >
                Explore Templates
              </Button>
            </div>
            <div className="pt-4 text-sm text-slate-400 font-medium">
              Simply choose your domain, customize your content, add products, and launch.
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need To Run Your Business
            </h2>
            <p className="text-lg text-slate-600">
              A complete, integrated technology stack designed to handle front-end storefronts and back-end catalog control.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Website Features */}
            <Card className="border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-100/80 transition-all rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600/5 to-indigo-600/5 p-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Layout className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Professional Website</CardTitle>
                    <CardDescription className="text-sm mt-1">Modern, mobile-friendly design built to convert visitors.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  Get a stunning, ready-to-launch website tailored to represent your brand. Deliver high-speed pages optimized for organic search ranking and visual storytelling.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {websiteFeatures.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Back Office Dashboard */}
            <Card className="border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-100/80 transition-all rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600/5 to-purple-600/5 p-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Database className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Powerful Back Office Dashboard</CardTitle>
                    <CardDescription className="text-sm mt-1">Manage your entire operation from one administrative panel.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  Control everything from catalog lists to incoming contact forms. Fully isolate operations with multi-role user accounts and structured settings tables.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dashboardControls.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="px-3 py-1 bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-full uppercase tracking-wider">
              Niche Supplement Markets
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              High-Converting Product Catalog
            </h2>
            <p className="text-lg text-slate-600">
              Access a growing catalog of health and wellness products across multiple high-demand categories.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {categories.map((cat, idx) => (
              <Card key={idx} className="border border-slate-100/80 shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all rounded-2xl overflow-hidden group cursor-pointer bg-white text-center p-6">
                <div className="w-12 h-12 bg-blue-500/5 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-semibold italic text-sm">
              Our catalog is continuously updated with trending, high-quality, and high-demand wellness products.
            </p>
          </div>
        </div>
      </section>

      {/* Global & Real-Time analytics Section */}
      <section className="py-24 bg-white border-t border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {valueProps.map((prop, idx) => (
              <Card key={idx} className="border border-slate-100 shadow-lg hover:shadow-2xl transition-all rounded-3xl p-8 bg-slate-50/50 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center flex-shrink-0">
                    {prop.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{prop.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{prop.desc}</p>
                </div>
                <div className="mt-8 border-t border-slate-100 pt-6 space-y-2">
                  {prop.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS Architecture Callout */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent)]"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-xs font-bold rounded-full uppercase tracking-wider">
                Multi-Tenant Architecture
              </Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Branded Independence. Secure Isolation.
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                Our advanced multi-tenant SaaS architecture ensures that every partner gets a completely isolated ecosystem. Build your brand with absolute confidence in site security and scalability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Separate Website",
                  "Separate Admin Dashboard",
                  "Separate Branding",
                  "Separate Domain",
                  "Independent CMS",
                  "Secure Data Isolation"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-slate-200 text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfect For */}
            <Card className="bg-slate-800/50 border border-slate-700/50 backdrop-blur rounded-3xl p-8">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-xl font-bold text-white">Perfect For</CardTitle>
                <CardDescription className="text-slate-400 text-sm">Grow your online presence, manage products, and run custom wellness systems.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Entrepreneurs",
                  "Affiliate Marketers",
                  "Agencies",
                  "Distributors",
                  "Wellness Brands",
                  "Supplement Businesses"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700/30">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="text-white font-bold text-sm uppercase tracking-wider">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Our Platform? */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-slate-600">
              Get an unmatched foundation to launch your supplement or wellness brand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasonsToChoose.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 border border-slate-100 rounded-2xl shadow-sm bg-slate-50/50 hover:border-blue-500/30 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-slate-800 font-bold text-sm uppercase tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Five simple steps to establish your online supplement business.
            </p>
          </div>

          <div className="space-y-8 relative">
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block"></div>
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-6 relative group">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-extrabold text-xl z-10 shadow-md group-hover:bg-blue-500 transition-colors">
                  {step.step}
                </div>
                <Card className="flex-1 border border-slate-100 shadow-md group-hover:shadow-lg transition-all rounded-2xl">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg md:text-xl font-bold text-slate-900">{step.title}</CardTitle>
                    <CardDescription className="text-sm mt-1 text-slate-600">{step.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Answers to the most common questions about NutriProfits.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 hover:text-blue-600 hover:bg-slate-50 transition-all"
                >
                  <span className="text-base md:text-lg">{faq.question}</span>
                  {openFaq === idx ? (
                    <Minus className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-6 pt-0 border-t border-slate-100/50 bg-white text-slate-600 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 text-white border-none shadow-2xl rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <CardContent className="text-center py-16 px-8 relative z-10 space-y-8">
              <Award className="h-16 w-16 mx-auto mb-2 text-blue-300" />
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Build Your Brand. Own Your Website. Grow Your Business.
              </h2>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Launch your own health and wellness store with a professional website, powerful back office, and complete business management tools—all from a single platform.
              </p>
              <div className="flex justify-center pt-2">
                <Button 
                  onClick={() => navigate('/contact')}
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-6 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 text-base"
                >
                  Contact Sales & Launch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
};

export default Home;