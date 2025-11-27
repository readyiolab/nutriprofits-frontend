import { Outlet, Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getTemplateById } from "../../../data/templates";

const DynamicLayout = () => {
  const { templateId } = useParams();
  const template = getTemplateById(templateId);
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { to: `/template/${templateId}/products`, label: "Products" },
    { to: `/template/${templateId}/categories`, label: "Category" },
    { to: `/template/${templateId}/about`, label: "About Us" },
    { to: `/template/${templateId}/faq`, label: "FAQ's" },
    { to: `/template/${templateId}/contact`, label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#faf5e4]">
      {/* NAVIGATION */}
      <nav className="bg-[#faf5e4]/90 backdrop-blur-md border-b border-[#2c786c]/20 sticky top-0 z-50 shadow-lg transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-lg sm:text-xl font-semibold text-[#004445]">
                {template?.logoUrl ? (
                  <img
                    src={template.logoUrl}
                    alt={`${template?.name} Logo`}
                    className="h-8 sm:h-10 object-contain"
                  />
                ) : (template?.name) }
              </span>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[#004445] hover:text-[#f8b400] font-medium text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button className="bg-[#f8b400] text-[#004445] px-6 py-2 rounded-lg font-medium text-sm hover:bg-[#2c786c] hover:text-[#faf5e4] transition-all uppercase">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="text-[#004445] p-2 hover:bg-[#2c786c]/10 rounded-lg transition-colors">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#faf5e4] border-l border-[#2c786c]/20 w-[280px] sm:w-[320px]">
                  <SheetHeader>
                    <SheetTitle className="text-[#004445] text-left">
                      {template?.name}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className="text-[#004445] hover:text-[#f8b400] font-medium text-base py-2 px-4 rounded-lg hover:bg-[#2c786c]/10 transition-all"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-[#f8b400] text-[#004445] px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#2c786c] hover:text-[#faf5e4] transition-all uppercase mt-4"
                    >
                      Get Started
                    </button>
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
      <footer className="bg-[#004445] text-[#faf5e4] py-8 sm:py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <span className="text-lg sm:text-xl font-bold">{template?.name}</span>
              </div>
              <p className="text-[#faf5e4]/80 text-sm">
                Your trusted business partner for quality products and services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2 text-[#faf5e4]/80 text-sm">
                <li className="hover:text-[#f8b400] transition-colors cursor-pointer">
                  <Link to={`/template/${templateId}/products`}>Products</Link>
                </li>
                <li className="hover:text-[#f8b400] transition-colors cursor-pointer">
                  <Link to={`/template/${templateId}/categories`}>Categories</Link>
                </li>
                <li className="hover:text-[#f8b400] transition-colors cursor-pointer">
                  <Link to={`/template/${templateId}/about`}>About Us</Link>
                </li>
                <li className="hover:text-[#f8b400] transition-colors cursor-pointer">
                  <Link to={`/template/${templateId}/faq`}>FAQ's</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg">Contact Info</h4>
              <p className="text-[#faf5e4]/80 mb-2 text-sm">info@example.com</p>
              <p className="text-[#faf5e4]/80 mb-2 text-sm">(123) 456-7890</p>
              <p className="text-[#faf5e4]/80 text-sm">123 Business St, City</p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4 text-base sm:text-lg">Follow Us</h4>
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
              © 2024 {template?.name}. All rights reserved. | Template Preview Mode
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DynamicLayout;