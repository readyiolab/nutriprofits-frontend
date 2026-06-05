import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { getTemplateById } from "../../../data/templates";
import React, { useEffect, useState } from "react";
import { Menu, Home, ShoppingBag, Info, FileText, HelpCircle, Mail, Facebook, Twitter, Instagram, LayoutGrid } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-white hover:text-[#d72323] transition-colors"
                  aria-label="Toggle menu"
                >
                  <Menu className="w-8 h-8" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] border-l border-slate-800 p-0 bg-[#1e222b] text-white shadow-2xl"
              >
                <div className="flex flex-col h-full justify-between p-8 relative font-mono uppercase">
                  <div>
                    <div className="flex items-center gap-3 mb-10 border-b border-gray-800 pb-4">
                      <div className="text-2xl font-black text-white tracking-tighter leading-none">
                        T3 <span className="text-gray-400 text-xs tracking-widest font-bold ml-1 font-mono">STUDIO</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                      {navItems.map((item) => {
                        const active = isActive(item.path);
                        let Icon = Home;
                        if (item.label.includes("Products")) Icon = ShoppingBag;
                        else if (item.label.includes("Category") || item.label.includes("Categories")) Icon = LayoutGrid;
                        else if (item.label.includes("About")) Icon = Info;
                        else if (item.label.includes("Blog")) Icon = FileText;
                        else if (item.label.includes("FAQ")) Icon = HelpCircle;

                        return (
                          <Link
                            key={item.label}
                            to={item.path.replace(":id", templateId)}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-4 py-3 px-5 text-sm font-bold tracking-widest transition-all duration-300 rounded-xl border-l-[4px] ${
                              active
                                ? "text-[#d72323] border-[#d72323] bg-white/5 shadow-inner"
                                : "text-gray-300 border-transparent bg-[#3a4450]/40 hover:bg-[#3a4450] hover:text-white"
                            }`}
                          >
                            <Icon className={`w-4.5 h-4.5 ${active ? 'text-[#d72323]' : 'text-gray-400'}`} />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto border-t border-gray-800 pt-6 flex flex-col gap-4">
                    <Link
                      to={`/template/${templateId}/contact`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-4 bg-[#d72323] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#b51d1d] active:scale-[0.98] transition-all duration-200 rounded-xl shadow-lg shadow-[#d72323]/10"
                    >
                      Contact Us
                    </Link>
                    <p className="text-gray-500 text-center text-[9px] tracking-widest">© {new Date().getFullYear()} {template?.name || "STUDIO"}</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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