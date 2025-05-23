import { createAxiosServer } from "@/providers/axiosServerClient";
import { Form } from "@/types/types";

export const formService = {
  specificFormPage: async (params: {
    formId: string;
    index?: number;
    token?: string;
  }) => {
    const form = await createAxiosServer().get(`/form/${params.formId}`);

    if (form.status !== 200) {
      throw new Error("Failed to fetch form");
    }

    return form.data as Form;
  },
};
