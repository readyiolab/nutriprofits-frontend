

import { Navigate } from "react-router-dom";

// Layout
import SuperAdminLayout from "../layouts/SuperAdminLayout";

// Pages - all inside pages/SuperAdmin/
import Dashboard from "../pages/SuperAdmin/Dashboard";
import Tenants from "../pages/SuperAdmin/Tenants";
import CreateUser from "../pages/SuperAdmin/CreateUser";          
import ChangePassword from "../pages/SuperAdmin/ChangePassword";
import Analytics from "../pages/SuperAdmin/Analytics";
import Settings from "../pages/SuperAdmin/Settings";
import Login from "../pages/SuperAdmin/Login";

const SuperAdminRoutes = {
  path: "/superadmin",
  children: [
   
    {
      path: "login",                    
      element: <Login />,
    },


    {
      path: "",                         
    
     
      element: <SuperAdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },                    
        { path: "tenants", element: <Tenants /> },                 
        { path: "create-user", element: <CreateUser /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "analytics", element: <Analytics /> },
        { path: "settings", element: <Settings /> },

        // Catch-all redirect
        { path: "*", element: <Navigate to="/superadmin" replace /> },
      ],
    },
  ],
};

export default SuperAdminRoutes;

