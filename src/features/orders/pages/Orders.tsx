import { useGetOrders } from "../hooks/useOrders";
import { columns } from "../table/columns";
import { DataTable } from "../table/data-table";
import OrdersSkeleton from "../components/OrdersSkeleton";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";

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
        <section className="mb-8 mt-6">
          <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-tight text-on-surface">
            My Orders
          </h1>
          <p className="mt-1.5 text-sm text-on-surface-variant">
            View and track all your orders
          </p>
        </section>
        <DataTable columns={columns} data={data!} />
      </div>
    </main>
  );
}
