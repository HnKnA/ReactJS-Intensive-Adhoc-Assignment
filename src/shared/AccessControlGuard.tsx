import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { AuthenticatedContext, mockUsers } from "../shared/Authenticated";
import { toast } from "react-toastify";

export function AccessControlGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { name } = useParams<{ name: string }>();
  const { user } = useContext(AuthenticatedContext);
  const { pathname } = useLocation();

  // Track whether we need to redirect and where
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    /**
     * Helper to show a toast and delay the navigation by ms second.
     */
    const delayRedirect = (path: string, message: string) => {
      toast.error(message);
      setRedirectPath(path);
      setTimeout(() => {
        setShouldRedirect(true);
      }, 0);
    };

    // 1. If no user is logged in
    if (!user) {
      delayRedirect("/", "You must log in to access this page.");
      return;
    }

    // 2. Restrict access for non-officers trying to access other users' pages
    if (user.role !== "officer" && user.name !== name) {
      delayRedirect("/", "You do not have permission to access this page.");
      return;
    }

    // 3. Check if the user is valid
    const foundUser = mockUsers.find((u) => u.name === name);
    if (!foundUser) {
      delayRedirect("/", "User not found!");
      return;
    }
  }, [user, name, pathname]);

  // If we're scheduled to redirect, do so here
  if (shouldRedirect) {
    return <Navigate to={redirectPath} replace />;
  }

  // Otherwise, render the protected content
  return <>{children}</>;
}
