import { Outlet, Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Menu, Mail, Phone, ArrowRight } from "lucide-react";
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
      <div className="min-h-screen flex flex-col bg-white font-t2-body">
        {/* ENTERPRISE-GRADE LIGHT NAVBAR */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                {/* Brand Logo & Name */}
                <Link to={`/template/${templateId}/products`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200 group-hover:border-emerald-500 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent"></div>
                    {template?.logoUrl ? (
                      <img
                        src={template.logoUrl}
                        alt={`${template?.name} Logo`}
                        className="h-6 w-6 object-contain relative z-10"
                      />
                    ) : (
                      <span className="text-emerald-600 font-bold text-lg font-t2-heading relative z-10">
                        {template?.name?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block font-t2-heading group-hover:text-emerald-600 transition-colors">
                    {template?.name}
                  </h1>
                </Link>

                {/* Desktop Menu - Right Aligned */}
                <div className="hidden lg:flex items-center space-x-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="relative text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-all duration-300 group py-2"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  ))}

                  {/* Desktop Contact Button */}
                  <Link
                    to={`/template/${templateId}/contact`}
                    className="ml-4 px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <button className="text-slate-600 p-2 bg-slate-50 rounded-xl transition-all border border-slate-200 hover:border-slate-300">
                        <Menu className="h-5 w-5" />
                      </button>
                    </SheetTrigger>
                    <SheetContent 
                      side="right" 
                      className="w-full sm:w-[350px] border-l border-slate-100 p-0 bg-white/98 backdrop-blur-2xl rounded-l-2xl shadow-2xl"
                    >
                      <div className="flex flex-col h-full p-8 relative">
                        <div className="flex items-center gap-3 mb-10">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                            <span className="text-emerald-600 font-bold text-lg font-t2-heading">{template?.name?.charAt(0)}</span>
                          </div>
                          <h2 className="text-xl font-bold text-slate-800 font-t2-heading">{template?.name}</h2>
                        </div>

                        <div className="flex flex-col space-y-5 mt-4">
                          {navLinks.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              onClick={() => setIsOpen(false)}
                              className="text-lg font-bold text-slate-600 hover:text-emerald-600 transition-all duration-300 font-t2-heading flex items-center justify-between group border-b border-slate-100 pb-3"
                            >
                              <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-emerald-600" />
                            </Link>
                          ))}
                          
                          <div className="pt-6">
                            <Link
                              to={`/template/${templateId}/contact`}
                              onClick={() => setIsOpen(false)}
                              className="w-full py-3 bg-emerald-600 text-white text-sm font-bold text-center tracking-wider hover:bg-emerald-700 transition-all duration-300 rounded-xl shadow-sm block uppercase"
                            >
                              Get in Touch
                            </Link>
                          </div>
                        </div>

                        <div className="mt-auto border-t border-slate-100 pt-6 text-slate-400 text-xs">
                          <p>© 2026 {template?.name}</p>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* PREMIUM ENTERPRISE FOOTER */}
        <footer className="bg-slate-50 text-slate-600 border-t border-slate-100 pt-20 pb-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
              {/* Brand Identity */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <span className="text-emerald-600 font-bold text-lg font-t2-heading">
                      {template?.name?.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-t2-heading text-slate-800">{template?.name}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
                  Empowering your health journey with science-backed natural supplements for a better tomorrow.
                </p>
                <div className="flex space-x-3">
                  {["f", "𝕏", "in"].map((icon) => (
                    <button
                      key={icon}
                      className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 hover:text-white text-slate-400 transition-all duration-300 group"
                    >
                      <span className="font-bold text-sm group-hover:scale-110 transition-transform">
                        {icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Navigation */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 font-t2-heading">
                  Explore
                </h4>
                <ul className="space-y-3 text-sm">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-2 group">
                        <span className="w-1 h-1 rounded-full bg-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 font-t2-heading">
                  Reach Out
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-all">
                      <Mail className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Email Us</p>
                      <p className="text-slate-700 text-sm">hello@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-all">
                      <Phone className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Call Us</p>
                      <p className="text-slate-700 text-sm">(123) 456-7890</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter / CTA */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 font-t2-heading">
                  Updates
                </h4>
                <p className="text-slate-500 text-xs mb-4">Subscribe to get the latest health tips and product updates.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full text-slate-800"
                  />
                  <button className="bg-emerald-600 hover:bg-emerald-700 p-2 text-white rounded-lg transition-all flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-xs">
                © 2026 {template?.name}. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Template2Layout;