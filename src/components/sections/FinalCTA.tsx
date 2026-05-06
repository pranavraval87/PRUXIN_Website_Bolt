import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, CalendarDays } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { track } from "@/lib/analytics"
import { MagneticButton } from "@/components/motion/MagneticButton"

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const { theme } = useTheme()
  const isLight = theme === "light"

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Strong ambient glow — makes this section feel like a spotlight */}
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
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Every unanswered call is a customer sizing up your competitor.
            Ruxi is live in under 10 minutes — no engineers, no contracts, no risk.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <MagneticButton>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold text-base px-8 h-14 gap-2.5 min-w-48"
                onClick={() => track({ name: "cta_click", label: "Book a Demo", location: "FinalCTA" })}
              >
                <CalendarDays className="w-5 h-5" />
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </MagneticButton>
            <Button
              size="lg"
              variant="outline"
              className="border-accent/30 text-accent bg-accent/5 hover:bg-accent/10 hover:border-accent/50 font-semibold text-base px-8 h-14 gap-2.5 min-w-48"
              onClick={() => track({ name: "cta_click", label: "Claim Free Credit", location: "FinalCTA" })}
            >
              <Zap className="w-5 h-5 fill-current" />
              Claim £5 Free Credit
            </Button>
          </div>

          {/* Trust micro-copy */}
          <p className="text-sm text-muted-foreground">
            No credit card · No contract · Live in 10 minutes
          </p>
        </motion.div>

        {/* Bottom logo + copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <img
            src={isLight ? "/Pruxin_logo_DARK copy.svg" : "/Pruxin_logo_LIGHT copy.svg"}
            alt="PRUXIN"
            className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
          <p className="text-xs text-muted-foreground">
            © 2026 PRUXIN. All rights reserved. Registered in England &amp; Wales.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#gdpr" className="hover:text-foreground transition-colors">GDPR</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
