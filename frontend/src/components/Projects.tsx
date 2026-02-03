import type { ProjectRead } from "../types/api";

type Props = {
  projects: ProjectRead[];
};

export default function Projects({ projects }: Props) {
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
