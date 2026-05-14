import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-xl",
        "border border-outline-variant/20 bg-surface-container-highest",
        "text-sm text-on-surface placeholder:text-outline/60",
        "transition-all duration-200 outline-none",
        "focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/10",
        "aria-invalid:border-error/40 aria-invalid:ring-error/10",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
