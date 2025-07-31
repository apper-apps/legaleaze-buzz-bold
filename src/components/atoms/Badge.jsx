import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-primary-100 text-primary-800 border-primary-200",
    success: "bg-success-100 text-success-800 border-success-200",
    warning: "bg-warning-100 text-warning-800 border-warning-200",
    error: "bg-error-100 text-error-800 border-error-200",
    high: "bg-error-100 text-error-800 border-error-200",
    medium: "bg-warning-100 text-warning-800 border-warning-200",
    low: "bg-success-100 text-success-800 border-success-200"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;