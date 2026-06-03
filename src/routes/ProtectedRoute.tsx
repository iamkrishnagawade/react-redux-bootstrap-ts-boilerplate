import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type React from "react";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
