import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Hop as Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/Navbar"

export function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Ambient background */}
        <div className="hero-glow absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center gap-6 max-w-lg"
        >
          <Badge
            variant="outline"
            className="border-destructive/30 text-destructive bg-destructive/5 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
          >
            404 — Page not found
          </Badge>

          <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">
            Lost in{" "}
            <span className="gradient-text">the static.</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            This page doesn't exist — but Ruxi is still answering your calls.
            Head back home and explore what we've built.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold gap-2.5 px-8"
            >
              <Link to="/">
                <Home className="w-4 h-4" />
                Back to home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground/50 mt-2 font-mono">
            {window.location.pathname}
          </p>
        </motion.div>
      </main>
    </>
  )
}
