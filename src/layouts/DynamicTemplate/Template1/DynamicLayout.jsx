import { Outlet, Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const storeName = backofficeData?.backoffice?.store_name || backofficeData?.backoffice?.name || "Store";
  const contact = backofficeData?.contactPageContent || {};

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
              <Link to="/" className="text-lg sm:text-xl font-semibold text-[#004445] font-t1-heading">
                {storeName}
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
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="text-[#004445] p-2 hover:bg-[#2c786c]/10 rounded-full transition-colors">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-[300px] sm:w-[350px] bg-[#faf5e4] border-l border-[#2c786c]/20 p-0 rounded-tl-[50px] shadow-2xl"
                >
                  <div className="h-full flex flex-col p-6">
                    <SheetHeader className="mb-8 px-2">
                       <SheetTitle className="text-2xl font-bold text-[#004445] text-left font-t1-heading">
                        {storeName}
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex flex-col space-y-3 flex-1">
                      {navigationLinks.map((link) => {
                         const isActive = location.pathname === link.to;
                         return (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                              isActive
                                ? "bg-[#004445] text-[#faf5e4] shadow-md"
                                : "bg-white text-[#004445] hover:bg-[#f8b400] hover:text-[#004445] shadow-sm border border-[#004445]/5"
                            }`}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                      
                      <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="mt-6 bg-[#f8b400] text-[#004445] px-6 py-4 rounded-full font-bold text-sm hover:bg-[#2c786c] hover:text-[#faf5e4] transition-all uppercase shadow-lg transform hover:-translate-y-1 text-center font-t1-heading tracking-wide"
                      >
                        Get Started
                      </Link>
                    </div>

                    <div className="mt-auto pt-8 border-t border-[#004445]/10 text-center">
                       <p className="text-xs text-[#004445]/60">© 2025 {storeName}</p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
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
                Your trusted business partner for quality products and services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg font-t1-heading">Quick Links</h4>
              <ul className="space-y-2 text-[#faf5e4]/80 text-sm">
                <li className="hover:text-[#f8b400] transition-colors cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#f8b400] transition-colors cursor-pointer">
                  <Link to="/categories">Categories</Link>
                </li>
                <li className="hover:text-[#f8b400] transition-colors cursor-pointer">
                  <Link to="/about">About Us</Link>
                </li>
                <li className="hover:text-[#f8b400] transition-colors cursor-pointer">
                  <Link to="/faq">FAQ's</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg font-t1-heading">Contact Info</h4>
              <p className="text-[#faf5e4]/80 mb-2 text-sm">{contact.email || "info@example.com"}</p>
              <p className="text-[#faf5e4]/80 mb-2 text-sm">{contact.phone || "(123) 456-7890"}</p>
              <p className="text-[#faf5e4]/80 text-sm">{contact.address || "123 Business St, City"}</p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg font-t1-heading">Follow Us</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                  <span className="text-black font-semibold">f</span>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                  <span className="text-black font-semibold">𝕏</span>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                  <span className="text-black font-semibold">in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-center border-t border-[#2c786c]/50 pt-6 sm:pt-8">
            <p className="text-[#faf5e4]/80 text-xs sm:text-sm">
              © {new Date().getFullYear()} {storeName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DynamicLayout;