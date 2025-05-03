import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("font-normal", {
  variants: {
    size: {
      xl: "font-bold text-2xl leading-8",
      lg: "font-bold text-lg leading-6",
      md: "font-semibold text-sm leading-4.5",
      sm: "text-xs leading-4",
      xs: "text-[0.625rem] leading-3.5 uppercase",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type TypographyTag = "p" | "h1" | "h2" | "h3" | "h4" | "span" | "label";

export type TypographyProps = {
  tag?: TypographyTag;
} & React.ComponentPropsWithoutRef<TypographyTag> &
  VariantProps<typeof typographyVariants>;

export default function Typography({ size, children, tag = "p", className, ...props }: TypographyProps) {
  const Tag = tag;

  return (
    <Tag className={cn(typographyVariants({ size, className }))} {...props}>
      {children}
    </Tag>
  );
}
