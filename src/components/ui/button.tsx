import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Dominant Primary Pill from DESIGN.md: Aubergine #4a154b with hover #611f69
        default:
          "bg-[#4a154b] text-white hover:bg-[#611f69] active:bg-[#481a54] shadow-sm",
        // Soft Lavender Pill from DESIGN.md: #f9f0ff with dark ink text
        secondary:
          "bg-[#f9f0ff] text-[#1d1d1d] hover:bg-[#ebd9f8] border border-[#ebd6f7]",
        // Outline Aubergine from DESIGN.md
        outline:
          "border-2 border-[#4a154b] bg-white text-[#4a154b] hover:bg-[#f9f0ff]",
        // Outline on Aubergine from DESIGN.md
        outlineAubergine:
          "border-2 border-white bg-transparent text-white hover:bg-white/10",
        destructive:
          "bg-[#fef2f2] text-[#cc4117] border border-[#fecaca] hover:bg-[#fee2e2]",
        ghost:
          "text-[#1d1d1d] hover:bg-[#f4ede4] hover:text-[#1d1d1d]",
        link:
          "text-[#1264a3] hover:text-[#3860be] underline-offset-4 hover:underline",
        amber:
          "bg-[#fef3c7] text-[#92400e] hover:bg-[#fde68a] border border-[#fde68a]",
        glow:
          "bg-[#4a154b] text-white hover:bg-[#611f69] shadow-elevation-1",
      },
      size: {
        // Over-padded pill buttons per DESIGN.md: 28-30px horizontal padding
        default: "h-11 px-7 py-3 text-sm",
        sm: "h-9 px-5 py-2 text-xs",
        lg: "h-12 px-8 py-3.5 text-base",
        icon: "h-9 w-9 p-0 rounded-full",
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
