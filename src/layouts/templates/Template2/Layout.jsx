import { Outlet, Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Mail, Phone, MapPin } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getTemplateById } from "../../../data/templates";

const Template2Layout = () => {
  const { templateId } = useParams();
  const template = getTemplateById(templateId);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: `/template/${templateId}/products`, label: "Products" },
    { to: `/template/${templateId}/categories`, label: "Category" },
    { to: `/template/${templateId}/about`, label: "About Us" },
    { to: `/template/${templateId}/faq`, label: "FAQ's" },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">

        {/* NAVBAR */}
        <nav className="bg-gradient-to-r from-first to-first/90 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-third/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">

              {/* Brand Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg  flex items-center justify-center ">
                  {template?.logoUrl ? (
                    <img
                      src={template.logoUrl}
                      alt={`${template?.name} Logo`}
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {template?.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-fourth hidden sm:block">
                  {template?.name}
                </h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-fourth hover:text-third font-medium text-sm transition-all duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-third to-fourth group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>

              {/* Desktop Contact Button */}
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  to={`/template/${templateId}/contact`}
                  className="px-6 py-2.5 bg-blue-500 font-medium rounded-full text-white text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
              </div>

              {/* Mobile Menu */}
              <div className="lg:hidden flex items-center gap-3">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button className="text-fourth hover:bg-third/20 p-2.5 rounded-lg transition-all duration-300">
                      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-gradient-to-b from-first to-first/95 border-l border-third/30 w-[280px] p-0">
                    <SheetHeader className="bg-gradient-to-r from-first to-first/90 px-6 py-6 border-b border-third/20">
                      <SheetTitle className="text-2xl font-bold text-fourth text-left flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-third to-fourth flex items-center justify-center">
                          {template?.name?.charAt(0)}
                        </div>
                        {template?.name}
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="mt-6 flex flex-col space-y-2 px-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsOpen(false)}
                          className="text-fourth hover:text-third hover:bg-third/15 text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      ))}
                      
                      {/* Mobile Contact Button */}
                      <Link
                        to={`/template/${templateId}/contact`}
                        onClick={() => setIsOpen(false)}
                        className="mt-4 w-full px-4 py-3 bg-blue-500 font-medium rounded-full text-white text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Mail className="h-5 w-5" />
                        Contact Us
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
          <div>
            <Outlet />
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-gradient-to-b from-black to-gray-900 text-first py-16 border-t border-third/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

              {/* Company Info */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-third to-fourth flex items-center justify-center">
                    <span className="text-white font-bold">
                      {template?.name?.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">{template?.name}</h3>
                </div>
                <p className="text-second text-sm leading-relaxed">
                  Committed to sustainability and natural excellence in every product.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-first flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-third to-fourth rounded"></span>
                  Quick Links
                </h4>
                <ul className="space-y-3 text-second">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="hover:text-third hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-third"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-first flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-third to-fourth rounded"></span>
                  Contact
                </h4>
                <div className="space-y-4 text-second text-sm">
                  <div className="flex items-start gap-3 hover:text-third transition-colors">
                    <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 text-third" />
                    <span>info@example.com</span>
                  </div>
                  <div className="flex items-start gap-3 hover:text-third transition-colors">
                    <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-third" />
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-start gap-3 hover:text-third transition-colors">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-third" />
                    <span>Nature Valley, Green City</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-first flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-third to-fourth rounded"></span>
                  Follow Us
                </h4>
                <div className="flex space-x-3">
                  {["f", "X", "in"].map((icon) => (
                    <button
                      key={icon}
                      className="w-12 h-12 bg-gradient-to-br from-third/20 to-fourth/20 border border-third/50 rounded-lg flex items-center justify-center hover:from-third hover:to-fourth hover:border-third/100 transition-all duration-300 hover:scale-110 group"
                    >
                      <span className="text-third group-hover:text-fourth font-bold text-lg transition-colors">
                        {icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-third/30 pt-8 text-center">
              <p className="text-second text-sm">
                © 2025 {template?.name} • All rights reserved • Template Preview Mode
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Template2Layout;