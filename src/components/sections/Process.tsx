import { Badge } from "@/components/ui/badge"
import { FadeUp } from "@/components/motion/FadeUp"
import { Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StoryMoment {
  step: string
  label: string
  headline: string
  caption: string
  imageHint: string
  accent: "cyan" | "blue"
}

const moments: StoryMoment[] = [
  {
    step: "01",
    label: "Answer",
    headline: "Ruxi picks up. Every time.",
    caption: "Sounds human. Speaks your brand.",
    imageHint: "IMAGE: Ruxi Inbound Call Transcript UI — show the live call screen with caller ID, greeting script, and real-time transcript stream",
    accent: "cyan",
  },
  {
    step: "02",
    label: "Understand",
    headline: "Intent classified in seconds.",
    caption: "Booking, FAQ, complaint, or emergency — routed instantly.",
    imageHint: "IMAGE: Intent Classification Dashboard — show the AI intent panel with colour-coded categories (Booking / FAQ / Urgent) and confidence scores",
    accent: "blue",
  },
  {
    step: "03",
    label: "Act",
    headline: "Bookings made. Slots filled.",
    caption: "Straight into your calendar. No lift required.",
    imageHint: "IMAGE: Calendar Booking Confirmation UI — show the Google Calendar event creation modal with date picker, customer name pre-filled, and 'Confirmed' status",
    accent: "cyan",
  },
  {
    step: "04",
    label: "Notify",
    headline: "A clean summary in your pocket.",
    caption: "Caller details, intent, action taken. Nothing more.",
    imageHint: "IMAGE: SMS & Email Notification Preview — show a mobile phone mock with the Ruxi summary SMS: caller name, intent tag, action taken, follow-up flag",
    accent: "blue",
  },
]

function ImagePlaceholder({
  hint,
  accent,
}: {
  hint: string
  accent: "cyan" | "blue"
}) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
      {/* Ambient inner glow */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          accent === "cyan"
            ? "bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,oklch(0.88_0.12_196_/_12%)_0%,transparent_70%)]"
            : "bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,oklch(0.50_0.22_264_/_12%)_0%,transparent_70%)]"
        )}
        aria-hidden="true"
      />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Centre icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center border",
            accent === "cyan"
              ? "bg-accent/10 border-accent/25 text-accent"
              : "bg-primary/10 border-primary/25 text-primary"
          )}
        >
          <ImageIcon className="w-5 h-5" />
        </div>
        <p className="text-[11px] font-mono text-center text-muted-foreground/70 leading-relaxed max-w-xs">
          {hint}
        </p>
      </div>

      {/* Corner badge */}
      <div className="absolute top-3 left-3">
        <span
          className={cn(
            "text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded border",
            accent === "cyan"
              ? "bg-accent/10 border-accent/20 text-accent"
              : "bg-primary/10 border-primary/20 text-primary"
          )}
        >
          Placeholder
        </span>
      </div>
    </div>
  )
}

export function Process() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, oklch(0.88 0.12 196 / 6%) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp className="text-center mb-20">
          <Badge
            variant="outline"
            className="border-accent/30 text-accent bg-accent/5 mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
          >
            How it Works
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Meet <span className="gradient-text">Ruxi</span> — your AI receptionist
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Four steps. Ring to resolution. No scripts to write.
          </p>
        </FadeUp>

        {/* Story moments — alternating layout */}
        <div className="flex flex-col gap-24">
          {moments.map((moment, i) => {
            const isEven = i % 2 === 0
            return (
              <FadeUp key={moment.step} delay={0.05}>
                <div
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                    !isEven && "lg:[&>*:first-child]:order-2"
                  )}
                >
                  {/* Image container */}
                  <div className="relative">
                    {/* Outer glow */}
                    <div
                      className={cn(
                        "absolute -inset-2 rounded-2xl blur-xl pointer-events-none opacity-50",
                        moment.accent === "cyan"
                          ? "bg-gradient-to-br from-accent/20 to-transparent"
                          : "bg-gradient-to-br from-primary/20 to-transparent"
                      )}
                    />
                    <div className="relative glass-card rounded-2xl border border-white/10 p-3">
                      {/* Window chrome */}
                      <div className="flex items-center gap-1.5 px-2 pb-2.5 mb-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                      </div>
                      <ImagePlaceholder hint={moment.imageHint} accent={moment.accent} />
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-xs font-bold tracking-widest uppercase",
                          moment.accent === "cyan" ? "text-accent" : "text-primary"
                        )}
                      >
                        {moment.step}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-semibold px-2.5 py-0.5 tracking-wide border",
                          moment.accent === "cyan"
                            ? "border-accent/30 text-accent bg-accent/8"
                            : "border-primary/30 text-primary bg-primary/8"
                        )}
                      >
                        {moment.label}
                      </Badge>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                      {moment.headline}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {moment.caption}
                    </p>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
