"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/types/types";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type FieldRendererProps = {
  field: Field;
  formField: {
    onChange?: (value: string) => void;
    value: string;
  };
};

export const DynamicFormField = ({ field, formField }: FieldRendererProps) => {
  switch (field.field_type) {
    case "text":
      return (
        <Input
          value={formField.value || ""}
          onChange={(e) => formField.onChange?.(e.target.value)}
          placeholder={field.field_label}
          required={field.field_required}
        />
      );

    case "select":
      return field.field_is_onboarding ? (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option) => {
            const isSelected = formField.value === option.option_label;
            return (
              <Button
                key={option.option_id}
                variant={isSelected ? "default" : "outline"}
                className="w-full max-w-xs"
                onClick={() => formField.onChange?.(option.option_label)}
                type="button"
              >
                {option.option_label}
              </Button>
            );
          })}
        </div>
      ) : (
        <Select onValueChange={formField.onChange} value={formField.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${field.field_label}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.option_id} value={option.option_label}>
                {option.option_label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "textarea":
      return (
        <Textarea
          value={formField.value}
          onChange={(e) => formField.onChange?.(e.target.value)}
          required={field.field_required}
        />
      );

    case "checkbox":

    default:
      return <div>Unsupported field type: {field.field_type}</div>;
  }
};
