import React from 'react';
import { Search, Filter, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const Products = () => {
  const [priceRange, setPriceRange] = React.useState([0, 500]);

  const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", rating: 4.5, reviews: 128, category: "Electronics", badge: "Bestseller" },
    { id: 2, name: "Smart Watch", price: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop", rating: 4.8, reviews: 256, category: "Electronics", badge: "New" },
    { id: 3, name: "Laptop Backpack", price: 49.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", rating: 4.6, reviews: 89, category: "Fashion", badge: null },
    { id: 4, name: "Desk Lamp", price: 39.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop", rating: 4.3, reviews: 64, category: "Home", badge: null },
    { id: 5, name: "Running Shoes", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop", rating: 4.7, reviews: 192, category: "Sports", badge: "Hot" },
    { id: 6, name: "Coffee Maker", price: 79.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop", rating: 4.4, reviews: 73, category: "Home", badge: null },
    { id: 7, name: "Yoga Mat", price: 29.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop", rating: 4.5, reviews: 156, category: "Sports", badge: null },
    { id: 8, name: "Sunglasses", price: 89.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop", rating: 4.6, reviews: 98, category: "Fashion", badge: "Sale" },
  ];

  const categories = ["Electronics", "Fashion", "Home", "Sports"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our complete collection of quality products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="mb-2 block">Search Products</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search..." className="pl-9" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <Label className="mb-3 block">Categories</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="mb-3 block">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <Label className="mb-3 block">Rating</Label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="text-sm font-medium flex items-center gap-1"
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {rating}+ Stars
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">1-{products.length}</span> of <span className="font-semibold">{products.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <Label>Sort by:</Label>
                <Select defaultValue="popularity">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600">
                        {product.badge}
                      </Badge>
                    )}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;