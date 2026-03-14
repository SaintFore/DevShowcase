import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "用户名至少 3 个字符" })
    .max(50, { message: "用户名不能超过 50 个字符" }),
  email: z.string().trim().email({ message: "请输入有效邮箱" }),
  password: z.string().min(6, { message: "密码至少 6 个字符" }),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "请输入用户名" }),
  password: z.string().min(1, { message: "请输入密码" }),
});

export type RegisterInput = z.input<typeof registerSchema>;
export type RegisterOutput = z.output<typeof registerSchema>;
export type LoginInput = z.input<typeof loginSchema>;
export type LoginOutput = z.output<typeof loginSchema>;
