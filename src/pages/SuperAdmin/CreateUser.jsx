import { useState } from 'react';
import { User, Mail, Globe, Store, CreditCard, ArrowLeft, CheckCircle, AlertCircle, Loader, ExternalLink, Copy } from 'lucide-react';
import api from '@/config/apiConfig';
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
      const response = await api.post('/superadmin/backoffice-users', {
        ...formData,
        template_id: parseInt(formData.template_id)
      });

      const result = response.data;

      if (result.success) {
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

  // Success View (Premium Redesign)
  if (success && createdUser) {
    const setup = createdUser.setup_summary || {};
    const cms = setup.cms || {};
    const template = setup.template || {};

    return (
      <div className="min-h-screen bg-[#F8FAFC] animate-in fade-in duration-700">
        <div className="max-w-5xl mx-auto px-4 py-12 md:px-6 lg:py-16">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 rounded-full animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-200/50 mb-2 transform hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Account Ready & Configured</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              We've successfully created the backoffice user and provisioned their store with global content.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Account Details */}
            <div className="lg:col-span-7 space-y-8">
              {/* Main Profile Card */}
              <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/60 bg-white/80 backdrop-blur-md">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Account Credentials</CardTitle>
                      <CardDescription>Primary account information for the user</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Full Name</Label>
                      <p className="text-slate-900 font-bold text-lg">{createdUser.name}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Access Email</Label>
                      <p className="text-slate-900 font-bold text-lg truncate" title={createdUser.email}>
                        {createdUser.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Subdomain</Label>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-mono text-sm px-3 py-1">
                          {createdUser.subdomain}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Billing Tier</Label>
                      <div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-none px-3 py-1 capitalize font-semibold tracking-wide">
                          {createdUser.subscription_plan} Plan
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Password Security Box */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative p-6 bg-white border border-amber-100 rounded-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-amber-700 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                            <KeyRound className="w-4 h-4" /> Temporary Password
                          </p>
                          <p className="text-slate-500 text-xs">Login and change this immediately for security.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100 min-w-[200px]">
                          <code className="flex-1 font-mono text-xl font-black text-slate-900 px-2 tracking-tighter">
                            {createdUser.temporary_password || '********'}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            onClick={() => {
                              navigator.clipboard.writeText(createdUser.temporary_password);
                              // Could add a toast here if available
                            }}
                          >
                            <Copy className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store Link Section */}
                  <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-white overflow-hidden relative">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                      <div className="space-y-1 text-center md:text-left">
                        <p className="text-blue-400 font-bold text-xs uppercase tracking-widest">Live Store URL</p>
                        <h3 className="text-lg font-bold truncate max-w-[300px] md:max-w-md">
                          {createdUser.store_url}
                        </h3>
                      </div>
                      <Button 
                        asChild
                        className="bg-white text-slate-900 hover:bg-slate-100 border-none font-bold"
                      >
                        <a href={createdUser.store_url} target="_blank" rel="noopener noreferrer">
                          Visit Store <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Setup Progress */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-none shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Loader className="w-5 h-5 text-blue-500 animate-spin" /> Setup Summary
                  </CardTitle>
                  <CardDescription>Automatic content provisioning status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-2">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                      <p className="text-3xl font-black text-emerald-700">{template.products || 0}</p>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter mt-1">Products Copied</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                      <p className="text-3xl font-black text-blue-700">{template.categories || 0}</p>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter mt-1">Categories Copied</p>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cms.about ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">CMS Pages Created</span>
                      </div>
                      <Badge variant="ghost" className="text-[10px] text-emerald-600 font-bold">SUCCESS</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Site Branding Configured</span>
                      </div>
                      <Badge variant="ghost" className="text-[10px] text-emerald-600 font-bold">READY</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Analytics Monitoring</span>
                      </div>
                      <Badge variant="ghost" className="text-[10px] text-emerald-600 font-bold">ACTIVE</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-start gap-3">
                      <Bell className="w-5 h-5 text-slate-400 mt-1" />
                      <p className="text-sm text-slate-600 leading-relaxed">
                        A welcome email has been sent to <span className="font-bold text-slate-900">{createdUser.email}</span> with their dashboard login details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Actions */}
              <div className="flex gap-4">
                <Button
                  className="flex-1 h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg ring-offset-2 focus:ring-2"
                  onClick={() => {
                    setSuccess(false);
                    setCreatedUser(null);
                  }}
                >
                  Create Another
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-14 font-bold rounded-xl border-slate-200 hover:bg-slate-50 bg-white"
                  onClick={() => window.location.href = '/superadmin/tenants'}
                >
                  Manage All Users
                </Button>
              </div>
            </div>
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
          <h1 className="text-xl font-medium text-slate-900 mb-2">Create Backoffice User</h1>
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