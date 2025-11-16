import React from 'react';
import { Save, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster ,toast } from 'sonner';

const About = () => {
  
  const [formData, setFormData] = React.useState({
    companyName: 'ShopHub',
    tagline: 'Your one-stop destination for quality products',
    mission: 'To provide an exceptional online shopping experience by offering high-quality products, competitive prices, and outstanding customer service.',
    vision: 'To become the world\'s most trusted and customer-centric e-commerce platform.',
    foundedYear: '2018',
    teamSize: '50+',
    description: 'ShopHub is a leading e-commerce platform connecting customers with quality products from around the world.'
  });

  const handleSave = () => {
    console.log('About data:', formData);
    toast.success("Changes Saved! Your about page information has been updated successfully.");
  };

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
          <p className="text-gray-600 mt-1">Manage your company information</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic details about your company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                value={formData.foundedYear}
                onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <Card>
        <CardHeader>
          <CardTitle>Mission & Vision</CardTitle>
          <CardDescription>Define your company's purpose and goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mission">Mission Statement</Label>
            <Textarea
              id="mission"
              rows={4}
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vision">Vision Statement</Label>
            <Textarea
              id="vision"
              rows={4}
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            <CardTitle>Preview</CardTitle>
          </div>
          <CardDescription>How your about page will appear to visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{formData.companyName}</h2>
              <p className="text-xl text-gray-600">{formData.tagline}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600">{formData.mission}</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600">{formData.vision}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">About Us</h3>
              <p className="text-gray-600 mb-4">{formData.description}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Founded:</span>
                  <span className="font-semibold ml-2">{formData.foundedYear}</span>
                </div>
                <div>
                  <span className="text-gray-500">Team Size:</span>
                  <span className="font-semibold ml-2">{formData.teamSize}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;