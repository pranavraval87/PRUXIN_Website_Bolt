import { useState } from "react"
import { motion } from "framer-motion"
import { PoundSterling, TrendingUp, Clock, Users } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { track } from "@/lib/analytics"

const MISSED_CALL_VALUE = 120 // £ average value per missed call (UK SME)
const RECEPTIONIST_ANNUAL = 28000 // £ average UK receptionist salary + on-costs
const RUXI_ANNUAL = 216 // £ minimum annual Ruxi spend (£18/mo)

function formatGBP(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n)
}

export function ReplacementCalculator() {
  const [missedPerWeek, setMissedPerWeek] = useState(10)
  const [hasReceptionist, setHasReceptionist] = useState(true)

  const annualMissedRevenue = missedPerWeek * 52 * MISSED_CALL_VALUE
  const receptionistCost = hasReceptionist ? RECEPTIONIST_ANNUAL : 0
  const totalLoss = annualMissedRevenue + receptionistCost - RUXI_ANNUAL
  const savings = Math.max(totalLoss, 0)

  const metrics = [
    {
      icon: PoundSterling,
      label: "Annual revenue saved",
      value: formatGBP(annualMissedRevenue),
      sub: `${missedPerWeek} missed calls × 52 weeks × £${MISSED_CALL_VALUE}`,
      accent: true,
    },
    {
      icon: Users,
      label: "Receptionist replaced",
      value: hasReceptionist ? formatGBP(RECEPTIONIST_ANNUAL) : "N/A",
      sub: hasReceptionist ? "Salary + on-costs eliminated" : "No receptionist on payroll",
      accent: false,
    },
    {
      icon: TrendingUp,
      label: "Net annual saving",
      value: formatGBP(savings),
      sub: "vs. status quo",
      accent: true,
    },
  ]

  return (
    <section id="calculator" className="py-24 lg:py-32 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-6">
            <Clock className="w-3.5 h-3.5" />
            Replacement Value Calculator
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance mb-4">
            How much is your voicemail{" "}
            <span className="gradient-text">costing you?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The average UK SME misses 62% of calls. Every missed call is a missed
            booking. See your number.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Controls */}
          <div className="glass-card rounded-2xl border border-white/10 p-8 space-y-10">
            {/* Slider: missed calls */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">
                  Missed calls per week
                </label>
                <span className="text-2xl font-bold gradient-text tabular-nums">
                  {missedPerWeek}
                </span>
              </div>
              <Slider
                min={1}
                max={60}
                step={1}
                value={[missedPerWeek]}
                onValueChange={([v]) => setMissedPerWeek(v)}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1</span>
                <span>60</span>
              </div>
            </div>

            {/* Toggle: receptionist */}
            <div>
              <p className="text-sm font-medium text-foreground mb-4">
                Do you currently pay a receptionist?
              </p>
              <div className="flex gap-3">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    onClick={() => setHasReceptionist(val)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                      hasReceptionist === val
                        ? "bg-primary/15 border-primary/50 text-primary glow-blue"
                        : "glass-card border-white/10 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {val ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>

            {/* Assumptions note */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              Assumptions: £{MISSED_CALL_VALUE} average job value (UK SME median),{" "}
              {formatGBP(RECEPTIONIST_ANNUAL)} salary + NI + pension. Ruxi cost based on minimum usage.
            </p>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl border border-white/10 p-6 flex items-start gap-5"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    m.accent
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <m.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {m.label}
                  </p>
                  <p
                    className={`text-3xl font-bold tabular-nums tracking-tight ${
                      m.accent ? "gradient-text" : "text-foreground"
                    }`}
                  >
                    {m.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
                </div>
              </motion.div>
            ))}

            <Button
              size="lg"
              className="w-full rounded-full glow-blue font-semibold mt-2"
              onClick={() =>
                track({ name: "cta_click", label: "Start saving now", location: "Calculator" })
              }
            >
              Start saving {formatGBP(savings)} now
              <TrendingUp className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
