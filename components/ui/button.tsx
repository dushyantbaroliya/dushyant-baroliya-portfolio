import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium uppercase tracking-wider transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-tech-medium text-black hover:bg-tech-light",
        outline:
          "border border-slate-600 bg-transparent text-slate-100 hover:border-tech-light hover:text-tech-light",
        ghost: "text-slate-300 hover:text-tech-light",
        inverse: "bg-black text-tech-light hover:bg-tech-deepest",
      },
      size: {
        default: "h-11 px-6 text-xs sm:text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
