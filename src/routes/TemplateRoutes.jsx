import { useParams, Navigate, Outlet } from "react-router-dom";
import { getTemplate } from "../layouts/templates";

// Dynamic wrapper for template layout
const DynamicTemplateLayout = () => {
  const { templateId } = useParams();
  const template = getTemplate(templateId);
  
  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Template Not Found</h1>
          <p className="text-gray-600 mb-6">The template you're looking for doesn't exist.</p>
          <a 
            href="/landing/templates"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Templates
          </a>
        </div>
      </div>
    );
  }
  
  const LayoutComponent = template.layout;
  return <LayoutComponent><Outlet /></LayoutComponent>;
};

// Dynamic wrapper for template pages
const DynamicTemplatePage = ({ pageType }) => {
  const { templateId } = useParams();
  const template = getTemplate(templateId);
  
  if (!template || !template.pages[pageType]) {
    return <Navigate to="/landing/templates" replace />;
  }
  
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