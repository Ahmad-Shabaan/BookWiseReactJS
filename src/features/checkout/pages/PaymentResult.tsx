import { useEffect, useRef, useState } from "react";
import { getOrderByPaymobOrderId } from "../services/order.api";
import { useSearchParams, Navigate } from "react-router-dom";
import type { OrderResponse } from "../types";
import ProcessingPayment from "../components/ProcessingPayment";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const paymobOrderId = searchParams.get("order");
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );
  const [orderId, setOrderId] = useState<number | null>(null);
  const polled = useRef(false);

  useEffect(() => {
    if (!paymobOrderId || polled.current) return;
    polled.current = true;

    const poll = async () => {
      for (let attempt = 0; attempt < 10; attempt++) {
        const order: OrderResponse =
          await getOrderByPaymobOrderId(paymobOrderId);
        if (order.orderStatus === "PaymentReceived") {
          setOrderId(order.id);
          setStatus("success");
          localStorage.removeItem("basketId");
          return;
        }
        if (order.orderStatus === "PaymentFailed") {
          setStatus("failed");
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setStatus("failed");
    };

    poll();
  }, [paymobOrderId]);

  if (status === "success" && orderId) {
    return (
      <Navigate to={`/library/confirmed-payment?ref=${orderId}`} replace />
    );
  }

  if (status === "loading") return <ProcessingPayment />;

  return (
    <AppError
      message="We couldn't complete the processing. This might be a temporary issue. Call us."
      link="Back to Checkout"
      to="/library/checkout"
    />
  );
};

export default PaymentResult;
