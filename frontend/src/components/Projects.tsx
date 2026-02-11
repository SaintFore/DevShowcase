import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { ProjectRead } from "@/api/projects";

import { Badge } from "@/components/ui/badge";

type Props = {
  projects: ProjectRead[];
  onRefresh: () => Promise<void>;
};

export default function Projects({ projects, onRefresh }: Props) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-16 text-center text-muted-foreground">
        No projects yet. Add your first one on the right.
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold sm:text-2xl">Project Gallery</h2>

        <Badge variant="secondary">{projects.length} items</Badge>
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
