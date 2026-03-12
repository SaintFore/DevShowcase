import { motion } from "framer-motion";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const featureCards = [
  {
    title: "Project Gallery",
    description:
      "Publish what you build with stack details, links, and a clean showcase layout.",
    value: "Fast updates",
  },
  {
    title: "Team Directory",
    description:
      "Track contributors and quickly jump into user profiles from one focused page.",
    value: "Single source",
  },
  {
    title: "Iteration Loop",
    description:
      "Stay in flow with concise UI blocks designed for quick scans and frequent edits.",
    value: "Ship weekly",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-accent/30 bg-surface p-6 shadow-xl sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,theme(colors.secondary/25),transparent_45%),radial-gradient(circle_at_bottom_right,theme(colors.accent/15),transparent_40%)]" />
          <div className="relative">
            <Badge variant="secondary" className="text-xs uppercase tracking-[0.18em]">
              Dev Showcase Workspace
            </Badge>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-foreground sm:text-6xl">
              Build loud, present clearly, iterate without friction.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              A focused home for your projects and contributors. Keep everything visible,
              structured, and ready for the next release.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/projects">Explore Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/users">Open User Directory</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="mt-8 grid gap-6 md:grid-cols-3"
        >
          {featureCards.map((card) => (
            <motion.article
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl border border-primary/20 bg-card p-5 shadow-lg"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-primary">{card.value}</p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-card-foreground">
                {card.title}
              </h2>
              <Separator className="my-4" />
              <p className="text-sm leading-7 text-muted-foreground">{card.description}</p>
            </motion.article>
          ))}
        </motion.section>
      </div>
    </main>
  );
}
