import React from 'react';
import { Save, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster,toast } from 'sonner';

const Contact = () => {
  
  const [formData, setFormData] = React.useState({
    email: 'support@shophub.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, Suite 100',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
    mapUrl: '',
    socialMedia: {
      facebook: 'https://facebook.com/shophub',
      twitter: 'https://twitter.com/shophub',
      instagram: 'https://instagram.com/shophub',
      linkedin: 'https://linkedin.com/company/shophub'
    }
  });

  const handleSave = () => {
    console.log('Contact data:', formData);
    toast.success("Changes Saved! Contact information has been updated successfully.");
  };

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
          <p className="text-gray-600 mt-1">Manage your contact details</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Contact Details */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>Primary contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  className="pl-9"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessHours">Business Hours</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="businessHours"
                className="pl-9"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>Physical location details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="address"
                className="pl-9"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              placeholder="https://facebook.com/yourpage"
              value={formData.socialMedia.facebook}
              onChange={(e) => setFormData({ 
                ...formData, 
                socialMedia: { ...formData.socialMedia, facebook: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/yourhandle"
              value={formData.socialMedia.twitter}
              onChange={(e) => setFormData({ 
                ...formData, 
                socialMedia: { ...formData.socialMedia, twitter: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              placeholder="https://instagram.com/yourprofile"
              value={formData.socialMedia.instagram}
              onChange={(e) => setFormData({ 
                ...formData, 
                socialMedia: { ...formData.socialMedia, instagram: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/company/yourcompany"
              value={formData.socialMedia.linkedin}
              onChange={(e) => setFormData({ 
                ...formData, 
                socialMedia: { ...formData.socialMedia, linkedin: e.target.value }
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your contact page will appear</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-sm text-gray-600">Call us anytime</p>
                </div>
              </div>
              <p className="font-medium">{formData.phone}</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-gray-600">Send us a message</p>
                </div>
              </div>
              <p className="font-medium break-all">{formData.email}</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-sm text-gray-600">Visit our office</p>
                </div>
              </div>
              <p className="text-sm font-medium">
                {formData.address}<br />
                {formData.city}, {formData.state} {formData.zipCode}<br />
                {formData.country}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;