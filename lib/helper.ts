import { FormResponse, responseData } from "@/types/types";
import { ZodSchema } from "zod";

export const validateFields = <T>(params: {
  formData: T;
  schema: ZodSchema;
}) => {
  const validatedFields = params.schema.safeParse(params.formData);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  return validatedFields.data;
};

export const getClerkErrorMessage = (params: {
  err: unknown;
  defaultMessage: string;
}) => {
  const { err, defaultMessage } = params;
  if (
    typeof err === "object" &&
    err !== null &&
    "errors" in err &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.isArray((err as any).errors)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (err as any).errors[0]?.message || defaultMessage;
  }
  return defaultMessage;
};

export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const submitDynamicForm = (params: {
  formData: FormResponse;
  userId: string | null;
}) => {
  const { formData, userId } = params;

  const result: {
    fields: {
      field_id: string;
      response_user_id: string;
      response_value: string;
    }[];
  }[] = [];

  formData.sections.forEach((section) => {
    const fields = section.fields.map((field) => {
      if (field.field_required && !field.field_response) {
        throw new Error(
          `Missing required field response for "${field.field_label}" in section "${section.section_name}"`
        );
      }

      return {
        field_id: field.field_id,
        response_user_id: userId,
        response_value: field.field_response ?? null,
      };
    });
    result.push({
      fields: fields.map((field) => ({
        ...field,
        response_user_id: field.response_user_id ?? "",
      })),
    });
  });

  const resultFlat = result.flatMap((item) => item.fields);

  return resultFlat as responseData[];
};
