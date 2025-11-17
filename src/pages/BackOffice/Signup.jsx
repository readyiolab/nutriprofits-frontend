import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2340&auto=format&fit=crop";

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup:', formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }} />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center space-x-3">
            
              <h1 className="text-4xl font-medium">BackOffice</h1>
            </div>
            <div className="mt-20 max-w-lg">
              <h2 className="text-5xl font-medium leading-tight">Manage Your Business Like a Pro</h2>
              <p className="mt-6 text-xl text-blue-100">
                Streamline operations, track inventory, manage teams, and grow your business with our all-in-one solution.
              </p>
            </div>
          </div>
          <div className="text-sm opacity-80">© 2025 BackOffice. All rights reserved.</div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            
            <CardTitle className="text-3xl font-medium">Create Account</CardTitle>
            <CardDescription className="text-base">Sign up for your BackOffice account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="name" placeholder="John Doe" className="pl-10" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="email" type="email" placeholder="admin@example.com" className="pl-10" required
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10" required
                    value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10" required
                    value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required checked={formData.terms}
                  onCheckedChange={(checked) => setFormData({...formData, terms})} />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <Link to="/terms" className="text-black hover:underline">Terms & Conditions</Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-black h-12 text-lg font-medium">
                Create Account
              </Button>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account? <Link to="/backoffice/login" className="text-black hover:underline font-medium">Sign in</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;