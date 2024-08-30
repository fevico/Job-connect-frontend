import React from "react";
import { Navigate } from "react-router-dom";
import useSession from "./useSession";

// PrivateRoute to protect routes for authenticated users only
function PrivateRoute({ children }) {
  const { isSignedIn } = useSession();

  return isSignedIn ? children : <Navigate to="/login" />;
}

// AuthRoute to redirect authenticated users away from auth pages
function AuthRoute({ children }) {
  const { isSignedIn } = useSession();

  return isSignedIn ? <Navigate to="/" /> : children;
}

export { PrivateRoute, AuthRoute };
