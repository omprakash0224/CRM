import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-[#8e8e8e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine focus-visible:border-aubergine disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
