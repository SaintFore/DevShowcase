import { motion } from "framer-motion";
import type { ProjectRead } from "../api/projects";

type Props = {
  project: ProjectRead;
};

export default function ProjectCard({ project }: Props) {
  const isDraft = !project.is_published;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="
        group relative overflow-hidden rounded-2xl
        border border-accent/30
        bg-surface
        p-5
        transition
      "
    >
      {/* glow */}
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100">
        <div className="h-full w-full bg-linear-to-r from-accent/40 to-transparent" />
      </div>

      <header className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-text">
            {project.title}
          </h3>

          {project.description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-muted">
              {project.description}
            </p>
          ) : (
            <p className="mt-2 text-sm text-text-faint">No description.</p>
          )}
        </div>

        <span
          className={[
            "rounded-full px-2.5 py-1 text-xs",
            isDraft
              ? "bg-draft text-text-muted"
              : "bg-published text-background",
          ].join(" ")}
        >
          {isDraft ? "Draft" : "Published"}
        </span>
      </header>

      {/* tech stack */}
      {!!project.tech_stack?.length && (
        <ul className="relative mt-4 flex flex-wrap gap-2">
          {project.tech_stack.slice(0, 8).map((t) => (
            <li
              key={t}
              className="
                rounded-full
                bg-background
                px-3 py-1
                text-xs text-text-muted
              "
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <footer className="relative mt-5 flex items-center justify-between">
        <span className="text-xs text-text-faint">ID: {project.id}</span>

        {project.github_url ? (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2
              rounded-xl
              bg-accent
              px-3 py-2
              text-sm text-background
              hover:brightness-110
            "
          >
            GitHub ↗
          </motion.a>
        ) : (
          <span className="text-sm text-text-faint">No GitHub</span>
        )}
      </footer>
    </motion.article>
  );
}
