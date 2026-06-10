// import { USER_QUERY_KEY } from "@/features/auth/constants/auth.constants";
import useUser from "@/features/auth/hooks/useUser";
// import useGetMe from "@/features/auth/hooks/useMe";
// import { useQueryClient } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Guard for routes that should ONLY be accessed by unauthenticated users (like login).
 * Redirects authenticated users away to  library.
 */
const PublicOnlyRoute = () => {
  // const me = useQueryClient().getQueryData(USER_QUERY_KEY);
  // const { data: me, isLoading } = useGetMe();
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) return null;
  // If already authenticated, they don't need to see the public only pages.
  // Send to home.
  return isAuthenticated ? <Navigate to="/library" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
