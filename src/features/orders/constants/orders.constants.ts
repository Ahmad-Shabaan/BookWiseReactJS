import type { OrderStatus } from "../types";

export const ORDERS_PAGE_SIZE = 12;
export const ORDERS_STALE_TIME = 60_000;
export const ORDERS_GC_TIME = 300_000;


export const ORDERS_QUERY_KEYS = {
  all: () => ["orders"] as const,
  details: (id: number) => ["orders", "details", id] as const,
};



export const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; dotColor: string; dotShadow: string }
> = {
  Pending: {
    label: "Pending",
    dotColor: "bg-secondary-dim",
    dotShadow: "shadow-[0_0_8px_rgba(156,72,234,0.6)]",
  },
  Processing: {
    label: "Processing",
    dotColor: "bg-tertiary",
    dotShadow: "shadow-[0_0_8px_rgba(105,156,255,0.6)]",
  },
  PaymentReceived: {
    label: "Paid",
    dotColor: "bg-emerald-400",
    dotShadow: "shadow-[0_0_8px_rgba(52,211,153,0.6)]",
  },
  Shipped: {
    label: "Shipped",
    dotColor: "bg-primary",
    dotShadow: "shadow-[0_0_8px_rgba(163,166,255,0.6)]",
  },
  Delivered: {
    label: "Delivered",
    dotColor: "bg-emerald-400",
    dotShadow: "shadow-[0_0_8px_rgba(52,211,153,0.6)]",
  },
  PaymentFailed: {
    label: "Failed",
    dotColor: "bg-error-dim",
    dotShadow: "shadow-[0_0_8px_rgba(215,51,87,0.6)]",
  },
  Cancelled: {
    label: "Cancelled",
    dotColor: "bg-on-surface-variant",
    dotShadow: "shadow-[0_0_8px_rgba(167,170,186,0.4)]",
  },
};