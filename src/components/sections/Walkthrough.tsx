import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeUp } from "@/components/motion/FadeUp"
import { MagneticButton } from "@/components/motion/MagneticButton"

export function Walkthrough() {
  const [hovered, setHovered] = useState(false)

  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      {/* Ambient glow — strong cinematic spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.50 0.22 264 / 16%) 0%, oklch(0.88 0.12 196 / 5%) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp className="text-center mb-16">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary bg-primary/5 mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
          >
            60-Second Walkthrough
          </Badge>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08]">
            See how Ruxi joins your team
            <br className="hidden sm:block" />
            in <span className="animated-gradient-text">60 seconds</span>
          </h2>
        </FadeUp>

        {/* Cinematic 3D-tilted container */}
        <FadeUp delay={0.15}>
          <div
            className="relative mx-auto"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              initial={{ rotateX: 6, rotateY: -2, scale: 0.97 }}
              whileInView={{ rotateX: 4, rotateY: -1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              animate={hovered ? { rotateX: 1, rotateY: 0.5, scale: 1.01 } : {}}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Outer multi-layer glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/25 via-accent/15 to-primary/25 blur-xl pointer-events-none" />
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/8 to-primary/10 blur-2xl pointer-events-none" />

              {/* Video panel */}
              <div className="relative glass-card rounded-2xl border border-white/12 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8 bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <div className="flex-1 mx-4">
                    <div className="w-56 h-5 rounded-md bg-white/5 mx-auto flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground">pruxin.io/walkthrough</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] text-accent font-semibold">Live Demo</span>
                  </div>
                </div>

                {/* Video placeholder — aspect-video */}
                <div className="relative aspect-video bg-background/60">
                  {/* Inner gradient for depth */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 60% at 50% 45%, oklch(0.50 0.22 264 / 18%) 0%, oklch(0.13 0.03 255 / 80%) 60%, oklch(0.13 0.03 255) 100%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Grid lines */}
                  <div
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                    aria-hidden="true"
                  />

                  {/* Developer overlay label */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1.5 rounded border border-primary/25 bg-primary/10 text-primary">
                      VIDEO: Ruxi 60-second product walkthrough — screen recording showing: (1) inbound call answered, (2) AI transcript live, (3) booking confirmed in Google Calendar, (4) SMS notification sent to owner
                    </span>
                  </div>

                  {/* Play button centrepiece */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <MagneticButton strength={0.2}>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className={cn(
                          "relative w-20 h-20 rounded-full flex items-center justify-center",
                          "bg-primary text-primary-foreground glow-blue",
                          "border border-primary/40 transition-shadow duration-300",
                          hovered && "shadow-[0_0_60px_8px_oklch(0.50_0.22_264_/_50%)]"
                        )}
                        aria-label="Play Walkthrough"
                      >
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border border-primary/30"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border border-primary/20"
                          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        />
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </motion.button>
                    </MagneticButton>

                    <p className="text-sm text-muted-foreground font-medium">
                      Play Walkthrough <span className="text-accent">· 60s</span>
                    </p>
                  </div>

                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </FadeUp>

        {/* Sub-copy — tight, benefit-first */}
        <FadeUp delay={0.25} className="text-center mt-12">
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            No engineers. No contracts. Live in under 10 minutes.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
