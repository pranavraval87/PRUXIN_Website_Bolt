import { motion, type Variants } from "framer-motion"
import { Radio, ShieldCheck, Users, ChartBar as BarChart3, MessageSquare, Zap, ArrowRight, CircleCheck as CheckCircle2, FileText } from "lucide-react"
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
    icon: ShieldCheck,
    title: "ICO & OFCOM compliant",
    description: "Fully registered with ICO. Every campaign runs within OFCOM's Persistent Misuse rules and the TPS/CTPS framework.",
  },
  {
    icon: Users,
    title: "Consent management",
    description: "Built-in consent tracking and DNC list management. Know exactly who you can and cannot call, every time.",
  },
  {
    icon: MessageSquare,
    title: "Dynamic script personalisation",
    description: "Scripts adapt in real-time based on caller responses, CRM data, and campaign context.",
  },
  {
    icon: BarChart3,
    title: "Real-time outcome tracking",
    description: "Live dashboards show connection rates, outcomes, and conversions as your campaign runs.",
  },
  {
    icon: FileText,
    title: "Appointment reminders",
    description: "Automated reminder calls reduce no-shows by up to 60%. Reschedule on-call without any manual effort.",
  },
  {
    icon: Zap,
    title: "Payment nudges",
    description: "Politely chase outstanding invoices with AI-driven payment calls that sound human and stay compliant.",
  },
]

const useCases = [
  { label: "Appointment reminders", sub: "Reduce no-shows by up to 60%" },
  { label: "Follow-up sequences", sub: "Keep warm leads warm automatically" },
  { label: "Payment collection", sub: "Polite, compliant debt nudges" },
  { label: "Survey & feedback calls", sub: "Post-service NPS at scale" },
  { label: "Reactivation campaigns", sub: "Win back churned customers" },
  { label: "Event & class reminders", sub: "Fill sessions, reduce dropouts" },
]

export function OutboundServicePage() {
  return (
    <RootLayout>
      {/* Hero */}
      <section aria-labelledby="outbound-heading" className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
              <Radio aria-hidden="true" className="w-3.5 h-3.5" />
              Ruxi Outbound
            </div>
            <h1 id="outbound-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] mb-6">
              Compliant outreach.{" "}
              <span className="gradient-text">At scale.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Run appointment reminders, follow-ups, and payment nudges without a single agent. Every call is ICO-registered, OFCOM-compliant, and fully logged.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full glow-blue gap-2 px-8 font-semibold" asChild>
                <Link to="/onboarding">
                  <Zap aria-hidden="true" className="w-4 h-4" />
                  Start outbound calling
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2" asChild>
                <Link to="/compliance">
                  <ShieldCheck aria-hidden="true" className="w-4 h-4" />
                  View compliance guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="outbound-capabilities-heading" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="outbound-capabilities-heading" className="text-4xl font-bold tracking-tight mb-4">
              Built for{" "}
              <span className="gradient-text">UK compliance</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
              UK telephony regulations are strict. Ruxi Outbound is designed from the ground up to stay inside every rule.
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

      {/* Use cases + CTA */}
      <section className="py-24 lg:py-32 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                What you can run{" "}
                <span className="gradient-text">today.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Ruxi Outbound works for any UK business that needs to reach existing customers — without adding headcount.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {useCases.map((uc) => (
                  <div key={uc.label} className="glass-card rounded-xl border border-white/10 p-4 flex items-start gap-3">
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{uc.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{uc.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl border border-white/10 p-10 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                <ShieldCheck aria-hidden="true" className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Before you start: compliance</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  UK outbound calling has specific ICO registration, consent, and OFCOM rules. Download our free checklist to make sure you're covered before your first campaign.
                </p>
              </div>
              <Button variant="outline" size="sm" className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2 self-start" asChild>
                <Link to="/compliance">
                  <FileText aria-hidden="true" className="w-3.5 h-3.5" />
                  Download compliance checklist
                </Link>
              </Button>
              <div className="border-t border-white/8 pt-6">
                <Button size="lg" className="rounded-full glow-blue gap-2 w-full font-semibold" asChild>
                  <Link to="/onboarding">
                    Build my Ruxi now
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">No credit card · No contract</p>
              </div>
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
