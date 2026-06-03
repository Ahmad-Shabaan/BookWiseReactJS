import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-lg px-4 py-3",
        "border-none bg-surface-container-highest",
        "text-sm text-on-surface placeholder:text-outline/60",
        "transition-shadow duration-200 outline-none",
        "focus:ring-2 focus:ring-primary/30",
        "aria-invalid:ring-2 aria-invalid:ring-error/30",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
