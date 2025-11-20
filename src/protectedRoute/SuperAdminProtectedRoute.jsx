import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
   const token = localStorage.getItem("superadmin_token");
  return !!token;
};

const SuperAdminProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/superadmin/login" replace />;
};

export default SuperAdminProtectedRoute;
