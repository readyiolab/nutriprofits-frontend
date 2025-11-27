import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFetch } from '@/hooks';

const DomainVerificationContext = createContext();

export const DomainVerificationProvider = ({ children }) => {
  const [domainVerification, setDomainVerification] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const backofficeId = React.useMemo(() => {
    return localStorage.getItem('backofficeId') || '1';
  }, []);

  // Fetch domain verification status
  const {
    data: fetchedDomainVerification,
    refetch: refetchDomainStatus,
    loading,
  } = useFetch(
    `http://localhost:3001/api/backoffice/${backofficeId}/domain`,
    { immediate: true, showToast: false }
  );

  // Update domain verification when fetched
  useEffect(() => {
    if (fetchedDomainVerification && typeof fetchedDomainVerification === 'object') {
      setDomainVerification(fetchedDomainVerification);
      
      // Show banner if domain is in pending or failed status
      if (
        fetchedDomainVerification.status === 'pending' ||
        fetchedDomainVerification.status === 'failed'
      ) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    }
  }, [fetchedDomainVerification]);

  const value = {
    domainVerification,
    setDomainVerification,
    showBanner,
    setShowBanner,
    refetchDomainStatus,
    loading,
  };

  return (
    <DomainVerificationContext.Provider value={value}>
      {children}
    </DomainVerificationContext.Provider>
  );
};

export const useDomainVerification = () => {
  const context = useContext(DomainVerificationContext);
  if (!context) {
    throw new Error('useDomainVerification must be used within DomainVerificationProvider');
  }
  return context;
};
