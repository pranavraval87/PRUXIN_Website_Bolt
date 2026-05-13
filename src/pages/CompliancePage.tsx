import { motion, type Variants } from "framer-motion"
import { ShieldCheck, Download, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Info, Phone, Radio, FileText, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

interface CheckItem {
  id: string
  text: string
  critical?: boolean
  note?: string
}

interface Section {
  icon: React.ElementType
  title: string
  subtitle: string
  items: CheckItem[]
}

const sections: Section[] = [
  {
    icon: ShieldCheck,
    title: "ICO Registration",
    subtitle: "Required before processing any call data",
    items: [
      { id: "ico-1", text: "Register as a Data Controller with the ICO (ico.org.uk)", critical: true },
      { id: "ico-2", text: "Renew your ICO registration annually (approx. £40–£60)", critical: true },
      { id: "ico-3", text: "Record your registration number in your privacy policy", },
      { id: "ico-4", text: "Identify your lawful basis for processing call data (Legitimate Interest or Consent)", critical: true },
      { id: "ico-5", text: "Complete a Legitimate Interests Assessment (LIA) if relying on Legitimate Interest", note: "Required if you are not collecting explicit consent" },
    ],
  },
  {
    icon: Phone,
    title: "Inbound Calling Compliance",
    subtitle: "Rules for AI-answered inbound calls",
    items: [
      { id: "in-1", text: "Disclose at the start of each call that the caller may be speaking to an AI", critical: true, note: "Required under ICO guidance on automated processing" },
      { id: "in-2", text: "Offer a human transfer option for callers who request it", critical: true },
      { id: "in-3", text: "Obtain consent before recording calls, or state legitimate interest clearly", critical: true },
      { id: "in-4", text: "Define your call data retention period (recommend: 30–90 days)", },
      { id: "in-5", text: "Store call recordings securely and encrypted at rest", },
      { id: "in-6", text: "Provide a Subject Access Request (SAR) process for callers", },
      { id: "in-7", text: "Include AI call processing in your Privacy Policy", },
    ],
  },
  {
    icon: Radio,
    title: "Outbound Calling Compliance",
    subtitle: "UK regulations for AI-initiated outbound calls",
    items: [
      { id: "out-1", text: "Register with the Telephone Preference Service (TPS) screening — never call TPS-registered numbers without explicit prior consent", critical: true },
      { id: "out-2", text: "Register with the Corporate TPS (CTPS) if calling businesses", critical: true },
      { id: "out-3", text: "Maintain an up-to-date Do Not Call (DNC) list and check every number before dialling", critical: true },
      { id: "out-4", text: "Do not make calls before 8am or after 9pm on weekdays; 9am–8pm on Saturdays; no calls on Sundays", critical: true, note: "OFCOM Persistent Misuse guidance" },
      { id: "out-5", text: "Disclose your company name and contact number at the start of every outbound call", critical: true },
      { id: "out-6", text: "Do not use artificial or pre-recorded voice without prior express consent", note: "Exception: appointment reminders to existing customers may qualify under Legitimate Interest — seek legal advice" },
      { id: "out-7", text: "Keep records of consent: date, channel, and the specific consent wording shown", },
      { id: "out-8", text: "Honour opt-out requests within 30 days and suppress the number from all future campaigns", critical: true },
    ],
  },
  {
    icon: FileText,
    title: "GDPR Data Obligations",
    subtitle: "General data protection rules for all call data",
    items: [
      { id: "gdpr-1", text: "Include a clear, plain-English privacy notice on your website covering call data", critical: true },
      { id: "gdpr-2", text: "Complete a Record of Processing Activities (ROPA) that includes AI voice systems", },
      { id: "gdpr-3", text: "Conduct a Data Protection Impact Assessment (DPIA) before deploying AI voice agents", note: "Recommended for high-risk processing; may be required if using biometric voice data" },
      { id: "gdpr-4", text: "Ensure any third-party AI provider (e.g. Vapi, Twilio) has a Data Processing Agreement (DPA) in place", critical: true },
      { id: "gdpr-5", text: "Ensure data is stored within the UK or EEA, or document your International Transfer Mechanism", },
      { id: "gdpr-6", text: "Designate a point of contact (or DPO if required) for data subject requests", },
    ],
  },
]

export function CompliancePage() {
  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0)
  const criticalItems = sections.reduce((acc, s) => acc + s.items.filter(i => i.critical).length, 0)

  return (
    <RootLayout>
      {/* Hero */}
      <section aria-labelledby="compliance-heading" className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
            <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5" />
            UK AI & Telephony Compliance
          </div>
          <h1 id="compliance-heading" className="text-5xl sm:text-6xl font-bold tracking-tight text-balance mb-6 max-w-3xl mx-auto">
            Compliance checklist for{" "}
            <span className="gradient-text">AI voice agents</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            A plain-English guide for UK businesses using AI for inbound and outbound calling. {criticalItems} critical items across {totalItems} total checks — covering ICO, OFCOM, TPS, and GDPR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full glow-blue gap-2 px-8 font-semibold" onClick={() => window.print()}>
              <Download aria-hidden="true" className="w-4 h-4" />
              Download / Print checklist
            </Button>
            <Button variant="outline" size="lg" className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2" asChild>
              <Link to="/services/outbound">
                <Radio aria-hidden="true" className="w-4 h-4" />
                View Ruxi Outbound
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-6 mb-4">
        <div className="flex items-start gap-3 glass-card rounded-xl border border-white/10 p-4">
          <Info aria-hidden="true" className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            This checklist is provided for informational purposes only and does not constitute legal advice. UK telecommunications and data protection law is complex. Consult a qualified solicitor before deploying AI voice systems commercially. Ruxi customers receive compliance guidance as part of their onboarding.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 text-destructive" />
            Critical — legal obligation or significant risk
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5 text-accent" />
            Best practice — strongly recommended
          </div>
        </div>
      </div>

      {/* Checklist sections */}
      <section aria-label="Compliance checklist" className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="space-y-8"
          >
            {sections.map((section) => (
              <motion.div
                key={section.title}
                variants={fadeUp}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Section header */}
                <div className="flex items-center gap-4 p-6 border-b border-white/8">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                    <section.icon aria-hidden="true" className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">{section.title}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{section.subtitle}</p>
                  </div>
                </div>

                {/* Checklist items */}
                <ul className="divide-y divide-white/5">
                  {section.items.map((item) => (
                    <li key={item.id} className="p-5 flex items-start gap-4">
                      <div className="shrink-0 mt-0.5">
                        {item.critical ? (
                          <AlertCircle aria-label="Critical" className="w-4 h-4 text-destructive" />
                        ) : (
                          <CheckCircle2 aria-label="Best practice" className="w-4 h-4 text-accent/60" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-relaxed ${item.critical ? "text-foreground font-medium" : "text-foreground/80"}`}>
                          {item.text}
                        </p>
                        {item.note && (
                          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed italic">{item.note}</p>
                        )}
                      </div>
                      {/* Print-friendly checkbox */}
                      <div
                        aria-hidden="true"
                        className="shrink-0 w-5 h-5 rounded border border-white/20 hidden print:block"
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ruxi handles this for you */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card rounded-2xl border border-accent/20 glow-cyan p-10 text-center flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <ShieldCheck aria-hidden="true" className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Ruxi handles most of this for you</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                ICO compliance, OFCOM rules, consent management, DNC lists, call recording disclosure — all built into Ruxi by default. You focus on your business, Ruxi handles the compliance layer.
              </p>
            </div>
            <Button size="lg" className="rounded-full glow-blue gap-2 px-8 font-semibold" asChild>
              <Link to="/onboarding">
                Build my Ruxi now
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">No credit card · No contract · Live in 10 minutes</p>
          </div>
        </div>
      </section>

      {/* Print styles */}
      <style>{`
        @media print {
          header, footer, [data-testid], button { display: none !important; }
          .glass-card { background: white !important; border: 1px solid #e5e7eb !important; }
          body { background: white !important; color: black !important; }
          .gradient-text { color: black !important; -webkit-text-fill-color: black !important; }
        }
      `}</style>
    </RootLayout>
  )
}
