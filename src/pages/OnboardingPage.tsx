import { Zap, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"

export function OnboardingPage() {
  return (
    <RootLayout>
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 lg:py-40 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            Start your setup
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 max-w-4xl">
            Let&apos;s build your{" "}
            <span className="gradient-text">Ruxi.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Your onboarding portal is being prepared. In the meantime, reach out directly and we&apos;ll get you live in under 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button size="lg" className="rounded-full glow-blue gap-2 px-8 font-semibold" asChild>
              <a href="mailto:pranav@pruxin.com">
                <Zap aria-hidden="true" className="w-4 h-4" />
                Get started now
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="rounded-full gap-2 px-8 text-muted-foreground hover:text-foreground" asChild>
              <Link to="/">
                Back to home
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            No credit card · No contract · Live in 10 minutes
          </p>
        </div>
      </section>
    </RootLayout>
  )
}
