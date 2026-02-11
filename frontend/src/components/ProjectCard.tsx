import { motion } from "framer-motion";
import { useState } from "react";
import { deleteProject, type ProjectRead } from "@/api/projects";

import { Button } from "@/components/ui/button";

type Props = {
  project: ProjectRead;
  onSuccess: () => Promise<void>;
};

export default function ProjectCard({ project, onSuccess }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteProject(project.id);
      await onSuccess();
    } catch (error) {
      alert(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="
        group relative overflow-hidden rounded-2xl border bg-card
        p-5 shadow-sm transition
      "
    >
      {/* glow */}
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100">
        <div className="h-full w-full bg-gradient-to-r from-primary/30 to-transparent" />
      </div>

      <header className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold sm:text-xl">
            {project.title}
          </h3>

          {project.description ? (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground/70">
              No description.
            </p>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="shrink-0"
        >
          {isDeleting ? "..." : "Delete"}
        </Button>
      </header>

      {!!project.tech_stack?.length && (
        <ul className="relative mt-4 flex flex-wrap gap-2">
          {project.tech_stack.slice(0, 8).map((t) => (
            <li
              key={t}
              className="
                rounded-full border bg-muted px-3 py-1 text-xs
                text-muted-foreground
              "
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
