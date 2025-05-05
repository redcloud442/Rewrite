import axios from "axios";

export const createAxiosClient = (
  contentType: string = "application/json",
  responseType: "json" | "blob" | "arraybuffer" = "json"
) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    responseType, // 👈 Allow caller to specify blob/arraybuffer/json
    headers: {
      "Content-Type": contentType,
    },
  });

  return instance;
};
