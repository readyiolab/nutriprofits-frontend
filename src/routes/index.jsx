import { createBrowserRouter } from "react-router-dom";
import { getDomainInfo } from "../utils/domain";

// Route modules
import LandingRoutes from "./LandingRoutes";
import BackOfficeRoutes from "./BackOfficeRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import TemplateRoutes from "./TemplateRoutes";
import DynamicTemplateLoader from "./DynamicTemplateLoader";
import DynamicLayoutSelector from "./DynamicLayoutSelector";
import DynamicPage from "./DynamicPage";

// ─── Detect domain at module level (synchronous) ───
const { isMain } = getDomainInfo();

// ─── Dynamic Store Routes — subdomain / tenant storefronts ───
const DynamicStoreRoutes = {
  path: "/",
  element: <DynamicTemplateLoader />,
  children: [
    {
      element: <DynamicLayoutSelector />,
      children: [
        // Home — shows all products (tenant landing)
        { index: true, element: <DynamicPage pageType="products" /> },

        // Product detail — /product/product-name
        { path: "product/:productSlug", element: <DynamicPage pageType="productDetail" /> },

        // Categories listing — /categories
        { path: "categories", element: <DynamicPage pageType="categories" /> },

        // Category-wise products — /categories/category-name
        { path: "categories/:categorySlug", element: <DynamicPage pageType="products" /> },

        // Category + product detail — /categories/category-name/product-name
        { path: "categories/:categorySlug/:productSlug", element: <DynamicPage pageType="productDetail" /> },

        // Static pages
        { path: "about", element: <DynamicPage pageType="about" /> },
        { path: "faq", element: <DynamicPage pageType="faq" /> },
        { path: "contact", element: <DynamicPage pageType="contact" /> },

        // Blog
        { path: "blog", element: <DynamicPage pageType="blog" /> },
        { path: "blog/:blogSlug", element: <DynamicPage pageType="blogDetail" /> },
      ],
    },
  ],
};

// ─── 404 fallback ───
const NotFound = {
  path: "*",
  element: (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <a href="/" className="text-blue-600 hover:underline">Go Home</a>
      </div>
    </div>
  ),
};

// ─── Build routes based on domain ───
// Main domain  → Landing, Templates preview, BackOffice, SuperAdmin
// Subdomain    → Dynamic store only (products, categories, about, etc.)
// ─── Root Layout to handle global behaviors like ScrollToTop ───
import ScrollToTop from "../components/ScrollToTop";
import { Outlet } from "react-router-dom";

const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

const routes = isMain
  ? [LandingRoutes, TemplateRoutes, BackOfficeRoutes, SuperAdminRoutes, NotFound]
  : [DynamicStoreRoutes, NotFound];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes,
  },
]);

export default router;