import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { getTemplateById } from "../../../data/templates";
import React, { useEffect, useState } from "react";
import { Menu, X, Home, ShoppingBag, Info, FileText, HelpCircle, Mail, Facebook, Twitter, Instagram, LayoutGrid, ArrowRight } from "lucide-react";

// Sidebar Navigation Component
const Navigation = ({ templateId, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const template = getTemplateById(templateId);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
    <>
      {/* High-Tech Status Ribbon */}
      <div className="bg-[#0f1214] text-[9px] sm:text-[10px] font-mono py-2 text-center text-gray-400 border-b border-gray-800 tracking-widest relative z-50">
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          SECURE ENCRYPTED CONSOLE // REGISTERED PHARMACEUTICAL OUTLET // ACTIVE LAB VERIFICATION STATS: ONLINE
        </span>
      </div>
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
                <span className={`absolute -bottom-1.5 left-0 h-[3px] bg-[#d72323] shadow-[0_0_8px_rgba(215,35,35,0.6)] transition-all duration-300 ${
                  isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Right Column: Action (Desktop) */}
          <div className="hidden md:flex items-center justify-end flex-1">
            <Link
              to={`/template/${templateId}/contact`}
              className="px-6 py-2.5 bg-[#d72323] text-white text-xs font-bold uppercase tracking-widest rounded-none hover:bg-white hover:text-[#303841] transition-all duration-300 shadow-md shadow-[#d72323]/25 hover:shadow-[#d72323]/50 font-mono"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-end flex-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-white hover:text-[#d72323] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-8 h-8" />
            </button>

            {/* Full-Screen Mobile Menu Overlay */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[100] bg-[#0f1214] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in fade-in slide-in-from-top duration-300 font-mono text-white">
                {/* Menu Header */}
                <div className="flex justify-between items-center py-4 border-b border-gray-800">
                  <div className="text-xl font-black text-white tracking-tighter leading-none">
                    T3 <span className="text-gray-400 text-xs tracking-widest font-bold ml-1">STUDIO</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white p-2 hover:bg-[#d72323]/20 hover:text-[#d72323] border border-gray-800 hover:border-[#d72323] transition-all duration-200"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* High-Tech Menu Links */}
                <div className="flex flex-col justify-center my-auto py-8 space-y-6">
                  {navItems.map((item, index) => {
                    const active = isActive(item.path);
                    const displayNum = String(index + 1).padStart(2, '0');
                    let techLabel = "";
                    if (item.label.includes("Products")) techLabel = "DATABASE_ACCESS";
                    else if (item.label.includes("Category") || item.label.includes("Categories")) techLabel = "FILTER_SCAN";
                    else if (item.label.includes("About")) techLabel = "MISSION_BRIEF";
                    else if (item.label.includes("Blog")) techLabel = "DATA_REPORTS";
                    else if (item.label.includes("FAQ")) techLabel = "HELPER_BOT";

                    return (
                      <Link
                        key={item.label}
                        to={item.path.replace(":id", templateId)}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex flex-col justify-start text-left focus:outline-none"
                      >
                        <span className={`text-2xl sm:text-3xl font-extrabold tracking-widest uppercase transition-colors duration-200 flex items-center gap-2 ${
                          active ? "text-[#d72323]" : "text-gray-300 group-hover:text-white"
                        }`}>
                          <span className="text-[#d72323]/60 text-base font-bold mr-1">[{displayNum}]</span>
                          {item.label}
                          <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${active ? 'translate-x-1 opacity-100 text-[#d72323]' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 text-white'}`} />
                        </span>
                        <span className="text-[9px] text-gray-500 mt-1 uppercase tracking-widest flex items-center gap-2">
                          <span>// TYPE: {techLabel}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500/85 animate-pulse"></span>
                          <span className="text-green-500/85">ONLINE</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Menu Footer */}
                <div className="border-t border-gray-800 pt-6 flex flex-col gap-4">
                  <Link
                    to={`/template/${templateId}/contact`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-4 bg-[#d72323] text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#0f1214] transition-all duration-200 border border-transparent hover:border-[#d72323] shadow-lg shadow-[#d72323]/10"
                  >
                    Contact Us
                  </Link>
                  <div className="flex justify-between items-center text-[9px] text-gray-500 tracking-widest uppercase">
                    <span>CONSOLE: SECURE</span>
                    <span>© {new Date().getFullYear()} {template?.name || "STUDIO"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
    </>
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