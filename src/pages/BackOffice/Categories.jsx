import React from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, FolderTree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Categories = () => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    parent: ''
  });

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic gadgets and devices',
      products: 450,
      subcategories: 8,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Clothing and accessories',
      products: 680,
      subcategories: 12,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Home & Living',
      description: 'Home decor and furniture',
      products: 320,
      subcategories: 6,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Sports & Outdoors',
      description: 'Sports equipment and outdoor gear',
      products: 290,
      subcategories: 5,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      name: 'Beauty & Health',
      description: 'Beauty products and health items',
      products: 145,
      subcategories: 4,
      status: 'Inactive',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop'
    }
  ];

  const handleSubmit = () => {
    console.log('Category data:', formData);
    setOpen(false);
    setFormData({ name: '', description: '', parent: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Organize your products into categories</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new product category
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter category description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent">Parent Category (Optional)</Label>
                <Input
                  id="parent"
                  placeholder="Leave empty for main category"
                  value={formData.parent}
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search categories..." className="pl-9" />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Products</span>
                  <Badge variant="secondary">{category.products}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subcategories</span>
                  <Badge variant="secondary">{category.subcategories}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge className={category.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {category.status}
                  </Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <FolderTree className="h-4 w-4 mr-2" />
                  View Products
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;