import { useEffect, useState } from "react";
import type { ProjectRead } from "../types/api";
import { getProjects } from "../types/api";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectRead[]>([]);

  useEffect(() => {
    getProjects().then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <h1 className="bg-cyan-700">{p.id}</h1>
            <h3>{p.title}</h3>
            {p.description && <p>{p.description}</p>}
            <ul>
              {(p.tech_stack ?? []).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
