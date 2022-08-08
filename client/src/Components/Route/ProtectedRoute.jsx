import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children, isAdmin, adminRoute }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin && adminRoute) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
