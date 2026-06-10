// import { USER_QUERY_KEY } from "@/features/auth/constants/auth.constants";
// import { useAppSelector } from "@/store/hooks";
// import { useQueryClient } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "@/features/auth/hooks/useAuth";
import Loading from "@/shared/components/common/Loading";
import useUser from "@/features/auth/hooks/useUser";
// import { useAppDispatch } from "@/store/hooks";
// import { setUser } from "@/features/auth/store/authSlice";
// import { useEffect } from "react";
// import useGetMe from "@/features/auth/hooks/useMe";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) return <Loading />;

  // If authenticated, render the nested components using Outlet.
  // Otherwise, redirect to the login page.
  // Navigate This is a component.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
