import { useStore } from "@tanstack/react-form";

import Typography from "@/components/ui/typography";
import { useFieldContext } from "@/hooks/form-context";
import { cn } from "@/lib/utils";

import WarningIcon from "@/components/icons/warning";
import type { ZodError } from "zod";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
  prefix?: string;
};

export default function Input({ label, className, prefix, ...props }: InputProps) {
  const field = useFieldContext<string>();
  const error: ZodError = useStore(field.store, (state) => state.meta.errors)[0];

  return (
    <div data-error={!!error} className={cn("group flex flex-col gap-2", className)}>
      {label && (
        <Typography
          size="xs"
          tag="label"
          htmlFor={field.name}
          className="text-secondary-foreground transition-colors group-focus-within:text-primary group-data-[error=true]:text-destructive"
        >
          {label}
        </Typography>
      )}

      <div className="px-4 h-12 rounded-lg w-full border border-secondary-300 flex items-center">
        {prefix && (
          <Typography size="md" tag="span" className="text-secondary-400 font-normal">
            {prefix}
          </Typography>
        )}
        <input
          id={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className="text-sm flex-auto text-foreground transition-colors focus-within:border-primary outline-none group-data-[error=true]:border-destructive focus-within:group-data-[error=true]:border-destructive"
          {...props}
        />
      </div>

      {!!error && (
        <Typography tag="span" size="sm" className="flex items-center gap-2 text-secondary-foreground">
          <WarningIcon className="size-4 text-destructive" />
          {error.message}
        </Typography>
      )}
    </div>
  );
}
