import { api } from "./client";
import type { components } from "./types";

export type ProjectRead = components["schemas"]["ProjectRead"];
export type ProjectCreate = components["schemas"]["ProjectCreate"];
export type ProjectUpdate = components["schemas"]["ProjectUpdate"];

export async function getProject(projectId: number) {
  const { data, error } = await api.GET("/api/projects/{project_id}", {
    params: {
      path: { project_id: projectId },
    },
  });
  if (error) throw error;
  return data;
}

export async function getProjects() {
  const { data, error } = await api.GET("/api/projects");
  if (error) throw error;

  return data ?? [];
}

export async function createProject(project: ProjectCreate) {
  const { data, error } = await api.POST("/api/projects", {
    body: project,
  });
  if (error) throw error;
  return data;
}

export async function updateProject(projectId: number, project: ProjectUpdate) {
  const { data, error } = await api.PATCH("/api/projects/{project_id}", {
    params: {
      path: { project_id: projectId },
    },
    body: project,
  });
  if (error) throw error;
  return data;
}

export async function deleteProject(projectId: number) {
  const { error } = await api.DELETE("/api/projects/{project_id}", {
    params: {
      path: { project_id: projectId },
    },
  });
  if (error) throw error;
}
