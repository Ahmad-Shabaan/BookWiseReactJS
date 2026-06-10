import { Navigate, Outlet } from 'react-router-dom';
// import { useAppSelector } from '@/store/hooks';

/**
 * Guard for routes that require a specific role to access.
 * Redirects to /dashboard or /unauthorized if the user's role does not match.
 * @param {Array<string>} roles - Array of allowed roles for the route.
 */
const RoleRoute = ({ roles } : { roles: string[] }) => {
    // const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    //   const userRole = useSelector(selectUserRole);
    const userRole = "admin"; // Mock role for testing, replace with actual selector in production
//   const loading = useSelector(selectAuthLoading);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  // If not authenticated, let PrivateRoute handle it or redirect to login.
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // Check if user's role is in the allowed roles array
  const hasRequiredRole = roles.includes(userRole);

  // If they have the role, render children via Outlet. 
  // Else redirect them to a generic dashboard or generic unauthorized handling.
  return hasRequiredRole ? <Outlet /> : <Navigate to="/library" replace />;
};

export default RoleRoute;
