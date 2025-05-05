import { createAxiosClient } from "@/providers/axiosClient";
import { responseData } from "@/types/types";

export const userService = {
  createUserOnboarding: async (params: { formData: responseData[] }) => {
    const response = await createAxiosClient("application/json").post(
      "/user/onboarding",
      params.formData
    );

    return response.data;
  },
};
