import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Zap,
  ArrowRight,
  Volume2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { track } from "@/lib/analytics"
import { MagneticButton } from "@/components/motion/MagneticButton"
import {
  startCall,
  stopCall,
  setMuted,
  onCallEnd,
  onVolumeLevel,
  onSpeechStart,
  onSpeechEnd,
  ASSISTANT_ID,
  type CallState,
} from "@/lib/vapiClient"

const NUM_BARS = 40

interface Props {
  industrySlug?: string
  /** Remove outer section padding — used when embedded inside HeroSection */
  compact?: boolean
  /** Notify parent when call state changes (for pulsing aura) */
  onCallStateChange?: (state: CallState) => void
}

export function RuxiLiveCard({ industrySlug, compact = false, onCallStateChange }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  const [callState, setCallState] = useState<CallState>("idle")
  const [isMuted, setIsMuted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [volumeBars, setVolumeBars] = useState<number[]>(Array(NUM_BARS).fill(0.1))
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  const updateCallState = useCallback((state: CallState) => {
    setCallState(state)
    onCallStateChange?.(state)
  }, [onCallStateChange])

  // Ambient idle shimmer
  useEffect(() => {
    if (callState !== "idle") return
    const interval = setInterval(() => {
      setVolumeBars(
        Array.from({ length: NUM_BARS }, (_, i) => {
          const wave = Math.sin((Date.now() / 600) + i * 0.4) * 0.12
          return 0.08 + wave + Math.random() * 0.04
        })
      )
    }, 80)
    return () => clearInterval(interval)
  }, [callState])

  const handleVolume = useCallback((volume: number) => {
    setIsSpeaking(volume > 0.05)
    setVolumeBars(
      Array.from({ length: NUM_BARS }, (_, i) => {
        const envelope = Math.sin((i / NUM_BARS) * Math.PI)
        return Math.min(1, volume * 3 * envelope + 0.06 + Math.random() * 0.05)
      })
    )
  }, [])

  const handleStart = useCallback(async () => {
    updateCallState("requesting")
    track({ name: "vapi_call_start", industry_slug: industrySlug })
    try {
      await startCall(ASSISTANT_ID)
      updateCallState("active")
      startTimeRef.current = Date.now()
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 1000)
    } catch {
      updateCallState("idle")
    }
  }, [industrySlug, updateCallState])

  const handleStop = useCallback(() => {
    stopCall()
    if (timerRef.current) clearInterval(timerRef.current)
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000)
    track({ name: "vapi_call_end", duration_seconds: duration })
    updateCallState("ended")
    setElapsed(0)
    setVolumeBars(Array(NUM_BARS).fill(0.1))
    setIsUserSpeaking(false)
    setIsSpeaking(false)
  }, [updateCallState])

  const toggleMute = useCallback(() => {
    const next = !isMuted
    setIsMuted(next)
    setMuted(next)
  }, [isMuted])

  useEffect(() => {
    const unsubEnd = onCallEnd(() => {
      if (timerRef.current) clearInterval(timerRef.current)
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000)
      track({ name: "vapi_call_end", duration_seconds: duration })
      updateCallState("ended")
      setElapsed(0)
      setVolumeBars(Array(NUM_BARS).fill(0.1))
      setIsUserSpeaking(false)
      setIsSpeaking(false)
    })
    const unsubVolume = onVolumeLevel(handleVolume)
    const unsubSpeechStart = onSpeechStart(() => setIsUserSpeaking(true))
    const unsubSpeechEnd = onSpeechEnd(() => setIsUserSpeaking(false))
    return () => {
      unsubEnd()
      unsubVolume()
      unsubSpeechStart()
      unsubSpeechEnd()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [handleVolume, updateCallState])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  const barColor =
    callState === "active" && isSpeaking
      ? "bg-accent"
      : callState === "active" && isUserSpeaking
      ? "bg-primary"
      : callState === "active"
      ? "bg-primary/40"
      : "bg-white/20"

  const speakerLabel =
    isSpeaking ? "Ruxi is speaking…" : isUserSpeaking ? "You are speaking…" : "Listening…"

  const cardContent = (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="w-full"
    >
      <div className="relative">
        <div
          className={cn(
            "absolute -inset-1 rounded-2xl blur-xl pointer-events-none transition-all duration-700",
            callState === "active"
              ? "bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30"
              : "bg-gradient-to-r from-primary/15 via-accent/8 to-primary/15"
          )}
        />

        <div className="relative glass-card glass-card-hover rounded-2xl border border-white/10 p-8 flex flex-col items-center gap-7">
          {/* Waveform */}
          <div className="w-full flex items-end justify-center gap-[2px] h-16">
            {volumeBars.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: `${Math.round(h * 64)}px` }}
                transition={{ duration: 0.08, ease: "easeOut" }}
                className={cn(
                  "w-1 rounded-full flex-shrink-0 transition-colors duration-300",
                  barColor
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {callState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-semibold text-accent">Ruxi is ready</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Click below and your browser will ask to use your microphone. Ruxi will greet you just as it would your customers.
                </p>
                <MagneticButton>
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold gap-2.5 px-8"
                    onClick={() => {
                      track({ name: "cta_click", label: "Talk to Ruxi", location: "RuxiLiveCard" })
                      handleStart()
                    }}
                  >
                    <Mic className="w-5 h-5" />
                    Talk to Ruxi — it&apos;s free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </MagneticButton>
                <p className="text-[11px] text-muted-foreground">
                  Uses your microphone · No account required · Ends when you hang up
                </p>
              </motion.div>
            )}

            {callState === "requesting" && (
              <motion.div
                key="requesting"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                <p className="text-sm font-semibold text-foreground">Connecting to Ruxi…</p>
                <p className="text-xs text-muted-foreground">Allow microphone access when prompted</p>
              </motion.div>
            )}

            {callState === "active" && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-5 w-full"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={speakerLabel}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: (isSpeaking || isUserSpeaking) ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.4, repeat: (isSpeaking || isUserSpeaking) ? Infinity : 0 }}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        isSpeaking ? "bg-accent" : isUserSpeaking ? "bg-primary" : "bg-white/30"
                      )}
                    />
                    <span className="text-sm font-semibold text-foreground">{speakerLabel}</span>
                    <span className="text-sm font-mono text-muted-foreground tabular-nums">
                      {formatTime(elapsed)}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={toggleMute}
                    className={cn(
                      "flex-1 gap-2 border-white/15 hover:border-white/30",
                      isMuted && "border-destructive/40 text-destructive bg-destructive/5"
                    )}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isMuted ? "Unmute" : "Mute"}
                  </Button>
                  <Button
                    onClick={handleStop}
                    className="flex-1 bg-destructive/90 hover:bg-destructive text-white gap-2"
                  >
                    <PhoneOff className="w-4 h-4" />
                    End Call
                  </Button>
                </div>
              </motion.div>
            )}

            {callState === "ended" && (
              <motion.div
                key="ended"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-5 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-base font-bold text-foreground mb-1">
                    That&apos;s what your customers will experience.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ready to put Ruxi on your phone line?
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <MagneticButton className="flex-1">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold gap-2"
                      onClick={() => track({ name: "cta_click", label: "Book a Demo post-call", location: "RuxiLiveCard" })}
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      Book a Demo
                    </Button>
                  </MagneticButton>
                  <Button
                    variant="outline"
                    className="flex-1 border-white/15 hover:border-white/30 gap-2"
                    onClick={() => {
                      setCallState("idle")
                      setElapsed(0)
                      onCallStateChange?.("idle")
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    Try again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        This demo uses real AI — the same model your customers will speak to.{" "}
        <span className="text-accent">No scripts. No actors.</span>
      </p>
    </motion.div>
  )

  if (compact) {
    return cardContent
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.88 0.12 196 / 8%) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="border-accent/30 text-accent bg-accent/5 mb-6 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
          >
            Live Demo
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Talk to{" "}
            <span className="gradient-text">Ruxi right now.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            No sign-up required. Click the button and experience exactly what your callers will hear.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          {cardContent}
        </div>
      </div>
    </section>
  )
}
