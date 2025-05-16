import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" replace />;
};

export { AuthRoute };
