import React, { lazy } from "react";
import { useBackofficeData } from "./DynamicTemplateLoader";

// Import template layouts lazily
const Template1Layout = lazy(() => import("../layouts/DynamicTemplate/Template1/DynamicLayout"));
const Template2Layout = lazy(() => import("../layouts/DynamicTemplate/Template2/DynamicLayout"));
const Template3Layout = lazy(() => import("../layouts/DynamicTemplate/Template3/DynamicLayout"));

/**
 * Selects and renders the correct DynamicTemplate Layout based on
 * the backoffice template_id from BackofficeContext.
 */
const DynamicLayoutSelector = () => {
  const backofficeData = useBackofficeData();
  const templateId = backofficeData?.backoffice?.template_id || 1;

  switch (templateId) {
    case 1:
      return <Template1Layout />;
    case 2:
      return <Template2Layout />;
    case 3:
      return <Template3Layout />;
    default:
      return <Template1Layout />;
  }
};

export default DynamicLayoutSelector;
