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
    <main className="main-container">
      <section className="page-container py-0">
        <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        <div className="relative min-h-dvh flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/5 blur-[150px]" />
          </div>

          <div className="relative w-full max-w-2xl flex flex-col items-center text-center animate-[fadeInUp_0.8s_ease-out_forwards] space-y-6">
            <div className="mb-10 relative group">
              <div className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700" />
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-surface-container-highest flex items-center justify-center shadow-soft border border-outline-variant/15">
                <div className="w-8 h-8 sm:w-12 sm:h-12 gradient-primary rounded-full flex items-center justify-center">
                  <Check className="w-7 h-7 text-on-primary" strokeWidth={3} />
                </div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-on-surface">
              Order Confirmed!
            </h1>
            <p className="text-on-surface-variant text-xs sm:text-base  font-medium max-w-md">
              Your order has been placed successfully. A confirmation email has
              been sent to your inbox.
            </p>

            <div className="w-full glass-panel rounded-2xl p-8  shadow-soft flex flex-col md:flex-row justify-around items-center gap-4 md:gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

              <div className="text-center z-10">
                <span className="block text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2">
                  Order Number
                </span>
                <span className="block text-2xl font-bold tracking-tight text-on-surface">
                  {orderNumber || (
                    <span className="text-outline/60">Loading...</span>
                  )}
                </span>
              </div>

              <div className="hidden md:block w-px h-16 bg-outline-variant/15 z-10" />
              <div className="block md:hidden w-16 h-px bg-outline-variant/15 z-10" />

              <div className="text-center z-10">
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

            <div className="w-full max-w-sm flex flex-col gap-4">
              <Link
                to="/library/orders"
                className="btn-primary font-bold tracking-wide"
              >
                <Receipt className="w-5 h-5" />
                View My Orders
              </Link>
              <Link to="/library" className="btn-secondary">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConfirmedPayment;
