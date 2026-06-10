import OrderSkeleton from "../components/OrderSkeleton";
import { useGetOrderDetails } from "../hooks/useOrders";
import { useParams } from "react-router-dom";
import { Package } from "lucide-react";
import { formatDateFull } from "@/lib/utils/formatDate";
import SectionHeader from "@/shared/components/common/SectionHeader";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Aside from "@/shared/components/common/Aside";
import { useAsideAnimation } from "@/shared/animations/aside.animation";
import { STATUS_CONFIG } from "../constants/orders.constants";
import { useRef } from "react";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderDetails(Number(id));
  const sidebarRef = useRef<HTMLDivElement>(null);
  useAsideAnimation({ sectionRef: sidebarRef });

  if (isLoading) return <OrderSkeleton />;
  if (isError)
    return (
      <AppError
        message="Failed to load order. Please try again."
        link="Back to Home"
        to="/library"
      />
    );

  const config = STATUS_CONFIG[order!.orderStatus];
  const itemsCount = order!.orderItems.length;

  return (
    <main className="main-container">
      <div className="page-container">
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2"> */}
        <div className="w-full col-center lg:flex-row gap-6 lg:items-start">
          <div className="w-full flex-1">
            <SectionHeader to="/library/orders" link="Explore Orders">
              <>
                <div className="flex items-center gap-6 z-10">
                  <div className="icon-card">
                    <Package className="size-6 sm:size-8 text-primary-dim" />
                  </div>
                  <div>
                    <h1 className="section-header">Order #ORD-{order!.id}</h1>
                    <p className="text-sm text-on-surface-variant tracking-wide text-nowrap">
                      Placed on {formatDateFull(order!.orderDate)}
                    </p>
                  </div>
                </div>
                <div className="flex-center flex-wrap gap-4 z-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-highest border border-outline-variant/20 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
                    <span
                      className={`size-1.5 rounded-full ${config.dotColor} ${config.dotShadow}`}
                    />
                    {config.label}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-tertiary-container/20 border border-tertiary-container/30 text-tertiary-fixed text-xs font-semibold tracking-wider uppercase">
                    {order!.deliveryMethod}
                  </span>
                </div>
              </>
            </SectionHeader>
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-soft border border-outline-variant/10">
              <div className="flex justify-between items-center mb-4 pb-4 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-linear-to-r after:from-transparent after:via-outline-variant/30 after:to-transparent">
                <h2 className=" text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
                  Items in this order
                </h2>
                <span className="px-3 py-1 bg-surface-container rounded-md text-xs font-medium text-on-surface-variant tracking-widest uppercase border border-outline-variant/10">
                  {itemsCount} {itemsCount === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {order!.orderItems.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-3 sm:p-4 rounded-lg bg-surface-container/50 hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/15 group"
                  >
                    <div className="flex items-center gap-6 ">
                      <div className="size-24 rounded-lg overflow-hidden bg-surface-container-highest flex items-center justify-center shrink-0 shadow-soft-dim">
                        <img
                          src={item.pictureUrl ?? "/icons/user.png"}
                          alt={item.bookTitle}
                          className="size-24 object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                        <h3 className="line-clamp-1 w-full text-base sm:text-lg font-semibold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                          {item.bookTitle}
                        </h3>
                        <p className="text-sm text-on-surface-variant tracking-wide font-medium">
                          Unit Price:{" "}
                          <span className="text-on-surface">
                            {formatCurrency(item.price)}{" "}
                            <span className="currency-span">EGP</span>
                          </span>
                        </p>
                        <div className="mt-2 inline-flex items-center justify-center px-3 py-1 rounded bg-surface-container-highest border border-outline-variant/20 w-fit">
                          <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">
                            Qty:{" "}
                            <span className="text-on-surface">
                              {item.quantity}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right self-end sm:self-center">
                      <span className="text-base sm:text-lg font-bold tracking-tight text-on-surface">
                        {formatCurrency(item.price * item.quantity)}{" "}
                        <span className="currency-span">EGP</span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <aside
            className="w-full lg:max-w-sm flex flex-col gap-6"
            ref={sidebarRef}
          >
            <Aside asideHeader="Payment Summary">
              <>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium tracking-wide">
                      Subtotal
                    </span>
                    <span className="text-on-surface font-semibold">
                      {formatCurrency(order!.subtotal)}{" "}
                      <span className="currency-span">EGP</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium tracking-wide">
                      Shipping
                    </span>
                    <span className="text-on-surface font-semibold">
                      {formatCurrency(order!.deliveryCost)}{" "}
                      <span className="currency-span">EGP</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-outline-variant/15">
                  <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">
                    Total Paid
                  </span>
                  <span className="total-price-span">
                    {formatCurrency(order!.total)}{" "}
                    <span className="currency-span">EGP</span>
                  </span>
                </div>
              </>
            </Aside>
            <Aside asideHeader="Shipping Information">
              <>
                <div className="space-y-4">
                  <div className="info-field">
                    <p>Name</p>
                    <p>
                      {order!.shipToAddress.firstName}{" "}
                      {order!.shipToAddress.lastName}
                    </p>
                  </div>
                  <div className="info-field">
                    <p>Address</p>
                    <p>
                      {order!.shipToAddress.street}, {order!.shipToAddress.city}
                      , {order!.shipToAddress.state},{" "}
                      {order!.shipToAddress.country}
                    </p>
                  </div>
                  <div className="info-field">
                    <p>Contact</p>
                    <p>{order!.buyerEmail}</p>
                  </div>
                </div>
              </>
            </Aside>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
