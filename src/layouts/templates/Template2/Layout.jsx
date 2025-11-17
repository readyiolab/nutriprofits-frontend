import { Outlet, Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
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
    { to: `/template/${templateId}/products`, label: " Products" },
    { to: `/template/${templateId}/categories`, label: "Category" },
    { to: `/template/${templateId}/about`, label: "About Us" },
    { to: `/template/${templateId}/faq`, label: "FAQ's" },
    { to: `/template/${templateId}/contact`, label: "Contact" },
  ];

  return (
    <>
      

      <div className="min-h-screen bg-first">

        {/* NAVBAR */}
        <nav className="bg-first/95 backdrop-blur-md border-b border-third/20 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-5">

              {/* Brand Name */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-fourth">
                  {template?.name}
                </h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-fourth hover:text-third font-medium text-base transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
                <button className="bg-third text-fourth px-3 py-2 rounded-2xl font-medium tracking-wider">
                  Get Started
                </button>
              </div>

              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button className="text-fourth hover:bg-third/10 p-2 rounded-lg transition">
                      <Menu className="h-8 w-8" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-first border-l border-third/30 w-[300px]">
                    <SheetHeader>
                      <SheetTitle className="text-3xl font-bold text-fourth text-left">
                        {template?.name}
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-10 flex flex-col space-y-5">
                      {navLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsOpen(false)}
                          className="text-fourth hover:text-third hover:bg-third/10 text-xl font-medium py-3 px-5 rounded-lg transition-all"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <button
                        onClick={() => setIsOpen(false)}
                        className="bg-third text-white py-4 rounded-full font-bold hover:bg-fourth transition-all uppercase tracking-wider"
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

        {/* MAIN CONTENT */}
        <main className="min-h-screen py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-fourth text-first py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

              {/* Company Info */}
              <div className="lg:col-span-1">
                <h3 className="text-3xl font-bold mb-4">{template?.name}</h3>
                <p className="text-second text-base leading-relaxed">
                  Committed to sustainability and natural excellence in every product.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-first">Quick Links</h4>
                <ul className="space-y-4 text-second">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="hover:text-third transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-first">Contact Us</h4>
                <p className="text-second mb-2">info@example.com</p>
                <p className="text-second mb-2">(123) 456-7890</p>
                <p className="text-second">Nature Valley, Green City</p>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-first">Follow Us</h4>
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-first rounded-full flex items-center justify-center hover:bg-third transition cursor-pointer">
                    <span className="text-fourth text-2xl font-bold">f</span>
                  </div>
                  <div className="w-12 h-12 bg-first rounded-full flex items-center justify-center hover:bg-third transition cursor-pointer">
                    <span className="text-fourth text-2xl font-bold">X</span>
                  </div>
                  <div className="w-12 h-12 bg-first rounded-full flex items-center justify-center hover:bg-third transition cursor-pointer">
                    <span className="text-fourth text-2xl font-bold">in</span>
                  </div>
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