import React from 'react';
import { Save, Loader2, Plus, Trash2, Image, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const INITIAL_FORM_STATE = {
  hero_title: '',
  hero_subtitle: '',
  hero_image_url: '',
  categories_title: '',
  categories_description: '',
  view_all_text: '',
  view_all_link: '',
  featured_categories: [],
  cta_title: '',
  cta_description: '',
  cta_button_text: '',
  cta_button_link: '',
  cta_support_text: '',
  cta_support_link: '',
};

const CategoryPage = () => {
  const [formData, setFormData] = React.useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState({ type: '', text: '' });
  const [heroImageFile, setHeroImageFile] = React.useState(null);
  const [heroImagePreview, setHeroImagePreview] = React.useState('');
  const [categoryImageFiles, setCategoryImageFiles] = React.useState({});
  const [categoryImagePreviews, setCategoryImagePreviews] = React.useState({});

  const backofficeId = React.useMemo(() => {
    return localStorage.getItem('backofficeId') || '1';
  }, []);

  React.useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/category-page-content/${backofficeId}/content`,
        { credentials: 'include' }
      );
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData({
          ...INITIAL_FORM_STATE,
          ...result.data,
          featured_categories: Array.isArray(result.data.featured_categories)
            ? result.data.featured_categories
            : []
        });
        if (result.data.hero_image_url) {
          setHeroImagePreview(result.data.hero_image_url);
        }
      }
    } catch (error) {
      showMessage('error', 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showMessage('error', 'Image must be less than 5MB');
        return;
      }
      setHeroImageFile(file);
      setHeroImagePreview(URL.createObjectURL(file));
    }
  };

  const removeHeroImage = () => {
    setHeroImageFile(null);
    setHeroImagePreview('');
    handleChange('hero_image_url', '');
  };

  const handleCategoryImageChange = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showMessage('error', 'Image must be less than 5MB');
        return;
      }
      setCategoryImageFiles(prev => ({ ...prev, [index]: file }));
      setCategoryImagePreviews(prev => ({ ...prev, [index]: URL.createObjectURL(file) }));
    }
  };

  const removeCategoryImage = (index) => {
    setCategoryImageFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[index];
      return newFiles;
    });
    setCategoryImagePreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });
    updateFeaturedCategory(index, 'image', '');
  };

  // Inside handleSubmit function – replace this part:
const handleSubmit = async () => {
  try {
    setSaving(true);
    const formDataToSend = new FormData();

    // Hero image
    if (heroImageFile) {
      formDataToSend.append('hero_image', heroImageFile);
    }

    // Category images (if any)
    Object.entries(categoryImageFiles).forEach(([index, file]) => {
      formDataToSend.append(`category_image_${index}`, file);
    });

    // CHANGE THIS LINE ONLY:
    formDataToSend.append('content', JSON.stringify(formData)); // ← was 'data'

    const response = await fetch(
      `http://localhost:3001/api/category-page-content/${backofficeId}/content/upsert`,
      {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend, // DO NOT set Content-Type header – let browser set multipart boundary
      }
    );

    const result = await response.json();

    if (result.success) {
      showMessage('success', 'Content saved successfully!');
      setHeroImageFile(null);
      setCategoryImageFiles({});
      fetchContent(); // Refresh with new URLs
    } else {
      showMessage('error', result.message || 'Failed to save content');
    }
  } catch (error) {
    console.error(error);
    showMessage('error', 'Error saving content');
  } finally {
    setSaving(false);
  }
};

  const addFeaturedCategory = () => {
    const newFeatured = [
      ...(formData.featured_categories || []),
      { id: '', name: '', image: '', link: '' }
    ];
    handleChange('featured_categories', newFeatured);
  };

  const removeFeaturedCategory = (index) => {
    const newFeatured = (formData.featured_categories || []).filter((_, i) => i !== index);
    handleChange('featured_categories', newFeatured);
    removeCategoryImage(index);
  };

  const updateFeaturedCategory = (index, field, value) => {
    const newFeatured = (formData.featured_categories || []).map((cat, i) =>
      i === index ? { ...cat, [field]: value } : cat
    );
    handleChange('featured_categories', newFeatured);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6  p-6">
      {message.text && (
        <Alert className={message.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}>
          <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3l font-semibold text-gray-900">Category Page Content</h1>
          <p className="text-gray-600 mt-1">Manage your category page sections</p>
        </div>
        <Button onClick={handleSubmit} disabled={saving} className="bg-blue-500 hover:bg-blue-700">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>The main banner section at the top of your category page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Title</Label>
            <Input
              id="hero_title"
              value={formData.hero_title}
              onChange={(e) => handleChange('hero_title', e.target.value)}
              placeholder="e.g., Shop by Category"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Subtitle</Label>
            <Textarea
              id="hero_subtitle"
              rows={3}
              value={formData.hero_subtitle}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              placeholder="e.g., Discover premium health & wellness products"
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Image</Label>
            <div className="flex items-start gap-4">
              {heroImagePreview ? (
                <div className="relative">
                  <img
                    src={heroImagePreview}
                    alt="Hero preview"
                    className="w-40 h-40 object-cover rounded-lg border"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2"
                    onClick={removeHeroImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Image className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500">
                  Upload a hero image (max 5MB). Recommended: 1920x600px
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories Section</CardTitle>
          <CardDescription>Section header for category listings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categories_title">Section Title</Label>
            <Input
              id="categories_title"
              value={formData.categories_title}
              onChange={(e) => handleChange('categories_title', e.target.value)}
              placeholder="e.g., Browse Our Categories"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categories_description">Section Description</Label>
            <Input
              id="categories_description"
              value={formData.categories_description}
              onChange={(e) => handleChange('categories_description', e.target.value)}
              placeholder="e.g., 25+ specialized health categories"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="view_all_text">View All Button Text</Label>
              <Input
                id="view_all_text"
                value={formData.view_all_text}
                onChange={(e) => handleChange('view_all_text', e.target.value)}
                placeholder="e.g., View All Categories"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="view_all_link">View All Button Link</Label>
              <Input
                id="view_all_link"
                value={formData.view_all_link}
                onChange={(e) => handleChange('view_all_link', e.target.value)}
                placeholder="e.g., /categories"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Featured Categories</CardTitle>
              <CardDescription>Highlight specific categories on your page</CardDescription>
            </div>
            <Button onClick={addFeaturedCategory} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(formData.featured_categories || []).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Image className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>No featured categories added yet.</p>
              <p className="text-sm">Click "Add Category" to get started.</p>
            </div>
          ) : (
            (formData.featured_categories || []).map((category, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">Category {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeaturedCategory(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Category ID</Label>
                    <Input
                      value={category.id}
                      onChange={(e) => updateFeaturedCategory(index, 'id', e.target.value)}
                      placeholder="Category ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input
                      value={category.name}
                      onChange={(e) => updateFeaturedCategory(index, 'name', e.target.value)}
                      placeholder="e.g., Health & Wellness"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category Image</Label>
                  <div className="flex items-start gap-4">
                    {(categoryImagePreviews[index] || category.image) ? (
                      <div className="relative">
                        <img
                          src={categoryImagePreviews[index] || category.image}
                          alt={`Category ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2"
                          onClick={() => removeCategoryImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCategoryImageChange(index, e)}
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-gray-500">
                        Upload category image (max 5MB)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input
                    value={category.link}
                    onChange={(e) => updateFeaturedCategory(index, 'link', e.target.value)}
                    placeholder="/category/health-wellness"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Call-to-Action Section</CardTitle>
          <CardDescription>Encourage visitors to take action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cta_title">Title</Label>
            <Input
              id="cta_title"
              value={formData.cta_title}
              onChange={(e) => handleChange('cta_title', e.target.value)}
              placeholder="e.g., Ready to Transform Your Health?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_description">Description</Label>
            <Textarea
              id="cta_description"
              rows={3}
              value={formData.cta_description}
              onChange={(e) => handleChange('cta_description', e.target.value)}
              placeholder="Compelling message to encourage action"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cta_button_text">Primary Button Text</Label>
              <Input
                id="cta_button_text"
                value={formData.cta_button_text}
                onChange={(e) => handleChange('cta_button_text', e.target.value)}
                placeholder="e.g., Start Shopping Now"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_button_link">Primary Button Link</Label>
              <Input
                id="cta_button_link"
                value={formData.cta_button_link}
                onChange={(e) => handleChange('cta_button_link', e.target.value)}
                placeholder="e.g., /products"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cta_support_text">Support Link Text</Label>
              <Input
                id="cta_support_text"
                value={formData.cta_support_text}
                onChange={(e) => handleChange('cta_support_text', e.target.value)}
                placeholder="e.g., Contact Support"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_support_link">Support Link URL</Label>
              <Input
                id="cta_support_link"
                value={formData.cta_support_link}
                onChange={(e) => handleChange('cta_support_link', e.target.value)}
                placeholder="e.g., /support"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;