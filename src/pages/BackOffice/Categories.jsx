import React from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, FolderTree, Loader, AlertCircle } from 'lucide-react';
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
import { useFetch } from '@/hooks';
import { toast } from 'sonner';

const FORM_INITIAL_STATE = {
  name: '',
  description: '',
  image: ''
};

const Categories = () => {
  const [open, setOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [formData, setFormData] = React.useState(FORM_INITIAL_STATE);
  const [submitting, setSubmitting] = React.useState(false);

  // Fetch categories using custom hook
  const {
    data: categoriesData,
    loading,
    error,
    refetch: refetchCategories,
  } = useFetch(
    'http://localhost:3000/api/categories',
    { immediate: true, showToast: false }
  );

  const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setFormData({
        name: category.category_name || '',
        description: category.category_description || '',
        image: category.category_image || ''
      });
    } else {
      setEditingId(null);
      setFormData(FORM_INITIAL_STATE);
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error('Category name is required');
        return;
      }

      setSubmitting(true);

      const url = editingId
        ? `http://localhost:3000/api/categories/${editingId}`
        : 'http://localhost:3000/api/categories';

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          category_name: formData.name.trim(),
          category_description: formData.description,
          category_image: formData.image,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(editingId ? 'Category updated successfully' : 'Category created successfully');
        setOpen(false);
        refetchCategories();
      } else {
        toast.error(result.message || 'Failed to save category');
      }
    } catch (err) {
      console.error('Error submitting category:', err);
      toast.error('Failed to save category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Category deleted successfully');
        refetchCategories();
      } else {
        toast.error(result.message || 'Failed to delete category');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Failed to delete category');
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header Section - CMS Style */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Organize your products into {categories.length} categories</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Category' : 'Add New Category'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update category details' : 'Create a new product category'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
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
                <Label htmlFor="image">Category Image URL</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting} className="bg-blue-600 hover:bg-blue-700">
                {submitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingId ? 'Update Category' : 'Add Category'}
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
              <h3 className="font-semibold text-red-900">Error loading categories</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <Button onClick={refetchCategories} variant="outline" className="ml-auto" size="sm">
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search Section - CMS Style */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCategories.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-12 text-center">
            <p className="text-gray-500">No categories found</p>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid - Professional CMS Layout */}
      {!loading && filteredCategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {category.category_image && (
                      <img
                        src={category.category_image}
                        alt={category.category_name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg text-gray-900 truncate">
                        {category.category_name}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1 line-clamp-2">
                        {category.category_description || 'No description'}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenDialog(category)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="text-sm text-gray-900 font-medium">
                      {new Date(category.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    <FolderTree className="h-4 w-4 mr-2" />
                    View Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;