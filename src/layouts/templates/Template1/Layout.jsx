import { Outlet, Link, useParams } from "react-router-dom";
import { getTemplateById } from "../../../data/templates";

const Template1Layout = () => {
  const { templateId } = useParams();
  const template = getTemplateById(templateId);

  return (
    <div className="min-h-screen bg-[#faf5e4]">
      {/* NAVIGATION */}
      <nav className="bg-[#faf5e4]/90 backdrop-blur-md border-b border-[#2c786c]/20 sticky top-0 z-50 shadow-lg transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <span className="ml-3 text-xl font-semibold text-[#004445]">{template?.name}</span>
            </div>

            {/* Navigation Menu */}
            <div className="flex items-center space-x-8 ">
              <Link
                to={`/template/${templateId}/products`}
                className="text-[#004445] hover:text-[#f8b400] font-medium  text-sm transition-colors"
              >
                Products
              </Link>
              <Link
                to={`/template/${templateId}/categories`}
                className="text-[#004445] hover:text-[#f8b400] font-medium text-sm transition-colors"
              >
                Category
              </Link>
              <Link
                to={`/template/${templateId}/about`}
                className="text-[#004445] hover:text-[#f8b400] font-medium text-sm transition-colors"
              >
                About Us
              </Link>
              <Link
                to={`/template/${templateId}/faq`}
                className="text-[#004445] hover:text-[#f8b400] font-medium text-sm transition-colors"
              >
                FAQ's
              </Link>
              <Link
                to={`/template/${templateId}/contact`}
                className="text-[#004445] hover:text-[#f8b400] font-medium text-sm transition-colors"
              >
                Contact
              </Link>

              {/* CTA Button */}
              <button className="bg-[#f8b400] text-[#004445] px-6 py-2 rounded-lg font-medium text-sm hover:bg-[#2c786c] hover:text-[#faf5e4] transition-all uppercase">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* OUTLET - Pages render here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004445] text-[#faf5e4] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                
                <span className="ml-3 text-xl font-bold">{template?.name}</span>
              </div>
              <p className="text-[#faf5e4]/80">Your trusted business partner for quality products and services.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-[#faf5e4]/80">
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
            <div>
              <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
              <p className="text-[#faf5e4]/80 mb-2"> info@example.com</p>
              <p className="text-[#faf5e4]/80 mb-2"> (123) 456-7890</p>
              <p className="text-[#faf5e4]/80"> 123 Business St, City</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Follow Us</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                  <span className="text-black">f</span>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                  <span className="text-black">𝕏</span>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f8b400]/50 transition-colors cursor-pointer">
                  <span className="text-black">in</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center border-t border-[#2c786c]/50 pt-8">
            <p className="text-[#faf5e4]/80 text-sm">© 2024 {template?.name}. All rights reserved. | Template Preview Mode</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template1Layout;