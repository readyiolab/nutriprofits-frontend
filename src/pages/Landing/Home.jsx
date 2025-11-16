import React from 'react';
import { ArrowRight, ShoppingCart, Truck, Shield, Clock, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure Payment",
      description: "100% secure transactions"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "24/7 Support",
      description: "Always here to help"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      rating: 4.5,
      reviews: 128,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      rating: 4.8,
      reviews: 256,
      badge: "New"
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      rating: 4.6,
      reviews: 89,
      badge: "Hot"
    },
    {
      id: 4,
      name: "Desk Lamp",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
      rating: 4.3,
      reviews: 64,
      badge: null
    }
  ];

  const categories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop", count: "120+ Items" },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop", count: "250+ Items" },
    { name: "Home & Living", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop", count: "180+ Items" },
    { name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop", count: "95+ Items" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white text-blue-600 hover:bg-white">New Collection 2024</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Products for Your Lifestyle
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Shop the latest trends with unbeatable prices and quality guaranteed
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-none shadow-sm">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Browse our wide range of products</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm">{category.count}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Check out our top-selling items</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex">
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
                      {product.badge}
                    </Badge>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get exclusive offers and updates delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-md text-gray-900"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;