import { motion, type Variants } from "framer-motion"
import { Phone, Radio, Globe, Palette, ArrowRight, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const primaryServices = [
  {
    icon: Phone,
    title: "Inbound Calling",
    tagline: "Never miss a call again",
    description:
      "Ruxi answers every inbound call in under 1 second — 24/7, bank holidays included. It qualifies callers, captures intent, and books appointments without a human in the loop.",
    to: "/services/inbound",
    accent: true,
    badge: null,
  },
  {
    icon: Radio,
    title: "Outbound Calling",
    tagline: "Compliant AI outreach at scale",
    description:
      "Launch compliant outbound campaigns — appointment reminders, follow-ups, payment nudges — without a single agent. Full ICO and OFCOM compliance built in.",
    to: "/services/outbound",
    accent: true,
    badge: null,
  },
  {
    icon: Globe,
    title: "AI Web Agent",
    tagline: "The intelligence layer for your website",
    description:
      "Deploy a Ruxi agent on your website. It answers visitor questions, qualifies intent, and books meetings — all without a human in the loop.",
    to: "/product/web-agent",
    accent: true,
    badge: "Coming Soon",
  },
]

const otherServices = [
  {
    icon: Palette,
    title: "UX / UI Design",
    tagline: "Product clarity consulting",
    description:
      "End-to-end product design and UX consulting — from discovery and wireframing to high-fidelity UI and usability testing. The same craft that powers PRUXIN's own products.",
    to: "/services/design",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Toolkit",
    tagline: "AI & telephony compliance made simple",
    description:
      "Downloadable ICO, OFCOM, and GDPR compliance checklists for UK businesses using AI voice agents. Understand your obligations before you go live.",
    to: "/compliance",
  },
]

export function ServicesPage() {
  return (
    <RootLayout>
      {/* Hero */}
      <section aria-labelledby="services-hero-heading" className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            Everything PRUXIN offers
          </div>
          <h1 id="services-hero-heading" className="text-5xl sm:text-6xl font-bold tracking-tight text-balance mb-6 max-w-3xl mx-auto">
            One platform.{" "}
            <span className="gradient-text">Every channel.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Ruxi handles your calls. Our design practice handles your product. Together, they close the loop between customer contact and customer clarity.
          </p>
        </div>
      </section>

      {/* Primary Ruxi services */}
      <section aria-labelledby="ruxi-services-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="ruxi-services-heading" className="text-2xl font-bold tracking-tight mb-2">Ruxi</h2>
          <p className="text-muted-foreground text-sm mb-10">AI voice and web services for UK businesses</p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {primaryServices.map((svc) => (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                className="glass-card rounded-2xl border border-white/10 p-7 flex flex-col gap-5 group hover:border-accent/25 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <svc.icon aria-hidden="true" className="w-5 h-5 text-accent" />
                  </div>
                  {svc.badge && (
                    <span className="text-[10px] px-2 py-1 rounded-full border border-accent/25 text-accent/80 font-medium">
                      {svc.badge}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-accent font-semibold tracking-wide uppercase mb-1">{svc.tagline}</p>
                  <h3 className="text-lg font-bold text-foreground mb-3">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.description}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2 self-start" asChild>
                  <Link to={svc.to}>
                    Learn more
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      </div>

      {/* Other services */}
      <section aria-labelledby="other-services-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="other-services-heading" className="text-2xl font-bold tracking-tight mb-2">More from PRUXIN</h2>
          <p className="text-muted-foreground text-sm mb-10">Supporting services and resources</p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {otherServices.map((svc) => (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                className="glass-card rounded-2xl border border-white/10 p-7 flex flex-col gap-5 group hover:border-white/20 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                  <svc.icon aria-hidden="true" className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-semibold tracking-wide uppercase mb-1">{svc.tagline}</p>
                  <h3 className="text-lg font-bold text-foreground mb-3">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/5 hover:text-foreground gap-2 self-start text-muted-foreground" asChild>
                  <Link to={svc.to}>
                    Learn more
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                  </Link>
                </Button>
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
