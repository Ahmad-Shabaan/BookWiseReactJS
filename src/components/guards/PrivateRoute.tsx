import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  // If authenticated, render the nested components using Outlet.
  // Otherwise, redirect to the login page.
  // Navigate This is a component.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
