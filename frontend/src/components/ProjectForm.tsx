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
    try {
      await createProject({
        title,
        description,
        tech_stack: techStack.split(",").map((tech) => tech.trim()),
        github_url: githubUrl || null,
      });
      onSuccess();
      setTitle("");
      setDescription("");
      setTechStack("");
      setGithubUrl("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
        <input
          className="border p-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border p-2"
          type="text"
          placeholder="Tech Stack (comma separated)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />
        <input
          className="border p-2"
          type="text"
          placeholder="GitHub URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Create Project
        </button>
      </form>
    </>
  );
}
