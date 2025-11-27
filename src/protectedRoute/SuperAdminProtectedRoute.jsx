import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const SuperAdminProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage first
        const authStatus = localStorage.getItem("isAuthenticated");
        const superadminId = localStorage.getItem("superadminId");

        console.log("🔍 SuperAdminProtectedRoute - Auth Check:", {
          isAuthenticated: authStatus,
          superadminId: superadminId,
        });

        if (authStatus === "true" && superadminId) {
          // Trust localStorage - user just logged in
          // Cookie verification can happen on background
          console.log("✅ Auth data found in localStorage");
          setIsAuthenticated(true);

          // Optionally verify with backend in background
          try {
            const verifyRes = await fetch("http://localhost:3001/api/superadmin/verify", {
              method: "GET",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            });

            if (verifyRes.ok) {
              const verifyData = await verifyRes.json();
              if (!verifyData.success) {
                console.log("⚠️ Backend verification failed - clearing auth");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("superadminId");
                localStorage.removeItem("superadmin_user");
                localStorage.removeItem("userRole");
                setIsAuthenticated(false);
              }
            }
          } catch (fetchError) {
            console.warn("⚠️ Background verification error:", fetchError.message);
            // Keep user authenticated - they have valid localStorage
          }
        } else {
          console.log("❌ No auth data in localStorage");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("❌ Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
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
  return <Navigate to="/superadmin/login" replace />;
};

export default SuperAdminProtectedRoute;
