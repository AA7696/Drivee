// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) return <p>Loading...</p>;
    if (!user) {
        toast.error("You must be logged in to access this page.");
        return <Navigate to="/" replace />;
    }

  return children;
};

export default ProtectedRoute;
