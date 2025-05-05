import { createAxiosClient } from "@/providers/axiosClient";
import { createAxiosServer } from "@/providers/axiosServerClient";
import { Recording } from "@/types/types";

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

    return {
      audio: response.data.audio,
      summary: response.data.summary,
    };
  },
  async getTTS(params: { token?: string }) {
    const { token } = params;

    const response = await createAxiosServer("json", token || "").get(
      `/tts/recordings`
    );

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data as Recording[];
  },

  async getPastMessages(params: {
    take: number;
    skip: number;
    recordingId: string;
  }) {
    const { take, skip, recordingId } = params;

    const response = await createAxiosClient("", "json").get(
      `/tts/messages?take=${take}&skip=${skip}&recordingId=${recordingId}`
    );

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data as { message: string; ai: boolean }[];
  },
};
