import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { getAuthToken } from "@/lib/auth";

type PublicOnlyRouteProps = {
  children: ReactNode;
};

export default function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const token = getAuthToken();

  if (token) {
    return <Navigate to="/projects" replace />;
  }

  return <>{children}</>;
}
