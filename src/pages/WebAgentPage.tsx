import { useRef } from "react"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"

export function WebAgentPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <RootLayout mainRef={mainRef}>
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 lg:py-40 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Coming Soon
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 max-w-4xl">
            Ruxi Web: The{" "}
            <span className="gradient-text">Intelligence Layer</span>{" "}
            for your Website.
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Your website answers questions. Ruxi Web understands intent, qualifies
            visitors, and books meetings — without a human in the loop.
          </p>

          <Button size="lg" className="rounded-full glow-blue gap-2 px-8" asChild>
            <a href="mailto:pranav@pruxin.com">
              <Zap className="w-4 h-4" />
              Get Early Access
            </a>
          </Button>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl border border-white/10 py-20 px-8">
            <p className="text-muted-foreground text-center text-sm">
              Full product page coming soon.
            </p>
          </div>
        </div>
      </section>
    </RootLayout>
  )
}
