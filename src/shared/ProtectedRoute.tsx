import React, { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthenticatedContext } from "../shared/Authenticated";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthenticatedContext);
  const location = useLocation();

  // If no user is logged in, navigate to "/auth/login"
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Restrict non-officers from accessing routes containing "/review"
  if (user.role !== "officer" && location.pathname.includes("/review")) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render whatever is passed in as children
  return <>{children}</>;
};

export default ProtectedRoute;
