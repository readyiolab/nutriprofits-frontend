import React from 'react';
import { Target, Eye, Award, Users, TrendingUp, Globe, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: "Client-Centric",
      description: "We align our roadmap directly with our partners' and wellness entrepreneurs' business growth."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Robust Isolation",
      description: "Every website instance runs with absolute data security, high speed, and reliable uptime."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "eCommerce Innovation",
      description: "Constant feature upgrades, modular storefront layouts, and seamless domain verification processes."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Borderless Scaling",
      description: "Built for global operations with localized layout options, multi-country templates, and stable infrastructure."
    }
  ];

  const milestones = [
    { year: "2022", title: "NutriProfits Platform Launch", description: "Created the foundational multi-tenant website structure for custom wellness storefronts." },
    { year: "2023", title: "Domain Verification and Dynamic Router", description: "Released the domain management engine, enabling verified custom domains to resolve stores instantly." },
    { year: "2024", title: "Lazy Loading & Lazy Catalog Queries", description: "Optimized initial page load times by dynamically parsing layout JSONs and loading store template modules dynamically." },
    { year: "2025", title: "Global Expansion & SEO Tools", description: "Integrated full control over metadata, localized blogs, and real-time performance analytics in back-offices." }
  ];

  const stats = [
    { number: "1000+", label: "Active Stores Launched" },
    { number: "10+", label: "Niche Categories Ready" },
    { number: "100+", label: "Custom Domains Verified" },
    { number: "99.99%", label: "Platform Uptime Guaranteed" }
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { name: "Michael Chen", role: "CTO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { name: "Emily Davis", role: "Head of Operations", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
    { name: "David Kim", role: "Lead Solutions Architect", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white overflow-hidden py-24 md:py-32 border-b border-indigo-900/40">
        <div className="absolute inset-0 bg-radial-gradient opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <Badge className="mb-4 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 text-sm font-semibold rounded-full uppercase tracking-wider">
            Our Mission
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 mb-6">
            About NutriProfits
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            We empower entrepreneurs, agencies, and wellness brands to launch high-performance supplement stores in minutes. Our SaaS infrastructure manages the code, hosting, and catalog—you grow the business.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-1">
                <div className="text-3xl md:text-5xl font-extrabold text-blue-600">{stat.number}</div>
                <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-100/80 transition-all rounded-3xl overflow-hidden p-8 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-blue-600" />
              <CardTitle className="text-2xl font-extrabold text-slate-900">Our Mission</CardTitle>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              To provide a turn-key eCommerce framework where wellness businesses can expand globally. We solve the technical overhead—from custom domains and layouts to database queries and secure data isolation—enabling business owners to focus on customer acquisition.
            </p>
          </Card>

          <Card className="border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-100/80 transition-all rounded-3xl overflow-hidden p-8 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-8 w-8 text-blue-600" />
              <CardTitle className="text-2xl font-extrabold text-slate-900">Our Vision</CardTitle>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              To become the global software foundation for the health, beauty, and supplement eCommerce industry, powering thousands of localized digital storefronts with high-speed rendering and automated catalog management.
            </p>
          </Card>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20 border-t border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Core Values</h2>
            <p className="text-slate-500 max-w-md mx-auto text-sm md:text-base">
              The engineering and business principles that guide our development
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center border border-slate-100 shadow-md hover:shadow-xl transition-all rounded-2xl p-6 bg-slate-50/40">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 mb-2">{value.title}</CardTitle>
                <CardContent className="p-0">
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Journey</h2>
          <p className="text-slate-500 text-sm md:text-base">Key milestones of how NutriProfits evolved into a SaaS platform</p>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block"></div>
          {milestones.map((milestone, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 mb-12 relative group">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-extrabold text-lg z-10 shadow-md group-hover:bg-blue-500 transition-colors">
                {milestone.year}
              </div>
              <Card className="flex-1 border border-slate-100 shadow-md hover:shadow-lg transition-all rounded-2xl p-6 bg-white">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-lg font-bold text-slate-900">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-slate-600 text-sm leading-relaxed">{milestone.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Meet Our Leadership</h2>
            <p className="text-slate-500 text-sm md:text-base">The passionate team driving our infrastructure development</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center border border-slate-100 shadow-md hover:shadow-xl transition-all overflow-hidden rounded-2xl bg-slate-50/20">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-bold text-slate-900">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold text-sm mt-1">{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <Card className="bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 text-white border-none shadow-xl rounded-3xl overflow-hidden text-center py-12 px-6">
          <Award className="h-12 w-12 mx-auto mb-4 text-blue-300" />
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">Build Your Brand. Grow Your Business.</h2>
          <p className="text-base md:text-lg text-blue-100 mb-6 max-w-xl mx-auto">
            Join successful wellness entrepreneurs who trust NutriProfits to power their digital health storefronts.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default About;