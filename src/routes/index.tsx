import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/guards/PrivateRoute";
import PublicOnlyRoute from "../components/guards/PublicOnlyRoute";
// import RoleRoute from '../components/guards/RoleRoute';
import Profile from "@/features/profile/pages/Profile";
import NotFound from "@/features/errors/pages/NotFound";
import LoginPage from "@/features/auth/pages/LoginPage";
import BooksListPage from "@/features/books/pages/BooksListPage";
import App from "@/App";
import AuthLayout from "@/features/auth/layouts/AuthLayout";
import SignupPage from "@/features/auth/pages/SignupPage";

/**
 * Full React Router v6 Configuration
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Public Home Landing Page
  },
  {
    // PublicOnlyRoute: Logged in users trying to access login will be redirected to /dashboard
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <AuthLayout />,
        children: [
          {index: true, element: <LoginPage /> },
          // { path: "register", element: <SignupPage /> },
        ],
      },
      {
        path: "/register",
        element: <SignupPage />,
      },
    ],
  },
  {
    // PrivateRoute: Unauthenticated users will be redirected to /login
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <BooksListPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      //   {
      //     // RoleRoute for Admin only
      //     element: <RoleRoute roles={['admin']} />,
      //     children: [
      //       {
      //         path: '/admin',
      //         element: <AdminPanel />,
      //       },
      //       {
      //         path: '/admin/users',
      //         element: <UserManagement />,
      //       },
      //     ]
      //   },
      //   {
      //     // RoleRoute for Sub-Admin or Admin
      //     element: <RoleRoute roles={['sub-admin', 'admin']} />,
      //     children: [
      //       {
      //         path: '/sub-admin',
      //         element: <SubAdminPanel />,
      //       }
      //     ]
      //   }
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Catch-all 404
  },
]);

export default router;
