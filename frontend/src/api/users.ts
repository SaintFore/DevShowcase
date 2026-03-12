import { api } from "./client";
import type { components } from "./types";

export type UserRead = components["schemas"]["UserRead"];
export type UserCreate = components["schemas"]["UserCreate"];
export type UserUpdate = components["schemas"]["UserUpdate"];

export async function getUser(userId: number) {
  const { data, error } = await api.GET("/api/users/{user_id}", {
    params: {
      path: { user_id: userId },
    },
  });
  if (error) throw error;
  return data;
}

export async function getUsers() {
  const { data, error } = await api.GET("/api/users");
  if (error) throw error;

  return data ?? [];
}

export async function createUser(user: UserCreate) {
  const { data, error } = await api.POST("/api/users", {
    body: user,
  });
  if (error) throw error;
  return data;
}

export async function updateUser(userId: number, user: UserUpdate) {
  const { data, error } = await api.PATCH("/api/users/{user_id}", {
    params: {
      path: { user_id: userId },
    },
    body: user,
  });
  if (error) throw error;
  return data;
}

export async function deleteUser(userId: number) {
  const { error } = await api.DELETE("/api/users/{user_id}", {
    params: {
      path: { user_id: userId },
    },
  });
  if (error) throw error;
}
