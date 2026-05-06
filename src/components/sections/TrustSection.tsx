import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Lock, FileText, Mic, CircleCheck as CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const complianceBadges = [
  {
    acronym: "GDPR",
    label: "UK GDPR Compliant",
    description: "All call data is processed and stored in accordance with UK GDPR. You remain the data controller at all times.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    acronym: "ICO",
    label: "ICO Registered",
    description: "PRUXIN is registered with the Information Commissioner's Office, fulfilling its legal obligation as a UK data processor.",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    acronym: "PECR",
    label: "PECR Aligned",
    description: "Our recording and notification flows are designed in compliance with the Privacy and Electronic Communications Regulations.",
    icon: <FileText className="w-5 h-5" />,
  },
]

const trustPoints = [
  "All data stored on UK-based servers",
  "Call recordings encrypted at rest and in transit",
  "Auto-deletion policy configurable per business",
  "No data sold to third parties, ever",
]

export function TrustSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })
  const disclaimerRef = useRef<HTMLDivElement>(null)
  const disclaimerInView = useInView(disclaimerRef, { once: true, margin: "-60px" })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow */}
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

        {/* Compliance badge grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {complianceBadges.map((badge, i) => (
            <ComplianceCard key={badge.acronym} badge={badge} delay={i * 0.12} />
          ))}
        </div>

        {/* Two-column: trust points + recording disclaimer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={disclaimerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="glass-card rounded-2xl border border-white/10 p-7 flex flex-col gap-5"
          >
            <h3 className="text-lg font-bold text-foreground">
              Data you can trust
            </h3>
            <ul className="flex flex-col gap-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recording disclaimer card */}
          <motion.div
            ref={disclaimerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={disclaimerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
            className="glass-card rounded-2xl border border-white/10 p-7 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Legitimate Interests — handled automatically
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Under UK GDPR's <strong className="text-foreground font-semibold">Legitimate Interests</strong> basis, businesses may record calls provided the caller is informed. Ruxi handles this naturally, weaving the disclosure into its greeting:
            </p>

            {/* Simulated call transcript */}
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider flex-shrink-0 pt-0.5">
                  RUXI
                </span>
                <p className="text-sm text-foreground/85 leading-relaxed italic">
                  "Good morning, you've reached Hartley &amp; Sons Solicitors — I'm Ruxi, the AI assistant. This call may be recorded for quality and compliance purposes. How can I help you today?"
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              This single sentence satisfies your disclosure obligation under PECR, requires zero manual effort, and is logged against every call record — giving you an auditable compliance trail.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-xs font-semibold text-accent">
                Disclosure logged &amp; timestamped on every call
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

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
        "glass-card rounded-2xl border border-white/10 p-6 flex flex-col gap-4",
        "hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 group"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/15 transition-colors duration-300">
          {badge.icon}
        </div>
        <div>
          <div className="text-lg font-bold text-foreground">{badge.acronym}</div>
          <div className="text-xs text-accent font-semibold">{badge.label}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {badge.description}
      </p>
    </motion.div>
  )
}


export { TrustSection }