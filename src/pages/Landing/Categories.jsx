import React from 'react';
import { ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Categories = () => {
  const mainCategories = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest gadgets and tech devices",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
      itemCount: 120,
      subcategories: ["Smartphones", "Laptops", "Audio", "Cameras", "Accessories"],
      featured: true
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy clothing and accessories",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
      itemCount: 250,
      subcategories: ["Men's Wear", "Women's Wear", "Shoes", "Bags", "Jewelry"],
      featured: true
    },
    {
      id: 3,
      name: "Home & Living",
      description: "Everything for your home",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&h=400&fit=crop",
      itemCount: 180,
      subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Storage"],
      featured: false
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      description: "Gear for active lifestyle",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
      itemCount: 95,
      subcategories: ["Fitness", "Cycling", "Camping", "Water Sports", "Team Sports"],
      featured: false
    },
    {
      id: 5,
      name: "Beauty & Health",
      description: "Personal care products",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
      itemCount: 145,
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Wellness"],
      featured: true
    },
    {
      id: 6,
      name: "Books & Media",
      description: "Knowledge and entertainment",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=400&fit=crop",
      itemCount: 320,
      subcategories: ["Books", "E-books", "Music", "Movies", "Games"],
      featured: false
    },
    {
      id: 7,
      name: "Toys & Kids",
      description: "Fun for all ages",
      image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&h=400&fit=crop",
      itemCount: 175,
      subcategories: ["Action Figures", "Educational", "Baby Products", "Outdoor Play", "Crafts"],
      featured: false
    },
    {
      id: 8,
      name: "Automotive",
      description: "Car parts and accessories",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
      itemCount: 88,
      subcategories: ["Parts", "Accessories", "Tools", "Care Products", "Electronics"],
      featured: false
    }
  ];

  const allCategories = mainCategories;
  const featuredCategories = mainCategories.filter(cat => cat.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h1>
            <p className="text-xl text-blue-100">
              Browse through our diverse range of product categories
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs for All/Featured */}
        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allCategories.map((category) => (
                <Card key={category.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      {category.featured && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-2xl font-bold mb-1">{category.name}</h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <Package className="h-4 w-4 mr-1" />
                        {category.itemCount} Items
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((sub, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                      {category.subcategories.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.subcategories.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Explore Category
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <Card key={category.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-3xl font-bold mb-2">{category.name}</h3>
                      <div className="flex items-center text-white/90">
                        <Package className="h-5 w-5 mr-2" />
                        {category.itemCount} Items Available
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Popular Subcategories:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">8+</div>
                <div className="text-blue-100">Main Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1,373</div>
                <div className="text-blue-100">Total Products</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">40+</div>
                <div className="text-blue-100">Subcategories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Categories;