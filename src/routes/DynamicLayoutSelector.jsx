import React from "react";
import { useBackofficeData } from "./DynamicTemplateLoader";

// Import all template layouts
import Template1Layout from "../layouts/DynamicTemplate/Template1/DynamicLayout";
import Template2Layout from "../layouts/DynamicTemplate/Template2/DynamicLayout";
import Template3Layout from "../layouts/DynamicTemplate/Template3/DynamicLayout";

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
