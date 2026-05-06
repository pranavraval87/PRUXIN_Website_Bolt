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
    body: "Every unanswered call is a potential client lost to the firm down the street. Capture every enquiry, day or night.",
    span: "md:col-span-4",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    industry: "Garages",
    headline: "From Missed Bookings to Full Bays",
    body: "When you're under a bonnet you can't answer the phone. PRUXIN takes the booking and sends you the details.",
    span: "md:col-span-4",
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    industry: "Clinics",
    headline: "From Overloaded Reception to Seamless Scheduling",
    body: "Reduce front-desk pressure and missed appointments with intelligent call handling built for healthcare.",
    span: "md:col-span-4",
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8" />,
    industry: "Restaurants",
    headline: "From Missed Calls to Full Tables",
    body: "Your team is busy during service. PRUXIN captures reservations and special requests without interrupting the kitchen.",
    span: "md:col-span-6",
  },
  {
    icon: <HardHat className="w-8 h-8" />,
    industry: "Trades",
    headline: "From On-Site to On-the-Books",
    body: "On a roof or up a ladder, you can't always answer. Every missed call could be a job worth hundreds. Don't lose it.",
    span: "md:col-span-6",
  },
]

function BentoCard({ tile }: { tile: BentoTile }) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl border border-white/10 p-7 flex flex-col gap-5",
        "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] group",
        tile.span
      )}
    >
      {/* Icon with cyan glow */}
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
      <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
        {tile.body}
      </p>
    </div>
  )
}

export function IndustryGrid() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
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
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Purpose-built for{" "}
            <span className="gradient-text">UK small businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            PRUXIN understands the patterns, terminology, and pressures of your sector — not just phone calls.
          </p>
        </div>

        {/* Bento grid — 12 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {tiles.map((tile) => (
            <BentoCard key={tile.industry} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  )
}
