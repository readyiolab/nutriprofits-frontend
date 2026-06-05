import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Home, LayoutGrid, Info, BookOpen, HelpCircle, Mail, ArrowRight } from "lucide-react";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";

const DynamicLayout = () => {
  const backofficeData = useBackofficeData();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const branding = backofficeData?.branding || {};
  const storeName = branding.site_name || backofficeData?.backoffice?.store_name || backofficeData?.backoffice?.name || "Store";
  const contact = backofficeData?.contactPageContent || {};
  const footer = backofficeData?.footerContent || {};

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About Us" },
    { to: "/blog", label: "Blog" },
    { to: "/faq", label: "FAQ's" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#faf5e4] font-t1-body">
      {/* NAVIGATION */}
      <nav className="bg-[#faf5e4]/90 backdrop-blur-md border-b border-[#2c786c]/20 sticky top-0 z-50 shadow-lg transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-lg sm:text-xl font-semibold text-[#004445] font-t1-heading flex items-center gap-2">
                {branding.logo_url ? (
                  <img src={branding.logo_url} alt={branding.logo_alt_text || storeName} className="h-8 sm:h-10 w-auto object-contain" />
                ) : (
                  <span>{storeName}</span>
                )}
              </Link>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex items-center space-x-1 border border-[#2c786c]/20 bg-[#faf5e4]/50 backdrop-blur-sm px-2 py-1.5 rounded-full shadow-sm">
                {navigationLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#004445] text-[#faf5e4] shadow-md transform scale-105"
                          : "text-[#004445] hover:bg-[#2c786c]/10 hover:text-[#004445]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/"
                className="bg-[#f8b400] text-[#004445] px-6 py-2 rounded-full font-medium text-sm hover:bg-[#2c786c] hover:text-[#faf5e4] transition-all uppercase shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-t1-heading tracking-wide"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsOpen(true)}
                className="text-[#004445] p-2 hover:bg-[#2c786c]/10 rounded-full transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Full-Screen Mobile Menu Overlay */}
              {isOpen && (
                <div className="fixed inset-0 z-[100] bg-[#faf5e4] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in fade-in slide-in-from-top duration-300">
                  {/* Menu Header */}
                  <div className="flex justify-between items-center py-2 border-b border-[#2c786c]/15">
                    <span className="text-xl font-bold text-[#004445] font-t1-heading">
                      {storeName}
                    </span>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-[#004445] p-2 hover:bg-[#2c786c]/10 rounded-full transition-all duration-200 transform hover:rotate-90"
                      aria-label="Close menu"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Menu Links (Centered/Beautiful) */}
                  <div className="flex flex-col justify-center my-auto py-8 space-y-6">
                    {navigationLinks.map((link) => {
                      const isActive = location.pathname === link.to;
                      let desc = "";
                      if (link.label.includes("Home") || link.label.includes("Products")) desc = "Explore our premium organic supplements";
                      else if (link.label.includes("Category") || link.label.includes("Categories")) desc = "Shop products tailored to your goals";
                      else if (link.label.includes("About")) desc = "Read our health philosophy and mission";
                      else if (link.label.includes("Blog")) desc = "Tips and advice from certified nutritionists";
                      else if (link.label.includes("FAQ")) desc = "Find answers to popular questions";
                      else if (link.label.includes("Contact")) desc = "Get in touch with our support team";

                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsOpen(false)}
                          className="group flex flex-col justify-start text-left focus:outline-none"
                        >
                          <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-t1-heading transition-colors duration-200 flex items-center gap-2 ${
                            isActive ? "text-[#f8b400]" : "text-[#004445] group-hover:text-[#2c786c]"
                          }`}>
                            {link.label}
                            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'translate-x-1 opacity-100 text-[#f8b400]' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 text-[#2c786c]'}`} />
                          </span>
                          {desc && <span className="text-xs text-[#2c786c]/70 mt-1 font-t1-body max-w-sm">{desc}</span>}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Menu Footer */}
                  <div className="border-t border-[#2c786c]/15 pt-6 flex flex-col gap-4">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-[#f8b400] text-[#004445] py-4 rounded-full font-bold text-sm hover:bg-[#2c786c] hover:text-[#faf5e4] active:scale-[0.98] transition-all uppercase shadow-md hover:shadow-lg font-t1-heading tracking-wide text-center block"
                    >
                      Get Started
                    </Link>
                    <p className="text-center text-xs text-[#004445]/60">© {new Date().getFullYear()} {storeName}. All rights reserved.</p>
                  </div>
                </div>
              )}
            </div>>
          </div>
        </div>
      </nav>

      {/* OUTLET - Pages render here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004445] text-[#faf5e4] py-8 sm:py-12 mt-16 font-t1-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <span className="text-lg sm:text-xl font-bold font-t1-heading">{storeName}</span>
              </div>
              <p className="text-[#faf5e4]/80 text-sm">
                {footer.about_description || "Your trusted business partner for quality products and services."}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg font-t1-heading">Links</h4>
              {footer.footer_links ? (
                <div className="flex flex-col gap-6">
                  {JSON.parse(typeof footer.footer_links === 'string' ? footer.footer_links : JSON.stringify(footer.footer_links)).map((section, idx) => (
                    <div key={idx}>
                      <h5 className="text-xs font-bold uppercase tracking-widest text-[#f8b400] mb-2">{section.section_title}</h5>
                      <ul className="space-y-2 text-[#faf5e4]/80 text-sm">
                        {section.links.map((link, lIdx) => (
                          <li key={lIdx} className="hover:text-[#f8b400] transition-colors cursor-pointer">
                            <Link to={link.url}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2 text-[#faf5e4]/80 text-sm">
                  {navigationLinks.map((link) => (
                    <li key={link.to} className="hover:text-[#f8b400] transition-colors cursor-pointer">
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg font-t1-heading">Contact Info</h4>
              <p className="text-[#faf5e4]/80 mb-2 text-sm">{footer.contact_email || contact.email || "info@example.com"}</p>
              <p className="text-[#faf5e4]/80 mb-2 text-sm">{footer.contact_phone || contact.phone || "(123) 456-7890"}</p>
              <p className="text-[#faf5e4]/80 text-sm">{footer.contact_address || contact.address || "123 Business St, City"}</p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg font-t1-heading">Follow Us</h4>
              <div className="flex space-x-4">
                {footer.social_links ? (
                  JSON.parse(typeof footer.social_links === 'string' ? footer.social_links : JSON.stringify(footer.social_links)).map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer"
                      title={social.platform}
                    >
                      <span className="text-black font-semibold">{social.platform[0]}</span>
                    </a>
                  ))
                ) : (
                  <>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                      <span className="text-black font-semibold">f</span>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                      <span className="text-black font-semibold">𝕏</span>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                      <span className="text-black font-semibold">in</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-center border-t border-[#2c786c]/50 pt-6 sm:pt-8">
            <p className="text-[#faf5e4]/80 text-xs sm:text-sm">
              {footer.copyright_text || `© ${new Date().getFullYear()} ${storeName}. All rights reserved.`}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DynamicLayout;