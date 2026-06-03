import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

/**
 * Guard for routes that should ONLY be accessed by unauthenticated users (like login).
 * Redirects authenticated users away to their dashboard.
 */
const PublicOnlyRoute = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
//   const loading = useSelector(selectAuthLoading);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  // If already authenticated, they don't need to see the public only pages.
  // Send them to their dashboard or home.
  return isAuthenticated ? <Navigate to="/library" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
