import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDomainInfo } from "../utils/domain";
import LoadingFallback from "../components/common/LoadingFallback";
import DynamicTemplateLoader from "./DynamicTemplateLoader";

const SmartRouter = () => {
  const navigate = useNavigate();
  const [domainInfo, setDomainInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDomain = async () => {
      try {
        const info = getDomainInfo();
        setDomainInfo(info);

        if (info.isMain) {
          console.log("✅ Main domain detected:", info.hostname);
          // Redirect to /landing for main domain
          navigate("/landing", { replace: true });
        } else {
          console.log("✅ Subdomain/Custom domain detected:", info.hostname);
        }
      } catch (error) {
        console.error("❌ Error initializing domain info:", error);
        setDomainInfo({ isMain: true });
        navigate("/landing", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    initializeDomain();
  }, [navigate]);

  if (loading) return <LoadingFallback />;

  if (!domainInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">Unable to determine domain configuration</p>
        </div>
      </div>
    );
  }

  // Subdomain/Custom domain - load dynamic template
  if (!domainInfo.isMain) {
    return <DynamicTemplateLoader />;
  }

  // Main domain will be handled by navigation above
  return <LoadingFallback />;
};

export default SmartRouter;