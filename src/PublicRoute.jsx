import { Navigate } from "react-router-dom";
import { useAuthStore } from "./feature/auth/store/useAuthStore";

export default function PublicRoute({ children }) {
  const { user, authLoading } = useAuthStore();

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}
