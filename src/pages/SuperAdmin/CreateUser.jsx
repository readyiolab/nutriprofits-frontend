import { useState } from 'react';
import { User, Mail, Globe, Store, CreditCard, ArrowLeft, CheckCircle, AlertCircle, Loader, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subdomain: '',
    template_id: '1',
    subscription_plan: 'monthly'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subdomain.trim()) {
      newErrors.subdomain = 'Subdomain is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
      newErrors.subdomain = 'Only lowercase letters, numbers, and hyphens allowed';
    } else if (formData.subdomain.length < 3) {
      newErrors.subdomain = 'Subdomain must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/superadmin/backoffice-users', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          template_id: parseInt(formData.template_id)
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setCreatedUser(result.data);
        setFormData({
          name: '',
          email: '',
          subdomain: '',
          template_id: '1',
          subscription_plan: 'monthly'
        });
      } else {
        alert(result.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Error creating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success View (Full Screen)
  if (success && createdUser) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">User Created Successfully!</h1>
            <p className="text-slate-600">The backoffice user has been created and notified via email.</p>
          </div>

          {/* User Details Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Main Info Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Details</CardTitle>
                <CardDescription>Account information and credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-500 text-xs">Full Name</Label>
                    <p className="text-slate-900 font-semibold mt-1">{createdUser.name}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Email Address</Label>
                    <p className="text-slate-900 font-semibold mt-1 break-all">{createdUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Store Name</Label>
                    <p className="text-slate-900 font-semibold mt-1">{createdUser.store_name}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Subscription Plan</Label>
                    <div className="mt-1">
                      <Badge variant="secondary" className="capitalize">
                        {createdUser.subscription_plan}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Store URL */}
                <div>
                  <Label className="text-slate-500 text-xs mb-2 block">Store URL</Label>
                  <a
                    href={createdUser.store_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline break-all"
                  >
                    {createdUser.store_url}
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  </a>
                </div>

                <Separator />

                {/* Temporary Password */}
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-semibold text-amber-900">Temporary Password</p>
                      <p className="font-mono text-lg font-bold text-slate-900 select-all bg-white px-3 py-2 rounded border">
                        {createdUser.temporary_password}
                      </p>
                      <p className="text-sm text-amber-800">
                        This password has been sent via email. User should change it after first login.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Setup Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Setup Status</CardTitle>
                <CardDescription>What's been configured</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Subdomain Created</p>
                      <p className="text-sm text-slate-500">DNS configured on Cloudflare</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Welcome Email Sent</p>
                      <p className="text-sm text-slate-500">Credentials delivered</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Store Template Applied</p>
                      <p className="text-sm text-slate-500">Ready to customize</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Subscription Activated</p>
                      <p className="text-sm text-slate-500">Billing cycle started</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                setSuccess(false);
                setCreatedUser(null);
              }}
            >
              Create Another User
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => window.location.href = '/superadmin/tenants'}
            >
              View All Users
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Create Form View
  return (
    <div className="min-h-screen bg-slate-50  ">
      <div >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Create Backoffice User</h1>
          <p className="text-slate-600">Add a new user to the system</p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader className="bg-slate-50">
            <CardTitle>User Information</CardTitle>
            <CardDescription>Fill in the details below to create a new user</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Full Name
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Doe"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email Address
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subdomain & Template Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subdomain Field */}
                <div className="space-y-2">
                  <Label htmlFor="subdomain" className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    Subdomain
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex rounded-lg border border-input overflow-hidden">
                    <Input
                      id="subdomain"
                      name="subdomain"
                      value={formData.subdomain}
                      onChange={(e) => handleChange('subdomain', e.target.value)}
                      placeholder="mystore"
                      className={`border-0 rounded-none ${errors.subdomain ? 'border-red-500' : ''}`}
                    />
                    <div className="px-4 bg-slate-100 text-slate-600 font-medium flex items-center text-sm whitespace-nowrap">
                      .igrowbig.com
                    </div>
                  </div>
                  {errors.subdomain && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subdomain}
                    </p>
                  )}
                </div>

                {/* Template Select */}
                <div className="space-y-2">
                  <Label htmlFor="template" className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-blue-600" />
                    Store Template
                  </Label>
                  <Select
                    value={formData.template_id}
                    onValueChange={(value) => handleChange('template_id', value)}
                  >
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Template 1 - Modern Minimal</SelectItem>
                      <SelectItem value="2">Template 2 - Classic</SelectItem>
                      <SelectItem value="3">Template 3 - Bold & Colorful</SelectItem>
                      <SelectItem value="4">Template 4 - Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-500">Choose the default template for the store</p>
                </div>
              </div>

              {/* Subscription Plan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="plan" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    Subscription Plan
                  </Label>
                  <Select
                    value={formData.subscription_plan}
                    onValueChange={(value) => handleChange('subscription_plan', value)}
                  >
                    <SelectTrigger id="plan">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly - $99/month</SelectItem>
                      <SelectItem value="yearly">Yearly - $999/year (Save 16%)</SelectItem>
                      <SelectItem value="trial">Free Trial - 14 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-500">Select the subscription plan for this user</p>
                </div>
              </div>

              <Separator />

              {/* Form Actions */}
              <div className="flex flex-col-reverse md:flex-row gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => window.location.href = '/superadmin/tenants'}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Creating User...
                    </>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateUser;