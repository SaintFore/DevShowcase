import Projects from "./components/Projects";
import ProjectForm from "./components/ProjectForm";
import { useState, useEffect } from "react";
import type { ProjectRead } from "./types/api";
import { getProjects } from "./types/api";

export default function App() {
  const [projects, setProjects] = useState<ProjectRead[]>([]);
  const fetchProjects = () => {
    getProjects().then((res) => {
      setProjects(res.data);
    });
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Projects projects={projects} />
      <ProjectForm onSuccess={fetchProjects} />
    </>
  );
}
