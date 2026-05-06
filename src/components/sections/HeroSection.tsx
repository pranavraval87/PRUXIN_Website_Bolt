import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Star, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        {/* Trust badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card glow-cyan border border-accent/20 text-sm text-foreground/80">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-medium">Trusted by</span>
          <span className="gradient-text font-bold">10,000+ teams</span>
          <span className="text-muted-foreground">worldwide</span>
        </div>

        {/* Primary headline */}
        <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
          The intelligence layer{" "}
          <br className="hidden sm:block" />
          your workflow{" "}
          <span className="gradient-text">deserves</span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
          PRUXIN unifies your team's knowledge, automates repetitive decisions,
          and surfaces the right context — exactly when you need it.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue transition-all duration-300 font-semibold px-8 h-12 text-base group"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/15 bg-white/5 hover:bg-white/10 text-foreground font-semibold px-8 h-12 text-base group backdrop-blur-sm"
          >
            <Play className="mr-2 w-4 h-4 fill-current text-accent" />
            Watch Demo
          </Button>
        </div>

        {/* Social proof micro-stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span>10k+ active teams</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-accent fill-current" />
            <span>4.9 / 5 on G2</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span>3× faster decisions</span>
          </div>
        </div>

        {/* Hero visual: glass dashboard panel */}
        <div className="relative w-full max-w-5xl">
          {/* Outer glow ring */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-xl pointer-events-none" />

          <div className="relative glass-card rounded-2xl overflow-hidden border border-white/10">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/8 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="flex-1 mx-4">
                <div className="w-48 h-5 rounded-md bg-white/5 mx-auto flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground">app.pruxin.io/dashboard</span>
                </div>
              </div>
            </div>

            {/* Dashboard screenshot */}
            <div className="relative aspect-[16/9]">
              <img
                src="/hero-dashboard.webp"
                alt="PRUXIN dashboard interface"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay to blend into background at bottom */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="absolute -left-4 top-1/3 glass-card rounded-xl px-4 py-3 border border-white/10 glow-cyan hidden lg:block">
            <div className="text-xs text-muted-foreground mb-1">Response time</div>
            <div className="text-2xl font-bold gradient-text">0.3ms</div>
            <div className="text-xs text-accent mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> −62% this week
            </div>
          </div>

          <div className="absolute -right-4 top-1/4 glass-card rounded-xl px-4 py-3 border border-white/10 glow-blue hidden lg:block">
            <div className="text-xs text-muted-foreground mb-1">Team velocity</div>
            <div className="text-2xl font-bold text-foreground">3.2×</div>
            <div className="text-xs text-accent mt-1">vs. industry avg</div>
          </div>
        </div>
      </div>
    </section>
  )
}
