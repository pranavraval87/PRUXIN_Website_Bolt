import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Lock, FileText, Image as ImageIcon, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeUp } from "@/components/motion/FadeUp"
import { MagneticButton } from "@/components/motion/MagneticButton"
import { track } from "@/lib/analytics"

const complianceBadges = [
  {
    acronym: "GDPR",
    label: "UK GDPR Compliant",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    acronym: "ICO",
    label: "ICO Registered",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    acronym: "PECR",
    label: "PECR Aligned",
    icon: <FileText className="w-5 h-5" />,
  },
]

function ComplianceCard({
  badge,
  delay,
}: {
  badge: (typeof complianceBadges)[0]
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "glass-card rounded-2xl border border-white/10 p-6 flex items-center gap-4",
        "hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 group"
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/15 transition-colors duration-300 flex-shrink-0">
        {badge.icon}
      </div>
      <div>
        <div className="text-base font-bold text-foreground">{badge.acronym}</div>
        <div className="text-xs text-accent font-semibold">{badge.label}</div>
      </div>
    </motion.div>
  )
}

export function TrustSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 60%, oklch(0.50 0.22 264 / 7%) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="border-accent/30 text-accent bg-accent/5 mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
          >
            Trust & Compliance
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Built for the{" "}
            <span className="gradient-text">UK regulatory landscape</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            UK law built in. Protecting your business from day one.
          </p>
        </motion.div>

        {/* Compliance badge strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {complianceBadges.map((badge, i) => (
            <ComplianceCard key={badge.acronym} badge={badge} delay={i * 0.1} />
          ))}
        </div>

        {/* Image-led: Compliance Dashboard placeholder */}
        <FadeUp delay={0.1}>
          <div className="relative w-full max-w-4xl mx-auto mb-16">
            {/* Outer glow */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/15 via-primary/10 to-transparent blur-xl pointer-events-none opacity-60" />

            <div className="relative glass-card rounded-2xl border border-white/10 p-3">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-2 pb-2.5 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                <div className="ml-3 text-[10px] text-muted-foreground/60 font-mono">
                  app.pruxin.io/compliance
                </div>
              </div>

              {/* Placeholder area */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,oklch(0.88_0.12_196_/_10%)_0%,transparent_70%)]"
                  aria-hidden="true"
                />
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                  aria-hidden="true"
                />

                {/* Corner badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded border bg-accent/10 border-accent/20 text-accent">
                    Placeholder
                  </span>
                </div>

                {/* Centre content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 text-accent flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-mono text-center text-muted-foreground/70 leading-relaxed max-w-sm">
                    IMAGE: Compliance Dashboard — show the PRUXIN compliance panel with GDPR status badges, ICO registration number, call recording consent log table (date, caller, disclosure confirmed ✓), and auto-deletion policy settings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.15} className="flex flex-col items-center gap-4">
          <MagneticButton>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold text-base px-8 h-12 gap-2 group"
              onClick={() => track({ name: "cta_click", label: "Build my Ruxi now", location: "TrustSection" })}
            >
              Build my Ruxi now
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
          <p className="text-sm text-muted-foreground">Compliance handled automatically. No legal team required.</p>
        </FadeUp>
      </div>
    </section>
  )
}
