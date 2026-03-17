import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Projects from "@/components/Projects";
import ProjectForm from "@/components/ProjectForm";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading, isError } = useProjects();

  const refreshProjects = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["projects"] });
  }, [queryClient]);

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            rounded-3xl border border-accent/25 bg-surface p-6 shadow-xl
            backdrop-blur-sm sm:p-8
          "
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Dev Showcase
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-text sm:text-5xl">
            Build. Ship. Show your craft.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
            A clean space to present your projects with title, stack, and links.
            Keep your portfolio alive while iterating fast.
          </p>
          <div className="mt-6 inline-flex rounded-full bg-accent/15 px-4 py-2 text-sm text-text">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </div>
        </motion.header>

        {isLoading ? (
          <p className="mt-4 rounded-2xl border border-accent/30 bg-surface px-4 py-3 text-sm text-text">
            Loading projects...
          </p>
        ) : null}

        {isError ? (
          <p className="mt-4 rounded-2xl border border-accent/30 bg-surface px-4 py-3 text-sm text-text">
            Failed to load projects.
          </p>
        ) : null}

        <section className="mt-8 grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
          <div
            className="
              rounded-3xl border border-accent/20 bg-surface p-5 shadow-lg
              backdrop-blur-sm sm:p-6
            "
          >
            <Projects projects={projects} onRefresh={refreshProjects} />
          </div>

          <div
            className="
              rounded-3xl border border-secondary/25 bg-surface p-4 shadow-lg
              backdrop-blur-sm sm:p-5
            "
          >
            <ProjectForm onSuccess={refreshProjects} />
          </div>
        </section>
      </div>
    </main>
  );
}
