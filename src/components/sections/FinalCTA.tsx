import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import { track } from "@/lib/analytics"
import { MagneticButton } from "@/components/motion/MagneticButton"

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Strong ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, oklch(0.50 0.22 264 / 18%) 0%, oklch(0.88 0.12 196 / 6%) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/25 bg-accent/8 text-accent text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Now accepting UK businesses
          </div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Stop losing customers{" "}
            <br className="hidden sm:block" />
            to your{" "}
            <span className="gradient-text">voicemail.</span>
          </h2>

          {/* Sub-copy */}
          <p className="text-xl text-muted-foreground max-w-xl">
            Every unanswered call is a customer choosing your competitor. Ruxi is live in under 10 minutes.
          </p>

          {/* Single primary CTA */}
          <MagneticButton>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold text-base px-10 h-14 gap-2.5 rounded-full"
              onClick={() => track({ name: "cta_click", label: "Build my Ruxi now", location: "FinalCTA" })}
            >
              <Zap className="w-5 h-5 fill-current" />
              Build my Ruxi now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </MagneticButton>

          {/* Trust micro-copy */}
          <p className="text-sm text-muted-foreground">
            No credit card · No contract · Live in 10 minutes
          </p>
        </motion.div>
      </div>
    </section>
  )
}
