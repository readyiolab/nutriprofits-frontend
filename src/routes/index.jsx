import { createBrowserRouter } from "react-router-dom";
import LandingRoutes from "./LandingRoutes";
import BackOfficeRoutes from "./BackOfficeRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import TemplateRoutes from "./TemplateRoutes";

const router = createBrowserRouter([
  LandingRoutes,
  BackOfficeRoutes,
  SuperAdminRoutes,
    TemplateRoutes,
]);

export default router;
