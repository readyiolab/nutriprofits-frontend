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
    { to: `/template/${templateId}/blog`, label: "Blog" },
    { to: `/template/${templateId}/faq`, label: "FAQ's" },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between font-t2-body">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">

              {/* Brand Name */}
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-third/10 to-fourth/10">
                  {template?.logoUrl ? (
                    <img
                      src={template.logoUrl}
                      alt={`${template?.name} Logo`}
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    <span className="text-fourth font-bold text-xl font-t2-heading">
                      {template?.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight hidden sm:block font-t2-heading">
                  {template?.name}
                </h1>
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

                {/* Desktop Contact Button */}
                <Link
                  to={`/template/${templateId}/contact`}
                  className="ml-6 px-6 py-2.5 bg-fourth text-white text-sm font-medium tracking-wide first-letter:uppercase hover:bg-third transition-all duration-300 rounded shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Contact Us
                </Link>
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
                            to={`/template/${templateId}/contact`}
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
                    <span className="text-white font-bold font-t2-heading">
                      {template?.name?.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-t2-heading">{template?.name}</h3>
                </div>
                <p className="text-second text-sm leading-relaxed">
                  Committed to sustainability and natural excellence in every product.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-first flex items-center gap-2 font-t2-heading">
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
                <h4 className="text-lg font-semibold mb-6 text-first flex items-center gap-2 font-t2-heading">
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
                <h4 className="text-lg font-semibold mb-6 text-first flex items-center gap-2 font-t2-heading">
                  <span className="w-1 h-6 bg-gradient-to-b from-third to-fourth rounded"></span>
                  Follow Us
                </h4>
                <div className="flex space-x-3">
                  {["f", "X", "in"].map((icon) => (
                    <button
                      key={icon}
                      className="w-12 h-12 bg-gradient-to-br from-third/20 to-fourth/20 border border-third/50 rounded-lg flex items-center justify-center hover:from-third hover:to-fourth hover:border-third/100 transition-all duration-300 hover:scale-110 group"
                    >
                      <span className="text-third group-hover:text-fourth font-bold text-lg transition-colors font-t2-heading">
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