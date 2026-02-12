import { Outlet, Link, useLocation } from "react-router-dom";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { useState } from "react";
import React, { useEffect } from "react";
import { Menu, Home, ShoppingBag, Info, FileText, HelpCircle, Mail, Facebook, Twitter, Instagram } from "lucide-react";

// Navigation Component
const Navigation = ({ storeName, mobileMenuOpen, setMobileMenuOpen }) => {
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
    { label: "Home", path: "/" },
    { label: "Shop by Category", path: "/categories" },
    { label: "About Us", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "FAQ's", path: "/faq" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#eeeeee]/70 backdrop-blur-lg shadow-lg' : 'bg-[#eeeeee] shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#303841] hover:text-[#d72323] transition-colors font-t3-heading">
              {storeName}
            </Link>
          </div>

          {/* Desktop Center Menu */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 shadow-sm">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 font-t3-heading tracking-wide ${
                    isActive(item.path)
                      ? "text-[#d72323] bg-white shadow-sm"
                      : "text-[#303841] hover:text-[#d72323] hover:bg-white/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Contact Button */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-[#d72323] to-[#303841] text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-t3-heading tracking-wide"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#303841] hover:bg-white/50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
            className="md:hidden absolute top-full left-0 right-0 bg-[#eeeeee]/95 backdrop-blur-lg shadow-xl border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-3">
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl px-3 py-3 border border-white/20 shadow-sm space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`block px-6 py-3 rounded-full text-center font-medium transition-all duration-200 font-t3-heading tracking-wide ${
                      isActive(item.path)
                        ? "text-[#d72323] bg-white shadow-sm"
                        : "text-[#303841] hover:text-[#d72323] hover:bg-white/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                to="/contact"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#d72323] to-[#303841] text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-t3-heading tracking-wide"
              >
                Contact
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
const Footer = () => {
  const backofficeData = useBackofficeData();
  const storeName = backofficeData?.backoffice?.store_name || backofficeData?.backoffice?.name || "Store";
  const contact = backofficeData?.contactPageContent || {};

  const socialLinks = [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
  ];

  const quickLinks = [
    { label: "Products", to: "/" },
    { label: "Categories", to: "/categories" },
    { label: "About", to: "/about" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#0f1214] via-[#303841] to-[#0f1214] text-[#eeeeee] py-16 mt-20 font-t3-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <FooterColumn title={storeName}>
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
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white hover:text-[#d72323] transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d72323] mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact Info">
            <div className="space-y-4">
              <div>
                <p className="text-white text-sm">Email</p>
                <a href={`mailto:${contact.email || 'info@example.com'}`} className="text-[#d72323] hover:text-[#eeeeee] transition-colors">
                  {contact.email || "info@example.com"}
                </a>
              </div>
              <div>
                <p className="text-white text-sm">Phone</p>
                <a href={`tel:${contact.phone || '+11234567890'}`} className="text-[#d72323] hover:text-[#eeeeee] transition-colors">
                  {contact.phone || "(123) 456-7890"}
                </a>
              </div>
              <div>
                <p className="text-white text-sm">Address</p>
                <p className="text-white">{contact.address || "123 Business St, City, State 12345"}</p>
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
          <p>© {new Date().getFullYear()} {storeName}. All rights reserved.</p>
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
const DynamicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const backofficeData = useBackofficeData();
  const storeName = backofficeData?.backoffice?.store_name || backofficeData?.backoffice?.name || "Store";

  return (
    <div className="min-h-screen flex flex-col bg-[#eeeeee] font-t3-body">
      <Navigation 
        storeName={storeName} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DynamicLayout;