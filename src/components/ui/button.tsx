import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-[#0B0C10] shadow hover:shadow-lg hover:shadow-[#06B6D4]/50 font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[#1F2937] bg-[#1E293B] text-[#06B6D4] shadow-sm hover:bg-[#06B6D4]/10 hover:border-[#06B6D4] hover:shadow-[#06B6D4]/20",
        secondary:
          "bg-[#121417] text-[#E5E7EB] shadow-sm hover:bg-[#1E293B]",
        ghost: "hover:bg-[#06B6D4]/10 hover:text-[#22D3EE] hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]",
        link: "text-[#06B6D4] underline-offset-4 hover:underline hover:text-[#22D3EE]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
