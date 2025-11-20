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
  story_title: '',
  story_subtitle: '',
  story_description: '',
  purpose_title: '',
  purpose_subtitle: '',
  mission_title: '',
  mission_description: '',
  vision_title: '',
  vision_description: '',
  values_title: '',
  values_description: '',
  why_choose_title: '',
  why_choose_subtitle: '',
  cta_title: '',
  cta_description: '',
  cta_button_text: '',
  cta_button_link: '',
};

const About = () => {
  const backofficeId = React.useMemo(() => {
    return localStorage.getItem('backofficeId') || '1';
  }, []);

  // Fetch existing content using custom hook
  const { data: fetchedContent, loading } = useFetch(
    `http://localhost:3000/api/about-page-content/${backofficeId}/content`,
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
        `http://localhost:3000/api/about-page-content/${backofficeId}/content/upsert`,
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
          <h1 className="text-3xl font-bold text-gray-900">About Page Content</h1>
          <p className="text-gray-600 mt-1">Manage your about page sections</p>
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
          <CardDescription>The main banner section at the top of your about page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Title</Label>
            <Input
              id="hero_title"
              value={formData.hero_title}
              onChange={(e) => handleChange('hero_title', e.target.value)}
              placeholder="e.g., Welcome to Our Story"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Subtitle</Label>
            <Input
              id="hero_subtitle"
              value={formData.hero_subtitle}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              placeholder="e.g., Building Tomorrow, Today"
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
                placeholder="e.g., Learn More"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_button_link">Button Link</Label>
              <Input
                id="hero_button_link"
                value={formData.hero_button_link}
                onChange={(e) => handleChange('hero_button_link', e.target.value)}
                placeholder="e.g., /contact"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Section */}
      <Card>
        <CardHeader>
          <CardTitle>Our Story Section</CardTitle>
          <CardDescription>Tell your company's story</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="story_title">Title</Label>
            <Input
              id="story_title"
              value={formData.story_title}
              onChange={(e) => handleChange('story_title', e.target.value)}
              placeholder="e.g., Our Story"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="story_subtitle">Subtitle</Label>
            <Input
              id="story_subtitle"
              value={formData.story_subtitle}
              onChange={(e) => handleChange('story_subtitle', e.target.value)}
              placeholder="e.g., How We Started"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="story_description">Description</Label>
            <Textarea
              id="story_description"
              rows={5}
              value={formData.story_description}
              onChange={(e) => handleChange('story_description', e.target.value)}
              placeholder="Share your company's journey and story"
            />
          </div>
        </CardContent>
      </Card>

      {/* Purpose Section */}
      <Card>
        <CardHeader>
          <CardTitle>Purpose Section</CardTitle>
          <CardDescription>Define your mission, vision, and values</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purpose_title">Section Title</Label>
              <Input
                id="purpose_title"
                value={formData.purpose_title}
                onChange={(e) => handleChange('purpose_title', e.target.value)}
                placeholder="e.g., Our Purpose"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose_subtitle">Section Subtitle</Label>
              <Input
                id="purpose_subtitle"
                value={formData.purpose_subtitle}
                onChange={(e) => handleChange('purpose_subtitle', e.target.value)}
                placeholder="e.g., What Drives Us"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="mission_title">Mission Title</Label>
              <Input
                id="mission_title"
                value={formData.mission_title}
                onChange={(e) => handleChange('mission_title', e.target.value)}
                placeholder="e.g., Our Mission"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mission_description">Mission Statement</Label>
              <Textarea
                id="mission_description"
                rows={4}
                value={formData.mission_description}
                onChange={(e) => handleChange('mission_description', e.target.value)}
                placeholder="Describe your company's mission"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="vision_title">Vision Title</Label>
              <Input
                id="vision_title"
                value={formData.vision_title}
                onChange={(e) => handleChange('vision_title', e.target.value)}
                placeholder="e.g., Our Vision"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vision_description">Vision Statement</Label>
              <Textarea
                id="vision_description"
                rows={4}
                value={formData.vision_description}
                onChange={(e) => handleChange('vision_description', e.target.value)}
                placeholder="Describe your company's vision"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="values_title">Values Title</Label>
              <Input
                id="values_title"
                value={formData.values_title}
                onChange={(e) => handleChange('values_title', e.target.value)}
                placeholder="e.g., Our Values"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="values_description">Values Description</Label>
              <Textarea
                id="values_description"
                rows={4}
                value={formData.values_description}
                onChange={(e) => handleChange('values_description', e.target.value)}
                placeholder="Describe your company's core values"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Choose Us Section */}
      <Card>
        <CardHeader>
          <CardTitle>Why Choose Us Section</CardTitle>
          <CardDescription>Highlight what makes you unique</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="why_choose_title">Title</Label>
            <Input
              id="why_choose_title"
              value={formData.why_choose_title}
              onChange={(e) => handleChange('why_choose_title', e.target.value)}
              placeholder="e.g., Why Choose Us"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="why_choose_subtitle">Subtitle</Label>
            <Input
              id="why_choose_subtitle"
              value={formData.why_choose_subtitle}
              onChange={(e) => handleChange('why_choose_subtitle', e.target.value)}
              placeholder="e.g., What Sets Us Apart"
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
              <Label htmlFor="cta_button_text">Primary Button Text</Label>
              <Input
                id="cta_button_text"
                value={formData.cta_button_text}
                onChange={(e) => handleChange('cta_button_text', e.target.value)}
                placeholder="e.g., Contact Us"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_button_link">Primary Button Link</Label>
              <Input
                id="cta_button_link"
                value={formData.cta_button_link}
                onChange={(e) => handleChange('cta_button_link', e.target.value)}
                placeholder="e.g., /contact"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;