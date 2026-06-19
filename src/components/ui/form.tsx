"use client";

import * as React from "react";
import { Form as FormPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const Form = FormPrimitive.Root;
const FormField = FormPrimitive.Field;
const FormControl = FormPrimitive.Control;

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Label>) {
  return (
    <FormPrimitive.Label
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

function FormMessage({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Message>) {
  return (
    <FormPrimitive.Message
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  );
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };
