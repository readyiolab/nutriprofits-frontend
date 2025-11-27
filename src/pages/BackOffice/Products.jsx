import React from "react";
import {
  Plus,
  Search,
  ArrowLeft,
  Save,
  X,
  Edit,
  Trash2,
  Loader,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks";
import { toast } from "sonner";

const FORM_INITIAL_STATE = {
  name: "",
  categoryId: "",
  price: "",
  stock: "",
  description: "",
  fullDescription: "",
  highlights: "",
  benefits: "",
  ingredients: "",
  image: "",
  logoUrl: "",
  product_image: null,
  logo_url: null,
};

const Products = () => {
  // View state: 'list' | 'form'
  const [view, setView] = React.useState("list");
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("all-status");
  const [formData, setFormData] = React.useState(FORM_INITIAL_STATE);
  const [submitting, setSubmitting] = React.useState(false);

  // Fetch products & categories
  const {
    data: productsData,
    loading,
    error,
    refetch: refetchProducts,
  } = useFetch("http://localhost:3001/api/backoffice/product-categories/products", {
    immediate: true,
    showToast: false,
  });

  const { data: categoriesData } = useFetch(
    "http://localhost:3001/api/backoffice/product-categories/categories",
    { immediate: true, showToast: false }
  );

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || [];
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data || [];

  // Go to Form (Add or Edit)
  const goToForm = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.product_name || "",
        categoryId: product.category_id?.toString() || "",
        price: product.product_price || "",
        stock: product.stock_quantity || "",
        description: product.product_description || "",
        fullDescription: product.full_description || "",
        highlights: product.highlights || "",
        benefits: product.benefits || "",
        ingredients: product.ingredients || "",
        image: product.product_image || "",
        logoUrl: product.logo_url || "",
        product_image: null,
        logo_url: null,
      });
    } else {
      setEditingProduct(null);
      setFormData(FORM_INITIAL_STATE);
    }
    setView("form");
  };

  const goToList = () => {
    setView("list");
    setEditingProduct(null);
    setFormData(FORM_INITIAL_STATE);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    const form = new FormData();
    form.append("product_name", formData.name);
    form.append("product_price", formData.price);
    form.append("stock_quantity", formData.stock);
    form.append("product_description", formData.description || "");
    form.append("full_description", formData.fullDescription || "");
    form.append("highlights", formData.highlights || "");
    form.append("benefits", formData.benefits || "");
    form.append("ingredients", formData.ingredients || "");
    if (formData.categoryId) form.append("category_id", formData.categoryId);
    if (formData.product_image) form.append("product_image", formData.product_image);
    if (formData.logo_url) form.append("logo_url", formData.logo_url);

    const url = editingProduct
      ? `http://localhost:3001/api/backoffice/product-categories/products/${editingProduct.id}`
      : "http://localhost:3001/api/backoffice/product-categories/products";

    try {
      const res = await fetch(url, {
        method: editingProduct ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: form,
      });

      const result = await res.json();
      if (result.success) {
        toast.success(editingProduct ? "Product updated!" : "Product created!");
        goToList();
        refetchProducts();
      } else {
        toast.error(result.message || "Failed to save");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(
        `http://localhost:3001/api/backoffice/product-categories/products/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      const result = await res.json();
      if (result.success) {
        toast.success("Product deleted");
        refetchProducts();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const getStatusColor = (stock) => {
    if (stock > 50) return "bg-green-100 text-green-700";
    if (stock > 10) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getStatusText = (stock) => {
    if (stock > 50) return "In Stock";
    if (stock > 10) return "Low Stock";
    return "Out of Stock";
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.product_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || p.category_id === Number(selectedCategory);
    const matchesStatus =
      selectedStatus === "all-status" ||
      (selectedStatus === "in-stock" && p.stock_quantity > 50) ||
      (selectedStatus === "low-stock" &&
        p.stock_quantity > 10 &&
        p.stock_quantity <= 50) ||
      (selectedStatus === "out-stock" && p.stock_quantity <= 10);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ====== FULL PAGE FORM VIEW ======
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
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h1>
              <p className="text-gray-600">
                {editingProduct ? "Update product details" : "Create a new product"}
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
              {editingProduct ? "Update" : "Create"} Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Product Name *</Label>
                  <Input
                    placeholder="e.g., Whey Protein Isolate"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, categoryId: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Stock Quantity *</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Short Description</Label>
                  <Textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Full Description</Label>
                  <Textarea
                    rows={5}
                    value={formData.fullDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullDescription: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Highlights</Label>
                  <Textarea
                    rows={3}
                    value={formData.highlights}
                    onChange={(e) =>
                      setFormData({ ...formData, highlights: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Benefits</Label>
                  <Textarea
                    rows={3}
                    value={formData.benefits}
                    onChange={(e) =>
                      setFormData({ ...formData, benefits: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Ingredients</Label>
                  <Textarea
                    rows={3}
                    value={formData.ingredients}
                    onChange={(e) =>
                      setFormData({ ...formData, ingredients: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Images */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      product_image: e.target.files?.[0] || null,
                    })
                  }
                />
                {formData.product_image ? (
                  <img
                    src={URL.createObjectURL(formData.product_image)}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : formData.image ? (
                  <img
                    src={formData.image}
                    alt="Current"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brand Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      logo_url: e.target.files?.[0] || null,
                    })
                  }
                />
                {formData.logo_url ? (
                  <img
                    src={URL.createObjectURL(formData.logo_url)}
                    alt="Logo Preview"
                    className="w-32 h-32 object-contain mx-auto"
                  />
                ) : formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt="Current Logo"
                    className="w-32 h-32 object-contain mx-auto"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto" />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ====== LIST VIEW (Default) ======
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">
            Manage {products.length} products across all categories
          </p>
        </div>
        <Button onClick={() => goToForm()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Error */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">
                  Error loading products
                </h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
            <Button onClick={refetchProducts} variant="outline" size="sm">
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center">
              <Loader className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center py-12 text-gray-500">No products found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-sm font-semibold text-gray-700">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => {
                    const catName =
                      categories.find((c) => c.id === p.category_id)
                        ?.category_name || "Uncategorized";
                    return (
                      <tr key={p.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {p.product_image && (
                              <img
                                src={p.product_image}
                                alt={p.product_name}
                                className="w-10 h-10 rounded object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium">{p.product_name}</p>
                              <p className="text-xs text-gray-500">ID: {p.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{catName}</Badge>
                        </td>
                        <td className="py-4 px-4 font-medium">
                          ${parseFloat(p.product_price).toFixed(2)}
                        </td>
                        <td className="py-4 px-4">{p.stock_quantity}</td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(p.stock_quantity)}>
                            {getStatusText(p.stock_quantity)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => goToForm(p)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(p.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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