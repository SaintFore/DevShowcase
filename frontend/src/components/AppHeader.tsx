import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

import { getMe } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { clearAuthToken, getAuthToken } from "@/lib/auth";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/users", label: "Users" },
];

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const isAuthenticated = Boolean(getAuthToken());

  useEffect(() => {
    let cancelled = false;

    if (!isAuthenticated) {
      return;
    }

    getMe()
      .then((user) => {
        if (cancelled) {
          return;
        }
        setUsername(user.username);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }
        setUsername(null);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, location.pathname]);

  const handleSignOut = async () => {
    clearAuthToken();
    await navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-accent/30 bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <Link to="/" className="text-lg font-bold tracking-wide text-foreground">
          DevShowcase
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent/20 hover:text-foreground",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <span className="hidden rounded-md border border-accent/40 bg-surface px-3 py-2 text-sm text-foreground sm:inline-block">
                {username ? `@${username}` : "Signed in"}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
