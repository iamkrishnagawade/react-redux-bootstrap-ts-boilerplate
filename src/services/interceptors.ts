import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { storage } from "./storage";

export const setupInterceptors = (api: AxiosInstance): AxiosInstance => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = storage.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;

      switch (status) {
        case 401:
          storage.clear();

          window.location.href = "/login";
          break;

        case 403:
          console.error("Forbidden access");
          break;

        case 500:
          console.error("Server error");
          break;

        default:
          break;
      }

      return Promise.reject(error);
    },
  );

  return api;
};
