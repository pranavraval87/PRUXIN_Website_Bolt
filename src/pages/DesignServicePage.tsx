import { motion, type Variants } from "framer-motion"
import { Palette, Search, Layers, MousePointer, ChartBar as BarChart3, ArrowRight, CircleCheck as CheckCircle2, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const services = [
  {
    icon: Search,
    title: "UX Research & Audit",
    description:
      "Heuristic evaluation, usability testing, and user interviews to uncover where your product loses people — and why.",
  },
  {
    icon: Layers,
    title: "Product Design",
    description:
      "End-to-end design from discovery and information architecture through wireframes to polished high-fidelity UI.",
  },
  {
    icon: MousePointer,
    title: "Interaction Design",
    description:
      "Micro-interactions, motion design, and component systems that make complex workflows feel effortless.",
  },
  {
    icon: BarChart3,
    title: "Clarity Consulting",
    description:
      "Strategic design reviews for SaaS products — the same practice behind the 'Clarity in Every Click' podcast.",
  },
]

const principles = [
  "Every click should be obvious",
  "Reduce options, increase conversions",
  "Onboarding should reach value in under 2 minutes",
  "Support tickets are design feedback",
  "Simplicity is a feature — not a limitation",
  "Design for the confused, delight the confident",
]

export function DesignServicePage() {
  return (
    <RootLayout>
      {/* Hero */}
      <section aria-labelledby="design-heading" className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            {/* Subtle badge — this is a background service, not the main pitch */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-white/15 text-muted-foreground text-xs font-semibold tracking-wide uppercase mb-8">
              <Palette aria-hidden="true" className="w-3.5 h-3.5" />
              UX / UI Design
            </div>
            <h1 id="design-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] mb-6">
              Products that{" "}
              <span className="gradient-text">make sense.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Before PRUXIN, this was the core practice. It still runs quietly behind the scenes — helping businesses build products their users actually understand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full gap-2 px-8 font-semibold" asChild>
                <a href="mailto:pranav@pruxin.com">
                  <Mail aria-hidden="true" className="w-4 h-4" />
                  Get in touch
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/15 hover:border-white/30 hover:text-foreground gap-2 text-muted-foreground" asChild>
                <Link to="/podcasts">
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  Clarity in Every Click podcast
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="design-services-heading" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="design-services-heading" className="text-4xl font-bold tracking-tight mb-4">
              What the practice covers
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
              Available on a project or retainer basis for SaaS teams and digital product companies.
            </p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {services.map((svc) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                className="glass-card rounded-2xl border border-white/10 p-7 flex flex-col gap-4 hover:border-white/20 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                  <svc.icon aria-hidden="true" className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Design principles + CTA */}
      <section className="py-24 lg:py-32 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Design principles{" "}
                <span className="gradient-text">we live by</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Explored in depth on the Clarity in Every Click podcast. Applied daily in every client engagement.
              </p>
              <ul className="space-y-3">
                {principles.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-foreground/80">
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-primary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-2xl border border-white/10 p-10 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                <Palette aria-hidden="true" className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Work with Pranav</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Limited capacity for new design engagements. Reach out to discuss your project and availability.
                </p>
              </div>
              <Button size="lg" className="rounded-full gap-2 w-full font-semibold" asChild>
                <a href="mailto:pranav@pruxin.com">
                  <Mail aria-hidden="true" className="w-4 h-4" />
                  Email pranav@pruxin.com
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">Usually replies within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  )
}
