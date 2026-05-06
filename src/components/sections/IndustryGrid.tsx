import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Wrench,
  Stethoscope,
  UtensilsCrossed,
  HardHat,
} from "lucide-react"

interface BentoTile {
  icon: React.ReactNode
  industry: string
  headline: string
  body: string
  span?: string
}

const tiles: BentoTile[] = [
  {
    icon: <Scale className="w-8 h-8" />,
    industry: "Solicitors",
    headline: "From Missed Briefs to Billed Hours",
    body: "Every missed call is a client lost. Ruxi captures every enquiry, day or night.",
    span: "md:col-span-4",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    industry: "Garages",
    headline: "From Missed Bookings to Full Bays",
    body: "Under a bonnet? Ruxi takes the booking and sends you the details.",
    span: "md:col-span-4",
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    industry: "Clinics",
    headline: "Seamless Scheduling, Zero Missed Appointments",
    body: "Ruxi handles front-desk calls so your team can focus on patients.",
    span: "md:col-span-4",
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8" />,
    industry: "Restaurants",
    headline: "From Missed Calls to Full Tables",
    body: "Busy during service? Ruxi takes reservations without interrupting the kitchen.",
    span: "md:col-span-6",
  },
  {
    icon: <HardHat className="w-8 h-8" />,
    industry: "Trades",
    headline: "From On-Site to On-the-Books",
    body: "On a roof? Every missed call is a job worth hundreds. Ruxi books it.",
    span: "md:col-span-6",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      delay: i * 0.1,
    },
  }),
}

function BentoCard({ tile, index }: { tile: BentoTile; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn(
        "glass-card rounded-2xl border border-white/10 p-7 flex flex-col gap-5",
        "transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07] group",
        tile.span
      )}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent/15 group-hover:glow-cyan">
        {tile.icon}
      </div>

      {/* Industry badge */}
      <Badge
        variant="outline"
        className="w-fit border-white/15 text-muted-foreground bg-white/5 text-xs font-medium tracking-wide uppercase"
      >
        {tile.industry}
      </Badge>

      {/* Headline */}
      <h3 className="text-xl font-bold tracking-tight text-foreground leading-snug">
        {tile.headline}
      </h3>

      {/* Body */}
      <p className="text-sm text-muted-foreground leading-[1.6] mt-auto">
        {tile.body}
      </p>
    </motion.div>
  )
}

export function IndustryGrid() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.50 0.22 264 / 8%) 0%, transparent 70%)",
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
            Built for Your Industry
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
            Purpose-built for{" "}
            <span className="gradient-text">UK small businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-[1.6]">
            Built for your sector. Not just phone calls.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {tiles.map((tile, i) => (
            <BentoCard key={tile.industry} tile={tile} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
