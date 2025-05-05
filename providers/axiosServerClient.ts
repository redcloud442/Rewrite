import axios from "axios";

export const createAxiosServer = (
  responseType: "json" | "blob" | "arraybuffer" = "json",
  token?: string
) => {
  const instance = axios.create({
    baseURL: `${process.env.API_URL}/api/v1`,
    responseType,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};
