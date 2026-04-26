import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useBackofficeData } from "../../../routes/DynamicTemplateLoader";

const DynamicLayout = () => {
  const backofficeData = useBackofficeData();
  const [isOpen, setIsOpen] = useState(false);

  const branding = backofficeData?.branding || {};
  const storeName = branding.site_name || backofficeData?.backoffice?.store_name || backofficeData?.backoffice?.name || "Store";
  const contact = backofficeData?.contactPageContent || {};
  const footer = backofficeData?.footerContent || {};

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About Us" },
    { to: "/blog", label: "Blog" },
    { to: "/faq", label: "FAQ's" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between font-t2-body">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">

              {/* Brand Name / Logo */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  {branding.logo_url ? (
                    <img src={branding.logo_url} alt={branding.logo_alt_text || storeName} className="h-10 sm:h-12 w-auto object-contain" />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-t2-heading">
                      {storeName}
                    </h1>
                  )}
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-8 ml-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="relative group py-2 text-sm font-medium uppercase tracking-wider text-gray-600 hover:text-fourth transition-colors duration-300"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-fourth transition-all duration-300 ease-out group-hover:w-full"></span>
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button className="text-gray-600 hover:text-fourth p-2 transition-colors">
                      {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                    </button>
                  </SheetTrigger>
                  <SheetContent 
                    side="right" 
                    className="w-full sm:w-full border-none p-0 bg-white/95 backdrop-blur-xl"
                  >
                    <div className="flex flex-col h-full items-center justify-center relative">
                      {/* Close Button specific for fullscreen */}
                      <button 
                         onClick={() => setIsOpen(false)}
                         className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <X className="h-8 w-8" />
                      </button>

                      <div className="flex flex-col space-y-8 text-center">
                        {navLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className="text-4xl md:text-5xl font-light text-gray-800 hover:text-fourth transition-all duration-300 transform hover:scale-105 font-t2-heading"
                          >
                            {link.label}
                          </Link>
                        ))}
                        
                        <div className="pt-8">
                             <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="px-10 py-4 bg-fourth text-white text-lg font-medium tracking-wide first-letter:uppercase hover:bg-third transition-all duration-300 rounded-full shadow-xl"
                          >
                            Contact Us
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="min-h-screen ">
          <div >
            <Outlet />
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-black text-first py-16 font-t2-body">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

              {/* Company Info */}
              <div className="lg:col-span-1">
                <h3 className="text-3xl font-medium mb-4 font-t2-heading">{storeName}</h3>
                <p className="text-second text-base leading-relaxed">
                  {footer.about_description || "Your trusted business partner for quality products and services."}
                </p>
              </div>

              {/* Quick Links */}
                <h4 className="text-xl font-medium mb-6 text-first font-t2-heading">Links</h4>
                {footer.footer_links ? (
                  <div className="flex flex-col gap-6">
                    {JSON.parse(typeof footer.footer_links === 'string' ? footer.footer_links : JSON.stringify(footer.footer_links)).map((section, idx) => (
                      <div key={idx}>
                        <h5 className="text-[10px] uppercase tracking-[0.2em] text-third mb-3 opacity-70 font-bold">{section.section_title}</h5>
                        <ul className="space-y-3 text-second">
                          {section.links.map((link, lIdx) => (
                            <li key={lIdx}>
                              <Link to={link.url} className="hover:text-third transition-colors">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-4 text-second">
                    {navLinks.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className="hover:text-third transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

              {/* Contact */}
              <div>
                <h4 className="text-xl font-medium mb-6 text-first font-t2-heading">Contact Us</h4>
                <p className="text-second mb-2">{footer.contact_email || contact.email || "info@example.com"}</p>
                <p className="text-second mb-2">{footer.contact_phone || contact.phone || "(123) 456-7890"}</p>
                <p className="text-second">{footer.contact_address || contact.address || "Nature Valley, Green City"}</p>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-xl font-medium mb-6 text-first font-t2-heading">Follow Us</h4>
                <div className="flex space-x-4">
                  {footer.social_links ? (
                    JSON.parse(typeof footer.social_links === 'string' ? footer.social_links : JSON.stringify(footer.social_links)).map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-first rounded-full flex items-center justify-center hover:bg-third transition cursor-pointer"
                        title={social.platform}
                      >
                         <span className="text-fourth text-2xl font-bold font-t2-heading">{social.platform[0]}</span>
                      </a>
                    ))
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-first rounded-full flex items-center justify-center hover:bg-third transition cursor-pointer">
                        <span className="text-fourth text-2xl font-bold font-t2-heading">f</span>
                      </div>
                      <div className="w-12 h-12 bg-first rounded-full flex items-center justify-center hover:bg-third transition cursor-pointer">
                        <span className="text-fourth text-2xl font-bold font-t2-heading">X</span>
                      </div>
                      <div className="w-12 h-12 bg-first rounded-full flex items-center justify-center hover:bg-third transition cursor-pointer">
                        <span className="text-fourth text-2xl font-bold font-t2-heading">in</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-third/30 pt-8 text-center">
                <p className="text-second text-sm">
                  {footer.copyright_text || `© ${new Date().getFullYear()} ${storeName} • All rights reserved`}
                </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DynamicLayout;