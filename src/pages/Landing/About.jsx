import React from 'react';
import { Target, Eye, Award, Users, TrendingUp, Globe, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do, ensuring satisfaction with every interaction."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Quality Assured",
      description: "Every product is carefully selected and tested to meet our high standards of quality."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Innovation",
      description: "We constantly evolve to bring you the latest products and shopping experiences."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Sustainability",
      description: "Committed to environmental responsibility and ethical business practices."
    }
  ];

  const milestones = [
    { year: "2018", title: "Founded", description: "ShopHub was born with a vision to revolutionize online shopping" },
    { year: "2019", title: "100K Customers", description: "Reached our first major milestone of 100,000 happy customers" },
    { year: "2021", title: "Global Expansion", description: "Expanded operations to 15 countries worldwide" },
    { year: "2023", title: "1M Products", description: "Achieved catalog of over 1 million products across all categories" },
    { year: "2024", title: "Industry Leader", description: "Recognized as one of the top e-commerce platforms globally" }
  ];

  const stats = [
    { number: "5M+", label: "Happy Customers" },
    { number: "1M+", label: "Products" },
    { number: "50+", label: "Countries" },
    { number: "99.8%", label: "Satisfaction Rate" }
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { name: "Michael Chen", role: "CTO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { name: "Emily Davis", role: "Head of Operations", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
    { name: "David Kim", role: "Head of Marketing", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white text-blue-600 hover:bg-white">Est. 2018</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About ShopHub
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              We're on a mission to make quality products accessible to everyone, everywhere. Since 2018, we've been connecting customers with the products they love.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-10 w-10 text-blue-600" />
                <CardTitle className="text-3xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide an exceptional online shopping experience by offering high-quality products, competitive prices, and outstanding customer service. We strive to make shopping easy, enjoyable, and accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-10 w-10 text-blue-600" />
                <CardTitle className="text-3xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the world's most trusted and customer-centric e-commerce platform, where people can find anything they want to buy online with confidence, convenience, and satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-none shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-gray-600 text-lg">Key milestones that shaped who we are today</p>
        </div>
        <div className="max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative">
              {index !== milestones.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-blue-200"></div>
              )}
              <div className="flex gap-6 mb-12">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg relative z-10">
                  {milestone.year}
                </div>
                <Card className="flex-1 border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">{milestone.title}</CardTitle>
                    <CardDescription className="text-base">{milestone.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 text-lg">The passionate team driving our success</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-none shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none">
          <CardContent className="text-center py-12">
            <Award className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of millions of satisfied customers who trust ShopHub for their shopping needs
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;