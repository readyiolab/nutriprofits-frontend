import React from "react";
import { useBackofficeData } from "./DynamicTemplateLoader";

// Template1 pages
import T1Products from "../layouts/DynamicTemplate/Template1/DynamicProducts";
import T1ProductDetail from "../layouts/DynamicTemplate/Template1/DynamicProductDetail";
import T1Categories from "../layouts/DynamicTemplate/Template1/DynamicCategories";
import T1About from "../layouts/DynamicTemplate/Template1/DynamicAbout";
import T1FAQ from "../layouts/DynamicTemplate/Template1/DynamicFAQ";
import T1Contact from "../layouts/DynamicTemplate/Template1/DynamicContact";
import T1BlogList from "../layouts/DynamicTemplate/Template1/DynamicBlogList";
import T1BlogDetail from "../layouts/DynamicTemplate/Template1/DynamicBlogDetail";

// Template2 pages
import T2About from "../layouts/DynamicTemplate/Template2/DynamicAbout";
import T2FAQ from "../layouts/DynamicTemplate/Template2/DynamicFAQ";
import T2Contact from "../layouts/DynamicTemplate/Template2/DynamicContact";
import T2BlogList from "../layouts/DynamicTemplate/Template2/DynamicBlogList";
import T2BlogDetail from "../layouts/DynamicTemplate/Template2/DynamicBlogDetail";
import T2Products from "../layouts/DynamicTemplate/Template2/DynamicProducts";

// Template3 pages
import T3About from "../layouts/DynamicTemplate/Template3/DynamicAbout";
import T3FAQ from "../layouts/DynamicTemplate/Template3/DynamicFAQ";
import T3Contact from "../layouts/DynamicTemplate/Template3/DynamicContact";
import T3BlogList from "../layouts/DynamicTemplate/Template3/DynamicBlogList";
import T3BlogDetail from "../layouts/DynamicTemplate/Template3/DynamicBlogDetail";
import T3Products from "../layouts/DynamicTemplate/Template3/DynamicProducts";

/**
 * Maps template IDs to their page components.
 * Products, ProductDetail, and Categories use Template1 as default
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
    productDetail: T1ProductDetail,
    categories: T1Categories,
    about: T2About,
    faq: T2FAQ,
    contact: T2Contact,
    blog: T2BlogList,
    blogDetail: T2BlogDetail,
  },
  3: {
    products: T3Products,
    productDetail: T1ProductDetail,
    categories: T1Categories,
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
