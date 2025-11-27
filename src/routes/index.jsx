import { createBrowserRouter } from "react-router-dom";
import SmartRouter from "./SmartRouter";
import LandingRoutes from "./LandingRoutes";
import BackOfficeRoutes from "./BackOfficeRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import TemplateRoutes from "./TemplateRoutes"; // ✅ MAKE SURE THIS IS IMPORTED

const router = createBrowserRouter([
  // Root - SmartRouter handles main domain vs subdomains
  {
    path: "/",
    element: <SmartRouter />,
  },

  // Landing Routes - Only for main domain (/products, /categories, etc.)
  LandingRoutes,

  // ✅✅✅ ADD THIS LINE - Template Routes MUST be here ✅✅✅
  TemplateRoutes,

  // Backoffice Routes - For backoffice admin panel
  BackOfficeRoutes,

  // SuperAdmin Routes - For super admin panel
  SuperAdminRoutes,

  // Catch all - This must be LAST
  {
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
  },
]);

export default router;