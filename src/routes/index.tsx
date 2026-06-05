import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import PrivateRoute from "../components/guards/PrivateRoute";
import PublicOnlyRoute from "../components/guards/PublicOnlyRoute";
import AuthLayout from "@/features/auth/layouts/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import AppLayout from "@/shared/components/layout/AppLayout";
import LandingPage from "@/landing";
import ForgetPassword from "@/features/auth/pages/ForgetPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import NotFound from "@/shared/pages/NotFound";
// import NotFound from "@/features/errors/pages/NotFound";

const Profile = lazy(() => import("@/features/profile/pages/Profile"));
const Books = lazy(() => import("@/features/books/pages/BooksPage"));
const BookDetails = lazy(
  () => import("@/features/books/pages/BookDetailsPage"),
);
const Wishlist = lazy(() => import("@/features/wishlist/pages/WishlistPage"));

const Basket = lazy(() => import("@/features/basket/pages/BasketPage"));

const Checkout = lazy(() => import("@/features/checkout/pages/Checkout"));
const PaymentResult = lazy(
  () => import("@/features/checkout/pages/PaymentResult"),
);
const ConfirmedPayment = lazy(
  () => import("@/features/checkout/pages/ConfirmedPayment"),
);

const Orders = lazy(() => import("@/features/orders/pages/Orders"));
const OrderDetails = lazy(() => import("@/features/orders/pages/OrderDetails"));

/**
 * Full React Router v6 Configuration
 */
const router = createBrowserRouter([
  {
    element: <LandingPage />,
    path: "/",
  },
  {
    // PublicOnlyRoute: Logged in users trying to access login will be redirected to /dashboard
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <AuthLayout />,
        children: [
          { index: true, element: <LoginPage /> },
        ],
      },
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
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
        path: "/library",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Books />,
          },
          {
            path: "/library/books/:id",
            element: <BookDetails />,
          },
          {
            path: "/library/wishlisted",
            element: <Wishlist />,
          },
          {
            path: "/library/basket",
            element: <Basket />,
          },
          {
            path: "/library/checkout",
            element: <Checkout />,
          },
          {
            path: "/library/payment-result",
            element: <PaymentResult />,
          },
          {
            path: "/library/confirmed-payment",
            element: <ConfirmedPayment />,
          },
          {
            path: "/library/orders",
            element: <Orders />,
          },
          {
            path: "/library/orders/:id",
            element: <OrderDetails />,
          },
        ],
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
