"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const base =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold text-sm transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]",
      outline:
        "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 active:scale-[0.97]",
      ghost:
        "text-violet-700 hover:bg-violet-50 active:bg-violet-100 active:scale-[0.97]",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          base,
          variants[variant],
          "px-5 py-3 transition-all duration-200 ease-out",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
