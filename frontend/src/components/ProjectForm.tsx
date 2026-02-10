import { useState } from "react";
import { createProject } from "../api/projects";

type Props = {
  onSuccess: () => void;
};

export default function ProjectForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await createProject({
      title,
      description,
      tech_stack: techStack.split(",").map((t) => t.trim()),
      github_url: githubUrl || null,
    });
    onSuccess();
    setTitle("");
    setDescription("");
    setTechStack("");
    setGithubUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mt-12 max-w-md
        rounded-2xl bg-surface p-6
        flex flex-col gap-4
      "
    >
      <h2 className="text-2xl font-bold text-text">Create New Project</h2>

      <input
        className="rounded bg-background p-2 text-text placeholder:text-text-faint"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="rounded bg-background p-2 text-text placeholder:text-text-faint"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="rounded bg-background p-2 text-text placeholder:text-text-faint"
        placeholder="Tech Stack (comma separated)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />

      <input
        className="rounded bg-background p-2 text-text placeholder:text-text-faint"
        placeholder="GitHub URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />

      <button
        type="submit"
        className="
          mt-2 rounded
          bg-accent p-2
          font-medium text-background
          hover:brightness-110
        "
      >
        Create Project
      </button>
    </form>
  );
}
