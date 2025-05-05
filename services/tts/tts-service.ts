import { createAxiosClient } from "@/providers/axiosClient";

export const ttsService = {
  async postTTS(params: { file: File; voice: string; language: string }) {
    const { file, voice, language } = params;
    const formData = new FormData();
    formData.append("file", file);

    if (voice) formData.append("voice", voice);
    if (language) formData.append("language", language);

    const response = await createAxiosClient(
      "multipart/form-data",
      "json"
    ).post(`/tts/file`, formData);

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data;
  },
};
