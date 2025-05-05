import { createAxiosClient } from "@/providers/axiosClient";

export const aiModelService = {
  async askAI(params: { message: string; selectedRecordingId: string | null }) {
    const { message, selectedRecordingId } = params;

    const response = await createAxiosClient("application/json", "json").post(
      `/ai-model/ask-ai`,
      { message, selectedRecordingId }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data;
  },
};
