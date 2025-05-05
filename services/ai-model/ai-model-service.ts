import { createAxiosClient } from "@/providers/axiosClient";

export const aiModelService = {
  async askAI(params: { message: string }) {
    const { message } = params;

    const response = await createAxiosClient("application/json", "json").post(
      `/ai-model/ask-ai`,
      { message }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data;
  },
};
