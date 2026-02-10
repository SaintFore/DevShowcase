import { z } from "zod";

export const projectFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "标题是必须的" })
    .max(100, { message: "标题太长" }),

  description: z.string().max(500, { message: "描述太长" }).default(""),

  techStack: z.string().default(""),

  githubUrl: z
    .string()
    .trim()
    .refine((val) => val === "" || /^https?:\/\/.+/.test(val), {
      message: "请输入有效的 GitHub 链接",
    })
    .default(""),
});

export type ProjectFormInput = z.input<typeof projectFormSchema>;
export type ProjectFormOutput = z.output<typeof projectFormSchema>;
