import { lazy } from "react";
import Loadable from "../components/Loadable";
import { Navigate } from "react-router-dom";

// Layout
import SuperAdminLayout from "../layouts/SuperAdminLayout";

// Protected Route wrapper
import SuperAdminProtectedRoute from "../protectedRoute/SuperAdminProtectedRoute";

// Lazy load pages
const Dashboard = lazy(() => import("../pages/SuperAdmin/Dashboard"));
const Tenants = lazy(() => import("../pages/SuperAdmin/Tenants"));
const CreateUser = lazy(() => import("../pages/SuperAdmin/CreateUser"));
const TrainingManagement  = lazy(() => import("../pages/SuperAdmin/TrainingManagement"));
const ChangePassword = lazy(() => import("../pages/SuperAdmin/ChangePassword"));
const Analytics = lazy(() => import("../pages/SuperAdmin/Analytics"));
const Settings = lazy(() => import("../pages/SuperAdmin/Settings"));
const Login = lazy(() => import("../pages/SuperAdmin/Login"));

const SuperAdminRoutes = {
  path: "/superadmin",
  children: [
    // Public Route
    {
      path: "login",
      element: <Login />,
    },

    // Protected Routes
    {
      element: <SuperAdminProtectedRoute />,
      children: [
        {
          path: "",
          element: <SuperAdminLayout />,
          children: [
            { index: true, element: Loadable(Dashboard)({}) },
            { path: "tenants", element: Loadable(Tenants)({}) },
            { path: "create-user", element: Loadable(CreateUser)({}) },
            {path:"trainings", element: Loadable(TrainingManagement)({})},
            { path: "change-password", element: Loadable(ChangePassword)({}) },
            { path: "analytics", element: Loadable(Analytics)({}) },
            { path: "settings", element: Loadable(Settings)({}) },

            // Catch-all redirect
            { path: "*", element: <Navigate to="/superadmin" replace /> },
          ],
        },
      ],
    },
  ],
};

export default SuperAdminRoutes;
