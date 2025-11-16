import LandingLayout from "../layouts/LandingLayout";
import Home from "../pages/Landing/Home";
import Products from "../pages/Landing/Products";
import Categories from "../pages/Landing/Categories";
import About from "../pages/Landing/About";
import FAQ from "../pages/Landing/FAQ";
import Contact from "../pages/Landing/Contact";
import Templates from "../pages/Landing/Templates";

const LandingRoutes = {
  path: "/",
  element: <LandingLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: "products", element: <Products /> },
    { path: "categories", element: <Categories /> },
    { path: "about", element: <About /> },
    { path: "faq", element: <FAQ /> },
    { path: "contact", element: <Contact /> },
    {path: "templates", element: <Templates /> },
  ],
};

export default LandingRoutes;