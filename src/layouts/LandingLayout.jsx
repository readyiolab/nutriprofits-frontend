import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const LandingLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
  { path: '/landing', label: 'Home' },           
  { path: '/landing/products', label: 'Products' },  
  { path: '/landing/categories', label: 'Category' },
  { path: '/landing/about', label: 'About Us' },
  { path: '/landing/templates', label: 'Templates' },
  { path: '/landing/faq', label: "FAQ's" },
  { path: '/landing/contact', label: 'Contact' },
];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur ">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              
              <span className="text-xl font-bold text-gray-900">LOGO</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 ">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive(link.path) ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="hidden md:flex items-center space-x-4">
             
              <Button size="sm" className="bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] hover:bg-blue-700">Get Started</Button>
            </div>
            </nav>

            {/* CTA Button */}
            

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-medium transition-colors hover:text-blue-600 py-2 ${
                        isActive(link.path) ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 space-y-2">
                   
                    <Button className="w-full bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] hover:bg-blue-700">Get Started</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold text-white">ShopHub</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Your one-stop destination for quality products and exceptional service.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-500 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-sm hover:text-blue-500 transition-colors">Our Products</Link></li>
                <li><Link to="/categories" className="text-sm hover:text-blue-500 transition-colors">Shop by Category</Link></li>
                <li><Link to="/about" className="text-sm hover:text-blue-500 transition-colors">About Us</Link></li>
                <li><Link to="/faq" className="text-sm hover:text-blue-500 transition-colors">FAQ's</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-white font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Shipping Information</a></li>
                <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span className="text-sm">123 Business St, City, State 12345</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">support@shophub.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;