"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DynamicFormProps, FormResponse } from "@/types/types";
import { FormProvider, useForm } from "react-hook-form";
import { DynamicFormSection } from "./ReusableSection";

export const DynamicForm = ({
  formId,
  sections,
  defaultValues = {},
  onSubmit,
}: DynamicFormProps) => {
  const form = useForm<FormResponse>({
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-bold">Form: {formId}</h2>

          {sections.map((section, index) => (
            <DynamicFormSection
              key={section.section_id}
              section={section}
              sectionIndex={index}
            />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </FormProvider>
  );
};
