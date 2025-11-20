import BackOfficeLayout from "../layouts/BackOfficeLayout";
import Login from "../pages/BackOffice/Login";
import Signup from "../pages/BackOffice/Signup";
import Dashboard from "../pages/BackOffice/Dashboard";
import Products from "../pages/BackOffice/Products";
import ProductPage from "../pages/BackOffice/ProductPage";
import Categories from "../pages/BackOffice/Categories";
import CategoryPage from "../pages/BackOffice/CategoryPage";
import About from "../pages/BackOffice/About";
import Contact from "../pages/BackOffice/Contact";
import FAQs from "../pages/BackOffice/FAQs";
import Settings from "../pages/BackOffice/Settings";
import BackofficeProtectedRoute from "../protectedRoute/BackofficeProtectedRoute";

const BackOfficeRoutes = {
  path: "/backoffice",
  children: [
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    {
      element: <BackofficeProtectedRoute />, 
      children: [
        {
          path: "",
          element: <BackOfficeLayout />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: "products", element: <Products /> },
            { path: "product/page-content", element: <ProductPage /> },

            // FIXED PATH HERE
            { path: "categories/page-content", element: <CategoryPage /> },

            { path: "categories", element: <Categories /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "faqs", element: <FAQs /> },
            { path: "settings", element: <Settings /> },
          ],
        },
      ],
    },
  ],
};


export default BackOfficeRoutes;
