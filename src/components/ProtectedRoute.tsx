import { Navigate, Outlet } from "react-router";
import { useUser } from "../features/auth/hooks/useAuth";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../lib/api-client";
import { useLocation } from "react-router";

export default function ProtectedRoute() {
  const location = useLocation();
  const { isPending, isError, error } = useUser();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </main>
    );
  }

  if (isError) {
    const status = (error as AxiosError<ApiErrorResponse>)?.response?.status;

    if (status === 401) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <p className="text-red-600" role="alert">
          {error.message}
        </p>
      </main>
    );
  }
  return <Outlet />;
}
