import { lazy } from "react";

import BackOfficeLayout from "../layouts/BackOfficeLayout";
import Login from "../pages/BackOffice/Login";
import Signup from "../pages/BackOffice/Signup";
const ForgotPassword = lazy(() => import("../pages/Backoffice/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Backoffice/ResetPassword"));
import ChangePassword from "../pages/BackOffice/ChangePassword";
import Dashboard from "../pages/BackOffice/Dashboard";
import Products from "../pages/BackOffice/Products";
import ProductPage from "../pages/BackOffice/ProductPage";
import Categories from "../pages/BackOffice/Categories";
import CategoryPage from "../pages/BackOffice/CategoryPage";
import About from "../pages/BackOffice/About";
import Contact from "../pages/BackOffice/Contact";
import FAQs from "../pages/BackOffice/FAQs";
import Settings from "../pages/BackOffice/Settings";
import SiteBranding from "../pages/BackOffice/SiteBranding";
import FooterContent from "../pages/BackOffice/FooterContent";
import BackofficeProtectedRoute from "../protectedRoute/BackofficeProtectedRoute";

const BackOfficeRoutes = {
  path: "/backoffice",
  children: [
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    {
      element: <BackofficeProtectedRoute />,
      children: [
        {
          path: "",
          element: <BackOfficeLayout />,
          children: [
            { index: true, element: <Dashboard /> },

            // Products
            { path: "products", element: <Products /> },
            { path: "product/page-content", element: <ProductPage /> },

            // Categories
            { path: "categories/page-content", element: <CategoryPage /> },
            { path: "categories", element: <Categories /> },

            // Pages
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "faqs", element: <FAQs /> },

            // Site Settings 
            { path: "site-branding", element: <SiteBranding /> },
            { path: "footer-content", element: <FooterContent /> },
            { path: "settings", element: <Settings /> },
            // In your BackOfficeRoutes.js
            { path: "change-password", element: <ChangePassword /> },
          ],
        },
      ],
    },
  ],
};

export default BackOfficeRoutes;
