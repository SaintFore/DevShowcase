import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { ProjectRead } from "../api/projects";

type Props = {
  projects: ProjectRead[];
  onRefresh: () => Promise<void>;
};

export default function Projects({ projects, onRefresh }: Props) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-accent/30 py-16 text-center text-text-muted">
        No projects yet. Add your first one on the right.
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold text-text sm:text-2xl">
          Project Gallery
        </h2>
        <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs text-text-muted">
          {projects.length} items
        </span>
      </div>

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
          grid gap-5
          md:grid-cols-2
          2xl:grid-cols-3
        "
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onSuccess={onRefresh} />
        ))}
      </motion.section>
    </>
  );
}
