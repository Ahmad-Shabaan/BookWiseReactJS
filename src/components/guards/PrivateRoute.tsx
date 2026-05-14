import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
/**
 * Guard for routes that require the user to be authenticated.
 * Redirects to /login if there's no valid token in the Redux store.
 */
const PrivateRoute = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
//   const loading = useSelector(selectAuthLoading);

//   if (loading) {
//     return <div>Loading...</div>; // Provide a meaningful loading state component if desired
//   }

  // If authenticated, render the nested components using Outlet.
  // Otherwise, redirect to the login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
