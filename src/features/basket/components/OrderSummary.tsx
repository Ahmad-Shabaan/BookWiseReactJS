import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Lock } from "lucide-react";
import { memo, useRef, useState } from "react";
import type { BasketResponse } from "../types";
import { BASKET_QUERY_KEYS } from "../constants/basket.constants";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Aside from "@/shared/components/common/Aside";
import { updateBasketDeliveryMethod } from "../services/basket.api";
import { useGetDeliveryMethods } from "@/features/checkout/hooks/useDeliveryMethods";
import { toast } from "sonner";
import { useAsideAnimation } from "@/shared/animations/aside.animation";
const OrderSummary = memo(function OrderSummary({
  basket,
}: {
  basket: BasketResponse;
}) {
  const queryClient = useQueryClient();
  const [inLoadingUpdateDeliveryMethod, setInLoadingUpdateDeliveryMethod] =
    useState<boolean>(false);
  const { data: deliveryMethods, error: deliveryMethodError } =
    useGetDeliveryMethods();

  const sidebarRef = useRef<HTMLDivElement>(null);
  useAsideAnimation({ sectionRef: sidebarRef });
  
  const updateDeliveryMethod = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const deliveryMethodId = Number(e.target.value);
    const deliveryMethod = deliveryMethods?.find(
      (ele) => ele.id === deliveryMethodId,
    );
    if (deliveryMethod === undefined || basket === undefined) return;
    const updatedBasket: BasketResponse = {
      ...basket,
      deliveryMethodId,
      shippingPrice: deliveryMethod.cost,
    };
    try {
      setInLoadingUpdateDeliveryMethod(true);
      toast.info("Please wait while we update the delivery method...");
      await updateBasketDeliveryMethod(updatedBasket);
      await queryClient.invalidateQueries({
        queryKey: BASKET_QUERY_KEYS,
      });
    } catch {
      toast.error(
        "Oops! Something went wrong while updating the delivery method. Please try again in a minute.",
      );
    } finally {
      toast.success("Delivery method updated successfully.");
      setInLoadingUpdateDeliveryMethod(false);
    }
  };

  const itemCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const subtotal =
    basket?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;
  const shipping = basket?.shippingPrice ?? 0;
  const tax = subtotal * 0.0;
  const total = subtotal + shipping + tax;
  return (
    <aside className="col-span-1 flex flex-col gap-6" ref={sidebarRef}>
      <Aside asideHeader="Order Summary">
        <>
          {deliveryMethodError ? (
            <p className="text-error text-sm mb-2">
              Failed to load delivery methods. <br />
              Please refresh the page.
            </p>
          ) : (
            <div className="mb-8">
              <label className="text-sm text-on-surface-variant mb-2 block">
                Delivery Method
              </label>
              <select
                value={basket?.deliveryMethodId ?? ""}
                onChange={updateDeliveryMethod}
                className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg py-3 px-4 text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select delivery method
                </option>
                {deliveryMethods?.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.shortName} ({method.deliveryTime}) - $
                    {method.cost.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-on-surface-variant text-sm">
              <span>
                Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
              <span className="text-on-background font-medium">
                {inLoadingUpdateDeliveryMethod ? "000.00" : subtotal.toFixed(2)}{" "}
                <span className="currency-span text-xs">EGP</span>
              </span>
            </div>
            <div className="flex justify-between text-on-surface-variant text-sm">
              <span>Shipping</span>
              <span
                className={
                  shipping > 0
                    ? "text-on-background font-medium"
                    : "text-on-surface-variant font-medium"
                }
              >
                {shipping > 0
                  ? `${inLoadingUpdateDeliveryMethod ? "000.00" : shipping.toFixed(2)}`
                  : "Not calculated yet"}{" "}
                {shipping > 0 && (
                  <span className="currency-span text-xs"> EGP</span>
                )}
              </span>
            </div>
            <div className="flex justify-between text-on-surface-variant text-sm">
              <span>Estimated Tax</span>
              <span className="text-on-background font-medium">
                {tax.toFixed(2)}{" "}
                <span className="currency-span text-xs">EGP</span>
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-outline-variant/15 mb-8">
            <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">
              Total
            </span>
            <span className="total-price-span">
              {inLoadingUpdateDeliveryMethod ? "000.00" : formatCurrency(total)}{" "}
              <span className="currency-span">EGP</span>
            </span>
          </div>

          <Link
            to="/library/checkout"
            className="btn-primary lg:text-sm xl:text-base"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Lock className="w-3.5 h-3.5" />
            Secure encrypted checkout
          </div>
        </>
      </Aside>
    </aside>
  );
});

export default OrderSummary;
