import { Outlet, Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Mail, Phone, MapPin, ChevronRight,ArrowRight } from "lucide-react";
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
      <div className="min-h-screen flex flex-col bg-slate-50 font-t2-body">
      {/* FLOATING NAVBAR */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] transition-all duration-500">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Brand Logo & Name */}
              <Link to={`/template/${templateId}/products`} className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-500/20 transform group-hover:rotate-6 transition-transform duration-300">
                  {template?.logoUrl ? (
                    <img
                      src={template.logoUrl}
                      alt={`${template?.name} Logo`}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl font-t2-heading">
                      {template?.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block font-t2-heading group-hover:text-emerald-600 transition-colors">
                  {template?.name}
                </h1>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-5 py-2 text-[13px] font-bold uppercase tracking-wider text-slate-600 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Desktop Contact Button */}
                <Link
                  to={`/template/${templateId}/contact`}
                  className="ml-4 px-7 py-3 bg-slate-900 text-white text-[13px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all duration-300 rounded-full shadow-lg shadow-slate-900/10 hover:shadow-emerald-500/20"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button className="text-slate-600 hover:text-emerald-600 p-2.5 bg-slate-50 rounded-2xl transition-all border border-slate-100 hover:border-emerald-200">
                      <Menu className="h-6 w-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent 
                    side="right" 
                    className="w-full sm:w-[400px] border-none p-0 bg-white/95 backdrop-blur-2xl rounded-l-[3rem]"
                  >
                    <div className="flex flex-col h-full p-8 relative">
                       <div className="flex items-center gap-3 mb-12">
                          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                             <span className="text-white font-bold text-lg font-t2-heading">{template?.name?.charAt(0)}</span>
                          </div>
                          <h2 className="text-xl font-bold text-slate-900 font-t2-heading">{template?.name}</h2>
                       </div>

                      <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-bold text-slate-400 hover:text-emerald-600 transition-all duration-300 font-t2-heading flex items-center justify-between group"
                          >
                            {link.label}
                            <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                        
                        <div className="pt-12">
                             <Link
                            to={`/template/${templateId}/contact`}
                            onClick={() => setIsOpen(false)}
                            className="w-full py-5 bg-emerald-600 text-white text-lg font-bold text-center tracking-wide hover:bg-slate-900 transition-all duration-300 rounded-[2rem] shadow-xl shadow-emerald-600/20 block"
                          >
                            Get in Touch
                          </Link>
                        </div>
                      </div>

                      <div className="mt-auto border-t border-slate-100 pt-8 text-slate-400 text-sm">
                         <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-5 h-5 text-emerald-500" />
                            <span>hello@example.com</span>
                         </div>
                         <p>© 2025 {template?.name}</p>
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

      {/* ROBUST FOOTER */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-600/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

            {/* Brand Identity */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <span className="text-white font-bold text-xl font-t2-heading">
                    {template?.name?.charAt(0)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-t2-heading">{template?.name}</h3>
              </div>
              <p className="text-slate-400 text-[15px] leading-relaxed mb-8 max-w-xs">
                Empowering your health journey with science-backed natural supplements for a better tomorrow.
              </p>
              <div className="flex space-x-4">
                {["f", "𝕏", "in"].map((icon) => (
                  <button
                    key={icon}
                    className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300 group"
                  >
                    <span className="text-white font-bold text-base group-hover:scale-110 transition-transform">
                      {icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-8 font-t2-heading">
                Explore
              </h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 scale-0 group-hover:scale-100 transition-transform"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-8 font-t2-heading">
                Reach Out
              </h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-600/20 group-hover:border-emerald-600/30 transition-all">
                    <Mail className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Email Us</p>
                    <p className="text-slate-200">hello@example.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-600/20 group-hover:border-emerald-600/30 transition-all">
                    <Phone className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Call Us</p>
                    <p className="text-slate-200">(123) 456-7890</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter / CTA */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-8 font-t2-heading">
                Updates
              </h4>
              <p className="text-slate-400 text-sm mb-6">Subscribe to get the latest health tips and product updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 w-full"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 p-3 rounded-xl transition-all">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">
              © 2025 {template?.name}. All rights reserved.
            </p>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
               <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>

    </>
  );
};

export default Template2Layout;