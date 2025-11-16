import SuperAdminLayout from "../layouts/SuperAdminLayout";
import Dashboard from "../pages/SuperAdmin/Dashboard";
import Tenants from "../pages/SuperAdmin/Tenants";
import Analytics from "../pages/SuperAdmin/Analytics";

const SuperAdminRoutes = {
  path: "/superadmin",
  element: <SuperAdminLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "tenants", element: <Tenants /> },
    { path: "analytics", element: <Analytics /> },
  ],
};

export default SuperAdminRoutes;
