import { useSearchParams, Link } from "react-router-dom";
import { Check, Receipt, ArrowRight } from "lucide-react";
import { useGetOrderDetails } from "@/features/orders/hooks/useOrders";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import ConfirmedPaymentSkeleton from "../components/ConfirmedPaymentSkeleton";

const ConfirmedPayment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("ref");

  const {
    data: order,
    isError,
    isLoading,
  } = useGetOrderDetails(Number(orderId));
  if (isLoading) {
    return <ConfirmedPaymentSkeleton />;
  }
  if (isError || !order) {
    return (
      <AppError
        message="Oops! Something went wrong."
        to="/library/orders"
        link="See My Orders"
      />
    );
  }

  const orderNumber = `#ORD-${order.id}`;
  const total = formatCurrency(order.total);

  return (
    // <main className="main-container">
    //   <div className="page-container py-0">
    <div className="relative flex-1 flex-center pt-12 sm:pt-14  lg:pt-16 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/5 blur-[150px]" />
      </div>

      <section className="relative w-full max-w-2xl col-center py-4 text-center animate-[fadeInUp_0.8s_ease-out_forwards] space-y-4 sm:space-y-6">
        <div className=" relative group">
          <div className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700" />
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-surface-container-highest flex items-center justify-center shadow-soft border border-outline-variant/15">
            <div className="w-8 h-8 sm:w-12 sm:h-12 gradient-primary rounded-full flex items-center justify-center">
              <Check className="w-7 h-7 text-on-primary" strokeWidth={3} />
            </div>
          </div>
        </div>
        <div className="text-center col-center">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-on-surface">
            Order Confirmed!
          </h1>
          <p className="text-on-surface-variant text-xs sm:text-base  font-medium max-w-3/4 sm:max-w-md">
            Your order has been placed successfully. A confirmation email has
            been sent to your inbox.
          </p>
        </div>

        <div className="w-auto glass-panel rounded-2xl p-8 sm:px-16 shadow-soft flex  gap-4  sm:gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

          <div className=" z-10">
            <span className="block text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2">
              Order Number
            </span>
            <span className="block text-2xl font-bold tracking-tight text-on-surface">
              {orderNumber || (
                <span className="text-outline/60">Loading...</span>
              )}
            </span>
          </div>

          <div className="block w-px h-16 bg-outline-variant/15 z-10" />
          <div className=" z-10">
            <span className="block text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2">
              Total Processed
            </span>
            <span className="total-price-span text-3xl sm:text-4xl">
              {total ? (
                `${total}`
              ) : (
                <span className="text-outline/60">Loading...</span>
              )}
              {total && <span className="currency-span"> EGP</span>}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link
            to="/library/orders"
            className="btn-primary font-bold tracking-wide w-auto"
          >
            <Receipt className="w-5 h-5" />
            View My Orders
          </Link>
          <Link to="/library" className="btn-secondary w-auto">
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
    //   </div>
    // </main>
  );
};

export default ConfirmedPayment;
