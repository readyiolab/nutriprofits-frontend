import React, { useEffect, useState, Suspense, useContext, createContext } from "react";
import { Outlet } from "react-router-dom";
import { getDomainInfo } from "../utils/domain";
import LoadingFallback from "../components/common/LoadingFallback";

// Create context for sharing backoffice data
export const BackofficeContext = createContext(null);

const DynamicTemplateLoader = () => {
  const [backofficeData, setBackofficeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBackofficeData = async () => {
      try {
        const { hostname } = getDomainInfo();

        console.log(`🔍 Loading backoffice data for: ${hostname}`);

        // Smart API URL detection
        let apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        
        if (!apiBaseUrl) {
          apiBaseUrl = window.location.origin;
        }

        console.log(`📡 API Base URL: ${apiBaseUrl}`);

        const response = await fetch(
          `${apiBaseUrl}/api/backoffice-public/domain-with-data`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Host": hostname,
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
  }, []);

  // Update SEO and Favicon when data changes
  useEffect(() => {
    if (!backofficeData?.branding) return;

    const { branding } = backofficeData;
    const storeName = branding.site_name || backofficeData?.backoffice?.store_name || "Store";

    // 1. Update Title
    document.title = branding.meta_title || `${storeName}`;

    // 2. Update Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = branding.meta_description || branding.site_description || "";

    // 3. Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = branding.meta_keywords || "";

    // 4. Update Favicon
    if (branding.favicon_url) {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.href = branding.favicon_url;
    }
  }, [backofficeData]);

  if (loading) {
    return <LoadingFallback />;
  }

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

  return (
    <BackofficeContext.Provider value={backofficeData}>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
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