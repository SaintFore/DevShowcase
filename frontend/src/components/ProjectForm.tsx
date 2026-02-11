import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProject } from "@/api/projects";
import {
  projectFormSchema,
  type ProjectFormInput,
  type ProjectFormOutput,
} from "@/schemas/projectForm";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

type Props = {
  onSuccess: () => Promise<void>;
};

export default function ProjectForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      techStack: "",
      githubUrl: "",
    },
  });

  const onSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    const parsed = data as ProjectFormOutput;

    await createProject({
      title: parsed.title.trim(),
      description: parsed.description.trim() || null,
      tech_stack: parsed.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github_url: parsed.githubUrl.trim() || null,
    });

    await onSuccess();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-card p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Create New Project</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details and publish to your showcase.
        </p>
      </div>

      {/* Title */}
      <Field>
        <FieldLabel>Title</FieldLabel>
        <FieldContent>
          <Input
            placeholder="Portfolio Website"
            disabled={isSubmitting}
            {...register("title")}
          />
        </FieldContent>
        <FieldError errors={[errors.title]} />
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldContent>
          <Textarea
            placeholder="A brief overview of your project"
            disabled={isSubmitting}
            {...register("description")}
          />
        </FieldContent>
        <FieldError errors={[errors.description]} />
      </Field>

      {/* Tech Stack */}
      <Field>
        <FieldLabel>Tech Stack</FieldLabel>
        <FieldContent>
          <Input
            placeholder="React, TypeScript, FastAPI"
            disabled={isSubmitting}
            {...register("techStack")}
          />
        </FieldContent>
      </Field>

      {/* GitHub URL */}
      <Field>
        <FieldLabel>GitHub URL</FieldLabel>
        <FieldContent>
          <Input
            placeholder="https://github.com/yourname/project"
            disabled={isSubmitting}
            {...register("githubUrl")}
          />
        </FieldContent>
        <FieldError errors={[errors.githubUrl]} />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
