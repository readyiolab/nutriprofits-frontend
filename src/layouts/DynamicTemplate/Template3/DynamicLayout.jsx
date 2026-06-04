import { Outlet, Link, useLocation } from "react-router-dom";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";
import { useState } from "react";
import React, { useEffect } from "react";
import { Menu, Home, ShoppingBag, Info, FileText, HelpCircle, Mail, Facebook, Twitter, Instagram } from "lucide-react";

// Navigation Component
const Navigation = ({ storeName, branding, mobileMenuOpen, setMobileMenuOpen }) => {
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
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-t-[6px] border-[#d72323] ${
      scrolled ? 'bg-[#303841]/95 backdrop-blur-md shadow-lg py-2' : 'bg-[#303841] py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left Column: Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="text-2xl font-bold text-white hover:text-[#d72323] transition-colors font-t3-heading flex items-center gap-2">
              {branding?.logo_url ? (
                <img src={branding.logo_url} alt={branding.logo_alt_text || storeName} className="h-8 sm:h-10 w-auto object-contain brightness-0 invert" />
              ) : (
                <span className="text-white font-black tracking-tighter uppercase leading-none">{storeName}</span>
              )}
            </Link>
          </div>

          {/* Center Column: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
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

          {/* Right Column: Contact Button (Desktop) */}
          <div className="hidden md:flex items-center justify-end flex-1">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[#d72323] text-white text-xs font-bold uppercase tracking-widest rounded-none hover:bg-white hover:text-[#303841] transition-all duration-300 shadow-md shadow-[#d72323]/20 font-mono"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-end">
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
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute top-full left-0 right-0 bg-[#303841]/95 backdrop-blur-lg border-t border-slate-700/50 transition-all duration-300 ease-out origin-top overflow-hidden shadow-2xl ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0 pointer-events-none'
          }`}
        >
          <div className="px-6 py-8 space-y-6">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const active = isActive(item.path);
                let Icon = Home;
                if (item.label.includes("Category")) Icon = ShoppingBag;
                else if (item.label.includes("About")) Icon = Info;
                else if (item.label.includes("Blog")) Icon = FileText;
                else if (item.label.includes("FAQ")) Icon = HelpCircle;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`flex items-center gap-4 py-3 px-5 text-sm font-bold tracking-widest transition-all duration-300 font-mono uppercase rounded-xl border-l-[4px] ${
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
            <Link
              to="/contact"
              className="block w-full text-center py-4 bg-[#d72323] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#b51d1d] active:scale-95 transition-all duration-200 font-mono rounded-xl shadow-lg shadow-[#d72323]/10"
            >
              Contact
            </Link>
          </div>
        </div>
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
  const branding = backofficeData?.branding || {};
  const storeName = branding.site_name || backofficeData?.backoffice?.store_name || backofficeData?.backoffice?.name || "Store";
  const contact = backofficeData?.contactPageContent || {};
  const footer = backofficeData?.footerContent || {};

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
              {footer.about_description || "Your trusted business partner for quality products and exceptional service."}
            </p>
            <div className="flex flex-wrap gap-4">
              {footer.social_links ? (
                JSON.parse(typeof footer.social_links === 'string' ? footer.social_links : JSON.stringify(footer.social_links)).map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#303841] hover:bg-gray-700 flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                    title={social.platform}
                  >
                    <span className="text-sm font-semibold text-[#eeeeee] font-t3-heading">{social.platform[0]}</span>
                  </a>
                ))
              ) : (
                socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="w-10 h-10 rounded-full bg-[#303841] hover:bg-gray-700 flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                    aria-label={link.name}
                  >
                    <span className="text-sm font-semibold text-[#eeeeee] font-t3-heading">{link.name[0]}</span>
                  </a>
                ))
              )}
            </div>
          </FooterColumn>

          <FooterColumn title="Links">
            {footer.footer_links ? (
              <div className="flex flex-col gap-6">
                 {JSON.parse(typeof footer.footer_links === 'string' ? footer.footer_links : JSON.stringify(footer.footer_links)).map((section, idx) => (
                   <div key={idx}>
                     <h4 className="text-[10px] uppercase tracking-widest text-[#d72323] mb-3 opacity-80 font-bold">{section.section_title}</h4>
                     <ul className="space-y-2">
                       {section.links.map((link, lIdx) => (
                         <li key={lIdx}>
                           <Link to={link.url} className="text-white hover:text-[#d72323] transition-colors duration-200 text-sm">
                             {link.label}
                           </Link>
                         </li>
                       ))}
                     </ul>
                   </div>
                 ))}
              </div>
            ) : (
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
            )}
          </FooterColumn>

          <FooterColumn title="Contact Info">
            <div className="space-y-4">
              <div>
                <p className="text-white text-sm">Email</p>
                <a href={`mailto:${footer.contact_email || contact.email || 'info@example.com'}`} className="text-[#d72323] hover:text-[#eeeeee] transition-colors">
                  {footer.contact_email || contact.email || "info@example.com"}
                </a>
              </div>
              <div>
                <p className="text-white text-sm">Phone</p>
                <a href={`tel:${footer.contact_phone || contact.phone || '+11234567890'}`} className="text-[#d72323] hover:text-[#eeeeee] transition-colors">
                  {footer.contact_phone || contact.phone || "(123) 456-7890"}
                </a>
              </div>
              <div>
                <p className="text-white text-sm">Address</p>
                <p className="text-white">{footer.contact_address || contact.address || "123 Business St, City, State 12345"}</p>
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
          <p>{footer.copyright_text || `© ${new Date().getFullYear()} ${storeName}. All rights reserved.`}</p>
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
  const branding = backofficeData?.branding || {};
  const storeName = branding.site_name || backofficeData?.backoffice?.store_name || backofficeData?.backoffice?.name || "Store";

  return (
    <div className="min-h-screen flex flex-col bg-[#eeeeee] font-t3-body">
      <Navigation 
        storeName={storeName} 
        branding={branding}
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