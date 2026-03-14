import createClient from "openapi-fetch";

import { getAuthToken } from "@/lib/auth";
import type { paths } from "./types";

export const api = createClient<paths>({
  baseUrl: "http://localhost:8000",
});

api.use({
  async onRequest({ request }) {
    const token = getAuthToken();

    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }

    return request;
  },
});
