import React from 'react';
import { Save, Loader2, Phone, Mail, MapPin, Clock } from 'lucide-react';
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
  office_title: '',
  office_subtitle: '',
  address_title: '',
  address: '',
  email_title: '',
  email: '',
  phone_title: '',
  phone: '',
  business_hours_title: '',
  business_hours: '',
  form_title: '',
  form_description: '',
  cta_title: '',
  cta_description: '',
  cta_button_text: '',
  cta_button_link: '',
  cta_secondary_button_text: '',
  cta_secondary_button_link: '',
  map_embed_url: '',
};

const Contact = () => {
  const backofficeId = React.useMemo(() => {
    return localStorage.getItem('backofficeId') || '1';
  }, []);

  // Fetch existing content using custom hook
  const { data: fetchedContent, loading } = useFetch(
    `http://localhost:3000/api/contact/${backofficeId}/page-content`,
    { immediate: true, showToast: false }
  );

  // Initialize form data with fetched content
  const initialFormData = React.useMemo(() => {
    if (fetchedContent && typeof fetchedContent === 'object') {
      return { ...INITIAL_FORM_STATE, ...fetchedContent };
    }
    return INITIAL_FORM_STATE;
  }, [fetchedContent]);

  // Handle form submission using custom hook
  const { formData, handleChange, handleSubmit, loading: saving } = useForm(
    initialFormData,
    async (data) => {
      const response = await fetch(
        `http://localhost:3000/api/contact/${backofficeId}/page-content/upsert`,
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
          <h1 className="text-3xl font-bold text-gray-900">Contact Page Content</h1>
          <p className="text-gray-600 mt-1">Manage your contact page information</p>
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
          <CardDescription>The main banner section at the top of your contact page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Title</Label>
            <Input
              id="hero_title"
              value={formData.hero_title}
              onChange={(e) => handleChange('hero_title', e.target.value)}
              placeholder="e.g., Get in Touch"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Subtitle</Label>
            <Input
              id="hero_subtitle"
              value={formData.hero_subtitle}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              placeholder="e.g., We'd Love to Hear From You"
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
                placeholder="e.g., Contact Us Now"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_button_link">Button Link</Label>
              <Input
                id="hero_button_link"
                value={formData.hero_button_link}
                onChange={(e) => handleChange('hero_button_link', e.target.value)}
                placeholder="e.g., #contact-form"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Office Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Office Information Section</CardTitle>
          <CardDescription>Section header for office details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="office_title">Section Title</Label>
            <Input
              id="office_title"
              value={formData.office_title}
              onChange={(e) => handleChange('office_title', e.target.value)}
              placeholder="e.g., Our Office"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="office_subtitle">Section Subtitle</Label>
            <Input
              id="office_subtitle"
              value={formData.office_subtitle}
              onChange={(e) => handleChange('office_subtitle', e.target.value)}
              placeholder="e.g., Visit Us or Reach Out"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Details */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>Primary contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address_title">Address Title</Label>
              <Input
                id="address_title"
                value={formData.address_title}
                onChange={(e) => handleChange('address_title', e.target.value)}
                placeholder="e.g., Address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="address"
                  rows={3}
                  className="pl-9"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="e.g., 123 Business Street, Suite 100, New York, NY 10001"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email_title">Email Title</Label>
              <Input
                id="email_title"
                value={formData.email_title}
                onChange={(e) => handleChange('email_title', e.target.value)}
                placeholder="e.g., Email Us"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="support@example.com"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone_title">Phone Title</Label>
              <Input
                id="phone_title"
                value={formData.phone_title}
                onChange={(e) => handleChange('phone_title', e.target.value)}
                placeholder="e.g., Call Us"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  className="pl-9"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business_hours_title">Business Hours Title</Label>
              <Input
                id="business_hours_title"
                value={formData.business_hours_title}
                onChange={(e) => handleChange('business_hours_title', e.target.value)}
                placeholder="e.g., Business Hours"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_hours">Business Hours</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="business_hours"
                  className="pl-9"
                  value={formData.business_hours}
                  onChange={(e) => handleChange('business_hours', e.target.value)}
                  placeholder="Monday - Friday: 9:00 AM - 6:00 PM"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Section</CardTitle>
          <CardDescription>Information about the contact form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form_title">Form Title</Label>
            <Input
              id="form_title"
              value={formData.form_title}
              onChange={(e) => handleChange('form_title', e.target.value)}
              placeholder="e.g., Send Us a Message"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form_description">Form Description</Label>
            <Textarea
              id="form_description"
              rows={3}
              value={formData.form_description}
              onChange={(e) => handleChange('form_description', e.target.value)}
              placeholder="Description that appears above the contact form"
            />
          </div>
        </CardContent>
      </Card>

      {/* Map Section */}
      <Card>
        <CardHeader>
          <CardTitle>Map Embed</CardTitle>
          <CardDescription>Google Maps or other map embed URL</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="map_embed_url">Map Embed URL</Label>
            <Input
              id="map_embed_url"
              value={formData.map_embed_url}
              onChange={(e) => handleChange('map_embed_url', e.target.value)}
              placeholder="e.g., https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-sm text-gray-500">
              Get the embed URL from Google Maps by clicking Share → Embed a map
            </p>
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
              placeholder="e.g., Ready to Start Your Project?"
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
                placeholder="e.g., Get Started"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_button_link">Primary Button Link</Label>
              <Input
                id="cta_button_link"
                value={formData.cta_button_link}
                onChange={(e) => handleChange('cta_button_link', e.target.value)}
                placeholder="e.g., /signup"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cta_secondary_button_text">Secondary Button Text (Optional)</Label>
              <Input
                id="cta_secondary_button_text"
                value={formData.cta_secondary_button_text}
                onChange={(e) => handleChange('cta_secondary_button_text', e.target.value)}
                placeholder="e.g., Learn More"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_secondary_button_link">Secondary Button Link</Label>
              <Input
                id="cta_secondary_button_link"
                value={formData.cta_secondary_button_link}
                onChange={(e) => handleChange('cta_secondary_button_link', e.target.value)}
                placeholder="e.g., /about"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;