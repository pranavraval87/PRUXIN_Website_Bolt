import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, ArrowLeft, CircleCheck as CheckCircle } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { RuxiLiveCard } from "@/components/sections/RuxiLiveCard"
import { TrustSection } from "@/components/sections/TrustSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { getIndustry } from "@/data/industries"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

export function IndustryPage() {
  const { slug } = useParams<{ slug: string }>()
  const industry = slug ? getIndustry(slug) : undefined
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" })

  if (!industry) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
          <h1 className="text-4xl font-bold text-foreground">Industry not found</h1>
          <p className="text-muted-foreground">
            We don't have a page for that industry yet — but Ruxi works for any business that takes calls.
          </p>
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </main>
      </>
    )
  }

  const { seo } = industry

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <link rel="canonical" href={`https://pruxin.io${seo.canonicalPath}`} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={`https://pruxin.io${seo.canonicalPath}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.ogTitle} />
        <meta name="twitter:description" content={seo.ogDescription} />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
          <div className="hero-glow absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to PRUXIN
            </Link>

            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <Badge
                variant="outline"
                className="border-accent/30 text-accent bg-accent/5 mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
              >
                AI Receptionist for {industry.name}
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                {industry.headline}{" "}
                <span className="gradient-text">{industry.headlineAccent}</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                {industry.subCopy}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold text-base px-8 h-14 gap-2.5"
                  onClick={() =>
                    track({ name: "cta_click", label: "Book a Demo", location: `IndustryPage-${slug}` })
                  }
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Book a Free Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent/30 text-accent bg-accent/5 hover:bg-accent/10 hover:border-accent/50 font-semibold text-base px-8 h-14 gap-2.5"
                  onClick={() =>
                    track({ name: "cta_click",
                      label: "Claim Free Credit",
                      location: `IndustryPage-${slug}`,
                    })
                  }
                >
                  Claim £5 Free Credit
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pain points */}
        <PainPointsSection industry={industry} />

        {/* Live demo */}
        <RuxiLiveCard industrySlug={slug} />

        {/* Example transcript */}
        <TranscriptSection industry={industry} />

        {/* Trust */}
        <TrustSection />

        {/* Pricing */}
        <PricingSection />

        {/* Final CTA */}
        <FinalCTA />
      </main>
    </>
  )
}

function PainPointsSection({ industry }: { industry: ReturnType<typeof getIndustry> }) {
  if (!industry) return null
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Sound familiar?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {industry.painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="glass-card rounded-xl border border-white/10 p-4 flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                <span className="text-sm text-muted-foreground leading-snug">{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TranscriptSection({ industry }: { industry: ReturnType<typeof getIndustry> }) {
  if (!industry) return null
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-3 text-center">
            How Ruxi handles{" "}
            <span className="gradient-text">{industry.name.toLowerCase()}</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            A real example of how Ruxi greets and assists your callers.
          </p>

          <div className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col gap-4">
            {industry.transcript.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12, ease: "easeOut" }}
                className={cn(
                  "flex gap-3 max-w-[88%]",
                  line.speaker === "caller" ? "self-end flex-row-reverse" : "self-start"
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                    line.speaker === "ruxi"
                      ? "bg-accent/15 border border-accent/25 text-accent"
                      : "bg-white/10 border border-white/15 text-muted-foreground"
                  )}
                >
                  {line.speaker === "ruxi" ? "R" : "C"}
                </div>
                <div
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm leading-relaxed",
                    line.speaker === "ruxi"
                      ? "bg-accent/8 border border-accent/15 text-foreground/90"
                      : "bg-white/[0.06] border border-white/10 text-muted-foreground"
                  )}
                >
                  {line.text}
                </div>
              </motion.div>
            ))}

            <div className="flex items-center gap-2 pt-2 border-t border-white/8">
              <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="text-[11px] text-accent font-semibold">
                Recording disclosure delivered · Intent classified · Action taken
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
