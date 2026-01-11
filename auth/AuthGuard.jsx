import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  
  if (!token || !user) {
    return <Navigate to="/landingpage" replace />; // redirect to homepage or login
  }

  
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/landingpage" replace /> ;
  }

  
  return children;
};

export default AuthGuard;