import { useGetOrders } from "../hooks/useOrders";
import { columns } from "../table/columns";
import { DataTable } from "../table/data-table";
import OrdersSkeleton from "../components/OrdersSkeleton";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Orders() {
  const { data, isLoading, isError } = useGetOrders();
  if (isLoading) {
    return <OrdersSkeleton />;
  }
  if (isError)
    return (
      <AppError
        message="Failed to load orders. Please try again."
        link="Back to Home"
        to="/library"
      />
    );

  return (
    <main className="main-container">
      <div className="page-container">
        <section className="mb-6 sm:mb-8 relative">
          <Link
            to={"/library"}
            className="absolute -top-6 sm:-top-8 -translate-y-1/2 right-0 z-1 inline-flex items-center gap-2 text-on-surface-variant hover:text-primary uppercase transition-colors group text-xs sm:text-sm font-medium"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            Explore more Books
          </Link>
          <h1 className="section-header">My Orders</h1>
          <p className="text-sm text-on-surface-variant">
            View and track all your orders
          </p>
        </section>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </main>
  );
}
