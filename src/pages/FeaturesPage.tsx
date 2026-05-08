import { useRef } from "react"
import { motion, type Variants } from "framer-motion"
import { PhoneIncoming, Bot, CalendarCheck, Bell, Globe, ShieldCheck, Zap, ChartBar as BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"
import { FinalCTA } from "@/components/sections/FinalCTA"

const features = [
  {
    icon: PhoneIncoming,
    title: "Ruxi Inbound",
    tagline: "Never miss a call again",
    description:
      "Ruxi answers every inbound call in under 1 second — 24/7, bank holidays included. It qualifies the caller, captures their intent, and routes them to the right outcome without a human lifting a finger.",
    bullets: [
      "Sub-1s pickup time, every call",
      "Natural language understanding — not DTMF press-1 menus",
      "Caller ID lookup + CRM pre-fill",
      "Configurable per-number routing rules",
      "UK phone numbers included",
    ],
    accent: true,
  },
  {
    icon: CalendarCheck,
    title: "Smart Booking Engine",
    tagline: "From call to calendar in 60 seconds",
    description:
      "Ruxi connects directly to your calendar and books appointments in real-time, sending confirmation SMS and email to the caller automatically.",
    bullets: [
      "Google Calendar & Outlook integration",
      "Real-time availability checking",
      "Automatic confirmation + reminders",
      "Cancellation and reschedule handling",
      "Buffer time and max-booking rules",
    ],
    accent: false,
  },
  {
    icon: Bot,
    title: "Ruxi Outbound",
    tagline: "Compliant AI outreach at scale",
    description:
      "Launch compliant outbound campaigns — appointment reminders, follow-ups, payment nudges — without a single agent. Full ICO and OFCOM compliance built in.",
    bullets: [
      "ICO-registered, OFCOM-compliant",
      "Consent management built in",
      "Dynamic script personalisation",
      "Real-time outcome tracking",
      "DNC list management",
    ],
    accent: true,
  },
  {
    icon: Globe,
    title: "AI Web Agent",
    tagline: "The intelligence layer for your website",
    description:
      "Deploy a Ruxi agent directly on your website. It answers visitor questions, qualifies intent, and books meetings — all without a human in the loop.",
    bullets: [
      "Embeds in any website in < 5 minutes",
      "Trained on your own content",
      "Booking + FAQ + lead capture",
      "Handoff to live agent when needed",
      "Full conversation transcripts",
    ],
    accent: false,
    badge: "Coming Soon",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    tagline: "Know the moment something happens",
    description:
      "Every call, booking, and message triggers an instant notification to you via SMS, email, or webhook. No more checking voicemail.",
    bullets: [
      "SMS + email alerts",
      "Webhook to Slack, Zapier, Make",
      "Call transcripts delivered instantly",
      "Sentiment summary on every call",
      "Escalation rules for urgent callers",
    ],
    accent: true,
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    tagline: "Clarity in every metric",
    description:
      "See exactly how many calls were answered, missed, converted, and at what cost — in a clean, real-time dashboard built for operators, not data scientists.",
    bullets: [
      "Call volume + outcome breakdown",
      "Cost per call, per booking",
      "Peak hour heatmaps",
      "Conversion funnel tracking",
      "CSV export + API access",
    ],
    accent: false,
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    tagline: "GDPR-first, ICO-registered",
    description:
      "Every interaction is processed under UK GDPR. Ruxi is ICO-registered, PECR-aligned, and SOC 2 Type II ready. Your data never leaves UK/EU infrastructure.",
    bullets: [
      "ICO registration number available on request",
      "UK/EU data residency",
      "Encrypted at rest and in transit",
      "30-day automatic data retention",
      "DPA available for enterprise customers",
    ],
    accent: true,
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function FeaturesPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <RootLayout mainRef={mainRef}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
            <Zap className="w-3.5 h-3.5" />
            Full Feature Set
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance mb-6">
            Everything Ruxi can do{" "}
            <span className="gradient-text">for your business</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            One platform. Every customer touchpoint covered. Deployed in 10
            minutes.
          </p>
          <Button size="lg" className="rounded-full glow-blue gap-2" asChild>
            <a href="/">
              Build my Ruxi now
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Feature list */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="space-y-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="glass-card rounded-2xl border border-white/10 p-8 lg:p-10"
              >
                <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          f.accent
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <f.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold">{f.title}</h2>
                          {f.badge && (
                            <span className="text-xs px-2 py-0.5 rounded-full border border-accent/30 text-accent">
                              {f.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${f.accent ? "text-accent" : "text-primary"}`}>
                          {f.tagline}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>

                  {/* Right: bullets */}
                  <ul className="space-y-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span
                          className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center ${
                            f.accent ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"
                          }`}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ErrorBoundary section="FinalCTA" inline>
        <FinalCTA />
      </ErrorBoundary>
    </RootLayout>
  )
}
