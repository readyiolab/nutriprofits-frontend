import { lazy } from "react";
import Loadable from "../components/Loadable";

import BackOfficeLayout from "../layouts/BackOfficeLayout";
import BackofficeProtectedRoute from "../protectedRoute/BackofficeProtectedRoute";

// Lazy load pages
const Login = lazy(() => import("../pages/BackOffice/Login"));
const Signup = lazy(() => import("../pages/BackOffice/Signup"));
const ForgotPassword = lazy(() => import("../pages/BackOffice/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/BackOffice/ResetPassword"));
const ChangePassword = lazy(() => import("../pages/BackOffice/ChangePassword"));
const Dashboard = lazy(() => import("../pages/BackOffice/Dashboard"));
const Products = lazy(() => import("../pages/BackOffice/Products"));
const ProductPage = lazy(() => import("../pages/BackOffice/ProductPage"));
const Categories = lazy(() => import("../pages/BackOffice/Categories"));
const CategoryPage = lazy(() => import("../pages/BackOffice/CategoryPage"));
const About = lazy(() => import("../pages/BackOffice/About"));
const Contact = lazy(() => import("../pages/BackOffice/Contact"));
const FAQs = lazy(() => import("../pages/BackOffice/FAQs"));
const Settings = lazy(() => import("../pages/BackOffice/Settings"));
const SiteBranding = lazy(() => import("../pages/BackOffice/SiteBranding"));
const FooterContent = lazy(() => import("../pages/BackOffice/FooterContent"));
const Guide = lazy(() => import("../pages/BackOffice/Guide"));
const BlogList = lazy(() => import("../pages/BackOffice/BlogList"));
const BlogEditor = lazy(() => import("../pages/BackOffice/BlogEditor"));
const DomainManagement = lazy(() => import("../pages/BackOffice/DomainManagement"));

const BackOfficeRoutes = {
  path: "/backoffice",
  children: [
    { path: "login", element: <Login /> }, // Login is usually critical, maybe keep eager? But separating chunk is good.
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
            { index: true, element: Loadable(Dashboard)({}) },

            // Setup Guide
            { path: "guide", element: Loadable(Guide)({}) },

            // Products
            { path: "products", element: Loadable(Products)({}) },
            { path: "product/page-content", element: Loadable(ProductPage)({}) },

            // Categories
            { path: "categories/page-content", element: Loadable(CategoryPage)({}) },
            { path: "categories", element: Loadable(Categories)({}) },

            // Pages
            { path: "about", element: Loadable(About)({}) },
            { path: "contact", element: Loadable(Contact)({}) },
            { path: "faqs", element: Loadable(FAQs)({}) },

            // Blog
            { path: "blog", element: Loadable(BlogList)({}) },
            { path: "blog/new", element: Loadable(BlogEditor)({}) },
            { path: "blog/edit/:id", element: Loadable(BlogEditor)({}) },

            // Site Settings 
            { path: "site-branding", element: Loadable(SiteBranding)({}) },
            { path: "footer-content", element: Loadable(FooterContent)({}) },
            { path: "domain", element: Loadable(DomainManagement)({}) },
            { path: "settings", element: Loadable(Settings)({}) },
            // In your BackOfficeRoutes.js
            { path: "change-password", element: Loadable(ChangePassword)({}) },
          ],
        },
      ],
    },
  ],
};

export default BackOfficeRoutes;
