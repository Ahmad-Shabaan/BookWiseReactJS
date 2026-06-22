import { Navigate, Outlet } from "react-router-dom";
import Loading from "@/shared/components/common/Loading";
import useUser from "@/features/auth/hooks/useUser";


const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useUser();
  if (isLoading) return <Loading />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
