import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticatedContext } from "../shared/Authenticated";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useContext(AuthenticatedContext);

  // If no user is logged in, navigate to "/auth/login"
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Otherwise, render whatever is passed in as children
  return <>{children}</>;
};

export default ProtectedRoute;
