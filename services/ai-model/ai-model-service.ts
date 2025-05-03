import { createAxiosClient } from "@/providers/axiosClient";

export const aiModelService = {
  async askAI(params: { message: string }, token?: string) {
    const { message } = params;

    const response = await createAxiosClient(
      "application/json",
      token,
      "json"
    ).post(`/ai-model/ask-ai`, { message });

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data;
  },
};
