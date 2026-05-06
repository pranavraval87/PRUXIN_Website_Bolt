import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  duration: number
  waveform: number[]
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "Meridian Labs",
    quote: "PRUXIN cut our incident response time in half. Our on-call engineers actually sleep now.",
    duration: 47,
    waveform: [3,5,8,12,18,22,28,35,40,44,48,50,46,42,38,32,28,22,18,14,10,8,6,4,3,5,9,14,20,26,32,38,44,48,50,47,42,36,30,24,18,13,9,6,4,3,5,8,11,16,21,27,33,39,44,48,50,46,40,34,28,22,16,10,7,4,3],
  },
  {
    id: "2",
    name: "Marcus Reid",
    role: "CTO",
    company: "Fieldstone",
    quote: "We evaluated twelve tools. PRUXIN was the only one that felt like it was built for how we actually work.",
    duration: 52,
    waveform: [4,6,10,15,21,28,34,40,46,50,48,44,38,32,26,20,15,11,8,5,4,6,11,17,24,31,37,43,48,50,47,41,35,29,23,17,12,8,5,4,6,10,16,22,29,36,42,47,50,48,43,37,31,25,19,14,9,6,4,3,5,8,12,17,22,28,34],
  },
  {
    id: "3",
    name: "Priya Nair",
    role: "Head of Product",
    company: "Sundial",
    quote: "The onboarding alone is a masterclass. Our team was fully productive in under two hours.",
    duration: 39,
    waveform: [5,8,13,19,25,31,37,43,48,50,47,41,35,29,23,17,12,8,5,4,6,10,16,22,28,34,40,46,50,49,44,38,32,26,20,14,9,6,4,3,5,9,14,20,26,32,38,44,49,50,46,40,34,28,22,16,10,7,4,3,5,8,12,18,23,29,35],
  },
  {
    id: "4",
    name: "Daniel Frost",
    role: "Engineering Manager",
    company: "Quorum",
    quote: "I've never seen a product ship so fast without breaking things. PRUXIN is how we stay ahead.",
    duration: 44,
    waveform: [3,6,10,15,20,26,32,38,44,49,50,46,40,34,28,22,16,11,7,4,3,6,10,16,22,28,34,40,46,50,48,42,36,30,24,18,12,8,5,3,5,9,14,20,26,32,38,44,49,50,46,40,34,28,22,16,11,7,4,3,5,8,12,17,22,27,33],
  },
]

function WaveformBar({ height, active, played }: { height: number; active: boolean; played: boolean }) {
  return (
    <div
      className={cn(
        "w-[3px] rounded-full transition-all duration-150 flex-shrink-0",
        played
          ? "bg-accent opacity-90"
          : active
          ? "bg-accent/50"
          : "bg-white/15"
      )}
      style={{ height: `${(height / 50) * 48 + 4}px` }}
    />
  )
}

function AudioCard({ testimonial }: { testimonial: Testimonial }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setIsPlaying(false)
            return 0
          }
          return prev + 100 / (testimonial.duration * 10)
        })
      }, 100)
    }
  }, [isPlaying, testimonial.duration])

  const playedBarCount = Math.floor((progress / 100) * testimonial.waveform.length)
  const activeBarIndex = playedBarCount

  const formatTime = (pct: number) => {
    const secs = Math.floor((pct / 100) * testimonial.duration)
    return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`
  }

  return (
    <div className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col gap-5 min-w-[300px] max-w-[360px] flex-shrink-0 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] group">
      {/* Quote icon */}
      <Quote className="w-5 h-5 text-accent/60" />

      {/* Quote text */}
      <p className="text-foreground/90 text-sm leading-relaxed flex-1">
        "{testimonial.quote}"
      </p>

      {/* Waveform visualizer */}
      <div className="flex items-center gap-[2px] h-14">
        {testimonial.waveform.map((h, i) => (
          <WaveformBar
            key={i}
            height={h}
            active={i === activeBarIndex && isPlaying}
            played={i < playedBarCount}
          />
        ))}
      </div>

      {/* Scrubber */}
      <div className="space-y-2">
        <Slider
          value={[progress]}
          onValueChange={([val]) => setProgress(val)}
          min={0}
          max={100}
          step={0.1}
          className="[&_[data-slot=slider-thumb]]:w-3 [&_[data-slot=slider-thumb]]:h-3 [&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-range]]:bg-accent"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(100)}</span>
        </div>
      </div>

      {/* Footer: avatar + play */}
      <div className="flex items-center justify-between pt-1 border-t border-white/8">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-white/10">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
              {testimonial.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-foreground leading-none mb-0.5">
              {testimonial.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {testimonial.role} · {testimonial.company}
            </div>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
            "bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50",
            isPlaying && "glow-blue"
          )}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-primary fill-current" />
          ) : (
            <Play className="w-4 h-4 text-primary fill-current ml-0.5" />
          )}
        </button>
      </div>
    </div>
  )
}

export function AudioSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Section ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.88 0.12 196 / 8%) 0%, transparent 70%)",
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
            Customer Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Hear it from the{" "}
            <span className="gradient-text">people building</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Real engineers and leaders sharing how PRUXIN changed how their teams operate.
          </p>
        </div>

        {/* Scrollable card row */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-6 px-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="snap-start">
              <AudioCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-muted-foreground text-sm mb-4">
            Join thousands of teams who've already made the switch
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold px-8"
          >
            Read All Case Studies
          </Button>
        </div>
      </div>
    </section>
  )
}
