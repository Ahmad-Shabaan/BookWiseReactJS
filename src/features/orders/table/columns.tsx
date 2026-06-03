import { type ColumnDef } from "@tanstack/react-table";
import type { OrderResponse, OrderStatus } from "../types";
import { formatDate } from "@/lib/utils/formatDate";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

const statusConfig: Record<
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

export const columns: ColumnDef<OrderResponse>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="text-sm sm:text-[16px] font-extrabold text-on-surface">
        #ORD-{row.original.id}
      </span>
    ),
  },
  {
    accessorKey: "orderDate",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-on-surface-variant">
        {formatDate(row.original.orderDate)}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: () => (
      <div className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
        Total
      </div>
    ),
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = total.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return (
        <div className="font-bold text-[16px] text-on-surface">
          {formatted}{" "}
          <span className="text-on-surface-variant text-xs font-medium">
            EGP
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.orderStatus;
      const config = statusConfig[status];
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-highest border border-outline-variant/20 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
          <span
            className={`w-1.5 h-1.5 rounded-full ${config.dotColor} ${config.dotShadow}`}
          />
          {config.label}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="text-center">
        Action
      </div>
    ),
    cell: ({row}) => (
      <div className="flex justify-end">
        <Link className="btn-secondary px-1 py-2 rounded-md duration-700"to={`/library/orders/${row.getValue("id")}`} >
          View Details
        </Link>
      </div>
    ),
  },
];
