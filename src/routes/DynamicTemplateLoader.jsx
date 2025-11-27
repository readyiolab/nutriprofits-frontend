import React, { useEffect, useState, Suspense, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getDomainInfo } from "../utils/domain";
import LoadingFallback from "../components/common/LoadingFallback";
// Import layouts based on template
import Template1Layout from "../layouts/DynamicTemplate/Template1/DynamicLayout";
import Template2Layout from "../layouts/DynamicTemplate/Template2/DynamicLayout";
import Template3Layout from "../layouts/DynamicTemplate/Template3/DynamicLayout";

// Create context for sharing backoffice data
export const BackofficeContext = createContext(null);

const DynamicTemplateLoader = ({ children }) => {
  const [backofficeData, setBackofficeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBackofficeData = async () => {
      try {
        const { hostname, isMain } = getDomainInfo();

        // Don't proceed if main domain
        if (isMain) {
          console.log("🏠 Main domain detected - skipping backoffice loader");
          navigate("/", { replace: true });
          return;
        }

        console.log(`🔍 Loading backoffice data for: ${hostname}`);

        // Call the new API endpoint that returns backoffice + full site data
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(
          `${apiBaseUrl}/api/backoffice-public/domain-with-data`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Host": hostname, // Pass hostname as header for domain detection
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to load backoffice: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.backoffice) {
          throw new Error("Store not found. This subdomain may not be configured yet.");
        }

        console.log(`✅ Backoffice data loaded:`, data.backoffice);
        setBackofficeData(data);
      } catch (err) {
        console.error("❌ Error fetching backoffice data:", err);
        setError(err.message || "Unable to load store data");
      } finally {
        setLoading(false);
      }
    };

    fetchBackofficeData();
  }, [navigate]);

  // Loading state
  if (loading) {
    return <LoadingFallback />;
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Store Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => {
              const mainDomain = import.meta.env.VITE_MAIN_DOMAIN || "https://igrowbig.com";
              window.location.href = mainDomain;
            }}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Go to Main Site
          </button>
        </div>
      </div>
    );
  }

  // No data
  if (!backofficeData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Store</h1>
          <p className="text-gray-600">No store data available</p>
        </div>
      </div>
    );
  }

  // Select template layout based on template_id
  const templateId = backofficeData.backoffice?.template_id || 1;
  let TemplateLayout;

  switch (templateId) {
    case 1:
      TemplateLayout = Template1Layout;
      break;
    case 2:
      TemplateLayout = Template2Layout;
      break;
    case 3:
      TemplateLayout = Template3Layout;
      break;
    default:
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Invalid Template</h1>
            <p className="text-gray-600 mb-6">
              Template ID {templateId} is not supported.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      );
  }

  // Render template with context providing backoffice data to all children
  return (
    <BackofficeContext.Provider value={backofficeData}>
      <Suspense fallback={<LoadingFallback />}>
        <TemplateLayout>{children}</TemplateLayout>
      </Suspense>
    </BackofficeContext.Provider>
  );
};

// Export hook for components to use backoffice data
export const useBackofficeData = () => {
  const context = useContext(BackofficeContext);
  if (!context) {
    console.warn("useBackofficeData must be used within DynamicTemplateLoader");
    return null;
  }
  return context;
};

export default DynamicTemplateLoader;