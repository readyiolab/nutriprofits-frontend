import { useParams } from "react-router-dom";
import { getTemplate } from "../layouts/templates";

// Dynamic wrapper for template layout
const DynamicTemplateLayout = () => {
  const { templateId } = useParams();
  const template = getTemplate(templateId);
  const LayoutComponent = template.layout;
  
  return <LayoutComponent />;
};

// Dynamic wrapper for template pages
const DynamicTemplatePage = ({ pageType }) => {
  const { templateId } = useParams();
  const template = getTemplate(templateId);
  const PageComponent = template.pages[pageType];
  
  return <PageComponent />;
};

const TemplateRoutes = {
  path: "/template/:templateId",
  element: <DynamicTemplateLayout />,
  children: [
    { 
      index: true, 
      element: <DynamicTemplatePage pageType="products" /> 
    },
    { 
      path: "products", 
      element: <DynamicTemplatePage pageType="products" /> 
    },
    { 
      path: "products/:productId", 
      element: <DynamicTemplatePage pageType="productDetail" /> 
    },
    { 
      path: "categories", 
      element: <DynamicTemplatePage pageType="categories" /> 
    },
    { 
      path: "about", 
      element: <DynamicTemplatePage pageType="about" /> 
    },
    { 
      path: "faq", 
      element: <DynamicTemplatePage pageType="faq" /> 
    },
    { 
      path: "contact", 
      element: <DynamicTemplatePage pageType="contact" /> 
    },
  ],
};

export default TemplateRoutes;