import { PhoneMissed, TrendingDown, PoundSterling } from "lucide-react"
import { FadeUp } from "@/components/motion/FadeUp"

const stats = [
  {
    icon: <PhoneMissed className="w-5 h-5 text-accent" />,
    value: "62%",
    label: "of callers don't leave a voicemail",
  },
  {
    icon: <TrendingDown className="w-5 h-5 text-accent" />,
    value: "78%",
    label: "go with whoever answers first",
  },
  {
    icon: <PoundSterling className="w-5 h-5 text-accent" />,
    value: "£4,200",
    label: "average annual loss per missed call",
  },
]

export function PainSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none hero-glow opacity-60"
        aria-hidden="true"
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Your next customer is{" "}
            <span className="gradient-text">already calling.</span>
            <br />
            Don't let them go to your competitor.
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-16">
            While you're busy, three enquiries ring out — straight to your competitor.
            That's lost revenue, not a technology problem.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <FadeUp key={stat.value} delay={i * 0.1}>
              <div className="glass-card glass-card-hover rounded-2xl border border-white/10 px-8 py-8 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground leading-snug text-center">
                  {stat.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
