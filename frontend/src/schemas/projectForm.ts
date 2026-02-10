import { z } from "zod";

export const projectFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "标题是必须的" })
    .max(100, { message: "标题太长" }),
  description: z.string().max(500, { message: "描述太长" }).optional(),
  techStack: z.string().optional(),
  githubUrl: z
    .string()
    .url({ message: "请输入有效的GitHub链接" })
    .optional()
    .or(z.literal("")),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
