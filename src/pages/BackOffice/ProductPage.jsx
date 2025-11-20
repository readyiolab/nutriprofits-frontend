import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from 'sonner';
import { useFetch, useForm } from '@/hooks';

const INITIAL_FORM_STATE = {
  hero_title: '',
  hero_subtitle: '',
  hero_description: '',
  hero_button_text: '',
  hero_button_link: '',
  hero_image_url: '',
  section_title: '',
  section_description: '',
  cta_title: '',
  cta_description: '',
  cta_button_text: '',
  cta_button_link: '',
  about_title: '',
  about_description: '',
};

const ProductPage = () => {
  const backofficeId = React.useMemo(() => {
    return localStorage.getItem('backofficeId') || '1';
  }, []);

  const { data: fetchedContent, loading } = useFetch(
    `http://localhost:3000/api/product-page-content/${backofficeId}/content`,
    { immediate: true, showToast: false }
  );

  const initialFormData = React.useMemo(() => {
    if (fetchedContent && typeof fetchedContent === 'object') {
      return { ...INITIAL_FORM_STATE, ...fetchedContent };
    }
    return INITIAL_FORM_STATE;
  }, [fetchedContent]);

  const { formData, handleChange, handleSubmit, loading: saving } = useForm(
    initialFormData,
    async (data) => {
      const response = await fetch(
        `http://localhost:3000/api/product-page-content/${backofficeId}/content/upsert`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to save');
      }
      return result;
    },
    { showToast: true }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Page Content</h1>
          <p className="text-gray-600 mt-1">Manage your product page sections</p>
        </div>
        <Button onClick={handleSubmit} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
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

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>The main banner section at the top of your product page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Title</Label>
            <Input
              id="hero_title"
              value={formData.hero_title}
              onChange={(e) => handleChange('hero_title', e.target.value)}
              placeholder="e.g., Discover Amazing Products"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Subtitle</Label>
            <Input
              id="hero_subtitle"
              value={formData.hero_subtitle}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              placeholder="e.g., Quality Products for Every Need"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_description">Description</Label>
            <Textarea
              id="hero_description"
              rows={3}
              value={formData.hero_description}
              onChange={(e) => handleChange('hero_description', e.target.value)}
              placeholder="Brief description for hero section"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hero_button_text">Button Text</Label>
              <Input
                id="hero_button_text"
                value={formData.hero_button_text}
                onChange={(e) => handleChange('hero_button_text', e.target.value)}
                placeholder="e.g., Shop Now"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_button_link">Button Link</Label>
              <Input
                id="hero_button_link"
                value={formData.hero_button_link}
                onChange={(e) => handleChange('hero_button_link', e.target.value)}
                placeholder="e.g., /products"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_image_url">Hero Image URL</Label>
            <Input
              id="hero_image_url"
              value={formData.hero_image_url}
              onChange={(e) => handleChange('hero_image_url', e.target.value)}
              placeholder="e.g., https://example.com/hero-image.jpg"
            />
            <p className="text-sm text-gray-500">
              Enter the URL of the hero background image
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Products Section */}
      <Card>
        <CardHeader>
          <CardTitle>Products Section</CardTitle>
          <CardDescription>Section header for product listings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="section_title">Section Title</Label>
            <Input
              id="section_title"
              value={formData.section_title}
              onChange={(e) => handleChange('section_title', e.target.value)}
              placeholder="e.g., Our Products"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section_description">Section Description</Label>
            <Textarea
              id="section_description"
              rows={3}
              value={formData.section_description}
              onChange={(e) => handleChange('section_description', e.target.value)}
              placeholder="Description that appears above the product grid"
            />
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Products Section</CardTitle>
          <CardDescription>Information about your products</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="about_title">Title</Label>
            <Input
              id="about_title"
              value={formData.about_title}
              onChange={(e) => handleChange('about_title', e.target.value)}
              placeholder="e.g., Why Choose Our Products"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about_description">Description</Label>
            <Textarea
              id="about_description"
              rows={5}
              value={formData.about_description}
              onChange={(e) => handleChange('about_description', e.target.value)}
              placeholder="Detailed information about your products and what makes them special"
            />
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
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
              placeholder="e.g., Ready to Get Started?"
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
              <Label htmlFor="cta_button_text">Button Text</Label>
              <Input
                id="cta_button_text"
                value={formData.cta_button_text}
                onChange={(e) => handleChange('cta_button_text', e.target.value)}
                placeholder="e.g., Browse All Products"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_button_link">Button Link</Label>
              <Input
                id="cta_button_link"
                value={formData.cta_button_link}
                onChange={(e) => handleChange('cta_button_link', e.target.value)}
                placeholder="e.g., /products"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;