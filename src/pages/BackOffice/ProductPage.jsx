import React from 'react';
import { Save, Loader2, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [formData, setFormData] = React.useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState({ type: '', text: '' });
  const [heroImageFile, setHeroImageFile] = React.useState(null);
  const [heroImagePreview, setHeroImagePreview] = React.useState('');

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
        `http://localhost:3001/api/product-page-content/${backofficeId}/content`,
        { credentials: 'include' }
      );
      const result = await response.json();
      
      if (result.success && result.data) {
        setFormData({ ...INITIAL_FORM_STATE, ...result.data });
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

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const formDataToSend = new FormData();

      // Add hero image if new file selected
      if (heroImageFile) {
        formDataToSend.append('hero_image', heroImageFile);
      }

      // Add all form data as JSON string
      formDataToSend.append('data', JSON.stringify(formData));

      const response = await fetch(
        `http://localhost:3001/api/product-page-content/${backofficeId}/content/upsert`,
        {
          method: 'POST',
          credentials: 'include',
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (result.success) {
        showMessage('success', 'Content saved successfully!');
        setHeroImageFile(null);
        fetchContent(); // Refresh to get updated URLs
      } else {
        showMessage('error', result.message || 'Failed to save content');
      }
    } catch (error) {
      showMessage('error', 'Error saving content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 ">
      {message.text && (
        <Alert className={message.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}>
          <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Product Page Content</h1>
          <p className="text-gray-600 mt-1">Manage your product page sections</p>
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