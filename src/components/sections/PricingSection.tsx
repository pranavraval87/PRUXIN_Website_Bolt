import { useRef, useState } from "react"
import { motion, useInView, animate, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CircleCheck as CheckCircle, PhoneIncoming, PhoneOutgoing, Gift, Zap, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

const includedItems = [
  "Unlimited concurrent calls",
  "Google Calendar integration",
  "Instant SMS & email notifications",
  "Call recording & transcript",
  "GDPR-compliant by default",
  "UK phone number included",
  "24/7 availability — no shift patterns",
  "No setup fee, no contract",
]

function AnimatedCredit({ target, prefix = "£" }: { target: number; prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) => `${prefix}${v.toFixed(2)}`)

  useEffect(() => {
    if (inView) animate(motionVal, target, { duration: 1.2, ease: "easeOut" })
  }, [inView, motionVal, target])

  return (
    <div ref={ref}>
      <motion.span className="text-5xl font-bold gradient-text tabular-nums">
        {display}
      </motion.span>
    </div>
  )
}

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [simMinutes, setSimMinutes] = useState(30)

  const inboundCost = (simMinutes * 0.18).toFixed(2)
  const outboundCost = (simMinutes * 0.22).toFixed(2)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.88 0.12 196 / 5%) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="border-accent/30 text-accent bg-accent/5 mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
          >
            Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            The{" "}
            <span className="gradient-text">transparent wallet</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            No platform fee. No monthly subscription. Pay only for the minutes Ruxi works.
          </p>
        </div>

        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-5 max-w-5xl mx-auto"
        >
          {/* LEFT: Main pricing card */}
          <div className="lg:col-span-3 glass-card rounded-2xl border border-white/10 p-7 flex flex-col gap-6">
            {/* Zero fees banner */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-foreground">£0</div>
                <div className="text-xs text-muted-foreground mt-1">Platform Fee</div>
              </div>
              <div className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-foreground">£0</div>
                <div className="text-xs text-muted-foreground mt-1">Monthly Subscription</div>
              </div>
              <div className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-foreground">£0</div>
                <div className="text-xs text-muted-foreground mt-1">Setup Fee</div>
              </div>
            </div>

            {/* Rates */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Per-minute rates
              </div>
              <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <PhoneIncoming className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">£0.18<span className="text-sm font-normal text-muted-foreground">/min</span></div>
                    <div className="text-xs text-muted-foreground">Inbound calls</div>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <PhoneOutgoing className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">£0.22<span className="text-sm font-normal text-muted-foreground">/min</span></div>
                    <div className="text-xs text-muted-foreground">Outbound calls</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost simulator */}
            <div className="flex flex-col gap-4 bg-white/[0.03] border border-white/8 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Cost simulator
                </span>
                <span className="text-xs text-muted-foreground">{simMinutes} min / month</span>
              </div>
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={simMinutes}
                onChange={(e) => setSimMinutes(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 min</span>
                <span>120 min</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="text-center">
                  <div className="text-xl font-bold gradient-text">£{inboundCost}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Inbound estimate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold gradient-text">£{outboundCost}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Outbound estimate</div>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Everything included
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {includedItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Free trial card */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Free credit card */}
            <div className="relative glass-card rounded-2xl overflow-hidden border border-accent/25 p-7 flex flex-col gap-5">
              {/* Glow ring */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-primary/20 pointer-events-none" />

              <div className="relative flex flex-col gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                  <Gift className="w-6 h-6" />
                </div>

                <div>
                  <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">
                    Free Trial
                  </div>
                  <AnimatedCredit target={5} />
                  <div className="text-sm text-muted-foreground mt-2">
                    Free credit — no card required
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">Enough for ~27 inbound minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">Full feature access from day one</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">No contract, cancel any time</span>
                  </div>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold gap-2">
                  <Zap className="w-4 h-4 fill-current" />
                  Claim £5 Free Credit
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <p className="text-[10px] text-muted-foreground text-center">
                  No credit card required · Active for 30 days
                </p>
              </div>
            </div>

            {/* Enterprise note */}
            <div className={cn(
              "glass-card rounded-2xl border border-white/10 px-5 py-4",
              "flex items-start gap-3"
            )}>
              <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-foreground mb-0.5">Volume discounts</div>
                <p className="text-xs text-muted-foreground leading-snug">
                  Handling 1,000+ minutes a month? Contact us for custom rates and a dedicated account manager.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
