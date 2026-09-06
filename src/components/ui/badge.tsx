import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-[#e6e6e6] bg-[#f4ede4] text-[#1d1d1d]",
        secondary:
          "border-[#ebd6f7] bg-[#f9f0ff] text-[#4a154b]",
        aubergine:
          "border-transparent bg-[#4a154b] text-white",
        destructive:
          "border-[#fecaca] bg-[#fef2f2] text-[#cc4117]",
        outline:
          "text-[#1d1d1d] border-[#e6e6e6] bg-white",
        emerald:
          "border-[#a7f3d0] bg-[#ecfdf5] text-[#007a5a]",
        amber:
          "border-[#fde68a] bg-[#fef3c7] text-[#92400e]",
        blue:
          "border-[#d0e3f8] bg-[#eef5fc] text-[#1264a3]",
        purple:
          "border-[#ebd6f7] bg-[#f9f0ff] text-[#4a154b]",
        eyebrow:
          "border-transparent bg-[#f4ede4] text-[#1d1d1d] uppercase tracking-[0.96px] text-[11px] font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
