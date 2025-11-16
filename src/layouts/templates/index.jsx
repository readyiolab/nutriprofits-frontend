// Import all template layouts
import Template1Layout from './Template1/Layout';
import Template1Products from './Template1/Products';
import Template1ProductDetail from './Template1/ProductDetail';
import Template1Categories from './Template1/Categories';
import Template1About from './Template1/About';
import Template1FAQ from './Template1/FAQ';
import Template1Contact from './Template1/Contact';

import Template2Layout from './Template2/Layout';
import Template2Products from './Template2/Products';
import Template2ProductDetail from './Template2/ProductDetail';
import Template2Categories from './Template2/Categories';
import Template2About from './Template2/About';
import Template2FAQ from './Template2/FAQ';
import Template2Contact from './Template2/Contact';

import Template3Layout from './Template3/Layout';
import Template3Products from './Template3/Products';
import Template3ProductDetail from './Template3/ProductDetail';
import Template3Categories from './Template3/Categories';
import Template3About from './Template3/About';
import Template3FAQ from './Template3/FAQ';
import Template3Contact from './Template3/Contact';

// Registry of all templates with their layouts and pages
export const templateRegistry = {
  template1: {
    layout: Template1Layout,
    pages: {
      products: Template1Products,
      productDetail: Template1ProductDetail,
      categories: Template1Categories,
      about: Template1About,
      faq: Template1FAQ,
      contact: Template1Contact,
    }
  },
  template2: {
    layout: Template2Layout,
    pages: {
      products: Template2Products,
      productDetail: Template2ProductDetail,
      categories: Template2Categories,
      about: Template2About,
      faq: Template2FAQ,
      contact: Template2Contact,
    }
  },
  template3: {
    layout: Template3Layout,
    pages: {
      products: Template3Products,
      productDetail: Template3ProductDetail,
      categories: Template3Categories,
      about: Template3About,
      faq: Template3FAQ,
      contact: Template3Contact,
    }
  },
};

// Get template configuration
export const getTemplate = (templateId) => {
  return templateRegistry[templateId] || templateRegistry.template1;
};