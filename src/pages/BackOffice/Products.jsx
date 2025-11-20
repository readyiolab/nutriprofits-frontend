import React from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useFetch } from '@/hooks';
import { toast } from 'sonner';

const FORM_INITIAL_STATE = {
  name: '',
  categoryId: '',
  price: '',
  stock: '',
  description: '',
  fullDescription: '',
  highlights: '',
  benefits: '',
  ingredients: '',
  image: '',
  logoUrl: ''
};

const Products = () => {
  const [open, setOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all-status');
  const [formData, setFormData] = React.useState(FORM_INITIAL_STATE);
  const [submitting, setSubmitting] = React.useState(false);

  // Fetch products and categories using custom hooks
  const {
    data: productsData,
    loading,
    error,
    refetch: refetchData,
  } = useFetch('http://localhost:3000/api/backoffice/product-categories/products', { immediate: true, showToast: false });

  const { data: categoriesData } = useFetch('http://localhost:3000/api/backoffice/product-categories/categories', { immediate: true, showToast: false });

  // Ensure products and categories are arrays
  const products = Array.isArray(productsData) ? productsData : (productsData?.data || []);
  const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);

  // Debug logging
  React.useEffect(() => {
    console.log('Products Data:', { productsData, products });
    console.log('Categories Data:', { categoriesData, categories });
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [productsData, products, categoriesData, categories, loading, error]);

  const getStatusColor = (stock) => {
    if (stock > 50) return 'bg-green-100 text-green-700';
    if (stock > 10) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getStatusText = (stock) => {
    if (stock > 50) return 'In Stock';
    if (stock > 10) return 'Low Stock';
    return 'Out of Stock';
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryIdNum = parseInt(selectedCategory);
    const matchesCategory = selectedCategory === 'all' || product.category_id === categoryIdNum;
    const matchesStatus = selectedStatus === 'all-status' || 
      (selectedStatus === 'in-stock' && product.stock_quantity > 50) ||
      (selectedStatus === 'low-stock' && product.stock_quantity > 10 && product.stock_quantity <= 50) ||
      (selectedStatus === 'out-stock' && product.stock_quantity <= 10);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.product_name || '',
        categoryId: product.category_id || '',
        price: product.product_price || '',
        stock: product.stock_quantity || '',
        description: product.product_description || '',
        fullDescription: product.full_description || '',
        highlights: product.highlights || '',
        benefits: product.benefits || '',
        ingredients: product.ingredients || '',
        image: product.product_image || '',
        logoUrl: product.logo_url || ''
      });
    } else {
      setEditingId(null);
      setFormData(FORM_INITIAL_STATE);
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.price || !formData.stock) {
        toast.error('Please fill in all required fields');
        return;
      }

      setSubmitting(true);

      const url = editingId
        ? `http://localhost:3000/api/backoffice/product-categories/products/${editingId}`
        : 'http://localhost:3000/api/backoffice/product-categories/products';

      const payload = {
        product_name: formData.name,
        category_id: formData.categoryId ? parseInt(formData.categoryId) : null,
        product_price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock),
        product_description: formData.description,
        full_description: formData.fullDescription,
        highlights: formData.highlights,
        benefits: formData.benefits,
        ingredients: formData.ingredients,
        product_image: formData.image,
        logo_url: formData.logoUrl,
      };

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(editingId ? 'Product updated successfully' : 'Product created successfully');
        setOpen(false);
        refetchData();
      } else {
        toast.error(result.message || 'Failed to save product');
      }
    } catch (err) {
      console.error('Error submitting product:', err);
      toast.error('Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/backoffice/product-categories/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Product deleted successfully');
        refetchData();
      } else {
        toast.error(result.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header Section - CMS Style */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage {products.length} products across all categories</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update product details' : 'Enter the details of the new product'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Basic Information */}
              <div className="space-y-3 pb-4 border-b">
                <h3 className="font-semibold text-sm text-gray-700">Basic Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name ?? ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Category</Label>
                    <Select value={formData.categoryId ?? ''} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories && categories.filter(cat => cat?.id).map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat?.category_name || 'Unnamed'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price ?? ''}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div className="space-y-3 pb-4 border-b">
                <h3 className="font-semibold text-sm text-gray-700">Inventory</h3>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock ?? ''}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 pb-4 border-b">
                <h3 className="font-semibold text-sm text-gray-700">Description</h3>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    value={formData.description ?? ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Full Description</Label>
                  <Textarea
                    id="fullDescription"
                    placeholder="Enter full product description"
                    value={formData.fullDescription ?? ''}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-3 pb-4 border-b">
                <h3 className="font-semibold text-sm text-gray-700">Product Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="highlights">Highlights</Label>
                  <Textarea
                    id="highlights"
                    placeholder="Key product highlights"
                    rows="2"
                    value={formData.highlights ?? ''}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Product benefits"
                    rows="2"
                    value={formData.benefits ?? ''}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Textarea
                    id="ingredients"
                    placeholder="Ingredients list"
                    rows="2"
                    value={formData.ingredients ?? ''}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-gray-700">Images</h3>
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image URL</Label>
                  <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image ?? ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://example.com/logo.jpg"
                    value={formData.logoUrl ?? ''}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting} className="bg-blue-600 hover:bg-blue-700">
                {submitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingId ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Error loading products</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <Button onClick={refetchData} variant="outline" className="ml-auto" size="sm">
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filters Section - CMS Style */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by product name..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories && categories.filter(cat => cat?.id).map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat?.category_name || 'Unnamed'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table - Professional CMS Layout */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b bg-white">
          <CardTitle className="text-lg">All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Stock</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const categoryName = categories.find(c => c.id === product.category_id)?.category_name || 'Uncategorized';
                    return (
                      <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {product.product_image && (
                              <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{product.product_name}</p>
                              <p className="text-xs text-gray-500">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{categoryName}</Badge>
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-900">
                          ${parseFloat(product.product_price).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-900 font-medium">{product.stock_quantity}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(product.stock_quantity)}>
                            {getStatusText(product.stock_quantity)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(product)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 cursor-pointer"
                                onClick={() => handleDelete(product.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;