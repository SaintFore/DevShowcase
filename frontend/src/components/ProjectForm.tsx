import { useForm } from "react-hook-form";
import { createProject } from "../api/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema, ProjectFormValues } from "@/schemas/projectForm";

type Props = {
  onSuccess: () => Promise<void>;
};

export default function ProjectForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      techStack: "",
      githubUrl: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    await createProject({
      title: data.title.trim(),
      description: data.description.trim() || null,
      tech_stack: data.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github_url: data.githubUrl.trim() || null,
    });

    await onSuccess();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-surface p-5 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-text">Create New Project</h2>
      <p className="-mt-1 text-sm text-text-muted">
        Fill in the details and publish to your showcase.
      </p>

      <label className="flex flex-col gap-1.5 text-sm text-text">
        Title
        <input
          {...register("title")}
          className="rounded-xl border border-accent/20 bg-background px-3 py-2.5 text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
          placeholder="Portfolio Website"
          disabled={isSubmitting}
        />
        {errors.title && (
          <span className="mt-1 text-xs text-red-500">
            {errors.title.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-text">
        Description
        <textarea
          {...register("description")}
          className="min-h-24 rounded-xl border border-accent/20 bg-background px-3 py-2.5 text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
          placeholder="A brief overview of your project"
          disabled={isSubmitting}
        />
        {errors.description && (
          <span className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-text">
        Tech Stack
        <input
          {...register("techStack")}
          className="rounded-xl border border-accent/20 bg-background px-3 py-2.5 text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
          placeholder="React, TypeScript, FastAPI"
          disabled={isSubmitting}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-text">
        GitHub URL
        <input
          {...register("githubUrl")}
          className="rounded-xl border border-accent/20 bg-background px-3 py-2.5 text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
          placeholder="https://github.com/yourname/project"
          disabled={isSubmitting}
        />
        {errors.githubUrl && (
          <span className="mt-1 text-xs text-red-500">
            {errors.githubUrl.message}
          </span>
        )}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-xl bg-accent px-4 py-2.5 font-semibold text-background transition disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
