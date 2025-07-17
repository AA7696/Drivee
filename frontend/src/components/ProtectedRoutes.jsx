// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("You must be logged in to access this page.");
      setRedirect(true);
    }
  }, [loading, user]);

  if (loading) return <p>Loading...</p>;

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
