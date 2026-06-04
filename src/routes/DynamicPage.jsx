import React, { lazy } from "react";
import { useBackofficeData } from "./DynamicTemplateLoader";

// Template1 pages
const T1Products = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicProducts"));
const T1ProductDetail = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicProductDetail"));
const T1Categories = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicCategories"));
const T1About = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicAbout"));
const T1FAQ = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicFAQ"));
const T1Contact = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicContact"));
const T1BlogList = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicBlogList"));
const T1BlogDetail = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicBlogDetail"));

// Template2 pages
const T2About = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicAbout"));
const T2FAQ = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicFAQ"));
const T2Contact = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicContact"));
const T2BlogList = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicBlogList"));
const T2BlogDetail = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicBlogDetail"));
const T2Products = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicProducts"));
const T2ProductDetail = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicProductDetail"));
const T2Categories = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicCategories"));

// Template3 pages
const T3About = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicAbout"));
const T3FAQ = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicFAQ"));
const T3Contact = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicContact"));
const T3BlogList = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicBlogList"));
const T3BlogDetail = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicBlogDetail"));
const T3Products = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicProducts"));
const T3ProductDetail = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicProductDetail"));
const T3Categories = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicCategories"));

/**
 * Maps template IDs to their page components.
 * Categories use Template1 as default
 * since Template2 and Template3 don't have those pages yet.
 */
const templatePages = {
  1: {
    products: T1Products,
    productDetail: T1ProductDetail,
    categories: T1Categories,
    about: T1About,
    faq: T1FAQ,
    contact: T1Contact,
    blog: T1BlogList,
    blogDetail: T1BlogDetail,
  },
  2: {
    products: T2Products,
    productDetail: T2ProductDetail,
    categories: T2Categories,
    about: T2About,
    faq: T2FAQ,
    contact: T2Contact,
    blog: T2BlogList,
    blogDetail: T2BlogDetail,
  },
  3: {
    products: T3Products,
    productDetail: T3ProductDetail,
    categories: T3Categories,
    about: T3About,
    faq: T3FAQ,
    contact: T3Contact,
    blog: T3BlogList,
    blogDetail: T3BlogDetail,
  },
};

/**
 * Resolves the correct page component based on template_id and pageType.
 */
const DynamicPage = ({ pageType }) => {
  const backofficeData = useBackofficeData();
  const templateId = backofficeData?.backoffice?.template_id || 1;
  const pages = templatePages[templateId] || templatePages[1];
  const PageComponent = pages[pageType] || pages.products;
  return <PageComponent />;
};

export default DynamicPage;
