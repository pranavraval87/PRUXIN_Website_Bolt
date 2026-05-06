import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { PhoneCall, Brain, CalendarCheck, BellRing } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    icon: <PhoneCall className="w-6 h-6" />,
    title: "Answer",
    headline: "Ruxi greets every caller by name",
    body: "The moment a call connects, Ruxi introduces itself naturally using your business name — indistinguishable from a trained human receptionist.",
    accent: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/10",
    glow: "glow-cyan",
  },
  {
    number: "02",
    icon: <Brain className="w-6 h-6" />,
    title: "Understand",
    headline: "Intent identified in seconds",
    body: "Ruxi listens actively and classifies the caller's intent — booking, FAQ, complaint, or emergency — routing each scenario to the right outcome automatically.",
    accent: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
    glow: "glow-blue",
  },
  {
    number: "03",
    icon: <CalendarCheck className="w-6 h-6" />,
    title: "Act",
    headline: "Bookings made. Slots filled.",
    body: "Ruxi books directly into your Google Calendar, answers FAQs from your knowledge base, or escalates an emergency — without you lifting a finger.",
    accent: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/10",
    glow: "glow-cyan",
  },
  {
    number: "04",
    icon: <BellRing className="w-6 h-6" />,
    title: "Notify",
    headline: "A clean summary lands in your pocket",
    body: "You receive an instant notification with caller details, intent summary, action taken, and recommended next steps — everything you need, nothing you don't.",
    accent: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
    glow: "glow-blue",
  },
]

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className={cn(
        "relative glass-card rounded-2xl border p-7 flex gap-5 transition-all duration-500",
        inView ? `border-white/20 bg-white/[0.06]` : "border-white/8 bg-white/[0.03]"
      )}
    >
      {/* Step number */}
      <div className="flex-shrink-0 flex flex-col items-center gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500",
            step.bg,
            step.border,
            step.accent,
            inView ? step.glow : ""
          )}
        >
          {step.icon}
        </div>
        {/* Connector line (not on last item) */}
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="w-px flex-1 min-h-12 bg-gradient-to-b from-white/20 to-transparent"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-3">
          <span className={cn("text-xs font-bold tracking-widest uppercase", step.accent)}>
            {step.number}
          </span>
          <Badge
            variant="outline"
            className={cn(
              "border text-xs font-semibold px-2 py-0.5 tracking-wide",
              step.border,
              step.accent,
              step.bg
            )}
          >
            {step.title}
          </Badge>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          {step.headline}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.body}
        </p>
      </div>
    </motion.div>
  )
}

export function Process() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, oklch(0.88 0.12 196 / 6%) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="border-accent/30 text-accent bg-accent/5 mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
          >
            How it Works
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Meet{" "}
            <span className="gradient-text">Ruxi</span>
            {" "}— your AI receptionist
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Four steps from ring to resolution. No training required, no scripts to write.
          </p>
        </div>

        {/* Steps — two column desktop, single column mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
