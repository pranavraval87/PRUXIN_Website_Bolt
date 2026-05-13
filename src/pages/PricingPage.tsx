import { useRef } from "react"
import { motion, type Variants } from "framer-motion"
import { Coins, ArrowRight, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"
import { PricingSection } from "@/components/sections/PricingSection"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

const faqItems = [
  {
    q: "Is there a monthly subscription?",
    a: "No. You only pay for the minutes Ruxi works. There are no platform fees, no subscriptions, and no setup costs.",
  },
  {
    q: "What counts as a minute?",
    a: "A minute is 60 seconds of active call time — from when Ruxi answers (inbound) or dials (outbound) to when the call ends. Ringing time before answer is not charged.",
  },
  {
    q: "Do unused credits expire?",
    a: "Credits you top up never expire. The £5 free trial credit is active for 30 days from sign-up.",
  },
  {
    q: "Can I use both inbound and outbound?",
    a: "Yes. Your wallet balance covers both. Inbound calls are billed at £0.18/min and outbound at £0.22/min — drawn from the same balance.",
  },
  {
    q: "What's included with every account?",
    a: "UK phone number, calendar integration, call recording, SMS & email confirmations, GDPR-compliant data handling, and 24/7 availability — all included at no extra cost.",
  },
  {
    q: "Do you offer volume discounts?",
    a: "Yes. If you're processing 1,000+ minutes per month, contact us for custom rates and a dedicated account manager.",
  },
]

export function PricingPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <RootLayout mainRef={mainRef}>
      {/* Hero */}
      <section aria-labelledby="pricing-heading" className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
            <Coins aria-hidden="true" className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <motion.h1
            id="pricing-heading"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl sm:text-6xl font-bold tracking-tight text-balance mb-6 max-w-3xl mx-auto"
          >
            Pay only for what{" "}
            <span className="gradient-text">Ruxi actually does</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10"
          >
            No monthly fees. No platform charges. No contract. Top up your wallet and Ruxi works — you only spend when calls happen.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="rounded-full glow-blue gap-2 px-8 font-semibold" asChild>
              <Link to="/onboarding">
                Claim £5 Free Credit
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2" asChild>
              <a href="mailto:pranav@pruxin.com">
                <MessageSquare aria-hidden="true" className="w-4 h-4" />
                Talk to us
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing section (existing component) */}
      <ErrorBoundary section="PricingSection" inline>
        <PricingSection />
      </ErrorBoundary>

      {/* FAQ */}
      <section aria-labelledby="pricing-faq-heading" className="py-24 lg:py-32 border-t border-white/8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 id="pricing-faq-heading" className="text-4xl font-bold tracking-tight mb-4">
              Pricing{" "}
              <span className="gradient-text">questions answered</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Everything you need to know before you top up.
            </p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="glass-card rounded-2xl border border-white/10 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary section="FinalCTA" inline>
        <FinalCTA />
      </ErrorBoundary>
    </RootLayout>
  )
}
