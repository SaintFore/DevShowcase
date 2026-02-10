import { useState } from "react";
import { createProject } from "../api/projects";

type Props = {
  onSuccess: () => Promise<void>;
};

export default function ProjectForm({ onSuccess }: Props) {
  console.log("Rendering一次");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await createProject({
        title: title.trim(),
        description: description.trim() || null,
        tech_stack: techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        github_url: githubUrl.trim() || null,
      });

      await Promise.resolve(onSuccess());
      setTitle("");
      setDescription("");
      setTechStack("");
      setGithubUrl("");
    } catch {
      setErrorMessage("Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl bg-surface p-5
        flex flex-col gap-4
      "
    >
      <h2 className="text-2xl font-bold text-text">Create New Project</h2>
      <p className="-mt-1 text-sm text-text-muted">
        Fill in the details and publish to your showcase.
      </p>

      {errorMessage ? (
        <p className="rounded-xl border border-accent/30 bg-background px-3 py-2 text-sm text-text">
          {errorMessage}
        </p>
      ) : null}

      <label className="flex flex-col gap-1.5 text-sm text-text">
        Title
        <input
          className="rounded-xl border border-accent/20 bg-background px-3 py-2.5 text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/15 placeholder:text-text-faint"
          placeholder="Portfolio Website"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-text">
        Description
        <textarea
          className="min-h-24 rounded-xl border border-accent/20 bg-background px-3 py-2.5 text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/15 placeholder:text-text-faint"
          placeholder="A brief overview of your project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-text">
        Tech Stack
        <input
          className="rounded-xl border border-accent/20 bg-background px-3 py-2.5 text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/15 placeholder:text-text-faint"
          placeholder="React, TypeScript, FastAPI"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          disabled={isSubmitting}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-text">
        GitHub URL
        <input
          className="rounded-xl border border-accent/20 bg-background px-3 py-2.5 text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/15 placeholder:text-text-faint"
          placeholder="https://github.com/yourname/project"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          disabled={isSubmitting}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          mt-2 rounded-xl bg-accent px-4 py-2.5 font-semibold text-background transition
          hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70
        "
      >
        {isSubmitting ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
