"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormResponse, Section } from "@/types/types";
import { useFormContext } from "react-hook-form";
import { DynamicFormField } from "./ReusableField";

type SectionRendererProps = {
  section: Section;
  sectionIndex: number;
};

export const DynamicFormSection = ({
  section,
  sectionIndex,
}: SectionRendererProps) => {
  const form = useFormContext<FormResponse>();

  return (
    <div className="space-y-4 border rounded-md p-4">
      <h3 className="text-lg font-semibold">{section.section_name}</h3>

      {section.fields.map((field, index) => {
        const label = (
          <>
            {field.field_label}
            {field.field_required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </>
        );

        return (
          <FormField
            key={field.field_id}
            control={form.control}
            name={`sections.${sectionIndex}.fields.${index}.field_response`}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <DynamicFormField field={field} formField={formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </div>
  );
};
