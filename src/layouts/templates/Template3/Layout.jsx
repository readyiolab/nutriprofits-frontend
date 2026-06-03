import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { getTemplateById } from "../../../data/templates";
import React, { useEffect, useState } from "react";
import { Menu, X, Home, ShoppingBag, Info, FileText, HelpCircle, Mail, Facebook, Twitter, Instagram } from "lucide-react";

// Sidebar Navigation Component
const Navigation = ({ templateId, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Our Products", path: "/template/:id/products" },
    { label: "Shop by Category", path: "/template/:id/categories" },
    { label: "About Us", path: "/template/:id/about" },
    { label: "Blog", path: "/template/:id/blog" },
    { label: "FAQ's", path: "/template/:id/faq" },
  ];

  const isActive = (path) => {
    const actualPath = path.replace(":id", templateId);
    return location.pathname === actualPath;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-t-[6px] border-[#d72323] ${
      scrolled ? 'bg-[#303841]/95 backdrop-blur-md shadow-lg py-2' : 'bg-[#303841] py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Left Column: Logo */}
          <div className="flex-1 flex justify-start">
            <Link to={`/template/${templateId}/products`} className="flex flex-col items-start group">
               <div className="text-3xl font-black text-white tracking-tighter group-hover:text-[#d72323] transition-colors font-t3-heading leading-none">
                 T3
               </div>
               <span className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mt-1">Studio</span>
            </Link>
          </div>

          {/* Center Column: Navigation (Desktop) */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path.replace(":id", templateId)}
                className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group font-mono ${
                  isActive(item.path)
                    ? "text-[#d72323]"
                    : "text-gray-300 hover:text-[#d72323]"
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1.5 left-0 h-[3px] bg-[#d72323] transition-all duration-300 ${
                  isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Right Column: Action (Desktop) */}
          <div className="hidden md:flex items-center justify-end flex-1">
            <Link
              to={`/template/${templateId}/contact`}
              className="px-6 py-2.5 bg-[#d72323] text-white text-xs font-bold uppercase tracking-widest rounded-none hover:bg-white hover:text-[#303841] transition-all duration-300 shadow-md shadow-[#d72323]/20 font-mono"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-end flex-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#d72323] transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-[#303841] shadow-2xl border-t border-slate-700/50"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path.replace(":id", templateId)}
                    className={`block py-2.5 text-base font-bold tracking-wider transition-all duration-200 border-l-4 pl-4 font-mono uppercase ${
                      isActive(item.path)
                        ? "text-[#d72323] border-[#d72323] bg-white/5"
                        : "text-gray-300 border-transparent hover:border-[#d72323] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                to={`/template/${templateId}/contact`}
                className="block w-full text-center py-4 bg-[#d72323] text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#303841] transition-all duration-300 font-mono"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Column Component
const FooterColumn = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-bold mb-4 text-[#eeeeee] font-t3-heading">{title}</h3>
    {children}
  </div>
);

// Footer Component
const Footer = ({ template }) => {
  const socialLinks = [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
  ];

  const quickLinks = ["Products", "Categories", "About", "FAQ", "Contact"];

  return (
    <footer className="bg-gradient-to-br from-[#0f1214] via-[#303841] to-[#0f1214] text-[#eeeeee] py-16 mt-20 font-t3-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <FooterColumn title={template?.name || "Your Brand"}>
            <p className="text-white leading-relaxed mb-4">
              Your trusted business partner for quality products and exceptional service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-[#303841] hover:bg-gray-700 flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                  aria-label={link.name}
                >
                  <span className="text-sm font-semibold text-[#eeeeee] font-t3-heading">{link.name[0]}</span>
                </a>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Quick Links">
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white hover:text-[#d72323] transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d72323] mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact Info">
            <div className="space-y-4">
              <div>
                <p className="text-white text-sm">Email</p>
                <a href="mailto:info@example.com" className="text-[#d72323] hover:text-[#eeeeee] transition-colors">
                  info@example.com
                </a>
              </div>
              <div>
                <p className="text-white text-sm">Phone</p>
                <a href="tel:+11234567890" className="text-[#d72323] hover:text-[#eeeeee] transition-colors">
                  (123) 456-7890
                </a>
              </div>
              <div>
                <p className="text-white text-sm">Address</p>
                <p className="text-white">123 Business St, City, State 12345</p>
              </div>
            </div>
          </FooterColumn>

          <FooterColumn title="Newsletter">
            <p className="text-white text-sm mb-4">Subscribe to get special offers and updates.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded bg-white text-[#303841] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d72323] transition-all font-t3-body"
              />
              <button className="px-4 py-2 rounded bg-[#d72323] hover:bg-[#303841] text-white font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 font-t3-heading tracking-wide">
                Subscribe
              </button>
            </form>
          </FooterColumn>
        </div>

        <div className="border-t border-white/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-white text-sm">
          <p>© 2025 {template?.name || "Your Brand"}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#d72323] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d72323] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#d72323] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Layout Component
const Template3Layout = () => {
  const { templateId } = useParams();
  const template = getTemplateById(templateId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eeeeee] font-t3-body">
        <div className="text-center">
          <p className="text-xl font-semibold text-[#303841] font-t3-heading">Template not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#eeeeee] font-t3-body">
      <Navigation 
        templateId={templateId} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <main className="flex-1">
        <Outlet context={{ template }} />
      </main>
      <Footer template={template} />
    </div>
  );
};

export default Template3Layout