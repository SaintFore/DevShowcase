import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { signin } from "@/api/auth";
import { setAuthToken } from "@/lib/auth";
import { loginSchema, type LoginInput, type LoginOutput } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "detail" in error) {
    const detail = (error as { detail?: unknown }).detail;
    if (typeof detail === "string") {
      return detail;
    }
  }

  return "登录失败，请检查用户名和密码。";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    const parsed = data as LoginOutput;

    try {
      const result = await signin({
        username: parsed.username,
        password: parsed.password,
      });

      setAuthToken(result.access_token);
      setErrorMessage(null);
      await navigate("/projects");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const hasRegisterSuccess =
    typeof location.state === "object" &&
    location.state !== null &&
    "registered" in location.state;

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.25fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-accent/30 bg-surface p-6 shadow-xl sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary">
            Sign In
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            Welcome back to Dev Showcase.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Continue building and sharing your work. Sign in with your existing
            account to access projects and user management.
          </p>
          <div className="mt-7 flex gap-3">
            <Button asChild variant="outline">
              <Link to="/register">Create account</Link>
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
          {hasRegisterSuccess ? (
            <p className="mb-4 rounded-xl border border-secondary bg-secondary/35 px-3 py-2 text-sm">
              注册成功，请登录。
            </p>
          ) : null}

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
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="********"
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
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
