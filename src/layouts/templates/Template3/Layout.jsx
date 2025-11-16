import { Outlet, Link, useParams } from "react-router-dom";
import { getTemplateById } from "../../../data/templates";

const Template3Layout = () => {
  const { templateId } = useParams();
  const template = getTemplateById(templateId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/templates" className="text-sm hover:text-blue-200 transition">
              ← Back to Templates
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{template?.name || "Template 1"}</h1>
              <p className="text-xs text-blue-100">Modern Business Template</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-4">
            <Link
              to={`/template/${templateId}/products`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Our Products
            </Link>
            <Link
              to={`/template/${templateId}/categories`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Shop by Category
            </Link>
            <Link
              to={`/template/${templateId}/about`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              to={`/template/${templateId}/faq`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              FAQ's
            </Link>
            <Link
              to={`/template/${templateId}/contact`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* OUTLET - Pages render here */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{template?.name}</h3>
              <p className="text-gray-400">Your trusted business partner</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Products</li>
                <li>Categories</li>
                <li>About</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-400">Email: info@example.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="text-center border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm">© 2024 Template Preview Mode</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template3Layout;