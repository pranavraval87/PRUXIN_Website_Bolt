import { motion, type Variants } from "framer-motion"
import { Phone, Clock, CalendarCheck, Bell, ShieldCheck, Zap, ArrowRight, CircleCheck as CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const capabilities = [
  {
    icon: Clock,
    title: "Sub-1s answer time",
    description: "Every call answered in under a second. No ring-outs, no voicemail black holes.",
  },
  {
    icon: Phone,
    title: "Natural language understanding",
    description: "Ruxi understands intent from natural speech — no DTMF press-1 menus, no frustration.",
  },
  {
    icon: CalendarCheck,
    title: "Live calendar booking",
    description: "Connects directly to your Google Calendar or Outlook and books in real time during the call.",
  },
  {
    icon: Bell,
    title: "Automated confirmations",
    description: "SMS and email confirmations sent to the caller automatically, with built-in reminder sequences.",
  },
  {
    icon: ShieldCheck,
    title: "ICO & GDPR compliant",
    description: "Call recording consent, data retention limits, and ICO registration handled for you.",
  },
  {
    icon: Zap,
    title: "Instant CRM sync",
    description: "Caller ID lookup and automatic CRM pre-fill so every conversation has context.",
  },
]

const bullets = [
  "24/7 coverage — bank holidays included",
  "UK phone numbers included",
  "Configurable per-number routing rules",
  "Caller ID lookup + CRM pre-fill",
  "Real-time availability checking",
  "Cancellation and reschedule handling",
  "Buffer time and max-booking rules",
  "Multilingual support (coming soon)",
]

export function InboundServicePage() {
  return (
    <RootLayout>
      {/* Hero */}
      <section aria-labelledby="inbound-heading" className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
              <Phone aria-hidden="true" className="w-3.5 h-3.5" />
              Ruxi Inbound
            </div>
            <h1 id="inbound-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] mb-6">
              Every call{" "}
              <span className="gradient-text">answered.</span>
              <br />Every time.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Ruxi picks up in under a second, 24/7. It speaks naturally, qualifies the caller, and books them into your calendar — without you lifting a finger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full glow-blue gap-2 px-8 font-semibold" asChild>
                <Link to="/onboarding">
                  <Zap aria-hidden="true" className="w-4 h-4" />
                  Set up Ruxi Inbound
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2" asChild>
                <Link to="/services">
                  View all services
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section aria-labelledby="capabilities-heading" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="capabilities-heading" className="text-4xl font-bold tracking-tight mb-4">
              What Ruxi Inbound{" "}
              <span className="gradient-text">does for you</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
              Not a basic IVR. A full AI agent that handles the entire inbound journey from ring to booked.
            </p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {capabilities.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col gap-4 hover:border-accent/20 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                  <cap.icon aria-hidden="true" className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature checklist + CTA */}
      <section className="py-24 lg:py-32 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Everything included.{" "}
                <span className="gradient-text">No extras.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Every Ruxi Inbound plan comes with the complete feature set. No add-ons, no hidden fees, no "enterprise only" gotchas.
              </p>
              <ul className="space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-foreground/80">
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-2xl border border-white/10 p-10 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                <Phone aria-hidden="true" className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Live in 10 minutes</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Tell us your business name, connect your calendar, and your Ruxi is live. No long setup. No IT required.
                </p>
              </div>
              <Button size="lg" className="rounded-full glow-blue gap-2 w-full font-semibold" asChild>
                <Link to="/onboarding">
                  Build my Ruxi now
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground">No credit card · No contract</p>
            </div>
          </div>
        </div>
      </section>

      <ErrorBoundary section="FinalCTA" inline>
        <FinalCTA />
      </ErrorBoundary>
    </RootLayout>
  )
}
