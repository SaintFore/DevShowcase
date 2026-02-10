import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { ProjectRead } from "../api/projects";

type Props = {
  projects: ProjectRead[];
};

export default function Projects({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className="py-16 text-center text-text-muted">No projects yet.</div>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="
        grid gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </motion.section>
  );
}
