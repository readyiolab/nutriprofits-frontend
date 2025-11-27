import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Protected Route Component for BackOffice
 * Checks if user is authenticated via localStorage and cookie
 * If not authenticated, redirects to login page
 */
const BackofficeProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      const backofficeId = localStorage.getItem("backofficeId");

      console.log("🔍 BackofficeProtectedRoute - Auth Check:", {
        isAuthenticated: authStatus,
        backofficeId: backofficeId,
      });

      if (authStatus === "true" && backofficeId) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If user is authenticated, render the protected routes
  if (isAuthenticated) {
    return <Outlet />;
  }

  // If user is not authenticated, redirect to login
  console.log("❌ User not authenticated - redirecting to login");
  return <Navigate to="/backoffice/login" replace />;
};

export default BackofficeProtectedRoute;