import type { components } from "../api/types";
import axios from "axios";

export type ProjectRead = components["schemas"]["ProjectRead"];

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
});

export function getProjects() {
  return api.get<ProjectRead[]>("/api/projects");
}
