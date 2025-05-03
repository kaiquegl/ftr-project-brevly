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
} & React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

export default function Button({ size, variant, asChild, className, type = "button", ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp type={type} className={cn(buttonVariants({ size, variant, className }))} {...props} />;
}
