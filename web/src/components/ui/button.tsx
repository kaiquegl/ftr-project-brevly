import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "border border-transparent flex transition-all duration-300 items-center cursor-pointer disabled:cursor-not-allowed justify-center disabled:opacity-50",
  {
    variants: {
      size: {
        lg: "h-12 w-full rounded-lg",
        sm: "h-8 gap-1.5 p-2 rounded-sm font-semibold text-xs",
        icon: "h-8 w-8 p-2 [&>svg]:size-4 rounded-sm",
      },
      variant: {
        default: "bg-primary hover:bg-primary-hover text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground not-disabled:hover:border-primary",
      },
    },
    defaultVariants: {
      size: "lg",
      variant: "default",
    },
  }
);

export type ButtonProps = {
  asChild?: boolean;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

export default function Button({
  size,
  variant,
  asChild,
  children,
  className,
  type = "button",
  isLoading = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp type={type} className={cn(buttonVariants({ size, variant, className }))} {...props}>
      {isLoading ? (
        <svg
          role="img"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading..."
          xmlns="http://www.w3.org/2000/svg"
          className={cn("h-5 w-5 animate-spin text-current", size === "sm" && "h-4 w-4", size === "lg" && "h-6 w-6")}
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-70"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      ) : (
        children
      )}
    </Comp>
  );
}
