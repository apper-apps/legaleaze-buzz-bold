import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-white rounded-xl shadow-card border border-gray-100",
    document: "bg-white rounded-xl shadow-document border border-gray-100",
    glass: "glass rounded-xl border border-white/20",
    elevated: "bg-white rounded-xl shadow-lg border border-gray-100"
  };

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;