import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getUsers, type UserRead } from "@/api/users";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function UsersPage() {
  const [users, setUsers] = useState<UserRead[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getUsers();
      setUsers(data);
      setErrorMessage(null);
    } catch {
      setErrorMessage("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUsers();
  }, [refreshUsers]);

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.username.toLowerCase().includes(normalized) ||
        user.email.toLowerCase().includes(normalized)
      );
    });
  }, [query, users]);

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-3xl border border-accent/25 bg-surface p-6 shadow-xl sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary">User Directory</p>
              <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-5xl">
                Manage your contributor matrix.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Search by username or email and keep your team list visible in one place.
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {users.length} total user{users.length === 1 ? "" : "s"}
            </Badge>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search username or email"
              className="w-full max-w-sm"
            />
            <Button type="button" variant="outline" onClick={() => void refreshUsers()}>
              Refresh
            </Button>
          </div>
        </motion.header>

        {errorMessage ? (
          <div className="mt-5 rounded-3xl border border-destructive bg-card p-4 shadow-lg">
            <p className="text-sm text-foreground">{errorMessage}</p>
            <Button
              type="button"
              variant="secondary"
              className="mt-3"
              onClick={() => void refreshUsers()}
            >
              Retry
            </Button>
          </div>
        ) : null}

        {isLoading ? (
          <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="rounded-3xl border border-border bg-card p-5 shadow-lg"
              >
                <div className="h-4 w-24 animate-pulse rounded-sm bg-muted" />
                <div className="mt-4 h-7 w-3/4 animate-pulse rounded-sm bg-muted" />
                <div className="mt-2 h-4 w-full animate-pulse rounded-sm bg-muted" />
                <Separator className="my-4" />
                <div className="h-4 w-1/3 animate-pulse rounded-sm bg-muted" />
              </div>
            ))}
          </section>
        ) : null}

        {!isLoading && filteredUsers.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-dashed border-accent/40 bg-card px-6 py-14 text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-foreground">No users found</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {users.length === 0
                ? "No users are available yet."
                : "Try a different search keyword."}
            </p>
          </section>
        ) : null}

        {!isLoading && filteredUsers.length > 0 ? (
          <motion.section
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.06 },
              },
            }}
            className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredUsers.map((user) => (
              <motion.article
                key={user.id}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-3xl border border-accent/20 bg-card p-5 shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.15em] text-primary">Member</p>
                  <Badge variant="outline">ID #{user.id}</Badge>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-card-foreground">
                  {user.username}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                <Separator className="my-4" />
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Active contributor
                </p>
              </motion.article>
            ))}
          </motion.section>
        ) : null}
      </div>
    </main>
  );
}
