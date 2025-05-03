import { createFormHook, useStore } from "@tanstack/react-form";
import { lazy } from "react";

import Button from "@/components/ui/button";
import { fieldContext, formContext, useFormContext } from "@/hooks/form-context";

const InputField = lazy(() => import("@/components/ui/input"));

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();

  const [isSubmitting, canSubmit, isDirty] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
    state.isDirty,
  ]);

  return (
    <Button type="submit" disabled={isSubmitting || !canSubmit || !isDirty}>
      {label}
    </Button>
  );
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: { InputField },
  formComponents: { SubscribeButton },
  fieldContext,
  formContext,
});
