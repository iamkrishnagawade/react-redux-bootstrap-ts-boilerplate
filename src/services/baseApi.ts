import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storage } from "./storage";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = storage.getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "User"],
  endpoints: () => ({}),
});
