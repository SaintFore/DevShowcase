import { api } from "./client";
import type { components } from "./types";

export type SignupPayload = components["schemas"]["UserCreate"];
export type SigninPayload = Pick<
  components["schemas"]["Body_signin_api_auth_signin_post"],
  "username" | "password"
>;

export type SigninResponse = {
  access_token: string;
  token_type: string;
};

export async function signup(payload: SignupPayload) {
  const { data, error } = await api.POST("/api/auth/signup", {
    body: payload,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signin(payload: SigninPayload): Promise<SigninResponse> {
  const { data, error } = await api.POST("/api/auth/signin", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: {
      username: payload.username,
      password: payload.password,
      scope: "",
    },
  });

  if (error) {
    throw error;
  }

  if (!data || typeof data !== "object") {
    throw new Error("Invalid signin response.");
  }

  const tokenData = data as Record<string, unknown>;

  if (typeof tokenData.access_token !== "string") {
    throw new Error("Signin response is missing access token.");
  }

  return {
    access_token: tokenData.access_token,
    token_type:
      typeof tokenData.token_type === "string"
        ? tokenData.token_type
        : "bearer",
  };
}
