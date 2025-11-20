import React from "react";
import { Outlet,Navigate } from "react-router-dom";


const isAuthenticated = ()=>{
    const token  =localStorage.getItem("token");
    return !!token;
}

const BackofficeProtectedRoute = () => {

   return isAuthenticated() ? <Outlet/> : <Navigate to="/backoffice/login"/>;
}


export default BackofficeProtectedRoute;