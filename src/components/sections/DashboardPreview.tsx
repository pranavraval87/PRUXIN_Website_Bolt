import { useRef } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion"
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { CirclePlus as PlusCircle, CircleArrowDown as ArrowDownCircle, Clock, Phone, CircleCheck as CheckCircle2, Circle as XCircle, PhoneIncoming, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const callData = [
  { day: "Mon", calls: 4 },
  { day: "Tue", calls: 7 },
  { day: "Wed", calls: 5 },
  { day: "Thu", calls: 11 },
  { day: "Fri", calls: 9 },
  { day: "Sat", calls: 6 },
  { day: "Sun", calls: 3 },
]

const recentCalls = [
  {
    caller: "+44 7700 900132",
    time: "09:14",
    duration: "1m 42s",
    status: "answered",
  },
  {
    caller: "+44 7911 123456",
    time: "08:52",
    duration: "0m 58s",
    status: "answered",
  },
  {
    caller: "Unknown",
    time: "08:31",
    duration: "—",
    status: "missed",
  },
]

const quickActions = [
  { icon: <PlusCircle className="w-4 h-4" />, label: "Top Up" },
  { icon: <ArrowDownCircle className="w-4 h-4" />, label: "Withdraw" },
  { icon: <Clock className="w-4 h-4" />, label: "History" },
]

function AnimatedBalance() {
  const ref = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => `£${v.toFixed(2)}`)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) {
      animate(motionVal, 25, { duration: 1.6, ease: "easeOut" })
    }
  }, [inView, motionVal])

  return (
    <div ref={sectionRef}>
      <motion.span
        ref={ref}
        className="text-4xl font-bold gradient-text tabular-nums"
      >
        {display}
      </motion.span>
    </div>
  )
}

export function DashboardPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.50 0.22 264 / 15%) 0%, transparent 65%)",
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
            Product
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Full transparency.{" "}
            <span className="gradient-text">Zero surprises.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A pay-as-you-go model means you only pay for what you use. See every penny, every call, in real time.
          </p>
        </div>

        {/* Dashboard browser panel */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-5xl mx-auto"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-xl pointer-events-none" />

          <div className="relative glass-card rounded-2xl overflow-hidden border border-white/10">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/8 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="flex-1 mx-4">
                <div className="w-52 h-5 rounded-md bg-white/5 mx-auto flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground">
                    app.pruxin.io/dashboard
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* LEFT: Wallet card */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Wallet balance card */}
                <div className="glass-card rounded-xl border border-white/10 p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Wallet Balance
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] text-accent font-semibold">
                        Pay-as-you-go
                      </span>
                    </div>
                  </div>

                  <AnimatedBalance />

                  <p className="text-xs text-muted-foreground">
                    Available credit · refreshes as you top up
                  </p>

                  {/* Quick actions */}
                  <div className="flex gap-2 pt-1">
                    {quickActions.map((action) => (
                      <motion.button
                        key={action.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                          "flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg",
                          "glass-card border border-white/10 text-muted-foreground",
                          "hover:text-foreground hover:border-primary/40 hover:bg-primary/10",
                          "transition-colors duration-200 text-xs font-medium"
                        )}
                      >
                        {action.icon}
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Calls today mini stat */}
                <div className="glass-card rounded-xl border border-white/10 p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                      Calls Today
                    </div>
                    <div className="text-2xl font-bold text-foreground">9</div>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center gap-1 text-accent text-xs font-semibold">
                      <Zap className="w-3 h-3 fill-current" />
                      All handled
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Chart + recent calls */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                {/* Call volume chart */}
                <div className="glass-card rounded-xl border border-white/10 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-foreground">
                      Call Volume
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Last 7 days
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0.6 }}
                    animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    style={{ transformOrigin: "bottom" }}
                    className="h-40"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={callData}
                        margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="callGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="oklch(0.50 0.22 264)"
                              stopOpacity={0.5}
                            />
                            <stop
                              offset="100%"
                              stopColor="oklch(0.50 0.22 264)"
                              stopOpacity={0.02}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="oklch(1 0 0 / 6%)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          tick={{ fill: "oklch(0.60 0.015 240)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "oklch(0.60 0.015 240)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "oklch(0.17 0.03 255)",
                            border: "1px solid oklch(1 0 0 / 10%)",
                            borderRadius: "8px",
                            color: "oklch(0.96 0.005 240)",
                            fontSize: "12px",
                          }}
                          cursor={{ stroke: "oklch(0.88 0.12 196 / 30%)" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="calls"
                          stroke="oklch(0.50 0.22 264)"
                          strokeWidth={2}
                          fill="url(#callGradient)"
                          dot={false}
                          activeDot={{
                            r: 4,
                            fill: "oklch(0.88 0.12 196)",
                            stroke: "oklch(0.13 0.03 255)",
                            strokeWidth: 2,
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                {/* Recent calls */}
                <div className="glass-card rounded-xl border border-white/10 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-foreground">
                      Recent Calls
                    </span>
                    <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                      View all
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {recentCalls.map((call, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.5 + i * 0.1,
                          ease: "easeOut",
                        }}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-white/[0.03] border border-white/5"
                      >
                        <div
                          className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                            call.status === "answered"
                              ? "bg-accent/10"
                              : "bg-destructive/10"
                          )}
                        >
                          {call.status === "answered" ? (
                            <PhoneIncoming className="w-3.5 h-3.5 text-accent" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-foreground truncate">
                            {call.caller}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {call.time} · {call.duration}
                          </div>
                        </div>
                        <div
                          className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                            call.status === "answered"
                              ? "bg-accent/10 text-accent"
                              : "bg-destructive/10 text-destructive"
                          )}
                        >
                          {call.status === "answered" ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Handled
                            </span>
                          ) : (
                            "Missed"
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
