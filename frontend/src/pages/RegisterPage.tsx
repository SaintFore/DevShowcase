import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { signup } from "@/api/auth";
import {
  registerSchema,
  type RegisterInput,
  type RegisterOutput,
} from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "detail" in error) {
    const detail = (error as { detail?: unknown }).detail;
    if (typeof detail === "string") {
      return detail;
    }
  }

  return "注册失败，请稍后重试。";
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    const parsed = data as RegisterOutput;

    try {
      await signup({
        username: parsed.username,
        email: parsed.email,
        password: parsed.password,
      });

      setErrorMessage(null);
      await navigate("/login", { state: { registered: true } });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.2fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-accent/30 bg-surface p-6 shadow-xl sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Create Account</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            Start your Dev Showcase identity.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Register once to publish projects, manage contributors, and keep your portfolio
            workflow moving.
          </p>
          <div className="mt-7 flex gap-3">
            <Button asChild variant="outline">
              <Link to="/login">Already have account</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/">Back home</Link>
            </Button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          className="rounded-3xl border border-primary/25 bg-card p-6 shadow-xl sm:p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Field>
              <FieldLabel>Username</FieldLabel>
              <FieldContent>
                <Input
                  autoComplete="username"
                  placeholder="yourname"
                  disabled={isSubmitting}
                  {...register("username")}
                />
              </FieldContent>
              <FieldError errors={[errors.username]} />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  {...register("email")}
                />
              </FieldContent>
              <FieldError errors={[errors.email]} />
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="至少 6 位"
                  disabled={isSubmitting}
                  {...register("password")}
                />
              </FieldContent>
              <FieldError errors={[errors.password]} />
            </Field>

            {errorMessage ? (
              <p className="rounded-xl border border-destructive bg-card px-3 py-2 text-sm text-foreground">
                {errorMessage}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
