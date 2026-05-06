import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Star, TrendingUp } from "lucide-react"
import { track } from "@/lib/analytics"
import { MagneticButton } from "@/components/motion/MagneticButton"
import { RuxiLiveCard } from "@/components/sections/RuxiLiveCard"
import type { CallState } from "@/lib/vapiClient"

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function HeroSection() {
  const [callState, setCallState] = useState<CallState>("idle")
  const isCallActive = callState === "active"

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── Left column: copy ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            {/* Trust badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card glow-cyan border border-accent/20 text-sm text-foreground/80">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-medium">Trusted by</span>
                <span className="gradient-text font-bold">10,000+ teams</span>
                <span className="text-muted-foreground">worldwide</span>
              </div>
            </motion.div>

            {/* Primary headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
            >
              The intelligence layer{" "}
              <br className="hidden sm:block" />
              your workflow{" "}
              <span className="animated-gradient-text">deserves</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10"
            >
              PRUXIN unifies your team's knowledge, automates repetitive decisions,
              and surfaces the right context — exactly when you need it.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
            >
              <MagneticButton>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue transition-all duration-300 font-semibold px-8 h-12 text-base group"
                  onClick={() => track({ name: "cta_click", label: "Start Free Trial", location: "HeroSection" })}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/5 hover:bg-white/10 text-foreground font-semibold px-8 h-12 text-base group backdrop-blur-sm"
                onClick={() => track({ name: "cta_click", label: "Watch Demo", location: "HeroSection" })}
              >
                <Play className="mr-2 w-4 h-4 fill-current text-accent" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Social proof micro-stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span>10k+ active teams</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent fill-current" />
                <span>4.9 / 5 on G2</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span>3× faster decisions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column: RuxiLiveCard with pulsing aura ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full"
          >
            {/* Pulsing cyan aura */}
            <motion.div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              animate={
                isCallActive
                  ? {
                      boxShadow: [
                        "0 0 50px 4px oklch(0.88 0.12 196 / 45%), 0 0 100px 16px oklch(0.88 0.12 196 / 20%)",
                        "0 0 80px 8px oklch(0.88 0.12 196 / 65%), 0 0 160px 24px oklch(0.88 0.12 196 / 30%)",
                        "0 0 50px 4px oklch(0.88 0.12 196 / 45%), 0 0 100px 16px oklch(0.88 0.12 196 / 20%)",
                      ],
                    }
                  : {
                      boxShadow: [
                        "0 0 40px 0px oklch(0.88 0.12 196 / 25%), 0 0 80px 8px oklch(0.88 0.12 196 / 10%)",
                        "0 0 60px 4px oklch(0.88 0.12 196 / 45%), 0 0 120px 16px oklch(0.88 0.12 196 / 18%)",
                        "0 0 40px 0px oklch(0.88 0.12 196 / 25%), 0 0 80px 8px oklch(0.88 0.12 196 / 10%)",
                      ],
                    }
              }
              transition={{
                duration: isCallActive ? 1.8 : 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <RuxiLiveCard compact onCallStateChange={setCallState} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
