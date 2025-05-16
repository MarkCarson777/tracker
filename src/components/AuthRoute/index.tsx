import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthRoute: React.FC<Props> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={children} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export { AuthRoute };
