import React from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Loader,
  AlertCircle,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks";
import { toast } from "sonner";

// FIX: Use correct API base URL with backoffice context
const API_BASE_URL = "http://localhost:3001/api/backoffice/product-categories";

const FORM_INITIAL_STATE = {
  name: "",
  description: "",
  image: "",
  category_image: null,
};

const Categories = () => {
  const [view, setView] = React.useState("list");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [formData, setFormData] = React.useState(FORM_INITIAL_STATE);
  const [submitting, setSubmitting] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  // FIX: Fetch only current user's categories
  const {
    data: categoriesData,
    loading,
    error,
    refetch: refetchCategories,
  } = useFetch(`${API_BASE_URL}/categories`, {
    immediate: true,
    showToast: false,
    credentials: "include",
  });

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data || [];

  // Fetch products for selected category
  const {
    data: productsData,
    loading: productsLoading,
    refetch: refetchProducts,
  } = useFetch(
    selectedCategory
      ? `${API_BASE_URL}/products/category/${selectedCategory.id}`
      : null,
    { immediate: false, showToast: false, credentials: "include" }
  );

  const products = productsData?.data || [];

  const goToList = () => {
    setView("list");
    setSelectedCategory(null);
    setEditingId(null);
    setFormData(FORM_INITIAL_STATE);
  };

  const goToForm = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setFormData({
        name: category.category_name || "",
        description: category.category_description || "",
        image: category.category_image || "",
        category_image: null,
      });
    } else {
      setEditingId(null);
      setFormData(FORM_INITIAL_STATE);
    }
    setView("form");
  };

  const goToProducts = (category) => {
    setSelectedCategory(category);
    setView("products");
    refetchProducts();
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error("Category name is required");
        return;
      }

      setSubmitting(true);

      const form = new FormData();
      form.append("category_name", formData.name.trim());
      if (formData.description) {
        form.append("category_description", formData.description);
      }
      if (formData.category_image instanceof File) {
        form.append("category_image", formData.category_image);
      }

      const url = editingId
        ? `${API_BASE_URL}/categories/${editingId}`
        : `${API_BASE_URL}/categories`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        credentials: "include",
        body: form,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(editingId ? "Category updated!" : "Category created!");
        goToList();
        refetchCategories();
      } else {
        toast.error(result.message || "Failed to save");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Category deleted");
        refetchCategories();
      } else {
        toast.error(result.message || "Cannot delete");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (view === "form") {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goToList}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {editingId ? "Edit Category" : "Add New Category"}
              </h1>
              <p className="text-gray-600">
                {editingId ? "Update category details" : "Create a new product category"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={goToList}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {submitting ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {editingId ? "Update" : "Create"} Category
            </Button>
          </div>
        </div>

        <Card className="max-w-2xl">
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label>Category Name *</Label>
              <Input
                placeholder="e.g., Weight Loss"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Brief description about this category..."
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Category Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_image: e.target.files?.[0] || null,
                  })
                }
              />
              {formData.image && !formData.category_image && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Current image:</p>
                  <img
                    src={formData.image}
                    alt="Current"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === "products" && selectedCategory) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={goToList}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {selectedCategory.category_name}
            </h1>
            <p className="text-gray-600">Manage products in this category</p>
          </div>
        </div>

        {productsLoading ? (
          <div className="flex justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="pt-12 text-center text-gray-500">
              No products in this category yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                {product.product_image && (
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-lg">
                    {product.product_name}
                  </CardTitle>
                  <CardDescription>₹{product.product_price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">
                    Stock: {product.stock_quantity}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">
            Organize your products into {categories.length} categories
          </p>
        </div>
        <Button
          onClick={() => goToForm()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Category
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">
                  Error loading categories
                </h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
            <Button onClick={refetchCategories} variant="outline" size="sm">
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {!loading && filteredCategories.length === 0 && (
        <Card>
          <CardContent className="pt-12 text-center text-gray-500">
            No categories found
          </CardContent>
        </Card>
      )}

      {!loading && filteredCategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card
              key={category.id}
              className="hover:shadow-md transition-shadow overflow-hidden"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {category.category_image && (
                      <img
                        src={category.category_image}
                        alt={category.category_name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg truncate">
                        {category.category_name}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {category.category_description || "No description"}
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
                      <DropdownMenuItem onClick={() => goToForm(category)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>
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