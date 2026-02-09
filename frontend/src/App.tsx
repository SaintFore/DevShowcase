import Projects from "./components/Projects";
import ProjectForm from "./components/ProjectForm";
import { useState, useEffect } from "react";
import type { ProjectRead } from "./api/projects";
import { getProjects } from "./api/projects";

export default function App() {
  const [projects, setProjects] = useState<ProjectRead[]>([]);
  useEffect(() => {
    let ignore = false;
    async function fetchProjects() {
      try {
        const data = await getProjects();
        if (!ignore) {
          setProjects(data);
        }
      } catch (error) {
        if (!ignore) {
          alert(error);
        }
      }
    }
    fetchProjects();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Projects projects={projects} />
      <ProjectForm
        onSuccess={() => {
          getProjects().then(setProjects);
        }}
      />
    </>
  );
}
