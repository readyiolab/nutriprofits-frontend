import { lazy } from "react";
import Loadable from "../components/Loadable";
import LandingLayout from "../layouts/LandingLayout";

// Lazy load pages
const Home = lazy(() => import("../pages/Landing/Home"));
const About = lazy(() => import("../pages/Landing/About"));
const FAQ = lazy(() => import("../pages/Landing/FAQ"));
const Contact = lazy(() => import("../pages/Landing/Contact"));
const Templates = lazy(() => import("../pages/Landing/Templates"));

const LandingRoutes = {
  path: "/",
  element: <LandingLayout />,
  children: [
    { index: true, element: Loadable(Home)({}) },
    { path: "about", element: Loadable(About)({}) },
    { path: "faq", element: Loadable(FAQ)({}) },
    { path: "contact", element: Loadable(Contact)({}) },
    { path: "templates", element: Loadable(Templates)({}) },
  ],
};

export default LandingRoutes;
